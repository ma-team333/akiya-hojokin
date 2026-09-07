import { FaqAccordion } from "../shared/FaqAccordion";
import { TOKUTEI_AKIYA_FAQ_ITEMS } from "./article-data";

export { TOKUTEI_AKIYA_FAQ_ITEMS } from "./article-data";

export function TokuteiAkiyaFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="tokutei-akiya-faq"
      ariaLabel="特定空家・固定資産税のよくある質問"
      badgeText="Q&A"
      badgeNote="実務・税制の解説"
      heading="特定空家・固定資産税のよくある質問と実務解説"
      lead="固定資産税増税の計算実務、管理不全空家の運用、勧告後の対応、更地化の税負担差など実務上の論点を整理しました。"
      items={TOKUTEI_AKIYA_FAQ_ITEMS}
    />
  );
}

// 別名export（規約互換用）
export { TokuteiAkiyaFaqAccordion as FaqAccordion };
