# 空き家補助金ナビ

自治体の空き家補助金を、原典と確認日つきで整理するNext.jsサイトです。補助金レジストリの初期スパイクとして、都道府県47ハブと初期市20ページを静的生成します。

## Development

```bash
npm install
npm run validate:registry
npm run collect:sources -- source-manifests/YYYY-MM-DD.json
npm run build
```

環境変数は `.env.example` を参照してください。`NEXT_PUBLIC_GA_ID` が無い場合、GA4タグは読み込まれません。機械収集候補は `preview` として表示され、人間スポット検証を経るまで申請情報として公開しません。運用は [`docs/quarterly-check.md`](docs/quarterly-check.md)、判定記録は [`docs/verification-log.md`](docs/verification-log.md) を参照。
