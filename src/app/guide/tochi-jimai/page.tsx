import type { Metadata } from "next";
import Link from "next/link";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { SITE_URL } from "@/lib/site";

const PAGE_TITLE = "土地じまいの選択肢｜売却・活用・国庫帰属を整理して決める";
const PAGE_DESCRIPTION =
  "土地の売却・活用・管理負担・相続土地国庫帰属を、選択肢として整理します。土地の状態と需要に合わせて、比較の軸をそろえて確認できるガイド集です。";
const PAGE_CANONICAL = "/guide/tochi-jimai";
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

interface ExploreItem {
  label: string;
  description: string;
  href: string;
  external?: boolean;
  meta?: string;
  featured?: boolean;
}

const EXPLORE_ITEMS: ExploreItem[] = [
  {
    label: "相続土地国庫帰属を検討するとき",
    description: "制度の対象要件と、申請前に確認することを整理します。",
    href: "/guide/kokko-kizoku",
    meta: "制度の基本",
    featured: true,
  },
  {
    label: "活用（リースバック）",
    description: "売る以外の選択肢。貸す・使うの判断材料を並べます。",
    href: "/guide/leaseback",
  },
  {
    label: "管理負担",
    description: "持ち続けるコストと手間を、可視化してから比べます。",
    href: "/guide/maintenance-cost-risk",
  },
  {
    label: "解体して土地として売る",
    description: "解体費・助成金・更地後の税を、土地需要とセットで確認します。",
    href: "/guide/demolition-subsidy",
  },
  {
    label: "土地の相場",
    description: "国土交通省の成約・取引データで、地域の水準を確認します。",
    href: "https://www.r-sic.com/",
    external: true,
  },
  {
    label: "農地などの引き受け手",
    description: "農地には農地法のルールがあります。許可と相談先を整理します。",
    href: "https://www.r-sic.com/akiya/articles/nouchi-5jo",
    external: true,
  },
];

const ARTICLE_ITEMS = [
  {
    href: "/guide/kokko-kizoku",
    tag: "国庫帰属",
    title: "相続土地国庫帰属制度の負担金と要件",
    excerpt: "負担金20万円の原則と算定式、審査手数料、却下・不承認事由を政令と統計に基づき解説します。",
    date: "2026-08-16",
  },
  {
    href: "/guide/sanrin-inheritance-disposal",
    tag: "山林",
    title: "相続した山林の売却・処分方法と森林組合の役割",
    excerpt: "立木売却、境界調査、森林法の届出義務、国庫帰属制度との使い分けを解説します。",
    date: "2026-08-16",
  },
  {
    href: "/guide/maintenance-cost-risk",
    tag: "管理負担",
    title: "空き家の管理費用と放置リスク、3つの出口戦略",
    excerpt: "年間費用シミュレーターと、管理不全空き家の基準から出口を比べます。",
    date: "2026-08-15",
  },
];

export default function TochiJimaiGuidePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "空き家ガイド", path: "/guide" },
    { name: "土地じまいの選択肢", path: PAGE_CANONICAL },
  ]);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#14243a]">
      <JsonLd data={breadcrumbJsonLd} />
      <AkiyaHeader />

      <main className="pt-[72px]">
        <header className="relative isolate overflow-hidden border-b border-[#dfe9ee] bg-[#f0f7f7]">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(112deg,#f2faf5_0%,#eaf5ef_52%,#f7fbfa_100%)]" />
          <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-16">
            <nav aria-label="パンくず" className="text-xs font-bold text-[#708696]">
              <Link href="/" className="hover:text-[#078c95]">トップ</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/guide" className="hover:text-[#078c95]">空き家ガイド</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">土地じまいの選択肢</span>
            </nav>
            <p className="mt-6 text-[11px] font-black tracking-[0.18em] text-[#1f6649]">土地を手放す・持ち続ける判断</p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-[#14243a] sm:text-3xl lg:text-4xl">
              土地を、どうじまいするか。<br className="sm:hidden" />選択肢を並べて決める。
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#506477] sm:text-base">
              売却・活用・国庫帰属・持ち続ける管理。土地の状態と需要に合わせて、比較の軸をそろえて整理します。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-[#708696]">
              <span>内容確認日: {CONFIRMED_ON}</span>
              <span>•</span>
              <span>運営: 空き家補助金ナビ編集部</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-14 space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#2e7d5b] pl-3">
              土地の状況から探す
            </h2>
            <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
              その土地を、いまどうしたいか。近い関心から確認できます。
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm transition-all hover:border-[#2e7d5b] hover:bg-[#f2faf5]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${item.featured ? "bg-[#eaf5ef] text-[#1f6649]" : "bg-[#f0f4f8] text-[#506477]"}`}>
                      {item.featured ? "おすすめ" : "テーマ"}
                    </span>
                    {item.meta && <span className="text-xs font-bold text-[#708696]">{item.meta}</span>}
                    {item.external && <span className="text-xs text-[#708696]">↗ r-sic.com</span>}
                  </div>
                  <h3 className="mt-3 text-base font-black text-[#14243a] group-hover:text-[#1f6649]">{item.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#2e7d5b] pl-3">
              注目のガイド記事
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {ARTICLE_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="group rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm transition-all hover:border-[#078c95] hover:bg-[#f0f7f7]">
                  <span className="rounded-full bg-[#eaf5ef] px-3 py-1 text-xs font-black text-[#1f6649]">{item.tag}</span>
                  <h3 className="mt-3 text-sm font-black leading-snug text-[#14243a] group-hover:text-[#078c95]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{item.excerpt}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#708696]">更新日: {item.date}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#dfe9ee] bg-[#f8fafc] p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-black text-[#14243a] sm:text-xl">国庫帰属を検討する前に</h2>
            <p className="text-sm leading-relaxed text-[#334155]">
              相続土地国庫帰属制度は、すべての土地が認められるわけではありません。要件、負担金、審査の流れを申請前に確認できます。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/guide/kokko-kizoku" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]">
                国庫帰属の記事を読む →
              </Link>
              <Link href="/subsidies" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#078c95] bg-white px-5 text-sm font-extrabold text-[#078c95] transition-all hover:bg-[#f0f7f7]">
                補助金を探す
              </Link>
            </div>
          </section>
        </div>
      </main>

      <AkiyaFooter />
    </div>
  );
}
