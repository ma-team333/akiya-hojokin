"use client";

import { useState, useId } from "react";
import { brokerageFeeCapMan } from "./model";

// 構造別の解体費用目安（坪単価・万円/坪）公的統計・国交省統計基準
const DEMOLITION_COST_PER_TSUBO: Record<string, { label: string; min: number; max: number; defaultVal: number }> = {
  wood: { label: "木造（W造）", min: 3, max: 5, defaultVal: 4 },
  steel: { label: "鉄骨造（S造）", min: 5, max: 7, defaultVal: 6 },
  rc: { label: "鉄筋コンクリート造（RC造）", min: 7, max: 10, defaultVal: 8 },
};

export function DemolitionSaleSimulator() {
  const [salePrice, setSalePrice] = useState<number>(2500); // 万円（土地または土地建物の売却額）
  const [structureType, setStructureType] = useState<string>("wood");
  const [tsuboArea, setTsuboArea] = useState<number>(30); // 坪
  const [customDemolitionCost, setCustomDemolitionCost] = useState<number>(120); // 万円
  const [useAutoDemolition, setUseAutoDemolition] = useState<boolean>(true);
  const [subsidyAmount, setSubsidyAmount] = useState<number>(0); // 補助金（万円）
  const [expectedMonthsToSell, setExpectedMonthsToSell] = useState<number>(6); // 売却にかかる期間（月）
  const [annualPropertyTaxBase, setAnnualPropertyTaxBase] = useState<number>(12); // 古家あり時の年間固定資産税額（万円）
  const [isSpecialDeductionApplicable, setIsSpecialDeductionApplicable] = useState<boolean>(true); // 3000万円控除

  const salePriceId = useId();
  const structureTypeId = useId();
  const tsuboAreaId = useId();
  const customDemolitionCostId = useId();
  const subsidyAmountId = useId();
  const monthsId = useId();
  const taxId = useId();

  // 解体費用の計算
  const calculatedDemolitionCost = useAutoDemolition
    ? tsuboArea * DEMOLITION_COST_PER_TSUBO[structureType].defaultVal
    : customDemolitionCost;

  // 実質解体費用（補助金差引後）
  const netDemolitionCost = Math.max(0, calculatedDemolitionCost - subsidyAmount);

  // 仲介手数料（宅建業法46条の法定上限算式・税込）
  const brokerageFee = Math.ceil(brokerageFeeCapMan(salePrice));

  // 印紙税・諸費用（概算）
  const otherExpenses = 15;

  // --- パターン1: 古家付き土地（現状渡し・買主側解体またはリノベ） ---
  // 古家付きの場合、更地想定価格より解体費相当（約100〜150万）安く売れるケースが一般的
  const asIsSalePrice = Math.max(100, salePrice - netDemolitionCost);
  const asIsBrokerage = Math.ceil(brokerageFeeCapMan(asIsSalePrice));
  const asIsExpenses = asIsBrokerage + otherExpenses;
  // 固定資産税（住宅用地特例適用中：年間税額そのまま月割負担）
  const asIsHoldingTax = Math.round((annualPropertyTaxBase / 12) * expectedMonthsToSell);
  // 譲渡所得税（概算取得費5%、3000万円控除適用時は課税0）
  const asIsAcquisitionCost = Math.round(asIsSalePrice * 0.05);
  const asIsGain = Math.max(0, asIsSalePrice - asIsAcquisitionCost - asIsExpenses);
  const asIsTax = isSpecialDeductionApplicable ? 0 : Math.round(asIsGain * 0.20315);
  const asIsNetProceeds = asIsSalePrice - asIsExpenses - asIsHoldingTax - asIsTax;
  const asIsInitialCashOut = 0; // 先行持ち出しなし

  // --- パターン2: 更地渡し条件付き契約（契約後解体・推奨） ---
  // 契約成立後に更地化するため、更地満額で売却でき、先行持ち出しや年越し増税リスクがない
  const conditionalSalePrice = salePrice;
  const conditionalBrokerage = brokerageFee;
  const conditionalExpenses = conditionalBrokerage + otherExpenses + netDemolitionCost;
  const conditionalHoldingTax = Math.round((annualPropertyTaxBase / 12) * expectedMonthsToSell);
  const conditionalAcquisitionCost = Math.round(conditionalSalePrice * 0.05);
  const conditionalGain = Math.max(0, conditionalSalePrice - conditionalAcquisitionCost - conditionalExpenses);
  const conditionalTax = isSpecialDeductionApplicable ? 0 : Math.round(conditionalGain * 0.20315);
  const conditionalNetProceeds = conditionalSalePrice - conditionalExpenses - conditionalHoldingTax - conditionalTax;
  const conditionalInitialCashOut = 0; // 手付金または決済時清算により先行自己資金負担は回避可能

  // --- パターン3: 先行更地化（売却前に解体） ---
  // 先行して解体費を持ち出す。売却まで年を跨いだ場合、固定資産税が最大約6倍に跳ね上がるリスク
  const demolishedSalePrice = salePrice;
  const demolishedBrokerage = brokerageFee;
  const demolishedExpenses = demolishedBrokerage + otherExpenses + netDemolitionCost;
  // 更地後の固定資産税（年跨ぎリスクを考慮し、6ヶ月超で特例解除倍率4倍を適用した月割シミュレーション）
  const demolishedHoldingTaxMultiplier = expectedMonthsToSell > 12 ? 4.5 : expectedMonthsToSell > 6 ? 3.0 : 1.5;
  const demolishedHoldingTax = Math.round(((annualPropertyTaxBase * demolishedHoldingTaxMultiplier) / 12) * expectedMonthsToSell);
  const demolishedAcquisitionCost = Math.round(demolishedSalePrice * 0.05);
  const demolishedGain = Math.max(0, demolishedSalePrice - demolishedAcquisitionCost - demolishedExpenses);
  const demolishedTax = isSpecialDeductionApplicable ? 0 : Math.round(demolishedGain * 0.20315);
  const demolishedNetProceeds = demolishedSalePrice - demolishedExpenses - demolishedHoldingTax - demolishedTax;
  const demolishedInitialCashOut = calculatedDemolitionCost; // 解体費用全額が先行持ち出し

  return (
    <section className="my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] p-6 sm:p-9 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            SIMULATOR
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            3パターン手残り＆先行支出比較
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家売却「更地 vs 古家付き vs 更地渡し」手残り額シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          建物の広さや売却想定価格を入力して、解体費用の自己負担額・固定資産税リスク・最終手取り額を3つの売却ルートで比較します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力パネル */}
        <div className="space-y-6 sm:space-y-7 md:col-span-6">
          {/* 売却想定価格 */}
          <div>
            <label
              htmlFor={salePriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 想定売却価格（更地相場ベース）</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {salePrice.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={salePriceId}
              type="range"
              min={500}
              max={8000}
              step={50}
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
              <span>500万円</span>
              <span>8,000万円</span>
            </div>
          </div>

          {/* 建物構造と坪数 */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4 sm:p-5 space-y-4">
            <span className="text-xs sm:text-sm font-bold text-[#14243a] block">
              ② 建物の構造・延床面積（解体費用の算定）
            </span>

            <div className="grid grid-cols-3 gap-2">
              {Object.entries(DEMOLITION_COST_PER_TSUBO).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStructureType(key)}
                  className={`rounded-lg border p-2.5 text-center text-xs font-bold transition-all ${
                    structureType === key
                      ? "border-[#078c95] bg-[#078c95] text-white shadow-sm"
                      : "border-[#dfe9ee] bg-white text-[#506477] hover:border-[#078c95]"
                  }`}
                >
                  <p className="text-[11px]">{item.label}</p>
                  <p className="mt-1 text-[10px] opacity-90">{item.defaultVal}万円/坪</p>
                </button>
              ))}
            </div>

            <div>
              <label
                htmlFor={tsuboAreaId}
                className="flex items-center justify-between text-xs font-bold text-[#506477]"
              >
                <span>延床面積: {tsuboArea} 坪（約{(tsuboArea * 3.3).toFixed(0)}㎡）</span>
                <span className="text-xs font-black text-[#14243a]">
                  概算解体費: {calculatedDemolitionCost.toLocaleString()} 万円
                </span>
              </label>
              <input
                id={tsuboAreaId}
                type="range"
                min={15}
                max={80}
                step={1}
                value={tsuboArea}
                onChange={(e) => setTsuboArea(Number(e.target.value))}
                className="mt-2.5 h-3 w-full cursor-pointer accent-[#078c95]"
              />
            </div>
          </div>

          {/* 自治体解体補助金 */}
          <div>
            <label
              htmlFor={subsidyAmountId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>③ 自治体解体補助金（見込み額）</span>
              <span className="text-sm sm:text-base font-black text-[#087f88]">
                ▲ {subsidyAmount} 万円
              </span>
            </label>
            <input
              id={subsidyAmountId}
              type="range"
              min={0}
              max={150}
              step={10}
              value={subsidyAmount}
              onChange={(e) => setSubsidyAmount(Number(e.target.value))}
              className="mt-2.5 h-3.5 w-full cursor-pointer accent-[#087f88]"
            />
            <p className="mt-1 text-[11px] text-[#708696]">
              ※自治体の老朽空家除却補助金（上限50万〜100万円程度が一般的・事前申請必須）
            </p>
          </div>

          {/* 売却期間と特例チェック */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={monthsId} className="block text-xs font-bold text-[#14243a]">
                想定売却期間
              </label>
              <select
                id={monthsId}
                value={expectedMonthsToSell}
                onChange={(e) => setExpectedMonthsToSell(Number(e.target.value))}
                className="mt-1.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-3 py-2 text-xs font-bold text-[#14243a] shadow-sm"
              >
                <option value={3}>3ヶ月（早期成約）</option>
                <option value={6}>6ヶ月（標準期間）</option>
                <option value={12}>12ヶ月（1年・年越し）</option>
                <option value={18}>18ヶ月（長期化リスク）</option>
              </select>
            </div>

            <div>
              <label htmlFor={taxId} className="block text-xs font-bold text-[#14243a]">
                現在の年間固定資産税額
              </label>
              <select
                id={taxId}
                value={annualPropertyTaxBase}
                onChange={(e) => setAnnualPropertyTaxBase(Number(e.target.value))}
                className="mt-1.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-3 py-2 text-xs font-bold text-[#14243a] shadow-sm"
              >
                <option value={8}>8万円/年（小規模地）</option>
                <option value={12}>12万円/年（標準的な戸建）</option>
                <option value={18}>18万円/年（広大地・都心部）</option>
                <option value={25}>25万円/年（高額評価地）</option>
              </select>
            </div>
          </div>

          {/* 3000万特別控除チェック */}
          <label className="flex items-start gap-2.5 rounded-lg border border-[#bbd8dc] bg-[#f0f7f7] p-3 text-xs text-[#14243a] cursor-pointer">
            <input
              type="checkbox"
              checked={isSpecialDeductionApplicable}
              onChange={(e) => setIsSpecialDeductionApplicable(e.target.checked)}
              className="mt-0.5 rounded text-[#078c95] focus:ring-[#078c95]"
            />
            <span>
              <strong>相続空き家の3,000万円特別控除</strong> を適用する（昭和56年以前旧耐震・1億円以下）
            </span>
          </label>
        </div>

        {/* 比較結果パネル */}
        <div className="space-y-4 md:col-span-6">
          <div className="rounded-2xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
              <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
              ESTIMATED PROCEEDS & RISK
            </span>
            <h4 className="text-sm sm:text-base font-black text-[#14243a]">
              売却手法別の手残り額・支出リスク比較
            </h4>

            {/* パターンA: 更地渡し特約（おすすめ） */}
            <div className="rounded-xl border-2 border-[#078c95] bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#078c95] text-white text-[10px] font-black px-3 py-0.5 rounded-bl-lg">
                ★ 推奨（最も安全）
              </div>
              <div className="text-xs font-bold text-[#078c95]">パターン A</div>
              <h5 className="text-sm font-black text-[#14243a]">更地渡し条件付き契約（契約後解体）</h5>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#708696] block text-[11px]">先行持ち出し費用</span>
                  <span className="font-black text-[#0a7079]">0 円（持ち出し不要）</span>
                </div>
                <div>
                  <span className="text-[#708696] block text-[11px]">固定資産税増税リスク</span>
                  <span className="font-black text-[#0a7079]">なし（特例維持）</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#dfe9ee] flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#506477]">推定最終手残り額</span>
                <span className="text-xl font-black text-[#078c95]">
                  {conditionalNetProceeds.toLocaleString()} <span className="text-xs text-[#506477]">万円</span>
                </span>
              </div>
            </div>

            {/* パターンB: 古家付き現状渡し */}
            <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-[#506477]">パターン B</div>
              <h5 className="text-sm font-black text-[#14243a]">古家付き土地（現状渡し）</h5>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#708696] block text-[11px]">先行持ち出し費用</span>
                  <span className="font-black text-[#0a7079]">0 円（完全ゼロ）</span>
                </div>
                <div>
                  <span className="text-[#708696] block text-[11px]">売却想定価格（値引後）</span>
                  <span className="font-bold text-[#14243a]">{asIsSalePrice.toLocaleString()} 万円</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#dfe9ee] flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#506477]">推定最終手残り額</span>
                <span className="text-lg font-black text-[#14243a]">
                  {asIsNetProceeds.toLocaleString()} <span className="text-xs text-[#506477]">万円</span>
                </span>
              </div>
            </div>

            {/* パターンC: 先行更地化 */}
            <div className="rounded-xl border border-[#e56f2d]/40 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold text-[#e56f2d]">パターン C</div>
              <h5 className="text-sm font-black text-[#14243a]">更地先行解体（売却前に解体）</h5>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#708696] block text-[11px]">先行持ち出し費用</span>
                  <span className="font-black text-[#d9483b]">
                    ▲ {demolishedInitialCashOut.toLocaleString()} 万円
                  </span>
                </div>
                <div>
                  <span className="text-[#708696] block text-[11px]">長期化時の固定資産税</span>
                  <span className="font-black text-[#d9483b]">
                    {demolishedHoldingTax} 万円（増税負担）
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#dfe9ee] flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#506477]">推定最終手残り額</span>
                <span className="text-lg font-black text-[#14243a]">
                  {demolishedNetProceeds.toLocaleString()} <span className="text-xs text-[#506477]">万円</span>
                </span>
              </div>
            </div>

            <p className="text-[10px] leading-relaxed text-[#708696]">
              ※概算取得費5%、仲介手数料法定上限、地方税法の住宅用地特例規定に基づき算出。解体費用や税額は現場状況や自治体評価額により異なります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
