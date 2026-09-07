"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

export function DemolitionRequirementFlow() {
  const [q1, setQ1] = useState<StepStatus>("undecided"); // 着工前・契約前か
  const [q2, setQ2] = useState<StepStatus>("undecided"); // 旧耐震または危険空家か
  const [q3, setQ3] = useState<StepStatus>("undecided"); // 1年以上空き家か
  const [q4, setQ4] = useState<StepStatus>("undecided"); // 所有者または相続人全員の同意があるか
  const [q5, setQ5] = useState<StepStatus>("undecided"); // 市区町村税の滞納がないか
  const [q6, setQ6] = useState<StepStatus>("undecided"); // 今年度の予算募集期間内か

  const isComplete =
    q1 !== "undecided" &&
    q2 !== "undecided" &&
    q3 !== "undecided" &&
    q4 !== "undecided" &&
    q5 !== "undecided" &&
    q6 !== "undecided";

  const isEligible =
    q1 === "yes" &&
    q2 === "yes" &&
    q3 === "yes" &&
    q4 === "yes" &&
    q5 === "yes" &&
    q6 === "yes";

  const hasDisqualified =
    q1 === "no" ||
    q2 === "no" ||
    q3 === "no" ||
    q4 === "no" ||
    q5 === "no" ||
    q6 === "no";

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
      title: "【最重要】解体工事の契約・着工前ですか？",
      desc: "既に解体業者と契約締結済み、または工事に着工・完了している場合は一切補助金の対象になりません。",
      val: q1,
      setVal: setQ1,
      failAdvice: "契約前・着工前の事前申請が全国共通の絶対条件です。未契約の場合は契約を保留し自治体窓口へ相談してください。",
    },
    {
      num: 2,
      title: "建築時期は【昭和56年（1981年）5月31日以前】または【破損・傾きのある老朽家屋】ですか？",
      desc: "旧耐震基準の建物、または自治体の事前調査で所定の危険度（不良住宅判定・特定空家等）に該当する家屋が対象です。",
      val: q2,
      setVal: setQ2,
      failAdvice: "新耐震基準（1981年6月以降）であっても、外壁崩落や屋根破損等の危険性が認められれば対象となる自治体もあります。",
    },
    {
      num: 3,
      title: "概ね【1年以上】誰も居住・使用していない空き家ですか？",
      desc: "電気・水道の使用停止状況や住民票の除票等により、居住実態がないことを証明する必要があります。",
      val: q3,
      setVal: setQ3,
      failAdvice: "直近まで居住していた場合は対象外となる場合があります。自治体所定の空き家期間要件（1年以上等）をご確認ください。",
    },
    {
      num: 4,
      title: "建物の所有者本人、または【相続人全員の同意】が得られていますか？",
      desc: "共有名義や相続登記が未了の場合、権利者全員の署名・押印のある同意書および印鑑証明書が必要です。",
      val: q4,
      setVal: setQ4,
      failAdvice: "相続人間で未合意の権利者がいる場合、申請を受け付けられません。事前に遺産分割協議または同意書の収集が必要です。",
    },
    {
      num: 5,
      title: "申請者に【市区町村税（住民税・固定資産税等）の滞納】はありませんか？",
      desc: "公的補助金の交付にあたり、納税証明書（完納証明書）の提出が必須となります。",
      val: q5,
      setVal: setQ5,
      failAdvice: "税金の未納・滞納がある場合は交付決定が下りません。申請前に完納しておく必要があります。",
    },
    {
      num: 6,
      title: "自治体の【当年度の募集期間・予算枠】を確認できていますか？",
      desc: "募集期間・予算枠・受付方式は自治体ごとに異なります。当年度の公式要項と受付状況を確認してください。",
      val: q6,
      setVal: setQ6,
      failAdvice: "当年度の予算枠が満了している場合、翌年4月の次年度受付開始を待って申請する計画へ切り替える必要があります。",
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#078c95]" />
            ELIGIBILITY CHECKLIST
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-black text-[#14243a]">
            空き家解体補助金「受給要件クイック診断」
          </h3>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-[#dfe9ee] bg-[#f8fafc] px-3.5 py-1.5 text-xs font-bold text-[#506477] hover:bg-[#edf2f7] transition-colors"
        >
          回答をリセット
        </button>
      </div>

      <p className="mt-4 text-xs sm:text-sm text-[#506477] leading-relaxed">
        各自治体の空家除却補助金要綱に共通する6つの基本要件をチェックします。「はい」「いいえ」を選択してください。
      </p>

      {/* 設問リスト */}
      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <div
            key={q.num}
            className={`rounded-xl border p-4 sm:p-5 transition-all ${
              q.val === "yes"
                ? "border-[#b8cedb] bg-[#f8fafc]"
                : q.val === "no"
                  ? "border-red-200 bg-red-50/50"
                  : "border-[#dfe9ee] bg-white"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-black text-[#078c95]">QUESTION 0{q.num}</div>
                <h4 className="mt-1 text-sm sm:text-base font-bold text-[#14243a]">
                  {q.title}
                </h4>
                <p className="mt-1 text-xs text-[#708696] leading-relaxed">{q.desc}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => q.setVal("yes")}
                  className={`rounded-lg px-4 py-2 min-h-11 text-xs font-black transition-all ${
                    q.val === "yes"
                      ? "bg-[#078c95] text-white shadow-sm"
                      : "border border-[#dfe9ee] bg-white text-[#506477] hover:bg-[#f0f7f7]"
                  }`}
                >
                  はい (該当)
                </button>
                <button
                  type="button"
                  onClick={() => q.setVal("no")}
                  className={`rounded-lg px-4 py-2 min-h-11 text-xs font-black transition-all ${
                    q.val === "no"
                      ? "bg-red-600 text-white shadow-sm"
                      : "border border-[#dfe9ee] bg-white text-[#506477] hover:bg-red-50"
                  }`}
                >
                  いいえ (非該当)
                </button>
              </div>
            </div>

            {q.val === "no" && (
              <div className="mt-3 rounded-lg border border-red-200 bg-white p-3 text-xs text-red-700">
                <span className="font-bold">⚠️ 要件不適合の注意点:</span> {q.failAdvice}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 診断結果バナー */}
      {isComplete && (
        <div className="mt-8 overflow-hidden rounded-2xl border transition-all">
          {isEligible ? (
            <div className="border-[#078c95] bg-[#eef7f7] p-6 sm:p-8 text-[#14243a]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#078c95] p-1 text-white text-xs">✓</span>
                <span className="text-xs font-black uppercase text-[#078c95]">
                  DIAGNOSIS RESULT
                </span>
              </div>
              <h4 className="mt-2 text-xl font-black text-[#078c95] sm:text-2xl">
                すべての基本要件を満たしている可能性が高いです
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#334155]">
                自治体の空き家解体補助金（除却費助成）の対象となる基本条件をクリアしています。自治体ごとに定められている「現地危険度調査（評点判定）」や「市内施工業者の選定」の手続きに進むため、<strong>解体工事の契約を結ぶ前に</strong>物件所在地の市区町村役場（空家対策窓口）へ事前相談を行ってください。
              </p>
            </div>
          ) : (
            <div className="border-amber-300 bg-amber-50 p-6 sm:p-8 text-amber-950">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-600 p-1 text-white text-xs">!</span>
                <span className="text-xs font-black uppercase text-amber-800">
                  DIAGNOSIS RESULT
                </span>
              </div>
              <h4 className="mt-2 text-xl font-black text-amber-900 sm:text-2xl">
                一部の要件で確認・調整が必要です
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-amber-900">
                「いいえ」が付いた項目があるため、現時点では補助金を受け取れない、または事前手続きが必要な状態です。特に着工後の申請不可、相続人全員の同意取得、当年度予算の受付状況など、各項目のアドバイスを確認して準備を進めてください。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
