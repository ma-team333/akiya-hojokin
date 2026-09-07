"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

/**
 * 空き家買取の要件判定フロー（セルフチェック）。
 * 名義（相続登記）・共有・残置物・税務・自治体指導・書類の6項目で買取準備度を判定する。
 */
export function KaitoriRequirementFlow() {
  const [q1, setQ1] = useState<StepStatus>("undecided"); // 相続登記（名義）の確認
  const [q2, setQ2] = useState<StepStatus>("undecided"); // 相続人全員の合意形成
  const [q3, setQ3] = useState<StepStatus>("undecided"); // 残置物の処分方針
  const [q4, setQ4] = useState<StepStatus>("undecided"); // 固定資産税の納税状況
  const [q5, setQ5] = useState<StepStatus>("undecided"); // 自治体の指導・勧告の有無
  const [q6, setQ6] = useState<StepStatus>("undecided"); // 物件書類の準備

  const statuses: StepStatus[] = [q1, q2, q3, q4, q5, q6];
  const isComplete = statuses.every((s) => s !== "undecided");
  const noCount = statuses.filter((s) => s === "no").length;
  const isReady = isComplete && noCount === 0;

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
      title: "登記事項証明書で、空き家の名義（所有権）を確認できていますか？",
      desc: "被相続人名義の場合は相続登記が必要です。2022年4月施行の改正不動産登記法で、相続開始を知った日から3年以内の登記が義務化されています（不履行は10万円以下の過料）。",
      val: q1,
      setVal: setQ1,
    },
    {
      num: 2,
      title: "共有名義の場合、相続人全員の合意（署名・押印）を得られそうですか？",
      desc: "空き家全体の売却には民法第251条により共有者全員の同意が必要です。単独で売れるのは自己の持分のみです（民法第206条）。",
      val: q2,
      setVal: setQ2,
    },
    {
      num: 3,
      title: "残置物（家具・家電・遺品等）の処分方針は決まっていますか？",
      desc: "「事前に撤去する」か「現状渡しで査定額から処分費を差し引く」かのいずれか。方針次第で査定の内訳が変わります。",
      val: q3,
      setVal: setQ3,
    },
    {
      num: 4,
      title: "固定資産税・都市計画税を滞納なく納付していますか？",
      desc: "税の滞納がある場合、抵当権と同様に担保権の設定や差押えの対象となり、所有権移転登記の障害になることがあります（地方税法）。",
      val: q4,
      setVal: setQ4,
    },
    {
      num: 5,
      title: "自治体から特定空家等に関する助言・指導・勧告を受けたことはありませんか？",
      desc: "空家等対策特措法の指導・勧告等を受けると、固定資産税の住宅用地特例の適用対象から除外されます（地方税法第349条の3の2）。",
      val: q5,
      setVal: setQ5,
    },
    {
      num: 6,
      title: "登記事項証明書・固定資産税評価証明書・測量図等の書類を準備できますか？",
      desc: "書類が揃うと現地調査前の概算査定の精度が上がります。周辺相場は国土交通省の「地価公示」・都道府県の「地価調査」で確認できます。",
      val: q6,
      setVal: setQ6,
    },
  ];

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-[0_4px_24px_rgba(20,36,58,0.05)] sm:p-9 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            ELIGIBILITY CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            空き家買取の6項目セルフチェック
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            名義（相続登記）・共有・残置物・税金・自治体指導・書類の6項目で、買取査定に進む前の準備状況を確認できます。
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
      <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        {questions.map((q) => (
          <div
            key={q.num}
            className="flex flex-col justify-between gap-4 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-6 md:flex-row md:items-center"
          >
            <div className="pr-0 md:pr-4">
              <span className="inline-block rounded bg-[#14243a] px-2.5 py-0.5 text-[11px] font-bold text-white">
                チェック {q.num}
              </span>
              <p className="mt-2 text-sm font-black leading-relaxed text-[#14243a] sm:text-base">
                {q.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#708696] sm:text-[13px]">
                {q.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 sm:flex sm:shrink-0 sm:gap-3 md:pt-0">
              <button
                type="button"
                onClick={() => q.setVal("yes")}
                className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg border px-5 py-3 text-xs font-black transition-all sm:min-w-28 sm:text-sm ${
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
                className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg border px-5 py-3 text-xs font-black transition-all sm:min-w-28 sm:text-sm ${
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
        isReady ? (
          <div className="mt-8 rounded-xl border border-[#078c95]/40 bg-[#f0f7f7] p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-base font-black text-[#0a7079] sm:text-lg">
              <span className="text-2xl">🎉</span>
              <span>6項目すべてクリア。買取査定に進める準備が整っています</span>
            </div>
            <p className="mt-3 text-xs leading-loose text-[#506477] sm:text-sm">
              複数の買取業者へ査定を依頼し、査定額の内訳（土地の想定価格・解体費用・残置物処分費用）の説明を受けると、各社の根拠を比較できます。契約条件（免責特約・残置物の扱い・受取時期）の確認もあわせて行えます。
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-rose-300 bg-rose-50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-base font-black text-rose-700 sm:text-lg">
              <span className="text-2xl">⚠️</span>
              <span>{noCount}項目、買取前の手続き・確認が必要です</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs leading-loose text-[#506477] sm:text-sm">
              {q1 === "no" && (
                <li>・名義が未確認・未登記: 相続登記の申請（または法定相続分での保存登記）が前提です。手続きは本記事のステップガイドで確認できます。</li>
              )}
              {q2 === "no" && (
                <li>・共有の合意形成が困難: 「自己の持分のみ」の譲渡（民法第206条）という方法があります。空き家全体の売却には全員の同意が必要です（民法第251条）。</li>
              )}
              {q3 === "no" && (
                <li>・残置物の方針が未決: 査定額から処分費用を差し引く「現状渡し」も可能です。遺品にあたるものは相続人間で処分方針を確認できます。</li>
              )}
              {q4 === "no" && (
                <li>・税の滞納あり: 滞納処分（差押え等）が所有権移転登記の障害になることがあります（地方税法）。市町村への相談が最初の対応です。</li>
              )}
              {q5 === "no" && (
                <li>・自治体の指導・勧告を受けている: 住宅用地特例の適用対象から除外され、課税標準が本則に戻る点（地方税法第349条の3の2）を市町村に確認できます。</li>
              )}
              {q6 === "no" && (
                <li>・書類が未準備: 登記事項証明書（法務局）と固定資産税評価証明書（市町村）の取得から着手できます。</li>
              )}
            </ul>
          </div>
        )
      ) : (
        <div className="mt-8 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 text-xs leading-relaxed text-[#708696] sm:p-6 sm:text-sm">
          <p className="font-bold">
            各項目を「はい／いいえ」で回答すると、買取前の手続き・確認が必要な項目が表示されます。
          </p>
        </div>
      )}
    </div>
  );
}
