# 収集源と構造化契約

| source_id | 用途 | URL | 公開原典に使うか |
| --- | --- | --- | --- |
| `sumaimachi-search` | 全国の自治体支援制度の発見 | https://www.sumaimachi-center-rengoukai.or.jp/shienseido/ | 制度発見。自治体原典で再確認 |
| `athome-seido` | 空き家バンク制度の補助的発見 | https://www.akiya-athome.jp/seido/ | 制度発見。自治体原典で再確認 |
| `competitor-scan` | 競合面の差分・漏れ発見 | https://www.kaitai-guide.net/hojokin/ | 公開原典には使わない |

LLMの出力は `src/lib/llm-contract.ts` の契約に通し、次のフィールドを必須とする。

- 制度名 (`programName`)
- 対象 (`target`)
- 上限 (`maxAmount`)
- 要件 (`requirements`)
- 原典URL (`originalUrl`)
- 確認日 (`checkedOn`)
- 人間判定 (`humanReviewStatus`)
- 公開状態 (`publicationStatus`)

LLM出力・競合ページ・ディレクトリの記載だけでは公開状態に遷移できない。`approved` と `published` は人間スポット検証の記録と同時に設定する。
