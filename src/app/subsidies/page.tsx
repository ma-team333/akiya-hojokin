import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "補助金を探す",
  description: "自治体の空き家補助金を原典付きで整理するレジストリ。",
};

export default function SubsidiesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">SUBSIDY REGISTRY</p>
        <h1>補助金を探す</h1>
        <p className="lede">自治体の公式情報をもとに、空き家の活用・解体・改修に関わる制度を整理します。</p>
      </div>
      <div className="prose">
        <div className="info-card">
          <h2>レジストリを準備しています</h2>
          <p>現在はサイトの情報設計と検証フローを先行公開しています。制度情報は、対象自治体の原典URL・確認日・募集状況を確認したうえで掲載します。</p>
        </div>
        <h2>掲載する情報</h2>
        <ul>
          <li>制度名、対象となる空き家・工事</li>
          <li>補助率・上限額・主な要件</li>
          <li>申請時期と受付状況</li>
          <li>自治体公式ページへの原典リンクと確認日</li>
        </ul>
        <div className="notice">制度は予算や受付状況によって変わります。掲載内容だけで判断せず、申請前に必ず原典をご確認ください。</div>
      </div>
    </div>
  );
}
