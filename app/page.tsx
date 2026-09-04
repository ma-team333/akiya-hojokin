import { prefectures, subsidies } from '../src/lib/registry';

export default function HomePage() {
  return (
    <div className="shell">
      <section className="hero">
        <p className="eyebrow">SUBSIDY REGISTRY / SPIKE</p>
        <h1>空き家の次の一手を、<br />自治体の原典から。</h1>
        <p className="lead">補助制度、空き家率、解体相場を自治体ハブに集約。制度の内容は必ず原典URLと確認日をたどれます。</p>
        <div className="stats" aria-label="レジストリ件数">
          <div><strong>{prefectures.length}</strong><span>都道府県ハブ</span></div>
          <div><strong>{subsidies.length}</strong><span>初期市候補</span></div>
          <div><strong>3</strong><span>収集源</span></div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading"><div><p className="eyebrow">PREFECTURE HUBS</p><h2>都道府県から探す</h2></div><span className="muted">制度あり確認後に市区町村を追加</span></div>
        <div className="prefecture-grid">
          {prefectures.map(([slug, name]) => <a className="prefecture-card" href={`/${slug}/`} key={slug}><span>{name}</span><span aria-hidden="true">↗</span></a>)}
        </div>
      </section>
      <section className="section city-section">
        <div className="section-heading"><div><p className="eyebrow">INITIAL CITY SPIKE</p><h2>初期市の制度候補</h2></div><span className="muted">人間確認ゲート: 未完了</span></div>
        <div className="city-grid">
          {subsidies.map((record) => <a className="city-card" href={`/${record.prefectureSlug}/${record.citySlug}/`} key={`${record.prefectureSlug}-${record.citySlug}`}><span className="city-prefecture">{record.prefecture}</span><strong>{record.city}</strong><span className="city-status">原典確認待ち · {record.checkedOn}</span></a>)}
        </div>
      </section>
    </div>
  );
}
