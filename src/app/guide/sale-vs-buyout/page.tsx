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
  Simulator,
  RequirementFlow,
  SpecialPropertyCaseTable,
  MethodComparisonTable,
  StepGuide,
  SaleVsBuyoutFaqAccordion,
  SALE_VS_BUYOUT_FAQ_ITEMS,
} from "@/components/editorial/sale-vs-buyout";

export const metadata: Metadata = {
  title:
    "【空き家売却 vs 買取】損せず最短で手放す判断基準・手残り額シミュレーター・固定資産税リスク対策",
  description:
    "「仲介で売れない・相続した老朽空き家」を損せず最短で手放すための買取 vs 仲介判断基準と、税制特例（3000万円特別控除）や住宅用地特例解除による税負担増を回避する実践ガイド。手残りシミュレーター・特殊物件（再建築不可・ゴミ屋敷）買取実例付き。",
  alternates: {
    canonical: "/guide/sale-vs-buyout",
  },
  openGraph: {
    title:
      "【空き家売却 vs 買取】損せず最短で手放す判断基準・手残り額シミュレーター・固定資産税リスク対策",
    description:
      "空き家の仲介売却と不動産会社買取の構造比較。残置物・解体費・仲介手数料を考慮した実質手残り額、特殊物件（再建築不可・ゴミ屋敷）の再生スキーム、税制特例の活用手順を網羅解説。",
    type: "article",
    publishedTime: "2026-08-15T00:00:00Z",
    modifiedTime: "2026-08-15T00:00:00Z",
  },
};

export default function SaleVsBuyoutArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家売却 vs 買取",
      path: "/guide/sale-vs-buyout",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【空き家売却 vs 買取】損せず最短で手放す判断基準・手残り額シミュレーター・固定資産税リスク対策",
    description:
      "空き家を手放す際の「一般仲介」と「不動産会社買取」の徹底比較。手残りシミュレーター、特殊物件の買取実例、法改正に伴う固定資産税増税リスクと回避策の実践ガイド。",
    datePublished: "2026-08-15T00:00:00Z",
    dateModified: "2026-08-15T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/sale-vs-buyout`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(SALE_VS_BUYOUT_FAQ_ITEMS);

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
              <span className="text-[#14243a]">売却 vs 買取</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                空家法・税制改正対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月15日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【空き家売却 vs 買取】損せず最短で手放す判断基準・手残り額シミュレーター・固定資産税リスク対策
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              相続した古い実家や空き家を手放す際、「一般仲介」で市場相場を目指すか、「不動産会社買取」で即時現金化するかは、建物の劣化状況・残置物・法的制限・維持コストによって最適な選択肢が大きく分かれます。諸費用・税負担を考慮した実質手残り額の試算から、特定空家・管理不全空家指定時の増税リスク回避まで、公的根拠に基づいて客観的に解説します。
            </p>

            {/* 正準バインディング（SOB-675 Row3・SOB-576 step-1 方式）: この記事=手残り額シミュレーター・税制の解説。「どの売り方で進めるか」の4ルート比較は判断ページが単一オーナー */}
            <div className="mt-4 rounded-xl border border-[#078c95]/30 bg-[#e6f4f5]/60 p-4 text-sm">
              <p className="font-bold text-[#14243a]">売却と買取のどちらで進めるかは、4つの売り方を同じ軸で比べてから</p>
              <p className="mt-1 text-[#334155]">この記事は仲介と買取の手残り額の試算方法の解説です。現況仲介・古家付き土地・解体後売却・買取の4ルートを提示価格・契約条件・残置物・引渡しで比べる売却ルート選択は、専用の判断ページが正本です。</p>
              <Link
                href="https://www.r-sic.com/akiya/akiya-sale-route/"
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]"
              >
                空き家の売り方を比べる判断ページへ進む →
              </Link>
            </div>
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
                <a href="#comparison" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">1.</span> 仲介と買取の構造的違い
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 手残り額＆維持リスク試算
                </a>
              </li>
              <li>
                <a href="#special-cases" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 特殊物件の買取実例・価格水準
                </a>
              </li>
              <li>
                <a href="#tax-risk" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 放置リスクと特例解除の仕組み
                </a>
              </li>
              <li>
                <a href="#decision-flow" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 適合ルート診断フロー
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 売却・買取の実践4ステップ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> よくある質問・注意点
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 仲介と買取の根本的な違い */}
            <section id="comparison" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 「一般仲介」と「不動産会社買取」の構造的違い
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家を処分する手法は、大きく分けて<strong>「仲介（一般個人向け売却）」</strong>と<strong>「買取（不動産会社への直接売却）」</strong>の2通りがあります。両者は売買金額だけでなく、所要期間、手数料、契約不適合責任、室内の荷物（残置物）の扱いにおいて根本的な違いが存在します。
              </p>

              <MethodComparisonTable />

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-xs sm:text-sm">
                <h4 className="font-bold text-[#0a7079] text-sm sm:text-base">
                  💡 表面価格（売出価格）と「実質手残り額」の乖離に注意
                </h4>
                <p className="mt-2.5 text-[#14243a] leading-loose">
                  仲介は市場相場（100%）で売出せる一方、仲介手数料（宅建業法第46条基準）、残置物の片付け費用、更地渡しの解体費用、成約までの固定資産税・管理費が売主の実費負担となります。買取は査定額が相場の5〜8割程度となる一方、手数料0円・現況有姿引き渡し・契約不適合責任免責となるため、諸費用控除後の「手残り額の差」は表面価格差よりも縮小します。
                </p>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 空き家手残り額＆維持リスク試算シミュレーター
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                想定市場価格、建物の販売形態（現状渡し／更地渡し）、残置物量、成約想定月数、3,000万円特別控除の有無を設定して、仲介と買取の最終手取り額を比較試算できます。
              </p>
              <Simulator />
            </section>

            {/* セクション 3: 特殊物件の買取実例 */}
            <section id="special-cases" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 特殊物件（ゴミ屋敷・再建築不可・老朽空き家）の買取実例と価格水準
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「建物の傾きや雨漏りが激しい」「家財やゴミが床まで積み上がっている」「接道義務を満たさず再建築できない」といった特殊物件は、一般の個人買主が住宅ローンを利用して購入することが極めて困難です。専門の買取業者がどのようなスキームで取得・再生しているかを整理しました。
              </p>

              <SpecialPropertyCaseTable />

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477] shadow-sm">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  再建築不可・心理的瑕疵・共有持分物件が買い取れる理由
                </h4>
                <p className="mt-2 leading-relaxed">
                  買取専門業者は、一般個人と異なり自社資金や事業者ローンで決済するため、住宅ローン審査の制約を受けません。また、隣地所有者との境界確定・敷地統合交渉、再建築可能化に向けたセットバック協議、古民家再生リノベーション、または高利回り賃貸運用など多様な出口戦略を持っているため、一般市場で取引不成立となる物件でも確実な事業計画のもとで買い取ることが可能となっています。
                </p>
              </div>
            </section>

            {/* セクション 4: 放置リスクと特例解除 */}
            <section id="tax-risk" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 空家等対策特措法改正に伴う「住宅用地特例解除」の固定資産税リスク
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「売却を先送りして空き家をそのまま放置する」ことには、建物の老朽化だけでなく、法改正による税制上の重大なペナルティが存在します。
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
                  <span className="rounded bg-rose-600 px-2.5 py-1 text-xs font-black text-white">
                    2023年（令和5年）法改正
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    「管理不全空家」の新設
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    従来の「特定空家（倒壊の危険が切迫）」に加え、放置すれば特定空家になる恐れのある「管理不全空家（窓ガラス破損、雑草繁茂、外壁一部剥落等）」が新設され、自治体からの指導・勧告の対象が大幅に拡大されました。
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
                  <span className="rounded bg-amber-600 px-2.5 py-1 text-xs font-black text-white">
                    地方税法第349条の3の2
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    住宅用地特例の強制解除
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    自治体から「勧告」を受けると、敷地にかかる住宅用地特例（小規模住宅用地は課税標準が1/6、一般住宅用地は1/3に減額）が適用除外となります。これにより土地の固定資産税が実質最大約4倍〜6倍に急増します。
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477]">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  固定資産税の負担増シミュレーション例（敷地60坪・評価額1,500万円の場合）
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-4">
                    <span className="text-xs font-bold text-[#708696]">特例適用時（通常）</span>
                    <p className="mt-1 text-lg font-black text-[#14243a]">年間 約3.5万円</p>
                    <p className="mt-1 text-[11px] text-[#708696]">課税標準 250万円（1/6）× 1.4%</p>
                  </div>
                  <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
                    <span className="text-xs font-bold text-rose-700">勧告後（特例解除）</span>
                    <p className="mt-1 text-lg font-black text-rose-700">年間 約15.8万円（約4.5倍）</p>
                    <p className="mt-1 text-[11px] text-rose-600">本則課税標準（負担調整上限）× 1.4%</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#708696] leading-relaxed">
                  ※出典: 総務省「固定資産税制度の概要」、国土交通省「改正空家等対策特別措置法（令和5年12月13日施行）」。固定資産税の増税に加え、過料（最大50万円）や行政代執行（解体費用全額の所有者強制徴収）のリスクも生じます。
                </p>
              </div>
            </section>

            {/* セクション 5: 診断フロー */}
            <section id="decision-flow" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 「仲介」「買取」「更地」適合ルート診断フロー
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                物件の状態、法的制限、売却期限、手元資金の状況に応じて、客観的にどの売却ルートが最も合理的かを診断します。
              </p>
              <RequirementFlow />
            </section>

            {/* セクション 6: 実践ステップ */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 空き家売却・買取を損せず進める実践4ステップ
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                査定依頼から手残り額の精査、売買契約条項の確認、翌年の確定申告までの具体的な手続きの流れです。
              </p>
              <StepGuide />
            </section>

            {/* セクション 7: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 空き家売却・買取のよくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                業者買取の査定根拠、契約不適合責任免責の法的効果、3,000万円特別控除の適用手順など、実務上の疑問点を解説します。
              </p>
              <SaleVsBuyoutFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="sale-vs-buyout" />

      <AkiyaFooter />
    </div>
  );
}
