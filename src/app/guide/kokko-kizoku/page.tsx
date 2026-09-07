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
import { KokkoKizokuSimulator } from "@/components/editorial/kokko-kizoku/KokkoKizokuSimulator";
import { KokkoKizokuRequirementFlow } from "@/components/editorial/kokko-kizoku/KokkoKizokuRequirementFlow";
import { KokkoKizokuFaqAccordion } from "@/components/editorial/kokko-kizoku/KokkoKizokuFaqAccordion";
import { KokkoKizokuStepGuide } from "@/components/editorial/kokko-kizoku/KokkoKizokuStepGuide";
import {
  FUTANKIN_TABLE,
  KOKKO_KIZOKU_FAQ_ITEMS,
  PREPARATION_COST_GUIDE,
  TOTAL_COST_SCENARIOS,
  CALC_SHEET_STEPS,
  EXIT_ROUTE_COMPARISONS,
} from "@/components/editorial/kokko-kizoku/article-data";

const PAGE_TITLE =
  "相続土地国庫帰属制度の負担金と要件：20万円の原則・算定式・却下と不承認の実例つき";
const PAGE_DESCRIPTION =
  "相続土地国庫帰属制度（2023年4月27日開始）の負担金（原則20万円・宅地・農地・森林の面積比例算定式）と審査手数料1万4千円、却下事由・不承認事由、隣接土地の合算特例を政令・法務省統計に基づき解説。負担金シミュレーターと要件チェックつき。";
const PAGE_CANONICAL = "/guide/kokko-kizoku";
const PUBLISHED_DATE = "2026-08-16";
const MODIFIED_DATE = "2026-09-04";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_CANONICAL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00+09:00`,
    modifiedTime: `${MODIFIED_DATE}T00:00:00+09:00`,
  },
};

export default function KokkoKizokuArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "相続土地国庫帰属制度の負担金と要件",
      path: PAGE_CANONICAL,
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: `${PUBLISHED_DATE}T00:00:00+09:00`,
    dateModified: `${MODIFIED_DATE}T00:00:00+09:00`,
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PAGE_CANONICAL}`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(KOKKO_KIZOKU_FAQ_ITEMS);

  const yen = (n: number) => n.toLocaleString("ja-JP");

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
              <span className="text-[#14243a]">相続土地国庫帰属制度</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                制度・税金
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                令和5年4月27日制度開始
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日 ／ 更新日: 2026年9月4日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              相続土地国庫帰属制度の負担金と要件：20万円の原則・面積比例の算定式・却下と不承認の実例
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              「相続した土地を国に引き取ってもらえる」相続土地国庫帰属制度（相続等により取得した土地所有権の国庫への帰属に関する法律・令和3年法律第25号）。負担金の仕組み（原則20万円・宅地・農地・森林の面積比例算定）、審査手数料1万4千円、却下事由と不承認事由、隣接土地の合算特例を、政令（令和4年政令第316号）と法務省の統計に基づいて整理します。
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
                  <span className="text-[#078c95]">1.</span> 制度の仕組みと負担金・手数料
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 負担金シミュレーター
                </a>
              </li>
              <li>
                <a href="#calc" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 算定式の一覧と合算特例
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 却下・不承認事由と要件診断
                </a>
              </li>
              <li>
                <a href="#total-cost" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> トータルコストと民間との比較
                </a>
              </li>
              <li>
                <a href="#exit-comparison" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 手放し方の比較判断チャート
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> 申請手順と必要書類
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">8.</span> よくある質問（FAQ）
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 概要 */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 相続土地国庫帰属制度の仕組み: 負担金は「10年分の管理費用相当額」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                相続土地国庫帰属制度は、相続または遺贈（相続人に対する遺贈に限る）によって土地の所有権・共有持分を取得した者が、法務大臣の承認を受けて土地を国庫に帰属させる制度で、<strong>令和5年（2023年）4月27日に開始</strong>しました（法務省「相続土地国庫帰属制度について」）。土地を手放す代わりに、国が管理する費用の一部として<strong>「10年分の標準的な管理費用相当額」の負担金</strong>を一度だけ納付します（法第10条第1項）。
              </p>

              {/* 手続きイメージ（4ステップ） */}
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  { step: "1", title: "承認申請", desc: "管轄の法務局本局へ。手数料は1筆1万4千円" },
                  { step: "2", title: "要件審査", desc: "書面審査と実地調査（法第6条）" },
                  { step: "3", title: "負担金の納付", desc: "通知到達の翌日から30日以内" },
                  { step: "4", title: "国庫帰属", desc: "納付時に所有権が国へ移転（法第11条）" },
                ].map((item) => (
                  <div key={item.step} className="rounded-xl border border-[#dfe9ee] bg-white p-4 text-center shadow-sm">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#078c95] text-sm font-black text-white">
                      {item.step}
                    </span>
                    <p className="mt-2 text-sm font-black text-[#14243a]">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#708696]">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* 重要数値ボックス */}
              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-sm md:text-base">
                <p className="font-bold text-[#0a7079] text-base sm:text-lg">💡 制度利用時にかかる金銭（政令で定める額）</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-[#dfe9ee] pb-3">
                    <dt className="font-bold text-[#14243a]">審査手数料（申請時・収入印紙）</dt>
                    <dd className="font-black text-[#14243a]">1筆につき 14,000円（返還なし）</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-[#dfe9ee] pb-3">
                    <dt className="font-bold text-[#14243a]">負担金（承認後・一度のみ）</dt>
                    <dd className="font-black text-[#078c95]">原則 200,000円 ＋ 面積比例の算定式</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                    <dt className="font-bold text-[#14243a]">所有権移転登記</dt>
                    <dd className="font-black text-[#14243a]">官庁嘱託のため費用なし</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-[#708696]">
                  出典: 相続等により取得した土地所有権の国庫への帰属に関する法律施行令（令和4年政令第316号）第3条・第5条、法務省「相続土地国庫帰属制度の負担金」。
                </p>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 負担金シミュレーター（計算過程つき）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                土地の区分（宅地・農地・森林・その他）と地積・筆数を入力すると、政令第5条の算定式による負担金、審査手数料、事前準備費用を含む総支払額を計算過程つきで確認できます。
              </p>
              <KokkoKizokuSimulator />
            </section>

            {/* セクション 3: 算定式一覧 */}
            <section id="calc" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 負担金の算定式: 宅地・農地・森林は「地積 × 単価 ＋ 基礎額」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                負担金は土地の区分と区域、地積によって決まります（施行令第5条第1項）。市街化区域（区域区分のない都市計画区域では用途地域）内の宅地、市街化区域・農用地区域等内の農地、森林の3区分は面積比例の算定式となり、<strong>面積が大きくなるほど1㎡あたりの単価は低くなる段階構造</strong>です。算定額に千円未満の端数があるときは切り捨てます（同条第2項）。
              </p>

              {FUTANKIN_TABLE.map((def) => (
                <div key={def.key} className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                  <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-5 py-4 sm:px-7">
                    <h3 className="text-sm font-black text-[#14243a] sm:text-base">{def.label}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#708696] sm:text-xs">
                      {def.note}（{def.article}）
                    </p>
                  </div>
                  {def.tiers.length === 0 ? (
                    <div className="px-5 py-5 sm:px-7">
                      <p className="text-sm leading-relaxed text-[#506477]">
                        面積にかかわらず <span className="font-black text-[#078c95]">20万円（定額）</span>。宅地・農地・森林のいずれにも該当しない土地（例: 市街化区域外の宅地、農用地区域外の農地、雑種地・原野等）はこの区分です。
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[#dfe9ee] text-[#708696]">
                            <th className="px-5 py-3 font-bold sm:px-7">地積の区分</th>
                            <th className="px-3 py-3 font-bold">1㎡あたり単価</th>
                            <th className="px-3 py-3 font-bold">基礎額</th>
                            <th className="px-5 py-3 font-bold sm:px-7">計算例</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef3f5]">
                          {def.tiers.map((tier, idx) => {
                            const lower = idx === 0 ? 0 : (def.tiers[idx - 1].maxArea ?? 0);
                            const label =
                              tier.maxArea === null
                                ? `${lower?.toLocaleString()}㎡超`
                                : lower === 0
                                  ? `〜${tier.maxArea.toLocaleString()}㎡以下`
                                  : `${lower.toLocaleString()}㎡超〜${tier.maxArea.toLocaleString()}㎡以下`;
                            const sample = tier.maxArea ?? (lower ?? 0) + 1;
                            const sampleYen = Math.floor((sample * tier.ratePerSqm + tier.baseAmount) / 1000) * 1000;
                            return (
                              <tr key={idx} className="align-top">
                                <td className="px-5 py-3 font-bold text-[#14243a] sm:px-7">{label}</td>
                                <td className="px-3 py-3 text-[#506477]">{yen(tier.ratePerSqm)}円</td>
                                <td className="px-3 py-3 text-[#506477]">{yen(tier.baseAmount)}円</td>
                                <td className="px-5 py-3 text-[#506477] sm:px-7">
                                  {sample.toLocaleString()}㎡ → <span className="font-bold text-[#14243a]">約{Math.round(sampleYen / 10000).toLocaleString()}万円</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}

              {/* 合算特例 */}
              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-6 sm:p-8">
                <h3 className="text-base font-black text-[#14243a] sm:text-lg">
                  🔖 隣接する2筆以上の「負担金額算定の特例」（施行令第6条）
                </h3>
                <p className="mt-3 text-sm leading-loose text-[#506477]">
                  隣接する2筆以上の申請土地が<strong>すべて同一の区分</strong>（例: ともに市街化区域内の宅地、ともに森林）に属する場合、1筆の土地とみなして負担金を算定する特例を申し出られます。所有者が異なる場合は共同で申し出ます（同条第2項）。申出は申請書提出時から承認されるまでの間に、承認申請書を提出した法務局の本局へ行います。
                </p>
                <div className="mt-4 grid gap-3 rounded-xl bg-white p-4 sm:p-5 text-xs sm:text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-bold text-[#708696]">各筆で計算する場合</p>
                    <p className="mt-1.5 leading-relaxed text-[#506477]">
                      市街化区域内の宅地100㎡（54万8千円）＋ 90㎡（52万円）
                      <br />
                      合計 <span className="font-black text-[#d9483b]">約106万8千円</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[#708696]">合算特例を適用する場合</p>
                    <p className="mt-1.5 leading-relaxed text-[#506477]">
                      190㎡として算定（190㎡×2,450円＋30万3千円）
                      <br />
                      合計 <span className="font-black text-[#078c95]">76万8千円</span>
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-[#708696]">
                  ※農地・森林など面積比例の区分では、2筆以上の面積を合算した地積で算定します。宅地と森林など区分が異なる土地同士は合算できません。法務省は面積比例算定の対象土地に向けて負担金額の自動計算シート（Excel）を公表しています。
                </p>
              </div>
            </section>

            {/* セクション 4: 要件診断 */}
            <section id="requirements" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 却下事由・不承認事由: 申請できない土地と承認されない土地
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                制度の利用可否は2段階で判断されます。まず<strong>却下事由（法第2条第3項・法第4条）</strong>に該当する土地は承認申請自体ができず、次に<strong>不承認事由（法第5条第1項・施行令第4条）</strong>に該当する土地は審査の結果、承認を受けられません。法務省の統計（令和8年6月30日現在・速報値）では、申請5,698件に対し帰属2,885件、却下83件、不承認93件、取下げ1,063件となっています。
              </p>

              {/* 統計ハイライト */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#078c95]">45件</p>
                  <p className="mt-1 text-xs font-bold text-[#14243a]">不承認理由の最多</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696]">地上の工作物・車両・樹木等（法5条1項2号）</p>
                </div>
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#d9483b]">22件＋21件</p>
                  <p className="mt-1 text-xs font-bold text-[#14243a]">却下理由の上位</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696]">現に通路（22件）・境界が明らかでない（21件）</p>
                </div>
                <div className="rounded-xl border border-[#dfe9ee] bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#e56f2d]">562件</p>
                  <p className="mt-1 text-xs font-bold text-[#14243a]">取下げの理由</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696]">有効活用の見込みが生じた（隣接地所有者からの引き受け申出等）</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#708696]">
                出典: 法務省「相続土地国庫帰属制度の統計」（令和8年6月30日現在・速報値）。1つの事件で複数の却下・不承認理由が認められる場合があります。
              </p>

              <KokkoKizokuRequirementFlow />
            </section>

            {/* セクション 5: トータルコストと民間比較 */}
            <section id="total-cost" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. トータルコストの構造と民間売却・買取との比較判断
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                国庫帰属制度は「土地を引き取ってもらう」制度であり、売却代金は入りません。実際の支払いは、（1）審査手数料1筆1万4千円（返還なし）、（2）建物解体・境界確定測量・残置物撤去等の<strong>事前準備費用</strong>（該当する場合。個別の見積による）、（3）承認後の負担金、の3層構造になります。
              </p>

              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#dfe9ee] bg-[#f8fbfa] text-[#708696]">
                        <th className="px-5 py-3.5 font-bold sm:px-7">費用の層</th>
                        <th className="px-3 py-3.5 font-bold">発生タイミング</th>
                        <th className="px-3 py-3.5 font-bold">金額</th>
                        <th className="px-5 py-3.5 font-bold sm:px-7">却下・不承認時</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef3f5]">
                      <tr>
                        <td className="px-5 py-3.5 font-bold text-[#14243a] sm:px-7">審査手数料</td>
                        <td className="px-3 py-3.5 text-[#506477]">申請時（収入印紙）</td>
                        <td className="px-3 py-3.5 font-bold text-[#14243a]">1筆 14,000円</td>
                        <td className="px-5 py-3.5 text-[#506477] sm:px-7">返還されません</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3.5 font-bold text-[#14243a] sm:px-7">事前準備費用</td>
                        <td className="px-3 py-3.5 text-[#506477]">申請前</td>
                        <td className="px-3 py-3.5 text-[#506477]">建物解体・境界確定測量等（個別の見積）</td>
                        <td className="px-5 py-3.5 text-[#506477] sm:px-7">制度に絡まず自己負担</td>
                      </tr>
                      <tr className="bg-[#f0f7f7]">
                        <td className="px-5 py-3.5 font-bold text-[#14243a] sm:px-7">負担金</td>
                        <td className="px-3 py-3.5 text-[#506477]">承認後30日以内</td>
                        <td className="px-3 py-3.5 font-black text-[#078c95]">原則20万円〜（算定式）</td>
                        <td className="px-5 py-3.5 text-[#506477] sm:px-7">発生しません</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 text-sm md:text-base">
                <h3 className="font-bold text-[#0a7079] text-base sm:text-lg">⚖️ 民間の売却・買取との比較で見るべき数字</h3>
                <p className="mt-3 leading-loose text-[#506477]">
                  比較判断の軸は<strong>「国庫帰属での総支払額（手数料＋事前準備費用＋負担金）」と「民間に売却・買取してもらう場合の収支（受取額 − 仲介手数料等 − 解体費等）」</strong>の対比です。民間側で受け取れる金額が費用を上回るなら売却のほうが収支は大きくなり、反対に買い手がつかない土地や、解体・測量費用に見合わない土地では国庫帰属が選択肢となります（どちらが適切かは土地の状態・立地・時価により異なるため、個別の比較が必要です）。
                </p>
                <p className="mt-3 leading-loose text-[#506477]">
                  法務省の統計でも、取下げ1,063件のうち<strong>562件は「有効活用の見込みが生じた」</strong>ことが理由で、自治体・国の機関による活用決定、隣接地所有者からの引き受け申出、農業委員会の調整による農地活用などの例が公表されています。申請前に活用の見込みが見つかれば、負担金を支払わずに土地を手放せる可能性があることを示す実データです。
                </p>
              </div>

              {/* 申請前準備費用の目安（SERP gap: 境界不明・解体が必要な土地のトータル費用目安と負担金の比較） */}
              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-5 py-4 sm:px-7">
                  <h3 className="text-sm font-black text-[#14243a] sm:text-base">
                    申請前の準備費用の目安（却下・不承認事由の解消コスト）
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#708696] sm:text-xs">
                    法務省はこれらの費用目安を公表していないため、2026年時点の業界公表相場による近似値です。必ず個別の相見積もりで確認してください。
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#dfe9ee] text-[#708696]">
                        <th className="px-5 py-3 font-bold sm:px-7">準備項目</th>
                        <th className="px-3 py-3 font-bold">発生条件</th>
                        <th className="px-3 py-3 font-bold">費用の目安</th>
                        <th className="px-5 py-3 font-bold sm:px-7">備考</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef3f5]">
                      {PREPARATION_COST_GUIDE.map((row) => (
                        <tr key={row.item} className="align-top">
                          <td className="px-5 py-3 font-bold text-[#14243a] sm:px-7">{row.item}</td>
                          <td className="px-3 py-3 text-[#506477]">{row.condition}</td>
                          <td className="px-3 py-3 font-bold text-[#078c95]">{row.costGuide}</td>
                          <td className="px-3 py-3 text-[#506477] sm:px-7">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* シナリオ別総支払額 */}
              <div className="grid gap-3 sm:grid-cols-3">
                {TOTAL_COST_SCENARIOS.map((s) => (
                  <div key={s.scenario} className="rounded-xl border border-[#dfe9ee] bg-white p-4 shadow-sm">
                    <p className="text-xs font-black text-[#14243a]">{s.scenario}</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">{s.breakdown}</p>
                    <p className="mt-2 text-lg font-black text-[#078c95]">{s.total}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-[#708696]">
                ※ 総支払額は審査手数料＋事前準備費用＋負担金（宅地等の面積比例によらず原則20万円で試算）の近似例です。負担金が面積比例になる土地（市街化区域内の宅地・農用地区域内の農地・森林）ではさらに大きくなります。
              </p>

              {/* 負担金自動計算シートの使い方（SERP gap: 計算ツールの使い方と事前相談のポイント） */}
              <div className="rounded-2xl border border-[#e56f2d]/30 bg-[#fff9f5] p-6 sm:p-8">
                <h3 className="text-base font-black text-[#14243a] sm:text-lg">
                  📊 法務省の負担金自動計算シートの使い方（4ステップ）
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {CALC_SHEET_STEPS.map((s) => (
                    <div key={s.step} className="rounded-xl bg-white p-4">
                      <p className="text-sm font-black text-[#14243a]">{s.step}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#506477]">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* セクション 6: 手放し方の比較判断チャート */}
            <section id="exit-comparison" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 手放し方の比較判断チャート: 国庫帰属・民間買取・空き家バンク・寄附・相続放棄
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                土地を手放す手段は国庫帰属だけではありません。かかる費用・受け取れる金銭・確実性の3軸で、民間の売却・買取と公的な制度を横並びに比較します。
              </p>
              <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#dfe9ee] bg-[#f8fbfa] text-[#708696]">
                        <th className="px-5 py-3.5 font-bold sm:px-7">手段</th>
                        <th className="px-3 py-3.5 font-bold">支払い・費用</th>
                        <th className="px-3 py-3.5 font-bold">受け取れる金銭</th>
                        <th className="px-3 py-3.5 font-bold">確実性・期間</th>
                        <th className="px-5 py-3.5 font-bold sm:px-7">向いているケース</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef3f5]">
                      {EXIT_ROUTE_COMPARISONS.map((row) => (
                        <tr key={row.route} className="align-top">
                          <td className="px-5 py-3.5 font-bold text-[#14243a] sm:px-7">{row.route}</td>
                          <td className="px-3 py-3.5 text-[#506477]">{row.payment}</td>
                          <td className="px-3 py-3.5 text-[#506477]">{row.proceeds}</td>
                          <td className="px-3 py-3.5 text-[#506477]">{row.certainty}</td>
                          <td className="px-3 py-3.5 text-[#506477] sm:px-7">{row.fitCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#dfe9ee] bg-[#fbfaf7] px-5 py-3 text-[11px] leading-relaxed text-[#708696] sm:px-7">
                  判断の順序: ① 相続開始直後なら相続放棄（3ヶ月以内）の可否 → ② 仲介・買取の査定で民間売却の収支確認 → ③ 買い手がつかない場合に国庫帰属の総支払と比較。査定は無料・国庫帰属の事前相談も無料のため、両方の数字を揃えてから決めるのが原則です。
                </div>
              </div>
            </section>

            {/* セクション 7: 手順 */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 申請手順と必要書類
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                申請から国庫帰属までの流れと、承認申請書の添付書類（施行規則第3条）を整理します。法務局・地方法務局では無料の相談を受付けており、法務省は令和6年10月15日からウェブ相談を開始しています。
              </p>
              <KokkoKizokuStepGuide />
            </section>

            {/* セクション 8: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                8. よくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                負担金の額や計算方法、審査手数料の返還、合算特例、建物・抵当権がある場合の扱い、事前費用込みの総額、空き家バンク・寄附との違いなど、制度利用でよく寄せられる疑問に回答します。
              </p>
              <KokkoKizokuFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="kokko-kizoku" />

      <AkiyaFooter />
    </div>
  );
}
