/**
 * /guide 移植記事の出典（一次資料）・確認日・運営者判定のマニフェスト。
 *
 * 出典URLは 2026-09-07 に HTTP 到達確認済み（e-Gov・各省庁ページ）。
 * 自治体制度の公式URLの確認日は、同梱データ（renewal/demolition-subsidy.ts の
 * verified_at）の値をそのまま引き継ぐ。追加・更新は必ず確認日つきで行う。
 */

export interface GuideSourceRef {
  /** 出典名（法令名・ページ名） */
  label: string;
  /** 原典URL（一次資料）。未確認のものはURLを載せない。 */
  url?: string;
  /** 参照箇所の補足（例: 第46条、349条の3の2 など） */
  note?: string;
  /** 個別出典の確認日（ISO date）。未指定なら entry.confirmedOn を使う。 */
  confirmedOn?: string;
}

export interface GuideSourceEntry {
  /** 記事単位の内容確認日（ISO date） */
  confirmedOn: string;
  /** 一次資料一覧 */
  sources: GuideSourceRef[];
  /** 運営者判定（編集部の見立て。非保証の境界を含む） */
  judgment: string;
}

const EGov = (lawid: string) => `https://laws.e-gov.go.jp/document?lawid=${lawid}`;

const LAW = {
  akiyaTokuhou: { label: "空家等対策の推進に関する特別措置法（e-Gov法令検索）", url: EGov("427AC0000000127") },
  chihouzei: { label: "地方税法（e-Gov法令検索）", url: EGov("425AC0000000226"), note: "住宅用地の課税標準の特例（第349条の3の2）" },
  takken: { label: "宅地建物取引業法（e-Gov法令検索）", url: EGov("427AC0000000176"), note: "報酬額の上限（第46条）" },
  minpou: { label: "民法（e-Gov法令検索）", url: EGov("425AC0000000089"), note: "契約不適合責任・工作物等の責任" },
  shouhisha: { label: "消費者契約法（e-Gov法令検索）", url: EGov("412AC0000000061"), note: "第8条（不利益な事実の不告知等）" },
  sochihou: { label: "租税特別措置法（e-Gov法令検索）", url: EGov("432AC0000000026"), note: "被相続人の居住用財物（空き家）に係る譲渡所得の特別控除" },
  kokkoKiizokuHou: { label: "相続等により取得した土地所有権の国庫への帰属に関する法律（e-Gov法令検索）", url: EGov("503AC0000000050") },
  shinrinhou: { label: "森林法（e-Gov法令検索）", url: EGov("426AC0000000249") },
  touchiShakachiHou: { label: "借地借家法（e-Gov法令検索）", url: EGov("403AC0000000271"), note: "定期借家契約（第38条）" },
} as const;

export const GUIDE_SOURCES: Record<string, GuideSourceEntry> = {
  "brokerage-vs-buyout": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.takken,
      LAW.minpou,
      { label: "総務省「住宅・土地統計調査」", url: "https://www.stat.go.jp/data/jyutaku/", note: "空き家数・空き家率の公表統計" },
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "買取は「確実性と速さ」と引き換えに市場価格の7〜8割程度となる構造上、手残り額の違いを数字で確認したうえで選ぶべきと運営者は判断します。最終的な売却方法の選定は当事者の責任で行い、個別の取引条件は宅建業者に確認してください。",
  },
  "sale-vs-buyout": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.akiyaTokuhou,
      LAW.chihouzei,
      LAW.sochihou,
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "「売れる見込みがあるなら仲介、確実性を取るなら買取」という切り分けを基本軸としつつ、解体や税制特例の適用可否で最適解が変わるため、記事のシミュレーションを必ずご自身の条件でやり直すことを運営者は推奨します。適用判断は税務署・専門職への確認を前提とします。",
  },
  "leaseback": {
    confirmedOn: "2026-09-07",
    sources: [
      { label: "国土交通省「住宅のリースバックに関するガイドブック」（令和4年6月公表）", url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk2_000053.html" },
      { label: "国土交通省 報道発表資料（ガイドブック公表）", url: "https://www.mlit.go.jp/report/press/house02_hh_000174.html" },
      { label: "国民生活センター 注意喚起「強引に勧められる住宅のリースバック契約にご注意！」（2025年5月21日）", url: "https://www.kokusen.go.jp/news/data/n-20250521_1.html", confirmedOn: "2026-09-07" },
      LAW.touchiShakachiHou,
      { label: "国税庁 タックスアンサー No.3208（譲渡所得の課税）", url: "https://www.nta.go.jp/taxanswer/shotoku/3208.htm" },
      { label: "国税庁 タックスアンサー No.3258（マイホームを売ったときの特別控除）", url: "https://www.nta.go.jp/taxanswer/shotoku/3258.htm" },
    ],
    judgment:
      "リースバックは「住み続けられる期間と総家賃」が取引の本質であり、定期借家か普通借家かでリスクが大きく変わるため、ガイドブックと注意喚起の両方を踏まえて契約書で確認することを運営者は強く推奨します。個別の契約判断は消費者相談窓口・専門家への相談を前提とします。",
  },
  "kaitori-satei": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.takken,
      LAW.minpou,
      LAW.shouhisha,
      { label: "不動産登記法（e-Gov法令検索）", url: EGov("416AC0000000123"), note: "相続登記の義務化（2022年4月施行）" },
      LAW.chihouzei,
      { label: "総務省「住宅・土地統計調査」", url: "https://www.stat.go.jp/data/jyutaku/" },
    ],
    judgment:
      "買取査定は更地換算を基礎とするため、解体費の概算と残置物の状態を先に把握しておくことが査定額の妥当性確認に有効だと運営者は判断します。免責特約の有効範囲は消費者契約法の制限を受けるため、全面免責を鵜呑みにしないでください。",
  },
  "demolition-subsidy": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.akiyaTokuhou,
      LAW.chihouzei,
      { label: "奈良市 特定空家等除却費用補助金（公式ページ）", url: "https://www.city.nara.lg.jp/site/akiya-bank/9205.html", confirmedOn: "2026-08-16" },
      { label: "生駒市 既存住宅解体工事補助金（公式ページ）", url: "https://www.city.ikoma.lg.jp/0000009876.html", confirmedOn: "2026-08-16" },
      { label: "橿原市 空家等除却補助金（公式ページ）", url: "https://www.city.kashihara.nara.jp/living_scene/sumai_hikkoshi/3/16183.html", confirmedOn: "2026-08-16" },
      { label: "東京都 空き家家財整理・解体促進事業（公式ページ）", url: "https://www.juutakuseisaku.metro.tokyo.lg.jp/akiya/hojo/kaitai_seiri", confirmedOn: "2026-08-20" },
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "補助金の有無・上限・受付状況は自治体ごとに違い、当サイトで確認済みの自治体でも年度途中に予算枠が尽きるため、契約・着工前の事前確認を最優先とすべきと運営者は判断します。掲載する自治体制度データは公式ページの確認日つきで管理し、確認日を過ぎた情報は未確認として扱います。",
  },
  "demolition-subsidy-timing": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.akiyaTokuhou,
      LAW.chihouzei,
      { label: "奈良市 特定空家等除却費用補助金（公式ページ）", url: "https://www.city.nara.lg.jp/site/akiya-bank/9205.html", confirmedOn: "2026-08-16" },
      { label: "生駒市 既存住宅解体工事補助金（公式ページ）", url: "https://www.city.ikoma.lg.jp/0000009876.html", confirmedOn: "2026-08-16" },
      { label: "橿原市 空家等除却補助金（公式ページ）", url: "https://www.city.kashihara.nara.jp/living_scene/sumai_hikkoshi/3/16183.html", confirmedOn: "2026-08-16" },
      { label: "東京都 空き家家財整理・解体促進事業（公式ページ）", url: "https://www.juutakuseisaku.metro.tokyo.lg.jp/akiya/hojo/kaitai_seiri", confirmedOn: "2026-08-20" },
    ],
    judgment:
      "申請タイミングの実務上の最優先事項は「募集期間・予算枠の確認」と「着工前申請」であり、年度の夏〜冬に予算枠が尽きる事例が確認済みデータでも見られるため、年度途中での受付終了を前提に逆算することを運営者は推奨します。",
  },
  "vacant-house-demolition-sale": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.chihouzei,
      LAW.akiyaTokuhou,
      LAW.minpou,
      LAW.sochihou,
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "更地化は固定資産税の特例解除という確実なコスト増と引き換えになるため、解体は「買主が見つからない・融資が付かない」など理由が具体化したときに判断するのが合理的だと運営者は判断します。更地渡し特約を使う場合は契約書での精算条件を必ず確認してください。",
  },
  "inherited-house-keep-cost": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.chihouzei,
      LAW.akiyaTokuhou,
      { label: "総務省「住宅・土地統計調査」", url: "https://www.stat.go.jp/data/jyutaku/" },
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "「売らない」選択は固定資産税・都市計画税・保険・管理の年間ランニングコストと引き換えであり、その総額を先に可視化することが相続判断の前提になると運営者は判断します。掲載の費用内訳は法定計算に基づく試算であり、個別の納付額は市区町村の課税明細で確認してください。",
  },
  "maintenance-cost-risk": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.chihouzei,
      LAW.akiyaTokuhou,
      LAW.minpou,
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "空き家の放置は「特定空家等への指定→税の特例解除」と「工作物の損害賠償責任」の二重のリスクを持つため、管理を外注する場合も含めて年間費用を先に確定させることが出口戦略の前提だと運営者は判断します。管理不全空き家への指定基準は市町村の条例・運用により差があります。",
  },
  "tokutei-akiya-tax": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.akiyaTokuhou,
      LAW.chihouzei,
      { label: "国土交通省「空き家対策 特設サイト」", url: "https://www.mlit.go.jp/jutakukentiku/house/akiya-taisaku/index.html" },
    ],
    judgment:
      "「固定資産税が最大6倍」は特例解除時の課税標準の比較上の上限であり、負担調整措置や土地条件で実際の増加幅は変わるため、措置の仕組みを正確に理解したうえで自分の課税明細で確認することを運営者は推奨します。勧告前の適切な対応が指定を回避する現実的な手段です。",
  },
  "chiho-jikka-shobun": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.akiyaTokuhou,
      LAW.chihouzei,
      LAW.minpou,
      LAW.sochihou,
      { label: "国土交通省「空き家・空き地バンク総合情報ページ」", url: "https://www.mlit.go.jp/totikensangyo/const/sosei_const_tk3_000131.html" },
    ],
    judgment:
      "地方の実家は「値下げ→買取→空き家バンク→解体→相続放棄」の順に損失の確定度が上がるため、各段階で撤収できる条件（期限・費用・同意）を先に確認する順序を運営者は推奨します。空き家バンクは移住促進目的が多く、利用資格や物件範囲は自治体ごとに確認が必要です。",
  },
  "kokko-kizoku": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.kokkoKiizokuHou,
      { label: "法務省「相続土地国庫帰属制度について」", url: "https://www.moj.go.jp/MINJI/minji05_00454.html" },
      { label: "法務省「相続土地国庫帰属制度の概要」", url: "https://www.moj.go.jp/MINJI/minji05_00457.html" },
      { label: "法務省「相続土地国庫帰属制度の負担金」", url: "https://www.moj.go.jp/MINJI/minji05_00471.html" },
    ],
    judgment:
      "国庫帰属は「手放す最後の手段」であり、建物有り・境界不明などの不承認事由を解消する費用が負担金（原則20万円）を大きく上回り得るため、申請前の要件照会を必ず法務局で受けることを運営者は推奨します。承認の可否は法務大臣の判断事項であり、当サイトは審査結果を保証しません。",
  },
  "sanrin-inheritance-disposal": {
    confirmedOn: "2026-09-07",
    sources: [
      LAW.shinrinhou,
      { label: "林野庁", url: "https://www.rinya.maff.go.jp/", note: "林業・間伐・立木売却の行政情報" },
      LAW.kokkoKiizokuHou,
      { label: "法務省「相続土地国庫帰属制度について」", url: "https://www.moj.go.jp/MINJI/minji05_00454.html" },
    ],
    judgment:
      "山林は相場形成が薄く、売却は森林組合経由の立木売却・隣地所有者への相談が現実的な第一手になりやすく、国庫帰属は境界明確化などの要件を満たさないと承認されないため、両者を「並行して確認する」姿勢を運営者は推奨します。森林法の届出義務は相続でも適用されるため手続き順序に注意してください。",
  },
};
