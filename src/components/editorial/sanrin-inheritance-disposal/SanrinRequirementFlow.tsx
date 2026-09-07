"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

export function SanrinRequirementFlow() {
  const [q1, setQ1] = useState<StepStatus>("undecided"); // 境界や大まかな位置が把握できているか
  const [q2, setQ2] = useState<StepStatus>("undecided"); // 公道や林道、作業道に接しているか（車両・重機進入可能か）
  const [q3, setQ3] = useState<StepStatus>("undecided"); // スギ・ヒノキなど手入れされた人工林（用材林）か
  const [q4, setQ4] = useState<StepStatus>("undecided"); // 崩壊・土砂崩れの危険がある急傾斜地・崖地ではないか
  const [q5, setQ5] = useState<StepStatus>("undecided"); // 隣地所有者と連絡が取れる、または地元で特定可能か
  const [q6, setQ6] = useState<StepStatus>("undecided"); // 相続登記および森林法第10条の7の2の届出が完了しているか

  const resetAll = () => {
    setQ1("undecided");
    setQ2("undecided");
    setQ3("undecided");
    setQ4("undecided");
    setQ5("undecided");
    setQ6("undecided");
  };

  const isComplete =
    q1 !== "undecided" &&
    q2 !== "undecided" &&
    q3 !== "undecided" &&
    q4 !== "undecided" &&
    q5 !== "undecided" &&
    q6 !== "undecided";

  // 推奨ルートの判定ロジック
  const canSellTimber = q2 === "yes" && q3 === "yes"; // 林道あり＋人工林 → 立木売却・森林組合施業委託
  const canGeneralMarketSale = q1 === "yes" && q2 === "yes"; // 境界あり＋接道あり → 山林バンク・専門仲介
  const canKokkoKizoku = q1 === "yes" && q4 === "yes"; // 境界明確＋危険崖地なし → 相続土地国庫帰属制度
  const canNeighborTransfer = q5 === "yes"; // 隣地連絡可能 → 隣地所有者への打診

  const questions = [
    {
      num: 1,
      title: "山林の大まかな位置や境界（公図・目印）が把握できていますか？",
      desc: "市町村の森林簿や法務局の公図、現地の境界杭などで確認できる状態か判定します。",
      val: q1,
      setVal: setQ1,
    },
    {
      num: 2,
      title: "公道、林道、または作業道に接しており、車両や重機の出入りが可能ですか？",
      desc: "接道がない「無道路地（飛び地）」の場合、間伐や伐採重機の搬入が困難になります。",
      val: q2,
      setVal: setQ2,
    },
    {
      num: 3,
      title: "スギ・ヒノキなど、過去に植林・手入れされた人工林（用材林）ですか？",
      desc: "雑木林（天然林）ではなく樹齢35〜50年以上の人工林は立木としての資産価値があります。",
      val: q3,
      setVal: setQ3,
    },
    {
      num: 4,
      title: "土砂崩れ・崖崩れの危険がある急傾斜地や危険個所はありませんか？",
      desc: "崩壊危険のある崖地や危険工作物がある場合、国庫帰属制度の不承認要件に該当します。",
      val: q4,
      setVal: setQ4,
    },
    {
      num: 5,
      title: "隣接する山林の所有者が判明している、または連絡を取ることができますか？",
      desc: "隣地所有者が林業を営んでいる場合や土地集約を進めている場合、売却・譲渡の有力候補になります。",
      val: q5,
      setVal: setQ5,
    },
    {
      num: 6,
      title: "相続登記および市町村への「森林の土地の所有者届出」は済んでいますか？",
      desc: "2024年4月の相続登記義務化および森林法（90日以内）の公的義務項目です。",
      val: q6,
      setVal: setQ6,
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            DISPOSAL ROUTE CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            山林の売却・処分適性 6つのセルフチェック診断
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            山林の立地・樹種・境界条件をチェックして、適した売却・処分ルート（立木売却、専門仲介、国庫帰属、隣地譲渡など）を判定します。
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
                条件 {q.num}
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
        <div className="mt-8 rounded-xl border border-[#078c95]/40 bg-[#f0f7f7] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
            <span className="text-2xl">🌲</span>
            <span>診断結果：検討可能な処分・活用ルート</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <div
              className={`rounded-lg p-4 border ${
                canSellTimber
                  ? "bg-white border-[#078c95] shadow-sm"
                  : "bg-white/60 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#14243a]">① 森林組合への立木売却・施業委託</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    canSellTimber ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {canSellTimber ? "有力ルート" : "条件不適合"}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#506477] leading-relaxed">
                接道があり人工林であるため、立木（木材）としての売却や、森林組合に間伐・皆伐を委託して収益化できる可能性があります。
              </p>
            </div>

            <div
              className={`rounded-lg p-4 border ${
                canGeneralMarketSale
                  ? "bg-white border-[#078c95] shadow-sm"
                  : "bg-white/60 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#14243a]">② 山林専門仲介・マッチングサイト</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    canGeneralMarketSale ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {canGeneralMarketSale ? "有力ルート" : "条件不適合"}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#506477] leading-relaxed">
                境界と接道が確保されているため、キャンプ用途や自然愛好家向けに山林売買専門サイト（山林バンク等）で買い手を募ることができます。
              </p>
            </div>

            <div
              className={`rounded-lg p-4 border ${
                canKokkoKizoku
                  ? "bg-white border-[#078c95] shadow-sm"
                  : "bg-white/60 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#14243a]">③ 相続土地国庫帰属制度</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    canKokkoKizoku ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {canKokkoKizoku ? "申請検討可" : "却下リスク高"}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#506477] leading-relaxed">
                危険な崖地がなく境界が明確であれば、国への引き取り申請が可能です（所定の審査手数料および負担金が必要となります）。
              </p>
            </div>

            <div
              className={`rounded-lg p-4 border ${
                canNeighborTransfer
                  ? "bg-white border-[#078c95] shadow-sm"
                  : "bg-white/60 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#14243a]">④ 隣地所有者への売却・無償譲渡</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    canNeighborTransfer ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {canNeighborTransfer ? "打診推奨" : "相手方特定要"}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#506477] leading-relaxed">
                隣接地の所有者が判明している場合、一体利用や境界トラブル解消の観点から、買い取りや無償引き取りの相談が成立しやすい傾向があります。
              </p>
            </div>
          </div>

          {q6 === "no" && (
            <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 font-bold">
              ⚠️ 注意: 相続登記（3年以内・過料あり）または市町村への森林所有者届出（90日以内・過料あり）が未完了です。売却や国庫帰属の手続きを進める前提として、速やかな届出・登記申請を行ってください。
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
