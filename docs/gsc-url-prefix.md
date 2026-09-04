# GSC URL-prefix property 手順

対象は起動ホスト `https://akiya-hojokin-theta.vercel.app/`（`akiya-hojokin.vercel.app` の所有権解決後に切替）。カスタムドメイン移行後のDomain propertyは別手順とする。

## 人間ゲート

1. Google Search Consoleで「プロパティを追加」を開く。
2. 「URLプレフィックス」を選び、起動ホスト `https://akiya-hojokin-theta.vercel.app/`（または所有権解決後の `https://akiya-hojokin.vercel.app/`）を入力する。
3. 推奨されるHTMLタグまたはHTMLファイル方式で所有権を確認する。Vercelへ設定できる方法を選ぶ。
4. 所有権確認後、起動ホストの `/sitemap.xml` をサイトマップとして送信する。

## エージェント確認

- `curl -I https://akiya-hojokin-theta.vercel.app/` がHTTPSで応答すること
- `/robots.txt` が同じsitemap URLを指すこと
- `/sitemap.xml` に公開ページが含まれること
- canonicalが現行の起動ホストを基準に生成されること

確認日と結果は、このファイルまたは起動チケットのコメントへ追記する。GA4の確認は `docs/measurement.md` に従う。
