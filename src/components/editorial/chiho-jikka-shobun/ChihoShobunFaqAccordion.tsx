import { FaqAccordion } from "../shared/FaqAccordion";
import { CHIHO_SHOBUN_FAQ_ITEMS } from "./article-data";

/**
 * FAQの設問本文は article-data.ts（server-safe モジュール）の単一ソースから供給する。
 * FAQPage JSON-LD は page.tsx で buildFaqJsonLd(CHIHO_SHOBUN_FAQ_ITEMS) から生成（手書き禁止）。
 */
export function ChihoShobunFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="chiho-shobun-faq"
      ariaLabel="地方の実家が売れないときの処分方法に関するよくある質問"
      badgeText="Q&A"
      badgeNote="値下げ・買取・空き家バンク・解体・相続放棄まで"
      heading="実家が売れないときの処分方法「よくある質問（FAQ）」"
      lead="値下げの考え方、買取と仲介の違い、空き家バンクの仕組み、解体と固定資産税、相続放棄の期限、遠方からの手続きまで実務の疑問に回答します。"
      items={CHIHO_SHOBUN_FAQ_ITEMS}
    />
  );
}
