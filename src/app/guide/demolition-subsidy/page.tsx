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
import { VERIFIED_MUNICIPALITY_PROGRAMS } from "@/lib/renewal/demolition-subsidy";
import {
  DemolitionSubsidySimulator,
  DemolitionRequirementFlow,
  DemolitionLandUseTable,
  DemolitionStepGuide,
  DemolitionFaqAccordion,
  DEMOLITION_FAQ_ITEMS,
} from "@/components/editorial/demolition-subsidy";

const PAGE_TITLE =
  "空き家解体補助金は自治体でいくらもらえる？申請時期・立替キャッシュフロー・固定資産税影響と跡地活用まで完全解説";
const VERIFIED_CAPS = VERIFIED_MUNICIPALITY_PROGRAMS.flatMap((program) =>
  program.max_amount == null ? [] : [program.max_amount],
);
const VERIFIED_CAP_MIN_MAN = Math.min(...VERIFIED_CAPS) / 10_000;
const VERIFIED_CAP_MAX_MAN = Math.max(...VERIFIED_CAPS) / 10_000;
const VERIFIED_CAP_RANGE = `${VERIFIED_CAP_MIN_MAN}万円〜${VERIFIED_CAP_MAX_MAN}万円`;
const VERIFIED_PROGRAM_COUNT = VERIFIED_MUNICIPALITY_PROGRAMS.length;

const PAGE_DESCRIPTION =
  `市区町村の空き家解体補助金（除却補助金）の交付条件を解説。全国一律の相場は置かず、一次情報で確認済みの${VERIFIED_PROGRAM_COUNT}自治体では上限${VERIFIED_CAP_RANGE}の幅。着工前確認、年度ごとの募集期間・予算枠、立替キャッシュフロー、解体後の固定資産税影響と跡地活用をシミュレーター付きで整理します。`;
const PAGE_CANONICAL = "/guide/demolition-subsidy";
const PUBLISHED_DATE = "2026-08-15";
const UPDATED_DATE = "2026-08-20";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_CANONICAL,
  },
  openGraph: {
    title:
      "空き家解体補助金は自治体でいくらもらえる？対象条件・申請手順・立替資金・固定資産税変化と跡地活用",
    description:
      "自治体空き家解体補助金の受給要件、補助率・上限額、契約・着工前の確認事項、年度ごとの募集期間・予算枠・受付方式、立替キャッシュフロー、更地後の固定資産税変化を解説。",
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    modifiedTime: `${UPDATED_DATE}T00:00:00Z`,
  },
};

export default function DemolitionSubsidyArticlePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "トップ", path: "/" },
    { name: "ガイド", path: "/guide" },
    {
      name: "空き家解体補助金と自治体制度",
      path: PAGE_CANONICAL,
    },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: `${PUBLISHED_DATE}T00:00:00Z`,
    dateModified: `${UPDATED_DATE}T00:00:00Z`,
    author: { "@type": "Organization", name: "空き家補助金ナビ 編集部", url: SITE_URL },
    publisher: { "@type": "Organization", name: "空き家補助金ナビ", url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${PAGE_CANONICAL}`,
    },
  };

  const faqJsonLd = buildFaqJsonLd(DEMOLITION_FAQ_ITEMS);

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
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <Link
                href="/guide"
                className="hover:text-[#078c95]"
              >
                制度・税金
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-[#14243a]">解体補助金と自治体支援</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                制度・税金
              </span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087f88] shadow-sm border border-[#bbd8dc]">
                自治体助成金
              </span>
              <span className="rounded-full bg-[#fdf2eb] px-3 py-1 text-xs font-bold text-[#e56f2d] border border-orange-200">
                2026年最新制度対応
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight text-[#14243a] sm:text-3xl lg:text-4xl">
              空き家解体補助金は自治体でいくらもらえる？申請時期・立替キャッシュフロー・固定資産税影響と跡地活用まで完全解説
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-[#506477] sm:text-base">
              空き家解体補助金（除却費助成）は自治体ごとに制度・補助率・上限額が異なり、全国一律の相場帯はありません。このサイトで一次情報を確認済みの{VERIFIED_PROGRAM_COUNT}自治体では上限{VERIFIED_CAP_RANGE}の幅があります。制度ごとの募集期間・予算枠、立替キャッシュフロー、解体後の住宅用地特例解除に伴う固定資産税変化と跡地活用プランを解説します。
            </p>
            {/* 正準衝突解消（SOB-576 step-1 方式）: この記事=制度の全知識（media）。「自治体の受付状況を入れて解体するか判断する」は判断ページが単一オーナー */}
            <div className="mt-4 rounded-xl border border-[#078c95]/30 bg-[#e6f4f5]/60 p-4 text-sm">
              <p className="font-bold text-[#14243a]">ご自身の自治体の受付状況を確認して「解体するかどうか」を判断する</p>
              <p className="mt-1 text-[#334155]">この記事は制度の一般知識の解説です。自治体名を入れて受付状況（受付中・終了・未確認）を確認し、解体の判断を進めるのは専用の判断ページです。</p>
              <Link
                href="https://www.r-sic.com/akiya/akiya-demolition-subsidy/"
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#078c95] px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#06727a]"
              >
                解体補助金の判断ページで自治体の状況を確認する →
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-[#708696]">
              <span>公開日: {PUBLISHED_DATE}</span>
              <span>•</span>
              <span>更新日: {UPDATED_DATE}</span>
              <span>•</span>
              <span>根拠法令: 空家等対策特措法 / 地方税法第349条</span>
            </div>
          </div>
        </header>

        {/* 記事本文レイアウト */}
        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8 md:py-14">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-8">
              {/* リード文ブロック */}
              <section className="rounded-2xl border border-[#dfe9ee] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-black text-[#14243a] sm:text-xl">
                  解体補助金活用の重要ポイント（要約）
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#334155]">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-xs font-black text-white">
                      1
                    </span>
                    <p>
                      <strong>着工前の事前申請が必須:</strong>{" "}
                      交付決定通知書を受領する前に契約または着工した工事は、いかなる理由があっても補助金交付の対象外となります。
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-xs font-black text-white">
                      2
                    </span>
                    <p>
                      <strong>募集期間・予算枠は自治体ごとに確認:</strong>{" "}
                      受付開始日、締切、予算上限、先着・抽選などの運用は制度ごとに異なります。契約・着工前に当年度の公式要項と受付状況を確認してください。
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-xs font-black text-white">
                      3
                    </span>
                    <p>
                      <strong>工事代金の全額立替が必要（後払い）:</strong>{" "}
                      補助金は完了実績報告と現地検査後の支給となるため、解体業者への工事代金全額を手元資金等で一時的に立て替える必要があります。
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-xs font-black text-white">
                      4
                    </span>
                    <p>
                      <strong>更地化による固定資産税の増税影響:</strong>{" "}
                      解体後に更地のまま賦課期日（1月1日）を越えると住宅用地特例（1/6減額）が外れるため、年内の売却・引渡しや跡地活用プランの事前策定が不可欠です。
                    </p>
                  </div>
                </div>
              </section>

              {/* 第1章: 補助金の基本構造と相場 */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  1. 空き家解体補助金とは？自治体が支給する主な類型と制度差
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  空家等対策の推進に関する特別措置法に基づき、放置された危険な空き家の倒壊や防災上の危害を防止するため、全国の多くの市区町村で「空き家除却費補助金（解体助成金）」が創設されています。
                </p>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  補助制度は自治体ごとに名称や要件が異なりますが、主として以下の4つの類型に大別されます。
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5">
                    <div className="text-xs font-bold text-[#078c95]">類型 01</div>
                    <h3 className="mt-1 text-base font-bold text-[#14243a]">
                      老朽危険空家除却補助金
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                      倒壊の危険度が高い空き家（特定空家等判定基準や不良住宅評点基準を満たす建物）を対象とする制度。補助率・上限額は自治体の要綱ごとに異なります。一次情報で確認済みの自治体データは、上限{VERIFIED_CAP_RANGE}の範囲で、最新値は専用の判断ページに確認日付きで表示します。
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5">
                    <div className="text-xs font-bold text-[#078c95]">類型 02</div>
                    <h3 className="mt-1 text-base font-bold text-[#14243a]">
                      木造住宅除却・耐震関連補助金
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                      昭和56年（1981年）5月31日以前の旧耐震基準で建築された木造住宅を対象とした除却助成。耐震診断で評点が基準未満と判定された建物の除却に対し、自治体ごとの募集要項で定める定額または一部助成が行われます（金額は各自治体の要項で確認してください）。
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5">
                    <div className="text-xs font-bold text-[#078c95]">類型 03</div>
                    <h3 className="mt-1 text-base font-bold text-[#14243a]">
                      密集市街地・狭小地防災除却補助
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                      消防車や緊急車両が進入困難な狭隘道路沿いや密集市街地における延焼防止を目的とした制度。重機搬入困難に伴う割増費用等を補助対象とし、自治体によっては高額の補助枠が設けられている例があります（上限額は各自治体の要項で確認してください）。
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#dfe9ee] bg-white p-5">
                    <div className="text-xs font-bold text-[#078c95]">類型 04</div>
                    <h3 className="mt-1 text-base font-bold text-[#14243a]">
                      跡地活用型除却補助金
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#506477]">
                      解体後の更地を地域のコミュニティ用地、防災広場、定住促進住宅用地、空き家バンク登録用地として一定期間活用することを条件に除却費を助成する制度です。
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-[#f0f4f8] p-4 text-xs text-[#506477] leading-relaxed">
                  <strong>【公的根拠・制度の財源構成】</strong>
                  <br />
                  国の支援事業が自治体の除却支援の財源に使われる場合がありますが、所有者が受ける補助率・上限額は各市区町村の条例・要綱で決まります。国の負担割合を、そのまま所有者向け補助率として扱うことはできません。
                </div>
              </section>

              {/* 第2章: 要件診断フロー */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  2. 我が家はもらえる？受給要件セルフチェック
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  空き家解体補助金を受給するためには、建物の老朽度や建築時期、所有者要件、税務状況など複数の条件を同時に満たす必要があります。以下のチェックフローで該当状況を確認できます。
                </p>

                <DemolitionRequirementFlow />
              </section>

              {/* 第3章: シミュレーター（解体費用・補助金・立替資金・固定資産税） */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  3. 解体費用と補助金のシミュレーション【構造・坪数別】
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  建物の構造（木造・鉄骨造・RC造）や延床面積、現況立地条件によって解体工事の概算費用は大きく変動します。自治体の補助率・上限額を設定し、実質自己負担額、一時立替必要資金、更地後の固定資産税変化を試算します。
                </p>

                <DemolitionSubsidySimulator />
              </section>

              {/* 第4章: 申請手順・募集スケジュール・立替キャッシュフロー */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  4. 失敗しない申請手順とタイムライン【募集期間・予算枠・立替払いの実務】
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  解体補助金の実務において最も重要な注意点は「申請スケジュール」と「資金計画（キャッシュフロー）」です。
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 space-y-3">
                  <h3 className="text-sm font-black text-amber-900 flex items-center gap-2">
                    <span>⚠️</span>
                    実務で押さえるべき2大重要事項
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
                    <p>
                      <strong>① 当年度の受付期間・予算状況を先に確認する:</strong>
                      <br />
                      受付開始日、締切、予算枠、先着・抽選などの運用は自治体ごとに異なります。解体を検討する場合は、契約や着工の前に公式要項と担当窓口で当年度の受付状況を確認し、必要な事前審査・書類をそろえてください。
                    </p>
                    <p>
                      <strong>② 工事代金の全額立替が必要なキャッシュフロースキーム:</strong>
                      <br />
                      補助金は「解体業者への工事代金全額支払い」および「完了実績報告書・領収書提出後の完了検査」を経て交付されます。解体工事の着工から補助金受給までには数ヶ月を要するのが一般的で、その間は工事費用全額を手元資金等で立替負担する必要があります。
                    </p>
                  </div>
                </div>

                <DemolitionStepGuide />
              </section>

              {/* 第5章: 固定資産税の特例解除と跡地活用プラン */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  5. 解体後の落とし穴！固定資産税の特例除外と跡地活用プラン
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  住宅が建っている土地には、地方税法第349条の3の2に基づき「住宅用地の課税標準の特例（200㎡以下の小規模住宅用地は課税標準額が1/6、200㎡超の一般住宅用地は1/3に減額）」が適用されています。
                </p>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  建物を解体して更地にすると、毎年1月1日（賦課期日）時点で住宅が存在しないため、本特例が適用除外となります。小規模住宅用地は固定資産税の課税標準が1/6から本則へ戻るため比較上は最大6倍、都市計画税は1/3から本則へ戻るため最大3倍です。実際の税負担は負担調整措置や土地ごとの条件で異なります。
                </p>

                <DemolitionLandUseTable />
              </section>

              {/* 第6章: よくある質問 FAQ */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-[#14243a] sm:text-2xl border-l-4 border-[#078c95] pl-3">
                  6. 空き家解体補助金に関するよくある質問（FAQ）
                </h2>
                <p className="text-sm leading-relaxed text-[#334155] sm:text-base">
                  解体補助金の申請タイミング、複数相続人時の同意、指定業者要件、他制度との併用など、読者から多く寄せられる質問と回答をまとめました。
                </p>

                <DemolitionFaqAccordion />
              </section>

              {/* 第7章: まとめ */}
              <section className="rounded-2xl border border-[#dfe9ee] bg-[#f8fafc] p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-black text-[#14243a] sm:text-xl">
                  7. まとめ：解体補助金申請の実務チェックリスト
                </h2>
                <p className="text-sm leading-relaxed text-[#334155]">
                  空き家解体補助金は、要件に合えば解体費の自己負担を軽減できる公的支援制度です。補助率・上限額・受付状況は自治体ごとに異なるため、解体後の税負担や維持管理リスクも含めて次の順序で確認してください。
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[#334155]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#078c95]">✔</span>
                    <span>工事の契約・着工前に、物件所在地の市区町村窓口で制度の有無と要件を確認する</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#078c95]">✔</span>
                    <span>当年度の募集期間・予算枠・受付方式を確認し、契約・着工前に交付申請を行う</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#078c95]">✔</span>
                    <span>解体費用の全額立替資金を準備し、実績報告から入金までのキャッシュフローを確保する</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#078c95]">✔</span>
                    <span>解体後の住宅用地特例解除（増税）を見据え、年内売却や活用方針を事前に決定する</span>
                  </div>
                </div>
              </section>
            </div>

            {/* サイドバー（診断・関連記事ナビ） */}
            <aside className="space-y-6 lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <DiagnosisCard />

                <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-black text-[#14243a]">
                    関連する制度・税金解説記事
                  </h3>
                  <div className="mt-4 space-y-3 text-xs">
                    <Link
                      href="/guide/tokutei-akiya-tax"
                      className="block rounded-lg border border-[#dfe9ee] p-3 hover:border-[#078c95] hover:bg-[#f0f7f7] transition-all"
                    >
                      <span className="font-bold text-[#078c95]">
                        特定空家・管理不全空家と固定資産税
                      </span>
                      <p className="mt-1 text-[#506477]">
                        放置による固定資産税6倍増リスクと勧告回避の要件解説
                      </p>
                    </Link>
                    <Link
                      href="https://www.r-sic.com/akiya/articles/3000man-deduction"
                      className="block rounded-lg border border-[#dfe9ee] p-3 hover:border-[#078c95] hover:bg-[#f0f7f7] transition-all"
                    >
                      <span className="font-bold text-[#078c95]">
                        相続空き家3,000万円特別控除
                      </span>
                      <p className="mt-1 text-[#506477]">
                        更地売却時の譲渡所得税控除要件と確定申告手順
                      </p>
                    </Link>
                    <Link
                      href="https://www.r-sic.com/akiya/articles/sale-tax-cost"
                      className="block rounded-lg border border-[#dfe9ee] p-3 hover:border-[#078c95] hover:bg-[#f0f7f7] transition-all"
                    >
                      <span className="font-bold text-[#078c95]">
                        空き家売却の諸費用と手取り試算
                      </span>
                      <p className="mt-1 text-[#506477]">
                        仲介手数料・登記費用・解体費用を含めた手取り最大化
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <GuideSources slug="demolition-subsidy" />

      <AkiyaFooter />
    </div>
  );
}
