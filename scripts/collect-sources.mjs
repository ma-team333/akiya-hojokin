import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

const catalog = [
  ['sumaimachi-search', 'https://www.sumaimachi-center-rengoukai.or.jp/shienseido/'],
  ['athome-seido', 'https://www.akiya-athome.jp/seido/'],
  ['competitor-scan', 'https://www.kaitai-guide.net/hojokin/']
];
const output = process.argv[2] ?? 'source-manifests/latest.json';
const collectedAt = new Date().toISOString();
const records = [];

for (const [sourceId, sourceUrl] of catalog) {
  let httpStatus = null;
  let contentHash = null;
  let notes = '取得後に利用規約・原典性を確認する。';
  try {
    const response = await fetch(sourceUrl, { redirect: 'follow' });
    httpStatus = response.status;
    const body = await response.text();
    contentHash = createHash('sha256').update(body).digest('hex');
    notes = response.ok ? '取得成功。LLM投入前に人間が対象範囲を確認する。' : `HTTP ${response.status}`;
  } catch (error) {
    notes = `取得失敗: ${error instanceof Error ? error.message : String(error)}`;
  }
  records.push({ sourceId, sourceUrl, collectedAt, httpStatus, contentHash, notes });
}

await mkdir(output.substring(0, output.lastIndexOf('/')) || '.', { recursive: true });
await writeFile(output, JSON.stringify({ collectedAt, records }, null, 2) + '\n');
console.log(`wrote ${records.length} source records to ${output}`);
