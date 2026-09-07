import { FaqAccordion } from "../shared/FaqAccordion";
import { DEMOLITION_FAQ_ITEMS } from "./article-data";

export { DEMOLITION_FAQ_ITEMS };

export function DemolitionFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="demolition-faq"
      ariaLabel="空き家解体補助金と自治体制度のよくある質問"
      badgeText="Q&A"
      badgeNote="申請タイミング・立替資金・固定資産税"
      heading="空き家解体補助金の「よくある質問（FAQ）」"
      lead="契約・着工前の確認、自治体ごとの募集期間・予算枠・受付方式、工事代金の立替キャッシュフロー、更地後の固定資産税変化まで、実務上の重要事項を解説します。"
      items={DEMOLITION_FAQ_ITEMS}
    />
  );
}
