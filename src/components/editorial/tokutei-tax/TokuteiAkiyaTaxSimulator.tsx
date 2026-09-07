"use client";

import { useState, useId } from "react";

export function TokuteiAkiyaTaxSimulator() {
  // 入力ステート
  const [landAssessedValue, setLandAssessedValue] = useState<number>(1800); // 万円（土地固定資産税評価額）
  const [landArea, setLandArea] = useState<number>(180); // ㎡
  const [buildingAssessedValue, setBuildingAssessedValue] = useState<number>(120); // 万円（家屋固定資産税評価額）
  const [includeCityTax, setIncludeCityTax] = useState<boolean>(true); // 都市計画税を含めるか

  const landValueId = useId();
  const landAreaId = useId();
  const buildingValueId = useId();
  const cityTaxId = useId();

  // 税率設定（地方税法標準税率）
  const fixedAssetTaxRate = 0.014; // 固定資産税標準税率 1.4%
  const cityPlanningTaxRate = 0.003; // 都市計画税制限税率 0.3%

  // 1. 小規模住宅用地（200㎡以下）と一般住宅用地（200㎡超）の面積按分
  const smallArea = Math.min(landArea, 200);
  const generalArea = Math.max(0, landArea - 200);
  const smallRatio = smallArea / landArea;
  const generalRatio = generalArea / landArea;

  // 2. 【通常時（地方税法第349条の3の2: 住宅用地特例適用中）】
  // 固定資産税課税標準: 小規模1/6, 一般1/3
  const normalLandTaxableBaseFixed =
    landAssessedValue * smallRatio * (1 / 6) +
    landAssessedValue * generalRatio * (1 / 3);
  const normalLandFixedTax = Math.round(normalLandTaxableBaseFixed * fixedAssetTaxRate * 10000);

  // 都市計画税課税標準: 小規模1/3, 一般2/3
  const normalLandTaxableBaseCity = includeCityTax
    ? landAssessedValue * smallRatio * (1 / 3) +
      landAssessedValue * generalRatio * (2 / 3)
    : 0;
  const normalLandCityTax = includeCityTax
    ? Math.round(normalLandTaxableBaseCity * cityPlanningTaxRate * 10000)
    : 0;

  const normalLandTotalTax = normalLandFixedTax + normalLandCityTax;

  // 3. 【勧告後（地方税法改正: 特定空家・管理不全空家の勧告による特例解除）】
  // 特例が解除されると課税標準が本則（100%）に戻る。
  // ※地方税法附則第18条（負担調整措置）により、課税標準額の上限水準（地価公示価格等の70%程度）が適用されるため、
  // 実務上の課税標準は評価額の概ね70%水準となる。
  const penaltyLandTaxableBaseFixed = landAssessedValue * 0.7;
  const penaltyLandFixedTax = Math.round(penaltyLandTaxableBaseFixed * fixedAssetTaxRate * 10000);

  const penaltyLandTaxableBaseCity = includeCityTax ? landAssessedValue * 0.7 : 0;
  const penaltyLandCityTax = includeCityTax
    ? Math.round(penaltyLandTaxableBaseCity * cityPlanningTaxRate * 10000)
    : 0;

  const penaltyLandTotalTax = penaltyLandFixedTax + penaltyLandCityTax;

  // 4. 【家屋の税額】
  const buildingFixedTax = Math.round(buildingAssessedValue * fixedAssetTaxRate * 10000);
  const buildingCityTax = includeCityTax
    ? Math.round(buildingAssessedValue * cityPlanningTaxRate * 10000)
    : 0;
  const buildingTotalTax = buildingFixedTax + buildingCityTax;

  // 5. 合計税額の計算
  const normalTotalAnnual = normalLandTotalTax + buildingTotalTax; // 特例適用時（適正管理）
  const penaltyTotalAnnual = penaltyLandTotalTax + buildingTotalTax; // 勧告後（特例解除）
  const vacantLandTotalAnnual = penaltyLandTotalTax; // 更地（家屋滅失登記後）

  const annualTaxIncrease = penaltyTotalAnnual - normalTotalAnnual;
  const fiveYearLoss = annualTaxIncrease * 5;
  const increaseMultiplier = (penaltyLandTotalTax / Math.max(1, normalLandTotalTax)).toFixed(1);

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#14243a] px-5 py-5 sm:px-8 sm:py-6 text-white">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#bbd8dc]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e56f2d]" />
          地方税法・空家特措法計算基準
        </div>
        <h3 className="mt-2 text-lg font-black sm:text-2xl text-white">
          特定空家・管理不全空家 固定資産税シミュレーター
        </h3>
        <p className="mt-1 text-xs text-[#bbd8dc] sm:text-sm">
          土地の固定資産税評価額と敷地面積から、住宅用地特例解除（勧告後）および更地化の税負担差をリアルタイムに試算します。
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-5 sm:space-y-6 md:col-span-6">
          {/* ① 土地評価額 */}
          <div>
            <label
              htmlFor={landValueId}
              className="flex items-center justify-between text-xs font-bold text-[#14243a]"
            >
              <span>① 土地の固定資産税評価額</span>
              <span className="text-base font-black text-[#078c95]">
                {landAssessedValue.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={landValueId}
              type="range"
              min={300}
              max={6000}
              step={50}
              value={landAssessedValue}
              onChange={(e) => setLandAssessedValue(Number(e.target.value))}
              className="mt-2.5 h-3 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[#708696]">
              <span>300万円</span>
              <span>3,000万円</span>
              <span>6,000万円</span>
            </div>
            <p className="mt-1 text-[11px] text-[#708696]">
              ※固定資産税課税明細書の「価格」または「評価額」欄に記載されている金額です。
            </p>
          </div>

          {/* ② 土地面積 */}
          <div>
            <label
              htmlFor={landAreaId}
              className="flex items-center justify-between text-xs font-bold text-[#14243a]"
            >
              <span>② 敷地面積（土地面積）</span>
              <span className="text-base font-black text-[#078c95]">
                {landArea} ㎡（約{(landArea * 0.3025).toFixed(0)}坪）
              </span>
            </label>
            <input
              id={landAreaId}
              type="range"
              min={50}
              max={500}
              step={10}
              value={landArea}
              onChange={(e) => setLandArea(Number(e.target.value))}
              className="mt-2.5 h-3 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[#708696]">
              <span>50㎡（小規模特例 1/6）</span>
              <span>200㎡境界</span>
              <span>500㎡</span>
            </div>
            {landArea > 200 && (
              <p className="mt-1 text-[11px] text-[#0a7079]">
                ※200㎡以下の部分は1/6特例、200㎡を超える部分は1/3特例として按分計算しています。
              </p>
            )}
          </div>

          {/* ③ 家屋評価額 */}
          <div>
            <label
              htmlFor={buildingValueId}
              className="flex items-center justify-between text-xs font-bold text-[#14243a]"
            >
              <span>③ 建物の固定資産税評価額</span>
              <span className="text-base font-black text-[#14243a]">
                {buildingAssessedValue.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={buildingValueId}
              type="range"
              min={0}
              max={500}
              step={10}
              value={buildingAssessedValue}
              onChange={(e) => setBuildingAssessedValue(Number(e.target.value))}
              className="mt-2.5 h-3 w-full cursor-pointer accent-[#14243a]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[#708696]">
              <span>0万円（築古・減価償却済）</span>
              <span>250万円</span>
              <span>500万円</span>
            </div>
          </div>

          {/* ④ 都市計画税チェック */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-3.5">
            <label htmlFor={cityTaxId} className="flex cursor-pointer items-center gap-2.5">
              <input
                id={cityTaxId}
                type="checkbox"
                checked={includeCityTax}
                onChange={(e) => setIncludeCityTax(e.target.checked)}
                className="h-4 w-4 rounded border-[#dfe9ee] text-[#078c95] focus:ring-[#078c95]"
              />
              <span className="text-xs font-bold text-[#14243a]">
                都市計画税（制限税率0.3%）を合算して計算する
              </span>
            </label>
            <p className="mt-1 pl-6.5 text-[10px] text-[#708696]">
              ※市街化区域内の不動産に課税されます。市街化調整区域等では課税されません。
            </p>
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 md:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#dfe9ee] pb-3">
              <span className="text-xs font-black text-[#14243a]">年間税額の比較シミュレーション</span>
              <span className="rounded-full bg-[#d9483b]/10 px-2.5 py-0.5 text-[11px] font-black text-[#d9483b]">
                土地税額 約{increaseMultiplier}倍
              </span>
            </div>

            {/* 増税差額ハイライト */}
            <div className="mt-4 rounded-xl border border-[#d9483b]/30 bg-[#fdf2f2] p-4 text-center">
              <p className="text-xs font-bold text-[#708696]">
                勧告を受けた場合の年間追加税負担額
              </p>
              <div className="mt-1 text-2xl font-black text-[#d9483b] sm:text-3xl">
                +{(annualTaxIncrease / 10000).toFixed(1)}{" "}
                <span className="text-sm font-bold text-[#14243a]">万円 / 年</span>
              </div>
              <p className="mt-1 text-[11px] font-bold text-[#708696]">
                （5年間放置した場合の累積負担増: 約{(fiveYearLoss / 10000).toFixed(0)}万円）
              </p>
            </div>

            {/* 3パターンの内訳詳細 */}
            <div className="mt-5 space-y-3 text-xs">
              {/* 通常時 */}
              <div className="rounded-lg border border-[#dfe9ee] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#0a7079]">
                    ① 住宅用地特例適用時（適正管理）
                  </span>
                  <span className="text-sm font-black text-[#14243a]">
                    約{normalTotalAnnual.toLocaleString()} 円 / 年
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
                  <span>土地: 約{normalLandTotalTax.toLocaleString()}円（特例1/6適用）</span>
                  <span>建物: 約{buildingTotalTax.toLocaleString()}円</span>
                </div>
              </div>

              {/* 勧告後 */}
              <div className="rounded-lg border border-[#d9483b]/40 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#d9483b]">
                    ② 勧告後（特定空家・管理不全空家）
                  </span>
                  <span className="text-sm font-black text-[#d9483b]">
                    約{penaltyTotalAnnual.toLocaleString()} 円 / 年
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
                  <span>土地: 約{penaltyLandTotalTax.toLocaleString()}円（特例解除・本則）</span>
                  <span>建物: 約{buildingTotalTax.toLocaleString()}円</span>
                </div>
              </div>

              {/* 更地 */}
              <div className="rounded-lg border border-[#dfe9ee] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#506477]">
                    ③ 更地にした場合（建物解体後）
                  </span>
                  <span className="text-sm font-black text-[#14243a]">
                    約{vacantLandTotalAnnual.toLocaleString()} 円 / 年
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
                  <span>土地: 約{penaltyLandTotalTax.toLocaleString()}円（住宅用地特例なし）</span>
                  <span>建物: 0円（滅失登記）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 計算根拠の注記 */}
          <div className="mt-5 rounded-lg border border-[#dfe9ee] bg-[#fbfaf7] p-3 text-[11px] leading-relaxed text-[#708696]">
            <p className="font-bold text-[#14243a]">計算根拠と負担調整措置について</p>
            <p className="mt-0.5">
              住宅用地特例が解除されると土地の課税標準は1/6から本則に戻りますが、地方税法附則第18条の負担調整措置（上限水準70%）が適用されるため、実質税額は約3〜4倍前後となります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 別名export（規約互換用）
export { TokuteiAkiyaTaxSimulator as Simulator };
