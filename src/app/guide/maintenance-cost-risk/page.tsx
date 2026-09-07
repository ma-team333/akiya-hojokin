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
import { MaintenanceCostSimulator } from "@/components/editorial/maintenance-cost-risk/MaintenanceCostSimulator";
import { ExitStrategyFlow } from "@/components/editorial/maintenance-cost-risk/ExitStrategyFlow";
import { MaintenanceStepGuide } from "@/components/editorial/maintenance-cost-risk/MaintenanceStepGuide";
import {
  MaintenanceFaqAccordion,
  MAINTENANCE_FAQ_ITEMS,
} from "@/components/editorial/maintenance-cost-risk/MaintenanceFaqAccordion";

export const metadata: Metadata = {
  title:
    "【2023年12月施行改正対応】空き家の管理費用と放置リスク｜年間費用シミュレーター・管理不全空き家の基準と3つの出口戦略",
  description:
    "空き家の年間管理費用（固定資産税・都市計画税・保険・維持費）の法定計算と、放置がもたらすリスク（住宅用地特例の解除による固定資産税最大6倍、民法717条の損害賠償、行政代執行）を法令・公的資料に基づき解説。費用シミュレーターと3大出口戦略（維持・活用・早期売却）の判断フロー付き。",
  alternates: {
    canonical: "/guide/maintenance-cost-risk",
  },
  openGraph: {
    title:
      "【2023年12月施行改正対応】空き家の管理費用と放置リスク｜年間費用シミュレーターと3つの出口戦略",
    description:
      "年間の税額・維持費の計算方法、管理不全空き家の判断基準と特例解除までの流れ、倒壊時の損害賠償責任まで、法令・公的資料に基づき整理します。",
    type: "article",
    publishedTime: "2026-08-15T00:00:00Z",
    modifiedTime: "2026-08-15T00:00:00Z",
  },
};

export default function MaintenanceCostRiskArticlePage() {
  const publishedDate = "2026-08-15";
  const canonicalUrl = `${SITE_URL}/guide/maintenance-cost-risk`;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家の管理費用と放置リスク",
      path: "/guide/maintenance-cost-risk",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【2023年12月施行改正対応】空き家の管理費用と放置リスク｜年間費用シミュレーター・管理不全空き家の基準と3つの出口戦略",
    description:
      "空き家の年間管理費用の法定計算と、放置による固定資産税の特例解除（最大6倍）・損害賠償責任・行政代執行のリスク、維持・活用・早期売却の出口戦略を解説。",
    datePublished: "2026-08-15T00:00:00Z",
    dateModified: "2026-08-15T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/maintenance-cost-risk`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(MAINTENANCE_FAQ_ITEMS);

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
                管理・維持
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">管理費用と放置リスク</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                管理・維持
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                2023年12月施行 改正空家法対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月15日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【2023年12月施行改正対応】空き家の管理費用と放置リスク｜年間費用シミュレーター・管理不全空き家の基準と3つの出口戦略
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              空き家の年間の管理費用は「法定の税金（固定資産税・都市計画税）」と「契約・行動に基づく費用（保険・修繕・巡回管理・交通費）」で構成されます。一方、管理を怠った空き家は、2023年12月13日全面施行の改正空家特措法で新設された「管理不全空き家」の指導・勧告を経て住宅用地の課税標準特例が解除され、土地分の固定資産税が最大6倍になります。本記事では、法令に基づく税額計算、放置リスクの法的根拠、そして「維持・活用・早期売却」の3大出口戦略の判断フローを整理します。
            </p>

            {/* 正準衝突解消（SOB-672 Row2・SOB-576 step-1 方式）: この記事=放置リスク・法定解説（media）。「あと何年持つかで総保有コストを積み上げ管理・委託・売却を比べる」は判断ページが単一オーナー */}
            <div className="mt-4 rounded-xl border border-[#078c95]/30 bg-[#e6f4f5]/60 p-4 text-sm">
              <p className="font-bold text-[#14243a]">管理費用は「月々」でなく「あと何年持つか」の総額で比べる</p>
              <p className="mt-1 text-[#334155]">この記事は管理費用の計算方法と放置リスクの法定解説です。あなたの数字（見積書・納税通知書）で1年・3年・5年の総保有コストを積み上げ、自分で管理・管理会社への委託・売却を比べるのは専用の判断ページです。</p>
              <Link
                href="https://www.r-sic.com/akiya/akiya-management-service/"
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]"
              >
                総保有コストを積み上げる判断ページへ進む →
              </Link>
            </div>
          </div>
        </header>

        {/* 記事本文 */}
        <div className="mx-auto max-w-[960px] px-6 py-12 md:px-10 md:py-20">
          {/* 目次 */}
          <div className="mb-14 rounded-2xl border border-[#dfe9ee] bg-white p-7 shadow-[0_4px_24px_rgba(20,36,58,0.04)] sm:mb-16 sm:p-9">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#078c95]">
              <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
              TABLE OF CONTENTS
            </p>
            <h2 className="mt-2 text-lg font-black text-[#14243a]">本記事の目次</h2>
            <ol className="mt-5 grid gap-3.5 text-xs font-bold text-[#14243a] sm:grid-cols-2 md:text-sm">
              <li>
                <a href="#overview" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">1.</span> 管理費用と放置リスクの全体像
                </a>
              </li>
              <li>
                <a href="#simulator" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">2.</span> 年間維持費用シミュレーター
                </a>
              </li>
              <li>
                <a href="#risk-law" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">3.</span> 放置リスクの法的根拠
                </a>
              </li>
              <li>
                <a href="#revised-law" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">4.</span> 改正空家法の「管理不全空き家」
                </a>
              </li>
              <li>
                <a href="#manage-compare" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">5.</span> 自己管理と巡回管理代行の比較
                </a>
              </li>
              <li>
                <a href="#exit-flow" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">6.</span> 3大出口戦略の判断フロー
                </a>
              </li>
              <li>
                <a href="#steps" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">7.</span> 管理から処分までの手順
                </a>
              </li>
              <li>
                <a href="#faq" className="flex items-center gap-2 hover:text-[#078c95]">
                  <span className="text-[#078c95]">8.</span> よくある質問
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 leading-relaxed text-[#14243a] sm:space-y-20">
            {/* セクション 1 */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                1. 空き家の管理費用と放置リスクの全体像
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家を保有し続ける間に発生する費用のうち、税金は法律で計算方法が定められています。固定資産税は固定資産税評価額に<strong>標準税率1.4%</strong>（地方税法第350条第1項）、市街化区域内の土地には<strong>上限0.3%</strong>の都市計画税が上乗せされます。一戸建ての土地のうち200㎡までの部分（小規模住宅用地）は課税標準が固定資産税で<strong>1/6</strong>、都市計画税で<strong>1/3</strong>に軽減されています（地方税法第349条の3の2・同法附則第15条）。
              </p>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                一方、この軽減特例は<strong>「適切な管理が行われていない空き家」に対しては外れる</strong>仕組みに変わりました。2023年（令和5年）12月13日に全面施行された「空家等対策の推進に関する特別措置法及び地方税法の一部を改正する法律」（令和5年法律第50号）により、管理不全空き家への指導・勧告を受けた土地は、<strong>その日以後最初に訪れる4月1日から特例の適用対象から除外</strong>されます（地方税法附則第15条）。土地分の課税標準が1/6から1に戻るため、固定資産税（土地分）は最大6倍・都市計画税は最大3倍です。
              </p>
              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 text-sm sm:p-8 md:text-base">
                <p className="text-base font-bold text-[#0a7079] sm:text-lg">放置がもたらす3つのリスク</p>
                <ul className="mt-3 space-y-2.5 leading-loose text-[#14243a]">
                  <li>
                    <strong>① 税負担の増加</strong>：管理不全空き家・特定空き家への指導・勧告 → 住宅用地特例の適用除外（土地分の固定資産税 最大6倍／都市計画税 最大3倍）
                  </li>
                  <li>
                    <strong>② 損害賠償責任</strong>：建物の倒壊・部材の飛散で他人に損害を与えた場合の賠償責任（民法第717条）
                  </li>
                  <li>
                    <strong>③ 行政措置</strong>：特定空き家への命令違反で50万円以下の過料、さらに市町村による行政代執行（解体等）とその費用の徴収（空家等対策の推進に関する特別措置法）
                  </li>
                </ul>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                建物の老朽度の目安になるのが、国税庁が定める税務上の<strong>法定耐用年数</strong>（「減価償却資産の耐用年数等に関する省令」）です。木造は22年、鉄骨造は骨格材の肉厚に応じて19〜34年、鉄筋コンクリート造は47年とされており、耐用年数を大きく超えた木造の空き家ほど屋根・外壁・水回りの劣化が進み、修繕と巡回の頻度を上げる必要があります。
              </p>
              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white p-2 sm:p-4">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#14243a]">
                      <th className="p-3 font-bold text-[#14243a]">建物の構造</th>
                      <th className="p-3 font-bold text-[#14243a]">法定耐用年数（税務上）</th>
                      <th className="p-3 font-bold text-[#14243a]">空き家管理上の意味</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee]">
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">木造（木・合成樹脂造）</td>
                      <td className="p-3 font-black text-[#e56f2d]">22年</td>
                      <td className="p-3 text-[#506477]">日本の空き家で最も多い構造。屋根・外壁の劣化が早い</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">鉄骨造（肉厚3mm以下）</td>
                      <td className="p-3 font-black text-[#14243a]">19年</td>
                      <td className="p-3 text-[#506477]">サビ・結露の発生に注意</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">鉄骨造（肉厚3mm超4mm以下）</td>
                      <td className="p-3 font-black text-[#14243a]">28年</td>
                      <td className="p-3 text-[#506477]">同じ鉄骨でも肉厚で年数が変わる</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">鉄骨造（肉厚4mm超）</td>
                      <td className="p-3 font-black text-[#14243a]">34年</td>
                      <td className="p-3 text-[#506477]">—</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">鉄筋コンクリート造</td>
                      <td className="p-3 font-black text-[#14243a]">47年</td>
                      <td className="p-3 text-[#506477]">—</td>
                    </tr>
                  </tbody>
                </table>
                <p className="p-3 text-[10px] leading-relaxed text-[#708696]">
                  出典: 国税庁「減価償却資産の耐用年数等に関する省令」（所得税の減価償却用。実際の建物寿命とは異なる目安です）
                </p>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                2. 年間維持費用シミュレーター（計算過程つき）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                納税通知書に記載された評価額と、ご自身の保険料・維持費・委託費・交通費を入力すると、住宅用地特例の適用有無ごとの年間税額と総費用を法定の計算式どおりに表示します。
              </p>
              <MaintenanceCostSimulator />
            </section>

            {/* セクション 3: 放置リスクの法的根拠 */}
            <section id="risk-law" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                3. 放置リスクの法的根拠 — 賠償・過料・行政代執行
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家の放置は、税負担の増加だけでなく民事・行政上の責任につながります。いずれも法律の条文に根拠があるリスクです。
              </p>

              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-6 text-sm leading-8 text-[#14243a] sm:p-8">
                <h3 className="text-base font-black text-[#e56f2d]">リスク① 倒壊・飛散による損害賠償（民法第717条）</h3>
                <p className="mt-2 text-[#506477]">
                  民法第717条は「土地の工作物の設置又は保存に瑕疵があることによって他人に損害を生じたときは、工作物の占有者は、その損害を賠償する責任を負う」と定め、占有者が損害の防止に必要な注意をしたときは所有者が責任を負うと続けます。空き家の建物も「土地の工作物」に該当すると解されているため、台風等で屋根材・外壁・塀が倒壊・飛散して隣家や通行人に損害を与えた場合、所有者に賠償責任が及ぶ可能性があります。定期点検と記録は、管理状況を示す資料として機能します。
                </p>
              </div>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 text-sm leading-8 text-[#14243a] shadow-sm sm:p-8">
                <h3 className="text-base font-black text-[#14243a]">リスク② 過料（50万円以下）と行政代執行</h3>
                <p className="mt-2 text-[#506477]">
                  空家等対策の推進に関する特別措置法（平成26年法律第127号）では、市町村長が特定空き家の所有者に対して勧告し、従わない場合に「命令」を出し、命令に違反した者には<strong>50万円以下の過料</strong>に処すると定めています。さらに市町村は行政代執行（解体等の代施行）を行い、<strong>その費用を所有者から徴収</strong>できます。所有者が遠方で状態を把握していなくても、これらの措置は進められます。
                </p>
              </div>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 text-sm leading-8 text-[#14243a] shadow-sm sm:p-8">
                <h3 className="text-base font-black text-[#14243a]">リスク③ 税負担の増加（住宅用地特例の適用除外）</h3>
                <p className="mt-2 text-[#506477]">
                  管理不全空き家・特定空き家への指導・勧告を受けた土地は、<strong>その日以後最初に訪れる4月1日から</strong>住宅用地の課税標準特例の適用対象から除外されます（地方税法附則第15条）。課税標準が1/6から1に戻るため、土地分の固定資産税は最大6倍です。措置の流れは次節のとおりです。勧告の要件と増税シミュレーションの詳細は、<Link href="/guide/tokutei-akiya-tax" className="font-bold text-[#078c95] underline hover:text-[#05676e]">特定空家・管理不全空家の固定資産税（制度の正本）</Link>で解説しています。
                </p>
              </div>
            </section>

            {/* セクション 4: 改正空家法 */}
            <section id="revised-law" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                4. 改正空家法の「管理不全空き家」 — 判断基準と通知・措置の流れ
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                改正法（令和5年法律第50号、2023年12月13日全面施行）は、「専ら住宅として利用されていた建物で適切な管理が行われていないもの（そのまま放置すれば特定空き家になりかねないもの）」を<strong>管理不全空き家</strong>として新設しました。倒壊寸前に限らず、次のような状態が国土交通省・総務省令の判断基準に該当すると、市町村の措置の対象になり得ます。
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "屋根または外壁の破損・劣化により、雨水が建物内に浸入するおそれがある",
                  "窓ガラス等の破損・落下のおそれがある",
                  "門柱・塀等が傾いている等により倒壊・落下のおそれがある",
                  "雑草・樹木等が繁茂し、隣地等へ越境するおそれがある",
                  "屋根に瓦等の資材が積載された状態で、落下のおそれがある",
                  "ごみ等が集積・放置され、衛生上の支障・悪臭等がある",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4 text-xs leading-relaxed text-[#14243a] sm:text-[13px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-[11px] font-black text-white">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-[#708696]">
                出典: 空家等対策の推進に関する特別措置法の改正に伴う国土交通省・総務省令（管理不全空き家の判断基準）、国土交通省「空家等対策の推進に関する特別措置法及び地方税法の一部を改正する法律の概要」
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white p-2 sm:p-4">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#14243a]">
                      <th className="p-3 font-bold text-[#14243a]">段階</th>
                      <th className="p-3 font-bold text-[#14243a]">対象</th>
                      <th className="p-3 font-bold text-[#14243a]">措置の内容</th>
                      <th className="p-3 font-bold text-[#14243a]">税・不利益</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee]">
                    <tr>
                      <td className="p-3 font-bold text-[#078c95]">助言</td>
                      <td className="p-3 text-[#506477]">管理不全空き家等</td>
                      <td className="p-3 text-[#506477]">適切な管理の必要性に関する情報提供・助言</td>
                      <td className="p-3 text-[#506477]">—</td>
                    </tr>
                    <tr className="bg-[#fff9f5]/40">
                      <td className="p-3 font-bold text-[#e56f2d]">指導・勧告</td>
                      <td className="p-3 text-[#506477]">管理不全空き家・特定空き家</td>
                      <td className="p-3 text-[#506477]">是正に向けた指導・期限つきの勧告</td>
                      <td className="p-3 font-bold text-[#e56f2d]">受けた日以後最初の4月1日から住宅用地特例の適用対象外（土地分の固定資産税 最大6倍）</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#d9483b]">命令</td>
                      <td className="p-3 text-[#506477]">特定空き家（勧告に従わない場合等）</td>
                      <td className="p-3 text-[#506477]">措置（修繕・解体等）の命令</td>
                      <td className="p-3 font-bold text-[#d9483b]">違反で50万円以下の過料</td>
                    </tr>
                    <tr className="bg-rose-50/40">
                      <td className="p-3 font-bold text-[#d9483b]">行政代執行</td>
                      <td className="p-3 text-[#506477]">命令に従わない場合</td>
                      <td className="p-3 text-[#506477]">市町村による解体等の代執行</td>
                      <td className="p-3 font-bold text-[#d9483b]">代執行に要した費用の所有者への徴収</td>
                    </tr>
                  </tbody>
                </table>
                <p className="p-3 text-[10px] leading-relaxed text-[#708696]">
                  出典: 空家等対策の推進に関する特別措置法（平成26年法律第127号）・同法改正（令和5年法律第50号）、地方税法附則第15条
                </p>
              </div>
            </section>

            {/* セクション 5: 自己管理 vs 代行 */}
            <section id="manage-compare" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                5. 自己管理と巡回管理代行の比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                管理費用の内訳は「誰が巡回・清掃・記録を担うか」で変わります。遠方の空き家では通う交通費と時間が自己管理のコアなコストで、巡回管理サービスの委託費と比較することになります。どちらの方法でも、管理不全空き家の判断基準に該当する状態を解消することが特例維持の条件です。
              </p>
              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white p-2 sm:p-4">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#14243a]">
                      <th className="p-3 font-bold text-[#14243a]">項目</th>
                      <th className="p-3 font-bold text-[#078c95]">自己管理（本人・家族）</th>
                      <th className="p-3 font-bold text-[#e56f2d]">巡回管理代行（民間サービス）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee]">
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">主な作業</td>
                      <td className="p-3 text-[#506477]">本人・家族が現地へ赴き、換気・通水・清掃・除草を実施</td>
                      <td className="p-3 text-[#506477]">事業者が定期巡回し、換気・通水・清掃等と報告書作成を実施</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">費用の構造</td>
                      <td className="p-3 text-[#506477]">交通費・作業時間・資材費（実費）</td>
                      <td className="p-3 text-[#506477]">契約した委託費（巡回頻度・作業内容により契約で決定）</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">頻度の設定</td>
                      <td className="p-3 text-[#506477]">自由（遠方では物理的な制約）</td>
                      <td className="p-3 text-[#506477]">契約で設定（月1回程度の定期巡回が一般的な契約例）</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">記録</td>
                      <td className="p-3 text-[#506477]">自身で日付・写真つきの記録を作成</td>
                      <td className="p-3 text-[#506477]">写真等つきの報告書を契約分受領</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#14243a]">税（共通）</td>
                      <td colSpan={2} className="p-3 text-[#506477]">
                        固定資産税・都市計画税・保険料は管理方法に関係なく発生。適切な管理が行われていれば住宅用地特例（課税標準1/6・1/3）が維持される
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* セクション 6: 出口戦略 */}
            <section id="exit-flow" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                6. 3大出口戦略（維持・活用・早期売却）の判断フロー
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家の出口は「①維持・適正管理」「②賃貸等の活用」「③早期売却・処分」の3つに整理できます。3つの質問に答えると、状況に該当する出口と関連する制度・法令が表示されます。
              </p>
              <ExitStrategyFlow />
            </section>

            {/* セクション 7: 手順ガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                7. 管理から処分までの手順（補助金・国庫帰属を含む）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                現状の記録から、市町村の制度確認、管理方法の決定、出口の決定までを5ステップで進めます。自治体の除却補助金の申請フローもあわせて整理しました。
              </p>
              <MaintenanceStepGuide />
            </section>

            {/* セクション 8: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black leading-snug text-[#14243a] sm:text-3xl">
                8. よくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                年間費用の算出方法、改正空家法の管理不全空き家、特例解除のタイミング、倒壊時の賠償責任、更地化と国庫帰属制度まで、よく寄せられる質問に回答します。
              </p>
              <MaintenanceFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="maintenance-cost-risk" />

      <AkiyaFooter />
    </div>
  );
}
