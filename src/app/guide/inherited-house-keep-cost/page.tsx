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
  StepGuide,
  InheritedHouseKeepCostFaqAccordion,
  RoutineCostTable,
  TaxExemptionComparisonTable,
  LongTermHoldComparisonTable,
  INHERITED_HOUSE_KEEP_COST_FAQ_ITEMS,
  SENTIMENT_ROADMAP_STAGES,
  BURDEN_ADJUSTMENT_YEARS,
  RENTAL_CONVERSION_SCENARIOS,
  KOKKO_EXIT_STEPS,
} from "@/components/editorial/inherited-house-keep-cost";

export const metadata: Metadata = {
  title:
    "【相続した家を売らない選択】年間の維持費・固定資産税の内訳と放置リスク｜管理ルーティン・特例解除シミュレーター",
  description:
    "相続した実家を「売らない」と決めた場合にかかる固定資産税・都市計画税・火災保険・管理費（年数十万円）の実費内訳を可視化。月1回の通風・通水や草刈り外注ルーティン、特定空家・管理不全空家勧告による住宅用地特例解除（税額増）シミュレーション、3000万円特別控除の期限（3年リミット）を考慮した保有判断基準を客観的に解説。",
  alternates: {
    canonical: "/guide/inherited-house-keep-cost",
  },
  openGraph: {
    title:
      "【相続した家を売らない選択】年間の維持費・固定資産税の内訳と放置リスク｜管理ルーティン・特例解除シミュレーター",
    description:
      "実家を売らずに維持する際の実費内訳（税金・保険・管理費）、必須管理作業、住宅用地特例解除による税負担増リスク、3000万円特別控除の期限リミットを網羅解説。",
    type: "article",
    publishedTime: "2026-08-17T00:00:00Z",
    modifiedTime: "2026-09-04T00:00:00Z",
  },
};

export default function InheritedHouseKeepCostArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "相続した家を売らない場合の維持費・固定資産税",
      path: "/guide/inherited-house-keep-cost",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【相続した家を売らない選択】年間の維持費・固定資産税の内訳と放置リスク｜管理ルーティン・特例解除シミュレーター",
    description:
      "相続した実家を売らない場合に発生する年間維持費（税金・保険・管理費）、管理ルーティン、住宅用地特例解除による固定資産税リスク、3000万円控除の適用期限を解説。",
    datePublished: "2026-08-17T00:00:00Z",
    dateModified: "2026-09-04T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/inherited-house-keep-cost`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(INHERITED_HOUSE_KEEP_COST_FAQ_ITEMS);

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
              <span className="text-[#14243a]">相続した家を売らない選択</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                管理・維持
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                税制・空家特措法対応
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月17日 ／ 更新日: 2026年9月4日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【相続した家を売らない選択】年間の維持費・固定資産税の内訳と放置リスク｜管理ルーティン・特例解除シミュレーター
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              親から実家を相続した際、「思い出がある」「仏壇や遺品が残っている」「将来住むかもしれない」といった理由から、すぐに売却せず保有し続ける選択をするケースは少なくありません。しかし、居住していない実家であっても、固定資産税・都市計画税、火災保険料、水道光熱費の基本料金、植栽管理や交通費などで毎年数十万円の費用が発生します。さらに、適正な管理を怠った場合の税制ペナルティ（住宅用地特例解除による税負担増）や民法上の賠償責任、将来売却時の税制特例（3,000万円特別控除）の期限リミットまで、公的根拠に基づいて客観的に解説します。
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
                <a href="#annual-cost" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">1.</span> 売らない場合の年間維持費の内訳
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 維持費＆特例解除試算シミュレーター
                </a>
              </li>
              <li>
                <a href="#routine" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 必須管理ルーティンと放置リスク
                </a>
              </li>
              <li>
                <a href="#tax-risk" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 住宅用地特例解除と民法上の賠償責任
                </a>
              </li>
              <li>
                <a href="#deduction-limit" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 3000万円控除の「3年期限リミット」
                </a>
              </li>
              <li>
                <a href="#long-term-simulation" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 5年・10年保有 vs 今売却の長期損益シミュレーション
                </a>
              </li>
              <li>
                <a href="#decision-flow" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> 保有・委託・売却ルート判定フロー
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">8.</span> 売らずに維持するための4ステップ
                </a>
              </li>
              <li>
                <a href="#sentiment-roadmap" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">9.</span> 愛着・思い出ケースの段階的ロードマップ
                </a>
              </li>
              <li>
                <a href="#exit-strategy" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">10.</span> 賃貸化の費用対効果と国庫帰属という出口
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">11.</span> よくある質問（FAQ）
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 年間維持費の内訳 */}
            <section id="annual-cost" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 相続した実家を「売らない」場合にかかる年間維持費の内訳
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                相続した戸建て住宅を居住せずに保有し続ける場合、税金（固定資産税・都市計画税）に加えて、保険料、ライフラインの基本料金、植栽管理費、現地への交通費などが継続的に発生します。国土交通省の「空き家所有者等の実態調査」等によると、一般的な木造戸建て住宅における年間の維持管理コストは概ね<strong>年間約30万〜50万円程度</strong>が標準的な目安となります。
              </p>

              <RoutineCostTable />

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-xs sm:text-sm">
                <h4 className="font-bold text-[#0a7079] text-sm sm:text-base">
                  💡 「空き家の火災保険」は居住用と料率区分が異なる点に注意
                </h4>
                <p className="mt-2.5 text-[#14243a] leading-loose">
                  誰も住んでいない空き家は、放火や不審者侵入、漏水被害の発見遅延などのリスクが高まるため、損害保険各社の引受基準において「住宅物件」ではなく「一般物件（併用住宅・店舗等と同様の区分）」として扱われる場合があります。住宅物件用の保険をそのまま継続していると、万一の事故時に告知義務違反（地方税法や保険法第4条・第28条等）により保険金が支払われないおそれがあるため、空き家に対応した適切な契約区分への変更と保険料率の確認が必要です。
                </p>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 実家維持費＆特例解除リスク試算シミュレーター
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                土地・建物の固定資産税評価額、管理体制（自主管理交通費 / 専門会社委託）、草刈り頻度、保有年数を設定し、年間の維持費総額と累計コストを試算できます。管理不全空家等への勧告による住宅用地特例解除の影響や、3,000万円特別控除の期限切れによる税負担差も確認できます。
              </p>
              <Simulator />
            </section>

            {/* セクション 3: 具体的管理ルーティンと放置リスク */}
            <section id="routine" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 実家を売らずに維持するための必須管理ルーティン
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                実家の老朽化を遅らせ、近隣トラブルや行政指導を回避するためには、計画的かつ継続的な管理作業が必要です。特に湿気による木材腐朽と、水道管の封水切れによる下水臭・害虫侵入は、わずか数ヶ月放置するだけでも深刻な被害をもたらします。
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm">
                  <span className="rounded bg-[#078c95] px-2.5 py-1 text-xs font-black text-white">
                    月1回の必須作業
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    通風・換気と通水（封水の維持）
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#506477]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#078c95] font-bold">・</span>
                      <span><strong>全室通風（30分〜1時間）:</strong> 雨戸・窓・押入れ・靴箱を全開放し、室内の湿気を排気。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#078c95] font-bold">・</span>
                      <span><strong>全水栓の通水（1〜2分放水）:</strong> 排水トラップの蒸発（破封）を防ぎ、下水臭気や害虫の室内侵入を遮断。水道管の赤錆固着を防止。</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm">
                  <span className="rounded bg-[#14243a] px-2.5 py-1 text-xs font-black text-white">
                    年2〜4回の季節作業
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    敷地除草と越境樹木の剪定
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#506477]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#078c95] font-bold">・</span>
                      <span><strong>春・夏季の除草:</strong> 雑草の繁茂を放置すると害虫・害獣（ヘビ・蜂等）の発生源となり、近隣苦情の原因に。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#078c95] font-bold">・</span>
                      <span><strong>越境枝木の剪定:</strong> 2023年4月施行の民法第233条改正により、隣地所有者からの催告後も切除しない場合、隣地側で枝を直接切除される規定が新設。</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477] shadow-sm">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  遠方所有者における「自主管理」と「外部委託」の費用対効果
                </h4>
                <p className="mt-2 leading-relaxed">
                  居住地から実家までの往復交通費（新幹線・高速料金・ガソリン代）が1回あたり1万円を超える場合、年間12回の自主訪問で交通費だけで12万円以上を消費します。さらに片道数時間の移動と現地作業による時間的拘束を考慮すると、地元の空き家管理代行サービスやシルバー人材センター（月額5,000円〜10,000円程度で月1回の通風・通水・写真報告）を活用する方が、総費用・労力の両面で合理的となるケースが多く見られます。
                </p>
              </div>
            </section>

            {/* セクション 4: 住宅用地特例解除と法的責任 */}
            <section id="tax-risk" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 管理放置による「住宅用地特例解除」と所有者の損害賠償責任
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                適切な管理を行わずに空き家を放置した場合、税制上のペナルティと民事上の賠償責任という2重のリスクが発生します。
              </p>

              <TaxExemptionComparisonTable />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                  <span className="rounded bg-rose-600 px-2.5 py-1 text-xs font-black text-white">
                    地方税法第349条の3の2
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    住宅用地特例の強制解除（税額急増）
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    住宅が建っている土地は、固定資産税の課税標準が200㎡以下の部分について評価額の「1/6」に減額されています。しかし、空家等対策特別措置法に基づき「特定空家」または「管理不全空家」として自治体から「勧告」を受けると、この特例が解除されます。解除後は住宅用地以外の宅地等として本則ベースの計算に切り替わり、負担調整措置による段階的上昇（年次枠＋評価額の60%の上限）を経て税負担が増加します。
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
                  <span className="rounded bg-amber-600 px-2.5 py-1 text-xs font-black text-white">
                    民法第717条（工作物責任）
                  </span>
                  <h3 className="mt-3 text-base font-black text-[#14243a]">
                    所有者の「無過失責任」と賠償リスク
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                    建物の設置または保存に瑕疵（欠陥）があり、屋根瓦の落下、外壁の崩落、庭木の倒木などによって通行人や隣家に損害を与えた場合、建物の所有者は過失の有無にかかわらず全額の損害賠償義務を負います（無過失責任）。死亡事故や重度後遺障害の場合、数千万円から1億円超の損害賠償請求が生じる判例が存在します。
                  </p>
                </div>
              </div>

              {/* 負担調整措置の年度別具体例（SERP gap: 解除時の実際の税負担額の算出根拠と負担調整措置の具体例） */}
              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-5 py-4 sm:px-7">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    特例解除後は「すぐ6倍」ではなく負担調整措置で段階上昇 ― 年度別の具体例
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696] sm:text-xs">
                    土地評価額1,200万円・小規模住宅用地（200㎡以下の部分）のモデル。特例解除後は住宅用地以外の宅地等（商業地等）として計算する地方税法附則第18条の負担調整措置の適用例です。
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#dfe9ee] text-[#708696]">
                        <th className="px-5 py-3 font-bold sm:px-7">年度</th>
                        <th className="px-3 py-3 font-bold">課税標準</th>
                        <th className="px-3 py-3 font-bold">固定資産税</th>
                        <th className="px-3 py-3 font-bold">負担水準と適用された枠</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef3f5]">
                      {BURDEN_ADJUSTMENT_YEARS.map((row) => (
                        <tr key={row.fiscalYear} className="align-top">
                          <td className="px-5 py-3 font-bold text-[#14243a] sm:px-7">{row.fiscalYear}</td>
                          <td className="px-3 py-3 text-[#506477]">{row.taxableStandard}</td>
                          <td className="px-3 py-3 font-bold text-[#14243a]">{row.fixedAssetTax}</td>
                          <td className="px-3 py-3 text-[#506477]">
                            <span className="font-bold text-[#078c95]">{row.burdenLevel}</span>
                            <br />
                            {row.adjustmentRule}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#dfe9ee] bg-[#fbfaf7] px-5 py-3 text-[11px] leading-relaxed text-[#708696] sm:px-7">
                  出典: 地方税法附則第18条（宅地等の負担調整措置。住宅用地特例の解除後は住宅用地以外の宅地等＝商業地等として適用）、市区町村税務部局の公式解説（例: 大阪市「税負担の調整措置」2025年4月1日）。市町村が条例で前年度税額の1.1倍を超える額を減額する措置を採用している場合は初年度の上昇はさらに緩やかになります。都市計画税は別枠の負担調整。
                </div>
              </div>
            </section>

            {/* セクション 5: 3000万円控除の期限リミット */}
            <section id="deduction-limit" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 「売らない」選択の落とし穴：空き家3,000万円特別控除の3年期限リミット
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                実家を保有し続ける際に最も留意すべき税制上の制約が、<strong>「被相続人の居住用財産に係る譲渡所得の特別控除（租税特別措置法第35条第3項）」の適用期限</strong>です。
              </p>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#078c95] px-2.5 py-1 text-xs font-black text-white">
                    租税特別措置法第35条第3項
                  </span>
                  <span className="text-xs font-bold text-[#708696]">
                    適用期限の厳格な規定
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black text-[#14243a]">
                  相続開始があった日から「3年を経過する日の属する年の12月31日」まで
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#506477] sm:text-sm">
                  相続した実家を売却する場合、要件（昭和56年5月31日以前建築、売却代金1億円以下等）を満たせば、譲渡所得（売却益）から最大3,000万円（相続人が3人以上の場合は各2,000万円）を控除でき、長期譲渡所得税（所得税15%・住民税5%・復興特別所得税0.315%＝計20.315%）を全額非課税にできます。
                </p>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
                  <h4 className="font-bold text-amber-900 text-xs sm:text-sm">
                    ⚠️ 期限切れによる「二重の損失（税金増＋維持費累積）」の構造
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#14243a]">
                    例えば、相続時の取得費が不明で売却益が2,000万円見込まれる実家を、相続から3年を過ぎてから売却した場合、特例が失効するため<strong>約406万円（2,000万円×20.315%）の譲渡所得税</strong>が課税されます。さらにそれまでの保有期間中の維持費（年40万円×3〜5年＝120万〜200万円）も自己負担となるため、「売らない」判断を先送りし続けた結果、数百万円規模の資産減少を招く構造となっています。特例の適用要件・必要書類の詳細は
                    <Link href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="font-bold text-[#078c95] hover:underline">空き家売却の3,000万円特別控除の解説記事</Link>
                    で、相続税を納付している場合に譲渡所得税をさらに圧縮できる
                    <Link href="https://www.r-sic.com/akiya/articles/acquisition-cost-addition" className="font-bold text-[#078c95] hover:underline">取得費加算の特例の解説記事</Link>
                    でそれぞれ確認できます。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 6: 長期損益シミュレーション */}
            <section id="long-term-simulation" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 「5年・10年持ち続ける」と「今売る」の長期損益シミュレーション
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「今すぐ売る」と迷う理由の多くは、月々の維持費が目に見えにくいことにあります。年間維持費40万円（30〜50万円の中心値）と、3000万円特別控除の3年期限が失効した場合の譲渡所得税を組み合わせると、売却の先送りがどれだけの手残りを減らすかを定量化できます。
              </p>
              <LongTermHoldComparisonTable />
              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477] shadow-sm">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">
                  📌 読み取り方：売却の先送りコストは「維持費 × 年数 ＋ 特例失効」の複利
                </h4>
                <p className="mt-2 leading-relaxed">
                  3年以内の期限内売却なら損失は維持費分のみ（約80万〜120万円）で抑えられますが、5年後では約200万円の累積維持費に失効後の譲渡所得税約406万円が加わり約600万円、10年後では約800万円の手残り差になります。さらに建物は築年数の経過とともに査定価格自体が低下する傾向（築40年超の古家は解体更地前提の価格に漸近しやすい）があるため、この表の差は下限の目安です。一方で「将来住む・賃貸に出す」実行計画があり、適正管理で特例解除リスクを抑えられるなら、保有自体が必ずしも不利とは限りません。数字を揃えた上で判定フロー（セクション 7）で棚卸ししてください。
                </p>
              </div>
            </section>

            {/* セクション 7: 判定フロー */}
            <section id="decision-flow" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 実家を「売らない」場合の維持・委託・売却ルート判定フロー
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                実家までの距離、月1回以上の管理可否、建物の老朽化状態、将来の利用計画から、客観的にどの管理・活用ルートを選択すべきかを診断します。
              </p>
              <RequirementFlow />
            </section>

            {/* セクション 8: 実践ステップ */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                8. 実家を売らずに健全に維持・管理するための4ステップ
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                相続登記から維持費の一元管理、管理ルーティンの確立、年1回の定期見直しまでの具体的な手順です。
              </p>
              <StepGuide />
            </section>

            {/* セクション 9: 愛着・思い出ケースの段階的ロードマップ */}
            <section id="sentiment-roadmap" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                9. 「思い出があって売れない」ための段階的意思決定ロードマップ（遺品整理から始める）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「住む予定はないが愛着・思い出があり売却を決断できない」所有者に最も有効なのは、売る/売らないの二者択一を迫ることではなく、<strong>遺品整理（戸建ての相場30万〜80万円・2026年時点の業界公表相場）から始まる段階的な意思決定</strong>です。各段階で「わかること」が増え、決断に必要な情報と心理的な区切りが同時に揃います。
              </p>
              <ol className="space-y-5">
                {SENTIMENT_ROADMAP_STAGES.map((stage) => (
                  <li key={stage.stage} className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[#078c95] px-2.5 py-1 text-xs font-black text-white">
                        {stage.stage}
                      </span>
                      <span className="text-xs font-bold text-[#708696]">{stage.period}</span>
                    </div>
                    <h3 className="mt-3 text-base font-black text-[#14243a]">{stage.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">{stage.action}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl bg-[#f0f7f7] px-4 py-3 text-xs text-[#14243a]">
                        <span className="font-black text-[#0a7079]">費用の目安：</span>
                        {stage.costGuide}
                      </div>
                      <div className="rounded-xl bg-[#fbfaf7] px-4 py-3 text-xs text-[#14243a]">
                        <span className="font-black text-[#e56f2d]">この段階でわかること：</span>
                        {stage.outcome}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-xs leading-relaxed text-[#708696]">
                ※ 遺品整理の費用相場（戸建て30万〜80万円）は2026年時点の遺品整理業界の公表相場に基づく目安です。荷物量・間取り・立地（都会/地方）・人件費で幅が生じるため、必ず3社以上の相見積もりを取ってください。
              </p>
            </section>

            {/* セクション 10: 賃貸化費用対効果と国庫帰属という出口 */}
            <section id="exit-strategy" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                10. 売らないと決めた後でも出口は再設計できる: 賃貸化の費用対効果と国庫帰属という最終手段
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「売らない」と決めても、賃貸需要が立地的に成立しない・遠方で管理を続けられない・維持費の累積が重すぎる、といった状況では出口の再設計が必要になります。ここでは、賃貸化という「収益化ルート」と、相続土地国庫帰属制度という「土地ごと手放す最終手段」の2つを、費用の現実感とともに整理します。
              </p>

              <div className="space-y-4">
                {RENTAL_CONVERSION_SCENARIOS.map((s) => (
                  <div key={s.scenario} className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm">
                    <h3 className="text-base font-black text-[#14243a]">{s.scenario}</h3>
                    <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2 sm:text-sm">
                      <div className="rounded-xl bg-[#f0f7f7] px-4 py-3 text-[#14243a]">
                        <span className="font-black text-[#0a7079]">初期費用：</span>{s.initialCost}
                      </div>
                      <div className="rounded-xl bg-[#f0f7f7] px-4 py-3 text-[#14243a]">
                        <span className="font-black text-[#0a7079]">想定家賃：</span>{s.assumedRent}
                      </div>
                      <div className="rounded-xl bg-[#fbfaf7] px-4 py-3 text-[#14243a]">
                        <span className="font-black text-[#e56f2d]">年間の粗収入：</span>{s.grossAnnualIncome}
                      </div>
                      <div className="rounded-xl bg-[#fbfaf7] px-4 py-3 text-[#14243a]">
                        <span className="font-black text-[#e56f2d]">回収期間：</span>{s.paybackPeriod}
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[#506477] sm:text-sm">{s.verdict}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-[#708696]">
                ※ リフォーム費用・家賃は2026年時点の業界公表相場・賃貸情報サイト公表相場に基づく粗収入ベースの近似試算です。空室リスク・管理委託料（家賃の約5%）・修繕費・固定資産税等のランニングコストを差し引く前であり、実際の回収期間は地域需要・物件状態で大きく変動します。
              </p>

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8">
                <h3 className="text-base font-black text-[#14243a] sm:text-lg">
                  🔧 最終手段: 建物を解体して土地を国に引き取ってもらう「相続土地国庫帰属制度」
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">
                  賃貸需要も買い手も見込めない土地には、2023年4月27日に開始した相続土地国庫帰属制度という出口があります。判断は次の3ステップで行います。
                </p>
                <div className="mt-4 space-y-3">
                  {KOKKO_EXIT_STEPS.map((step) => (
                    <div key={step.step} className="rounded-xl border border-[#dfe9ee] bg-white p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#078c95] px-2 py-0.5 text-[11px] font-black text-white">{step.step}</span>
                        <span className="text-sm font-black text-[#14243a]">{step.title}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">{step.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#506477] sm:text-sm">
                  負担金の面積比例算定式・却下と不承認事由の実例・申請手順の詳細は
                  <Link href="/guide/kokko-kizoku" className="font-bold text-[#078c95] hover:underline">相続土地国庫帰属制度の負担金と要件の解説記事</Link>
                  で確認できます。
                </p>
              </div>
            </section>

            {/* セクション 11: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                11. 相続した家を売らない選択に関する「よくある質問（FAQ）」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                年間維持費の目安、特定空家・管理不全空家による固定資産税の特例解除、必須の管理ルーティン、民法上の賠償責任、3,000万円特別控除の期限、賃貸化の費用対効果や国庫帰属という最終手段まで客観的に解説します。
              </p>
              <InheritedHouseKeepCostFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="inherited-house-keep-cost" />

      <AkiyaFooter />
    </div>
  );
}
