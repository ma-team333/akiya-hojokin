import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GuideSources } from "@/components/guide/GuideSources";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";
import { SanrinDisposalSimulator } from "@/components/editorial/sanrin-inheritance-disposal/SanrinDisposalSimulator";
import { SanrinRequirementFlow } from "@/components/editorial/sanrin-inheritance-disposal/SanrinRequirementFlow";
import { SanrinDisposalComparisonTable } from "@/components/editorial/sanrin-inheritance-disposal/SanrinDisposalComparisonTable";
import { SanrinStepGuide } from "@/components/editorial/sanrin-inheritance-disposal/SanrinStepGuide";
import { SanrinFaqAccordion } from "@/components/editorial/sanrin-inheritance-disposal/SanrinFaqAccordion";
import { SANRIN_FAQ_ITEMS } from "@/components/editorial/sanrin-inheritance-disposal/article-data";

export const metadata: Metadata = {
  title:
    "【森林法・国庫帰属対応】相続した山林の売却・処分方法と森林組合の役割｜費用シミュレーターと手続きガイド",
  description:
    "相続した不要な山林を売却・処分する実践ガイド。森林組合の役割（立木売却・境界調査と土地買取りの実態）、森林法に基づく90日以内の届出義務、相続土地国庫帰属制度の審査基準・負担金、専門仲介や隣地譲渡の選び方をシミュレーター付きで解説します。",
  alternates: {
    canonical: "/guide/sanrin-inheritance-disposal",
  },
  openGraph: {
    title: "【森林法・国庫帰属対応】相続した山林の売却・処分方法と森林組合の役割",
    description:
      "不要な山林を相続したときの売却・処分ルート。森林組合でできること・できないこと、森林法の届出義務、相続土地国庫帰属制度の負担金と要件を網羅解説。",
    type: "article",
    publishedTime: "2026-08-16T00:00:00Z",
    modifiedTime: "2026-08-16T00:00:00Z",
  },
};

export default function SanrinInheritanceDisposalPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "相続した山林の売却・処分と森林組合",
      path: "/guide/sanrin-inheritance-disposal",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【森林法・国庫帰属対応】相続した山林の売却・処分方法と森林組合の役割｜費用シミュレーターと手続きガイド",
    description:
      "相続した山林を売却・処分するための実務的意思決定ガイド。森林組合の活用範囲、森林法第10条の7の2の届出義務、相続土地国庫帰属制度、山林所得と譲渡所得の税制区分を解説。",
    datePublished: "2026-08-16T00:00:00Z",
    dateModified: "2026-08-16T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/sanrin-inheritance-disposal`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(SANRIN_FAQ_ITEMS);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#14243a]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <AkiyaHeader />

      <main className="pt-[72px]">
        {/* ヒーローセクション */}
        <header className="relative isolate overflow-hidden border-b border-[#dfe9ee] bg-[#f0f7f7]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(112deg,#f7fbfa_0%,#eef7f5_52%,#deeff1_100%)]" />
          <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-16">
            <nav aria-label="パンくず" className="text-xs font-bold text-[#708696]">
              <Link href="/guide" className="hover:text-[#078c95]">
                空き家補助金ナビ
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/guide" className="hover:text-[#078c95]">
                売る・手放す
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">相続山林の売却・処分</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                森林法・相続土地国庫帰属法対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【森林法・国庫帰属対応】相続した山林の売却・処分方法と森林組合の役割｜費用シミュレーターと手続きガイド
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              親や親族から山林を相続したものの、「場所や境界がわからない」「一般の不動産会社に売却を断られた」「管理費や固定資産税の負担、倒木リスクが心配」と悩む所有者が増えています。本記事では、森林組合の実際の業務範囲（立木売却・境界調査・施業委託）や、森林法に基づく90日以内の届出義務、山林専門仲介、相続土地国庫帰属制度、税制上の区分まで、客観的な法令・制度データに基づいて網羅的に整理します。
            </p>
          </div>
        </header>

        {/* 記事本文 */}
        <div className="mx-auto max-w-[960px] px-6 py-12 md:px-10 md:py-20">
          {/* 目次 */}
          <div className="mb-14 sm:mb-16 rounded-2xl border border-[#dfe9ee] bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(20,36,58,0.04)]">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#078c95]">
              <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
              TABLE OF CONTENTS
            </p>
            <h2 className="mt-2 text-lg font-black text-[#14243a]">本記事の目次</h2>
            <ol className="mt-5 grid gap-3.5 text-xs font-bold text-[#14243a] sm:grid-cols-2 md:text-sm">
              <li>
                <a href="#overview" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">1.</span> 山林相続の現状と直面する3大課題
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 処分・保有コスト比較シミュレーター
                </a>
              </li>
              <li>
                <a href="#forestr-coop" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 森林組合の役割と実態（買い取り可否）
                </a>
              </li>
              <li>
                <a href="#routes-comparison" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 山林を処分する5つの選択肢比較
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 処分適性 6つのセルフチェック診断
                </a>
              </li>
              <li>
                <a href="#laws-tax" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 森林法届出・相続登記・山林所得の税金
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> 相続から処分までの4ステップ手順
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">8.</span> よくある質問・注意点
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 概要 */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 山林相続の現状と所有者が直面する3大課題
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                林野庁の統計（森林・林業白書）によると、日本の国土の約3分の2（約2,500万ヘクタール）が森林であり、そのうち私有林が約6割を占めています。高度経済成長期に植林されたスギ・ヒノキ人工林の多くが本格的な利用期（樹齢50年以上）を迎える一方で、地方の過疎化や林業採算性の低下により、相続した都市部在住の所有者が山林を管理できなくなる事例が全国で急増しています。
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 sm:p-6">
                  <p className="font-bold text-[#0a7079] text-sm sm:text-base">① 境界・所在が不明</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    先代が口頭や目印（尾根や巨木など）で管理していたため、公図（字図）と現況が一致せず、どこからどこまでが自分の所有地か特定できないケースが多発しています。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 sm:p-6">
                  <p className="font-bold text-[#0a7079] text-sm sm:text-base">② 一般不動産会社での売却困難</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    一般的な宅地と異なり、仲介手数料の上限（宅建業法）に対して取引額が低く、境界確定や接道義務を満たさないため、市街地の不動産会社では取扱を断られる傾向にあります。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 sm:p-6">
                  <p className="font-bold text-[#0a7079] text-sm sm:text-base">③ 所有者責任と管理コスト</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    放置された山林で倒木や土砂崩れが発生し、隣地や公道に被害を与えた場合、民法第717条（土地工作物等責任）に基づき所有者が無過失責任を問われるリスクがあります。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 処分・売却・保有コスト比較シミュレーター
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                所有する山林の面積、立木の種類、接道状況、年間の維持費用を入力して、「保有継続時の累積コスト」「国庫帰属制度の負担金」「森林組合への立木売却収支」「専門仲介での売却手取り」の概算数値を比較できます。
              </p>
              <SanrinDisposalSimulator />
            </section>

            {/* セクション 3: 森林組合の役割 */}
            <section id="forestr-coop" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 森林組合の役割と実態（土地買取りの可否）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                山林の処分を考えた際、最初に「地元の森林組合に相談すれば買い取ってくれるのではないか」と考える方が多く見られます。しかし、森林組合の法的根拠や業務実態を正確に理解しておくことが重要です。
              </p>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="font-bold text-base sm:text-lg text-[#14243a]">
                  森林組合法に基づく協同組織の業務範囲
                </h3>
                <p className="text-xs sm:text-sm text-[#506477] leading-loose">
                  森林組合は「森林組合法」に基づき、地域の森林所有者が相互扶助を目的に組織する協同組合です。宅地建物取引業の免許を持つ不動産会社ではないため、<strong>「不要な山林の土地そのものを買い取る」「一般個人向けに不動産売買仲介を行う」業務は原則として行っていません</strong>。
                </p>

                <div className="border-t border-[#dfe9ee] pt-4 grid gap-4 sm:grid-cols-2">
                  <div className="bg-[#f8fbfa] p-4 rounded-xl border border-[#dfe9ee]">
                    <p className="font-bold text-xs sm:text-sm text-[#078c95]">⭕ 森林組合に依頼・相談できること</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#506477] list-disc list-inside leading-relaxed">
                      <li>森林簿・航空写真・過去施業履歴に基づく境界・現況調査</li>
                      <li>スギ・ヒノキ等の人工林の間伐・主伐・植林などの施業受託</li>
                      <li>伐採した木材（丸太）の市場出荷・共同販売・立木買い取り</li>
                      <li>森林経営計画の作成支援および国・自治体の林業補助金申請</li>
                      <li>隣接森林との境界確認作業（森林施業プランナー等による支援）</li>
                    </ul>
                  </div>

                  <div className="bg-[#fdf8f8] p-4 rounded-xl border border-rose-100">
                    <p className="font-bold text-xs sm:text-sm text-rose-700">❌ 森林組合が対応できないこと</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#506477] list-disc list-inside leading-relaxed">
                      <li>無価値な山林や雑木林の土地自体の無条件引き取り・買取り</li>
                      <li>キャンプ用途・レジャー用途を目的とした一般個人への不動産仲介</li>
                      <li>接道のない急傾斜地・危険崖地における採算性のない伐採作業</li>
                      <li>所有権移転登記に関する法的手続きの代理（司法書士業務）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 4: 5つの選択肢比較 */}
            <section id="routes-comparison" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 相続山林を処分・売却する5つの選択肢徹底比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                不要な山林を手放す、あるいは管理負担を軽減するための手段には、民間売買から公的制度まで複数の経路が存在します。それぞれの費用、期間、境界要件を比較して適した手段を選択します。
              </p>
              <SanrinDisposalComparisonTable />

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <h4 className="font-bold text-base text-[#14243a]">
                    選択肢①：山林専門マッチングサービス（山林バンク等）
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#506477] leading-loose">
                    近年、ソロキャンプやブッシュクラフト、オフロードバイク、自然観察などの個人レジャー需要が高まっています。接道があり景観が良い山林であれば、専門のマッチングサイトを通じて購入希望者を募集できます。一般不動産市場と異なり「現況渡し（瑕疵担保免責・境界非明示）」での成約事例も存在します。
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <h4 className="font-bold text-base text-[#14243a]">
                    選択肢②：相続土地国庫帰属制度（2023年4月施行）
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#506477] leading-loose">
                    相続または遺贈により取得した土地を国が引き取る公的制度（法務局所管）です。森林の場合、1筆あたり審査手数料14,000円に加え、承認時に10年分の管理費用に相当する負担金（面積や区分により約20万円〜数十万円以上）を納付します。ただし、「境界が明らかでない土地」「崩壊の危険がある崖地」「放置車両・産業廃棄物がある土地」は不承認要件に該当します。
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <h4 className="font-bold text-base text-[#14243a]">
                    選択肢③：森林経営管理制度（2019年4月施行）
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#506477] leading-loose">
                    森林経営管理法に基づき、手入れが行き届かない森林について、市町村が仲介となって意欲ある林業経営者に委託、または市町村自らが公的管理を行う制度です。所有権を移転するものではありませんが、森林環境譲与税を財源として活用するため、所有者が多額の自己資金を支出することなく森林の荒廃を防止できます。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 5: 診断チェックフロー */}
            <section id="requirements" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 山林の処分適性 6つのセルフチェック診断
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                所有する山林の境界、接道、樹種、傾斜などの条件から、どの処分ルートが現実的に利用可能かを診断します。
              </p>
              <SanrinRequirementFlow />
            </section>

            {/* セクション 6: 法令・税務 */}
            <section id="laws-tax" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 森林法届出・相続登記義務化・山林所得の税金
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                山林の相続および売却に関わる公的義務と税制のルールについて、関係法令および国税庁の定めに従って整理します。
              </p>

              <div className="space-y-6">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-3">
                  <h3 className="font-bold text-base sm:text-lg text-[#14243a] flex items-center gap-2">
                    <span className="text-[#078c95]">📋</span> 森林法第10条の7の2（森林の土地の所有者届出制度）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506477] leading-loose">
                    平成24年（2012年）4月以降、地域森林計画の対象となっている民有林を取得（相続・売買・贈与など）した場合、<strong>取得した日から90日以内</strong>に、土地が所在する市町村長へ「森林の土地の所有者届出書」を提出することが義務付けられています（林野庁）。
                  </p>
                  <div className="rounded-lg bg-[#f0f7f7] p-4 text-xs text-[#14243a] border border-[#bbd8dc]">
                    <strong>提出書類:</strong> 森林の土地の所有者届出書、登記事項証明書（写し可）または土地売買契約書等の権利取得が確認できる書類、位置図（公図等の写し）。※届出を怠ると10万円以下の過料に処される規定があります。
                  </div>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-3">
                  <h3 className="font-bold text-base sm:text-lg text-[#14243a] flex items-center gap-2">
                    <span className="text-[#078c95]">⚖️</span> 相続登記の義務化（2024年4月1日施行）
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506477] leading-loose">
                    民法および不動産登記法の改正により、2024年（令和6年）4月1日より不動産（山林・農地を含む全地目）の相続登記が義務化されました。自己のために相続の開始があったことを知り、かつ所有権を取得したことを知った日から<strong>3年以内</strong>に相続登記を申請する必要があります（正当な理由のない不履行には10万円以下の過料規定）。
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-3">
                  <h3 className="font-bold text-base sm:text-lg text-[#14243a] flex items-center gap-2">
                    <span className="text-[#078c95]">💰</span> 山林売却時の税金：山林所得と譲渡所得の違い
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506477] leading-loose">
                    国税庁タックスアンサー（No.1480）に基づき、山林の売却は「土地の対価」と「立木の対価」で税務上の所得区分が明確に分かれます。
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="p-4 rounded-xl bg-[#f8fbfa] border border-[#dfe9ee]">
                      <p className="font-bold text-sm text-[#078c95]">山林所得（立木の売却）</p>
                      <p className="mt-1.5 text-[#506477] leading-relaxed">
                        保有期間5年超の立木を伐採・譲渡した場合に該当。<strong>特別控除50万円</strong>が差し引かれ、税額計算では「<strong>5分5乗方式</strong>（課税所得×1/5×税率×5）」が適用されるため、累進課税の負担が著しく軽減されます。
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#f8fbfa] border border-[#dfe9ee]">
                      <p className="font-bold text-sm text-[#14243a]">譲渡所得（土地の売却）</p>
                      <p className="mt-1.5 text-[#506477] leading-relaxed">
                        山林の土地そのものを売却した対価に該当。分離課税となり、保有期間5年超の長期譲渡所得は<strong>一律20.315%</strong>（所得税15%＋復興特別所得税0.315%＋住民税5%）が課税されます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 7: 手順ガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 山林の相続・調査から処分完了までの4ステップ
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                山林を相続してから、現況の把握、関係機関への相談、売却・国庫帰属の実行、確定申告までの標準的な実務の流れを整理しました。
              </p>
              <SanrinStepGuide />
            </section>

            {/* セクション 8: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                8. よくある質問・実務上の注意点
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                森林組合の相談方法や国庫帰属制度の要件、境界調査の進め方など、現場で多く寄せられる疑問に回答します。
              </p>
              <SanrinFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="sanrin-inheritance-disposal" />

      <AkiyaFooter />
    </div>
  );
}
