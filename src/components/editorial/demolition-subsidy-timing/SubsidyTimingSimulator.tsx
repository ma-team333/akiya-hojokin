"use client";

import { useId, useState } from "react";

/**
 * 空き家解体補助金のキャッシュフロー＋解体後の固定資産税シミュレーター。
 *
 * - 補助金側: 見積額と補助率・上限額（自治体の募集要項の値を入力）から
 *   補助額（後払い）・自己負担・一時的な立替額を計算する。
 *   数値プリセットは計算方法を試すための例示であり、全国相場・代表値を意味しない。
 * - 固定資産税側: 地方税法第349条の3・第349条の4の住宅用地の課税標準特例
 *   （小規模=1/6・一般=1/3、都市計画税=1/3・2/3）と、固定資産税の標準税率1.4%
 *   （第384条）・都市計画税の制限税率0.3%（第702条）に基づき、
 *   解体（翌年1月1日から特例適用除外）後の税額変化を年額で試算する。
 */

type PresetId = "third" | "half" | "fourFifths" | "custom";

interface SubsidyPreset {
  id: PresetId;
  label: string;
  rate: number; // 補助率（1/2 = 0.5）
  rateText: string;
  cap: number; // 上限額（円）
  capText: string;
  note: string;
}

const SUBSIDY_PRESETS: readonly SubsidyPreset[] = [
  {
    id: "third",
    label: "計算例A：1/3・上限50万円",
    rate: 1 / 3,
    rateText: "1/3",
    cap: 500000,
    capText: "50万円",
    note: "制度相場ではない計算例。実際は自治体の募集要項の値を入力してください",
  },
  {
    id: "half",
    label: "計算例B：1/2・上限100万円",
    rate: 0.5,
    rateText: "1/2",
    cap: 1000000,
    capText: "100万円",
    note: "制度相場ではない計算例。実際は自治体の募集要項の値を入力してください",
  },
  {
    id: "fourFifths",
    label: "計算例C：4/5・上限150万円",
    rate: 0.8,
    rateText: "4/5",
    cap: 1500000,
    capText: "150万円",
    note: "制度相場ではない計算例。実際は自治体の募集要項の値を入力してください",
  },
  {
    id: "custom",
    label: "自治体の要項から入力",
    rate: 0.5,
    rateText: "指定",
    cap: 500000,
    capText: "指定",
    note: "お住まいの自治体の募集要項の補助率・上限額を入力してください",
  },
] as const;

// 地方税法に基づく税率・課税標準特例
const FIXED_ASSET_TAX_RATE = 0.014; // 標準税率（第384条）
const CITY_PLAN_TAX_RATE = 0.003; // 制限税率（第702条）
const SMALL_SCALE_LIMIT = 200; // 小規模住宅用地の面積上限（㎡）

function formatManYen(yen: number): string {
  return Math.round(yen / 10000).toLocaleString("ja-JP");
}

export function SubsidyTimingSimulator() {
  const [estimateMan, setEstimateMan] = useState<number>(150); // 解体見積額（万円）
  const [presetId, setPresetId] = useState<PresetId>("custom");
  const [customRatePct, setCustomRatePct] = useState<number>(50); // 補助率（%）。実際は自治体要項に合わせる。
  const [customCapMan, setCustomCapMan] = useState<number>(50); // 上限額（万円）。制度相場ではない初期入力値。
  const [landValueMan, setLandValueMan] = useState<number>(1500); // 土地評価額（万円）
  const [landArea, setLandArea] = useState<number>(150); // 土地面積（㎡）

  const estimateId = useId();
  const presetId2 = useId();
  const customRateId = useId();
  const customCapId = useId();
  const landValueId = useId();
  const landAreaId = useId();

  const preset = SUBSIDY_PRESETS.find((p) => p.id === presetId) ?? SUBSIDY_PRESETS[3];

  const estimateYen = estimateMan * 10000;
  const rate = presetId === "custom" ? customRatePct / 100 : preset.rate;
  const capYen = presetId === "custom" ? customCapMan * 10000 : preset.cap;

  const rawSubsidy = Math.floor(estimateYen * rate);
  const subsidy = Math.min(rawSubsidy, capYen);
  const selfPay = estimateYen - subsidy;
  const isCapped = rawSubsidy > capYen;

  // ── 固定資産税試算（住宅用地特例: 200㎡まで=1/6、超過分=1/3。都市計画税は1/3・2/3） ──
  const landValueYen = landValueMan * 10000;
  const valuePerSqM = landArea > 0 ? landValueYen / landArea : 0;
  const smallArea = Math.min(landArea, SMALL_SCALE_LIMIT);
  const generalArea = Math.max(landArea - SMALL_SCALE_LIMIT, 0);

  // 現行（建物あり・住宅用地特例適用）
  const currentFaBase =
    smallArea * valuePerSqM * (1 / 6) + generalArea * valuePerSqM * (1 / 3);
  const currentUpBase =
    smallArea * valuePerSqM * (1 / 3) + generalArea * valuePerSqM * (2 / 3);
  const currentTax = currentFaBase * FIXED_ASSET_TAX_RATE + currentUpBase * CITY_PLAN_TAX_RATE;

  // 解体後（翌年1月1日から特例適用除外・全額課税標準）
  const afterFaBase = landArea * valuePerSqM;
  const afterTax = afterFaBase * (FIXED_ASSET_TAX_RATE + CITY_PLAN_TAX_RATE);

  const taxIncrease = afterTax - currentTax;
  const taxMultiplier = currentTax > 0 ? afterTax / currentTax : 0;

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            後払い補助金の立替計画と解体後の税負担
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          解体補助金キャッシュフロー・固定資産税シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          見積額と自治体の補助率・上限額を入力すると、後払い（精算払い）前提の立替額・自己負担額と、解体後の固定資産税（住宅用地特例の適用除外）による年額の変化を試算できます。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-6">
          <div>
            <label
              htmlFor={estimateId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 解体工事の見積額</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {estimateMan.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={estimateId}
              type="range"
              min={30}
              max={500}
              step={10}
              value={estimateMan}
              onChange={(e) => setEstimateMan(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>30万円</span>
              <span>500万円</span>
            </div>
          </div>

          <div>
            <label htmlFor={presetId2} className="block text-xs sm:text-sm font-bold text-[#14243a]">
              ② 補助率と上限額（自治体の募集要項の値）
            </label>
            <select
              id={presetId2}
              value={presetId}
              onChange={(e) => setPresetId(e.target.value as PresetId)}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              {SUBSIDY_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
              {presetId === "custom" ? "自治体の最新募集要項にある補助率・上限額を下の入力欄へ設定してください。" : preset.note}
            </p>
            {presetId === "custom" && (
              <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4">
                <div>
                  <label
                    htmlFor={customRateId}
                    className="flex items-center justify-between text-xs font-bold text-[#14243a]"
                  >
                    補助率
                    <span className="text-sm font-black text-[#078c95]">{customRatePct}%</span>
                  </label>
                  <input
                    id={customRateId}
                    type="range"
                    min={10}
                    max={90}
                    step={5}
                    value={customRatePct}
                    onChange={(e) => setCustomRatePct(Number(e.target.value))}
                    className="mt-2 h-3 w-full cursor-pointer accent-[#078c95]"
                  />
                </div>
                <div>
                  <label
                    htmlFor={customCapId}
                    className="flex items-center justify-between text-xs font-bold text-[#14243a]"
                  >
                    上限額
                    <span className="text-sm font-black text-[#078c95]">{customCapMan}万円</span>
                  </label>
                  <input
                    id={customCapId}
                    type="range"
                    min={10}
                    max={300}
                    step={10}
                    value={customCapMan}
                    onChange={(e) => setCustomCapMan(Number(e.target.value))}
                    className="mt-2 h-3 w-full cursor-pointer accent-[#078c95]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6">
            <p className="text-xs sm:text-sm font-black text-[#14243a]">
              ③ 解体後の土地（固定資産税試算）
            </p>
            <div>
              <label
                htmlFor={landValueId}
                className="flex items-center justify-between text-xs font-bold text-[#14243a]"
              >
                <span>固定資産税評価額（土地）</span>
                <span className="text-sm font-black text-[#078c95]">
                  {landValueMan.toLocaleString()} 万円
                </span>
              </label>
              <input
                id={landValueId}
                type="range"
                min={100}
                max={10000}
                step={50}
                value={landValueMan}
                onChange={(e) => setLandValueMan(Number(e.target.value))}
                className="mt-2 h-3 w-full cursor-pointer accent-[#078c95]"
              />
            </div>
            <div>
              <label
                htmlFor={landAreaId}
                className="flex items-center justify-between text-xs font-bold text-[#14243a]"
              >
                <span>土地の面積</span>
                <span className="text-sm font-black text-[#078c95]">{landArea} ㎡</span>
              </label>
              <input
                id={landAreaId}
                type="range"
                min={50}
                max={500}
                step={10}
                value={landArea}
                onChange={(e) => setLandArea(Number(e.target.value))}
                className="mt-2 h-3 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#708696]">
                200㎡以下の部分は「小規模住宅用地」（課税標準1/6）、200㎡を超える部分は「一般住宅用地」（1/3）として計算します。
              </p>
            </div>
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 shadow-sm md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              SIMULATION RESULT
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#506477]">
              補助金（後払い）と実質自己負担
            </h4>

            <div className="mt-5 rounded-2xl bg-white p-5 sm:p-7 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/50">
              <p className="text-xs sm:text-sm font-bold text-[#0a7079]">
                補助金額（実績報告後の入金）
              </p>
              <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#078c95]">
                {formatManYen(subsidy)}{" "}
                <span className="text-base sm:text-lg font-normal text-[#506477]">万円</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                {presetId === "custom"
                  ? `補助率${customRatePct}%・上限${customCapMan}万円で計算`
                  : `補助率${preset.rateText}・上限${preset.capText}で計算`}
                {isCapped && "（上限額に達しています）"}
              </p>
            </div>

            <div className="mt-6 space-y-2.5 divide-y divide-[#dfe9ee] text-xs sm:text-sm">
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">解体工事の見積額</span>
                <span className="font-bold text-[#14243a]">{formatManYen(estimateYen)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">工事完了時の支払い（一時立替額）</span>
                <span className="font-bold text-[#d9483b]">{formatManYen(estimateYen)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">補助金の入金（実績報告・額の確定後）</span>
                <span className="font-black text-[#078c95]">▲ {formatManYen(subsidy)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5 bg-white/90 p-2.5 rounded-[5px] border border-[#bbd8dc] font-bold">
                <span className="text-[#14243a]">実質自己負担</span>
                <span className="text-base text-[#e56f2d] font-black">
                  {formatManYen(selfPay)} 万円
                </span>
              </div>
            </div>

            <h4 className="mt-8 text-sm sm:text-base font-bold text-[#506477]">
              解体後の固定資産税・都市計画税（年額）
            </h4>
            <div className="mt-4 space-y-2.5 divide-y divide-[#dfe9ee] text-xs sm:text-sm">
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">現在（住宅用地の特例適用）</span>
                <span className="font-bold text-[#14243a]">
                  約 {formatManYen(currentTax)} 万円/年
                </span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">解体後（特例の適用除外・翌年度から）</span>
                <span className="font-bold text-[#d9483b]">
                  約 {formatManYen(afterTax)} 万円/年
                </span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">年額の増加</span>
                <span className="font-black text-[#e56f2d]">
                  +{formatManYen(taxIncrease)} 万円/年（約{taxMultiplier.toFixed(1)}倍）
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-[#708696]">
              賦課期日（1月1日）時点で建物がなくなっていると、翌年度から住宅用地の課税標準特例（地方税法第349条の3・第349条の4）が適用されません。税率は固定資産税の標準税率1.4%・都市計画税の制限税率0.3%で計算しており、実際の税率は自治体ごとに異なります。
            </p>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※本シミュレーターは入力値をもとにした概算です。補助金の補助率・上限額・支払方法（受領委任払いの有無）は自治体の募集要項を、税額はお住まいの自治体の課税標準・税率で確認してください。
          </p>
        </div>
      </div>
    </section>
  );
}
