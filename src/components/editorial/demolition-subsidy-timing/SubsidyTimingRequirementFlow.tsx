"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

/**
 * 空き家解体補助金の「申請タイミング・受給要件」セルフチェック。
 *
 * Q1〜Q4は不交付・申請不可に直結する項目（いずれかが「いいえ」で要注意）、
 * Q5・Q6は準備状況の確認項目。実際の判定は自治体の募集要項・窓口が行う。
 */
export function SubsidyTimingRequirementFlow() {
  const [q1, setQ1] = useState<StepStatus>("undecided"); // 交付決定前に契約・着工していない
  const [q2, setQ2] = useState<StepStatus>("undecided"); // 募集期間内・予算枠あり
  const [q3, setQ3] = useState<StepStatus>("undecided"); // 所有権（登記）または相続人全員の合意
  const [q4, setQ4] = useState<StepStatus>("undecided"); // 市町村税の滞納なし
  const [q5, setQ5] = useState<StepStatus>("undecided"); // 対象建物の要件確認（判定・バンク登録等）
  const [q6, setQ6] = useState<StepStatus>("undecided"); // 跡地利用の計画と税影響の把握

  const isComplete =
    q1 !== "undecided" &&
    q2 !== "undecided" &&
    q3 !== "undecided" &&
    q4 !== "undecided" &&
    q5 !== "undecided" &&
    q6 !== "undecided";

  const isReady =
    q1 === "yes" &&
    q2 === "yes" &&
    q3 === "yes" &&
    q4 === "yes" &&
    q5 === "yes" &&
    q6 === "yes";

  const hasBlocking =
    q1 === "no" || q2 === "no" || q3 === "no" || q4 === "no";

  const resetAll = () => {
    setQ1("undecided");
    setQ2("undecided");
    setQ3("undecided");
    setQ4("undecided");
    setQ5("undecided");
    setQ6("undecided");
  };

  const questions = [
    {
      num: 1,
      title: "解体業者との【工事請負契約・着工】はまだですか？",
      desc: "補助金の交付決定前に契約または着工した場合、不交付事由（交付取消事由）となる要項がほとんどです。見積もりや事前相談は該当しません。",
      val: q1,
      setVal: setQ1,
    },
    {
      num: 2,
      title: "自治体の【募集期間内】で、予算枠の空きは確認できていますか？",
      desc: "募集期間・予算枠・受付方式は自治体ごとに異なります。当年度の公式要項と受付状況を確認してください。",
      val: q2,
      setVal: setQ2,
    },
    {
      num: 3,
      title: "建物の【所有権登記】は済んでいますか？（未登記なら相続人全員の合意は得られますか）",
      desc: "申請できるのは原則として登記上の所有者です。相続未登記の場合は相続人全員の同意書等が必要です（相続登記は2024年4月から義務化）。",
      val: q3,
      setVal: setQ3,
    },
    {
      num: 4,
      title: "市町村税（固定資産税・住民税等）の【滞納】はありませんか？",
      desc: "滞納があると交付を受けられない要件が多数です。年度内の納付状況を確認しておきます。",
      val: q4,
      setVal: setQ4,
    },
    {
      num: 5,
      title: "建物が自治体の【対象要件】を満たすか確認しましたか？",
      desc: "空き家の期間、危険度判定（立入調査）、空き家バンク登録等、自治体ごとの要件があります。窓口の事前相談で確認できます。",
      val: q5,
      setVal: setQ5,
    },
    {
      num: 6,
      title: "解体後の【跡地利用の計画】と固定資産税の影響を把握していますか？",
      desc: "更地化により住宅用地特例が外れると固定資産税が最大6倍（小規模住宅用地比較）になります。売却・買取・駐車場等の予定を先に整理します。",
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
            ELIGIBILITY CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            申請タイミング・受給要件セルフチェック
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            当てはまる選択肢をタップして、交付申請に進める状態かを確認できます。
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
                チェック {q.num}
              </span>
              <p className="mt-2 text-sm font-black text-[#14243a] sm:text-base leading-relaxed">
                {q.title}
              </p>
              <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#708696]">
                {q.desc}
              </p>
            </div>
            {/* ボタン: SP では grid-cols-2、PC では flex */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:flex sm:shrink-0 sm:gap-3 md:pt-0">
              <button
                type="button"
                onClick={() => q.setVal("yes")}
                className={`min-h-12 rounded-lg border px-5 py-3 text-xs font-black transition-all sm:flex sm:min-w-28 sm:items-center sm:justify-center sm:gap-1.5 ${
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
                className={`min-h-12 rounded-lg border px-5 py-3 text-xs font-black transition-all sm:flex sm:min-w-28 sm:items-center sm:justify-center sm:gap-1.5 ${
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
        <div
          className={`mt-8 rounded-xl p-6 sm:p-8 ${
            isReady
              ? "border border-[#078c95]/40 bg-[#f0f7f7]"
              : "border border-rose-300 bg-rose-50"
          }`}
        >
          {isReady ? (
            <div>
              <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
                <span className="text-2xl">📝</span>
                <span>交付申請に進める状態です</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-loose text-[#506477]">
                契約・着工前であり、募集期間・予算枠・所有権・納税の前提が揃っています。交付申請書と添付書類（見積書・登記事項証明書等）を整えて、当年度の受付期限・方式に従って窓口へ提出します。交付決定通知書を受領するまでは、業者と工事請負契約を締結しません。
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2.5 text-rose-700 font-black text-base sm:text-lg">
                <span className="text-2xl">⚠️</span>
                <span>事前に整理が必要な項目があります</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-loose text-[#506477]">
                「いいえ」と回答された項目がある場合、交付申請の時期・前提条件の整理が先になります。すでに契約・着工済み（チェック1）の場合は当該年度の補助金が不交付となる要項がほとんどで、予算枠の状況（チェック2）は窓口での直接確認が必要です。いずれの場合も、解体後の跡地利用と税影響（チェック6）を先に把握しておくことで、次年度の申請や売却計画に反映できます。
              </p>
            </div>
          )}
        </div>
      ) : hasBlocking ? (
        <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 sm:p-6 text-xs sm:text-sm leading-relaxed text-amber-900">
          <p className="font-bold">
            ※チェック1〜4に「いいえ」がある場合、交付申請の前提が揃っていない可能性が高くなります。すべての項目をご確認ください。
          </p>
        </div>
      ) : null}
    </div>
  );
}
