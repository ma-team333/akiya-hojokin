"use client";

import { useState, useId } from "react";
import {
  STRUCTURE_DEFINITIONS,
} from "@/lib/demolition-subsidy";
import {
  SITE_CONDITION_FACTORS,
  SUBSIDY_RATE_RATIOS,
  calcDemolitionCostMan,
  calcSubsidyMan,
  calcNetOutflowMan,
  calcLandTaxChange,
  tsuboToSqm,
  type StructureType,
  type SiteCondition,
  type SubsidyRateType,
} from "./model";

/** 表示用の敷地条件ラベル（SITE_CONDITION_FACTORS のdescと対）。 */
const SITE_CONDITION_LABELS: Record<SiteCondition, string> = {
  normal: "標準地（4m以上道路・平坦・重機進入可）",
  narrow: "狭小地・密集地（道路幅4m未満・一部手壊し）",
  sloped: "高低差・旗竿地・傾斜地（重機搬入困難）",
};

export function DemolitionSubsidySimulator() {
  const [structure, setStructure] = useState<StructureType>("wood");
  const [areaTsubo, setAreaTsubo] = useState<number>(30); // 坪
  const [siteCondition, setSiteCondition] = useState<SiteCondition>("normal");
  const [subsidyRate, setSubsidyRate] = useState<SubsidyRateType>("one_half");
  const [maxSubsidyCap, setMaxSubsidyCap] = useState<number>(50); // 万円。制度相場ではなく計算入力の初期値。
  const [landTaxValuation, setLandTaxValuation] = useState<number>(1200); // 土地固定資産税評価額（万円）

  const areaId = useId();
  const maxSubsidyCapId = useId();
  const landTaxId = useId();

  // 1. 解体費用の計算（純関数モデル model.ts を使用・坪単価は lib/demolition-subsidy が正本）
  const totalDemolitionCost = calcDemolitionCostMan(structure, areaTsubo, siteCondition); // 万円

  // 2. 補助金額の計算
  const rateRatio = SUBSIDY_RATE_RATIOS[subsidyRate];

  const { final: finalSubsidyAmount } = calcSubsidyMan(totalDemolitionCost, subsidyRate, maxSubsidyCap);

  // 3. 自己負担実質額
  const netOutflow = calcNetOutflowMan(totalDemolitionCost, finalSubsidyAmount);

  // 4. 固定資産税変化（地方税法第349条の3の2: 小規模住宅用地1/6特例の除外影響）
  const { taxWithBuildingYen: landTaxWithBuilding, taxBareLandYen: landTaxBareLand, taxIncreaseAnnualYen: taxIncreaseAnnual } =
    calcLandTaxChange(landTaxValuation);

  const areaSqm = tsuboToSqm(areaTsubo);

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            SIMULATOR
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            解体費用は坪単価モデル・固定資産税は地方税法第349条の3の2対応
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家解体費用・補助金受給額＆固定資産税シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          建物の構造・坪数と自治体の補助条件を選択することで、工事費用、補助金交付想定額、自己負担額に加え、<strong>解体時に必要な立替資金</strong>と<strong>更地後の固定資産税変化</strong>を即時試算します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-6">
          {/* ① 構造種別 */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#14243a]">
              ① 建物の構造種別
            </label>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {(["wood", "steel", "rc"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStructure(key)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    structure === key
                      ? "border-[#078c95] bg-[#eef7f7] text-[#078c95] font-black shadow-sm"
                      : "border-[#dfe9ee] bg-white text-[#506477] font-medium hover:border-[#b8cedb]"
                  }`}
                >
                  <div className="text-xs sm:text-sm">{STRUCTURE_DEFINITIONS[key].label.split("（")[0]}</div>
                  <div className="mt-1 text-[10px] sm:text-xs text-[#708696]">
                    坪あたり約{Math.round(STRUCTURE_DEFINITIONS[key].range[0]/10000)}万〜{Math.round(STRUCTURE_DEFINITIONS[key].range[1]/10000)}万円
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ② 延床面積 */}
          <div>
            <label
              htmlFor={areaId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 延床面積（坪数 / ㎡）</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {areaTsubo} 坪 <span className="text-xs font-normal text-[#708696]">({areaSqm} ㎡)</span>
              </span>
            </label>
            <input
              id={areaId}
              type="range"
              min={10}
              max={80}
              step={1}
              value={areaTsubo}
              onChange={(e) => setAreaTsubo(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>10坪（約33㎡）</span>
              <span>30坪（標準戸建）</span>
              <span>80坪（大型）</span>
            </div>
          </div>

          {/* ③ 立地・現況条件 */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#14243a]">
              ③ 現況・立地環境
            </label>
            <div className="mt-2.5 space-y-2">
              {(["normal", "narrow", "sloped"] as const).map((key) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs sm:text-sm transition-all ${
                    siteCondition === key
                      ? "border-[#078c95] bg-[#eef7f7] text-[#14243a] font-bold"
                      : "border-[#dfe9ee] bg-white text-[#506477] hover:border-[#b8cedb]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="siteCondition"
                      checked={siteCondition === key}
                      onChange={() => setSiteCondition(key)}
                      className="accent-[#078c95]"
                    />
                    <span>{SITE_CONDITION_LABELS[key]}</span>
                  </div>
                  <span className="text-[11px] text-[#708696]">{SITE_CONDITION_FACTORS[key].desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ④ 自治体補助金の補助率・上限額 */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fafc] p-4 space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#14243a]">
                ④ 自治体の補助率
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { key: "one_third" as const, label: "1/3", note: "計算例A" },
                  { key: "one_half" as const, label: "1/2", note: "計算例B" },
                  { key: "two_thirds" as const, label: "2/3", note: "計算例C" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSubsidyRate(item.key)}
                    className={`rounded-lg border p-2 text-center text-xs transition-all ${
                      subsidyRate === item.key
                        ? "border-[#078c95] bg-white text-[#078c95] font-black shadow-xs"
                        : "border-[#dfe9ee] bg-white/60 text-[#506477] hover:border-[#b8cedb]"
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-[#708696]">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor={maxSubsidyCapId}
                className="flex items-center justify-between text-xs font-bold text-[#14243a]"
              >
                <span>自治体の補助上限額</span>
                <span className="font-black text-[#078c95]">{maxSubsidyCap} 万円</span>
              </label>
              <input
                id={maxSubsidyCapId}
                type="range"
                min={10}
                max={200}
                step={10}
                value={maxSubsidyCap}
                onChange={(e) => setMaxSubsidyCap(Number(e.target.value))}
                className="mt-2 h-3 w-full cursor-pointer accent-[#078c95]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-[#708696]">
                <span>10万円</span>
                <span>50万円（初期値）</span>
                <span>200万円（任意入力）</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-[#708696]">
              ※補助率ボタンと上限スライダーは計算条件の入力例で、全国相場ではありません。一次情報で確認済みの自治体では上限10万円〜50万円の幅があります。実際の試算では自治体の最新要項に記載された補助率・上限額へ合わせてください。
            </p>
          </div>

          {/* ⑤ 土地固定資産税評価額 */}
          <div>
            <label
              htmlFor={landTaxId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>⑤ 土地の固定資産税評価額（更地増税試算用）</span>
              <span className="text-base font-black text-[#078c95]">
                {landTaxValuation.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={landTaxId}
              type="range"
              min={300}
              max={5000}
              step={100}
              value={landTaxValuation}
              onChange={(e) => setLandTaxValuation(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>300万円</span>
              <span>1,200万円（郊外戸建例）</span>
              <span>5,000万円</span>
            </div>
            <p className="mt-1.5 text-[11px] text-[#708696]">
              ※毎年4〜5月に届く「固定資産税納税通知書・課税明細書」の土地評価額欄で確認できます。
            </p>
          </div>
        </div>

        {/* 試算結果・可視化パネル */}
        <div className="space-y-5 rounded-xl border border-[#dfe9ee] bg-[#f8fafc] p-5 sm:p-7 md:col-span-6">
          <h4 className="border-b border-[#dfe9ee] pb-3 text-sm font-black text-[#14243a]">
            📊 シミュレーション試算結果の内訳
          </h4>

          {/* 解体工事総額と補助金 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#506477]">解体工事想定総費用（税込概算）:</span>
              <span className="font-bold text-[#14243a] text-base">
                約 {totalDemolitionCost.toLocaleString()} 万円
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#078c95] font-bold">自治体補助金想定交付額:</span>
              <span className="font-black text-[#078c95] text-base">
                - {finalSubsidyAmount.toLocaleString()} 万円
              </span>
            </div>

            <div className="rounded-xl border border-[#b8cedb] bg-[#eef7f7] p-4">
              <div className="text-xs font-bold text-[#708696]">実質自己負担額（補助金受領後）</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-[#078c95]">
                約 {netOutflow.toLocaleString()} <span className="text-sm font-normal text-[#14243a]">万円</span>
              </div>
              <p className="mt-1 text-[11px] text-[#506477]">
                ※補助金により解体費用の約 {Math.round((finalSubsidyAmount / totalDemolitionCost) * 100)}% が軽減されます。
              </p>
            </div>
          </div>

          {/* 🚨 キャッシュフロー注意喚起（立替資金） */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
              <span>⚠️ キャッシュフロー上の最重要注意点</span>
            </div>
            <div className="mt-2 text-xs leading-relaxed text-amber-950 space-y-1.5">
              <p>
                <strong>一時立替必要資金: 約 {totalDemolitionCost.toLocaleString()} 万円</strong>
              </p>
              <p className="text-[11px] text-amber-900">
                補助金は「工事完了・全額支払い後の後払い」です。解体工事中は工事総額（{totalDemolitionCost}万円）を手元資金等で全額立て替える必要があります。
              </p>
            </div>
          </div>

          {/* 🏢 固定資産税変化（住宅用地特例解除の影響） */}
          <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 space-y-2.5">
            <div className="text-xs font-black text-[#14243a] flex items-center justify-between">
              <span>解体後の土地固定資産税の変化（年間）</span>
              <span className="text-[11px] font-normal text-[#708696]">地方税法第349条の3の2</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-[#f0f4f8] p-2.5">
                <div className="text-[11px] text-[#708696]">建物あり（特例適用時）</div>
                <div className="mt-1 text-sm font-bold text-[#14243a]">
                  約 {Math.round(landTaxWithBuilding / 1000).toLocaleString()}千円 /年
                </div>
                <div className="text-[10px] text-[#708696]">課税標準1/6軽減</div>
              </div>
              <div className="rounded-lg bg-[#fdf2eb] p-2.5">
                <div className="text-[11px] text-[#e56f2d] font-bold">解体後更地（特例除外）</div>
                <div className="mt-1 text-sm font-black text-[#e56f2d]">
                  約 {Math.round(landTaxBareLand / 1000).toLocaleString()}千円 /年
                </div>
                <div className="text-[10px] text-[#e56f2d]">本則税率（最大約6倍増）</div>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-[#506477]">
              ※解体後に更地のまま年を越すと、年間で約 <strong>{Math.round(taxIncreaseAnnual / 1000).toLocaleString()}千円</strong> の増税要因となります。年内の売却・引渡しや跡地活用プランの事前検討が不可欠です。
            </p>
          </div>

          {/* 出典注記 */}
          <div className="text-[10px] text-[#708696] leading-tight space-y-1">
            <p>【根拠公的データ・計算前提】</p>
            <p>・解体費用: 国土交通省「建築物除却工種別平方メートル単価参考値」等をベースとした市場平均推計。</p>
            <p>・固定資産税: 地方税法第349条の3の2（小規模住宅用地200㎡以下）。実際の税額は自治体の固定資産税路線価および負担調整措置により異なります。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
