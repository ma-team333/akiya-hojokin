import { FaqAccordion } from "../shared/FaqAccordion";
import { BROKERAGE_VS_BUYOUT_FAQ_ITEMS } from "./article-data";

export function BrokerageBuyoutFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="brokerage-buyout-faq"
      ariaLabel="不動産売却 仲介と買取 よくある質問"
      badgeText="Q&A"
      badgeNote="実務の疑問と落とし穴"
      heading="不動産の「仲介」と「買取」よくある質問（FAQ）"
      lead="買取相場が仲介より安い理由、仲介手数料ゼロの仕組み、契約不適合責任免責、残置物そのまま引渡しまで実務の疑問に回答します。"
      items={BROKERAGE_VS_BUYOUT_FAQ_ITEMS}
    />
  );
}
