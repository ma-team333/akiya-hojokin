"use client";

import { useState } from "react";

/**
 * 空き家の3大出口戦略（①維持・適正管理 ②賃貸等の活用 ③早期売却・処分）の
 * 判断フロー。質問に順番に答えると、該当する出口と関連制度・法令が出る。
 * 助言・断定表現は使わず、制度・手続きの事実のみを表示する。
 */

type RouteId = "keep" | "utilize" | "sell" | "hold";

interface FlowResult {
  id: RouteId;
  badge: string;
  title: string;
  lead: string;
  items: string[];
  source: string;
}

const RESULTS: Record<RouteId, FlowResult> = {
  keep: {
    id: "keep",
    badge: "出口 ①",
    title: "維持・適正管理を続ける",
    lead: "住む・使う予定がある空き家は、定期管理によって建物の劣化と行政措置の双方を抑える状態を維持することになります。",
    items: [
      "定期点検・換気・通水・清掃・除草の実施と記録（日付・写真）",
      "遠方の場合は巡回管理サービス（定期巡回＋報告書）の契約という選択肢",
      "管理不全空き家の判断基準（屋根・外壁・窓ガラス・塀・雑草等）に該当する状態を避けることで、住宅用地特例（課税標準1/6・1/3）が維持される",
      "年間の税額＋維持費はシミュレーターで定期的に再計算",
    ],
    source: "地方税法第349条の3の2・附則第15条／空家等対策の推進に関する特別措置法",
  },
  utilize: {
    id: "utilize",
    badge: "出口 ②",
    title: "賃貸等での活用を検討する",
    lead: "第三者に使用してもらう活用では、日常的な使用による建物の劣化抑制と住宅用地特例の維持が見込める一方、貸すことに伴う費用と収支の試算が必要になります。",
    items: [
      "家賃収入と、修繕費・管理委託費・火災保険・不動産所得の税の収支試算",
      "入居者の平常時使用による建物の維持と、退去後の管理への回帰を前提にした計画",
      "賃貸併用住宅や民泊等、地域の条例・景観法規の確認",
      "空き家バンク（市町村）の活用登録制度も選択肢（空家特措法に基づく制度）",
    ],
    source: "空家等対策の推進に関する特別措置法（空き家バンク等）／所得税法（不動産所得）",
  },
  sell: {
    id: "sell",
    badge: "出口 ③",
    title: "早期売却・処分を検討する",
    lead: "住む予定も活用も難しい場合の主な処分方法は3つです。それぞれ税・費用・期間の条件が異なります。",
    items: [
      "古家付き土地としての売却: 建物がある間は住宅用地特例が維持される。契約不適合責任の免責特約の確認が必要",
      "解体後の更地としての売却: 解体費用がかかる一方、多くの自治体に老朽危険空き家の除却補助がある（交付決定前の着工は不交付）",
      "相続土地国庫帰属制度: 建物解体後、審査手数料1筆14,000円＋負担金（宅地は1,000㎡まで20万円等・10年分の管理費用相当額）で国庫帰属を申請",
      "相続空き家の譲渡には3,000万円特別控除の適用要件（昭和56年5月31日以前建築等）もあるため、売却方法と税制特例の組み合わせを確認",
    ],
    source: "法務省（相続土地国庫帰属制度）／各自治体の補助金募集要項／国税庁（空き家の3,000万円特別控除）",
  },
  hold: {
    id: "hold",
    badge: "当面の所在",
    title: "維持費を払いながら継続保有する状態",
    lead: "いずれにも該当しない場合、年間の税額と維持費を払い続けながら保有することになります。この状態では管理の有無が放置リスクの分岐点になります。",
    items: [
      "年間の税額＋維持費の合計をシミュレーターで把握し、予算に組み込む",
      "管理不全空き家の判断基準に照らした定期チェック（最低限の巡回・除草・記録）",
      "指導・勧告 → 特例解除（最初の4月1日から）→ 命令 → 行政代執行・過料50万円以下、という措置の流れを把握しておく",
      "出口（①維持 ②活用 ③売却）の再検討を定期的に行う",
    ],
    source: "空家等対策の推進に関する特別措置法／地方税法附則第15条",
  },
};

const QUESTIONS = [
  {
    num: 1,
    q: "この空き家に、今後あなたや家族が住む・定期的に使う予定がありますか？",
    yes: "keep" as RouteId,
    no: null,
  },
  {
    num: 2,
    q: "第三者に貸す（賃貸等の活用）ことを検討できますか？",
    yes: "utilize" as RouteId,
    no: null,
  },
  {
    num: 3,
    q: "売却・処分することを検討できますか？",
    yes: "sell" as RouteId,
    no: "hold" as RouteId,
  },
];

export function ExitStrategyFlow() {
  const [step, setStep] = useState(0); // 0..2 = 質問中、3 = 結果
  const [result, setResult] = useState<RouteId | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const answer = (yes: boolean) => {
    const current = QUESTIONS[step];
    setAnswers((prev) => [...prev, yes ? "はい" : "いいえ"]);
    const next = yes ? current.yes : current.no;
    if (next) {
      setResult(next);
      setStep(QUESTIONS.length);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setResult(null);
    setAnswers([]);
  };

  const finished = result !== null;
  const r = finished ? RESULTS[result] : null;

  return (
    <div className="my-10 rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-[0_4px_24px_rgba(20,36,58,0.05)] sm:p-9 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9ee] pb-5 sm:pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
            <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
            DECISION FLOW
          </span>
          <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
            3大出口戦略（維持・活用・早期売却）判断フロー
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#506477]">
            3つの質問に順番に答えると、状況に該当する出口と関連する制度・法令が表示されます。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[#bbd8dc] bg-white px-3.5 py-1.5 text-xs font-bold text-[#506477] transition hover:border-[#078c95] hover:text-[#078c95]"
        >
         最初からやり直す
        </button>
      </div>

      {/* 進行状況 */}
      <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-[#708696]">
        {QUESTIONS.map((q, i) => (
          <span key={q.num} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                i < step || finished ? "border-[#078c95] bg-[#078c95] text-white" : "border-[#dfe9ee] bg-white text-[#708696]"
              }`}
            >
              {i < step || finished ? "✓" : q.num}
            </span>
            {i < QUESTIONS.length - 1 && <span className="h-px w-6 bg-[#dfe9ee]" aria-hidden="true" />}
          </span>
        ))}
        {answers.length > 0 && <span className="ml-2">回答: {answers.join(" → ")}</span>}
      </div>

      {!finished ? (
        <div className="mt-6 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-5 sm:p-7">
          <p className="text-[11px] font-black text-[#078c95]">質問 {QUESTIONS[step].num} / 3</p>
          <p className="mt-2 text-sm font-black leading-relaxed text-[#14243a] sm:text-base">
            {QUESTIONS[step].q}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:flex">
            <button
              type="button"
              onClick={() => answer(true)}
              className="min-h-12 rounded-lg border border-[#078c95] bg-white px-6 py-3 text-xs font-black text-[#078c95] transition hover:bg-[#078c95] hover:text-white sm:text-sm"
            >
              はい
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="min-h-12 rounded-lg border border-[#dfe9ee] bg-white px-6 py-3 text-xs font-black text-[#506477] transition hover:border-[#d9483b] hover:text-[#d9483b] sm:text-sm"
            >
              いいえ → 次へ
            </button>
          </div>
        </div>
      ) : (
        r && (
          <div className="mt-6 rounded-xl border border-[#078c95]/40 bg-[#f0f7f7] p-5 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">{r.badge}</span>
              <h4 className="text-base font-black text-[#14243a] sm:text-lg">{r.title}</h4>
            </div>
            <p className="mt-3 text-xs leading-loose text-[#506477] sm:text-sm">{r.lead}</p>
            <ul className="mt-4 space-y-2.5">
              {r.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-[#dfe9ee] bg-white p-3 text-xs leading-relaxed text-[#14243a] sm:text-[13px]">
                  <span className="font-black text-[#078c95]">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">出典: {r.source}</p>
          </div>
        )
      )}

      {/* 出口の全体像 */}
      <div className="mt-8 grid gap-3 border-t border-[#dfe9ee] pt-6 text-[11px] text-[#506477] sm:grid-cols-3 sm:text-xs">
        <div className={`rounded-lg border p-3 ${result === "keep" ? "border-[#078c95] bg-[#f0f7f7]" : "border-[#dfe9ee] bg-[#f8fbfa]"}`}>
          <p className="font-black text-[#14243a]">① 維持・適正管理</p>
          <p className="mt-1 leading-relaxed">定期管理と記録で特例を維持。税＋維持費を払い続ける</p>
        </div>
        <div className={`rounded-lg border p-3 ${result === "utilize" ? "border-[#078c95] bg-[#f0f7f7]" : "border-[#dfe9ee] bg-[#f8fbfa]"}`}>
          <p className="font-black text-[#14243a]">② 賃貸等の活用</p>
          <p className="mt-1 leading-relaxed">家賃収入と貸す費用の収支試算。入居者による日常管理</p>
        </div>
        <div className={`rounded-lg border p-3 ${result === "sell" || result === "hold" ? "border-[#078c95] bg-[#f0f7f7]" : "border-[#dfe9ee] bg-[#f8fbfa]"}`}>
          <p className="font-black text-[#14243a]">③ 早期売却・処分</p>
          <p className="mt-1 leading-relaxed">古家付き売却／解体更地／相続土地国庫帰属の3ルート</p>
        </div>
      </div>
    </div>
  );
}
