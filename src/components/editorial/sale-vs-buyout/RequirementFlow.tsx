"use client";

import { useState } from "react";

type Answer = "yes" | "no" | "undecided";

export function RequirementFlow() {
  const [qUrgency, setQUrgency] = useState<Answer>("undecided"); // 3ヶ月以内の現金化・期限が迫っているか
  const [qPhysicalCondition, setQPhysicalCondition] = useState<Answer>("undecided"); // 著しい老朽化・雨漏り・大量ゴミがあるか
  const [qLegalIssue, setQLegalIssue] = useState<Answer>("undecided"); // 再建築不可・境界不明等の法的制限があるか
  const [qOutflowFunds, setQOutflowFunds] = useState<Answer>("undecided"); // 解体費や片付け費用（数十万〜数百万円）を先出しできるか
  const [qDisputeRisk, setQDisputeRisk] = useState<Answer>("undecided"); // 売却後の契約不適合責任（雨漏り・地中物等）を免責特約で軽減したいか

  const isAllAnswered =
    qUrgency !== "undecided" &&
    qPhysicalCondition !== "undecided" &&
    qLegalIssue !== "undecided" &&
    qOutflowFunds !== "undecided" &&
    qDisputeRisk !== "undecided";

  // 判定ロジック
  // 買取推奨スコア
  let buyoutPoints = 0;
  if (qUrgency === "yes") buyoutPoints += 2;
  if (qPhysicalCondition === "yes") buyoutPoints += 2;
  if (qLegalIssue === "yes") buyoutPoints += 3;
  if (qOutflowFunds === "no") buyoutPoints += 1.5;
  if (qDisputeRisk === "yes") buyoutPoints += 1.5;

  let recommendation: "buyout" | "brokerage_as_is" | "brokerage_demolish" = "brokerage_as_is";
  if (buyoutPoints >= 3.5) {
    recommendation = "buyout";
  } else if (qOutflowFunds === "yes" && qPhysicalCondition === "yes") {
    recommendation = "brokerage_demolish";
  } else {
    recommendation = "brokerage_as_is";
  }

  const resetAll = () => {
    setQUrgency("undecided");
    setQPhysicalCondition("undecided");
    setQLegalIssue("undecided");
    setQOutflowFunds("undecided");
    setQDisputeRisk("undecided");
  };

  const questions = [
    {
      num: 1,
      title: "相続税申告（10ヶ月以内）や特例期限など、早急な現金化・処分が必要ですか？",
      desc: "相続税の納税資金調達や、空き家特例の期限（3年後の年末）が迫っている場合はスピードが最優先となります。",
      val: qUrgency,
      setVal: setQUrgency,
      yesLabel: "はい（最短で手放したい）",
      noLabel: "いいえ（半年〜1年待てる）",
    },
    {
      num: 2,
      title: "建物に著しい老朽化（雨漏り・傾き・床抜け）や大量の残置物（ゴミ屋敷等）がありますか？",
      desc: "一般の個人買主向け仲介では内見時の印象や耐震不安により買い手がつきにくい要因となります。",
      val: qPhysicalCondition,
      setVal: setQPhysicalCondition,
      yesLabel: "はい（状態が悪い・荷物多数）",
      noLabel: "いいえ（手入れ良好または軽微）",
    },
    {
      num: 3,
      title: "再建築不可（接道義務未充足）や境界非明示、崖条例などの制限がありますか？",
      desc: "建築基準法第42条・43条を満たさない土地は住宅ローン融資がつかず、一般市場での流通が極めて困難です。",
      val: qLegalIssue,
      setVal: setQLegalIssue,
      yesLabel: "はい（制限あり・不明）",
      noLabel: "いいえ（通常の住宅地・道路接道）",
    },
    {
      num: 4,
      title: "売却前に解体費用（100万〜200万円）や残置物撤去費用を自己資金で先出しできますか？",
      desc: "更地渡しや事前の荷物全撤去を行うには、売却代金が入る前に現金の持ち出しが必要です。",
      val: qOutflowFunds,
      setVal: setQOutflowFunds,
      yesLabel: "はい（資金先出し可能）",
      noLabel: "いいえ（持ち出し費用ゼロにしたい）",
    },
    {
      num: 5,
      title: "売却後に欠陥が見つかった場合の責任（契約不適合責任）を原則免除（リスク軽減）したいですか？",
      desc: "個人向け仲介では引渡し後数ヶ月間の修補義務が生じる可能性があります。宅建業者買取なら免責特約で原則回避できますが、消費者契約法第8条により知らなかった欠陥の責任まで免除する特約は無効です。",
      val: qDisputeRisk,
      setVal: setQDisputeRisk,
      yesLabel: "はい（免責特約でリスク軽減を希望）",
      noLabel: "いいえ（一定の修補責任を許容）",
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      {/* タイトル */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            DECISION FLOWCHART
          </span>
          <h3 className="mt-1 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            空き家売却「仲介 vs 買取 vs 更地」適合ルート診断
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#506477]">
            5つの質問に回答することで、物件状況と売主方針に応じた客観的な推奨手法を確認できます。
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-[#dfe9ee] bg-[#f8fbfa] px-3.5 py-1.5 text-xs font-bold text-[#506477] transition hover:bg-[#eef5f7] hover:text-[#14243a]"
        >
          回答をリセット
        </button>
      </div>

      {/* 質問リスト */}
      <div className="mt-8 space-y-6">
        {questions.map((q) => {
          return (
            <div
              key={q.num}
              className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-5 transition-colors sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14243a] text-xs font-black text-white">
                  Q{q.num}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-[#14243a] sm:text-base leading-snug">
                    {q.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#708696] leading-relaxed">
                    {q.desc}
                  </p>
                </div>
              </div>

              {/* 選択肢ボタン */}
              <div className="mt-4 flex flex-wrap gap-2.5 sm:ml-9">
                <button
                  type="button"
                  onClick={() => q.setVal("yes")}
                  className={`flex-1 min-w-[140px] rounded-lg border py-2.5 px-3 text-center text-xs font-bold transition sm:text-sm ${
                    q.val === "yes"
                      ? "border-[#078c95] bg-[#078c95] text-white shadow-sm"
                      : "border-[#dfe9ee] bg-white text-[#14243a] hover:bg-[#f0f7f7]"
                  }`}
                >
                  {q.yesLabel}
                </button>
                <button
                  type="button"
                  onClick={() => q.setVal("no")}
                  className={`flex-1 min-w-[140px] rounded-lg border py-2.5 px-3 text-center text-xs font-bold transition sm:text-sm ${
                    q.val === "no"
                      ? "border-[#14243a] bg-[#14243a] text-white shadow-sm"
                      : "border-[#dfe9ee] bg-white text-[#14243a] hover:bg-[#f0f7f7]"
                  }`}
                >
                  {q.noLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 診断結果表示 */}
      {isAllAnswered ? (
        <div className="mt-8 rounded-2xl border-2 border-[#078c95] bg-[#f0f7f7] p-6 sm:p-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#078c95]">
            DIAGNOSIS RESULT
          </span>

          {recommendation === "buyout" && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#078c95] px-3 py-1 text-xs font-black text-white">
                  判定: 不動産会社買取（直接買取）が適合
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#14243a]">
                「即時現金化・現状渡し・契約不適合責任の原則免責」によるリスク回避が合理的
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                老朽化、残置物、再建築不可などの制約、または早期処分・責任リスクの軽減を重視する要件を満たしています。一般仲介での長期停滞・値下げリスクや売却後の修補トラブルを避け、現状のまま数週間〜1ヶ月程度で確実に手放す買取ルートが客観的に適しています。
              </p>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm font-bold text-[#14243a]">
                <li className="flex items-center gap-2">
                  <span className="text-[#078c95]">✓</span> 仲介手数料0円・事前片付けや解体費の持ち出し不要
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#078c95]">✓</span> 免責特約で引渡し後の契約不適合責任を原則免除（知らなかった欠陥の責任は残る）
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#078c95]">✓</span> 固定資産税や管理責任が決済日をもって即時消滅
                </li>
              </ul>
            </div>
          )}

          {recommendation === "brokerage_demolish" && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e56f2d] px-3 py-1 text-xs font-black text-white">
                  判定: 更地渡しによる一般仲介売却が適合
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#14243a]">
                「自費解体して新築用地として市場売却」することで手残りを最大化
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                立地条件が良好で接道制限がなく、自己資金で解体費用を先出しできる体制があります。古い建物を解体して更地にすることで、新築用地を求める一般個人買主向けに市場相場価格（100%基準）での売却を狙えます。
              </p>
              <p className="text-xs text-[#708696]">
                ※更地にした翌年1月1日時点で未成約の場合、固定資産税の住宅用地特例が外れる点にご留意ください。
              </p>
            </div>
          )}

          {recommendation === "brokerage_as_is" && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-black text-white">
                  判定: 古家付き土地（現状渡し）での一般仲介が適合
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#14243a]">
                「建物を残したまま市場売却」し、買主側のリノベ・解体需要を捕捉
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                物件状態が比較的保たれており、処分までの時間に一定の余裕があります。解体費を持ち出さずに古家付き土地として売出し、DIY・古民家リノベーション希望者や買主解体（3000万円特別控除の買主解体特約活用）をターゲットに市場相場での成約を目指すルートが有力です。
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-[#bbd8dc] bg-[#fbfaf7] p-5 text-center text-xs sm:text-sm font-bold text-[#708696]">
          上記のすべての質問に回答すると、客観的な適合判定結果が表示されます。
        </div>
      )}
    </div>
  );
}
