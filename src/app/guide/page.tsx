import type { Metadata } from "next";
import Link from "next/link";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { SITE_URL } from "@/lib/site";

const PAGE_TITLE = "空き家ガイド｜売却・解体補助金・管理・土地じまいを原典つきで整理";
const PAGE_DESCRIPTION =
  "空き家の売却と買取、解体補助金、固定資産税、管理費用、相続土地国庫帰属など、空き家を手放す・持ち続ける判断のためのガイド集。一次資料と確認日を添えて、13記事＋2テーマに整理しました。";
const PAGE_CANONICAL = "/guide";
const CONFIRMED_ON = "2026-09-07";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    url: `${SITE_URL}${PAGE_CANONICAL}`,
  },
};

interface GuideCard {
  href: string;
  tag: string;
  title: string;
  excerpt: string;
}

const SUB_HUBS: GuideCard[] = [
  {
    href: "/guide/furuie",
    tag: "売りにくい家",
    title: "売りにくい家研究所",
    excerpt: "古い・傷んだ家の現況売却・修繕・解体を、費用と時間を同じ軸で比べるための入口。",
  },
  {
    href: "/guide/tochi-jimai",
    tag: "土地じまい",
    title: "土地じまいの選択肢",
    excerpt: "売却・活用・管理負担・相続土地国庫帰属を、土地の状態と需要に合わせて整理。",
  },
];

const SECTIONS: { heading: string; lead: string; cards: GuideCard[] }[] = [
  {
    heading: "売却・買取で手放す",
    lead: "更地にするか、古家付きのまま売るか。仲介と買取のどちらに頼るか。手残り額で比べる記事群です。",
    cards: [
      {
        href: "/guide/vacant-house-demolition-sale",
        tag: "更地 vs 古家付き",
        title: "空き家売却は更地と古家付きどっちが得？",
        excerpt: "固定資産税6倍リスク・更地渡し特約・手残りシミュレーションで、解体の是非を判断します。",
      },
      {
        href: "/guide/brokerage-vs-buyout",
        tag: "仲介 vs 買取",
        title: "不動産の買取と仲介の違い、どっちが得？",
        excerpt: "買取相場が市場価格の7〜8割になる理由と、実質手取りシミュレーターで比較します。",
      },
      {
        href: "/guide/sale-vs-buyout",
        tag: "判断基準",
        title: "空き家売却 vs 買取の判断基準と手残り額",
        excerpt: "仲介で売れない老朽空き家を、税制特例と固定資産税リスクの回避も含めて最短で手放す方法。",
      },
      {
        href: "/guide/kaitori-satei",
        tag: "買取査定",
        title: "空き家の買取査定の仕組みと計算方法",
        excerpt: "更地換算の計算過程、相続登記義務化対応、免責特約の有効範囲まで解説します。",
      },
      {
        href: "/guide/chiho-jikka-shobun",
        tag: "地方の実家",
        title: "地方の実家が売れないときの処分方法",
        excerpt: "値下げ・買取・空き家バンク・解体・相続放棄を、判断順に沿って整理します。",
      },
    ],
  },
  {
    heading: "解体補助金・制度・税",
    lead: "自治体の補助金は制度差が大きく、税は「解体した後に増える」落とし穴があります。原典つきで確認できます。",
    cards: [
      {
        href: "/guide/demolition-subsidy",
        tag: "解体補助金",
        title: "空き家解体補助金は自治体でいくらもらえる？",
        excerpt: "受給要件、補助率・上限額、契約・着工前の確認事項、立替キャッシュフローを解説します。",
      },
      {
        href: "/guide/demolition-subsidy-timing",
        tag: "申請タイミング",
        title: "空き家の解体補助金はいつ申請する？",
        excerpt: "年度予算・募集タイミング・立替資金・跡地活用まで、2026年度版として整理します。",
      },
      {
        href: "/guide/tokutei-akiya-tax",
        tag: "固定資産税",
        title: "特定空家だと固定資産税が最大6倍？",
        excerpt: "住宅用地特例解除の仕組み、管理不全空家の判定基準、負担調整措置を正確に整理します。",
      },
    ],
  },
  {
    heading: "管理費用と相続後の負担",
    lead: "持ち続けるコストを数字で見ることが、売却判断の前提になります。",
    cards: [
      {
        href: "/guide/inherited-house-keep-cost",
        tag: "維持費の内訳",
        title: "相続した家を売らない選択、年間の維持費は？",
        excerpt: "固定資産税・火災保険・管理費の実費内訳と、放置リスク、管理ルーティンを可視化します。",
      },
      {
        href: "/guide/maintenance-cost-risk",
        tag: "放置リスク",
        title: "空き家の管理費用と放置リスク、3つの出口戦略",
        excerpt: "年間費用シミュレーターと、管理不全空き家の基準から出口を比べます。",
      },
    ],
  },
  {
    heading: "土地・山林・住みかえの選択肢",
    lead: "売却以外の引き取り手（国庫帰属・森林組合・リースバック）も、選択肢として並べて確認できます。",
    cards: [
      {
        href: "/guide/kokko-kizoku",
        tag: "国庫帰属",
        title: "相続土地国庫帰属制度の負担金と要件",
        excerpt: "負担金20万円の原則と算定式、審査手数料、却下・不承認事由を政令と統計に基づき解説。",
      },
      {
        href: "/guide/sanrin-inheritance-disposal",
        tag: "山林",
        title: "相続した山林の売却・処分方法と森林組合の役割",
        excerpt: "立木売却、境界調査、森林法の届出義務、国庫帰属制度との使い分けを解説します。",
      },
      {
        href: "/guide/leaseback",
        tag: "リースバック",
        title: "自宅を売却して住み続けるリースバックの方法",
        excerpt: "家賃相場の考え方、定期借家契約、買戻し特約、税務まで公的資料に基づき整理します。",
      },
    ],
  },
];

export default function GuideHubPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "空き家ガイド", path: PAGE_CANONICAL },
  ]);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}${PAGE_CANONICAL}`,
    isPartOf: { "@type": "WebSite", name: "空き家補助金ナビ", url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#14243a]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <AkiyaHeader />

      <main className="pt-[72px]">
        <header className="relative isolate overflow-hidden border-b border-[#dfe9ee] bg-[#f0f7f7]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(112deg,#f7fbfa_0%,#eef7f5_52%,#deeff1_100%)]" />
          <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-16">
            <nav aria-label="パンくず" className="text-xs font-bold text-[#708696]">
              <Link href="/" className="hover:text-[#078c95]">トップ</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">空き家ガイド</span>
            </nav>
            <p className="mt-6 text-[11px] font-black tracking-[0.18em] text-[#078c95]">GUIDE</p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-[#14243a] sm:text-3xl lg:text-4xl">
              空き家ガイド
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#506477] sm:text-base">
              空き家を手放す・持ち続けるための判断材料を、13の記事と2つのテーマに整理しました。自治体制度は一次資料と確認日つき、税と費用の数字は法定計算に基づいています。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-[#708696]">
              <span>内容確認日: {CONFIRMED_ON}</span>
              <span>•</span>
              <span>運営: 空き家補助金ナビ編集部</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-14">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
              まず、テーマから入る
            </h2>
            <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
              状況が固まっていないときは、テーマの入口から読みはじめるのが早道です。
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SUB_HUBS.map((hub) => (
                <Link key={hub.href} href={hub.href} className="group rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm transition-all hover:border-[#078c95] hover:bg-[#f0f7f7]">
                  <span className="rounded-full bg-[#e6f4f5] px-3 py-1 text-xs font-black text-[#087f88]">{hub.tag}</span>
                  <h3 className="mt-3 text-base font-black text-[#14243a] group-hover:text-[#078c95]">{hub.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{hub.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>

          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12 space-y-4">
              <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                {section.heading}
              </h2>
              <p className="text-sm leading-relaxed text-[#334155] sm:text-base">{section.lead}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.cards.map((card) => (
                  <Link key={card.href} href={card.href} className="group rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm transition-all hover:border-[#078c95] hover:bg-[#f0f7f7]">
                    <span className="rounded-full bg-[#f0f4f8] px-3 py-1 text-xs font-black text-[#506477]">{card.tag}</span>
                    <h3 className="mt-3 text-base font-black leading-snug text-[#14243a] group-hover:text-[#078c95]">{card.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477]">{card.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12 rounded-2xl border border-[#dfe9ee] bg-[#f8fafc] p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-black text-[#14243a] sm:text-xl">このガイドの情報の作り方</h2>
            <p className="text-sm leading-relaxed text-[#334155]">
              各記事は、根拠となる法令・政令・国の統計・自治体の公式要項といった一次資料を出典として明記し、確認日を添えています。数字の推計は一次情報と区別して示します。記事の結論は運営者（空き家補助金ナビ編集部）の判断であり、最終的な意思決定はご自身の責任で、必要に応じて専門家にご相談ください。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/verification" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]">
                検証方針を見る →
              </Link>
              <Link href="/subsidies" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#078c95] bg-white px-5 text-sm font-extrabold text-[#078c95] transition-all hover:bg-[#f0f7f7]">
                補助金を探す
              </Link>
            </div>
          </section>

          <DiagnosisCard />
        </div>
      </main>

      <AkiyaFooter />
    </div>
  );
}
