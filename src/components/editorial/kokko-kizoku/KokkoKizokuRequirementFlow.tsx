"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

interface CheckItem {
  num: number;
  /** 却下事由（法2条3項等）か不承認事由（法5条1項等）か */
  group: "kyakka" | "fushonin";
  title: string;
  desc: string;
}

/**
 * 法令上の却下事由（法第2条第3項・施行令第2条）と不承認事由
 * （法第5条第1項・施行令第4条）を公式統計の実数とともに判定するフロー。
 */
const CHECK_ITEMS: readonly CheckItem[] = [
  {
    num: 1,
    group: "kyakka",
    title: "土地は【相続または遺贈（相続人に対する遺贈に限る）】で取得したものですか？",
    desc: "申請権者は相続等により所有権・共有持分を取得した者に限られます（法第2条第1項）。共有土地は共有者全員の共同申請が必要です。",
  },
  {
    num: 2,
    group: "kyakka",
    title: "土地の上に【建物が存在しない】状態ですか？",
    desc: "建物の存する土地は申請できません（法第2条第3項第1号）。統計（令和8年6月30日現在）でも建物存続を理由とする却下が4件発生しています。",
  },
  {
    num: 3,
    group: "kyakka",
    title: "土地に【担保権（抵当権等）や使用収益権（地上権・賃借権等）】が設定されていませんか？",
    desc: "担保権等・使用収益権付きの土地は申請できません（法第2条第3項第2号）。抵当権の抹消登記等の事前手続きが必要です。",
  },
  {
    num: 4,
    group: "kyakka",
    title: "【通路・墓地・境内地・水道用地・用悪水路・ため池】として他人に使用されていませんか？",
    desc: "他人による使用が予定される土地は申請できません（法第2条第3項第3号・施行令第2条）。統計上は「現に通路の用に供されている土地」が却下理由として最多クラスの22件です。",
  },
  {
    num: 5,
    group: "kyakka",
    title: "土壌が特定有害物質によって【汚染されていない】ことが確認できますか？",
    desc: "土壌汚染対策法の特定有害物質（法務省令で定める基準を超えるもの）により汚染された土地は申請できません（法第2条第3項第4号）。",
  },
  {
    num: 6,
    group: "kyakka",
    title: "隣接土地との【境界が明らか】で、所有権の存否・帰属・範囲に争いがありませんか？",
    desc: "境界が明らかでない土地は申請できません（法第2条第3項第5号）。統計上、境界不明を理由とする却下は21件です。境界確定測量が事前に必要なケースがあります。",
  },
  {
    num: 7,
    group: "fushonin",
    title: "【勾配30度以上かつ高さ5メートル以上の崖】がありませんか？",
    desc: "この基準に該当する崖があり通常の管理に過分の費用・労力を要する土地は承認されません（法第5条第1項第1号・施行令第4条第1項）。統計上は7件の不承認理由です。",
  },
  {
    num: 8,
    group: "fushonin",
    title: "地上に【擁壁・ブロック塀・車両・樹木などの工作物・有体物】がありませんか？",
    desc: "通常の管理・処分を阻害する工作物等が地上に存する土地は承認されません（法第5条第1項第2号）。統計上は不承認理由として最多の45件です。",
  },
  {
    num: 9,
    group: "fushonin",
    title: "地下に【除去しなければならない埋設物（工作物等）】がありませんか？",
    desc: "地下に除去が必要な有体物が存する土地は承認されません（法第5条第1項第3号）。統計上は3件の不承認理由です。",
  },
  {
    num: 10,
    group: "fushonin",
    title: "袋地等で【所有権に基づく使用・収益が現に妨げられていませんか？",
    desc: "公道に通じない土地（民法第210条）や所有権行使が妨害されている土地は承認されません（法第5条第1項第4号・施行令第4条第2項）。",
  },
  {
    num: 11,
    group: "fushonin",
    title: "【土砂崩壊等の災害のおそれ・鳥獣被害・森林整備計画への不適合】がありませんか？",
    desc: "災害防止措置や追加の造林・間伐・保育が必要な森林等は承認されません（法第5条第1項第5号・施行令第4条第3項）。統計上は森林整備計画不適合が36件と不承認理由として2番目に多くあります。",
  },
];

export function KokkoKizokuRequirementFlow() {
  const [answers, setAnswers] = useState<Record<number, StepStatus>>({});

  const answered = CHECK_ITEMS.filter((item) => answers[item.num] !== "undecided" && answers[item.num] !== undefined);
  const isComplete = answered.length === CHECK_ITEMS.length;

  const failedKyakka = CHECK_ITEMS.filter(
    (item) => item.group === "kyakka" && answers[item.num] === "no",
  );
  const failedFushonin = CHECK_ITEMS.filter(
    (item) => item.group === "fushonin" && answers[item.num] === "no",
  );
  const allClear = failedKyakka.length === 0 && failedFushonin.length === 0;

  const resetAll = () => setAnswers({});

  const setAnswer = (num: number, status: StepStatus) =>
    setAnswers((prev) => ({ ...prev, [num]: status }));

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            ELIGIBILITY CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            11項目のセルフチェック: 却下事由と不承認事由
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            相続土地国庫帰属制度の法令要件（法第2条第3項＝却下、法第5条第1項＝不承認）を、法務省統計の実数つきで確認できます。
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
        {CHECK_ITEMS.map((q) => (
          <div
            key={q.num}
            className="flex flex-col justify-between gap-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 md:flex-row md:items-center"
          >
            <div className="pr-0 md:pr-4">
              <span
                className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-bold text-white ${
                  q.group === "kyakka" ? "bg-[#d9483b]" : "bg-[#e56f2d]"
                }`}
              >
                {q.group === "kyakka" ? `却下事由チェック ${q.num}` : `不承認事由チェック ${q.num}`}
              </span>
              <p className="mt-2 text-sm font-black text-[#14243a] sm:text-base leading-relaxed">
                {q.title}
              </p>
              <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#708696]">
                {q.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 sm:flex sm:shrink-0 sm:gap-3 md:pt-0">
              <button
                type="button"
                onClick={() => setAnswer(q.num, "yes")}
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  answers[q.num] === "yes"
                    ? "border-[#078c95] bg-[#078c95] text-white shadow-[0_4px_14px_rgba(7,140,149,0.3)] ring-2 ring-[#078c95]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#078c95] hover:text-[#078c95]"
                }`}
              >
                <span>✓</span> はい
              </button>
              <button
                type="button"
                onClick={() => setAnswer(q.num, "no")}
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  answers[q.num] === "no"
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
            allClear
              ? "border border-[#078c95]/40 bg-[#f0f7f7]"
              : "border border-rose-300 bg-rose-50"
          }`}
        >
          {allClear ? (
            <div>
              <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
                <span className="text-2xl">✅</span>
                <span>却下・不承認事由に該当していない可能性があります</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-loose text-[#506477]">
                ただし、上記は法令要件のセルフチェックであり、承認の確約ではありません。法務局による書面審査・実地調査（法第6条）と、農用地・森林の場合は財務大臣・農林水産大臣の意見聴取（法第8条）が行われた上で承認が決まります。法務省の統計（令和8年6月30日現在）では、申請5,698件のうち2,885件が帰属、83件が却下、93件が不承認となっています。
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2.5 text-rose-700 font-black text-base sm:text-lg">
                <span className="text-2xl">⚠️</span>
                <span>該当する却下・不承認事由があります</span>
              </div>
              <div className="mt-3 space-y-2 text-xs sm:text-sm leading-loose text-[#506477]">
                {failedKyakka.length > 0 && (
                  <p>
                    <strong className="text-[#d9483b]">却下事由（法第2条第3項）:</strong>{" "}
                    チェック{failedKyakka.map((item) => item.num).join("・")}に該当する場合、そのままでは申請自体ができません。建物の解体・滅失登記、抵当権の抹消、境界確定測量等の事前手続きで解消できるものがあります。
                  </p>
                )}
                {failedFushonin.length > 0 && (
                  <p>
                    <strong className="text-[#e56f2d]">不承認事由（法第5条第1項）:</strong>{" "}
                    チェック{failedFushonin.map((item) => item.num).join("・")}に該当する場合、審査の結果、承認を受けられない可能性があります。工作物の撤去や埋設物の除去等、土地の現状を変更する措置が必要なものがあります。
                  </p>
                )}
                <p>
                  該当事由が解消できない場合、国庫帰属制度の前提を満たさないため、民間への売却・買取の検討や、相続放棄（熟慮期間3ヶ月以内に限られる点に注意）といった別の選択肢の確認が必要になります。判断は法務局の無料相談（令和6年10月15日からウェブ相談も開始）で確認できます。
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 sm:p-6 text-xs sm:text-sm leading-relaxed text-amber-900">
          <p className="font-bold">
            ※全{CHECK_ITEMS.length}項目に回答すると、却下事由（申請できない土地）と不承認事由（承認されない土地）の該当状況が分かります。（{answered.length}/{CHECK_ITEMS.length}項目回答済み）
          </p>
        </div>
      )}
    </div>
  );
}
