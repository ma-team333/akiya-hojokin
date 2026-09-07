"use client";

import { useState } from "react";

type Choice = "brokerage" | "buyout" | "undecided";

export function BrokerageBuyoutDecisionFlow() {
  const [q1, setQ1] = useState<Choice>("undecided"); // 売却期限: 3ヶ月以上待てる vs 1ヶ月以内に現金化したい
  const [q2, setQ2] = useState<Choice>("undecided"); // 物件状態: 築浅・標準的 vs 築古・雨漏り・再建築不可
  const [q3, setQ3] = useState<Choice>("undecided"); // 片付け・解体: 自費で手配可能 vs 現状そのままで手放したい
  const [q4, setQ4] = useState<Choice>("undecided"); // 周囲告知: ポータル掲載OK vs 近所に知られたくない
  const [q5, setQ5] = useState<Choice>("undecided"); // 売却後責任: 3ヶ月責任OK vs 免責特約でリスクを抑えたい

  const isComplete =
    q1 !== "undecided" &&
    q2 !== "undecided" &&
    q3 !== "undecided" &&
    q4 !== "undecided" &&
    q5 !== "undecided";

  const brokerageScore = [q1, q2, q3, q4, q5].filter((v) => v === "brokerage").length;
  const buyoutScore = [q1, q2, q3, q4, q5].filter((v) => v === "buyout").length;

  const resetAll = () => {
    setQ1("undecided");
    setQ2("undecided");
    setQ3("undecided");
    setQ4("undecided");
    setQ5("undecided");
  };

  const questions = [
    {
      num: 1,
      title: "売却・現金化までの希望スケジュールは？",
      desc: "住み替え資金の支払期日や相続税納税期限（10ヶ月以内）などの制約を基準に判断します。",
      val: q1,
      setVal: setQ1,
      btnBrokerage: "3ヶ月以上待てる（高値優先）",
      btnBuyout: "1ヶ月以内に現金化したい（スピード優先）",
    },
    {
      num: 2,
      title: "建物の状態・築年数は？",
      desc: "一般の買い手が住宅ローンを組んでそのまま住めるかどうかが重要な分岐点です。",
      val: q2,
      setVal: setQ2,
      btnBrokerage: "築浅〜築30年以内（住居・通常状態）",
      btnBuyout: "築古・雨漏り・傾き・再建築不可",
    },
    {
      num: 3,
      title: "室内の家財道具（残置物）や解体工事の自費負担は？",
      desc: "仲介の場合は原則売主が片付けを行い、古家の場合は更地解体を求められることがあります。",
      val: q3,
      setVal: setQ3,
      btnBrokerage: "自費で片付け・解体手配が可能",
      btnBuyout: "手元資金ゼロ・現状そのままで引き渡したい",
    },
    {
      num: 4,
      title: "販売活動（ネット広告・看板設置・内覧対応）は可能？",
      desc: "仲介はSUUMO等のポータルサイトへ掲載されます。買取は内見1回のみで広告なしです。",
      val: q4,
      setVal: setQ4,
      btnBrokerage: "ネット広告・内覧対応OK",
      btnBuyout: "近所に知られず内密に売却したい",
    },
    {
      num: 5,
      title: "引渡し後の「契約不適合責任（旧瑕疵担保責任）」への不安は？",
      desc: "個人間売買では引渡し後に雨漏り・シロアリが発覚すると修繕費用を請求されるリスクがあります。",
      val: q5,
      setVal: setQ5,
      btnBrokerage: "一定の修繕責任（約3ヶ月）を負える",
      btnBuyout: "免責特約で売却後のリスクを抑えたい",
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            DECISION FLOW
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            あなたに合うのはどっち？「仲介 vs 買取」セルフ診断
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            5つの質問に答えるだけで、物件状況やご希望に応じた最適な売却ルートを判定します。
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
            className="flex flex-col justify-between gap-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 lg:flex-row lg:items-center"
          >
            <div className="lg:max-w-[50%]">
              <span className="inline-block rounded bg-[#14243a] px-2.5 py-0.5 text-[11px] font-bold text-white">
                質問 {q.num}
              </span>
              <p className="mt-2 text-sm font-black text-[#14243a] sm:text-base leading-relaxed">
                {q.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#708696]">
                {q.desc}
              </p>
            </div>

            {/* 選択ボタン */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:shrink-0 lg:w-[48%]">
              <button
                type="button"
                onClick={() => q.setVal("brokerage")}
                className={`min-h-12 rounded-lg border px-4 py-3 text-xs sm:text-sm font-bold transition-all text-left flex items-center justify-between ${
                  q.val === "brokerage"
                    ? "border-[#078c95] bg-[#078c95] text-white shadow-[0_4px_14px_rgba(7,140,149,0.25)] ring-2 ring-[#078c95]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#078c95]"
                }`}
              >
                <span>{q.btnBrokerage}</span>
                <span className="shrink-0 text-xs ml-1">
                  {q.val === "brokerage" ? "●" : "○"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => q.setVal("buyout")}
                className={`min-h-12 rounded-lg border px-4 py-3 text-xs sm:text-sm font-bold transition-all text-left flex items-center justify-between ${
                  q.val === "buyout"
                    ? "border-[#e56f2d] bg-[#e56f2d] text-white shadow-[0_4px_14px_rgba(229,111,45,0.25)] ring-2 ring-[#e56f2d]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#e56f2d]"
                }`}
              >
                <span>{q.btnBuyout}</span>
                <span className="shrink-0 text-xs ml-1">
                  {q.val === "buyout" ? "●" : "○"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 診断結果表示 */}
      {isComplete ? (
        <div className="mt-8 rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8">
          {brokerageScore >= 4 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0a7079] font-black text-base sm:text-lg">
                <span className="text-2xl">🏆</span>
                <span>診断結果: 「仲介（一般市場売却）」が圧倒的におすすめです！</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                時間に余裕があり、物件の状態も良好であるため、ポータルサイトを活用して一般買主へ広くアプローチすることで<strong>最高値での売却（相場の100%）</strong>が期待できます。まずは信頼できる複数社へ仲介査定を依頼し、適正な売出価格を設定しましょう。
              </p>
            </div>
          ) : buyoutScore >= 4 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#e56f2d] font-black text-base sm:text-lg">
                <span className="text-2xl">⚡</span>
                <span>診断結果: 「不動産買取（専門業者直接買取）」が最も適しています！</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                スピード重視、築古・雨漏り・残置物あり、契約不適合責任免責の希望が強いため、直接買取がベストです。<strong>仲介手数料0円・荷物そのままで最短数日〜2週間で即現金化</strong>でき、売却後のクレームリスクも免責特約で原則回避できます。買取専門業者複数社で相見積もりを取り、最高買取額を引き出しましょう。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#2563eb] font-black text-base sm:text-lg">
                <span className="text-2xl">⚖️</span>
                <span>診断結果: 「買取保証付き仲介」または「仲介から始めて買取へ移行」が最適です！</span>
              </div>
              <p className="text-xs sm:text-sm leading-loose text-[#14243a]">
                高値売却も狙いたい一方で、期限や物件状態への不安もあるハイブリッドな状況です。<strong>最初の1〜3ヶ月は仲介で高値チャレンジを行い、売れ残った場合に確定価格で買い取ってもらう「買取保証」</strong>を活用することで、高値のチャンスと確実な現金化の両方を安全に両立できます。
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-[#bbd8dc] bg-[#f8fbfa] p-4 text-center text-xs text-[#708696]">
          ※すべての項目（5問）を選択すると、詳しい診断結果とアドバイスが表示されます。
        </div>
      )}
    </div>
  );
}
