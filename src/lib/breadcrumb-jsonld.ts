/**
 * BreadcrumbList JSON-LD 構造化データ生成。
 *
 * 全ページ型の視覚的パンくずと整合する schema.org BreadcrumbList を生成する。
 * Google リッチリザルト・クローラーがサイト階層を正しく理解するために使用。
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumblist
 */

import { SITE_URL } from "@/lib/site";

const SITE_ORIGIN = SITE_URL;

export interface BreadcrumbItem {
  /** ユーザー向け表示名（例: "千葉県"） */
  name: string;
  /** サイト相対パス（例: "/prefecture/12"）。ルートは "/"。 */
  path: string;
}

interface BreadcrumbListJsonLd {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

/**
 * BreadcrumbItem 配列から BreadcrumbList JSON-LD オブジェクトを構築する。
 * 末尾アイテム（現在のページ）も `item` URL を含める（Google 推奨）。
 */
export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}
