import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">PRIVACY</p>
        <h1>プライバシーポリシー</h1>
        <p className="lede">空き家補助金ナビは、取得する情報と利用目的を明確にします。</p>
      </div>
      <div className="prose">
        <h2>アクセス解析</h2>
        <p>アクセス解析を有効にする場合は、Google Analytics 4を利用します。測定IDを設定した環境でのみ解析タグが読み込まれます。収集・利用の詳細は、公開前に運営者が確定したポリシーへ反映します。</p>
        <h2>お問い合わせ</h2>
        <p>お問い合わせで受け取った情報は、返信および必要な対応のために利用します。第三者提供が必要な場合を除き、本人の同意なく目的外には利用しません。</p>
        <h2>改定</h2>
        <p>法令やサービス内容の変更に応じて本ページを更新します。更新日はページの公開時に記載します。</p>
      </div>
    </div>
  );
}
