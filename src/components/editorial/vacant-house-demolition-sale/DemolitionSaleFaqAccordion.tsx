import { FaqAccordion } from "../shared/FaqAccordion";
import { DEMOLITION_SALE_FAQ_ITEMS } from "./article-data";

export function DemolitionSaleFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="demolition-sale-faq"
      ariaLabel="空き家解体・更地売却 よくある質問"
      badgeText="Q&A"
      badgeNote="解体・税金・特約の実務疑問"
      heading="空き家売却・更地化の「よくある質問（FAQ）」"
      lead="固定資産税の増税時期、管理不全空家の勧告リスク、更地渡し特約の仕組み、自治体補助金の申請ルールまで実務の疑問に回答します。"
      items={DEMOLITION_SALE_FAQ_ITEMS}
    />
  );
}

export { DEMOLITION_SALE_FAQ_ITEMS };
