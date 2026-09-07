"use client";

import { useState, useId } from "react";

export function BrokerageVsBuyoutSimulator() {
  const [marketPrice, setMarketPrice] = useState<number>(3000); // 仲介想定価格（万円）
  const [buyoutRatio, setBuyoutRatio] = useState<number>(75); // 買取割合（%）
  const [brokerageMonths, setBrokerageMonths] = useState<number>(4); // 仲介成約までの期間（月）
  const [monthlyHoldingCost, setMonthlyHoldingCost] = useState<number>(2.5); // 月額維持費（固定資産税・管理費・保険等 万円）
  
  // 売主自費負担コスト（仲介時に必要となる場合）
  const [demolitionCost, setDemolitionCost] = useState<number>(0); // 解体費用（万円）
  const [clearanceCost, setClearanceCost] = useState<number>(30); // 残置物・家財処分費用（万円）
  const [repairCost, setRepairCost] = useState<number>(0); // リフォーム・簡易修繕費（万円）

  // 取得費
  const [useDefaultAcquisition, setUseDefaultAcquisition] = useState<boolean>(true);
  const [customAcquisitionCost, setCustomAcquisitionCost] = useState<number>(150); // 万円

  // 3,000万円特別控除適用チェック
  const [apply3000manDeduction, setApply3000manDeduction] = useState<boolean>(false);

  const marketPriceId = useId();
  const buyoutRatioId = useId();
  const brokerageMonthsId = useId();
  const monthlyHoldingCostId = useId();
  const demolitionCostId = useId();
  const clearanceCostId = useId();
  const repairCostId = useId();
  const defaultAcquisitionId = useId();
  const customAcquisitionCostId = useId();
  const applyDeductionId = useId();

  // 宅建業法に基づく仲介手数料上限計算（2024年7月施行 低廉な空家等の特例対応）
  const calculateBrokerageFee = (price: number): number => {
    if (price <= 0) return 0;
    // 800万円以下の低廉な空家等の売主側特例上限: 最大33万円（税込）
    if (price <= 800) {
      return 33;
    }
    // 400万円超: (価格 × 3% + 6万円) × 1.10
    const feeWithoutTax = price * 0.03 + 6;
    return Math.round(feeWithoutTax * 1.1 * 10) / 10;
  };

  // 取得費（概算5%または実額）
  const getAcquisitionCost = (price: number) => {
    return useDefaultAcquisition
      ? Math.round(price * 0.05 * 10) / 10
      : customAcquisitionCost;
  };

  // 1. 仲介ルートの計算
  const brokerageSalePrice = marketPrice;
  const brokerageFee = calculateBrokerageFee(brokerageSalePrice);
  const brokerageSellerExpenses = demolitionCost + clearanceCost + repairCost;
  const brokerageHoldingTotalCost = Math.round(monthlyHoldingCost * brokerageMonths * 10) / 10;
  const brokerageAcquisition = getAcquisitionCost(brokerageSalePrice);

  // 譲渡所得（控除前） = 譲渡価格 - (取得費 + 仲介手数料 + 解体費等)
  const brokerageGainBeforeDeduction = Math.max(
    0,
    brokerageSalePrice - brokerageAcquisition - brokerageFee - brokerageSellerExpenses
  );
  const brokerageDeduction = apply3000manDeduction
    ? Math.min(brokerageGainBeforeDeduction, 3000)
    : 0;
  const brokerageTaxableGain = Math.max(0, brokerageGainBeforeDeduction - brokerageDeduction);
  // 長期譲渡所得税率 20.315%
  const brokerageTax = Math.round(brokerageTaxableGain * 0.20315 * 10) / 10;
  // 仲介の手取り実質額
  const brokerageNetProceeds = Math.round(
    (brokerageSalePrice - brokerageFee - brokerageSellerExpenses - brokerageHoldingTotalCost - brokerageTax) * 10
  ) / 10;

  // 2. 買取ルートの計算
  const buyoutSalePrice = Math.round((marketPrice * (buyoutRatio / 100)) * 10) / 10;
  const buyoutFee = 0; // 直接買取のため0円
  const buyoutSellerExpenses = 0; // 業者が残置物・解体をそのまま引き受け
  const buyoutHoldingTotalCost = 0; // 即時決済（保有コストゼロ）
  const buyoutAcquisition = getAcquisitionCost(buyoutSalePrice);

  const buyoutGainBeforeDeduction = Math.max(0, buyoutSalePrice - buyoutAcquisition);
  const buyoutDeduction = apply3000manDeduction
    ? Math.min(buyoutGainBeforeDeduction, 3000)
    : 0;
  const buyoutTaxableGain = Math.max(0, buyoutGainBeforeDeduction - buyoutDeduction);
  const buyoutTax = Math.round(buyoutTaxableGain * 0.20315 * 10) / 10;
  // 買取の手取り実質額
  const buyoutNetProceeds = Math.round((buyoutSalePrice - buyoutTax) * 10) / 10;

  // 手取り差額
  const netDifference = Math.round((brokerageNetProceeds - buyoutNetProceeds) * 10) / 10;

  return (
    <section className="my-8 sm:my-12 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      {/* ツールヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] p-6 sm:p-9 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            SIMULATOR
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            実質手取り・諸経費・期間の自動比較
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          「仲介」vs「買取」手取り額・諸経費シミュレーター
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
          仲介手数料・解体費・残置物処分費・保有期間中の維持費・譲渡所得税をすべて反映し、
          「額面価格」ではなく「最終的に手元に残る現金（実質手取り額）」の差を試算します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 lg:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-7 lg:col-span-6">
          {/* ① 仲介想定価格 */}
          <div>
            <label
              htmlFor={marketPriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 仲介での想定売却価格（相場価格）</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {marketPrice.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={marketPriceId}
              type="range"
              min={300}
              max={8000}
              step={50}
              value={marketPrice}
              onChange={(e) => setMarketPrice(Number(e.target.value))}
              className="mt-3 h-3 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
              <span>300万円</span>
              <span>4,000万円</span>
              <span>8,000万円</span>
            </div>
          </div>

          {/* ② 買取割合 */}
          <div>
            <label
              htmlFor={buyoutRatioId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 業者買取の想定割合（市場価格に対する割合）</span>
              <span className="text-sm sm:text-base font-black text-[#e56f2d]">
                {buyoutRatio}%（約 {buyoutSalePrice.toLocaleString()} 万円）
              </span>
            </label>
            <input
              id={buyoutRatioId}
              type="range"
              min={60}
              max={90}
              step={1}
              value={buyoutRatio}
              onChange={(e) => setBuyoutRatio(Number(e.target.value))}
              className="mt-3 h-3 w-full cursor-pointer accent-[#e56f2d]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
              <span>60%（訳あり・古家）</span>
              <span>75%（標準相場）</span>
              <span>90%（好立地・マンション）</span>
            </div>
          </div>

          {/* ③ 仲介時の諸条件（期間・解体・残置物） */}
          <div className="space-y-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4.5 sm:p-5">
            <h4 className="text-xs sm:text-sm font-black text-[#14243a]">
              ③ 仲介売却時にかかる想定期間・自費負担
            </h4>

            {/* 売却期間 */}
            <div>
              <label
                htmlFor={brokerageMonthsId}
                className="flex items-center justify-between text-xs font-bold text-[#506477]"
              >
                <span>仲介での成約・決済までの想定期間</span>
                <span className="font-black text-[#14243a]">{brokerageMonths} ヶ月</span>
              </label>
              <input
                id={brokerageMonthsId}
                type="range"
                min={1}
                max={12}
                step={1}
                value={brokerageMonths}
                onChange={(e) => setBrokerageMonths(Number(e.target.value))}
                className="mt-2 h-2.5 w-full cursor-pointer accent-[#078c95]"
              />
            </div>

            {/* 月額維持費 */}
            <div>
              <label
                htmlFor={monthlyHoldingCostId}
                className="flex items-center justify-between text-xs font-bold text-[#506477]"
              >
                <span>月額保有コスト（固定資産税・管理費・光熱費・草刈り等）</span>
                <span className="font-black text-[#14243a]">{monthlyHoldingCost} 万円/月</span>
              </label>
              <input
                id={monthlyHoldingCostId}
                type="range"
                min={0.5}
                max={10}
                step={0.5}
                value={monthlyHoldingCost}
                onChange={(e) => setMonthlyHoldingCost(Number(e.target.value))}
                className="mt-2 h-2.5 w-full cursor-pointer accent-[#078c95]"
              />
              <span className="text-[10px] text-[#708696]">
                ※{brokerageMonths}ヶ月間の保有維持費累計: <strong>{brokerageHoldingTotalCost} 万円</strong>
              </span>
            </div>

            {/* 解体・残置物処分・修繕 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#dfe9ee]">
              <div>
                <label
                  htmlFor={demolitionCostId}
                  className="block text-xs font-bold text-[#506477]"
                >
                  建物解体費（更地渡し時）
                </label>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <input
                    id={demolitionCostId}
                    type="number"
                    min={0}
                    max={500}
                    step={10}
                    value={demolitionCost}
                    onChange={(e) => setDemolitionCost(Math.max(0, Number(e.target.value)))}
                    className="w-24 rounded-lg border border-[#dfe9ee] bg-white px-3 py-1.5 text-xs font-bold text-[#14243a] focus:border-[#078c95]"
                  />
                  <span className="text-xs text-[#708696]">万円</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={clearanceCostId}
                  className="block text-xs font-bold text-[#506477]"
                >
                  残置物・家具処分費
                </label>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <input
                    id={clearanceCostId}
                    type="number"
                    min={0}
                    max={200}
                    step={5}
                    value={clearanceCost}
                    onChange={(e) => setClearanceCost(Math.max(0, Number(e.target.value)))}
                    className="w-24 rounded-lg border border-[#dfe9ee] bg-white px-3 py-1.5 text-xs font-bold text-[#14243a] focus:border-[#078c95]"
                  />
                  <span className="text-xs text-[#708696]">万円</span>
                </div>
              </div>
            </div>
          </div>

          {/* ④ 取得費と税制特例設定 */}
          <div className="space-y-3 rounded-xl border border-[#dfe9ee] bg-white p-4.5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-[#14243a]">④ 取得費設定</span>
              <label className="flex items-center gap-1.5 text-[#506477] cursor-pointer">
                <input
                  id={defaultAcquisitionId}
                  type="checkbox"
                  checked={useDefaultAcquisition}
                  onChange={(e) => setUseDefaultAcquisition(e.target.checked)}
                  className="rounded text-[#078c95] focus:ring-[#078c95]"
                />
                概算取得費（5%）
              </label>
            </div>
            {!useDefaultAcquisition && (
              <div className="flex items-center gap-2">
                <input
                  id={customAcquisitionCostId}
                  type="number"
                  min={0}
                  max={3000}
                  value={customAcquisitionCost}
                  onChange={(e) => setCustomAcquisitionCost(Math.max(0, Number(e.target.value)))}
                  className="w-28 rounded border border-[#dfe9ee] px-2.5 py-1 text-xs font-bold text-[#14243a]"
                />
                <span className="text-[#708696]">万円（購入時の契約書実額）</span>
              </div>
            )}

            <div className="pt-2 border-t border-[#dfe9ee]">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-[#14243a]">
                <input
                  id={applyDeductionId}
                  type="checkbox"
                  checked={apply3000manDeduction}
                  onChange={(e) => setApply3000manDeduction(e.target.checked)}
                  className="rounded text-[#078c95] focus:ring-[#078c95]"
                />
                <span>3,000万円特別控除（マイホーム・相続空き家）を適用する</span>
              </label>
            </div>
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 sm:p-8 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#bbd8dc] pb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
                <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
                COMPARISON RESULT
              </span>
              <span className="text-xs font-bold text-[#506477]">実質手取り試算</span>
            </div>

            {/* 手取り差額のハイライトカード */}
            <div className="mt-5 rounded-2xl bg-white p-5 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/60">
              <p className="text-xs font-bold text-[#0a7079]">実質手取り額の差（仲介 − 買取）</p>
              <p className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-[#078c95]">
                {netDifference >= 0 ? `+${netDifference.toLocaleString()}` : netDifference.toLocaleString()}{" "}
                <span className="text-sm font-normal text-[#506477]">万円</span>
              </p>
              <p className="mt-2 text-[11px] text-[#506477] leading-relaxed">
                {netDifference > 300 ? (
                  <span className="text-[#078c95] font-bold">
                    💰 仲介の方が約{netDifference.toLocaleString()}万円手取りが多くなる試算です。時間に余裕があれば仲介が有利です。
                  </span>
                ) : netDifference > 0 ? (
                  <span className="text-[#e56f2d] font-bold">
                    ⚖️ 手取り差は約{netDifference.toLocaleString()}万円に縮まります。解体・残置物の手間や契約不適合責任免責を重視するなら買取も有力な選択肢です。
                  </span>
                ) : (
                  <span className="text-[#e56f2d] font-bold">
                    ⚡ 諸費用・維持費を考慮すると買取の方が手取りが高くなる試算です。
                  </span>
                )}
              </p>
            </div>

            {/* 2手法の並列比較内訳テーブル */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              {/* 仲介カラム */}
              <div className="rounded-xl border border-[#078c95]/30 bg-white p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-[#dfe9ee] pb-1.5">
                  <span className="font-black text-[#078c95]">仲介（市場売却）</span>
                  <span className="rounded bg-[#078c95] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    高値狙い
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#708696]">売却価格</span>
                    <span className="font-bold text-[#14243a]">{brokerageSalePrice.toLocaleString()}万</span>
                  </div>
                  <div className="flex justify-between text-[#d9483b]">
                    <span>仲介手数料</span>
                    <span>▲{brokerageFee.toLocaleString()}万</span>
                  </div>
                  <div className="flex justify-between text-[#d9483b]">
                    <span>解体・残置・修繕</span>
                    <span>▲{brokerageSellerExpenses.toLocaleString()}万</span>
                  </div>
                  <div className="flex justify-between text-[#d9483b]">
                    <span>保有維持費({brokerageMonths}ヶ月)</span>
                    <span>▲{brokerageHoldingTotalCost.toLocaleString()}万</span>
                  </div>
                  <div className="flex justify-between text-[#d9483b]">
                    <span>譲渡所得税</span>
                    <span>▲{brokerageTax.toLocaleString()}万</span>
                  </div>
                </div>
                <div className="border-t border-[#078c95]/30 pt-2 text-right">
                  <span className="block text-[10px] text-[#708696]">実質手取り</span>
                  <span className="text-base sm:text-lg font-black text-[#078c95]">
                    {brokerageNetProceeds.toLocaleString()} 万円
                  </span>
                </div>
                <div className="pt-1 text-[10px] text-[#708696] space-y-0.5 border-t border-dashed border-[#dfe9ee]">
                  <div>⏱ 期間: 約{brokerageMonths}ヶ月〜</div>
                  <div>🛡 責任: 原則3ヶ月負担</div>
                  <div>🧹 荷物: 売主片付け</div>
                </div>
              </div>

              {/* 買取カラム */}
              <div className="rounded-xl border border-[#e56f2d]/30 bg-white p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-[#dfe9ee] pb-1.5">
                  <span className="font-black text-[#e56f2d]">買取（業者直接）</span>
                  <span className="rounded bg-[#e56f2d] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    即現金化
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#708696]">買取価格({buyoutRatio}%)</span>
                    <span className="font-bold text-[#14243a]">{buyoutSalePrice.toLocaleString()}万</span>
                  </div>
                  <div className="flex justify-between text-[#506477]">
                    <span>仲介手数料</span>
                    <span className="font-bold text-[#078c95]">0 円</span>
                  </div>
                  <div className="flex justify-between text-[#506477]">
                    <span>解体・残置物</span>
                    <span className="font-bold text-[#078c95]">0 円(業者負担)</span>
                  </div>
                  <div className="flex justify-between text-[#506477]">
                    <span>保有維持費</span>
                    <span className="font-bold text-[#078c95]">0 円(即決済)</span>
                  </div>
                  <div className="flex justify-between text-[#d9483b]">
                    <span>譲渡所得税</span>
                    <span>▲{buyoutTax.toLocaleString()}万</span>
                  </div>
                </div>
                <div className="border-t border-[#e56f2d]/30 pt-2 text-right">
                  <span className="block text-[10px] text-[#708696]">実質手取り</span>
                  <span className="text-base sm:text-lg font-black text-[#e56f2d]">
                    {buyoutNetProceeds.toLocaleString()} 万円
                  </span>
                </div>
                <div className="pt-1 text-[10px] text-[#708696] space-y-0.5 border-t border-dashed border-[#dfe9ee]">
                  <div>⏱ 期間: 最短3日〜2週間</div>
                  <div>🛡 責任: 原則免責</div>
                  <div>🧹 荷物: 現状そのままでOK</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※仲介手数料は宅地建物取引業法に基づく法定上限額です。税額計算は長期譲渡所得税率（20.315%）に基づく概算です。実際の税額および査定額は物件状況や個別事情により異なります。
          </p>
        </div>
      </div>
    </section>
  );
}
