import { notFound } from 'next/navigation';
import { getSubsidy, subsidies } from '../../../src/lib/registry';

export function generateStaticParams() {
  return subsidies.map(({ prefectureSlug, citySlug }) => ({ prefecture: prefectureSlug, city: citySlug }));
}

export default async function CityPage({ params }: { params: Promise<{ prefecture: string; city: string }> }) {
  const { prefecture, city } = await params;
  const record = getSubsidy(prefecture, city);
  if (!record) notFound();
  const isPublic = record.humanReviewStatus === 'approved' && record.publicationStatus === 'published';
  return (
    <div className="shell page-shell">
      <a className="back-link" href={`/${record.prefectureSlug}/`}>← {record.prefecture}ハブ</a>
      <section className="page-hero"><p className="eyebrow">CITY SUBSIDY RECORD</p><h1>{record.city}の空き家支援制度</h1><p className="lead">制度の申請前に、必ず自治体の原典で最新の要件をご確認ください。</p></section>
      {!isPublic && <div className="gate-warning"><strong>人間確認前のプレビュー</strong><span>この候補は自動収集・構造化された段階です。公開判定が完了するまで、申請判断に使わないでください。</span></div>}
      <article className="record-card">
        <div className="record-title"><span className="status-pill">{isPublic ? '検証済み公開' : '検証待ち'}</span><h2>{record.programName}</h2></div>
        <dl className="record-fields">
          <div><dt>対象</dt><dd>{record.target}</dd></div>
          <div><dt>上限</dt><dd>{record.maxAmount}</dd></div>
          <div><dt>主な要件</dt><dd>{record.requirements}</dd></div>
          <div><dt>確認日</dt><dd>{record.checkedOn}</dd></div>
        </dl>
        <div className="source-box"><span>原典URL</span><a href={record.originalUrl} rel="noreferrer" target="_blank">{record.originalUrl} ↗</a></div>
      </article>
      <p className="disclaimer">制度の受付期間、予算残額、対象工事、申請時期は年度途中で変わることがあります。最終的な判断は原典・窓口で確認してください。</p>
    </div>
  );
}
