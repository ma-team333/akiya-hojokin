import { notFound } from 'next/navigation';
import { getSubsidiesForPrefecture, prefectures } from '../../src/lib/registry';

export function generateStaticParams() {
  return prefectures.map(([prefecture]) => ({ prefecture }));
}

export default async function PrefecturePage({ params }: { params: Promise<{ prefecture: string }> }) {
  const { prefecture } = await params;
  const prefectureRow = prefectures.find(([slug]) => slug === prefecture);
  if (!prefectureRow) notFound();
  const records = getSubsidiesForPrefecture(prefecture);
  return (
    <div className="shell page-shell">
      <a className="back-link" href="/">← 都道府県一覧</a>
      <section className="page-hero"><p className="eyebrow">PREFECTURE HUB</p><h1>{prefectureRow[1]}の空き家支援制度</h1><p className="lead">市区町村ごとの制度を、原典URL・確認日・検証状態とともに掲載します。</p></section>
      <section className="section">
        <div className="notice"><strong>検証ゲート</strong><span>機械生成候補は人間スポット検証が完了するまで「プレビュー」として扱います。</span></div>
        {records.length === 0 ? <div className="empty-card">初期スパイク対象外です。制度あり確認後、このハブに市区町村を追加します。</div> : <div className="city-grid">{records.map((record) => <a className="city-card" href={`/${record.prefectureSlug}/${record.citySlug}/`} key={record.citySlug}><span className="city-prefecture">{record.prefecture}</span><strong>{record.city}</strong><span className="city-status">{record.publicationStatus === 'published' ? '公開' : 'プレビュー'} · {record.checkedOn}</span></a>)}</div>}
      </section>
    </div>
  );
}
