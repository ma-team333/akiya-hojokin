import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GuideSources } from "@/components/guide/GuideSources";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { KaitoriSateiSimulator } from "@/components/editorial/kaitori-satei/KaitoriSateiSimulator";
import { KaitoriRequirementFlow } from "@/components/editorial/kaitori-satei/KaitoriRequirementFlow";
import { KaitoriStepGuide } from "@/components/editorial/kaitori-satei/KaitoriStepGuide";
import { KaitoriFaqAccordion } from "@/components/editorial/kaitori-satei/KaitoriFaqAccordion";
import { FAQ_ITEMS } from "@/components/editorial/kaitori-satei/article-data";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";

export const metadata: Metadata = {
  title:
    "【老朽化・残置物ありでも】空き家の買取査定の仕組みと計算方法を徹底解説｜相続登記・免責特約・固定資産税リスク対応",
  description:
    "空き家の買取査定の仕組み（更地換算の計算過程）と、老朽化・残置物がある空き家の査定前準備を解説。2022年4月施行の相続登記義務化にともなう未登記・共有名義空き家の買取手続き、契約不適合責任免責特約の有効範囲（消費者契約法）、特定空家・管理不全空家による住宅用地特例解除の税影響まで整理します。",
  alternates: {
    canonical: "/guide/kaitori-satei",
  },
  openGraph: {
    title:
      "【老朽化・残置物ありでも】空き家の買取査定の仕組みと計算方法を徹底解説",
    description:
      "買取査定の更地換算シミュレーター、相続登記義務化対応の未登記・共有名義空き家の売却フロー、免責特約の有効範囲、特定空家の税リスクまで網羅。",
    type: "article",
    publishedTime: "2026-08-15T00:00:00Z",
    modifiedTime: "2026-09-03T00:00:00+09:00",
  },
};

/** §1 比較表の単一データソース（PCテーブル・SPカード双方がここから描画）。 */
const BUYOUT_VS_CHUKAI_ROWS = [
  {
    feature: "買主",
    buyout: "不動産会社（買取業者）",
    brokerage: "一般の購買者",
  },
  {
    feature: "仲介手数料",
    buyout: "発生しない",
    brokerage:
      "上限あり（宅地建物取引業法第46条第1項・国土交通省告示第十五号：200万円以下の部分5%・200万円超400万円以下の部分4%・400万円超の部分2%＋消費税）",
  },
  {
    feature: "老朽化・残置物",
    buyout: "解体前提・現状渡しの取引が可能",
    brokerage: "買主の希望により修繕・解体の要望が残る",
  },
  {
    feature: "価格決定",
    buyout: "更地換算（土地価格から解体費等を控除）等",
    brokerage: "市場価格（需要と供給）",
  },
] as const;

/** §4 免責特約表の単一データソース。 */
const MENSHO_ROWS = [
  {
    clause: "売主は一切の契約不適合責任を負わない（全面免責）",
    effect: "無効",
    basis: "消費者契約法第8条",
  },
  {
    clause: "売主が知っていた場合に限り責任を負う",
    effect: "有効",
    basis: "消費者契約法第8条（故意・重過失によらない不知に限る特例）",
  },
  {
    clause: "買主が知っていた不適合を後から請求する",
    effect: "制限される",
    basis: "民法第566条（権利行使期間：原則1年）",
  },
] as const;

/** §3 現状有姿買取の査定減額幅の目安（単一データソース）。出典つき相場のみ採録。 */
const DEDUCTION_GUIDE_ROWS = [
  {
    item: "建物解体費用（木造）",
    range: "坪当たり4〜6万円（12,000〜18,000円/㎡）",
    source: "国土交通省「建築物除却工種別平方メートル単価参考値」等を基準とした全国平均（構造・地域・付帯工事で変動）",
  },
  {
    item: "建物解体費用（鉄骨造）",
    range: "坪当たり5〜8万円（15,000〜24,000円/㎡）",
    source: "同上（鉄骨造の全国平均）",
  },
  {
    item: "建物解体費用（RC造）",
    range: "坪当たり7〜10万円（21,000〜30,000円/㎡）",
    source: "同上（鉄筋コンクリート造の全国平均）",
  },
  {
    item: "残置物の撤去・処分（遺品整理）",
    range: "戸建て30万〜80万円",
    source: "2026年時点の遺品整理業界の公表相場（荷物量・間取り・立地で幅が生じる）",
  },
] as const;

/** §6 管理不全空家指定→特例解除→売却時期判断のステップ（単一データソース）。 */
const TAX_TIMING_STEPS = [
  {
    stage: "助言・指導の段階",
    taxEffect: "住宅用地特例はまだ解除されない",
    action: "勧告への進行を避けるためにも、この段階で売却・解体・管理改善のいずれかに着手するのが実務上の基本線。固定資産税評価証明書で現状の課税状況を確認",
  },
  {
    stage: "勧告の段階（特定空家等・管理不全空家等）",
    taxEffect: "住宅用地特例から除外され、固定資産税は課税標準1/6→本則（計算上は6倍水準）へ",
    action: "解除は勧告を受けた年度から適用。解除後も負担調整措置（地方税法附則第18条）で年ごとの上昇枠が緩和されるため「即6倍」ではないが、確実に上昇方向に転じる。保有し続ける場合の税負担増を織り込んだ売却判断が必要",
  },
  {
    stage: "併せて確認する期限（税制上の期限）",
    taxEffect: "相続空き家の3,000万円特別控除は、相続開始から3年を経過する日の属する年の12月31日までの売却が要件",
    action: "指導・勧告の状況と特別控除の期限を同じカレンダーに置いて、どちらが先に来るかで売却時期を決める。期限と税負担増の双方を逃す形の長期保有が最も不利な組み合わせになる",
  },
] as const;

/** §7 再建築不可・地方過疎地物件の評価ロジック（単一データソース）。 */
const CONSTRAINED_EVALUATION_ROWS = [
  {
    factor: "再建築不可（接道義務違反等）",
    logic: "建替えができないため建物としての需要が消え、評価は事実上「土地のみ」。更地換算の土地評価を基礎に、建替え制限による需要の縮小（住宅ローンを組めない買主が多く、現金購入の投資家・隣地所有者に限定されやすい）が上乗せの調整要因になる",
  },
  {
    factor: "みなし道路（2項道路）のセットバック未対応",
    logic: "建替え時に道路中心線から2mのセットバックが必要なため、後退後に建築可能な敷地が残るかどうかで評価が分かれる。後退残地が十分なら建替え需要が残り、残らないなら再建築不可と同じ評価構造になる",
  },
  {
    factor: "既存不適格建築物（現行規制に適合しない既存建物）",
    logic: "建基法第3条第2項により現行規制の適用を受けないため、現建物の使用・賃貸は継続可能。ただし建替えには現行規制への適合が必要なため、評価は「現建物の残存価値＋制約つき土地」の二層構造で考え、現建物の状態が良いほど相対的に有利になる",
  },
  {
    factor: "地方過疎地（人口減少・成約稀少地域）",
    logic: "公示価格や固定資産税評価額は基本的な基準点になるが、買い手が現れにくい地域では「いくらで売れたか」の成約事例自体が少なく、査定額は業者ごとの再販見込み（販路・保有リスク）に依存する。地価公示・地価調査の値動きと、買取業者が想定する再販期間を前提として聞くのが確認の基本線になる",
  },
] as const;

export default function KaitoriSateiArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家の買取査定の仕組みと計算方法",
      path: "/guide/kaitori-satei",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【老朽化・残置物ありでも】空き家の買取査定の仕組みと計算方法を徹底解説｜相続登記・免責特約・固定資産税リスク対応",
    description:
      "空き家の買取査定の更地換算の仕組み、老朽化・残置物がある空き家の査定準備、相続登記義務化対応の売却フロー、契約不適合責任の免責特約、特定空家・管理不全空家の税影響を解説。",
    datePublished: "2026-08-15T00:00:00Z",
    dateModified: "2026-09-03T00:00:00+09:00",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/kaitori-satei`,
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
                売る・手放す
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-[#14243a]">空き家の買取査定</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#bbd8dc] bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                相続登記義務化（2022年4月施行）対応
              </span>
              <span className="ml-1 text-xs font-bold text-[#708696]">
                公開日: 2026年8月15日 ／ 更新日: 2026年9月3日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【老朽化・残置物ありでも】空き家の買取査定の仕組みと計算方法を徹底解説
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              建物が老朽化していても、残置物が残っていても、空き家は<strong>「買取」という売却方法</strong>を選べます。本記事では、買取査定で用いられる「更地換算」の計算過程、査定前の準備、2022年4月施行の<strong>相続登記義務化</strong>にともなう未登記・共有名義空き家の手続き、契約不適合責任の免責特約の有効範囲、特定空家・管理不全空家による住宅用地特例解除の税影響まで、法令に基づいて整理します。
            </p>
          </div>
        </header>

        {/* 記事本文 */}
        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-16">
          {/* 目次 */}
          <div className="mb-12 rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-[0_4px_20px_rgba(20,36,58,0.04)]">
            <p className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#078c95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e56f2d]" />
              TABLE OF CONTENTS
            </p>
            <h2 className="mt-1 text-base font-black text-[#14243a]">本記事の目次</h2>
            <ol className="mt-4 grid gap-2.5 text-xs font-bold text-[#14243a] sm:grid-cols-2 md:text-sm">
              <li>
                <a href="#overview" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">1.</span> 買取査定の基礎（仲介との違い）
                </a>
              </li>
              <li>
                <a href="#simulator" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">2.</span> 買取査定額シミュレーター
                </a>
              </li>
              <li>
                <a href="#preparation" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">3.</span> 査定前の準備（老朽化・残置物）
                </a>
              </li>
              <li>
                <a href="#requirements" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">4.</span> 6項目セルフチェック
                </a>
              </li>
              <li>
                <a href="#exemption" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">5.</span> 契約不適合責任の免責の法意
                </a>
              </li>
              <li>
                <a href="#taxrisk" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">6.</span> 特定空家と住宅用地特例解除
                </a>
              </li>
              <li>
                <a href="#constrained-evaluation" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">7.</span> 再建築不可・地方過疎地の評価
                </a>
              </li>
              <li>
                <a href="#steps" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">8.</span> 相続登記義務化と手続きフロー
                </a>
              </li>
              <li>
                <a href="#faq" className="flex items-center gap-1.5 hover:text-[#078c95]">
                  <span className="text-[#078c95]">9.</span> よくある質問
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-12 leading-relaxed text-[#14243a] sm:space-y-14">
            {/* セクション 1: 買取査定の基礎 */}
            <section id="overview" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                1. 空き家の「買取査定」とは − 仲介との違いと仕組み
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                総務省「住宅・土地統計調査」（2018年）によれば、全国の空き家は849万戸（住宅総数の13.6%）に上り、そのうち賃貸用・売却用・二次的住宅のいずれにも該当しない「その他の住宅」は約40万戸です。空き家の売却方法は、大きく分けると<strong>①仲介</strong>（不動産会社が買主を探す）と<strong>②買取</strong>（不動産会社が直接買い取る）の2つがあります。買取は買主探し・内見対応が不要で、契約から引渡しまでの期間が短期である反面、仲介での市場価格と比べて査定額が低めに設定される取引構造です。なお「仲介と買取のどちらで売るべきか」という売却ルート選択の正本は、4つの売り方（現況仲介・古家付き土地・解体後売却・買取）を同じ軸で比べる<Link href="https://www.r-sic.com/akiya/akiya-sale-route/" className="font-bold text-[#078c95] underline">空き家の売り方を比べる判断ページ</Link>です。編集部の解説記事は役割が分かれています。仲介と買取の手残り額の試算は<Link href="/guide/sale-vs-buyout" className="font-bold text-[#078c95] underline">空き家売却 vs 買取の判断基準（手残り額シミュレーター付き）</Link>、仲介と買取の違いの整理は<Link href="/guide/brokerage-vs-buyout" className="font-bold text-[#078c95] underline">買取と仲介の違いの解説</Link>、そして本記事は査定額の算出方法（更地換算の計算過程）と査定前の準備に絞って解説します。
              </p>
              {/* モバイル表示: カードスタック (md:hidden) */}
              <div className="divide-y divide-[#dfe9ee] md:hidden">
                {BUYOUT_VS_CHUKAI_ROWS.map((row) => (
                  <div key={row.feature} className="space-y-2 p-4">
                    <h4 className="text-sm font-black text-[#14243a]">{row.feature}</h4>
                    <div className="rounded-lg border border-[#dfe9ee] bg-[#f0f7f7]/60 p-3">
                      <div className="text-[11px] font-bold text-[#0a7079]">買取（業者が直接購入）</div>
                      <div className="mt-1 text-xs text-[#506477]">{row.buyout}</div>
                    </div>
                    <div className="rounded-lg border border-[#dfe9ee] bg-white p-3">
                      <div className="text-[11px] font-bold text-[#708696]">仲介（買主を探す）</div>
                      <div className="mt-1 text-xs text-[#506477]">{row.brokerage}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* デスクトップ表示: テーブル (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full min-w-[520px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-[#0a7079]">
                      <th className="p-3.5 font-black">比較項目</th>
                      <th className="p-3.5 font-black">買取（業者が直接購入）</th>
                      <th className="p-3.5 font-black">仲介（買主を探す）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    {BUYOUT_VS_CHUKAI_ROWS.map((row) => (
                      <tr key={row.feature}>
                        <th className="p-3.5 font-bold text-[#14243a]">{row.feature}</th>
                        <td className="p-3.5">{row.buyout}</td>
                        <td className="p-3.5">{row.brokerage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                買取査定では、<strong>「そのまま再販した場合の価格」から、再販までに必要な解体費用・残置物処分費用・修繕費用等を差し引き、業者の事業利益を織り込んだ額</strong>が提示されます。建物が老朽化している場合は「更地換算」の考え方が中心になり、土地の想定価格を起点に控除項目を積み上げる計算が行われます。計算過程の詳細は次章のシミュレーターで確認できます。
              </p>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                2. 買取査定額シミュレーター（計算過程つき）
              </h2>
              <p className="mt-4 text-sm text-[#506477] md:text-base">
                土地の想定価格（地価公示・固定資産税評価額等を参考に入力）と、解体費用・残置物処分費用の見積額を入力すると、老朽化した空き家の買取査定の計算過程をステップごとに確認できます。仲介で売却した場合の仲介手数料上限（宅地建物取引業法第46条第1項に基づく国土交通省告示第十五号）の参考表示つきです。
              </p>
              <KaitoriSateiSimulator />
            </section>

            {/* セクション 3: 査定前の準備 */}
            <section id="preparation" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                3. 老朽化・残置物がある空き家の査定前準備
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                買取査定の精度は、査定時に提出できる情報の揃い方で変わります。老朽化した空き家や残置物が多い空き家では、次の準備が査定額の内訳を確認する土台になります。
              </p>
              <div className="space-y-3">
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    ① 土地価格の公的指標を確認する
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">
                    周辺の土地取引価格の指標は、国土交通省の「地価公示」（毎年3月公示）と都道府県の「地価調査」で確認できます。市町村が発行する「固定資産税評価証明書」の評価額も、査定額の相談における基準の一つです。これらの公的指標を持っておくと、提示された査定額の土地評価部分の根拠を照合できます。
                  </p>
                </div>
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    ② 残置物は「撤去するか、現状渡しにするか」の方針を決める
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">
                    残置物があっても査定自体は可能です。現状渡しの場合は処分費用が査定額から差し引かれるため、事前に撤去した場合とどちらが有利かを、内訳の提示を受けて比較できます。故人の遺品にあたるものについては、相続人の間で処分方針を確認しておくことで、売却後のトラブルを防止できます。
                  </p>
                </div>
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    ③ 建物の状態を記録（写真・書類）に残す
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">
                    建物の老朽化の程度は、解体費用の見積額に反映されます。屋根・外壁・基礎の状態、アスベスト使用建材の有無（建築時期や「アスベスト使用調査報告書」の有無）、浄化槽等の地中埋設物の有無を写真と書類で整理しておくと、複数業者の見積の比較条件が揃います。建物を解体せず現状のまま売る「古家付き土地」の選択肢については、<Link href="/guide/vacant-house-demolition-sale" className="font-bold text-[#078c95] underline">古家付き土地と更地の比較記事</Link>で詳しく解説しています。
                  </p>
                </div>
              </div>

              {/* 現状有姿買取の査定減額幅の目安 */}
              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-5 py-4 sm:px-7">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    現状有姿買取の査定減額幅の目安 ― 残置物・解体費用込みで差し引かれる項目
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#506477]">
                    更地換算の買取査定では「土地の想定価格」から解体費用と残置物処分費用が差し引かれます（§2シミュレーター参照）。ここでは出典で確認できる相場帯を掲載します。実際の減額幅は物件ごとの見積で確定するため、複数業者の内訳比較が前提です。
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#f0f7f7] text-[#0a7079]">
                        <th className="p-3.5 font-black">差し引かれる項目</th>
                        <th className="p-3.5 font-black">相場・目安</th>
                        <th className="p-3.5 font-black">出典・前提</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                      {DEDUCTION_GUIDE_ROWS.map((row) => (
                        <tr key={row.item}>
                          <th className="p-3.5 align-top font-bold text-[#14243a]">{row.item}</th>
                          <td className="p-3.5 align-top font-bold text-[#0a7079]">{row.range}</td>
                          <td className="p-3.5 align-top leading-relaxed">{row.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#dfe9ee] bg-[#fdf9f4] px-5 py-3.5 text-[11px] leading-relaxed text-[#708696] sm:px-7">
                  上記は全国平均・2026年9月時点の公表値に基づく目安であり、地域・物件条件・付帯工事（アスベスト処理・地中埋設物撤去・庭木伐採等）で大きく変動します。解体費・残置物処分費とも、必ず3社以上の相見積もりで内訳を比較してください（相見積もりの比較条件は③の記録が土台になります）。出典のない「何％減額」という一律の比率は存在しないため、本稿では掲載しません。
                </div>
              </div>
            </section>

            {/* セクション 4: セルフチェック */}
            <section id="requirements" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                4. 買取査定前に確認する6項目セルフチェック
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                空き家の買取では、物件そのものの状態に加えて、<strong>名義（相続登記）・共有の合意形成・税務・自治体の指導</strong>という権利・税務面の確認が査定と並行して必要になります。まず現状を整理してみましょう。
              </p>
              <KaitoriRequirementFlow />
            </section>

            {/* セクション 5: 契約不適合責任の免責 */}
            <section id="exemption" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                5. 契約不適合責任の免責 − 法意とトラブル防止策
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                2020年（令和2年）4月1日施行の民法改正により、従来の「瑕疵担保責任」は<strong>「契約不適合責任」</strong>（民法第562条〜第566条）に再構成されました。売買の目的物が契約の内容に適合しない場合（種類・品質・数量の不適合）、買主は<strong>追完請求（562条）・代金減額請求（563条）・損害賠償請求（564条）・解除（565条）</strong>を行使できます。雨漏り、シロアリ被害、地中埋設物（浄化槽・残留基礎等）の存在は、この「契約不適合」に該当し得る典型例です。
              </p>
              <div className="rounded-xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 text-sm space-y-2 sm:p-6">
                <p className="font-bold text-[#0a7079]">⚖️ 買取取引における免責特約の有効範囲</p>
                <p className="leading-loose text-[#14243a]">
                  売主が個人（空き家を相続した相続人等）で、買主が買取業者（事業者）の場合、<strong>消費者契約法第8条（瑕疵担保免責特約の特例は2021年4月1日施行）</strong>が適用されます。これにより、売主（消費者）の契約不適合責任を免除・制限する特約のうち有効なのは「消費者の故意又は重過失によらないで契約不適合を知らなかったときに限り責任を負う」旨のものだけで、<strong>一切の責任を負わないとする全面免責特約は無効</strong>です。無効となった部分は、民法の契約不適合責任の規定に戻って適用されます。
                </p>
                <p className="text-xs leading-relaxed text-[#506477]">
                  なお、宅地建物取引業法第40条（業者が自ら売主となる場合の免責特約の制限・引渡しから2年より短い特約の無効化）は「宅建業者が売主」の取引を対象とする規制であるため、業者が<strong>買主</strong>となる買取取引には適用されません。この点が、仲介で一般の買主に売る場合と制度上異なります。
                </p>
              </div>
              {/* モバイル表示: カードスタック (md:hidden) */}
              <div className="divide-y divide-[#dfe9ee] md:hidden">
                {MENSHO_ROWS.map((row) => (
                  <div key={row.clause} className="space-y-2 p-4">
                    <h4 className="text-sm font-black text-[#14243a]">{row.clause}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-[11px] font-black ${row.effect.includes("無効") ? "bg-[#d9483b] text-white" : "bg-[#0a7079] text-white"}`}>{row.effect}</span>
                    </div>
                    <div className="text-xs text-[#506477]">根拠: {row.basis}</div>
                  </div>
                ))}
              </div>
              {/* デスクトップ表示: テーブル (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full min-w-[520px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-[#0a7079]">
                      <th className="p-3.5 font-black">免責特約の内容</th>
                      <th className="p-3.5 font-black">効力</th>
                      <th className="p-3.5 font-black">根拠</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    {MENSHO_ROWS.map((row) => (
                      <tr key={row.clause}>
                        <th className="p-3.5 font-bold text-[#14243a]">{row.clause}</th>
                        <td className="p-3.5 font-bold text-[#d9483b]">{row.effect}</td>
                        <td className="p-3.5">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                トラブル防止の実務対応として機能するのは<strong>「開示」</strong>です。既に把握している不具合（雨漏り、シロアリ被害、地中埋設物、越境等）を売買契約書や「物件状況等報告書」に記載して開示しておけば、買主（買取業者）はその事実を「知って購入した」ことになるため、開示済みの事実を理由とする請求は制限されます。逆に、知っているのに告げずに売った場合、消費者契約法第8条の保護（「知らなかったときに限り責任」特約）の対象から外れるリスクがあります。なお、買取業者が転売後に現れる第三者との関係では、売主の責任の及び方に個別の事情があるため、心配な場合は登記・契約実務に詳しい専門家への確認が対応策となります（古家付き土地の現状渡し契約の詳細は<Link href="https://www.r-sic.com/furuie/articles/nonconformity-exemption" className="font-bold text-[#078c95] underline">契約不適合責任免責の解説記事</Link>で詳述）。
              </p>
            </section>

            {/* セクション 6: 特定空家と税 */}
            <section id="taxrisk" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                6. 特定空家・管理不全空家と住宅用地特例解除 − 税負担増の正しい理解
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                住宅が建っている土地には固定資産税の<strong>「住宅用地の特例」</strong>（地方税法第349条の3の2）が適用され、200㎡以下の小規模住宅用地では固定資産税の課税標準が<strong>1/6</strong>、都市計画税は<strong>1/3</strong>に減額されています。ところが、<strong>空家等対策の推進に関する特別措置法</strong>に基づく市区町村の<strong>助言・指導・勧告等を受けた特定空家等は、この住宅用地特例の適用対象から除外</strong>されます。
              </p>
              <div className="rounded-xl border border-[#e56f2d]/30 bg-[#fff9f5] p-5 text-xs leading-relaxed text-[#506477] sm:text-sm">
                <p className="text-sm font-black text-[#e56f2d] sm:text-base">⚠️ 「6倍」の正しい読み方</p>
                <p className="mt-2 leading-loose">
                  特例除外によって<strong>課税標準</strong>が1/6から本則（1.0）に戻るため「計算上は6倍」ですが、これは税額総額が一律6倍になるという意味ではありません。地方税法附則第18条に基づく「負担調整措置」（評価額に対する課税標準額の上限を70%水準とする措置）が適用されるため、実質の税額は固定資産税・都市計画税の合計で<strong>おおむね3〜4倍程度</strong>となります（仕組みの詳細は上記の特定空家の記事を参照）。また、2023年（令和5年）12月の法改正により、倒壊等の恐れがある「特定空家」の一歩手前の<strong>「管理不全空家」</strong>（草木の繁茂、ごみの堆積、外壁の剥落等の外面観察で判断される管理不全状態）も指導・勧告の対象に加わりました。
                </p>
                <p className="mt-2 leading-loose">
                  すでに助言・指導を受けた段階で売却・解体・管理改善に着手すれば、勧告以降の特例除外を回避できる可能性があります。空き家の保有コストの試算と増税シミュレーションは、<Link href="/guide/tokutei-akiya-tax" className="font-bold text-[#078c95] underline">特定空家・管理不全空家の固定資産税の記事</Link>で詳しく解説しています。
                </p>
              </div>

              {/* 売却時期判断（指導・勧告のステージと税制上の期限） */}
              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-5 py-4 sm:px-7">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    管理不全空家指定→特例解除を踏まえた売却時期の判断ステップ
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#506477]">
                    空家等対策の推進に関する特別措置法の指導のステージと、税制上の期限を同じ軸で並べると、「いつ売るか」の判断材料が揃います。
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#f0f7f7] text-[#0a7079]">
                        <th className="p-3.5 font-black">段階・期限</th>
                        <th className="p-3.5 font-black">税への影響</th>
                        <th className="p-3.5 font-black">売却時期の判断材料</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                      {TAX_TIMING_STEPS.map((row) => (
                        <tr key={row.stage}>
                          <th className="p-3.5 align-top font-bold text-[#14243a]">{row.stage}</th>
                          <td className="p-3.5 align-top leading-relaxed">{row.taxEffect}</td>
                          <td className="p-3.5 align-top leading-relaxed">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#dfe9ee] bg-[#fdf9f4] px-5 py-3.5 text-[11px] leading-relaxed text-[#708696] sm:px-7">
                  出典：空家等対策の推進に関する特別措置法（特定空家等・管理不全空家等への勧告は令和5年法律第50号による改正・2023年12月13日施行。勧告を受けると敷地は地方税法第349条の3の2第1項の住宅用地から除外）／地方税法附則第18条（負担調整措置）／国税庁 No.3306（相続開始から3年を経過する日の属する年の12月31日までの譲渡）。勧告の有無・時期は市町村の空家対策担当窓口での確認が正確です。固定資産税の賦課は年度（1月1日時点）単位で決まる点も、売却時期判断では実務上の区切りになります。
                </div>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                買取査定との関係では、この税負担の変化が「早期売却」の判断材料になります。特定空家等への指導・勧告は市町村のWEBサイトや空き家対策課の窓口で状況を確認でき、固定資産税の課税状況は市町村発行の「固定資産税評価証明書」「納税証明書」で確認できます。売却後の譲渡所得税（売却益があった場合、長期譲渡で税率20.315%）や相続空き家特例（最大3,000万円控除）の適用可否は、<Link href="https://www.r-sic.com/akiya/articles/sale-tax-cost" className="font-bold text-[#078c95] underline">空き家売却の税金と費用の記事</Link>、<Link href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="font-bold text-[#078c95] underline">3,000万円特別控除の記事</Link>で解説しています。
              </p>
            </section>

            {/* セクション 7: 再建築不可・地方過疎地 */}
            <section id="constrained-evaluation" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                7. 再建築不可・地方過疎地物件の評価ロジック ― 制約が査定額に入る仕組み
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                接道義務（建築基準法第43条第1項：敷地は道路に2m以上接する必要がある）を満たさない等の理由で<strong>建替えができない「再建築不可物件」</strong>や、人口減少地域の<strong>地方過疎地の物件</strong>は、買取査定の評価構造そのものが変わります。共通するのは「土地の基礎値に、需要側の制約による調整が上乗せされる」というロジックです。ここでは出典のある制度要件と評価の考え方を整理し、一律の減額率のような出典のない数値は掲載しません。
              </p>
              <div className="overflow-x-auto rounded-xl border border-[#dfe9ee] bg-white shadow-sm">
                <table className="w-full min-w-[680px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f0f7f7] text-[#0a7079]">
                      <th className="p-3.5 font-black">物件の制約</th>
                      <th className="p-3.5 font-black">評価ロジック</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
                    {CONSTRAINED_EVALUATION_ROWS.map((row) => (
                      <tr key={row.factor}>
                        <th className="p-3.5 align-top font-bold text-[#14243a]">{row.factor}</th>
                        <td className="p-3.5 align-top leading-relaxed">{row.logic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                制約の有無は登記事項証明書・公図・市町村の都市計画情報（用途地域・道路位置指定）で確認できます。再建築不可物件の出口戦略（隣地所有者への売却アプローチ・リフォームの建築確認不要範囲・賃貸活用）の詳細は、<Link href="https://www.r-sic.com/akiya/articles/saikenchikufuka-exit" className="font-bold text-[#078c95] underline">再建築不可物件の売却相場と3大出口戦略の解説記事</Link>が正本です。地方の実家の処分全般（相続・片付け・売却の通しの手順）は<Link href="/guide/chiho-jikka-shobun" className="font-bold text-[#078c95] underline">地方の実家の処分の進め方の記事</Link>、旗竿地など接道に起因する土地の評価は<Link href="https://www.r-sic.com/furuie/articles/flag-shaped-land-value" className="font-bold text-[#078c95] underline">旗竿地の評価の解説記事</Link>が担当します。
              </p>
            </section>

            {/* セクション 8: 相続登記義務化と手続きフロー */}
            <section id="steps" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                8. 相続登記義務化と未登記・共有名義空き家の買取手続きフロー
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                2022年（令和4年）4月1日に施行された改正不動産登記法により、<strong>相続の開始および自分が相続人になったことを知った日から3年以内の相続登記申請が義務化</strong>され、正当な理由なく履行しない場合は<strong>10万円以下の過料</strong>の対象となります。空き家の買取では、所有権移転登記の前提として売主名義への登記（または相続人全員での売却手続き）が必要であるため、未登記・共有名義の空き家では「登記をどう完了させるか」が手続きの中心になります。遺産分割がまとまらない場合でも、<strong>法定相続分での相続登記（保存登記）</strong>なら各相続人が単独で申請でき、義務の履行と売却準備を並行できます。
              </p>
              <KaitoriStepGuide />
            </section>

            {/* セクション 9: FAQ */}
            <section id="faq" className="space-y-4">
              <h2 className="border-b border-[#dfe9ee] pb-3 text-xl font-black text-[#14243a] md:text-2xl">
                9. よくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                老朽化した建物や残置物のある空き家の買取査定、再建築不可や地方の物件の評価、売却時期、相続登記、免責特約、税務について寄せられる質問に回答します。
              </p>
              <KaitoriFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-16 border-t border-[#dfe9ee] pt-12">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="kaitori-satei" />

      <AkiyaFooter />
    </div>
  );
}
