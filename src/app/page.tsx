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
          <h2>最初に読む3つのページ</h2>
          <p className="lede">いま公開しているのは、補助金情報を安全に探すための骨格です。自治体ごとの制度情報は、原典確認を経て順次追加します。</p>
        </div>
        <div className="section-grid">
          <Link className="info-card" href="/subsidies">
            <span className="number">01</span>
            <h3>補助金を探す</h3>
            <p>都道府県・市区町村ごとの補助金レジストリ。公開情報は原典へたどれます。</p>
          </Link>
          <Link className="info-card" href="/verification">
            <span className="number">02</span>
            <h3>検証方針を見る</h3>
            <p>どの情報を掲載し、いつ見直すのか。データの確認フローを公開します。</p>
          </Link>
          <Link className="info-card" href="/operator">
            <span className="number">03</span>
            <h3>運営情報を確認</h3>
            <p>このサイトの運営者、所在地、連絡手段、グループ内での位置づけ。</p>
          </Link>
        </div>
        <div className="notice">
          補助金の採択や交付を保証するものではありません。申請前に、必ず各自治体の最新の公表情報をご確認ください。
        </div>
      </section>
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">DECIDE</p>
          <h2>空き家の次の一手を決める判断ページ</h2>
          <p className="lede">売り方・総費用・管理・解体補助金を、比較表と確認事項で整理します。</p>
        </div>
        <div className="section-grid">
          <Link className="info-card" href="/akiya-sale-route">
            <span className="number">01</span>
            <h3>空き家の売り方を比べる</h3>
            <p>現況仲介・古家付き土地・解体後・買取を同じ軸で比較。</p>
          </Link>
          <Link className="info-card" href="/jikka-jimai">
            <span className="number">02</span>
            <h3>実家じまいの総額を積み上げる</h3>
            <p>売却諸費用・解体費・残置物処分を「必要・不要・不明」に分けて確認。</p>
          </Link>
          <Link className="info-card" href="/demolition-subsidy">
            <span className="number">03</span>
            <h3>解体補助金の可否を確認する</h3>
            <p>自治体ごとの制度の有無・要件・受付状況を原典付きで確認。</p>
          </Link>
          <Link className="info-card" href="/akiya-management-service">
            <span className="number">04</span>
            <h3>管理と売却を総費用で比べる</h3>
            <p>1年・3年・5年の総保有コストで「持ち続ける意味」を判断。</p>
          </Link>
          <Link className="info-card" href="/old-house-sale-comparison">
            <span className="number">05</span>
            <h3>古い家の5つの売り方を比べる</h3>
            <p>壊す・直す・このままを、状態と先行費用の軸で比較。</p>
          </Link>
          <Link className="info-card" href="/furuie">
            <span className="number">06</span>
            <h3>売りにくい家研究所</h3>
            <p>古い・傷んだ家の現況売却・修繕・解体を比較する判断ページ。</p>
          </Link>
          <Link className="info-card" href="/tochi-jimai">
            <span className="number">07</span>
            <h3>土地じまい</h3>
            <p>土地を売るか持つか、国庫帰属など処分の選択肢を整理。</p>
          </Link>
        </div>
      </section>
    </>
  );
}
