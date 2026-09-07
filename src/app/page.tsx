import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">AKIYA × LOCAL SUPPORT</p>
            <h1>空き家のこれからを、<em>制度</em>から見つける。</h1>
            <p className="lede">
              空き家の活用や解体を考えはじめた人へ。自治体の補助金を、原典と確認日がわかる形で整理する情報サイトです。
            </p>
          </div>
          <aside className="hero-card" aria-label="サイトの約束">
            <p className="eyebrow">OUR PROMISE</p>
            <h2>情報の出どころまで、迷わせない。</h2>
            <p>制度名だけで終わらず、自治体の公式ページへ戻れる情報設計を目指します。</p>
            <ul className="card-list">
              <li>補助金の対象・上限・要件を整理</li>
              <li>原典URLと確認日を明記</li>
              <li>推計・集計値は一次情報と区別</li>
            </ul>
          </aside>
        </div>
      </section>
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">START HERE</p>
          <h2>最初に読む4つのページ</h2>
          <p className="lede">空き家の判断材料（ガイド）から、自治体の補助金情報、検証方針、運営情報まで。原典確認を経て順次拡張します。</p>
        </div>
        <div className="section-grid">
          <Link className="info-card" href="/guide">
            <span className="number">01</span>
            <h3>空き家ガイドを読む</h3>
            <p>売却・解体補助金・管理・土地じまいの13記事を、出典と確認日つきで整理。売りにくい家・土地じまいのテーマもあります。</p>
          </Link>
          <Link className="info-card" href="/subsidies">
            <span className="number">02</span>
            <h3>補助金を探す</h3>
            <p>都道府県・市区町村ごとの補助金レジストリ。公開情報は原典へたどれます。</p>
          </Link>
          <Link className="info-card" href="/verification">
            <span className="number">03</span>
            <h3>検証方針を見る</h3>
            <p>どの情報を掲載し、いつ見直すのか。データの確認フローを公開します。</p>
          </Link>
          <Link className="info-card" href="/operator">
            <span className="number">04</span>
            <h3>運営情報を確認</h3>
            <p>このサイトの運営者、所在地、連絡手段、グループ内での位置づけ。</p>
          </Link>
        </div>
        <div className="notice">
          補助金の採択や交付を保証するものではありません。申請前に、必ず各自治体の最新の公表情報をご確認ください。
        </div>
      </section>
    </>
  );
}
