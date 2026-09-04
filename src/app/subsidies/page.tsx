import type { Metadata } from 'next';
import Link from 'next/link';
import { prefectures, subsidies } from '@/lib/registry';

export const metadata: Metadata = { title: '補助金を探す', description: '自治体の空き家補助金を原典付きで整理するレジストリ。' };

export default function SubsidiesPage() {
  return <div className="page"><div className="page-header"><p className="eyebrow">SUBSIDY REGISTRY</p><h1>補助金を探す</h1><p className="lede">都道府県ハブ47と初期市20候補。原典URLと確認日をたどれます。</p></div><div className="registry-stats listing-stats"><strong>{prefectures.length}<span>都道府県ハブ</span></strong><strong>{subsidies.length}<span>初期市候補</span></strong></div><h2 className="subheading">都道府県</h2><div className="prefecture-grid">{prefectures.map(([slug, name]) => <Link className="prefecture-card" href={`/${slug}`} key={slug}><span>{name}</span><span aria-hidden="true">↗</span></Link>)}</div><div className="notice">機械生成候補は人間スポット検証が完了するまでプレビューとして扱います。</div></div>;
}
