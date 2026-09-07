"use client";

import React, { useState } from "react";

interface FlowStep {
  id: number;
  question: string;
  subText: string;
  options: {
    label: string;
    description: string;
    nextStep: number | "result_self" | "result_vendor" | "result_rent_renovate" | "result_sell_limit";
  }[];
}

const FLOW_STEPS: readonly FlowStep[] = [
  {
    id: 1,
    question: "実家への将来の利用予定（自身・家族が住む、セカンドハウス等）はありますか？",
    subText: "感情面だけでなく、今後数年以内に具体的に誰かが居住・活用する計画があるかを確認します。",
    options: [
      {
        label: "明確な利用予定がある（数年以内に居住・利用）",
        description: "将来的に住む、または定期的に利用する計画が定まっている",
        nextStep: 2,
      },
      {
        label: "現時点では利用予定がない・未定である",
        description: "手放す決心がつかない、または思い出として残している状態",
        nextStep: 3,
      },
    ],
  },
  {
    id: 2,
    question: "実家までの距離と、月1回以上の訪問・管理作業が可能ですか？",
    subText: "片道所要時間、交通費負担、休日を充てた通風・通水・清掃ルーティンの継続性を確認します。",
    options: [
      {
        label: "車や電車で1時間圏内（月1回以上訪問可能）",
        description: "無理のない範囲で定期的な現地点検・草刈り・通水を実施できる",
        nextStep: "result_self",
      },
      {
        label: "遠方（片道2時間以上）または訪問時間が取れない",
        description: "交通費が高額になる、または仕事・家庭の都合で定期訪問が難しい",
        nextStep: "result_vendor",
      },
    ],
  },
  {
    id: 3,
    question: "建物の築年数と老朽化（雨漏り・シロアリ・傾き等）の状況はどうですか？",
    subText: "昭和56年（1981年）以前の旧耐震基準か、すでに建具の歪みや雨漏り等の劣化が生じているかを確認します。",
    options: [
      {
        label: "新耐震基準（築40年未満）で構造健全・軽微な手入れで維持可能",
        description: "雨漏りや傾きはなく、基本的な設備・建物の状態が良好",
        nextStep: 4,
      },
      {
        label: "旧耐震基準または老朽化進行（雨漏り・外壁破損・傾き等あり）",
        description: "特定空家・管理不全空家への勧告リスクや倒壊危険が懸念される状態",
        nextStep: "result_sell_limit",
      },
    ],
  },
  {
    id: 4,
    question: "年間30万〜50万円の維持管理費の継続支出、および賃貸等の収益化検討は可能ですか？",
    subText: "固定資産税・保険・管理費の純損失を許容できるか、あるいはリフォームして賃貸活用するかを確認します。",
    options: [
      {
        label: "賃貸物件やシェアスペース等としての活用を検討したい",
        description: "一定の初期費用を投じて収益化・維持費相殺を目指す",
        nextStep: "result_rent_renovate",
      },
      {
        label: "活用せずそのまま保有し続けたいが、費用負担は重い",
        description: "年間コストの負担が大きく、3,000万円特別控除の期限も気になる",
        nextStep: "result_sell_limit",
      },
    ],
  },
];

interface FlowResult {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  summary: string;
  keyActions: string[];
  riskCheck: string;
}

const FLOW_RESULTS: Record<string, FlowResult> = {
  result_self: {
    id: "result_self",
    title: "自主管理体制の確立・ルーティン継続ルート",
    badge: "健全な自主管理",
    badgeColor: "bg-emerald-600 text-white",
    summary:
      "近距離で定期訪問が可能であり、明確な利用予定があるため、自主管理による維持が成立しやすい状態です。月1回の通風・通水・ポスト回収と年2回の草刈りルーティンを固定化し、近隣への連絡先共有を行いましょう。",
    keyActions: [
      "月1回の通風（30分以上）・通水（全蛇口放水）・雨漏り点検ルーティン",
      "郵便物の転送手続き（年1回更新）とポスト投函物の定期処分",
      "年2回の敷地除草および民法233条に基づく越境枝木の剪定",
      "万一の事故（瓦落下等）に備えた空家対応施設所有者賠償責任保険への加入",
    ],
    riskCheck: "将来的に多忙や体調変化で訪問頻度が落ちた場合、即座に巡回委託へ切り替えられる体制を準備しておくことが重要です。",
  },
  result_vendor: {
    id: "result_vendor",
    title: "専門会社・シルバー人材センターへの巡回委託ルート",
    badge: "外部巡回委託",
    badgeColor: "bg-[#078c95] text-white",
    summary:
      "遠方または多忙により自主管理が困難なため、月額5,000円〜1万円程度の外部委託（巡回管理・通風通水・草刈り）を活用して建物の荒廃と近隣クレームを防ぐ体制が合理的です。",
    keyActions: [
      "地元の空き家管理専門会社またはシルバー人材センターへの見積もり・契約",
      "定期巡回レポート（写真付き）による劣化・不法投棄のモニタリング",
      "水道・電気契約の維持（通水・防犯灯用）と口座引き落としの設定",
      "年1回の現地立会いによる大規模修繕要否の確認",
    ],
    riskCheck: "外部委託費用（年10万〜20万円）と税金・保険料が毎年累積するため、何年間保有し続けるかの期限設定が不可欠です。",
  },
  result_rent_renovate: {
    id: "result_rent_renovate",
    title: "賃貸・リノベーションによる利活用ルート",
    badge: "賃貸・収益化",
    badgeColor: "bg-indigo-600 text-white",
    summary:
      "建物の構造が健全な場合、定期借家契約での戸建て賃貸やシェアスペースとしての活用により、維持費（税金・保険等）を家賃収入で相殺し、建物の日常使用による劣化防止を図る選択肢です。",
    keyActions: [
      "地域の賃貸需要・家賃相場（戸建て賃貸）の不動産会社ヒアリング",
      "給湯器・水回り等の初期リフォーム費用見積もりと投資回収年数の試算",
      "将来的な自己利用・売却に備えた「定期建物賃貸借契約」の検討",
      "賃貸経営に伴う確定申告（不動産所得）の準備",
    ],
    riskCheck: "賃貸化した後は「居住用財産の3,000万円特別控除（空き家特例）」の適用対象外（事業用・賃貸用への転用扱い）となる点に留意が必要です。",
  },
  result_sell_limit: {
    id: "result_sell_limit",
    title: "3年以内の税制特例（3000万控除）活用・期限内売却ルート",
    badge: "特例期限内売却の検討",
    badgeColor: "bg-amber-600 text-white",
    summary:
      "明確な利用予定がなく老朽化が進んでいる場合、保有継続による維持費の累積（年30万〜50万円）と特例解除増税リスクが高くなります。相続開始から3年後の年末までに売却することで、最大3,000万円の特別控除を活用して手残りを最大化する出口が合理的です。",
    keyActions: [
      "相続開始日を確認し、「3年後の12月31日」の適用期限を逆算設定",
      "複数の不動産会社による仲介査定および買取査定の手残り比較",
      "2024年改正「買主解体特約（様式1-3）」を活用した事前解体費用持ち出しなしの売却検討",
      "遺産分割協議および相続登記（2024年義務化対応）の完了確認",
    ],
    riskCheck: "期限を1日でも過ぎると約20.315%の譲渡所得税が全額課税され、維持費の累積と合わせて大きな機会損失となります。",
  },
};

export function RequirementFlow() {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([]);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const currentStep = FLOW_STEPS.find((s) => s.id === currentStepId);

  const handleSelect = (
    next: number | "result_self" | "result_vendor" | "result_rent_renovate" | "result_sell_limit"
  ) => {
    if (typeof next === "string") {
      setResultKey(next);
    } else {
      setHistory((prev) => [...prev, currentStepId]);
      setCurrentStepId(next);
    }
  };

  const handleBack = () => {
    if (resultKey) {
      setResultKey(null);
      return;
    }
    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentStepId(prevStep);
    }
  };

  const handleReset = () => {
    setCurrentStepId(1);
    setHistory([]);
    setResultKey(null);
  };

  const result = resultKey ? FLOW_RESULTS[resultKey] : null;

  return (
    <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm sm:p-8">
      <div className="border-b border-[#dfe9ee] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
              診断フロー
            </span>
            <span className="text-xs font-bold text-[#708696]">
              維持可能性・放置リスク・売却期限の客観判定
            </span>
          </div>
          {(history.length > 0 || resultKey) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-[#078c95] hover:underline"
            >
              最初からやり直す
            </button>
          )}
        </div>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl">
          実家を「売らない」場合の維持・委託・売却ルート判定チャート
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#506477] sm:text-sm">
          実家との距離・管理作業の可否・築年数・将来の予定から、最も合理的でリスクの少ない選択肢を診断します。
        </p>
      </div>

      <div className="mt-6">
        {!result ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-[#078c95]">
                ステップ {history.length + 1} / {FLOW_STEPS.length}
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs font-bold text-[#708696] hover:text-[#14243a]"
                >
                  ← 前の質問に戻る
                </button>
              )}
            </div>

            <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-5">
              <h4 className="text-sm font-black text-[#14243a] sm:text-base">
                {currentStep?.question}
              </h4>
              <p className="mt-1 text-xs text-[#506477] leading-relaxed">
                {currentStep?.subText}
              </p>

              <div className="mt-5 grid gap-3">
                {currentStep?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(opt.nextStep)}
                    className="flex min-h-11 w-full flex-col items-start justify-center rounded-xl border border-[#dfe9ee] bg-white p-4 text-left shadow-sm transition hover:border-[#078c95] hover:bg-[#f0f7f7] focus:outline-none"
                  >
                    <span className="text-xs font-black text-[#14243a] sm:text-sm">
                      {opt.label}
                    </span>
                    <span className="mt-0.5 text-[11px] text-[#506477]">
                      {opt.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-2.5 py-1 text-xs font-black ${result.badgeColor}`}>
                  {result.badge}
                </span>
                <span className="text-xs font-bold text-[#708696]">診断結果</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-[#14243a] sm:text-xl">
                {result.title}
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-[#14243a] sm:text-sm">
                {result.summary}
              </p>

              <div className="mt-6 rounded-xl border border-[#dfe9ee] bg-white p-5">
                <h5 className="text-xs font-black uppercase text-[#078c95]">
                  📋 実践すべき具体的アクション
                </h5>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#14243a]">
                  {result.keyActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#078c95] font-black">✔</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs">
                <span className="font-bold text-amber-900">⚠️ 注意・確認事項:</span>
                <p className="mt-1 leading-relaxed text-[#506477]">{result.riskCheck}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-11 rounded-lg border border-[#dfe9ee] bg-white px-4 py-2 text-xs font-bold text-[#14243a] hover:bg-[#fbfaf7]"
                >
                  診断をやり直す
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
