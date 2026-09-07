import { FaqAccordion } from "../shared/FaqAccordion";
import { LEASEBACK_FAQ_ITEMS } from "./article-data";

/**
 * FAQの設問本文は article-data.ts（server-safe モジュール）の単一ソースから供給する。
 * FAQPage JSON-LD は page.tsx で buildFaqJsonLd(LEASEBACK_FAQ_ITEMS) から生成（手書き禁止）。
 */
export function LeasebackFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="leaseback-faq"
      ariaLabel="リースバック（自宅売却して住み続ける）に関するよくある質問"
      badgeText="Q&A"
      badgeNote="家賃相場から税務・トラブルまで"
      heading="リースバックの「よくある質問（FAQ）」"
      lead="家賃の決まり方と相場、住み続けられる期間、買戻し、譲渡所得税、住宅ローン控除、固定資産税・修繕費の負担、トラブルと相談先まで実務の疑問に回答します。"
      items={LEASEBACK_FAQ_ITEMS}
    />
  );
}
