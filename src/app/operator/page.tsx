import type { Metadata } from "next";
import { operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営情報",
  description: "空き家補助金ナビの運営情報。",
};

export default function OperatorPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">ABOUT THE OPERATOR</p>
        <h1>運営情報</h1>
        <p className="lede">このサイトの運営主体と、情報提供にあたっての立場を明記します。</p>
      </div>
      <div className="prose">
        <table className="meta-table">
          <tbody>
            <tr><th scope="row">運営者名</th><td>{operator.name}</td></tr>
            <tr><th scope="row">所在地</th><td>{operator.address}</td></tr>
            <tr><th scope="row">連絡手段</th><td>{operator.email}</td></tr>
            <tr><th scope="row">事業内容</th><td>空き家・自治体制度に関する情報提供</td></tr>
          </tbody>
        </table>
        <div className="notice">運営者名・所在地・連絡先は、公開前に運営者が確定した情報へ差し替えます。掲載情報は補助金の交付や採択を保証するものではありません。</div>
      </div>
    </div>
  );
}
