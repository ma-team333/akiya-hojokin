import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検証方針",
  description: "空き家補助金ナビの補助金データ検証方針。",
};

export default function VerificationPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">EVIDENCE STANDARD</p>
        <h1>検証方針</h1>
        <p className="lede">補助金情報は、見つけることよりも、確かめてから使えることが大切です。</p>
      </div>
      <div className="prose">
        <h2>原典を起点にする</h2>
        <p>制度の存在・対象・金額・要件は、自治体などの一次資料で確認します。各レコードには原典URLと確認日を紐づけ、読者が自分で内容を確認できるようにします。</p>
        <h2>推計は推計として示す</h2>
        <p>複数の一次情報を当サイトで集計した数値は、原典そのものの数値と混同しないよう「当サイト集計」などの表示を付けます。</p>
        <h2>更新日を残す</h2>
        <p>年度更新や受付終了を追跡し、最終確認日を表示します。古い情報が残っている可能性がある場合は、申請前に自治体へ確認してください。</p>
        <h2>公開前の判定</h2>
        <p>機械的な収集・集計の結果は、そのまま公開しません。運営者が原典との一致と掲載範囲を確認し、判定記録を残してから公開します。</p>
      </div>
    </div>
  );
}
