export function StepGuide() {
  const steps = [
    {
      num: "01",
      title: "現状把握と物件情報の整理",
      sub: "権利関係・越境・残置物・税制特例要件の事前確認",
      details: [
        "法務局で登記簿謄本（全部事項証明書）を取得し、所有者名義・抵当権の有無・建築時期（昭和56年5月31日以前か等）を確認",
        "固定資産税納税通知書（課税明細書）を用意し、固定資産税評価額と住宅用地特例の適用状況を把握",
        "室内の家財道具（残置物）の量や、雨漏り・シロアリ等の建物の劣化状況を目視確認",
      ],
    },
    {
      num: "02",
      title: "「仲介査定」と「買取査定」の同時取得",
      sub: "市場相場と即時買取価格の差額を実数で把握",
      details: [
        "地元の流通に強い仲介会社と、空き家再生を得意とする買取専門業者の双方に査定を依頼",
        "仲介査定価格（売出想定価格・成約予想期間）と、買取査定価格（現状渡し・手数料0円での確定買取額）を提示してもらう",
        "残置物処分や境界確定測量を売主・業者のどちらが負担するかの条件を明確化",
      ],
    },
    {
      num: "03",
      title: "手残り額（諸経費・税制控除）の比較と契約締結",
      sub: "解体費・仲介手数料・3,000万円特別控除の適用判定",
      details: [
        "仲介手数料（売却価格×3%+6万+税）、残置物撤去費、解体費、保有維持費を差し引いた実質手残り額を算出",
        "「相続空き家の3,000万円特別控除（買主解体特約対応）」の適用可否を顧問税理士または税務署で確認",
        "買取の場合は「契約不適合責任免責」「残置物現況引渡し」「公簿売買」の特約条項を売買契約書に明記して契約締結",
      ],
    },
    {
      num: "04",
      title: "決済・引渡しと翌年の確定申告",
      sub: "鍵の引渡し・代金受領と特例適用の申告",
      details: [
        "司法書士立会いのもとで残代金決済および所有権移転登記を実行し、鍵を引き渡す（買取の場合は最短数日〜数週間で完了）",
        "市区町村の空き家担当窓口で「被相続人居住用家屋等確認書」を申請・受領",
        "売却した翌年の2月16日〜3月15日の間に、確定申告書に確認書・登記事項証明書等の必要書類を添付して税務署へ提出",
      ],
    },
  ];

  return (
    <div className="my-10 sm:my-14 space-y-4 sm:space-y-6">
      <div className="border-b border-[#dfe9ee] pb-4">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
          <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
          EXECUTION ROADMAP
        </span>
        <h3 className="mt-1 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          空き家売却・買取を成功させる4つの実践ステップ
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#506477]">
          準備から査定比較、契約締結、確定申告までの実務手順を時系列で解説します。
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col justify-between rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(20,36,58,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#dfe9ee] pb-3">
                <span className="text-2xl sm:text-3xl font-black text-[#078c95]">
                  {step.num}
                </span>
                <span className="rounded bg-[#f0f7f7] px-2.5 py-1 text-[11px] font-bold text-[#0a7079]">
                  STEP {step.num}
                </span>
              </div>
              <h4 className="mt-3 text-base font-black text-[#14243a] sm:text-lg leading-snug">
                {step.title}
              </h4>
              <p className="mt-1 text-xs font-bold text-[#078c95]">
                {step.sub}
              </p>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#506477]">
                {step.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#078c95]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
