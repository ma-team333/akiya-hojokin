"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

/**
 * リースバック契約前の前提チェック（6項目）。
 *
 * 制度の出典:
 * - 国土交通省「住宅のリースバックに関するガイドブック」（令和4年6月24日公表）
 * - 国土交通省「住宅のリースバック取引における宅地建物取引業法の解釈・運用の考え方
 *   （リースバックに関するガイドライン）」（令和8年7月策定・令和8年10月1日施行）
 * - 国民生活センター「強引に勧められる住宅のリースバック契約にご注意!」（2025年5月21日公表）
 * - 借地借家法第26条・第28条・第38条（e-Gov法令検索）
 */
const CHECK_ITEMS = [
  {
    num: 1,
    title: "提示された売却価格を、公的データや周辺相場と比べて確認しましたか？",
    desc: "国交省ガイドブック（令和4年6月公表）は、事業者が提示する金額が適切か確認するため、不動産取引価格情報（国土交通省・土地総合情報システム）などでの相場確認と、複数事業者との比較を求めています。",
    hint: "ガイドブックの事例（CASE3）では、市場価格1億2,000万円相当の住宅が700万円で売却された例が紹介されています。提示額の根拠（公的評価・近隣事例）を確認しましょう。",
  },
  {
    num: 2,
    title: "月額家賃とその算定根拠を確認しましたか？",
    desc: "家賃は「修繕費等を含め、貸主が負担する様々な費用も踏まえて設定されており」（ガイドブック）、事業者ごとに条件が異なります。令和8年10月1日施行のリースバックガイドラインは、売買価額及び借賃の額の算定根拠の説明が望ましい対応としています。",
    hint: "「売却代金が賃料等の何か月分に相当するか」（リースバックガイドライン）を事業者に尋ね、本記事の収支シミュレーターで自分でも計算して比較しましょう。",
  },
  {
    num: 3,
    title: "契約期間と更新の可否（定期借家契約か普通借家契約か）を確認しましたか？",
    desc: "定期借家契約（借地借家法第38条）は契約で定めた期間の満了により契約が終了し、貸主が再契約を拒んだ場合は退去が必要です（ガイドブック）。普通借家契約（同法第26条・第28条）は更新拒絶に「正当の事由」が要求されます。",
    hint: "「ずっと住み続けられる」は契約上の保証ではありません。契約期間・更新条件・再契約拒否時の扱いを書面で確認しましょう。定期借家では書面による事前説明がないと「更新なし」の定めが無効になります（借地借家法第38条第5項）。",
  },
  {
    num: 4,
    title: "買戻し（再売買）特約の有無と条件を確認しましたか？",
    desc: "買戻しは「当然の権利」ではなく、契約条件次第で買い戻せない可能性があります（ガイドブック）。令和8年10月1日施行のリースバックガイドラインは「買戻し特約の有無及びその内容」を告知事項として挙げています。",
    hint: "買い戻しを想定するなら「いつまでに」「いくらで」買い戻せる条件なのか、買戻し時の住宅ローン借入の見込みまで含めて確認が必要です（ガイドブックの確認ポイント4）。",
  },
  {
    num: 5,
    title: "修繕費・固定資産税等の負担区分と、退去時の原状回復を確認しましたか？",
    desc: "固定資産税等の支払いは「契約条件によっては不要」（家賃に織り込まれる）とされ（ガイドブック）、設備故障時の修繕費負担・新規設備設置の可否は契約前の確認事項です。退去時の原状回復費用や、期間中に亡くなった場合に家族等が賃貸借契約上の責任（原状回復等）を負う場合もあります。",
    hint: "リースバックガイドライン（令和8年10月1日施行）は「租税その他の公課の負担に関する定め」「修繕費用の負担区分」を告知事項として挙げています。重要事項説明と契約書で同じ条件か確認しましょう。",
  },
  {
    num: 6,
    title: "違約金・解除条件と「クーリング・オフ不適用」を理解していますか？",
    desc: "消費者が宅建業者へ自宅を売却する場合、宅建業法のクーリング・オフは適用されません（ガイドブック・国民生活センター）。国民生活センター（2025年5月21日公表）には、違約金50万円〜600万円の事例や長時間の勧誘事例が報告されています。",
    hint: "契約解除時の違約金・損害賠償の額を事前に確認し、勧誘が長時間・深夜に及ぶ場合や判断しかねる場合は、消費者ホットライン「188」（消費生活センター）に相談できます。",
  },
] as const;

export function LeasebackRequirementFlow() {
  const [answers, setAnswers] = useState<StepStatus[]>(
    Array.from({ length: CHECK_ITEMS.length }, () => "undecided"),
  );

  const isComplete = answers.every((a) => a !== "undecided");
  const readyCount = answers.filter((a) => a === "yes").length;
  const unresolved = CHECK_ITEMS.filter((_, i) => answers[i] === "no");

  const resetAll = () => {
    setAnswers(
      Array.from({ length: CHECK_ITEMS.length }, () => "undecided"),
    );
  };

  return (
    <div className="my-10 sm:my-14 rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            PRE-CONTRACT CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            リースバック契約前の前提チェック（6項目）
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            売却価格・家賃・契約期間・買戻し・負担区分・違約金。当てはまる選択肢をタップして、契約相談前に整理できているか確認できます。
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
        {CHECK_ITEMS.map((q, idx) => (
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
            <div className="grid grid-cols-2 gap-3 pt-2 sm:flex sm:shrink-0 sm:gap-3 md:pt-0">
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => prev.map((a, i) => (i === idx ? "yes" : a)))
                }
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  answers[idx] === "yes"
                    ? "border-[#078c95] bg-[#078c95] text-white shadow-[0_4px_14px_rgba(7,140,149,0.3)] ring-2 ring-[#078c95]/30"
                    : "border-[#dfe9ee] bg-white text-[#14243a] hover:border-[#078c95] hover:text-[#078c95]"
                }`}
              >
                <span>✓</span> はい
              </button>
              <button
                type="button"
                onClick={() =>
                  setAnswers((prev) => prev.map((a, i) => (i === idx ? "no" : a)))
                }
                className={`min-h-12 sm:min-w-28 rounded-lg border px-5 py-3 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  answers[idx] === "no"
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
        readyCount === CHECK_ITEMS.length ? (
          <div className="mt-8 rounded-xl border border-[#078c95]/40 bg-[#f0f7f7] p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#0a7079] font-black text-base sm:text-lg">
              <span className="text-2xl">🎉</span>
              <span>契約相談に必要な前提が揃っています！</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm leading-loose text-[#506477]">
              売却価格・家賃・契約期間・買戻し条件・負担区分・違約金を比較軸として複数事業者から同じ条件の見積りを揃えれば、国交省ガイドブック（令和4年6月公表）が推奨する「売却で受け取る金額」と「賃料として支払う金額」の比較を同じ土俵で行えます。最後に、売却価格・家賃それぞれの算定根拠（リースバックガイドライン・令和8年10月1日施行の望ましい対応）を書面で受け取り、公的データ（不動産取引価格情報・住宅・土地統計調査）と照合してから判断しましょう。
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-amber-900 font-black text-base sm:text-lg">
              <span className="text-2xl">📝</span>
              <span>整理がまだの項目があります（{readyCount}/{CHECK_ITEMS.length} 完了）</span>
            </div>
            <div className="mt-4 space-y-3">
              {unresolved.map((q) => (
                <div
                  key={q.num}
                  className="rounded-lg border border-amber-200 bg-white p-4 text-xs sm:text-sm leading-relaxed text-[#506477]"
                >
                  <p className="font-black text-[#14243a]">チェック {q.num}: {q.title}</p>
                  <p className="mt-1.5">{q.hint}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-amber-900">
              ※すべて揃わなくても相談自体はできます。まずは国交省ガイドブック（令和4年6月公表）を読み込み、複数事業者から同じ条件の提示を受けることから始めましょう。判断しかねる勧誘がある場合は消費者ホットライン「188」に相談できます。
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
