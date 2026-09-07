import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "土地じまい",
  description:
    "土地の売却・活用・管理負担・相続土地国庫帰属を、選択肢として整理します。",
  alternates: { canonical: "/tochi-jimai" },
  openGraph: {
    title: "土地じまい",
    description:
      "土地の売却・活用・管理負担・相続土地国庫帰属を、選択肢として整理します。",
    type: "article",
  },
};

export default function TochiJimaiPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">空き家補助金ナビ</p>
        <h1>
          土地を、どうじまいするか。
          <br />
          選択肢を並べて決める。
        </h1>
        <p className="lede">
          売却・活用・国庫帰属・持ち続ける管理。土地の状態と需要に合わせて、比較の軸をそろえて整理します。
        </p>
      </div>
      <div className="prose">
        <h2>土地を手放す前に、選択肢を並べる</h2>
        <p>
          土地じまいでは、売却・活用・相続土地国庫帰属など、土地の状態と需要に合う出口を確認します。「その土地を、いまどうしたいですか？」から近い関心を選び、確認するテーマへ進んでください。
        </p>
        <ul>
          <li>土地の相場</li>
          <li>売却</li>
          <li>活用</li>
          <li>管理負担</li>
          <li>相続土地国庫帰属</li>
          <li>引き受け手</li>
        </ul>

        <h2>土地の状況から探す</h2>
        <p>
          その土地を、いまどうしたいか。近い関心から確認できます。
        </p>
        <div className="section-grid">
          <div className="info-card">
            <p className="number">制度の基本</p>
            <h3>相続土地国庫帰属を検討するとき</h3>
            <p>制度の対象要件と、申請前に確認することを整理します。</p>
            <p>
              <Link href="/articles/kokko-kizoku">
                相続土地国庫帰属制度の負担金と要件 →
              </Link>
            </p>
          </div>
          <div className="info-card">
            <p className="number">相場</p>
            <h3>土地の相場</h3>
            <p>国土交通省の成約・取引データで、地域の水準を確認します。</p>
            <p>
              <a href="https://www.r-sic.com/">土地の相場を調べる →</a>
            </p>
          </div>
          <div className="info-card">
            <p className="number">活用</p>
            <h3>活用</h3>
            <p>売る以外の選択肢。貸す・使うの判断材料を並べます。</p>
            <p>
              <Link href="/articles/leaseback">リースバックの解説記事 →</Link>
            </p>
          </div>
          <div className="info-card">
            <p className="number">管理負担</p>
            <h3>管理負担</h3>
            <p>持ち続けるコストと手間を、可視化してから比べます。</p>
            <p>
              <Link href="/articles/maintenance-cost-risk">
                維持管理コストの解説記事 →
              </Link>
            </p>
          </div>
          <div className="info-card">
            <p className="number">引き受け手</p>
            <h3>農地などの引き受け手</h3>
            <p>農地には農地法のルールがあります。許可と相談先を整理します。</p>
            <p>
              <a href="https://www.r-sic.com/akiya/articles/nouchi-5jo">
                農地の5条許可の解説記事 →
              </a>
            </p>
          </div>
        </div>

        <h2>いま決めたいことを、判断カードで</h2>
        <p>
          読む前に、先に答えの見当をつけたい判断から始められます。
        </p>
        <div className="section-grid">
          <div className="info-card">
            <p className="number">判断 1</p>
            <h3>土地を売るか、持ち続けるか</h3>
            <p>成約価格と保有コストを同じ軸で比べます。</p>
          </div>
          <div className="info-card">
            <p className="number">判断 2</p>
            <h3>相続土地国庫帰属を検討するとき</h3>
            <p>制度の対象要件と、申請前に確認することを整理します。</p>
            <p>
              <Link href="/articles/kokko-kizoku">
                制度の負担金と要件の解説記事 →
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
