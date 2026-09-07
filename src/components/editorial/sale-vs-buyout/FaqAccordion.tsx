import { FaqAccordion } from "../shared/FaqAccordion";
import { SALE_VS_BUYOUT_FAQ_ITEMS } from "./article-data";

export function SaleVsBuyoutFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="sale-vs-buyout-faq"
      ariaLabel="空き家売却・買取 よくある質問"
      badgeText="Q&A"
      badgeNote="売却・買取実務の疑問と落とし穴"
      heading="空き家売却・買取の「よくある質問（FAQ）」"
      lead="買取相場の算出根拠、契約不適合責任免責の法意、3,000万円特別控除の併用、管理不全空家による固定資産税リスクまで実務の疑問に回答します。"
      items={SALE_VS_BUYOUT_FAQ_ITEMS}
    />
  );
}
