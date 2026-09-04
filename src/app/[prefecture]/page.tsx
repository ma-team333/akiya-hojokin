import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSubsidiesForPrefecture, prefectures } from '@/lib/registry';

export function generateStaticParams() {
  return prefectures.map(([prefecture]) => ({ prefecture }));
}

export default async function PrefecturePage({ params }: { params: Promise<{ prefecture: string }> }) {
  const { prefecture } = await params;
  const prefectureRow = prefectures.find(([slug]) => slug === prefecture);
  if (!prefectureRow) notFound();
  const records = getSubsidiesForPrefecture(prefecture);
  return (
    <div className="page">
      <Link className="back-link" href="/subsidies">← 補助金を探す</Link>
      <div className="page-header"><p className="eyebrow">PREFECTURE HUB</p><h1>{prefectureRow[1]}の空き家支援制度</h1><p className="lede">市区町村ごとの制度を、原典URL・確認日・検証状態とともに掲載します。</p></div>
      <div className="notice"><strong>検証ゲート</strong> 機械生成候補は人間スポット検証が完了するまで「プレビュー」として扱います。</div>
      {records.length === 0 ? <div className="info-card">初期スパイク対象外です。制度あり確認後、このハブに市区町村を追加します。</div> : <div className="city-grid">{records.map((record) => <Link className="city-card" href={`/${record.prefectureSlug}/${record.citySlug}`} key={record.citySlug}><span className="city-prefecture">{record.prefecture}</span><strong>{record.city}</strong><span className="city-status">プレビュー · {record.checkedOn}</span></Link>)}</div>}
    </div>
  );
}
