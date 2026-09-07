"use client";

import { useState } from "react";
import { TOKUTEI_AKIYA_CHECK_ITEMS } from "./article-data";

export function TokuteiAkiyaCheckFlow() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    structural: null,
    sanitary: null,
    landscape: null,
    security: null,
    utilization: null,
  });

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const resetAnswers = () => {
    setAnswers({
      structural: null,
      sanitary: null,
      landscape: null,
      security: null,
      utilization: null,
    });
  };

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const isAllAnswered = answeredCount === TOKUTEI_AKIYA_CHECK_ITEMS.length;

  // 危険度スコア計算
  const dangerScore = TOKUTEI_AKIYA_CHECK_ITEMS.reduce((sum, item) => {
    if (answers[item.id] === true) {
      return sum + item.dangerWeight;
    }
    return sum;
  }, 0);

  const hasHighRisk =
    answers.structural === true ||
    answers.sanitary === true ||
    answers.security === true;

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#14243a] px-5 py-5 sm:px-8 sm:py-6 text-white">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#bbd8dc]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e56f2d]" />
          国土交通省指針・空家法基準準拠
        </div>
        <h3 className="mt-2 text-lg font-black sm:text-2xl text-white">
          特定空家・管理不全空家 要件判定フロー
        </h3>
        <p className="mt-1 text-xs text-[#bbd8dc] sm:text-sm">
          5つの基準項目から、自治体による指導・勧告および住宅用地特例解除（増税）の判定リスクを整理します。
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {/* 進捗バー */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#14243a]">
            <span>回答状況: {answeredCount} / {TOKUTEI_AKIYA_CHECK_ITEMS.length} 項目</span>
            <span className="text-[#078c95]">
              {Math.round((answeredCount / TOKUTEI_AKIYA_CHECK_ITEMS.length) * 100)}% 完了
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#dfe9ee]">
            <div
              className="h-full bg-[#078c95] transition-all duration-300 ease-out"
              style={{ width: `${(answeredCount / TOKUTEI_AKIYA_CHECK_ITEMS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 質問リスト */}
        <div className="space-y-4">
          {TOKUTEI_AKIYA_CHECK_ITEMS.map((item, index) => {
            const currentAnswer = answers[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-xl border p-4 sm:p-5 transition-all ${
                  currentAnswer !== null
                    ? "border-[#078c95]/30 bg-[#f8fbfa]"
                    : "border-[#dfe9ee] bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#078c95]">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#708696] font-medium">
                        〔根拠: {item.legalStandard}〕
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-[#14243a]">
                      問{index + 1}. {item.question}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-[#708696]">
                      判定目安: {item.detail}
                    </p>
                  </div>

                  {/* 「該当あり / 該当なし」ボタン */}
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAnswer(item.id, true)}
                      className={`min-h-11 sm:min-w-24 rounded-lg border px-4 py-2.5 text-xs font-black transition-all ${
                        currentAnswer === true
                          ? "border-[#d9483b] bg-[#d9483b] text-white shadow-sm"
                          : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#bbd8dc] hover:bg-[#fbfaf7]"
                      }`}
                    >
                      該当あり
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(item.id, false)}
                      className={`min-h-11 sm:min-w-24 rounded-lg border px-4 py-2.5 text-xs font-black transition-all ${
                        currentAnswer === false
                          ? "border-[#078c95] bg-[#078c95] text-white shadow-sm"
                          : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#bbd8dc] hover:bg-[#fbfaf7]"
                      }`}
                    >
                      該当なし
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 診断結果パネル */}
        {isAllAnswered && (
          <div className="mt-8 overflow-hidden rounded-xl border border-[#dfe9ee] bg-white shadow-md">
            {dangerScore === 0 ? (
              /* Level 1: 健全 */
              <div className="border-t-4 border-[#2e7d5b] bg-[#eaf5ef] p-6 text-[#14243a]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#2e7d5b] px-3 py-1 text-xs font-black text-white">
                    判定結果: 🟢 住宅用地特例の継続適用水準
                  </span>
                  <span className="text-xs font-bold text-[#2e7d5b]">
                    地方税法第349条の3の2（1/6減額）が維持されます
                  </span>
                </div>
                <h4 className="mt-3 text-base font-black text-[#14243a]">
                  現行基準において「特定空家」「管理不全空家」の勧告対象となる該当項目はありません
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                  建物の保全および衛生状態が維持されています。空き家の状態を維持する場合は、年数回の通風・通水・雑草管理を継続することで特例の適用が維持されます。
                </p>
              </div>
            ) : hasHighRisk || dangerScore >= 3 ? (
              /* Level 3: 危険 */
              <div className="border-t-4 border-[#d9483b] bg-[#fdf2f2] p-6 text-[#14243a]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#d9483b] px-3 py-1 text-xs font-black text-white">
                    判定結果: 🔴 「特定空家等」該当リスク高
                  </span>
                  <span className="text-xs font-bold text-[#d9483b]">
                    勧告により土地固定資産税が約3〜4倍（本則課税）となる対象
                  </span>
                </div>
                <h4 className="mt-3 text-base font-black text-[#d9483b]">
                  空家法第2条第2項に規定される保安・衛生・環境保全の著しい不全状態に該当する可能性が高い状態です
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                  倒壊の危険や衛生有害性が生じている場合、市区町村から「指導・助言」を経て「勧告」を受けると、地方税法の規定に基づき住宅用地特例が解除されます。さらに是正命令に従わない場合は最大50万円の過料や行政代執行（費用求償）の対象となります。
                </p>
              </div>
            ) : (
              /* Level 2: 要注意（管理不全空家） */
              <div className="border-t-4 border-[#e56f2d] bg-[#fef7f2] p-6 text-[#14243a]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e56f2d] px-3 py-1 text-xs font-black text-white">
                    判定結果: 🟡 「管理不全空家等」該当リスクあり
                  </span>
                  <span className="text-xs font-bold text-[#e56f2d]">
                    2023年改正法（空家法第13条）に基づく特例解除の対象候補
                  </span>
                </div>
                <h4 className="mt-3 text-base font-black text-[#14243a]">
                  放置すると「管理不全空家」として勧告を受け、住宅用地特例が解除される可能性があります
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                  庭木の越境や窓ガラス破損、長期未利用などの劣化が見られます。令和5年12月施行の改正法により、倒壊寸前に至らない段階でも市区町村から「勧告」を受けると土地の固定資産税の住宅用地特例が外れ、税負担が増加します。
                </p>
              </div>
            )}

            <div className="flex justify-end border-t border-[#dfe9ee] bg-white px-6 py-3">
              <button
                type="button"
                onClick={resetAnswers}
                className="text-xs font-bold text-[#078c95] hover:underline"
              >
                🔄 回答をリセットして再判定する
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// 別名export（規約互換用）
export { TokuteiAkiyaCheckFlow as RequirementFlow };
