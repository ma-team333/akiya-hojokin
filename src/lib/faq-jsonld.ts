/**
 * FAQPage JSON-LD 構造化データ生成（単一ソース原則）。
 *
 * FAQ本文は「表示コンポーネントが import する設問配列」にのみ存在し、
 * ページ側の JSON-LD は本ヘルパーで同配列から生成する。
 * 手書きの faqJsonLd は Google 構造化データポリシー違反（マークアップ＝表示内容）の
 * 温床となるため禁止（CI ゲート: tests/editorial-faq-consistency.test.ts）。
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

/** 表示用FAQ設問の共通最小形状。クラスタ側で category/tag 等を拡張してよい。 */
export interface FaqItem {
  question: string;
  answer: string;
}

/** 表示用設問配列から FAQPage JSON-LD オブジェクトを構築する。 */
export function buildFaqJsonLd(
  items: readonly FaqItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
