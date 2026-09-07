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
import {
  DemolitionSaleSimulator,
  DemolitionRequirementFlow,
  DemolitionMethodComparisonTable,
  DemolitionSaleFaqAccordion,
  DemolitionSaleStepGuide,
  DEMOLITION_SALE_FAQ_ITEMS,
  STATUTORY_SOURCES,
} from "@/components/editorial/vacant-house-demolition-sale";

export const metadata: Metadata = {
  title:
    "【2026年最新】空き家売却は更地と古家付きどっちが得？固定資産税6倍リスク・更地渡し特約・手残りシミュレーション",
  description:
    "空き家を更地にして売却するか古家付きで売るかの判断基準、解体費用の相場、固定資産税の住宅用地特例解除（最大6倍）リスク、管理不全空家の法改正、更地渡し特約（契約後解体）の活用法、自治体補助金の申請注意点をシミュレーター付きで徹底解説。",
  alternates: {
    canonical: "/guide/vacant-house-demolition-sale",
  },
  openGraph: {
    title:
      "【2026年最新】空き家売却は更地と古家付きどっちが得？固定資産税6倍リスク・更地渡し特約・手残りシミュレーション",
    description:
      "安易な解体による固定資産税増税と費用持ち出しを防ぐ！更地・古家付き・更地渡し特約の手残り比較シミュレーターと最新法制対応の判断ロードマップ。",
    type: "article",
    publishedTime: "2026-08-16T00:00:00Z",
    modifiedTime: "2026-08-20T00:00:00+09:00",
  },
};

export default function VacantHouseDemolitionSaleArticlePage() {
  const canonicalUrl = `${SITE_URL}/guide/vacant-house-demolition-sale`;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家売却・更地と古家付きの判断基準",
      path: "/guide/vacant-house-demolition-sale",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【2026年最新】空き家売却は更地と古家付きどっちが得？固定資産税6倍リスク・更地渡し特約・手残りシミュレーション",
    description:
      "空き家売却で更地にするか古家付きで売るかの判断基準を法令と実務データから解説。住宅用地特例解除リスク、管理不全空家法改正、更地渡し条件付き契約の活用法、自治体補助金の申請手順を網羅。",
    datePublished: "2026-08-16T00:00:00Z",
    dateModified: "2026-08-20T00:00:00+09:00",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const faqJsonLd = buildFaqJsonLd(DEMOLITION_SALE_FAQ_ITEMS);

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
              <span className="text-[#14243a]">更地 vs 古家付き売却</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                2024年相続登記義務化・空家特措法改正対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日 ／ 更新日: 2026年8月20日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【2026年最新】空き家売却は「更地」と「古家付き」どっちが得？固定資産税6倍リスク・更地渡し特約・手残りシミュレーション
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              「相続した空き家を売るなら、先に解体して更地にしたほうが売れやすい？」「解体費用が出せない場合はどうすればいい？」と迷っていませんか？安易に先行解体すると、<strong>100万〜300万円の解体費用が持ち出しになるだけでなく、売れ残った際に固定資産税が最大約6倍に跳ね上がるリスク</strong>があります。本記事では、固定資産税特例と法改正を踏まえ、手残りを最大化する「更地渡し条件付き契約」や自治体補助金の活用法をシミュレーター付きで徹底解説します。
            </p>
          </div>
        </header>

        {/* 記事本文コンテナ */}
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
                  <span className="text-[#078c95]">1.</span> 更地 vs 古家付きの基本比較
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 手残り＆リスクシミュレーター
                </a>
              </li>
              <li>
                <a href="#tax-laws" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 固定資産税6倍と法改正ルール
                </a>
              </li>
              <li>
                <a href="#flowchart" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 最適売却ルート診断フロー
                </a>
              </li>
              <li>
                <a href="#conditional-sale" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 更地渡し特約・買主解体の活用法
                </a>
              </li>
              <li>
                <a href="#subsidy" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 自治体解体補助金の実務注意点
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> 失敗しない5ステップ手順
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
            {/* セクション 1 */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 空き家売却における「更地」と「古家付き」の基本比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家を売却する際、多くの所有者が「建物を壊して更地にしたほうが買い手がつきやすいのではないか」と考えがちです。確かに、更地にすることで新築を検討する買主が即座に建築計画を立てやすくなるというメリットがあります。
              </p>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                しかし、不動産売却の実務において最も重視すべき指標は「売却価格の高さ」ではなく、<strong>解体費用や保有期間中の固定資産税、譲渡所得税を差し引いた後の「最終手残り金額」</strong>です。先行して更地化すると、売却が長期化した際に重い税負担と自己資金流出が生じるため、慎重な比較判断が求められます。
              </p>

              <DemolitionMethodComparisonTable />
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 手残り額＆先行支出リスクシミュレーター
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                売却想定価格、建物の構造（木造・鉄骨・RC）と坪数、売却にかかる想定期間を入力することで、「古家付き現状渡し」「更地渡し条件付き契約」「更地先行解体」の3手法における手残り額とリスクを即座に試算できます。
              </p>
              <DemolitionSaleSimulator />
            </section>

            {/* セクション 3: 税金と法改正 */}
            <section id="tax-laws" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 知らないと大損！固定資産税最大6倍リスクと最新法制
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家を売却・解体する上で絶対に押さえておくべき法的ルールが、<strong>地方税法に基づく住宅用地の特例</strong>および<strong>改正空家等対策特別措置法</strong>です。
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* カード1: 住宅用地特例 */}
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-7 shadow-sm space-y-3">
                  <span className="inline-block rounded bg-[#e56f2d] px-2.5 py-0.5 text-xs font-bold text-white">
                    地方税法第349条の3の2
                  </span>
                  <h3 className="text-lg font-black text-[#14243a]">
                    更地化による住宅用地特例の解除
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                    住宅が建っている土地は、固定資産税の課税標準が<strong>小規模住宅用地（200㎡以下）で1/6、一般住宅用地（200㎡超）で1/3</strong>に軽減されています。建物を解体して1月1日（賦課期日）を迎えるとこの特例が外れ、土地の固定資産税負担が最大約6倍に跳ね上がります。
                  </p>
                </div>

                {/* カード2: 管理不全空家の新設 */}
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-7 shadow-sm space-y-3">
                  <span className="inline-block rounded bg-[#14243a] px-2.5 py-0.5 text-xs font-bold text-white">
                    2023年12月 改正空家特措法
                  </span>
                  <h3 className="text-lg font-black text-[#14243a]">
                    「管理不全空家」への勧告と増税
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                    放置すれば特定空家になるおそれのある空き家が「管理不全空家」に指定され、自治体から改善勧告を受けると、<strong>建物を解体していなくても住宅用地特例が解除</strong>されます。放置も先行解体もリスクがあるため、早期の売却活動開始が不可欠です。
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-xs sm:text-sm text-[#14243a] space-y-2">
                <h4 className="font-bold text-[#0a7079] text-sm sm:text-base">
                  ⚖️ 2024年4月施行：相続登記の義務化
                </h4>
                <p className="leading-relaxed text-[#506477]">
                  不動産登記法の改正により、2024年4月1日から相続による不動産取得を知った日から3年以内の相続登記が義務化されました（正当な理由のない怠慢には10万円以下の過料）。売却契約を進める前提として、被相続人名義のままになっている空き家の名義変更手続きを先行させる必要があります。
                </p>
              </div>
            </section>

            {/* セクション 4: フローチャート診断 */}
            <section id="flowchart" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. あなたの空き家はどちらで売るべき？最適売却ルート診断
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                接道条件や建物の耐震性、自己資金の状況に応じて、最も手残りを最大化できる売却ルートを診断します。
              </p>
              <DemolitionRequirementFlow />
            </section>

            {/* セクション 5: 更地渡し特約 */}
            <section id="conditional-sale" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 先行解体リスクをゼロにする「更地渡し条件付き契約」の実務
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                解体費用の自己資金持ち出しや、更地のまま年を越して固定資産税が増税されるリスクを完全に回避する最強の実務手法が<strong>「更地渡し条件付き契約（契約後解体）」</strong>です。
              </p>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-5">
                <h3 className="text-lg font-black text-[#14243a] flex items-center gap-2">
                  <span className="text-[#078c95]">📌</span>
                  <span>更地渡し特約の契約スキームとメリット</span>
                </h3>
                <div className="grid gap-4 text-xs sm:text-sm text-[#506477] sm:grid-cols-3">
                  <div className="rounded-xl bg-[#f8fbfa] p-4 border border-[#dfe9ee]">
                    <p className="font-bold text-[#14243a]">① 募集段階</p>
                    <p className="mt-1.5 leading-relaxed">
                      「古家付き土地（更地渡しも相談可）」として売出。住宅用地特例を維持。
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f8fbfa] p-4 border border-[#dfe9ee]">
                    <p className="font-bold text-[#14243a]">② 売買契約時</p>
                    <p className="mt-1.5 leading-relaxed">
                      買主決定後、売買契約を締結し手付金を受領。「残代金決済までに解体」特約を締結。
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f8fbfa] p-4 border border-[#dfe9ee]">
                    <p className="font-bold text-[#14243a]">③ 解体・決済</p>
                    <p className="mt-1.5 leading-relaxed">
                      契約後に売主側で解体工事を行い、建物滅失登記を経て更地状態で引渡し・残代金決済。
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-[#0a7079]">
                    💡 2024年税制改正：買主側解体でも3,000万円特別控除が利用可能に
                  </h4>
                  <p className="text-[#14243a] leading-relaxed">
                    令和6年（2024年）1月1日以降の売却から、売主自身が解体しなくても<strong>「買主が売買契約後に解体工事等を行い、翌年2月15日までに完了する」</strong>形でも、売主側で相続空き家3,000万円特別控除（租税特別措置法第35条第3項）が適用できるようになりました。資金力のない相続人にとっても極めて有利な選択肢です。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 6: 補助金 */}
            <section id="subsidy" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 自治体の空き家解体補助金（除却助成金）の実務上の注意点
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                多くの自治体では、地域の住環境改善や防災・防犯を目的として、老朽化した危険空き家の解体費用に対して<strong>最大数十万〜100万円超の補助金制度</strong>を設けています。
              </p>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 sm:p-8 space-y-4">
                <h3 className="text-base sm:text-lg font-black text-amber-900 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>最大の落とし穴：必ず「工事契約前・着工前」の申請が必須</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-950">
                  自治体の解体補助金において最も多いトラブルが「すでに解体業者と工事請負契約を結んでしまった」「着工・解体後に申請窓口へ行った」ために<strong>補助金が一切受け取れなくなるケース</strong>です。自治体の現地調査と審査を経て「交付決定通知書」が届く前に契約・着工した工事はすべて補助対象外となります。
                </p>
                <div className="grid gap-3 pt-2 text-xs sm:text-sm sm:grid-cols-2 text-amber-900">
                  <div className="rounded-lg bg-white/80 p-3 border border-amber-200">
                    <strong>主な対象要件:</strong> 旧耐震基準（昭和56年5月以前）、1年以上空き家、構造の腐朽・破損度合判定
                  </div>
                  <div className="rounded-lg bg-white/80 p-3 border border-amber-200">
                    <strong>申請者要件:</strong> 所有者本人または法定相続人、市町村税の滞納がないこと
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 7: ステップガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 失敗しない空き家売却・更地化の5ステップ手順
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                事前調査から両面査定、販売活動、特約契約、確定申告までの全体ロードマップです。
              </p>
              <DemolitionSaleStepGuide />
            </section>

            {/* セクション 8: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                8. よくある質問・注意点（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家売却・更地化に際して所有者から多く寄せられる質問と実務上の注意点をまとめました。
              </p>
              <DemolitionSaleFaqAccordion />
            </section>

            {/* 公的根拠・出典リスト */}
            <section className="rounded-2xl border border-[#dfe9ee] bg-[#f8fbfa] p-6 sm:p-8 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#708696]">
                公的根拠・法令・参照リンク
              </h3>
              <ul className="divide-y divide-[#dfe9ee] text-xs text-[#506477]">
                {STATUTORY_SOURCES.map((source, idx) => (
                  <li key={idx} className="py-2 flex items-center justify-between gap-2">
                    <span>{source.name}</span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#078c95] font-bold hover:underline shrink-0"
                    >
                      公式情報 ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* 関連ガイド（内部リンク） */}
            <section className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#708696]">
                関連ガイド
              </h3>
              <ul className="divide-y divide-[#dfe9ee] text-xs sm:text-sm text-[#506477]">
                <li className="py-2">
                  3,000万円特別控除の適用要件と確定申告の手順は{" "}
                  <Link href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="font-bold text-[#078c95] hover:underline">
                    空き家売却の3,000万円特別控除の解説
                  </Link>{" "}
                  に詳しい一覧表があります。
                </li>
                <li className="py-2">
                  自治体ごとの解体補助金の金額・受給要件・申請時期は{" "}
                  <Link href="/guide/demolition-subsidy" className="font-bold text-[#078c95] hover:underline">
                    空き家解体補助金の制度解説
                  </Link>{" "}
                  で扱います。
                </li>
                <li className="py-2">
                  接道義務を満たさず再建築不可と判定された物件は、{" "}
                  <Link href="https://www.r-sic.com/akiya/articles/saikenchikufuka-exit" className="font-bold text-[#078c95] hover:underline">
                    再建築不可物件の売却戦略
                  </Link>{" "}
                  を先に確認してください。
                </li>
                <li className="py-2">
                  古家付きのまま売る場合の告知と免責特約の設計は{" "}
                  <Link href="https://www.r-sic.com/akiya/articles/menseki-tokuyaku" className="font-bold text-[#078c95] hover:underline">
                    古家付き土地売却の契約不適合責任免責
                  </Link>{" "}
                  で条文ドラフトを示しています。
                </li>
                <li className="py-2">
                  仲介で売れない場合の買取業者への切り替え判断は{" "}
                  <Link href="/guide/sale-vs-buyout" className="font-bold text-[#078c95] hover:underline">
                    空き家売却と買取の比較
                  </Link>{" "}
                  を参照してください。
                </li>
                <li className="py-2">
                  手取り差の計算式とデータ上の注意（更地プレミアムの当て方・標本の限界）は{" "}
                  <Link href="https://www.r-sic.com/insight/T-370" className="font-bold text-[#078c95] hover:underline">
                    解体後の手取り差の分析ノート
                  </Link>{" "}
                  が担当します。本記事は制度・契約・手順、分析ノートは数字の前提を扱います。
                </li>
              </ul>
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="vacant-house-demolition-sale" />

      <AkiyaFooter />
    </div>
  );
}
