"use client";

import { useState, useId } from "react";
import {
  FIXED_TAX_RATE,
  CITY_TAX_RATE,
  calcLandTax,
  calcUpkeepTotal,
} from "./model";

/**
 * 空き家の年間維持費用シミュレーター。
 *
 * 税額の計算は純関数モデル model.ts（法定の計算式のみ・SKILL §5 単一ソース）。
 * 保険・修繕・代行・交通費は「ご自身の支払額」を入力する方式のため、
 * 本体が市場相場の数値を主張することはない。
 *
 * 出典は model.ts のコメント参照（地方税法第350条・第702条の4・第349条の3の2・附則第15条・施行令第52条の11）。
 */

const fmt = (v: number) => (Math.round(v * 10) / 10).toLocaleString("ja-JP", { maximumFractionDigits: 1 });

export function MaintenanceCostSimulator() {
  const [landPrice, setLandPrice] = useState(800); // 土地の固定資産税評価額（万円）
  const [landArea, setLandArea] = useState(150); // 土地面積（㎡）
  const [buildingPrice, setBuildingPrice] = useState(100); // 建物の固定資産税評価額（万円）
  const [buildingArea, setBuildingArea] = useState(100); // 建物延床面積（㎡）
  const [advised, setAdvised] = useState(false); // 指導・勧告等を受けた（特例適用外）
  const [insurance, setInsurance] = useState(3); // 火災保険等（万円/年）
  const [upkeep, setUpkeep] = useState(5); // 修繕・草刈り等（万円/年）
  const [agent, setAgent] = useState(6); // 巡回管理代行等（万円/年）
  const [travel, setTravel] = useState(6); // 通い交通費等（万円/年）

  const landId = useId();
  const areaId = useId();
  const buildId = useId();
  const buildAreaId = useId();
  const advisedId = useId();
  const insId = useId();
  const upkeepId = useId();
  const agentId = useId();
  const travelId = useId();

  // ---- 土地課税標準（一戸建ての住宅用地）: 純関数モデル model.ts に委譲 ----
  // 住宅用地に算入されるのは床面積の10倍まで（地方税法施行令第52条の11）。
  const tax = calcLandTax({ landPrice, landArea, buildingPrice, buildingArea, advised });
  const { smallArea, generalArea, nonResidentialArea } = tax;
  const landStandard = tax.landStandard;
  const cityLand = tax.cityLandStandard;
  const fixedTax = tax.fixedTax;
  const cityTax = tax.cityTax;
  const unit = landArea > 0 ? landPrice / landArea : 0; // ㎡単価（万円/㎡）

  const upkeepTotal = calcUpkeepTotal({ insurance, upkeep, agent, travel });

  const annualTotal = fixedTax + cityTax + upkeepTotal;
  const taxGap = tax.taxGap;

  const numberInput = (
    id: string,
    label: string,
    value: number,
    setter: (n: number) => void,
    hint: string,
  ) => (
    <div>
      <label htmlFor={id} className="block text-xs sm:text-sm font-bold text-[#14243a]">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={0}
          step={0.5}
          value={value}
          onChange={(e) => setter(Math.max(0, Number(e.target.value) || 0))}
          className="w-24 min-h-11 rounded-lg border border-[#dfe9ee] bg-white px-3 py-2 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
        />
        <span className="text-xs font-bold text-[#506477]">万円/年</span>
        <span className="text-[10px] leading-tight text-[#708696]">{hint}</span>
      </div>
    </div>
  );

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">ツール</span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            固定資産税・都市計画税は地方税法の法定計算
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家の年間維持費用シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          評価額（納税通知書に記載）とご自身の支払額を入力すると、住宅用地特例の適用有無ごとの税額と年間合計を計算過程つきで表示します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:grid-cols-12 md:p-10">
        {/* 入力 */}
        <div className="space-y-6 md:col-span-6">
          <div>
            <label htmlFor={landId} className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]">
              <span>① 土地の固定資産税評価額</span>
              <span className="text-base font-black text-[#078c95]">{landPrice.toLocaleString()} 万円</span>
            </label>
            <input id={landId} type="range" min={100} max={3000} step={50} value={landPrice} onChange={(e) => setLandPrice(Number(e.target.value))} className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]" />
          </div>

          <div>
            <label htmlFor={areaId} className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]">
              <span>② 土地面積</span>
              <span className="text-base font-black text-[#078c95]">{landArea} ㎡</span>
            </label>
            <input id={areaId} type="range" min={50} max={600} step={10} value={landArea} onChange={(e) => setLandArea(Number(e.target.value))} className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]" />
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#708696]">
              200㎡までの部分が小規模住宅用地（課税標準1/6）。超過分は一般住宅用地、床面積の10倍を超える部分は住宅用地外として計算します（地方税法第349条の3の2・地方税法施行令第52条の11）。
            </p>
          </div>

          <div>
            <label htmlFor={buildAreaId} className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]">
              <span>③ 建物の延床面積</span>
              <span className="text-base font-black text-[#078c95]">{buildingArea} ㎡</span>
            </label>
            <input id={buildAreaId} type="range" min={30} max={300} step={5} value={buildingArea} onChange={(e) => setBuildingArea(Number(e.target.value))} className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]" />
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#708696]">
              住宅用地に算入される土地は床面積の10倍まで（地方税法施行令第52条の11）。
            </p>
          </div>

          <div>
            <label htmlFor={buildId} className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]">
              <span>④ 建物の固定資産税評価額</span>
              <span className="text-base font-black text-[#078c95]">{buildingPrice.toLocaleString()} 万円</span>
            </label>
            <input id={buildId} type="range" min={10} max={500} step={10} value={buildingPrice} onChange={(e) => setBuildingPrice(Number(e.target.value))} className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]" />
          </div>

          <div className="rounded-xl border border-[#e56f2d]/40 bg-[#fff9f5] p-4 sm:p-5">
            <label htmlFor={advisedId} className="flex items-start gap-2.5 cursor-pointer">
              <input
                id={advisedId}
                type="checkbox"
                checked={advised}
                onChange={(e) => setAdvised(e.target.checked)}
                className="mt-0.5 rounded text-[#e56f2d] focus:ring-[#e56f2d]"
              />
              <span className="text-xs sm:text-sm font-bold leading-relaxed text-[#14243a]">
                ⑤ 管理不全空き家への「指導・勧告」または特定空き家への「勧告」を受けた
                <span className="block text-[10px] font-bold text-[#e56f2d] mt-1">
                  受けた日以後最初の4月1日から住宅用地特例の適用対象外になります（地方税法附則第15条）
                </span>
              </span>
            </label>
          </div>

          <div className="space-y-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5">
            <p className="text-xs font-black text-[#14243a]">⑥ そのほかの年間支払額（ご自身の数値を入力）</p>
            {numberInput(insId, "火災保険等の保険料", insurance, setInsurance, "保険証券で確認")}
            {numberInput(upkeepId, "修繕・草刈り等の維持費", upkeep, setUpkeep, "年間の実費・見積額")}
            {numberInput(agentId, "巡回管理代行等の委託費", agent, setAgent, "契約見積額（未委託なら0）")}
            {numberInput(travelId, "通いの交通費等", travel, setTravel, "年間の往復実費")}
          </div>
        </div>

        {/* 結果 */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 shadow-sm sm:p-8 md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              SIMULATION RESULT
            </span>

            <div className="mt-5 rounded-2xl bg-white p-5 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/50 sm:p-7">
              <p className="text-xs sm:text-sm font-bold text-[#0a7079]">年間の保有費用（税金＋維持費）</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-[#078c95] sm:text-4xl md:text-5xl">
                {fmt(annualTotal)} <span className="text-base font-normal text-[#506477] sm:text-lg">万円</span>
              </p>
              <p className="mt-2 text-xs text-[#708696]">10年間の累計: 約 {fmt(annualTotal * 10)} 万円</p>
              {advised && taxGap > 0 && (
                <p className="mt-3 rounded-lg bg-[#fff9f5] px-3 py-2 text-xs font-bold text-[#d9483b]">
                  特例解除により年間 +{fmt(taxGap)} 万円（10年で +{fmt(taxGap * 10)} 万円）
                </p>
              )}
            </div>

            {/* 計算過程 */}
            <div className="mt-6 space-y-2.5 rounded-xl border border-[#dfe9ee] bg-white p-4 text-[11px] leading-relaxed text-[#506477] sm:text-xs">
              <p className="font-black text-[#14243a]">税額の計算過程</p>
              <p>
                ㎡単価 = {fmt(landPrice)} ÷ {landArea} = {fmt(unit)} 万円/㎡
              </p>
              <p>
                土地の課税標準 = {fmt(unit)} × {smallArea}㎡ ×{" "}
                {advised ? "1（特例適用外）" : "1/6（小規模住宅用地）"}
                {generalArea > 0 ? ` ＋ ${fmt(unit)} × ${generalArea}㎡ × ${advised ? "1" : "1/3（一般住宅用地）"}` : ""}
                {nonResidentialArea > 0 ? ` ＋ ${fmt(unit)} × ${nonResidentialArea}㎡ × 1（住宅用地外・床面積10倍超）` : ""}
                {" = "}
                {fmt(landStandard)} 万円
              </p>
              <p>
                固定資産税 = （土地 {fmt(landStandard)} ＋ 建物 {fmt(buildingPrice)}） × 1.4% ={" "}
                <strong className="text-[#14243a]">{fmt(fixedTax)} 万円</strong>
              </p>
              <p>
                都市計画税 = （土地 {fmt(advised ? landPrice : cityLand)} ＋ 建物 {fmt(buildingPrice)}） × 0.3% ={" "}
                <strong className="text-[#14243a]">{fmt(cityTax)} 万円</strong>
              </p>
              <p>
                維持費 = {fmt(insurance)} ＋ {fmt(upkeep)} ＋ {fmt(agent)} ＋ {fmt(travel)} = {fmt(upkeepTotal)} 万円
              </p>
              <p className="border-t border-[#dfe9ee] pt-2 font-bold text-[#14243a]">
                年間合計 = {fmt(fixedTax)} ＋ {fmt(cityTax)} ＋ {fmt(upkeepTotal)} = {fmt(annualTotal)} 万円
              </p>
            </div>

            <div className="mt-4 space-y-2.5 divide-y divide-[#dfe9ee] text-xs sm:text-sm">
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">固定資産税（土地＋建物）</span>
                <span className="font-bold text-[#14243a]">{fmt(fixedTax)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">都市計画税（市街化区域の場合）</span>
                <span className="font-bold text-[#14243a]">{fmt(cityTax)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">保険・維持・代行・交通費</span>
                <span className="font-bold text-[#14243a]">{fmt(upkeepTotal)} 万円</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※税率は固定資産税の標準税率1.4%（地方税法第350条第1項）と都市計画税の制限税率0.3%で計算した概算です。実際の税額・評価額は毎年6月頃に届く固定資産税の納税通知書、都市計画税の非課税区域の別は市町村にお確かめください。
          </p>
        </div>
      </div>
    </section>
  );
}
