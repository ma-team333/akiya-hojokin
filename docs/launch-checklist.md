# 空き家補助金ナビ 起動チェックリスト

リンク憲法 v1 の新Entity起動時チェックリストに対応する。エージェント作業と人間ゲートを分け、未確定の運営情報を公開しない。

## エージェント側（完了）

- [x] `akiya-hojokin` リポジトリを作成
- [x] Vercel project `akiya-hojokin` を作成し、productionへデプロイ（現行URL: `https://akiya-hojokin-theta.vercel.app`）
  - [ ] `akiya-hojokin.vercel.app` は別Vercel projectが使用中。所有権を解決し、`NEXT_PUBLIC_SITE_URL` を切り替えて再デプロイ
- [x] 他Entityのテンプレートを共有しない独自レイアウトを実装
- [x] `/operator`、`/privacy`、`/contact` を設置
- [x] `/verification` に原典URL・確認日・derived claims・最終更新日の検証方針を記載
- [x] `NEXT_PUBLIC_GA_ID` のenv guardと `generate_lead` 仕様を実装
- [x] URL-prefix GSCの手順を `docs/gsc-url-prefix.md` に記録

## 人間ゲート（公開前に実施）

- [ ] 運営者名・所在地・連絡先を確定し、Vercel環境変数へ設定
- [ ] プライバシーポリシーの最終文面を確定
- [ ] GA4でakiya用プロパティを作成し、測定IDを発行
- [ ] VercelのProductionへ `NEXT_PUBLIC_GA_ID` を設定して再デプロイ
- [ ] GA4で `generate_lead` をkey eventへ登録（CTA実装後。現時点でプレースホルダーCTAは作らない）
- [ ] GSC URL-prefix property `https://akiya-hojokin.vercel.app/` を確認し、sitemapを送信
- [ ] 実サイトで運営情報・ポリシー・検証方針・sitemapを確認

カスタムドメイン `akiya-hojokin.jp` への移行は本チケットの対象外。移行時は1:1の301、内部リンク・canonical・sitemap監査、GSC移行を別チケットで実施する。
