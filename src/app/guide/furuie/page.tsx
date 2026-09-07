import type { Metadata } from "next";
import Link from "next/link";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { SITE_URL } from "@/lib/site";

const PAGE_TITLE = "売りにくい家研究所｜古い家・傷んだ家の出口を比較して決める";
const PAGE_DESCRIPTION =
  "古い・傷んだ家の現況売却・修繕・解体を比較するためのガイドです。費用と時間を同じ軸で並べて、あせらず決めるための材料をまとめます。";
const PAGE_CANONICAL = "/guide/furuie";
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
    label: "壊す・直す・このままを比べる",
    description: "現況売却・修繕・解体・買取を、状態・期限・先行費用の同じ軸で整理します。",
    href: "https://www.r-sic.com/akiya/old-house-sale-comparison/",
    external: true,
    meta: "特集（図解つき）",
    featured: true,
  },
  {
    label: "築年数と建物の値打ち",
    description: "築年数だけで売れるかは決まらない。状態と土地需要で確認します。",
    href: "/guide/vacant-house-demolition-sale",
  },
  {
    label: "解体と更地化",
    description: "解体費・助成金・更地後の税を、土地需要とセットで確認します。",
    href: "/guide/demolition-subsidy",
  },
  {
    label: "現況売却と契約特約",
    description: "古家付きのまま売るときの契約不適合責任の免責特約を整理します。",
    href: "https://www.r-sic.com/furuie/articles/nonconformity-exemption",
    external: true,
  },
  {
    label: "再建築不可の土地",
    description: "建て替えできない土地でも、売却先と条件を比べられます。",
    href: "https://www.r-sic.com/furuie/articles/unbuildable-sale-strategy",
    external: true,
  },
  {
    label: "残置物の片付け",
    description: "片付け費用と売却条件への影響を、実家じまいの費用から確認します。",
    href: "https://www.r-sic.com/akiya/jikka-jimai/",
    external: true,
  },
];

const DECISION_ITEMS = [
  {
    title: "修繕してから売るべきか",
    description: "修繕費が成約価格にどう影響するかを考える軸を示します。",
    href: "https://www.r-sic.com/akiya/old-house-sale-comparison/",
    external: true,
  },
  {
    title: "古家付きのまま売れるか",
    description: "地域の成約事例を見ながら、確認すべき条件を整理します。",
    href: "/guide/vacant-house-demolition-sale",
    external: false,
  },
];

const ARTICLE_ITEMS = [
  {
    href: "/guide/vacant-house-demolition-sale",
    tag: "更地 vs 古家付き",
    title: "空き家売却は更地と古家付きどっちが得？",
    excerpt: "固定資産税6倍リスク・更地渡し特約・手残りシミュレーションで、解体の是非を判断します。",
    date: "2026-08-20",
  },
  {
    href: "/guide/demolition-subsidy",
    tag: "解体補助金",
    title: "空き家解体補助金は自治体でいくらもらえる？",
    excerpt: "受給要件、補助率・上限額、契約・着工前の確認事項、立替キャッシュフローを解説します。",
    date: "2026-08-20",
  },
  {
    href: "/guide/kaitori-satei",
    tag: "買取査定",
    title: "空き家の買取査定の仕組みと計算方法",
    excerpt: "更地換算の計算過程、相続登記義務化対応、免責特約の有効範囲まで解説します。",
    date: "2026-09-03",
  },
];

export default function FuruieGuidePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "空き家ガイド", path: "/guide" },
    { name: "売りにくい家研究所", path: PAGE_CANONICAL },
  ]);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#14243a]">
      <JsonLd data={breadcrumbJsonLd} />
      <AkiyaHeader />

      <main className="pt-[72px]">
        <header className="relative isolate overflow-hidden border-b border-[#dfe9ee] bg-[#f0f7f7]">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(112deg,#fff7f0_0%,#fdf3ea_52%,#f7fbfa_100%)]" />
          <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-16">
            <nav aria-label="パンくず" className="text-xs font-bold text-[#708696]">
              <Link href="/" className="hover:text-[#078c95]">トップ</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/guide" className="hover:text-[#078c95]">空き家ガイド</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">売りにくい家研究所</span>
            </nav>
            <p className="mt-6 text-[11px] font-black tracking-[0.18em] text-[#d44e08]">古い家・傷んだ家の出口</p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-[#14243a] sm:text-3xl lg:text-4xl">
              売りにくい家の出口を、<br className="sm:hidden" />比べて、決める。
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#506477] sm:text-base">
              現況のまま売る、直して売る、解体して土地で売る。費用と時間を同じ軸で並べて、あせらず決めるための材料をまとめます。
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
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#f26317] pl-3">
              建物の状態から探す
            </h2>
            <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
              決めるところからではなく、いまの建物の状態に近いテーマから読めます。
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm transition-all hover:border-[#fb7e3d] hover:bg-[#fff7f0]"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#fff3ea] px-3 py-1 text-xs font-black text-[#d44e08]">
                      {item.featured ? "おすすめ" : "テーマ"}
                    </span>
                    {item.meta && <span className="text-xs font-bold text-[#708696]">{item.meta}</span>}
                    {item.external && <span className="text-xs text-[#708696]">↗ r-sic.com</span>}
                  </div>
                  <h3 className="mt-3 text-base font-black text-[#14243a] group-hover:text-[#d44e08]">{item.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#f26317] pl-3">
              いま決めたいことから
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {DECISION_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm transition-all hover:border-[#fb7e3d]"
                >
                  <h3 className="text-base font-black text-[#14243a] group-hover:text-[#d44e08]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#f26317] pl-3">
              注目のガイド記事
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {ARTICLE_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="group rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm transition-all hover:border-[#078c95] hover:bg-[#f0f7f7]">
                  <span className="rounded-full bg-[#f0f4f8] px-3 py-1 text-xs font-black text-[#506477]">{item.tag}</span>
                  <h3 className="mt-3 text-sm font-black leading-snug text-[#14243a] group-hover:text-[#078c95]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477]">{item.excerpt}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#708696]">更新日: {item.date}</p>
                </Link>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-[#506477]">
              古家売却の契約特約や旗竿地など、より専門的な読みものは{" "}
              <a href="https://www.r-sic.com/furuie/articles" target="_blank" rel="noopener noreferrer" className="font-bold text-[#078c95] underline">
                r-sic.com の売りにくい家研究所（↗ 外部サイト）
              </a>{" "}
              にあります。
            </p>
          </section>

          <section className="rounded-2xl border border-[#dfe9ee] bg-[#f8fafc] p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-black text-[#14243a] sm:text-xl">解体を考える前に</h2>
            <p className="text-sm leading-relaxed text-[#334155]">
              解体は不可逆です。まず自治体の解体補助金の有無と、更地後の固定資産税の変化を確認してから判断できます。物件所在地の制度は一次資料と確認日つきで探せます。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/guide/demolition-subsidy" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]">
                解体補助金の記事を読む →
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
