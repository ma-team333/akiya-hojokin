"use client";

import { useId, useState } from "react";
import {
  EXAMINATION_FEE_PER_PARCEL,
  FUTANKIN_TABLE,
  calcFutankin,
  type KokkoLandCategory,
} from "./article-data";

const CATEGORY_OPTIONS: ReadonlyArray<{ value: KokkoLandCategory; label: string }> =
  FUTANKIN_TABLE.map((def) => ({ value: def.key, label: def.label }));

const yen = (n: number) => n.toLocaleString("ja-JP");

/**
 * 相続土地国庫帰属制度の負担金シミュレーター。
 * 算定式（施行令第5条）・審査手数料（同第3条）・合算特例（同第6条）の計算過程を可視化する。
 */
export function KokkoKizokuSimulator() {
  const [category, setCategory] = useState<KokkoLandCategory>("takuchi");
  const [areaSqm, setAreaSqm] = useState(200);
  const [parcelCount, setParcelCount] = useState(1);
  const [useMergeSpecial, setUseMergeSpecial] = useState(false);
  const [preparationCost, setPreparationCost] = useState(0); // 万円（解体・測量等の事前費用見積）

  const categorySelectId = useId();
  const areaInputId = useId();
  const parcelSelectId = useId();
  const mergeCheckboxId = useId();
  const prepInputId = useId();

  // 面積比例の区分では合算特例の有無で計算地積が変わる
  const isMergeable = parcelCount >= 2;
  const mergeEffective = useMergeSpecial && isMergeable;

  // 負担金: 特例適用なら「合算地積で1回」、無効なら「1筆分 × 筆数」
  const singleCalc = calcFutankin(
    category,
    mergeEffective ? areaSqm * parcelCount : areaSqm,
  );
  const totalFutankin = mergeEffective
    ? singleCalc.futankin
    : singleCalc.futankin * parcelCount;

  const totalExaminationFee = EXAMINATION_FEE_PER_PARCEL * parcelCount;
  const preparationYen = Math.max(0, preparationCost) * 10_000;
  const grandTotal = totalFutankin + totalExaminationFee + preparationYen;

  const activeDef = FUTANKIN_TABLE.find((def) => def.key === category)!;

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            令和4年政令第316号 第5条の算定式に基づく計算
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          相続土地国庫帰属制度の負担金シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          土地の区分・地積・筆数を入力すると、政令の算定式による負担金、審査手数料、そして負担金以外の持ち出し費用を含む総費用を計算過程つきで表示します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-5">
          <div>
            <label
              htmlFor={categorySelectId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ① 土地の区分（施行令第5条第1項）
            </label>
            <select
              id={categorySelectId}
              value={category}
              onChange={(e) => setCategory(e.target.value as KokkoLandCategory)}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
              {activeDef.note}
            </p>
          </div>

          <div>
            <label
              htmlFor={areaInputId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 1筆あたりの地積</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {areaSqm.toLocaleString()} ㎡
              </span>
            </label>
            <input
              id={areaInputId}
              type="range"
              min={10}
              max={5000}
              step={10}
              value={areaSqm}
              onChange={(e) => setAreaSqm(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>10㎡</span>
              <span>5,000㎡（森林は12,000㎡超の階層もあり）</span>
            </div>
          </div>

          <div>
            <label
              htmlFor={parcelSelectId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ③ 申請する土地の筆数（審査手数料は1筆ごと）
            </label>
            <select
              id={parcelSelectId}
              value={parcelCount}
              onChange={(e) => setParcelCount(Number(e.target.value))}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n}筆
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6">
            <label className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-[#14243a] cursor-pointer">
              <input
                id={mergeCheckboxId}
                type="checkbox"
                checked={useMergeSpecial}
                onChange={(e) => setUseMergeSpecial(e.target.checked)}
                disabled={!isMergeable}
                className="mt-0.5 rounded text-[#078c95] focus:ring-[#078c95]"
              />
              <span>
                ④ 隣接する同一区分の2筆以上として<span className="text-[#078c95]">合算特例</span>を適用（施行令第6条）
              </span>
            </label>
            <p className="text-[11px] leading-relaxed text-[#708696]">
              隣接する2筆以上がすべて同一区分（例: ともに宅地）の場合、1筆とみなして面積を合算した地積で算定します。所有者が異なる場合は共同申出が必要です。
            </p>
            {useMergeSpecial && !isMergeable && (
              <p className="text-[11px] font-bold text-amber-600">
                ※合算特例は隣接する2筆以上が対象のため、筆数を2以上にすると有効になります。
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={prepInputId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ⑤ 事前準備費用の見積額（建物解体・境界確定測量等・任意）
            </label>
            <div className="mt-2.5 flex items-center gap-2.5">
              <input
                id={prepInputId}
                type="number"
                min={0}
                step={10}
                value={preparationCost}
                onChange={(e) => setPreparationCost(Math.max(0, Number(e.target.value)))}
                className="w-32 rounded-lg border border-[#dfe9ee] px-3.5 py-2.5 text-sm font-bold text-[#14243a] focus:border-[#078c95]"
              />
              <span className="text-xs sm:text-sm font-bold text-[#14243a]">万円</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
              建物の解体や境界の確定測量、残置物の撤去等が必要な場合はその見積額を入力します。申請要件を満たすために必要な費用で、制度上の負担金とは別に申請者の負担となります（金額は個別の見積によります）。
            </p>
          </div>
        </div>

        {/* 計算過程・結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 shadow-sm md:col-span-7">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              CALCULATION PROCESS
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#506477]">
              政令の算定式による計算過程
            </h4>

            {/* ステップ計算過程 */}
            <ol className="mt-5 space-y-2.5 text-xs sm:text-sm">
              <li className="rounded-xl bg-white p-3.5 sm:p-4 border border-[#dfe9ee]">
                <p className="font-bold text-[#14243a]">
                  STEP 1. 負担金の算定（{activeDef.article}）
                </p>
                {singleCalc.ratePerSqm !== null ? (
                  <p className="mt-1.5 leading-relaxed text-[#506477]">
                    適用階層: <span className="font-bold text-[#14243a]">{singleCalc.tierLabel}</span>
                    <br />
                    {mergeEffective
                      ? `${areaSqm.toLocaleString()}㎡ × ${parcelCount}筆 = 合算地積 ${(areaSqm * parcelCount).toLocaleString()}㎡（1筆とみなす）`
                      : `${areaSqm.toLocaleString()}㎡（1筆あたり）`}
                    <br />
                    <span className="font-bold text-[#14243a]">
                      {mergeEffective ? (areaSqm * parcelCount).toLocaleString() : areaSqm.toLocaleString()}㎡
                      × {yen(singleCalc.ratePerSqm)}円 ＋ {yen(singleCalc.baseAmount!)}円
                      ＝ {yen(singleCalc.rawAmount)}円
                    </span>
                    <br />
                    → 千円未満の端数を切り捨て（施行令第5条第2項）:{" "}
                    <span className="font-black text-[#078c95]">{yen(singleCalc.futankin)}円</span>
                    （1筆あたり）
                  </p>
                ) : (
                  <p className="mt-1.5 leading-relaxed text-[#506477]">
                    面積にかかわらず定額 <span className="font-black text-[#078c95]">{yen(singleCalc.futankin)}円</span>
                    （施行令第5条第1項第4号・1筆あたり）
                  </p>
                )}
              </li>
              <li className="rounded-xl bg-white p-3.5 sm:p-4 border border-[#dfe9ee]">
                <p className="font-bold text-[#14243a]">
                  STEP 2. 負担金の合計（{mergeEffective ? "合算特例適用" : `${parcelCount}筆分`}）
                </p>
                <p className="mt-1.5 text-[#506477]">
                  {mergeEffective
                    ? `隣接${parcelCount}筆を1筆とみなして算定 → `
                    : `${yen(singleCalc.futankin)}円 × ${parcelCount}筆 → `}
                  <span className="font-black text-[#078c95]">{yen(totalFutankin)}円</span>
                </p>
              </li>
              <li className="rounded-xl bg-white p-3.5 sm:p-4 border border-[#dfe9ee]">
                <p className="font-bold text-[#14243a]">
                  STEP 3. 審査手数料（施行令第3条・収入印紙）
                </p>
                <p className="mt-1.5 text-[#506477]">
                  {yen(EXAMINATION_FEE_PER_PARCEL)}円 × {parcelCount}筆 ={" "}
                  <span className="font-black text-[#14243a]">{yen(totalExaminationFee)}円</span>
                  <span className="text-[11px] text-[#708696]">（却下・不承認・取下げでも返還されません）</span>
                </p>
              </li>
              {preparationYen > 0 && (
                <li className="rounded-xl bg-white p-3.5 sm:p-4 border border-[#dfe9ee]">
                  <p className="font-bold text-[#14243a]">STEP 4. 事前準備費用（入力値）</p>
                  <p className="mt-1.5 text-[#506477]">
                    <span className="font-black text-[#14243a]">{yen(preparationYen)}円</span>
                    <span className="text-[11px] text-[#708696]">
                      （建物解体・境界確定測量等の見積額。負担金とは別の申請者負担）
                    </span>
                  </p>
                </li>
              )}
            </ol>

            {/* ハイライト総額 */}
            <div className="mt-6 rounded-2xl bg-white p-5 sm:p-7 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/50">
              <p className="text-xs sm:text-sm font-bold text-[#0a7079]">制度利用時の総支払額（概算）</p>
              <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#078c95]">
                {yen(grandTotal)} <span className="text-base sm:text-lg font-normal text-[#506477]">円</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                負担金 {yen(totalFutankin)}円 ＋ 審査手数料 {yen(totalExaminationFee)}円
                {preparationYen > 0 && ` ＋ 事前準備費用 ${yen(preparationYen)}円`}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
                ※負担金は審査の結果「承認」を受けた場合のみ通知され、却下・不承認の場合は発生しません。
              </p>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※算定式は相続等により取得した土地所有権の国庫への帰属に関する法律施行令（令和4年政令第316号）第3条・第5条・第6条、および法務省「相続土地国庫帰属制度の負担金」に基づきます。正確な負担金は承認時に法務局から通知される額であり、土地の所在区域（市街化区域・農用地区域等）の判定を含む最終確認は法務局の相談窓口で行えます。
          </p>
        </div>
      </div>
    </section>
  );
}
