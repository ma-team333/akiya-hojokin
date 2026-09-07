"use client";

import { useState } from "react";

type QuestionAnswer = "yes" | "no" | "undecided";

export function DemolitionRequirementFlow() {
  const [q1, setQ1] = useState<QuestionAnswer>("undecided"); // 接道義務を満たしているか（再建築可能か）
  const [q2, setQ2] = useState<QuestionAnswer>("undecided"); // 建物は昭和56年5月31日以前の旧耐震（または倒壊危険家屋）か
  const [q3, setQ3] = useState<QuestionAnswer>("undecided"); // 先行して解体費用（150万〜300万円）を自費で支払う余裕があるか
  const [q4, setQ4] = useState<QuestionAnswer>("undecided"); // 自治体の解体補助金（除却助成金）の交付対象になりそうか
  const [q5, setQ5] = useState<QuestionAnswer>("undecided"); // エリア需要は新築更地が中心（古家の需要が低い）か

  const resetAll = () => {
    setQ1("undecided");
    setQ2("undecided");
    setQ3("undecided");
    setQ4("undecided");
    setQ5("undecided");
  };

  const isComplete =
    q1 !== "undecided" &&
    q2 !== "undecided" &&
    q3 !== "undecided" &&
    q4 !== "undecided" &&
    q5 !== "undecided";

  // 診断ロジック判定
  const isUnbuildable = q1 === "no";
  const recommendConditional = !isUnbuildable && q3 === "no";
  const recommendAsIs = !isUnbuildable && q5 === "no" && q2 === "no";
  const recommendDemolish = !isUnbuildable && q3 === "yes" && q5 === "yes";

  const questions = [
    {
      num: 1,
      title: "敷地は幅員4m以上の道路に【2m以上接道】していますか？（再建築可能か）",
      desc: "建築基準法第42条・43条の接道義務を満たさない土地（再建築不可）は、一度解体すると二度と新築を建てられなくなります。",
      val: q1,
      setVal: setQ1,
    },
    {
      num: 2,
      title: "建物は【昭和56年（1981年）5月31日以前】に建築された旧耐震住宅ですか？",
      desc: "旧耐震住宅は耐震改修を行わない限りそのまま居住することが難しく、相続空き家3000万円特別控除の対象要件にも関係します。",
      val: q2,
      setVal: setQ2,
    },
    {
      num: 3,
      title: "売却前に手元資金から【100万〜300万円の解体費用】を先行支出できますか？",
      desc: "先行支出できない場合、解体ローンや更地渡し特約、買主解体特約を活用することで手出し0円での売却が可能です。",
      val: q3,
      setVal: setQ3,
    },
    {
      num: 4,
      title: "所在自治体に【空き家解体補助金（除却補助金）】の制度がありますか？",
      desc: "※補助金を利用する場合は、必ず解体業者との契約・工事着工【前】に自治体への申請・交付決定通知が必要です。",
      val: q4,
      setVal: setQ4,
    },
    {
      num: 5,
      title: "周辺エリアの購入希望者は【新築用地（更地）】を求める人が主流ですか？",
      desc: "都市近郊や住宅地では更地需要が高く、地方や観光地・郊外では古家リノベーションや別荘需要が存在する場合があります。",
      val: q5,
      setVal: setQ5,
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            DECISION FLOWCHART
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            「更地」vs「古家付き」最適売却ルート診断
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            5つの質問に回答するだけで、解体損や増税リスクを回避する最適な売却方針を判定します。
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-[#bbd8dc] bg-white px-3.5 py-1.5 text-xs font-bold text-[#506477] transition hover:border-[#078c95] hover:text-[#078c95]"
        >
          リセット
        </button>
      </div>

      {/* 質問リスト */}
      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        {questions.map((q) => (
          <div
            key={q.num}
            className="flex flex-col justify-between gap-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 md:flex-row md:items-center"
          >
            <div className="pr-0 md:pr-4">
              <span className="inline-block rounded bg-[#14243a] px-2.5 py-0.5 text-[11px] font-bold text-white">
                STEP {q.num}
              </span>
              <p className="mt-2 text-sm font-black text-[#14243a] sm:text-base leading-relaxed">
                {q.title}
              </p>
              <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#708696]">
                {q.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:shrink-0 sm:gap-3 pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => q.setVal("yes")}
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  q.val === "yes"
                    ? "border-[#078c95] bg-[#078c95] text-white shadow-[0_4px_14px_rgba(7,140,149,0.3)] ring-2 ring-[#078c95]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#078c95] hover:text-[#078c95]"
                }`}
              >
                <span>✓</span> はい
              </button>
              <button
                type="button"
                onClick={() => q.setVal("no")}
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  q.val === "no"
                    ? "border-[#d9483b] bg-[#d9483b] text-white shadow-[0_4px_14px_rgba(217,72,59,0.3)] ring-2 ring-[#d9483b]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#d9483b] hover:text-[#d9483b]"
                }`}
              >
                <span>✕</span> いいえ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 診断結果表示 */}
      {isComplete ? (
        <div className="mt-8 rounded-xl p-6 sm:p-8 border border-[#078c95]/40 bg-[#f0f7f7]">
          {isUnbuildable ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-rose-700 font-black text-base sm:text-lg">
                <span className="text-2xl">🚫</span>
                <span>解体厳禁！「古家付き土地（現状渡し）」一択です</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                接道義務を満たしていない「再建築不可」物件を解体すると、新しく建物を建てることができなくなり、土地の資産価値が暴落します。必ず建物を残したまま、リフォーム前提の古家付き土地や専門の買取業者へ現状渡しで売却してください。
              </p>
            </div>
          ) : recommendConditional ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
                <span className="text-2xl">💡</span>
                <span>推奨ルート：「更地渡し条件付き契約（契約後解体）」での売り出し</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                解体費用を先行支出せず、固定資産税の住宅用地特例（1/6減額）を維持しながら売り出すのが最も安全です。『買主が更地を希望する場合は売買契約成立後に売主側で解体・更地渡し』とする特約を結ぶことで、資金の持ち出しと売れ残り増税リスクを完全に回避できます。
              </p>
            </div>
          ) : recommendDemolish ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#087f88] font-black text-base sm:text-lg">
                <span className="text-2xl">🏗️</span>
                <span>推奨ルート：「補助金申請後の更地先行解体」または更地渡し</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                新築需要が高い立地で自己資金に余裕がある場合、更地化することで即時建築を求める買主へ高値成約が狙えます。ただし、工事契約・着工前に自治体の解体補助金を必ず申請し、年内売却完了のスケジュール管理を徹底してください。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
                <span className="text-2xl">📋</span>
                <span>推奨ルート：「古家付き土地（更地渡し相談可）」での両面募集</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                古家のままでも需要が見込める状態です。古家付き土地として現状渡しを基本としつつ、新築希望者には更地渡しも対応可能とすることで、幅広い購入検討層を集められます。
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
