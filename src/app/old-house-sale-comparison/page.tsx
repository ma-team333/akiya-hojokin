import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "古い家を売るには？壊す・直す・このままの5つの売り方を比較",
  description:
    "現況仲介・古家付き土地・解体・リフォーム・買取を、建物の状態・期限・先行費用・土地需要の同じ軸で比較します。解体や修繕を先に決めない判断順を整理します。",
  alternates: { canonical: "/old-house-sale-comparison" },
  openGraph: {
    title: "古い家を売るには？壊す・直す・このままの5つの売り方を比較",
    description:
      "現況仲介・古家付き土地・解体・リフォーム・買取を、建物の状態・期限・先行費用・土地需要の同じ軸で比較します。解体や修繕を先に決めない判断順を整理します。",
    type: "article",
  },
};

export default function OldHouseSaleComparisonPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">空き家補助金ナビ</p>
        <h1>古い家を売るなら、壊す・直す・このままのどれを比べるか</h1>
        <p className="lede">
          現況売却・古家付き土地・解体・リフォーム・買取を、状態・期限・先行費用・土地需要の同じ軸で比べます。結論を先に確認し、条件を変えながら自分のケースに近づけていきます。
        </p>
      </div>
      <div className="prose">
        <h2>古い家でも売れる。まず「壊す・直す」を決めない</h2>
        <p>
          築年数だけで建物の価値がゼロになるわけではありません。売れるか・どのルートで比べるかは、建物の状態・期限・先行費用・土地需要の4条件で絞り込みます。解体とリフォームは不可逆なので、比較の後回しが基本です。
        </p>
        <ul>
          <li>
            <strong>売れるか</strong>：傷みや残置物があっても、現況のまま相談は可能
          </li>
          <li>
            <strong>どのルート</strong>：5つの売り方を同じ軸で並べて比較
          </li>
          <li>
            <strong>先に決めない</strong>：解体・リフォームは条件比較の後
          </li>
        </ul>

        <h2>5つの売り方を並べて比べる</h2>
        <table className="meta-table">
          <thead>
            <tr>
              <th>方法</th>
              <th>向いているケース</th>
              <th>先に確認すること</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>現況のまま仲介</th>
              <td>建物を使う買い手も含めて探したい</td>
              <td>建物状態・残置物・住宅需要</td>
            </tr>
            <tr>
              <th>古家付き土地</th>
              <td>土地利用を主目的とする買い手も含めたい</td>
              <td>接道・境界・土地需要</td>
            </tr>
            <tr>
              <th>解体して土地売却</th>
              <td>更地の利用を比較したい</td>
              <td>土地価値・解体費用・税と制度の3確認</td>
            </tr>
            <tr>
              <th>リフォームして売却</th>
              <td>直して高い条件を狙いたい</td>
              <td>回収見込み・期間・改修後の需要</td>
            </tr>
            <tr>
              <th>買取</th>
              <td>早く条件を確定したい</td>
              <td>提示条件・残置物・引渡条件</td>
            </tr>
          </tbody>
        </table>

        <h2>売り方を比べたら、地域の成約データへ戻る</h2>
        <p>
          一般論だけで売却方法を決めず、集計期間・N（件数）・価格の意味を確認できる地域データと照らし合わせます。地域の成約データは
          <a href="https://www.r-sic.com/akiya">空き家のこれから（www.r-sic.com）</a>
          で確認できます。
        </p>

        <h2>関連する判断</h2>
        <ul>
          <li>
            <Link href="/furuie">売りにくい家研究所の判断カード（5つの判断ページの一覧）</Link>
          </li>
          <li>
            <Link href="/akiya-sale-route">空き家を売るなら、どの売り方を比べるか（現況・古家付き土地・解体後・買取の4ルート比較）</Link>
          </li>
          <li>
            <a href="https://www.r-sic.com/akiya">すべての判断ページを見る（空き家のこれから・www.r-sic.com）</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
