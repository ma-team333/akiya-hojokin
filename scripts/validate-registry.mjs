import { readFile } from 'node:fs/promises';

const prefectures = JSON.parse(await readFile('data/prefectures.json', 'utf8'));
const subsidies = JSON.parse(await readFile('data/subsidies.json', 'utf8'));
const errors = [];
const required = ['programName', 'target', 'maxAmount', 'requirements', 'originalUrl', 'checkedOn'];

if (prefectures.length !== 47) errors.push(`expected 47 prefectures, got ${prefectures.length}`);
if (subsidies.length !== 20) errors.push(`expected 20 selected cities, got ${subsidies.length}`);
for (const [index, record] of subsidies.entries()) {
  for (const field of required) {
    if (typeof record[field] !== 'string' || record[field].trim() === '') errors.push(`record ${index}: missing ${field}`);
  }
  if (!/^https?:\/\//.test(record.originalUrl ?? '')) errors.push(`record ${index}: invalid originalUrl`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.checkedOn ?? '')) errors.push(`record ${index}: invalid checkedOn`);
  if (record.humanReviewStatus === 'approved' && record.publicationStatus !== 'published') errors.push(`record ${index}: approved record must be published`);
  if (record.publicationStatus === 'published' && record.humanReviewStatus !== 'approved') errors.push(`record ${index}: published record must be human-approved`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`registry valid: ${prefectures.length} prefecture hubs, ${subsidies.length} city candidates`);
