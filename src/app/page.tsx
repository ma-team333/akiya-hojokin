import Link from "next/link";
import { prefectures, subsidies } from "@/lib/registry";

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
            <div className="registry-stats" aria-label="レジストリ件数">
              <strong>{prefectures.length}<span>都道府県ハブ</span></strong>
              <strong>{subsidies.length}<span>初期市候補</span></strong>
              <strong>3<span>収集源</span></strong>
            </div>
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
          <p className="eyebrow">INITIAL CITY SPIKE</p>
          <h2>初期市の制度候補</h2>
          <p className="lede">20市の候補をプレビューとして掲載。人間スポット検証を経るまで、申請情報として公開しません。</p>
        </div>
        <div className="city-grid">
          {subsidies.map((record) => (
            <Link className="city-card" href={`/${record.prefectureSlug}/${record.citySlug}`} key={`${record.prefectureSlug}-${record.citySlug}`}>
              <span className="city-prefecture">{record.prefecture}</span>
              <strong>{record.city}</strong>
              <span className="city-status">原典確認待ち · {record.checkedOn}</span>
            </Link>
          ))}
        </div>
        <div className="notice">
          補助金の採択や交付を保証するものではありません。申請前に、必ず各自治体の最新の公表情報をご確認ください。
        </div>
      </section>
    </>
  );
}
