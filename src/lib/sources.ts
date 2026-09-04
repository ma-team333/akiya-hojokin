export const SOURCE_CATALOG = [
  {
    id: 'sumaimachi-search',
    name: 'すまいづくりまちづくりセンター連合会 検索',
    kind: 'directory',
    url: 'https://www.sumaimachi-center-rengoukai.or.jp/shienseido/',
    collectionMode: 'manual-or-assisted',
    termsReviewRequired: true
  },
  {
    id: 'athome-seido',
    name: 'アットホーム空き家バンク 制度検索',
    kind: 'directory',
    url: 'https://www.akiya-athome.jp/seido/',
    collectionMode: 'manual-or-assisted',
    termsReviewRequired: true
  },
  {
    id: 'competitor-scan',
    name: '競合面の差分確認',
    kind: 'competitor',
    url: 'https://www.kaitai-guide.net/hojokin/',
    collectionMode: 'manual-only',
    termsReviewRequired: true
  }
] as const;

export type SourceRecord = {
  sourceId: string;
  sourceUrl: string;
  collectedAt: string;
  httpStatus: number | null;
  contentHash: string | null;
  notes: string;
};
