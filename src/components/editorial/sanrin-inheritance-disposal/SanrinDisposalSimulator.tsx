"use client";

import { useState, useId } from "react";
import {
  calcSanrinDisposal,
  areaToTan,
  areaToChobu,
  type SanrinSimInputs,
} from "./model";

/**
 * 山林の処分・売却・保有コスト比較シミュレーター。
 * 計算は純関数モデル model.ts に委譲（SKILL §5 単一ソース）。
 * 根拠法令（森林負担金: 令和4年政令第356号第5条・千円未満切捨て）は model.ts のコメント参照。
 */

export function SanrinDisposalSimulator() {
  const [areaSqm, setAreaSqm] = useState<number>(3000); // 面積（㎡）
  const [forestType, setForestType] = useState<"cedar" | "mixed">("cedar"); // 人工林(スギ・ヒノキ) or 雑木林
  const [hasRoadAccess, setHasRoadAccess] = useState<boolean>(true); // 接道あり・重機進入可
  const [annualHoldingCost, setAnnualHoldingCost] = useState<number>(2); // 年間保有コスト（固定資産税・交通費・維持費 万円）
  const [targetYears, setTargetYears] = useState<number>(10); // 保有継続年数

  const areaId = useId();
  const forestTypeId = useId();
  const roadAccessId = useId();
  const holdingCostId = useId();
  const targetYearsId = useId();

  const sim = calcSanrinDisposal({
    areaSqm,
    forestType,
    hasRoadAccess,
    annualHoldingCost,
    targetYears,
  } satisfies SanrinSimInputs);
  const { cumulativeHoldingCost } = sim;
  const { inspectionFee, burden: kokkoBurdan, total: totalKokkoCost } = sim.kokko;
  const {
    volume: totalVolume,
    tax: estimatedTimberTax,
    netProceeds: netTimberProceeds,
    viable: timberViable,
  } = sim.timber;
  const {
    price: estimatedLandSalePrice,
    expenses: saleExpenses,
    netProceeds: netLandSaleProceeds,
  } = sim.landSale;

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            森林法・相続土地国庫帰属法対応
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          山林の処分・売却・保有コスト比較シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          面積や樹種、道路条件を入力して、「保有継続」「国庫帰属」「立木売却」「山林売買」の概算収支と費用負担を即時比較します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-7 md:col-span-6">
          <div>
            <label
              htmlFor={areaId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 山林面積</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {areaSqm.toLocaleString()} ㎡
                <span className="ml-1 text-xs text-[#708696] font-normal">
                  （約{areaToTan(areaSqm)}反 / 約{areaToChobu(areaSqm)}町歩）
                </span>
              </span>
            </label>
            <input
              id={areaId}
              type="range"
              min={500}
              max={30000}
              step={500}
              value={areaSqm}
              onChange={(e) => setAreaSqm(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>500㎡（約150坪）</span>
              <span>30,000㎡（約3ha）</span>
            </div>
          </div>

          <div>
            <label
              htmlFor={forestTypeId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ② 森林の種類・立木の状態
            </label>
            <select
              id={forestTypeId}
              value={forestType}
              onChange={(e) => setForestType(e.target.value as "cedar" | "mixed")}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              <option value="cedar">スギ・ヒノキ等の人工林（用材林・樹齢35年以上）</option>
              <option value="mixed">雑木林・天然林・長期間手入れされていない放置林</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={roadAccessId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ③ 接道状況（林道・公道・作業道の有無）
            </label>
            <select
              id={roadAccessId}
              value={hasRoadAccess ? "yes" : "no"}
              onChange={(e) => setHasRoadAccess(e.target.value === "yes")}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              <option value="yes">接道あり（トラック・伐採重機が進入可能）</option>
              <option value="no">接道なし（無道路地・他人の山林を通る必要がある）</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={holdingCostId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>④ 年間の保有維持コスト（固定資産税＋現地交通費等）</span>
              <span className="text-sm sm:text-base font-black text-[#14243a]">{annualHoldingCost} 万円/年</span>
            </label>
            <input
              id={holdingCostId}
              type="range"
              min={0.5}
              max={10}
              step={0.5}
              value={annualHoldingCost}
              onChange={(e) => setAnnualHoldingCost(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
          </div>

          <div>
            <label
              htmlFor={targetYearsId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>⑤ このまま保有し続けた場合の想定年数</span>
              <span className="text-sm sm:text-base font-black text-[#14243a]">{targetYears} 年間</span>
            </label>
            <input
              id={targetYearsId}
              type="range"
              min={5}
              max={30}
              step={5}
              value={targetYears}
              onChange={(e) => setTargetYears(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 shadow-sm md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              ESTIMATED COMPARISON
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#14243a]">
              4つの選択肢別 収支・費用シミュレーション
            </h4>

            <div className="mt-5 space-y-3">
              {/* ルート1: 国庫帰属 */}
              <div className="rounded-xl bg-white p-4 border border-[#bbd8dc] shadow-sm">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-[#14243a]">🏛️ 相続土地国庫帰属制度の手数料・負担金</span>
                  <span className="font-black text-[#d9483b]">支出 約{totalKokkoCost} 万円</span>
                </div>
                <p className="mt-1 text-[11px] text-[#708696]">
                  内訳: 審査手数料 {inspectionFee}万円 ＋ 森林負担金 約{kokkoBurdan}万円（面積{areaSqm.toLocaleString()}㎡・政令算定式）
                </p>
              </div>

              {/* ルート2: 立木売却 */}
              <div className="rounded-xl bg-white p-4 border border-[#bbd8dc] shadow-sm">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-[#14243a]">🪵 森林組合への立木売却（皆伐手取り）</span>
                  <span className={`font-black ${netTimberProceeds > 0 ? "text-[#078c95]" : "text-[#708696]"}`}>
                    {netTimberProceeds > 0 ? `収入 約+${netTimberProceeds} 万円` : "収支 0円（伐採困難）"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#708696]">
                  {timberViable
                    ? `推定材積 約${totalVolume}㎥（木材売上から伐採搬出費控除後、山林所得特別控除50万円適用）`
                    : "※接道がない無道路地や雑木林の場合、伐採・搬出コストが木材売上を上回り売却益が出ません。"}
                </p>
              </div>

              {/* ルート3: 山林売買仲介 */}
              <div className="rounded-xl bg-white p-4 border border-[#bbd8dc] shadow-sm">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-[#14243a]">⛺ 山林専門マッチングでの土地売却手取り</span>
                  <span className={`font-black ${netLandSaleProceeds > 0 ? "text-[#078c95]" : "text-[#708696]"}`}>
                    {netLandSaleProceeds > 0 ? `収入 約+${netLandSaleProceeds} 万円` : "売却困難"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#708696]">
                  想定売却価格 約{estimatedLandSalePrice}万円 − 諸費用（登記・仲介手数料等）約{saleExpenses}万円
                </p>
              </div>

              {/* ルート4: 保有継続 */}
              <div className="rounded-xl bg-white p-4 border border-rose-200 shadow-sm">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-[#14243a]">⏳ このまま保有継続した場合の累積コスト</span>
                  <span className="font-black text-[#d9483b]">支出 ▲{cumulativeHoldingCost} 万円</span>
                </div>
                <p className="mt-1 text-[11px] text-[#708696]">
                  {targetYears}年間の固定資産税、現地見回り交通費、最低限の倒木剪定費用の累計
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-[#e3eff2] p-3 text-[11px] leading-relaxed text-[#506477]">
            <strong>💡 実務上の判断基準:</strong><br />
            スギ・ヒノキ人工林で接道があれば「立木売却＋森林経営管理委託」でプラス収支になる可能性があります。一方、接道のない放置林の場合、保有し続けると{targetYears}年で約{cumulativeHoldingCost}万円の維持コストが流出するため、「隣地への無償譲渡」や「国庫帰属制度（負担金約{totalKokkoCost}万円）」での早期手放しが合理的な選択肢となります。
          </div>
        </div>
      </div>
    </section>
  );
}
