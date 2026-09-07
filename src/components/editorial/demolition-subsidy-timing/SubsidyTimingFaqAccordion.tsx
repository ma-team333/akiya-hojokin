import { FaqAccordion } from "../shared/FaqAccordion";
import { FAQ_ITEMS } from "./article-data";

/**
 * FAQアコーディオン（共有FaqAccordionへのデータ供給のみ）。
 * 設問本文は article-data.ts の FAQ_ITEMS が単一ソース。
 * JSON-LD はページ側で buildFaqJsonLd(FAQ_ITEMS) により生成（手書き禁止）。
 */
export function SubsidyTimingFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="subsidy-timing-faq"
      ariaLabel="空き家解体補助金の申請タイミングと資金計画 よくある質問"
      badgeText="Q&A"
      badgeNote="申請タイミング・立替資金・跡地活用"
      heading="空き家解体補助金の「よくある質問（FAQ）」"
      lead="年度ごとの募集期間・予算枠・受付方式、後払いのキャッシュフロー、解体後の固定資産税と跡地活用まで、申請前に押さえておきたい疑問に回答します。"
      items={FAQ_ITEMS}
    />
  );
}
