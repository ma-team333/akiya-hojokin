import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "売却ノウハウ・法律特約の記事一覧",
  description:
    "古い・傷んだ家を売るときのノウハウと法律特約。契約不適合責任免責や旗竿地の売却相場など、公開済みの記事をまとめています。",
  alternates: { canonical: "/furuie/articles" },
  openGraph: {
    title: "売却ノウハウ・法律特約の記事一覧",
    description:
      "古い・傷んだ家を売るときのノウハウと法律特約。契約不適合責任免責や旗竿地の売却相場など、公開済みの記事をまとめています。",
    type: "website",
  },
};

export default function FuruieArticlesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">空き家補助金ナビ</p>
        <h1>売却ノウハウ・法律特約の記事一覧</h1>
        <p className="lede">古い・傷んだ家を売るために知っておきたい、法律特約と売却相場の記事です。</p>
      </div>

      <div className="section-grid">
        <div className="info-card">
          <p className="number">法律特約</p>
          <h3>
            <Link href="/furuie/articles/nonconformity-exemption">
              【民法対応】古家付き土地売却の契約不適合責任免責とは？特約条文とリスク診断
            </Link>
          </h3>
          <p>築古物件を安心して売却するための契約不適合責任免責ノウハウ。告知義務の境界線、地中埋設物対策、免責特約付き売買契約書の作成ポイントを網羅。</p>
          <p>
            <time dateTime="2026-08-15">2026.08.15</time>
          </p>
        </div>
      </div>

      <div className="notice">
        <p>
          旗竿地・再建築不可・擁壁などのテーマは、空き家の売却ノウハウ記事（www.r-sic.com 内）に統合しました。
          <a href="https://www.r-sic.com/akiya/articles/hatazaochi-sale">旗竿地（敷延）の売却相場</a>
          ・
          <a href="https://www.r-sic.com/akiya/articles/saikenchikufuka-exit">再建築不可物件の売却と出口戦略</a>
          ・
          <a href="https://www.r-sic.com/akiya/articles/retaining-wall-sale">擁壁・がけ条例物件の売却</a>
        </p>
      </div>

      <div className="prose">
        <p>
          <Link href="/furuie">売りにくい家研究所の判断カードを見る →</Link>
        </p>
      </div>
    </div>
  );
}
