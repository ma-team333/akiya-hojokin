import { FaqAccordion } from "../shared/FaqAccordion";
import { MAINTENANCE_FAQ_ITEMS } from "./article-data";

export { MAINTENANCE_FAQ_ITEMS };

/**
 * FAQアコーディオン。設問本文は article-data.ts（非client）の単一ソースから供給し、
 * JSON-LD は page.tsx で buildFaqJsonLd(MAINTENANCE_FAQ_ITEMS) として生成する。
 */
export function MaintenanceFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="maintenance-faq"
      ariaLabel="空き家の管理費用と放置リスク よくある質問"
      badgeText="Q&A"
      badgeNote="費用・法改正・責任の疑問"
      heading="空き家の管理費用・放置リスクの「よくある質問（FAQ）」"
      lead="年間費用の算出方法、改正空家法の管理不全空き家、特例解除のタイミング、倒壊時の責任まで回答します。"
      items={MAINTENANCE_FAQ_ITEMS}
    />
  );
}
