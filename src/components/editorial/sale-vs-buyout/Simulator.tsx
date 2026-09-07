"use client";

import { useState, useId } from "react";

export function Simulator() {
  // 入力状態
  const [marketPrice, setMarketPrice] = useState<number>(2000); // 万円（市場想定価格）
  const [saleStrategy, setSaleStrategy] = useState<"as_is" | "demolished">("as_is"); // 仲介時の販売形態（現状渡し or 更地渡し）
  const [belongingsLevel, setBelongingsLevel] = useState<"none" | "medium" | "heavy">("medium"); // 残置物量
  const [sellingMonths, setSellingMonths] = useState<number>(6); // 仲介成約までの想定月数
  const [annualFixedTax, setAnnualFixedTax] = useState<number>(10); // 万円（年間の固定資産税・都市計画税概算）
  const [apply3000manDeduction, setApply3000manDeduction] = useState<boolean>(true); // 3000万円控除適用
  const [isSpecialProperty, setIsSpecialProperty] = useState<boolean>(false); // 再建築不可・傾斜地等の特殊物件

  const marketPriceId = useId();
  const saleStrategyId = useId();
  const belongingsId = useId();
  const sellingMonthsId = useId();
  const annualFixedTaxId = useId();
  const deductionId = useId();
  const specialPropId = useId();

  // === 諸費用の定数・計算ロジック ===

  // 1. 残置物撤去費（売主負担実費）
  const belongingsCostMap = {
    none: 0,
    medium: 40, // 万円（一般的な一軒家家財処分）
    heavy: 100, // 万円（大量・ゴミ屋敷状態）
  };
  const belongingsCost = belongingsCostMap[belongingsLevel];

  // 2. 解体費用（更地渡しの場合、約35坪木造住宅基準で180万円）
  const demolitionCost = saleStrategy === "demolished" ? 180 : 0;

  // 3. 仲介手数料の計算（宅建業法第46条・国土交通省告示）
  const calculateBrokerageFee = (priceWan: number): number => {
    if (priceWan <= 0) return 0;
    const priceYen = priceWan * 10000;
    let feeYen = 0;
    if (priceYen <= 2000000) {
      feeYen = priceYen * 0.05 * 1.1;
    } else if (priceYen <= 4000000) {
      feeYen = (priceYen * 0.04 + 20000) * 1.1;
    } else {
      feeYen = (priceYen * 0.03 + 60000) * 1.1;
    }
    return Math.round(feeYen / 10000);
  };

  const brokerageFee = calculateBrokerageFee(marketPrice);

  // 4. 仲介期間中の保有コスト（固定資産税月割り + 巡回・通風・草刈り月1万円）
  const monthlyHoldingCost = annualFixedTax / 12 + 1; // 万円/月
  const totalHoldingCost = Math.round(monthlyHoldingCost * sellingMonths * 10) / 10;

  // 5. 譲渡所得税の計算（長期譲渡所得 20.315% / 概算取得費5%）
  const calculateTax = (grossPrice: number, expenses: number, isEligibleDeduction: boolean): number => {
    const acqCost = Math.round(grossPrice * 0.05); // 概算取得費5%
    const gainBeforeDeduction = Math.max(0, grossPrice - acqCost - expenses);
    const deduction = isEligibleDeduction ? Math.min(gainBeforeDeduction, 3000) : 0;
    const taxableGain = Math.max(0, gainBeforeDeduction - deduction);
    return Math.round(taxableGain * 0.20315);
  };

  // --- 仲介ルートの手残り ---
  const brokerageGrossProceeds = marketPrice;
  const brokerageExpenses = brokerageFee + belongingsCost + demolitionCost + Math.round(totalHoldingCost);
  const brokerageTax = calculateTax(brokerageGrossProceeds, brokerageExpenses, apply3000manDeduction);
  const brokerageNetProceeds = Math.max(0, brokerageGrossProceeds - brokerageExpenses - brokerageTax);

  // --- 買取ルートの手残り ---
  // 買取相場比率: 通常物件=70%, 特殊物件=45%
  const buyoutRate = isSpecialProperty ? 0.45 : 0.7;
  const buyoutGrossProceeds = Math.round(marketPrice * buyoutRate);
  // 買取時は仲介手数料0円、解体費0円（業者持ち）、残置物現況引渡し（査定内で処理・追加持ち出し0円）、保有期間0ヶ月
  const buyoutExpenses = 0;
  const buyoutTax = calculateTax(buyoutGrossProceeds, buyoutExpenses, apply3000manDeduction);
  const buyoutNetProceeds = Math.max(0, buyoutGrossProceeds - buyoutExpenses - buyoutTax);

  // 差額
  const netDifference = brokerageNetProceeds - buyoutNetProceeds;

  // 管理不全空家・特定空家指定時の固定資産税増税シミュレーション
  // 住宅用地特例（小規模住宅用地: 課税標準1/6）が解除された場合の本則税額目安（約4倍〜6倍）
  const taxAfterRevocation = Math.round(annualFixedTax * 4.5);

  return (
    <section className="my-8 sm:my-12 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] p-6 sm:p-9 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            SIMULATOR
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            宅建業法・税制特例・諸費用完全連動
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家「仲介 vs 買取」手残り額＆維持リスク試算シミュレーター
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
          仲介手数料・残置物処分費・解体費・売れるまでの維持費・譲渡所得税を差し引いた「最終手取り額」を瞬時に比較できます。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 md:col-span-6">
          {/* ① 想定市場価格 */}
          <div>
            <label
              htmlFor={marketPriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 想定市場価格（一般仲介での売出相場）</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {marketPrice.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={marketPriceId}
              type="range"
              min={300}
              max={6000}
              step={50}
              value={marketPrice}
              onChange={(e) => setMarketPrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
              <span>300万円</span>
              <span>3,000万円</span>
              <span>6,000万円</span>
            </div>
          </div>

          {/* ② 物件の特殊性フラグ */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id={specialPropId}
                type="checkbox"
                checked={isSpecialProperty}
                onChange={(e) => setIsSpecialProperty(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#078c95] focus:ring-[#078c95]"
              />
              <div>
                <span className="text-xs sm:text-sm font-black text-[#14243a]">
                  再建築不可・傾斜地・境界不明等の特殊物件
                </span>
                <p className="mt-0.5 text-xs text-[#708696]">
                  ※一般需要が低く仲介での長期停滞が予想される物件。買取査定目安が通常より低減（相場の約45%）されます。
                </p>
              </div>
            </label>
          </div>

          {/* ③ 仲介時の販売形態 */}
          <div>
            <label htmlFor={saleStrategyId} className="block text-xs sm:text-sm font-bold text-[#14243a]">
              ② 仲介売却時の形態
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSaleStrategy("as_is")}
                className={`rounded-xl border p-3 text-left transition ${
                  saleStrategy === "as_is"
                    ? "border-[#078c95] bg-[#f0f7f7] text-[#078c95] font-black"
                    : "border-[#dfe9ee] bg-white text-[#506477] font-medium hover:bg-[#fbfaf7]"
                }`}
              >
                <div className="text-xs sm:text-sm">古家付き現状渡し</div>
                <div className="text-[11px] text-[#708696] mt-0.5">解体費用: 0円</div>
              </button>
              <button
                type="button"
                onClick={() => setSaleStrategy("demolished")}
                className={`rounded-xl border p-3 text-left transition ${
                  saleStrategy === "demolished"
                    ? "border-[#078c95] bg-[#f0f7f7] text-[#078c95] font-black"
                    : "border-[#dfe9ee] bg-white text-[#506477] font-medium hover:bg-[#fbfaf7]"
                }`}
              >
                <div className="text-xs sm:text-sm">売主負担で更地渡し</div>
                <div className="text-[11px] text-[#708696] mt-0.5">解体費用目安: 約180万円</div>
              </button>
            </div>
          </div>

          {/* ④ 残置物（荷物・ゴミ）の状態 */}
          <div>
            <label htmlFor={belongingsId} className="block text-xs sm:text-sm font-bold text-[#14243a]">
              ③ 室内の残置物（家財・ゴミ）の状況
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { id: "none", label: "片付け済み", cost: "0円" },
                { id: "medium", label: "家財一式残り", cost: "約40万円" },
                { id: "heavy", label: "大量・ゴミ屋敷", cost: "約100万円" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBelongingsLevel(item.id as typeof belongingsLevel)}
                  className={`rounded-xl border p-2.5 text-center transition ${
                    belongingsLevel === item.id
                      ? "border-[#078c95] bg-[#f0f7f7] text-[#078c95] font-black"
                      : "border-[#dfe9ee] bg-white text-[#506477] font-medium hover:bg-[#fbfaf7]"
                  }`}
                >
                  <div className="text-xs sm:text-sm">{item.label}</div>
                  <div className="text-[10px] text-[#708696] mt-0.5">{item.cost}</div>
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-[#708696]">
              ※仲介では売主負担での撤去が原則。業者買取は現状渡し（追加支出なし）が可能です。
            </p>
          </div>

          {/* ⑤ 仲介成約までの想定期間 */}
          <div>
            <label
              htmlFor={sellingMonthsId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>④ 仲介成約までの想定所要期間</span>
              <span className="text-sm sm:text-base font-black text-[#14243a]">
                {sellingMonths} ヶ月
              </span>
            </label>
            <input
              id={sellingMonthsId}
              type="range"
              min={1}
              max={24}
              step={1}
              value={sellingMonths}
              onChange={(e) => setSellingMonths(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
              <span>1ヶ月（即成約）</span>
              <span>6ヶ月（平均）</span>
              <span>24ヶ月（長期化）</span>
            </div>
          </div>

          {/* ⑥ 3000万円特別控除の適用 */}
          <div className="rounded-xl border border-[#dfe9ee] bg-white p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs sm:text-sm font-black text-[#14243a]">
                相続空き家の3,000万円特別控除を適用する
              </span>
              <input
                id={deductionId}
                type="checkbox"
                checked={apply3000manDeduction}
                onChange={(e) => setApply3000manDeduction(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#078c95] focus:ring-[#078c95]"
              />
            </label>
            <p className="mt-1 text-xs text-[#708696]">
              ※旧耐震・1億円以下等の要件合致時。仲介・買取いずれも適用可能です。
            </p>
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="space-y-6 md:col-span-6">
          <div className="rounded-2xl border-2 border-[#078c95] bg-[#f0f7f7] p-6 sm:p-7">
            <span className="text-xs font-black uppercase tracking-wider text-[#078c95]">
              SIMULATION RESULT
            </span>
            <h4 className="mt-1 text-base sm:text-lg font-black text-[#14243a]">
              手残り額の比較（最終手取り）
            </h4>

            {/* 比較カード */}
            <div className="mt-5 grid grid-cols-2 gap-3.5">
              {/* 仲介 */}
              <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 text-center">
                <span className="inline-block rounded bg-[#e8f1f5] px-2 py-0.5 text-[11px] font-bold text-[#14243a]">
                  一般仲介売却
                </span>
                <p className="mt-2 text-xs text-[#708696]">最終手取り概算</p>
                <p className="mt-1 text-xl sm:text-2xl font-black text-[#14243a]">
                  {brokerageNetProceeds.toLocaleString()}
                  <span className="text-xs font-normal"> 万円</span>
                </p>
                <p className="mt-1.5 text-[10px] text-[#708696]">
                  売却額 {marketPrice}万円 - 諸費用 {brokerageExpenses}万円 - 税 {brokerageTax}万円
                </p>
              </div>

              {/* 買取 */}
              <div className="rounded-xl border-2 border-[#078c95] bg-white p-4 text-center shadow-sm">
                <span className="inline-block rounded bg-[#078c95] px-2 py-0.5 text-[11px] font-bold text-white">
                  不動産会社買取
                </span>
                <p className="mt-2 text-xs text-[#708696]">最終手取り概算</p>
                <p className="mt-1 text-xl sm:text-2xl font-black text-[#078c95]">
                  {buyoutNetProceeds.toLocaleString()}
                  <span className="text-xs font-normal"> 万円</span>
                </p>
                <p className="mt-1.5 text-[10px] text-[#708696]">
                  買取額 {buyoutGrossProceeds}万円 - 諸費用 0万円 - 税 {buyoutTax}万円
                </p>
              </div>
            </div>

            {/* 手残り差額と評価コメント */}
            <div className="mt-5 rounded-xl bg-white p-4 border border-[#bbd8dc] text-xs sm:text-sm">
              <div className="flex items-center justify-between font-black text-[#14243a]">
                <span>手残り差額（仲介 - 買取）:</span>
                <span className={netDifference >= 0 ? "text-[#e56f2d]" : "text-[#078c95]"}>
                  {netDifference >= 0 ? `+${netDifference.toLocaleString()}` : netDifference.toLocaleString()} 万円
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                {netDifference > 300 ? (
                  <>
                    仲介の方が手残り額で約<strong>{netDifference.toLocaleString()}万円</strong>多く残る試算です。時間に余裕があり、内見対応や売却活動期間（約{sellingMonths}ヶ月）を許容できる場合は仲介が有力な選択肢です。
                  </>
                ) : (
                  <>
                    仲介手数料・解体費・残置物処分費・維持費を差し引くと、手残りの差は<strong>約{Math.abs(netDifference).toLocaleString()}万円</strong>に縮小します。成約までの長期化リスクや契約不適合責任を回避したい場合は買取の合理性が高まります。
                  </>
                )}
              </p>
            </div>
          </div>

          {/* 内訳詳細テーブル */}
          <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 text-xs sm:text-sm">
            <h5 className="font-black text-[#14243a] border-b border-[#dfe9ee] pb-3">
              費用・控除の内訳比較（計算過程）
            </h5>
            <div className="mt-3 space-y-2.5 divide-y divide-[#f0f4f7]">
              <div className="flex justify-between pt-1 text-[#14243a]">
                <span className="text-[#708696]">売買金額（額面）</span>
                <span className="font-bold">仲介: {marketPrice}万 / 買取: {buyoutGrossProceeds}万</span>
              </div>
              <div className="flex justify-between pt-2 text-[#14243a]">
                <span className="text-[#708696]">仲介手数料（宅建業法第46条）</span>
                <span className="font-bold">仲介: {brokerageFee}万円 / 買取: 0円</span>
              </div>
              <div className="flex justify-between pt-2 text-[#14243a]">
                <span className="text-[#708696]">残置物処分費用</span>
                <span className="font-bold">仲介: {belongingsCost}万円 / 買取: 0円（現状渡し）</span>
              </div>
              <div className="flex justify-between pt-2 text-[#14243a]">
                <span className="text-[#708696]">解体・更地化費用</span>
                <span className="font-bold">仲介: {demolitionCost}万円 / 買取: 0円（業者負担）</span>
              </div>
              <div className="flex justify-between pt-2 text-[#14243a]">
                <span className="text-[#708696]">売却までの維持費（{sellingMonths}ヶ月）</span>
                <span className="font-bold">仲介: {totalHoldingCost}万円 / 買取: 0円（即決済）</span>
              </div>
              <div className="flex justify-between pt-2 text-[#14243a]">
                <span className="text-[#708696]">譲渡所得税（20.315%）</span>
                <span className="font-bold">仲介: {brokerageTax}万円 / 買取: {buyoutTax}万円</span>
              </div>
            </div>
          </div>

          {/* 放置リスク: 固定資産税増税アラート */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-900 font-black">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] text-white">
                !
              </span>
              <span>放置して「管理不全空家・特定空家」に指定された場合</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-amber-950">
              空家等対策特別措置法に基づき市区町村から勧告を受けると、住宅用地特例（固定資産税の課税標準1/6軽減）が解除されます。
            </p>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-white/90 p-3 border border-amber-200">
              <span className="font-bold text-amber-950 text-xs">特例適用時（現状）: 年間 約{annualFixedTax}万円</span>
              <span className="font-black text-rose-600 text-xs sm:text-sm">→ 解除後: 年間 約{taxAfterRevocation}万円（約4〜5倍）</span>
            </div>
          </div>
        </div>
      </div>

      {/* 出典・根拠 */}
      <div className="border-t border-[#dfe9ee] bg-[#fbfaf7] px-6 py-4 sm:px-9 text-[11px] text-[#708696] leading-relaxed">
        <p>
          ※本シミュレーターの計算基準: 宅地建物取引業法第46条（国土交通省告示第172号に基づく仲介手数料上限）、租税特別措置法第35条第3項（被相続人の居住用財産に係る譲渡所得の特別控除特例）、地方税法第349条の3の2（住宅用地に対する課税標準の特例）。買取価格比率は一般的な実勢取引水準（国土交通省実態調査および流通実勢に基づく概算）であり、個別の物件状況や立地により変動します。
        </p>
      </div>
    </section>
  );
}
