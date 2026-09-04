# InsForge レジストリ適用手順

1. `migrations/001_akiya_subsidy_registry.sql` のSHA-256を計算する。
2. InsForgeのmigration runnerで適用し、`akiya_registry_migrations` に migration_id・checksum・実行者を記録する。
3. 同じmigration_idのchecksumが異なる場合は停止する。適用済みSQLを書き換えず、次の番号で差分migrationを作る。
4. 初期候補は `publication_status=preview` で投入する。人間判定の証跡を確認してから、ledgerの新しい行に `approved/published` を記録する。
5. 制度変更は既存行を更新・削除せず、`supersedes_id` と `valid_to` で履歴を残す。
6. 公開RPC/viewは `publication_status='published' and human_review_status='approved'` の行だけ返す。anon/authenticatedへのテーブル直接権限は付与しない。
