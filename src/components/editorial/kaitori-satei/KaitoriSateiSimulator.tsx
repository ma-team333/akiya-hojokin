"use client";

import { useId, useState } from "react";
import {
  brokerageFeeCapTaxIncluded,
  calcBuyoutEstimate,
  referenceBrokerageFeeCap,
  type BuildingStatus,
} from "./model";

export type { BuildingStatus };

/**
 * 空き家買取査定シミュレーター（計算過程の可視化）。
 *
 * - 老朽化した空き家の買取査定は「土地の想定価格 − 解体費用 − 残置物処分費用 − その他費用」
 *   という更地換算の考え方で算出される過程をステップ表示する（各入力値は利用者が入力）。
 * - 計算は純関数モデル model.ts に委譲（SKILL §5 単一ソース）。
 * - 参考表示の仲介手数料上限は宅地建物取引業法第46条第1項に基づく国土交通省告示第十五号の上限
 *   （200万円以下の部分5%・200万円超400万円以下の部分4%・400万円超の部分2% + 消費税10%）で計算する。
 */

/** 計算過程の1ステップ（計算過程可視のための running total）。 */
interface CalcStep {
  label: string;
  detail: string;
  delta: number; // 万円（マイナスは控除）
  runningTotal: number; // 万円
}

export function KaitoriSateiSimulator() {
  const [buildingStatus, setBuildingStatus] = useState<BuildingStatus>("aged");
  const [landPrice, setLandPrice] = useState(1500); // 土地の想定価格（万円）
  const [buildingValue, setBuildingValue] = useState(300); // 建物評価額（万円・再販可能時のみ）
  const [demolitionCost, setDemolitionCost] = useState(150); // 解体費用見積額（万円）
  const [remainsCost, setRemainsCost] = useState(30); // 残置物処分費用見積額（万円）
  const [otherCost, setOtherCost] = useState(20); // 測量・登記等その他費用（万円）

  const landPriceId = useId();
  const statusId = useId();
  const buildingValueId = useId();
  const demolitionId = useId();
  const remainsId = useId();
  const otherId = useId();

  // 計算過程（更地換算の考え方でステップを積み上げる）
  const steps: CalcStep[] =
    buildingStatus === "aged"
      ? [
          { label: "① 土地の想定価格", detail: "地価公示・固定資産税評価額等を参考に入力", delta: landPrice, runningTotal: landPrice },
          { label: "② 解体費用の控除", detail: "老朽化した建物は解体前提。見積額を差し引き", delta: -demolitionCost, runningTotal: landPrice - demolitionCost },
          { label: "③ 残置物処分費用の控除", detail: "家具・家電等の撤去・処分に必要な見積額", delta: -remainsCost, runningTotal: landPrice - demolitionCost - remainsCost },
          { label: "④ その他費用の控除", detail: "測量・登記・残置物以外の撤去費用等", delta: -otherCost, runningTotal: landPrice - demolitionCost - remainsCost - otherCost },
        ]
      : [
          { label: "① 土地の想定価格", detail: "地価公示・固定資産税評価額等を参考に入力", delta: landPrice, runningTotal: landPrice },
          { label: "② 建物の評価額の加算", detail: "再販可能な建物は古家としての評価が加算される", delta: buildingValue, runningTotal: landPrice + buildingValue },
          { label: "③ 残置物処分費用の控除", detail: "家具・家電等の撤去・処分に必要な見積額", delta: -remainsCost, runningTotal: landPrice + buildingValue - remainsCost },
          { label: "④ その他費用の控除", detail: "測量・登記・残置物以外の撤去費用等", delta: -otherCost, runningTotal: landPrice + buildingValue - remainsCost - otherCost },
        ];

  const { rawEstimate } = calcBuyoutEstimate({
    buildingStatus,
    landPrice,
    buildingValue,
    demolitionCost,
    remainsCost,
    otherCost,
  });
  const finalEstimate = rawEstimate;
  const isZeroOrLess = finalEstimate <= 0;
  const estimateDisplay = Math.max(0, Math.round(finalEstimate));

  // 参考: 仲介で現状のまま売却した場合の仲介手数料上限（税込）
  const feeCapTaxIncluded = referenceBrokerageFeeCap({
    buildingStatus,
    landPrice,
    buildingValue,
    demolitionCost,
    remainsCost,
    otherCost,
  });

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            老朽化・残置物ありの空き家対応
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家買取査定シミュレーター（計算過程つき）
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          土地の想定価格と各費用の見積額を入力すると、買取査定で使われる「更地換算」の計算過程をステップごとに確認できます。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:grid-cols-12 md:p-10">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-6">
          <div>
            <label
              htmlFor={statusId}
              className="block text-xs sm:text-sm font-bold text-[#14243a]"
            >
              ① 建物の状態
            </label>
            <select
              id={statusId}
              value={buildingStatus}
              onChange={(e) => setBuildingStatus(e.target.value as BuildingStatus)}
              className="mt-2.5 block w-full rounded-lg border border-[#dfe9ee] bg-white px-4 py-3 text-sm font-bold text-[#14243a] focus:border-[#078c95] focus:outline-none shadow-sm"
            >
              <option value="aged">老朽化している（解体前提の更地換算）</option>
              <option value="resalable">再販可能（古家として評価がつく）</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={landPriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 土地の想定価格</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {landPrice.toLocaleString()} 万円
              </span>
            </label>
            <input
              id={landPriceId}
              type="range"
              min={100}
              max={10000}
              step={50}
              value={landPrice}
              onChange={(e) => setLandPrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>100万円</span>
              <span>1億円</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#708696]">
              国土交通省の「地価公示」・都道府県の「地価調査」や市町村の固定資産税評価額を参考に入力します。
            </p>
          </div>

          {buildingStatus === "aged" ? (
            <div>
              <label
                htmlFor={demolitionId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>③ 解体費用の見積額</span>
                <span className="text-sm sm:text-base font-black text-[#14243a]">
                  {demolitionCost} 万円
                </span>
              </label>
              <input
                id={demolitionId}
                type="range"
                min={0}
                max={500}
                step={10}
                value={demolitionCost}
                onChange={(e) => setDemolitionCost(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#708696]">
                解体費用は構造・広さ・アスベストの有無等により異なるため、解体業者の見積額を入力します。
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor={buildingValueId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>③ 建物の評価額</span>
                <span className="text-sm sm:text-base font-black text-[#14243a]">
                  {buildingValue} 万円
                </span>
              </label>
              <input
                id={buildingValueId}
                type="range"
                min={0}
                max={2000}
                step={50}
                value={buildingValue}
                onChange={(e) => setBuildingValue(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#708696]">
                再販可能な建物は「古家」として評価額が加算されます（業者の簡易査定額を参考に入力）。
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor={remainsId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>④ 残置物の処分費用見積額</span>
              <span className="text-sm sm:text-base font-black text-[#14243a]">
                {remainsCost} 万円
              </span>
            </label>
            <input
              id={remainsId}
              type="range"
              min={0}
              max={200}
              step={5}
              value={remainsCost}
              onChange={(e) => setRemainsCost(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
          </div>

          <div>
            <label
              htmlFor={otherId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>⑤ その他費用（測量・登記等）</span>
              <span className="text-sm sm:text-base font-black text-[#14243a]">
                {otherCost} 万円
              </span>
            </label>
            <input
              id={otherId}
              type="range"
              min={0}
              max={100}
              step={5}
              value={otherCost}
              onChange={(e) => setOtherCost(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
          </div>
        </div>

        {/* 計算過程・結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 shadow-sm sm:p-8 md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              CALCULATION PROCESS
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#506477]">
              買取査定額の計算過程（更地換算）
            </h4>

            {/* 計算過程のステップ表示 */}
            <ol className="mt-5 space-y-2.5">
              {steps.map((step) => (
                <li
                  key={step.label}
                  className="rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(20,36,58,0.04)] border border-[#dfe9ee]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-black text-[#14243a] sm:text-sm">
                      {step.label}
                    </p>
                    <p
                      className={`shrink-0 text-sm font-black ${
                        step.delta < 0 ? "text-[#d9483b]" : "text-[#0a7079]"
                      }`}
                    >
                      {step.delta < 0 ? "−" : "+"}{" "}
                      {Math.abs(step.delta).toLocaleString()} 万円
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696]">
                    {step.detail}
                  </p>
                  <p className="mt-1.5 text-[11px] font-bold text-[#506477]">
                    小計: {Math.round(step.runningTotal).toLocaleString()} 万円
                  </p>
                </li>
              ))}
            </ol>

            {/* 査定額目安 */}
            <div className="mt-6 rounded-2xl bg-white p-5 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/50 sm:p-7">
              <p className="text-xs sm:text-sm font-bold text-[#0a7079]">
                買取査定額の目安
              </p>
              {isZeroOrLess ? (
                <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#708696]">
                  0 万円（査定額がつかない可能性）
                </p>
              ) : (
                <p className="mt-2 text-3xl font-black tracking-tight text-[#078c95] sm:text-4xl md:text-5xl">
                  約 {estimateDisplay.toLocaleString()}{" "}
                  <span className="text-base font-normal text-[#506477] sm:text-lg">
                    万円
                  </span>
                </p>
              )}
              <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
                控除額が土地価格を上回る場合、査定額がつかないか、解体費相当の持ち出しとなるケースがあります。
              </p>
            </div>

            {/* 参考: 仲介手数料上限 */}
            <div className="mt-5 rounded-xl border border-[#dfe9ee] bg-white p-4 text-xs sm:text-sm">
              <p className="font-black text-[#14243a]">
                参考: 仲介で売却した場合の仲介手数料上限
              </p>
              <div className="mt-2 space-y-1.5 text-[#506477]">
                <p>
                  想定売却価格 {(buildingStatus === "resalable" ? landPrice + buildingValue : landPrice).toLocaleString()} 万円に対する手数料上限:{" "}
                  <strong className="text-[#14243a]">
                    {feeCapTaxIncluded.toLocaleString()} 万円（税込）
                  </strong>
                </p>
                <p className="leading-relaxed">
                  買取（業者が直接購入する方法）には仲介手数料が発生しません。上限は宅地建物取引業法第46条第1項に基づく国土交通省告示第十五号（200万円以下の部分5%・200万円超400万円以下の部分4%・400万円超の部分2%＋消費税）で計算しています。
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※本シミュレーターは更地換算の考え方に基づく計算過程の可視化ツールです。実際の査定額は再販見込み、金利・市況、土地の法規制（再建築の可否等）、税務上の状況により変動します。具体的な取引は不動産会社・税理士等にご相談ください。
          </p>
        </div>
      </div>
    </section>
  );
}
