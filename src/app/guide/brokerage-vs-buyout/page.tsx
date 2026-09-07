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
  BrokerageVsBuyoutSimulator,
  BrokerageBuyoutDecisionFlow,
  BrokerageBuyoutComparisonTable,
  BrokerageBuyoutStepGuide,
  BrokerageBuyoutFaqAccordion,
  BROKERAGE_VS_BUYOUT_FAQ_ITEMS,
} from "@/components/editorial/brokerage-vs-buyout";

export const metadata: Metadata = {
  title:
    "【不動産の買取と仲介の違い】どっちが得？手取りシミュレーター・6大比較・判断基準を徹底解説",
  description:
    "不動産売却の「仲介」と「買取」の違い、買取相場が市場価格の7〜8割になる理由、仲介手数料・解体費・残置物処分・固定資産税を考慮した「実質手取りシミュレーター」、契約不適合責任免責の仕組み、失敗しない売却手法の選び方を網羅的に解説します。",
  alternates: {
    canonical: "/guide/brokerage-vs-buyout",
  },
  openGraph: {
    title: "【不動産の買取と仲介の違い】どっちが得？実質手取りシミュレーションと判断基準",
    description:
      "仲介で高く売るか、買取で早く確実に手放すか。手取り差シミュレーター、契約不適合責任の免責特約がどこまで有効か（消費者契約法8条）、諸経費の内訳を徹底比較。",
    type: "article",
    publishedTime: "2026-08-16T00:00:00Z",
    modifiedTime: "2026-08-16T00:00:00Z",
  },
};

export default function BrokerageVsBuyoutArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "不動産の買取と仲介の違い",
      path: "/guide/brokerage-vs-buyout",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【不動産の買取と仲介の違い】どっちが得？手取りシミュレーター・6大比較・判断基準を徹底解説",
    description:
      "不動産売却の「仲介」と「買取」の根本的な違い、実質手取り額シミュレーション、契約不適合責任免責の法的仕組み、4ステップ手順を徹底解説。",
    datePublished: "2026-08-16T00:00:00Z",
    dateModified: "2026-08-16T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/brokerage-vs-buyout`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(BROKERAGE_VS_BUYOUT_FAQ_ITEMS);

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
              <span className="text-[#14243a]">買取と仲介の違い</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                実務的意思決定ガイド
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              【不動産の買取と仲介の違い】どっちが得？手取りシミュレーター・6大比較・判断基準を徹底解説
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              不動産を売却する際、広く一般の買主を募る「仲介」と、不動産会社に直接買い取ってもらう「買取」のどちらを選ぶべきか悩む方は少なくありません。
              「額面の売却価格」だけで比較すると仲介が有利に見えますが、仲介手数料・解体費・残置物処分費・売却までの維持費、そして売却後の契約不適合責任（旧瑕疵担保責任）を差し引いた<strong>「実質手取り額とリスク」</strong>で比較すると、結論は物件の状況によって大きく変わります。
              本記事では、両者の仕組み、損益分岐点シミュレーター、意思決定フロー、法令根拠に基づく実務ポイントを徹底整理しました。
            </p>

            {/* 正準バインディング（SOB-675 Row3・SOB-576 step-1 方式）: この記事=仲介と買取の違いの解説。「どの売り方で進めるか」の4ルート比較は判断ページが単一オーナー */}
            <div className="mt-4 rounded-xl border border-[#078c95]/30 bg-[#e6f4f5]/60 p-4 text-sm">
              <p className="font-bold text-[#14243a]">仲介と買取の違いを知ったら、4つの売り方を同じ軸で比べる</p>
              <p className="mt-1 text-[#334155]">この記事は仲介と買取の仕組みの違いの解説です。現況仲介・古家付き土地・解体後売却・買取の4ルートを提示価格・契約条件・残置物・引渡しで比べる売却ルート選択は、専用の判断ページが正本です。</p>
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
                <a href="#mechanism" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">1.</span> 仲介と買取の根本的な仕組み
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 6項目徹底比較表
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 実質手取りシミュレーター
                </a>
              </li>
              <li>
                <a href="#decision-flow" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> どっちが向いてる？診断フロー
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 損をしない4ステップ手順
                </a>
              </li>
              <li>
                <a href="#legal-facts" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 買取相場の内訳と法的根拠
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
            {/* セクション 1: 仕組み */}
            <section id="mechanism" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. 「仲介」と「買取」の根本的な仕組みと取引構造
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                不動産を売却するルートは、法律上および取引構造上、大きく<strong>「仲介（媒介）」</strong>と<strong>「買取（直接売買）」</strong>の2種類に分かれます。
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {/* 仲介の解説カード */}
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#078c95] px-2.5 py-1 text-xs font-black text-white">
                      仲介（媒介）の仕組み
                    </span>
                    <span className="text-xs font-bold text-[#708696]">取引相手: 個人買主</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#14243a]">
                    不動産会社が「買主を探すパートナー」になる
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                    不動産ポータルサイト（SUUMO・HOME&apos;S等）やレインズ（指定流通機構）に物件情報を公開し、一般個人の買い手を広く募集します。
                    不動産会社は「媒介契約」に基づき販売活動を行うため、成約時には<strong>宅地建物取引業法第46条に基づく仲介手数料（売買価格の3%+6万円+税等）</strong>が発生します。
                  </p>
                  <div className="rounded-xl bg-[#f0f7f7] p-3.5 text-xs text-[#0a7079] font-bold">
                    📌 特徴: 市場の最高価格で売れる可能性があるが、成約まで平均3〜6ヶ月かかり、売れ残るリスクがある。
                  </div>
                </div>

                {/* 買取の解説カード */}
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#e56f2d] px-2.5 py-1 text-xs font-black text-white">
                      買取（直接売買）の仕組み
                    </span>
                    <span className="text-xs font-bold text-[#708696]">取引相手: 不動産業者</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#14243a]">
                    不動産会社自身が「買い手」となって即時購入する
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#506477]">
                    不動産買取専門会社が買主となり、売主と直接「売買契約」を締結します。
                    第三者を探す仲介業務が存在しないため、<strong>仲介手数料は完全に0円</strong>です。
                    業者は物件のリフォームや解体・再販売を前提として買い取るため、価格は市場相場の約70〜80%程度となります。
                  </p>
                  <div className="rounded-xl bg-[#fff9f5] p-3.5 text-xs text-[#e56f2d] font-bold border border-[#e56f2d]/20">
                    📌 特徴: 価格は2〜3割下がるが、最短数日で即現金化でき、残置物片付けが不要で、売却後の瑕疵責任も原則免除されます。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 2: 比較表 */}
            <section id="comparison" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 「仲介」と「買取」の決定的な違い 6項目徹底比較
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                売却価格、現金化までの期間、仲介手数料、室内の荷物処分・解体費用、契約不適合責任、プライバシー保護の6大項目で、仲介・買取・買取保証を比較します。
              </p>
              <BrokerageBuyoutComparisonTable />
            </section>

            {/* セクション 3: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 実質手取りシミュレーター（仲介 vs 買取）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                額面価格だけでなく、仲介手数料（宅建業法上限）、更地解体費、残置物処分費、売却までの固定資産税・維持費、譲渡所得税を反映し、
                <strong>「最終的に口座に残る現金（手取り額）」</strong>の損益分岐点をシミュレーションします。
              </p>
              <BrokerageVsBuyoutSimulator />
            </section>

            {/* セクション 4: 診断フロー */}
            <section id="decision-flow" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. あなたはどっち？「仲介 vs 買取」意思決定セルフチェック
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                現金化の期日、建物の築年数・劣化状態、手元資金の余裕、売却後の瑕疵トラブルへの許容度など、実務で重要となる5つの基準から最適な選択肢を導き出します。
              </p>
              <BrokerageBuyoutDecisionFlow />
            </section>

            {/* セクション 5: 手順ガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 損をしない売却手法選びの「4ステップ実行手順」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                机上査定での相場把握から実質手取り試算、条件決定、売買契約・引渡しと翌年の確定申告までの正しい進め方を解説します。
              </p>
              <BrokerageBuyoutStepGuide />
            </section>

            {/* セクション 6: 法的根拠と買取相場の内訳 */}
            <section id="legal-facts" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 買取相場が「仲介の7〜8割」になる実務の内訳と法的根拠
              </h2>
              
              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#506477]">
                <p>
                  「買取は買い叩かれるのではないか」と懸念されることがありますが、買取業者が提示する価格には明確な実務的根拠があります。
                  買取会社は買い取った物件を自社で再生・再販して事業収益を上げるため、以下のコストをあらかじめ織り込んでいます。
                </p>

                {/* 内訳インフォグラフィック */}
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-[#14243a] flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#078c95] text-white text-xs">
                      ¥
                    </span>
                    <span>市場相場（100%）と買取価格（70〜80%）の差額の内訳</span>
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-3 text-xs sm:text-sm">
                    <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4 space-y-1.5">
                      <span className="font-bold text-[#078c95] block">① リフォーム・解体工事費</span>
                      <p className="text-xs text-[#506477]">
                        再販のための内外装リノベーション、設備の更新、または古家の解体・地盤調査費用（約10〜15%）。
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4 space-y-1.5">
                      <span className="font-bold text-[#078c95] block">② 取得・再販の諸経費</span>
                      <p className="text-xs text-[#506477]">
                        所有権移転登記費用、不動産取得税、再販時の広告費・仲介手数料、販売までの固定資産税等（約5〜8%）。
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4 space-y-1.5">
                      <span className="font-bold text-[#078c95] block">③ 業者の適正事業利益</span>
                      <p className="text-xs text-[#506477]">
                        在庫保有リスク、再販時の価格下落リスク、雨漏り等の瑕疵改修リスクを担保する事業利益（約8〜12%）。
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#708696] leading-relaxed pt-2">
                    ※売主はこれらの工事費・処分費・販売経費・瑕疵修繕リスクをすべて業者へ移転できるため、その対価として2〜3割の価格差が生じる構造となっています。
                  </p>
                </div>

                {/* 法的根拠解説 */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-black text-[#14243a]">
                    関連法令・公的根拠に基づく重要ルール
                  </h3>

                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#14243a] px-2 py-0.5 text-[11px] font-bold text-white">
                        消費者契約法 第8条
                      </span>
                      <span className="text-xs font-bold text-[#14243a]">
                        買取取引における「契約不適合責任免責特約」の限界
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#506477] leading-relaxed">
                      宅地建物取引業法第40条（買主不利特約の制限）は宅建業者が自ら売主となる場合にのみ適用される規制であり、買取業者が買主となる買取取引には適用されません。買取取引で免責特約の有効性を決めるのは民法（任意規定）と消費者契約法第8条です。同条により、売主が個人（消費者）で買取業者が買主（事業者）の場合、「故意又は重過失によらないで契約不適合を知らなかったときに限り責任を負わない」旨の特約のみ有効で、一切の責任を負わない全面免責特約は無効となります（無効部分は民法の契約不適合責任に戻る）。
                      実務では買取契約の多くがこの範囲内の免責特約を用いるため、知らなかった欠陥を問われる場面は実質的に限られますが、リスクが完全にゼロになるわけではありません。
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#14243a] px-2 py-0.5 text-[11px] font-bold text-white">
                        国土交通省告示 第266号
                      </span>
                      <span className="text-xs font-bold text-[#14243a]">
                        2024年7月1日施行「低廉な空家等の媒介報酬の特例」
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#506477] leading-relaxed">
                      国土交通省は空き家等の流通促進を図るため、2024年（令和6年）7月1日より媒介報酬（仲介手数料）の告示を改正しました。
                      売買価格が800万円以下の低廉な空家等について、通常の計算額（例: 200万円なら11万円+税）にかかわらず、現地調査等の費用を含め<strong>最大33万円（税抜30万円）</strong>まで売主から受領できるよう上限が引き上げられました。
                      低価格な空き家を仲介で売却する場合、手数料負担の比率が高くなる点に留意が必要です。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 7: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 不動産の「仲介」と「買取」よくある質問（FAQ）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                相場や諸経費、買取保証、荷物の取り扱いなど、実務現場でよくある疑問について法的手続きに沿って解説します。
              </p>
              <BrokerageBuyoutFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="brokerage-vs-buyout" />

      <AkiyaFooter />
    </div>
  );
}
