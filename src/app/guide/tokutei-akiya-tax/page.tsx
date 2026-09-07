import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GuideSources } from "@/components/guide/GuideSources";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { TokuteiAkiyaTaxSimulator } from "@/components/editorial/tokutei-tax/TokuteiAkiyaTaxSimulator";
import { TokuteiAkiyaCheckFlow } from "@/components/editorial/tokutei-tax/TokuteiAkiyaCheckFlow";
import { TokuteiAkiyaComparisonTable } from "@/components/editorial/tokutei-tax/TokuteiAkiyaComparisonTable";
import { TokuteiAkiyaStepGuide } from "@/components/editorial/tokutei-tax/TokuteiAkiyaStepGuide";
import { TokuteiAkiyaFaqAccordion } from "@/components/editorial/tokutei-tax/TokuteiAkiyaFaqAccordion";
import { TOKUTEI_AKIYA_FAQ_ITEMS } from "@/components/editorial/tokutei-tax/article-data";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";

export const metadata: Metadata = {
  title:
    "【空き家・特定空家】固定資産税が最大6倍？住宅用地特例解除の仕組み・シミュレーター・管理不全空家の判定基準",
  description:
    "「空家等対策特別措置法」改正に基づく特定空家・管理不全空家の指定要件と、地方税法上の住宅用地特例解除による固定資産税・都市計画税の負担増（負担調整措置を含む正確な税額計算）を解説。危険度判定フローと勧告回避のロードマップを掲載。",
  alternates: {
    canonical: "/guide/tokutei-akiya-tax",
  },
  openGraph: {
    title: "【空き家・特定空家】固定資産税が最大6倍？住宅用地特例解除の仕組みと税額シミュレーション",
    description:
      "空き家放置による固定資産税の優遇解除ペナルティ。2023年12月施行の管理不全空家新設、自治体勧告の流れ、増税額のリアルタイム計算、管理基準を網羅的に解説。",
    type: "article",
    publishedTime: "2026-08-15T00:00:00Z",
    modifiedTime: "2026-09-04T00:00:00Z",
  },
};

export default function TokuteiAkiyaTaxArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家・特定空家と固定資産税",
      path: "/guide/tokutei-akiya-tax",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【空き家・特定空家】固定資産税が最大6倍？住宅用地特例解除の仕組み・シミュレーター・管理不全空家の判定基準",
    description:
      "空家等対策特措法および地方税法に基づく特定空家・管理不全空家の指定基準、住宅用地特例解除に伴う税負担の計算実務、判定フロー、勧告回避のための実践的ロードマップを網羅的に解説。",
    datePublished: "2026-08-15T00:00:00Z",
    dateModified: "2026-09-04T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/tokutei-akiya-tax`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(TOKUTEI_AKIYA_FAQ_ITEMS);

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
              <span className="text-[#14243a]">特定空家の固定資産税</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                制度・税金
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                空家法改正（令和5年12月施行）対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月15日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【空き家・特定空家】固定資産税が最大6倍？住宅用地特例解除の仕組み・シミュレーター・管理基準
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              放置された空き家に対する法規制が強化され、2023年（令和5年）12月の改正法施行により、倒壊寸前の「特定空家」に加えて、放置すれば特定空家になるおそれのある「管理不全空家」も自治体の勧告によって<strong>土地の固定資産税の住宅用地特例（1/6減額）が解除</strong>される規定となりました。地方税法上の計算実務、増税シミュレーション、判定基準、および勧告を回避するための実践的ロードマップを解説します。
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
                <a href="#mechanism" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">1.</span> 固定資産税「6倍」の法的仕組みと実態
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 増税額シミュレーター
                </a>
              </li>
              <li>
                <a href="#law-reform" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 2023年法改正と3つの区分比較
                </a>
              </li>
              <li>
                <a href="#check-flow" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 判定基準とセルフチェック診断
                </a>
              </li>
              <li>
                <a href="#action-roadmap" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 自治体通知から代執行までのロードマップ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> よくある質問と実務解説
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1 */}
            <section id="mechanism" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 特定空家の固定資産税が「6倍」になる法的仕組みと実態
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                居住用の家屋が建っている土地には、地方税法第349条の3の2に基づく<strong>「住宅用地に対する課税標準の特例（住宅用地特例）」</strong>が適用されます。この特例により、土地の固定資産税課税標準額は面積に応じて大幅に減額されています。
              </p>

              {/* 法定特例率の整理表 */}
              <div className="overflow-x-auto rounded-xl border border-[#dfe9ee] bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#f0f7f7] text-[#14243a] border-b border-[#dfe9ee]">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-black">区分</th>
                      <th className="p-3.5 sm:p-4 font-black">敷地面積</th>
                      <th className="p-3.5 sm:p-4 font-black">固定資産税の課税標準</th>
                      <th className="p-3.5 sm:p-4 font-black">都市計画税の課税標準</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-[#14243a]">小規模住宅用地</td>
                      <td className="p-3.5 sm:p-4">200㎡以下の部分</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#078c95]">価格 × 1/6（約16.7%）</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#078c95]">価格 × 1/3（約33.3%）</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-bold text-[#14243a]">一般住宅用地</td>
                      <td className="p-3.5 sm:p-4">200㎡を超える部分</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#0a7079]">価格 × 1/3（約33.3%）</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#0a7079]">価格 × 2/3（約66.7%）</td>
                    </tr>
                    <tr className="bg-[#fdf2f2]">
                      <td className="p-3.5 sm:p-4 font-bold text-[#d9483b]">特例解除後（勧告後・更地）</td>
                      <td className="p-3.5 sm:p-4">全敷地面積</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#d9483b]">価格 × 1（本則課税・100%）</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#d9483b]">価格 × 1（本則課税・100%）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-sm md:text-base">
                <p className="font-bold text-[#0a7079] text-base sm:text-lg">
                  ⚠️ 「課税標準の6倍」と「実質税額の約3〜4倍」の相違点（負担調整措置）
                </p>
                <p className="mt-3 text-[#14243a] leading-loose">
                  市区町村から「勧告」を受けると住宅用地特例が解除されるため、小規模住宅用地部分の課税標準は1/6から本則の1に戻り、<strong>計算基礎は6倍</strong>となります。
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#506477] leading-loose">
                  ただし、地方税法附則第18条に基づく「負担調整措置（急激な税額上昇を防ぐため、評価額に対する課税標準額の上限を70%水準とする措置）」が適用されるため、<strong>実際の税額は通常時の概ね3〜4倍前後</strong>となります。一律に全税額が即座に6倍となるわけではありませんが、年額数十万円規模の税負担増が生じます。
                </p>
                <p className="mt-2 text-[11px] text-[#708696]">
                  出典: 総務省「地方税法（昭和25年法律第226号）」、国土交通省「空家等対策の推進に関する特別措置法」
                </p>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                勧告の有無にかかわらず空き家を売ることになった場合の譲渡所得税・特例控除の使い分けは<Link href="https://www.r-sic.com/akiya/articles/akiya-sale-tax-guide" className="font-bold text-[#078c95] underline">空き家売却の税金ガイド（総合解説）</Link>が正本です。
              </p>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 増税額シミュレーター
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                土地の固定資産税評価額、敷地面積、建物の評価額を入力して、通常時・勧告後・更地時の固定資産税・都市計画税の負担額と差額を試算できます。
              </p>
              <TokuteiAkiyaTaxSimulator />
            </section>

            {/* セクション 3: 法改正と区分比較 */}
            <section id="law-reform" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 2023年（令和5年）法改正と3つの区分比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                2023年（令和5年）12月13日に施行された改正「空家等対策の推進に関する特別措置法（令和5年法律第50号）」により、従来の「特定空家等」に加え、その前段階である<strong>「管理不全空家等」</strong>が新設されました。
              </p>
              <TokuteiAkiyaComparisonTable />
              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477] shadow-sm">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  改正の趣旨と運用の実態（国土交通省推計 約50万戸）
                </h4>
                <p className="mt-2.5 leading-loose">
                  従前は「倒壊寸前の特定空家」に指定されない限り特例が解除されなかったため、危険寸前の状態で放置し続ける事例が全国で見られました。改正後は、庭木の越境や窓割れ等がある「管理不全空家」の段階で市区町村長が指導・勧告を行えるようになり、<strong>勧告を受けた時点で住宅用地特例が解除</strong>されます。国土交通省の試算では、全国で約50万戸以上の空き家が管理不全空家の対象候補と推計されています。
                </p>
                <p className="mt-2 text-[11px] text-[#708696]">
                  出典: 国土交通省 住宅局「令和5年改正空家法について」
                </p>
              </div>
            </section>

            {/* セクション 4: セルフチェック診断 */}
            <section id="check-flow" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 特定空家・管理不全空家の判定基準とセルフチェック
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                国土交通省が定めた「特定空家等及び管理不全空家等に関する参考指針」では、①保安上危険、②衛生上有害、③景観阻害、④周辺環境保全の4つの視点で客観的基準が示されています。
              </p>
              <TokuteiAkiyaCheckFlow />
            </section>

            {/* セクション 5: ロードマップ */}
            <section id="action-roadmap" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 自治体通知から行政代執行までのロードマップと回避策
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                自治体からの行政手続きは段階的に進行します。固定資産税の増税は「勧告」が下された場合に発生するため、手前の「指導・助言」の段階で是正措置を講じるか、賦課期日（1月1日）までに修繕・売却等の対応を完了させることが重要です。
              </p>
              <TokuteiAkiyaStepGuide />

              {/* 相続直後からの実践的アクションプラン */}
              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm shadow-sm space-y-4">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  勧告回避に向けた専門家の相談先選定基準
                </h4>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4">
                    <p className="font-bold text-[#078c95]">① 相続登記・権利関係の整理</p>
                    <p className="mt-1 text-[#506477] leading-relaxed">
                      <strong>相談先: 司法書士</strong><br />
                      2024年4月より相続登記が義務化されました。共有名義の整理や遺産分割協議を進め、管理・売却の権限者を一本化します。
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4">
                    <p className="font-bold text-[#078c95]">② 現状有姿売却・古家付き土地売却</p>
                    <p className="mt-1 text-[#506477] leading-relaxed">
                      <strong>相談先: 宅地建物取引業者（不動産仲介・買取）</strong><br />
                      解体費用をかけずに売却する場合、買主解体特約付き売買や不動産買取業者への現状引き渡しを検討します。
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4">
                    <p className="font-bold text-[#078c95]">③ 解体・更地化と補助金申請</p>
                    <p className="mt-1 text-[#506477] leading-relaxed">
                      <strong>相談先: 解体工事業者・自治体空家対策窓口</strong><br />
                      自治体の「老朽危険家屋解体撤去補助金（上限50万〜100万円程度）」の要件を確認し、除却計画を立てます。
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4">
                    <p className="font-bold text-[#078c95]">④ 境界確定・地積測量</p>
                    <p className="mt-1 text-[#506477] leading-relaxed">
                      <strong>相談先: 土地家屋調査士</strong><br />
                      隣地との境界標確認や確定測量を行い、売却時のトラブル防止および円滑な引渡しを図ります。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 6: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. よくある質問と実務解説
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                固定資産税の増税計算、管理不全空家と特定空家の実務上の違い、更地化の損得について整理しました。
              </p>
              <TokuteiAkiyaFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="tokutei-akiya-tax" />

      <AkiyaFooter />
    </div>
  );
}
