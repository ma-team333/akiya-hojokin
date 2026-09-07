import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "売りにくい家研究所",
  description: "古い・傷んだ家の現況売却・修繕・解体を比較するための判断ページです。",
  alternates: { canonical: "/furuie" },
  openGraph: {
    title: "売りにくい家研究所",
    description: "古い・傷んだ家の現況売却・修繕・解体を比較するための判断ページです。",
    type: "website",
  },
};

export default function FuruiePage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">空き家補助金ナビ</p>
        <h1>売りにくい家の出口を、比べて、決める。</h1>
        <p className="lede">
          売りにくい家研究所は、古い・傷んだ家の現況売却・修繕・解体を比較するための判断ページです。現況のまま売る、直して売る、解体して土地で売る。費用と時間を同じ軸で並べて、あせらず決めるための材料をまとめます。
        </p>
      </div>

      <div className="prose">
        <h2>建物の状態から探す</h2>
        <p>決めるところからではなく、いまの建物の状態に近いテーマから読めます。</p>
      </div>
      <div className="section-grid">
        <div className="info-card">
          <p className="number">特集</p>
          <h3>
            <Link href="/old-house-sale-comparison">壊す・直す・このままを比べる</Link>
          </h3>
          <p>現況売却・修繕・解体・買取を、状態・期限・先行費用の同じ軸で整理します。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/articles/vacant-house-demolition-sale">築年数と建物の値打ち</Link>
          </h3>
          <p>築年数だけで売れるかは決まらない。状態と土地需要で確認します。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/old-house-sale-comparison">修繕・リフォーム</Link>
          </h3>
          <p>直して売る回収見込みを、費用・期間・需要で比べます。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/jikka-jimai">残置物の片付け</Link>
          </h3>
          <p>片付け費用と売却条件への影響を、実家じまいの費用から確認します。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/articles/demolition-subsidy">解体と更地化</Link>
          </h3>
          <p>解体費・助成金・更地後の税を、土地需要とセットで確認します。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/furuie/articles/nonconformity-exemption">現況売却と契約特約</Link>
          </h3>
          <p>古家付きのまま売るときの契約不適合責任の免責特約を整理します。</p>
        </div>
        <div className="info-card">
          <h3>
            <a href="https://www.r-sic.com/akiya/articles/saikenchikufuka-exit">再建築不可の土地</a>
          </h3>
          <p>建て替えできない土地でも、売却先と条件を比べられます。</p>
        </div>
      </div>

      <div className="prose">
        <h2>いま決めたいことを、判断カードで</h2>
        <p>読む前に、先に答えの見当をつけたい判断から始められます。</p>
      </div>
      <div className="section-grid">
        <div className="info-card">
          <p className="number">判断ページ</p>
          <h3>
            <Link href="/old-house-sale-comparison">古い家を売るなら、壊す・直す・このままのどれを比べるか</Link>
          </h3>
          <p>現況売却・古家付き土地・解体・リフォーム・買取を、状態・期限・先行費用・土地需要の同じ軸で比べます。</p>
        </div>
        <div className="info-card">
          <p className="number">判断ページ</p>
          <h3>
            <Link href="/akiya-sale-route">空き家を売るなら、どの売り方を比べるか</Link>
          </h3>
          <p>現況仲介・古家付き土地・解体後売却・買取を、家の状態と優先順位で比べます。売却と買取のどちらで進めるかは、提示価格・契約条件・残置物・引渡しを同じ軸で比較してから絞り込みます。</p>
        </div>
        <div className="info-card">
          <p className="number">判断ページ</p>
          <h3>
            <Link href="/jikka-jimai">実家じまい・空き家の売却費用は、総額いくらかかるか</Link>
          </h3>
          <p>空き家を売る費用（仲介手数料等の売却諸費用・解体費・残置物の処分）を含めて、片付け・登記・測量・解体・売却の全項目を3〜5の質問で「必要・不要・不明」に分けて積み上げます。</p>
        </div>
        <div className="info-card">
          <p className="number">判断ページ</p>
          <h3>
            <Link href="/akiya-management-service">空き家の管理は必要？ 1年・3年・5年の総費用を売却と比べる</Link>
          </h3>
          <p>月々の管理費ではなく、あと何年持つかで決まる総保有コストを積み上げ、自分で管理・管理会社（管理サービス）への委託・売却を比べます。</p>
        </div>
        <div className="info-card">
          <p className="number">判断ページ</p>
          <h3>
            <Link href="/demolition-subsidy">空き家の解体補助金はもらえる？ 自治体の状況確認と解体判断</Link>
          </h3>
          <p>自治体ごとに制度の有無・要件・受付時期は変わります。検証済みの一次情報だけを「確認済み」として、それ以外は未確認として公式確認へ導きます。解体して売るかこのまま売るかの比較も整理します。</p>
        </div>
        <div className="info-card">
          <p className="number">ハブ</p>
          <h3>
            <Link href="/furuie/articles">売却ノウハウ・法律特約の記事一覧</Link>
          </h3>
          <p>古い・傷んだ家を売るために知っておきたい、法律特約と売却相場の記事です。</p>
        </div>
        <div className="info-card">
          <p className="number">ハブ</p>
          <h3>
            <a href="https://www.r-sic.com/akiya">空き家のこれから</a>
          </h3>
          <p>空き家の相続・管理・活用・売却を、状況から整理して考えます。</p>
        </div>
      </div>

      <div className="prose">
        <h2>注目の記事</h2>
        <p>古い・傷んだ家を売るときの知識を、事例と数字で整理します。</p>
      </div>
      <div className="section-grid">
        <div className="info-card">
          <p className="number">法律特約</p>
          <h3>
            <Link href="/furuie/articles/nonconformity-exemption">
              【民法対応】古家付き土地売却の契約不適合責任免責とは？特約条文とリスク診断
            </Link>
          </h3>
          <p>築古物件を安心して売却するための契約不適合責任免責ノウハウ。告知義務の境界線、地中埋設物対策、免責特約付き売買契約書の作成ポイントを網羅。</p>
          <p>
            <time dateTime="2026-08-15">2026.08.15</time>
          </p>
        </div>
        <div className="info-card">
          <p className="number">相場・減価</p>
          <h3>
            <a href="https://www.r-sic.com/akiya/articles/hatazaochi-sale">
              【相場・減価率】旗竿地（敷延）の売却相場とメリット・デメリット・手取りシミュレーター
            </a>
          </h3>
          <p>旗竿地・敷延を損せず売却するための完全ガイド。相場減価の理由、間口と接道義務、重機解体割増、隣地統合や買取の成功法を網羅。</p>
          <p>
            <time dateTime="2026-08-15">2026.08.15</time>
          </p>
        </div>
      </div>

      <div className="prose">
        <h2>ほかの状況から探す</h2>
      </div>
      <div className="section-grid">
        <div className="info-card">
          <h3>
            <a href="https://www.r-sic.com/souzoku">相続不動産</a>
          </h3>
          <p>相続した不動産の登記・税・共有・売却を、確認順に整理します。</p>
        </div>
        <div className="info-card">
          <h3>
            <a href="https://www.r-sic.com/kenri">権利・共有不動産研究所</a>
          </h3>
          <p>共有・底地・境界など、権利関係が複雑な不動産の確認順を整理します。</p>
        </div>
        <div className="info-card">
          <h3>
            <Link href="/tochi-jimai">土地じまい</Link>
          </h3>
          <p>土地の売却・活用・管理負担・国庫帰属など、出口を並べて比べます。</p>
        </div>
      </div>
    </div>
  );
}
