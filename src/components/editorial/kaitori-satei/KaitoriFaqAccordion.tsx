import { FaqAccordion } from "../shared/FaqAccordion";
import { FAQ_ITEMS } from "./article-data";

export { FAQ_ITEMS };

/** FAQの表示は article-data.ts の FAQ_ITEMS が単一ソース。JSON-LDは buildFaqJsonLd(FAQ_ITEMS) で生成。 */
export function KaitoriFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="kaitori-faq"
      ariaLabel="空き家買取査定 よくある質問"
      badgeText="Q&A"
      badgeNote="老朽化・残置物・登記の実務疑問"
      heading="空き家の買取査定「よくある質問（FAQ）」"
      lead="老朽化した建物や残置物の扱い、相続登記義務化、共有名義、契約不適合責任の免責、特定空家の税影響まで回答します。"
      items={FAQ_ITEMS}
    />
  );
}
