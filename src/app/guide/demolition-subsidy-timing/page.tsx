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
import { VERIFIED_MUNICIPALITY_PROGRAMS } from "@/lib/renewal/demolition-subsidy";
import { SubsidyTimingSimulator } from "@/components/editorial/demolition-subsidy-timing/SubsidyTimingSimulator";
import { SubsidyTimingRequirementFlow } from "@/components/editorial/demolition-subsidy-timing/SubsidyTimingRequirementFlow";
import { SubsidyTimingStepGuide } from "@/components/editorial/demolition-subsidy-timing/SubsidyTimingStepGuide";
import { SubsidyTimingFaqAccordion } from "@/components/editorial/demolition-subsidy-timing/SubsidyTimingFaqAccordion";
import { LandUseComparisonTable } from "@/components/editorial/demolition-subsidy-timing/LandUseComparisonTable";
import { ARTICLE_SOURCES, FAQ_ITEMS } from "@/components/editorial/demolition-subsidy-timing/article-data";

const VERIFIED_CAPS = VERIFIED_MUNICIPALITY_PROGRAMS.flatMap((program) =>
  program.max_amount == null ? [] : [program.max_amount],
);
const VERIFIED_CAP_MIN_MAN = Math.min(...VERIFIED_CAPS) / 10_000;
const VERIFIED_CAP_MAX_MAN = Math.max(...VERIFIED_CAPS) / 10_000;
const VERIFIED_CAP_RANGE = `${VERIFIED_CAP_MIN_MAN}万円〜${VERIFIED_CAP_MAX_MAN}万円`;
const VERIFIED_PROGRAM_COUNT = VERIFIED_MUNICIPALITY_PROGRAMS.length;

export const metadata: Metadata = {
  title:
    "空き家の解体補助金はいつ申請する？自治体の年度予算・募集タイミングと立替資金・跡地活用まで徹底解説【2026年度版】",
  description:
    `自治体の空き家解体補助金の申請タイミングを解説。募集開始日・締切・予算枠・受付方式は自治体ごとに異なり、一次情報で確認済みの${VERIFIED_PROGRAM_COUNT}自治体では上限${VERIFIED_CAP_RANGE}の幅。立替資金、解体後の固定資産税と跡地活用まで整理します。`,
  alternates: {
    canonical: "/guide/demolition-subsidy-timing",
  },
  openGraph: {
    title:
      "空き家の解体補助金はいつ申請する？年度予算・募集タイミングと立替資金・跡地活用の全知識【2026年度版】",
    description:
      "着工前確認、自治体ごとに異なる募集期間・予算枠・受付方式、立替資金の仕組み、解体後の固定資産税（課税標準の特例解除）と跡地活用の総合比較を整理します。",
    type: "article",
    publishedTime: "2026-08-16T00:00:00Z",
    modifiedTime: "2026-08-20T00:00:00Z",
  },
};

export const revalidate = 86400; // 24 hours ISR

export default function DemolitionSubsidyTimingArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家解体補助金の申請タイミングと立替資金・跡地活用",
      path: "/guide/demolition-subsidy-timing",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "空き家の解体補助金はいつ申請する？自治体の年度予算・募集タイミングと立替資金・跡地活用まで徹底解説【2026年度版】",
    description:
      "自治体の空き家解体補助金の申請タイミング（着工前確認・募集期間・年度予算）、後払い補助金のキャッシュフローと立替資金計画、解体後の固定資産税変化と跡地活用の比較を解説。",
    datePublished: "2026-08-16T00:00:00Z",
    dateModified: "2026-08-20T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/demolition-subsidy-timing`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(FAQ_ITEMS);

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
                制度・税金
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">解体補助金の申請タイミング</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                制度・税金
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                2026年度版
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              空き家の解体補助金はいつ申請する？自治体の年度予算・募集タイミングと立替資金・跡地活用まで徹底解説
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              空き家の解体（除却）補助金は自治体ごとに制度が異なります。契約・着工前の確認が必要な制度が多い一方、受付開始日・締切・予算枠・先着や抽選などの受付方式は一律ではありません。本記事では、自治体の公式要項を確認する順序、立替資金計画、解体後に発生する固定資産税の変化（住宅用地特例の適用除外）と跡地活用の比較まで整理します。
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
                  <span className="text-[#078c95]">1.</span> 補助金を左右する3つのルール
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 立替・後払いのキャッシュフロー試算
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 年度スケジュールと申請手順
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 申請タイミングのセルフチェック
                </a>
              </li>
              <li>
                <a href="#atochi" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 解体後の固定資産税と跡地活用
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> よくある質問
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1 */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 空き家の解体補助金を左右する3つのルール
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家対策は空家等対策の推進に関する特別措置法などを背景に、市区町村が独自の助成制度として実施しています。制度の名称・補助率・上限額・要件・募集時期は自治体ごとに異なります。全国一律の「相場」や受付時期を前提にせず、当年度の自治体要項を確認してください。補助金の制度差・受給要件の詳細は
                <Link href="/guide/demolition-subsidy" className="font-bold text-[#078c95] hover:underline">
                  「空き家解体補助金の金額・対象条件」の解説記事
                </Link>
                で詳しく扱っています。
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#bbd8dc] bg-[#f0f7f7] p-5">
                  <span className="text-[11px] font-black text-[#0a7079]">ルール 1</span>
                  <h3 className="mt-1.5 text-sm font-black text-[#14243a]">着工前の事前申請</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    補助金は「交付申請→交付決定→着手」の順が原則。交付決定通知の前に工事請負契約や着工をすると、不交付（交付取消）の事由になる要項がほとんどです。
                  </p>
                </div>
                <div className="rounded-xl border border-[#bbd8dc] bg-[#f0f7f7] p-5">
                  <span className="text-[11px] font-black text-[#0a7079]">ルール 2</span>
                  <h3 className="mt-1.5 text-sm font-black text-[#14243a]">実績報告後の後払い</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    工事完了・完了検査・実績報告を経て補助額が確定し、交付請求後に振り込まれる精算払いが原則。工事代金はいったん全額自己資金で支払う計画が必要です。
                  </p>
                </div>
                <div className="rounded-xl border border-[#bbd8dc] bg-[#f0f7f7] p-5">
                  <span className="text-[11px] font-black text-[#0a7079]">ルール 3</span>
                  <h3 className="mt-1.5 text-sm font-black text-[#14243a]">年度予算と受付方式</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    募集期間・予算枠・先着や抽選などの受付方式は制度ごとに異なります。当年度の公式要項と受付状況を契約・着工前に確認します。
                  </p>
                </div>
              </div>

              <p className="text-sm leading-8 text-[#506477] md:text-base">
                補助率・上限額にも全国一律の基準はありません。このサイトで自治体公式ページを確認日付きで検証済みの{VERIFIED_PROGRAM_COUNT}自治体では、上限は{VERIFIED_CAP_RANGE}の幅があります。未検証の自治体については数値を推定せず、
                <Link href="https://www.r-sic.com/akiya/akiya-demolition-subsidy/" className="font-bold text-[#078c95] hover:underline">
                  解体補助金の判断ページ
                </Link>
                から公式確認へ進んでください。下のシミュレーターにある数値プリセットは制度相場ではなく、計算方法を試すための例示です。
              </p>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 立替・後払いのキャッシュフローと税負担の試算
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                解体補助金は後払いのため、受給可否と同じくらい「いつ・いくらの手元資金が必要か」の計画が重要です。見積額と自治体の補助率・上限額を入力して、一時的な立替額と実質自己負担を確認しましょう。あわせて、解体で建物がなくなったあとの固定資産税・都市計画税（住宅用地の課税標準特例の適用除外）の年額変化も試算できます。
              </p>
              <SubsidyTimingSimulator />
            </section>

            {/* セクション 3: 年度スケジュールと手順 */}
            <section id="schedule" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 年度スケジュールと申請手順【募集期間・受付方式・年度内手続】
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                募集開始日、締切、予算枠、受付方式、工事完了・実績報告の期限は自治体ごとに異なります。まず物件所在地の当年度要項を確認し、そこから事前相談、見積取得、申請、交付決定、契約・着工、完了報告を逆算してください。日付や必要期間を全国共通のものとして置かないことが重要です。
              </p>
              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-5 sm:p-7 text-xs sm:text-sm text-[#506477] leading-loose">
                <p className="font-bold text-[#e56f2d] text-sm sm:text-base">
                  ⚠ 交付決定前の契約・着工は不交付事由
                </p>
                <p className="mt-2">
                  「早く更地にしたい」と解体業者と契約して着工してしまうと、交付決定前に着手したものとされ、その年度の補助金が不交付（または交付取消）となる要項がほとんどです。見積もりや現地調査は契約に該当しませんが、工事請負契約の締結は交付決定通知書を受領した後に行います。
                </p>
              </div>
              <SubsidyTimingStepGuide />
            </section>

            {/* セクション 4: 要件・タイミング診断 */}
            <section id="requirements" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 申請タイミングのセルフチェック診断
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                補助金の申請で最初に確認するのは、制度の要件そのものより「契約・着工前であること」「募集期間内・予算枠の空き」「所有権と納税の前提」です。6つのチェックで、交付申請に進める状態かを確認できます。
              </p>
              <SubsidyTimingRequirementFlow />
            </section>

            {/* セクション 5: 跡地活用 */}
            <section id="atochi" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 解体後の固定資産税（最大6倍）と跡地活用の総合比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                建物がある間、その敷地は住宅用地として課税標準の特例（小規模住宅用地は評価額の1/6、一般住宅用地は1/3。都市計画税は1/3・2/3）の対象です（地方税法第349条の3・第349条の4）。解体で建物がなくなると、賦課期日（毎年1月1日）の時点で住宅用地特例が適用されなくなり、<strong>固定資産税の課税標準は最大6倍（小規模住宅用地の比較。都市計画税は最大3倍）</strong>になります。なお、特定空家等（区分所有を除く）として勧告等の対象となった土地は、建物があっても住宅用地特例の適用外です（総務省自治税務局通知・総税企第102号）。詳細は
                <Link href="/guide/tokutei-akiya-tax" className="font-bold text-[#078c95] hover:underline">
                  特定空家と固定資産税の解説記事
                </Link>
                を参照してください。
              </p>

              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-5 sm:p-7 text-xs sm:text-sm text-[#506477] leading-loose">
                <p className="font-bold text-[#e56f2d] text-sm sm:text-base">
                  💡 賦課期日の「1月1日」で税負担が変わる
                </p>
                <p className="mt-2">
                  固定資産税の賦課期日は毎年1月1日です。1月2日以降に解体して年内に土地の売却（引渡し）を完了すれば、住宅用地特例が外れた年度の固定資産税負担を負わずに済みます。一方、解体後に長期間保有したり駐車場等の他の用途へ供したりすると、特例が外れた課税が続きます。相続した空き家の3,000万円特別控除（国税庁タックスアンサーNo.4507）も、建物取壊し後の土地譲渡については「その敷地を駐車場等その他の用に供していないこと」が要件です。
                </p>
              </div>

              <h3 className="text-lg font-black text-[#14243a] sm:text-xl">
                跡地活用プラン別の制度上の扱い比較
              </h3>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                解体後の跡地は「更地で売却」「古家付きのまま売却」「直接買取」「駐車場等で活用・保有」に大別できます。補助金の可否・固定資産税・譲渡所得の特例という観点で、それぞれの扱いを整理しました。
              </p>
              <LandUseComparisonTable />
            </section>

            {/* セクション 6: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. よくある質問・実務上の注意点
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                申請タイミング、後払いのキャッシュフロー、年度予算の扱い、解体後の税務まで、窓口への相談前に寄せられる質問に回答します。
              </p>
              <SubsidyTimingFaqAccordion />
            </section>

            {/* 出典 */}
            <section id="sources" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-lg font-black text-[#14243a] sm:text-xl">
                本記事の制度情報の出典
              </h2>
              <ul className="space-y-2.5 text-xs leading-relaxed text-[#506477] sm:text-sm">
                {ARTICLE_SOURCES.map((source) => (
                  <li key={source.label} className="rounded-lg border border-[#dfe9ee] bg-white p-4">
                    <span className="font-bold text-[#14243a]">{source.label}</span>
                    <span className="block text-[#708696]">{source.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] leading-relaxed text-[#708696]">
                ※自治体ごとの補助率・上限額・募集期間・予算枠は年度ごとの募集要項により異なります。確認済み自治体の数値は一次情報の確認日付きデータのみを使用し、シミュレーターのプリセット値は制度相場ではなく計算例として扱います。実際の申請前には自治体の最新要項・担当課で必ず確認してください。
              </p>
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="demolition-subsidy-timing" />

      <AkiyaFooter />
    </div>
  );
}
