import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GuideSources } from "@/components/guide/GuideSources";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { LeasebackSimulator } from "@/components/editorial/leaseback/LeasebackSimulator";
import { LeasebackRequirementFlow } from "@/components/editorial/leaseback/LeasebackRequirementFlow";
import { LeasebackStepGuide } from "@/components/editorial/leaseback/LeasebackStepGuide";
import { LeasebackFaqAccordion } from "@/components/editorial/leaseback/LeasebackFaqAccordion";
import { LEASEBACK_FAQ_ITEMS } from "@/components/editorial/leaseback/article-data";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";

export const metadata: Metadata = {
  title:
    "【リースバックガイド】自宅を売却して住み続ける方法と家賃相場の考え方：契約条件・税金・注意点まで",
  description:
    "リースバック（自宅を売却して賃貸として住み続ける）の仕組みから、家賃の決まり方と公的な家賃相場、定期借家契約と住み続けられる期間、買戻し特約、譲渡所得税（国税庁No.3208/3258）、3,000万円特別控除の適用可否、令和8年10月施行の国交省ガイドラインまで公的資料に基づき解説します。",
  alternates: {
    canonical: "/guide/leaseback",
  },
  openGraph: {
    title:
      "【リースバックガイド】自宅を売却して住み続ける？家賃相場の考え方と契約・税務の注意点",
    description:
      "国交省ガイドブック（令和4年6月公表）と国民生活センターの注意喚起（2025年5月21日公表）を根拠に、リースバックの家賃相場・契約期間・買戻し・税務を実務の比較軸で整理します。売却代金と総家賃の収支シミュレーター付き。",
    type: "article",
    publishedTime: "2026-08-17T00:00:00Z",
    modifiedTime: "2026-08-17T00:00:00Z",
  },
};

export default function LeasebackArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "リースバックガイド",
      path: "/guide/leaseback",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【リースバックガイド】自宅を売却して住み続ける方法と家賃相場の考え方：契約条件・税金・注意点まで",
    description:
      "リースバック（自宅を売却して賃貸として住み続ける）の仕組み、家賃の決まり方と公的な家賃相場、定期借家契約と住み続けられる期間、買戻し特約、譲渡所得税、3,000万円特別控除の適用可否、令和8年10月施行の国交省ガイドラインを公的資料に基づき解説。",
    datePublished: "2026-08-17T00:00:00Z",
    dateModified: "2026-08-17T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/leaseback`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(LEASEBACK_FAQ_ITEMS);

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
              <span className="text-[#14243a]">リースバックガイド</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                収支シミュレーター付き
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月17日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【リースバックガイド】自宅を売却して住み続ける方法と家賃相場の考え方：契約条件・税金・注意点まで
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              リースバックとは「住宅を売却して現金を得て、売却後は毎月賃料を支払うことで、住んでいた住宅に引き続き住むサービス」（国土交通省「住宅のリースバックに関するガイドブック」令和4年6月24日公表）です。本記事では、家賃の決まり方と公的な家賃相場の参考値、定期借家契約と住み続けられる期間、買戻し特約、譲渡所得税と3,000万円特別控除の適用可否、令和8年10月1日施行の国交省ガイドラインの告知事項まで、公的資料に基づいて整理します。
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
                  <span className="text-[#078c95]">1.</span> リースバックの仕組みと実態
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 収支シミュレーター
                </a>
              </li>
              <li>
                <a href="#rent" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 家賃相場の考え方
                </a>
              </li>
              <li>
                <a href="#contract" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 契約形態と住み続ける期間
                </a>
              </li>
              <li>
                <a href="#tax" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 税金（譲渡所得税・控除）
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 契約前チェック診断
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> 進め方ステップ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">8.</span> よくある質問
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 仕組み */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. リースバックの仕組み：所有権は移り、住まいは賃貸になる
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                リースバックは、国土交通省が「住宅を売却して現金を得て、売却後は毎月賃料を支払うことで、住んでいた住宅に引き続き住むサービス」と定義する取引です（「住宅のリースバックに関するガイドブック」令和4年6月24日公表）。自宅を事業者へ売却して所有権を移転する<strong>売買契約</strong>と、そのまま住み続けるための<strong>賃貸借契約</strong>を同時に結びます。現金化できる一方で、家は自分のものではなくなり、修繕や固定資産税等の負担区分は契約条件に従います。
              </p>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                同ガイドブックは、契約内容や将来の収支計画について消費者の理解が不十分なまま契約したことを理由とするトラブル事例が見られると指摘しています。国民生活センターも2025年5月21日に「強引に勧められる住宅のリースバック契約にご注意!」を公表し、PIO-NETへの相談が2019年度24件から2024年度239件へ増加した実態を報告しました。
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">手元に入るもの</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    売却代金（現金）。住宅ローンが残っていれば完済に充当し、残りが手元に残ります。ただし譲渡所得税の申告・納付があります（国税庁No.3208〔令和7年4月1日現在法令等〕）。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">手元から出ていくもの</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    毎月の家賃（賃料）。家賃は「修繕費等を含め、貸主が負担する様々な費用も踏まえて設定」されます（ガイドブック）。退去時には原状回復費用が発生する場合があります。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">失うもの（所有権に紐づく権利）</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    固定資産税等の直接の納税義務（契約条件によっては不要・ガイドブック）、住宅ローン控除の適用（売却で要件を満たさなくなる・国税庁No.1211-1）、将来的な売却・活用の選択肢。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#d9483b]">保証されないもの</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    「ずっと住み続けられること」と「買い戻せること」。定期借家契約なら期間満了で契約が終了し、買戻しは「当然の権利」ではありません（ガイドブック）。
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-6 sm:p-8 text-xs sm:text-sm text-[#506477]">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">⚠ 国民生活センターが報告するトラブルの実態（2025年5月21日公表）</h4>
                <ul className="mt-3 space-y-2 leading-loose list-disc list-inside">
                  <li>PIO-NETへの相談件数は2019年度24件→2020年度56件→2021年度85件→2022年度129件→2023年度234件→2024年度239件と増加。</li>
                  <li>契約当事者の約7割が70歳以上（n=220: 70歳代26.8%・80歳代41.4%・90歳以上5.9%）。</li>
                  <li>事例: 売却1,200万円・10時〜22時の勧誘・違約金50万円／売却3,000万円・家賃25万円・違約金600万円／家賃約6万円が3年後に約11万円へ値上げ／相場より安い400万円での売却（認知症の父）。</li>
                  <li>消費者が宅建業者へ自宅を売却する場合、宅建業法のクーリング・オフは適用されません（ガイドブック・国民生活センター）。</li>
                </ul>
                <p className="mt-3 leading-loose">
                  迷ったら消費者ホットライン「188」（消費生活センター）。国交省のガイドラインでも、リースバックの相談件数は令和4年度116件→令和5年度227件→令和6年度242件→令和7年度214件と報告されています（令和8年7月策定・令和8年10月1日施行）。
                </p>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. リースバック収支シミュレーター：「売却で受け取る金額」と「賃料として支払う金額」を比べる
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                国交省ガイドブックは、リースバックを検討する際の確認ポイントとして「『売却で受け取る金額』と、『数年かけて賃料として支払う金額』、どちらが高いか自分で計算して比較」することを挙げています。本シミュレーターは、売却価格・月額家賃・住み続ける年数から総家賃支払額と長期譲渡所得税の概算（国税庁No.3208〔令和7年4月1日現在法令等〕・取得費5%概算はNo.3258〔令和7年4月1日現在法令等〕）を自動計算します。
              </p>
              <LeasebackSimulator />
              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-xs sm:text-sm text-[#506477]">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">国交省ガイドブックの計算例（CASE2）</h4>
                <p className="mt-2.5 leading-loose">
                  ガイドブックの事例では、住宅を約2,000万円で売却して家賃約20万円で10年間住み続けると、支払う賃料の合計は約2,400万円となり、売却で受け取った金額を上回る計算になります。同書はこうした計算を「自分で行って比較する」ことを消費者に求めています。
                </p>
              </div>
            </section>

            {/* セクション 3: 家賃相場 */}
            <section id="rent" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 家賃（賃料）相場の考え方：家賃はどう決まり、何と比べるか
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                リースバックの家賃には、法律で定められた統一の相場はありません。ガイドブックは「家賃は上記の修繕費等を含め、貸主が負担する様々な費用も踏まえて設定されており」（令和4年6月公表）、事業者ごとに設定が異なることを前提に、<strong>複数の事業者と比較して確認する</strong>ことを求めています。比較の物差しとして使える公的な統計と、ガイドブックの事例を整理します。
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-left text-[#14243a]">
                      <th className="p-3 sm:p-4 font-black">公的な家賃の参考値</th>
                      <th className="p-3 sm:p-4 font-black">金額（月額・平均）</th>
                      <th className="p-3 sm:p-4 font-black">出典</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">借家（専用住宅）全体</td>
                      <td className="p-3 sm:p-4">59,656円（2018年比 +7.1%）</td>
                      <td className="p-3 sm:p-4">総務省統計局「令和5年住宅・土地統計調査 住宅及び世帯に関する基本集計（確報集計）」（令和6年9月25日公表）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">公営住宅</td>
                      <td className="p-3 sm:p-4">24,961円</td>
                      <td className="p-3 sm:p-4">同上</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">UR都市機構・公社の賃貸住宅</td>
                      <td className="p-3 sm:p-4">71,831円</td>
                      <td className="p-3 sm:p-4">同上</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">民営借家（木造）</td>
                      <td className="p-3 sm:p-4">54,409円</td>
                      <td className="p-3 sm:p-4">同上</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">民営借家（非木造）</td>
                      <td className="p-3 sm:p-4">68,548円</td>
                      <td className="p-3 sm:p-4">同上</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">ガイドブックの事例（CASE2）</td>
                      <td className="p-3 sm:p-4">約20万円（売却約2,000万円・10年居住の例）</td>
                      <td className="p-3 sm:p-4">国交省「住宅のリースバックに関するガイドブック」（令和4年6月24日公表）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">ガイドブックの事例（CASE3）</td>
                      <td className="p-3 sm:p-4">約15万円（市場価格1億2,000万円相当の住宅を700万円で売却した例）</td>
                      <td className="p-3 sm:p-4">同上</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm leading-8 text-[#506477] md:text-base">
                提示された家賃を検討するときは、（1）周辺の公的な賃料統計（上表）と比べる、（2）家賃の算定根拠を事業者に確認する、（3）「売却代金が賃料何か月分に相当するか」で売買価格と家賃のバランスを見る――の3点が公的に示された比較軸です。令和8年10月1日施行の国交省「リースバックに関するガイドライン」は、事業者に対して「売買価額及び借賃の額の算定根拠に関する事項の説明」や「借賃の額、その他借主が負担することとされた代金と売却により相手方等が受領する代金との関係に関する説明（例: 売却代金が賃料等の何か月分に相当するか等）」が可能な範囲での対応として望ましいとしています。
              </p>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                また、家賃は固定とは限りません。国民生活センターの事例には、家賃約6万円が3年後に約11万円へ改定された例があります（2025年5月21日公表）。賃貸借契約の家賃改定条項・更新時の扱いも、契約前の確認事項です。
              </p>
            </section>

            {/* セクション 4: 契約形態 */}
            <section id="contract" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 契約形態と住み続けられる期間：定期借家契約と普通借家契約
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                リースバックで住み続けられるかどうかは、結ぶ賃貸借契約の形態と条件によります。ガイドブック（令和4年6月公表）は、例えば<strong>「定期借家契約」</strong>の場合「契約で定めた期間の満了により契約が終了」し、貸主と借主の双方が合意した場合は「再契約」で居住を継続できるが、「貸主が再契約を拒んだ場合は退去する必要がある」と説明しています。
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-left text-[#14243a]">
                      <th className="p-3 sm:p-4 font-black">項目</th>
                      <th className="p-3 sm:p-4 font-black">定期借家契約</th>
                      <th className="p-3 sm:p-4 font-black">普通借家契約</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">根拠規定</td>
                      <td className="p-3 sm:p-4">借地借家法第38条第1項（更新がないこととする旨の定め）</td>
                      <td className="p-3 sm:p-4">借地借家法第26条（更新のみなし）・第28条（正当の事由）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">期間満了時</td>
                      <td className="p-3 sm:p-4">契約で定めた期間の満了により契約が終了。再契約は双方の合意が必要（国交省ガイドブック）</td>
                      <td className="p-3 sm:p-4">更新拒絶・解約申入れには「建物の賃貸人及び賃借人が建物の使用を必要とする事情」等を考慮した正当の事由が必要（同法第28条）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">契約上のルール</td>
                      <td className="p-3 sm:p-4">公正証書による等書面による契約・あらかじめ書面を交付しての説明が必要（同法第38条第1項・第3項）。説明がない場合は「更新なし」の定めが無効（同条第5項）。期間1年以上なら満了の1年前から6か月前までの通知が必要（同条第6項）</td>
                      <td className="p-3 sm:p-4">期間の定めがあっても更新がみなされる場合がある（同法第26条）。借主に不利な特約は無効（同法第30条）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">リースバックでの位置づけ</td>
                      <td className="p-3 sm:p-4">ガイドブックの特徴として「定期借家契約の場合、契約で定めた期間の満了により契約が終了」と紹介。令和8年10月1日施行のガイドラインは「借地借家法第38条第1項…の規定の適用を受ける」旨を告知事項に挙げる</td>
                      <td className="p-3 sm:p-4">賃貸借の更新の可否・条件は告知事項（ガイドライン）。「ずっと住み続けられる」は契約上の保証ではない</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm leading-8 text-[#506477] md:text-base">
                買戻し（再売買）も契約条件次第です。ガイドブックは「契約条件次第では…買い戻せることもありますが、買い戻せる条件や買戻し価格によっては買い戻せない可能性」があるとし、「買戻しは『当然の権利』ではありません。『いつまでに』『いくらで』買い戻せる条件なのか等、契約前に確認」することを確認ポイントとしています。令和8年10月1日施行のガイドラインは「買戻し特約の有無及びその内容」を事実の告知事項として挙げています。
              </p>
            </section>

            {/* セクション 5: 税務 */}
            <section id="tax" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. リースバックの税金：譲渡所得税・3,000万円特別控除・住宅ローン控除
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                リースバックで自宅を売ることは税務上の「譲渡」であり、譲渡所得税の確定申告が必要です。一方で、マイホームを売るときの代表的な優遇である3,000万円特別控除と住宅ローン控除の扱いは、リースバックでは確認が要ります。
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-left text-[#14243a]">
                      <th className="p-3 sm:p-4 font-black">税目</th>
                      <th className="p-3 sm:p-4 font-black">リースバックでの扱い</th>
                      <th className="p-3 sm:p-4 font-black">出典</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">譲渡所得税（長期譲渡所得）</td>
                      <td className="p-3 sm:p-4">
                        譲渡年の1月1日で所有期間5年超なら、税額＝課税長期譲渡所得金額×15%（住民税5%）＋復興特別所得税（所得税額の2.1%）。課税長期譲渡所得金額＝譲渡価額−（取得費＋譲渡費用）−特別控除額。取得費が不明なら譲渡価額の5%概算が可能
                      </td>
                      <td className="p-3 sm:p-4">国税庁No.3208・No.3258〔令和7年4月1日現在法令等〕</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">居住用財産の3,000万円特別控除</td>
                      <td className="p-3 sm:p-4">
                        要件に「特別の関係がある人（生計を一にする親族、家屋を売った後その家屋で同居する親族、内縁関係にある人、特殊な関係のある法人等）に対して売ったものでないこと」がある。リースバック事業者への譲渡が該当するかは個別の事実関係による判定で、国税庁はリースバック固有の取扱いを明示していないため、申告前に税務署・税理士等への確認が必要
                      </td>
                      <td className="p-3 sm:p-4">国税庁No.3302〔令和7年4月1日現在法令等〕（措法35条・措令20条の3）</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-[#14243a]">住宅借入金等特別控除（住宅ローン控除）</td>
                      <td className="p-3 sm:p-4">
                        控除の基礎は「住宅ローン等の年末残高」で、要件に「特別控除を受ける年分の12月31日まで引き続き居住の用に供していること」がある。リースバックで売却して所有者でなくなればこの家についての適用要件を満たさず、賃料は住宅ローン等の「借入金・債務」ではない
                      </td>
                      <td className="p-3 sm:p-4">国税庁No.1210・No.1211-1〔令和7年4月1日現在法令等〕</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-xs sm:text-sm text-[#506477]">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">実務上の確認ポイント</h4>
                <ul className="mt-3 space-y-2 leading-loose list-disc list-inside">
                  <li>譲渡所得税は<strong>確定申告</strong>が必要です（翌年2月16日〜3月15日に申告）。所有期間5年以下の短期譲渡所得は税率が異なるため、譲渡年の1月1日時点の所有期間を先に確認します。</li>
                  <li>3,000万円特別控除について「リースバックなら必ず使える／使えない」という公的な明文規定はありません。適用可否は<strong>税務署・税理士等への事前確認</strong>が実務の分かれ目です。</li>
                  <li>住宅ローン控除を受けていた年の中で売却する場合、その年の適用の有無・計算は税務署に確認します。</li>
                  <li>住宅ローンが残っている場合は、売却代金での完済が前提です（抵当権・民法第369条）。不足が見込まれる場合はオーバーローン売却など別の方法の検討対象になります（<Link href="/guide" className="text-[#078c95] font-bold underline underline-offset-2">「売る・手放す」の記事一覧</Link>参照）。</li>
                </ul>
              </div>
            </section>

            {/* セクション 6: 前提チェック */}
            <section id="requirements" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. リースバック契約前の前提チェック（価格・家賃・期間・買戻し・負担・違約金）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                契約相談の前に整理しておきたい6項目をセルフチェックできます。「いいえ」の項目には対処の方向性を表示します。
              </p>
              <LeasebackRequirementFlow />
            </section>

            {/* セクション 7: 手順ガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. リースバックを検討する5ステップ
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                公的ガイドブックの読み込みから、複数事業者の比較、契約条件の書面確認、締結、税務申告・家賃支払計画までの流れを整理しました。
              </p>
              <LeasebackStepGuide />
            </section>

            {/* セクション 8: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                8. リースバック よくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                家賃の決まり方と相場、住み続けられる期間、買戻し、譲渡所得税、住宅ローン控除、固定資産税・修繕費の負担、トラブルと相談先について回答します。
              </p>
              <LeasebackFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="leaseback" />

      <AkiyaFooter />
    </div>
  );
}
