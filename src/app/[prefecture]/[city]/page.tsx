import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSubsidy, subsidies } from '@/lib/registry';

export function generateStaticParams() {
  return subsidies.map(({ prefectureSlug, citySlug }) => ({ prefecture: prefectureSlug, city: citySlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ prefecture: string; city: string }> }): Promise<Metadata> {
  const { prefecture, city } = await params;
  const record = getSubsidy(prefecture, city);
  return { title: record ? `${record.city}の空き家支援制度` : '制度情報' };
}

export default async function CityPage({ params }: { params: Promise<{ prefecture: string; city: string }> }) {
  const { prefecture, city } = await params;
  const record = getSubsidy(prefecture, city);
  if (!record) notFound();
  const isPublic = record.humanReviewStatus === 'approved' && record.publicationStatus === 'published';
  return (
    <div className="page">
      <Link className="back-link" href={`/${record.prefectureSlug}`}>← {record.prefecture}ハブ</Link>
      <div className="page-header"><p className="eyebrow">CITY SUBSIDY RECORD</p><h1>{record.city}の空き家支援制度</h1><p className="lede">制度の申請前に、必ず自治体の原典で最新の要件をご確認ください。</p></div>
      {!isPublic && <div className="gate-warning"><strong>人間確認前のプレビュー</strong><span>自動収集・構造化された段階です。公開判定が完了するまで、申請判断に使わないでください。</span></div>}
      <article className="record-card">
        <span className="status-pill">{isPublic ? '検証済み公開' : '検証待ち'}</span>
        <h2>{record.programName}</h2>
        <table className="meta-table"><tbody><tr><th>対象</th><td>{record.target}</td></tr><tr><th>上限</th><td>{record.maxAmount}</td></tr><tr><th>主な要件</th><td>{record.requirements}</td></tr><tr><th>確認日</th><td>{record.checkedOn}</td></tr><tr><th>原典URL</th><td><a href={record.originalUrl} rel="noreferrer" target="_blank">{record.originalUrl} ↗</a></td></tr></tbody></table>
      </article>
      <p className="disclaimer">制度の受付期間、予算残額、対象工事、申請時期は年度途中で変わることがあります。最終的な判断は原典・窓口で確認してください。</p>
    </div>
  );
}
