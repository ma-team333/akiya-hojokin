# 空き家補助金ナビ 計測仕様 v1

## 基本方針

- Entity ID は `akiya`。
- GA4 はポートフォリオの他Entityと分離した通常プロパティを使う。
- `NEXT_PUBLIC_GA_ID` が未設定の環境では解析タグを読み込まない。
- 本番の測定IDはVercelの環境変数へ設定し、設定後に再デプロイする。

## リードイベント

提携先との契約および法務確認が完了した後、実在する送客CTAにだけGA4推奨イベント `generate_lead` を実装する。プレースホルダーCTAでは発火させない。

| 項目 | 値 |
|---|---|
| event name | `generate_lead` |
| `entity` | `akiya` |
| `cta_id` | CTAごとの固定識別子 |
| key event | GA4管理画面で登録 |

発火処理は `src/lib/analytics.ts` の `trackGenerateLead` に集約する。クリックごとの重複発火を避け、送信成功または外部遷移直前の1回だけ呼び出す。

## 検証

1. GA4 DebugViewで `generate_lead` と `entity=akiya`、`cta_id` を確認する。
2. GA4のRealtimeで実セッションを確認する。
3. GA4管理画面で `generate_lead` をkey eventへ登録する。
4. CTAを追加したPRに発火点・CTA ID・確認結果を記録する。
