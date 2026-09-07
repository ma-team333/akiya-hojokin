import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GuideSources } from "@/components/guide/GuideSources";
import { AkiyaHeader } from "@/components/editorial/AkiyaHeader";
import { AkiyaFooter } from "@/components/editorial/AkiyaFooter";
import { DiagnosisCard } from "@/components/editorial/DiagnosisCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-jsonld";
import { ChihoShobunSimulator } from "@/components/editorial/chiho-jikka-shobun/ChihoShobunSimulator";
import { ChihoShobunRequirementFlow } from "@/components/editorial/chiho-jikka-shobun/ChihoShobunRequirementFlow";
import { ChihoShobunStepGuide } from "@/components/editorial/chiho-jikka-shobun/ChihoShobunStepGuide";
import { ChihoShobunFaqAccordion } from "@/components/editorial/chiho-jikka-shobun/ChihoShobunFaqAccordion";
import { CHIHO_SHOBUN_FAQ_ITEMS } from "@/components/editorial/chiho-jikka-shobun/article-data";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";

export const metadata: Metadata = {
  title:
    "地方の実家が売れないときの処分方法｜値下げ・買取・空き家バンク・解体・相続放棄の判断順",
  description:
    "地方の実家が売れないときの処分方法を整理。値下げの考え方、不動産会社の買取（仲介手数料の構造）、自治体の空き家バンク、解体しての更地売却（固定資産税特例の解除）、相続土地国庫帰属（審査手数料・10年分の負担金）、自治体への寄付が受け入れられない実務、相続放棄の3か月の期限まで、公的資料（国税庁タックスアンサー・宅建業法・空家等対策特措法）に基づき解説します。処分方法ごとの手取り比較シミュレーター付き。",
  alternates: {
    canonical: "/guide/chiho-jikka-shobun",
  },
  openGraph: {
    title: "地方の実家が売れないときの処分方法｜買取・空き家バンク・解体の判断順",
    description:
      "売れない実家の処分は「権利と期限の確認 → 原因の切り分け → 仲介 → 買取・空き家バンク・解体の比較」の順で整理します。公的資料に基づく手取り比較シミュレーターと状況整理チェック付き。",
    type: "article",
    publishedTime: "2026-08-16T00:00:00Z",
    modifiedTime: "2026-09-05T00:00:00Z",
  },
};

export default function ChihoJikkaShobunArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "地方の実家が売れないときの処分方法",
      path: "/guide/chiho-jikka-shobun",
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "地方の実家が売れないときの処分方法｜値下げ・買取・空き家バンク・解体・相続放棄の判断順",
    description:
      "地方の実家が売れないときの処分方法を、原因の切り分け（価格・立地・建物状態・権利関係）、仲介での売却条件の見直し、買取、空き家バンク、解体しての更地売却、相続放棄の期限まで公的資料に基づき解説。",
    datePublished: "2026-08-16T00:00:00Z",
    dateModified: "2026-09-05T00:00:00Z",
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guide/chiho-jikka-shobun`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(CHIHO_SHOBUN_FAQ_ITEMS);

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
              <span className="text-[#14243a]">実家が売れないときの処分方法</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                売る・手放す
              </span>
              <span className="rounded-full bg-[#14243a] px-3 py-1 text-xs font-bold text-white">
                手取り比較シミュレーター付き
              </span>
              <span className="text-xs font-bold text-[#708696] ml-1">
                公開日: 2026年8月16日
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[#14243a] md:text-4xl">
              地方の実家が売れないときの処分方法｜値下げ・買取・空き家バンク・解体・相続放棄の判断順
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] md:text-base">
              地方の実家は「買い手の需要が少ない立地」「建物の老朽化」「権利関係の未整理」など、売れない原因が重なることが少なくありません。本記事では、原因の切り分けから、仲介での売却条件の見直し、不動産会社の買取、自治体の空き家バンク、解体しての更地売却、相続放棄の期限まで、公的資料（国税庁タックスアンサー・宅地建物取引業法・空家等対策の推進に関する特別措置法等）に基づいて整理します。
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
                  <span className="text-[#078c95]">1.</span> 売れない理由の切り分け
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">2.</span> 処分方法比較シミュレーター
                </a>
              </li>
              <li>
                <a href="#options" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">3.</span> 処分方法7つの比較
                </a>
              </li>
              <li>
                <a href="#donation" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">4.</span> 自治体への寄付の現実と代替
                </a>
              </li>
              <li>
                <a href="#requirements" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">5.</span> 状況整理チェック
                </a>
              </li>
              <li>
                <a href="#steps" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">6.</span> 進め方ステップ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#078c95] flex items-center gap-2">
                  <span className="text-[#078c95]">7.</span> よくある質問
                </a>
              </li>
            </ol>
          </div>

          <article className="space-y-16 sm:space-y-20 leading-relaxed text-[#14243a]">
            {/* セクション 1: 売れない理由の切り分け */}
            <section id="overview" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                1. まず「なぜ売れないか」を切り分ける（4分類）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「売れない」は単一の状態ではありません。実務上は<strong>「価格（値付け）」「立地（買い手の需要）」「建物の状態」「権利関係」</strong>の4つに原因を分けて考えます。価格が高いだけなら値付けの見直しが論点になりますが、立地に買い手の需要がない場合や、相続登記が済んでおらず契約の前提が整っていない場合は、値下げだけでは解決しません。
              </p>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                切り分けの材料は公的に入手できます。国土交通省の<strong>不動産取引価格情報（土地総合情報システム）</strong>では、同一市区町村・近隣の実際の成約事例（成約価格・面積・建物の有無）を検索できます。これに不動産会社2社以上の査定を加えると、提示額の差の背景（立地・建物状態の評価）が見えてきます。権利関係では、相続登記が2024年4月1日から義務化された（相続開始を知った日から3年以内の申請が原則。正当な理由なく怠ると10万円以下の過料＝不動産登記法第76条の2）点の確認が先決です。
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">価格（値付け）</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    周辺の成約事例（不動産取引価格情報）と比べて値付けが高い場合。媒介契約に基づく販売活動報告（内見数・問い合わせ数）と照らし合わせて見直す論点です。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">立地（買い手の需要）</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    需要が少ない立地では、値下げに加えて買取・空き家バンク・更地化など処分方法の変更が論点になります。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">建物の状態</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    古い建物は「古家付き土地」として現状渡しにする方法があります。免責特約を結ぶ場合も、知っている不具合の告知は民法第572条で免責が無効にならない要件です。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">権利関係</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    被相続人名義のままでは売買契約が結べません。相続登記（義務化）・相続人全員の同意・抵当権の3点を確認します。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 2: シミュレーター */}
            <section id="simulator" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                2. 処分方法比較シミュレーター（仲介・買取・解体更地）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                仲介売却・買取・解体して更地売却の3つの方法の手取り概算を、同じ計算根拠（宅建業法第46条の2の仲介手数料上限・国税庁タックスアンサーNo.3208/3258/3302〔令和7年4月1日現在法令等〕）で並べて比較できます。売らずに保有し続けた場合の維持費の累計も試算します。
              </p>
              <ChihoShobunSimulator />
            </section>

            {/* セクション 3: 処分方法6つの比較 */}
            <section id="options" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                3. 処分方法7つの比較（値下げ・買取・空き家バンク・解体・国庫帰属・リースバック・相続放棄）
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                検討の順番に沿って、主な処分方法の構造・費用・期限を整理します。各方法の詳細は当サイトの関連記事でも解説しています。
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ① 仲介での売却条件の見直し（値下げ・古家付き土地・免責特約）
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    値付けが原因なら、周辺成約事例（不動産取引価格情報）と販売活動報告を基に価格を見直します。建物が古い場合は「古家付き土地」として現状渡しとする方法があり、契約不適合責任の免責特約（民法第572条の告知義務に注意）を結ぶのが実務の一般的な形です。関連記事:
                    <Link href="https://www.r-sic.com/furuie/articles/nonconformity-exemption" className="text-[#078c95] underline">
                      契約不適合責任の免責
                    </Link>・
                    <Link href="https://www.r-sic.com/akiya/sell" className="text-[#078c95] underline">
                      空き家を売る流れ
                    </Link>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ② 不動産会社の買取（買主が業者自身となる売買）
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    宅地建物取引業者が自ら買主となるため、買主が決まるまで待つ必要がありません。宅建業法第46条の2の報酬上限は媒介・代理に関する報酬が対象のため、売主の仲介手数料が発生しない構造です。買取価格の公定価格はないため、複数事業者の提示額と根拠の比較が必要です。知っている不具合の告知義務（民法第572条）は残ります。
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ③ 自治体の空き家バンクへの登録
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    国土交通省・総務省「空き家バンクの整備及び運用に関するガイドライン」（平成27年3月）に基づき、市区町村等が空き家情報の登録・公開を行う制度です。登録＝成約の保証ではなく、買い手側の需要は自治体・物件ごとに異なります。登録要件・窓口は市町村ごとに異なるため、実家所在自治体の運用要領で確認します。関連記事:
                    <Link href="/guide/demolition-subsidy" className="text-[#078c95] underline">
                      解体補助金（空き家バンク登録物件の活用を含む）
                    </Link>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ④ 解体しての更地売却
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    解体費用は公定価格がなく複数見積りによる実費です（自治体の解体補助金の有無は市町村で確認）。更地になると土地は住宅用地の特例（地方税法第349条の3）の適用外になり、固定資産税は最大6倍になります。相続した空き家では3,000万円特別控除（国税庁No.3302〔令和7年4月1日現在法令等〕。2024年1月以降は買主による解体も要件変更で容認）や相続税の取得費加算の特例との関係が税務上の判断の分かれ目です。関連記事:
                    <Link href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="text-[#078c95] underline">
                      3,000万円特別控除
                    </Link>・
                    <Link href="https://www.r-sic.com/akiya/articles/acquisition-cost-addition" className="text-[#078c95] underline">
                      取得費加算の特例
                    </Link>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ⑤ 相続土地国庫帰属（自費解体後の更地が前提の公的制度）
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    2023年（令和5年）4月施行の「相続等により取得した土地所有権の国庫への帰属に関する法律」による制度で、承認されれば10年分の土地管理費相当の負担金（原則20万円〜。市街化区域内の宅地は地積に応じた算定）を納付して土地を国に引き取ってもらえます。ただし（1）建物の存する土地は申請自体ができない（却下事由）ため自費での解体と滅失登記済みの更地が実質の前提、（2）審査手数料は1筆につき1万4千円で不承認でも返還されない、（3）擁壁・ブロック塀等の地上工作物の除去が必要な土地や境界不明の土地は不承認・却下リスクが高い、という3つのハードルがあります。詳細（負担金の算定式・不承認事由・申請手順）は
                    <Link href="/guide/kokko-kizoku" className="text-[#078c95] underline">
                      相続土地国庫帰属の解説記事
                    </Link>
                    に委ねてここでは要約のみとします。
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ⑥ リースバック（売却後に住み続ける）
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    実家に住み続けながら現金化する場合はリースバックが選択肢です。国土交通省「住宅のリースバックに関するガイドブック」（令和4年6月24日公表）が仕組みと確認ポイントを整理しています。関連記事:
                    <Link href="/guide/leaseback" className="text-[#078c95] underline">
                      リースバックガイド
                    </Link>
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                  <p className="text-sm font-black text-[#14243a]">
                    ⑦ 相続放棄（期限のある手続・財産全体の判断）
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm leading-loose text-[#506477]">
                    民法第915条第1項により、相続放棄は「自己のために相続の開始があったことを知った時から3か月以内」に家庭裁判所へ申述します。財産の処分行為（売却等）の後は単純承認とみなされ原則不可（民法第921条）で、空き家だけを部分的に放棄することもできません。多くの「売れない実家」のケースでは相続から期間が経過しているため、まずは①〜⑥と管理コストの比較が主戦場になります。
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 text-xs sm:text-sm text-[#506477] shadow-sm">
                <h4 className="font-bold text-[#14243a] text-sm sm:text-base">保有し続ける場合に確認する数字とリスク</h4>
                <p className="mt-2.5 leading-loose">
                  処分しない場合も、（1）固定資産税・都市計画税の年額（納税通知書）、（2）維持管理費・通いの費用、（3）特定空家等・管理不全空家として勧告を受けると住宅用地特例が解除され土地の固定資産税が最大6倍になるリスク（地方税法第349条の3・空家等対策特措法）の3点を数字で把握することが意思決定の前提です。関連記事:
                  <Link href="/guide/maintenance-cost-risk" className="text-[#078c95] underline">
                    空き家の維持費・放置リスク
                  </Link>・
                  <Link href="/guide/tokutei-akiya-tax" className="text-[#078c95] underline">
                    特定空家・管理不全空家と固定資産税
                  </Link>・
                  <Link href="https://www.r-sic.com/insight/T-372" className="text-[#078c95] underline">
                    売れない空き家の出口6つ
                  </Link>
                </p>
              </div>
            </section>

            {/* セクション 4: 自治体への寄付の現実と代替 */}
            <section id="donation" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                4. 「自治体への寄付」は原則受け入れてもらえない現実と現実的な代替ルート
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                「売れないなら自治体に寄付すればいい」と考えがちですが、寄付（贈与）は相手側の受諾が前提になる契約です。自治体は受け取った土地の管理責任と費用（除草・撤去・固定資産税相当の管理コスト）を負うため、道路・公園など公共施設の用に供するなど公的な利用目的が認められる土地以外は、受寄を辞退するのが実務上の原則です。寄付の受付方針（要綱）は自治体ごとに異なるため、打診先は実家所在自治体の資産管理・都市計画部門になります。なお、管理を望まない相続土地の引き取り先がないという課題への対応として2023年に国庫帰属制度が創設された経緯（法務省）自体が、「寄付では処分できない土地が相当数ある」という制度環境を示しています。
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">代替① 隣地所有者への打診</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    境界が接する隣地の所有者は、敷地の拡張・駐車場・建て替え等でその土地に最も価値を見出しやすい買主です。登記（地図・土地家屋調査士の境界確認）を整えたうえでの打診が現実的な第一候補になります。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">代替② 民間への引き取り（買取）</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    不動産会社の買取（本記事の②）や空き家バンク経由の需要に加え、古家付き土地・更地を専門とする買取業者の提示額を複数比較するルートです。買取価格の公定価格はないため提示額と根拠の比較が前提です。
                  </p>
                </div>
                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 sm:p-6 shadow-sm">
                  <p className="text-xs font-black text-[#078c95]">代替③ 国庫帰属・解体更地の検討</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
                    民間の引き取りもつかない場合は、自費解体後の更地売却（④）・相続土地国庫帰属（⑤）という「費用を払って手放す」公的ルートの損益比較に進みます。いずれも事前費用（解体費・審査手数料）は結果にかかわらず返還されません。
                  </p>
                </div>
              </div>
            </section>

            {/* セクション 5: 状況整理チェック */}
            <section id="requirements" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                5. 売れない実家の処分を決める「状況整理チェック（6項目）」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                処分方法を比べる前提として、原因の切り分け・権利関係・保有コスト・更地化・市町村の制度・期限の6項目を整理できているか確認できます。
              </p>
              <ChihoShobunRequirementFlow />
            </section>

            {/* セクション 6: ステップガイド */}
            <section id="steps" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                6. 売れない実家の処分を決める「5ステップ手順」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                権利関係と期限の確認から始めて、原因の切り分け、仲介での売却活動、代替処分の比較、売却後の申告・保有管理までを手順化しました。
              </p>
              <ChihoShobunStepGuide />
            </section>

            {/* セクション 7: FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="border-b border-[#dfe9ee] pb-4 text-2xl font-black text-[#14243a] sm:text-3xl leading-snug">
                7. 実家が売れないときの処分方法「よくある質問（FAQ）」
              </h2>
              <p className="text-sm leading-8 text-[#506477] md:text-base">
                値下げの考え方、買取と仲介の違い、空き家バンクの仕組み、解体と固定資産税、相続放棄の期限、遠方からの手続き、判断の順番まで回答します。
              </p>
              <ChihoShobunFaqAccordion />
            </section>
          </article>

          {/* 査定・診断への誘導カード */}
          <div className="mt-20 border-t border-[#dfe9ee] pt-16">
            <DiagnosisCard />
          </div>
        </div>
      </main>

      <GuideSources slug="chiho-jikka-shobun" />

      <AkiyaFooter />
    </div>
  );
}
