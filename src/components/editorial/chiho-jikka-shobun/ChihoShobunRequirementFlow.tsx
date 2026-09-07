"use client";

import { useState } from "react";

type StepStatus = "yes" | "no" | "undecided";

/**
 * 売れない実家の処分を決めるための状況整理チェック（6項目）。
 *
 * 制度の出典:
 * - 不動産取引価格情報（国土交通省・土地総合情報システム）: 周辺成約事例の確認
 * - 不動産登記法第76条の2（2024年4月1日施行の相続登記義務化・3年以内・10万円以下の過料）
 * - 地方税法第349条の3（住宅用地の特例）/ 空家等対策の推進に関する特別措置法
 *   （特定空家等・2023年12月改正の管理不全空家の勧告）
 * - 国土交通省・総務省「空き家バンクの整備及び運用に関するガイドライン」（平成27年3月）
 * - 国税庁タックスアンサー No.3302〔令和7年4月1日現在法令等〕（3,000万円特別控除）
 * - 民法第915条（相続放棄の熟慮期間3か月）
 */
const CHECK_ITEMS = [
  {
    num: 1,
    title: "「なぜ売れないか」の原因を切り分けるため、公的データと複数の査定を確認しましたか？",
    desc: "売れない原因は大きく「価格（値付け）」「立地（買い手の需要）」「建物の状態」「権利関係」の4つに分けられます。国土交通省の不動産取引価格情報（土地総合情報システム）で周辺の成約事例を確認し、不動産会社2社以上の査定を比べると、どの原因かの見当がつけやすくなります。",
    hint: "査定額が大きく割れる場合は根拠（周辺成約事例・建物の状態）を確認しましょう。価格以外が原因の場合、値下げだけでは解決しないこともあります。",
  },
  {
    num: 2,
    title: "権利関係（相続登記・共有・抵当権）を確認しましたか？",
    desc: "被相続人（親など）名義のままでは所有権移転登記ができず売買契約を結べません。相続登記は2024年4月1日から義務化され、相続開始を知った日から3年以内の申請が原則で、正当な理由なく怠ると10万円以下の過料の対象になります（不動産登記法第76条の2）。相続人が複数の場合は全員の同意（共有物の処分）、住宅ローンが残る場合は抵当権抹消の見通しの確認が必要です。",
    hint: "先代名義・兄弟共有のままの物件は買い手が見つかっても契約に進めません。戸籍・遺産分割協議の状況を先に整理しましょう。",
  },
  {
    num: 3,
    title: "保有コストの実額（固定資産税・都市計画税・維持費・ローン残高）を数字で把握しましたか？",
    desc: "固定資産税・都市計画税の年額は毎年送付される納税通知書で確認できます。建物が存続する間は住宅用地の特例（200㎡以下は課税標準6分の1）が適用されますが、特定空家等または管理不全空家として市区町村から勧告を受けると特例が解除され、土地の固定資産税は最大6倍になります（地方税法第349条の3・空家等対策特別措置法）。",
    hint: "「売却活動を続けるか」「保有し続けるか」の比較は、年間の保有コストの実額がないと計算できません。納税通知書・管理費の記録を手元に置きましょう。",
  },
  {
    num: 4,
    title: "更地化（解体）を比較する場合、解体費用の見積りと税務上の影響を確認しましたか？",
    desc: "解体費用は公定価格がなく業者見積りによるため、複数の見積りで実費を把握します（自治体の老朽危険空家等の解体補助金の有無は市町村で確認）。解体して更地になると土地は住宅用地特例の適用外になります（固定資産税最大6倍）。相続した空き家では、相続税の取得費加算の特例と3,000万円特別控除（国税庁No.3302〔令和7年4月1日現在法令等〕）の関係が税務上の判断の分かれ目です。",
    hint: "古家付き（建物あり）と更地（建物なし）は買い手層が異なります。両方の価格を査定で確認してから、解体費用・特例解除を差引いて比較しましょう。",
  },
  {
    num: 5,
    title: "市町村の制度（空き家バンク・解体補助金・勧告制度）を確認しましたか？",
    desc: "空き家バンクは国土交通省・総務省「空き家バンクの整備及び運用に関するガイドライン」（平成27年3月）に基づき市区町村等が整備・運用する登録・公開制度です。登録要件・窓口（市町村自身か提携する地元の不動産会社か）は自治体ごとに異なります。空き家バンク登録物件の成約・建て替えを条件とする解体補助金や、特定空家等・管理不全空家の勧告制度も市町村の施策です。",
    hint: "実家所在の市町村の空き家バンク運用要領・補助金の募集要綱は自治体のウェブサイト等で確認できます。窓口に問い合わせる前に物件の基本情報（所在地・建物の構造と建築時期・所有者の状況）を整理しておきましょう。",
  },
  {
    num: 6,
    title: "期限のある手続（3,000万円特別控除・相続放棄・相続登記）の期限を確認しましたか？",
    desc: "相続した空き家の3,000万円特別控除は、現行では2027年12月31日までの譲渡が対象です（国税庁No.3302〔令和7年4月1日現在法令等〕）。相続放棄は「自己のために相続の開始があったことを知った時から3か月以内」に家庭裁判所への申述が必要で、財産の処分行為（売却など）の後は原則できません（民法第915条・第921条）。相続登記は3年以内の申請義務（不動産登記法第76条の2）があります。",
    hint: "期限は処分方法の選択肢を狭めます。特に相続放棄は3か月の熟慮期間が過ぎると選択肢から外れるため、相続開始直後の状況では早めの整理が必要です。",
  },
] as const;

export function ChihoShobunRequirementFlow() {
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
            SITUATION CHECKLIST
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            売れない実家の処分を決める「状況整理チェック（6項目）」
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            原因の切り分け・権利関係・保有コスト・更地化・市町村の制度・期限。当てはまる選択肢をタップして、処分方法を検討する前に整理できているか確認できます。
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
              <span>処分方法を比較する前提が揃っています！</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm leading-loose text-[#506477]">
              原因の切り分け・権利関係・保有コスト・更地化・市町村の制度・期限の6項目が揃っていれば、本記事のシミュレーターで仲介・買取・解体更地売却の手取りを同じ土俵で比較できます。3,000万円特別控除の要件（国税庁No.3302〔令和7年4月1日現在法令等〕）や相続税の取得費加算の特例は個別判断が伴うため、確定申告前に税務署・税理士等へ、媒介・買取の条件は不動産会社2社以上へ確認しましょう。
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
              ※すべて揃わなくても相談自体はできます。まずは不動産取引価格情報（国土交通省・土地総合情報システム）で周辺成約事例を確認し、不動産会社2社以上の査定を受けることから始めましょう。権利関係（相続登記・共有）は契約の前提になるため、状況に応じて司法書士等の専門家への相談も選択肢です。
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
