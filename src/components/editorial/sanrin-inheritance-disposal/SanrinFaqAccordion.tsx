"use client";

import { FaqAccordion } from "../shared/FaqAccordion";
import { SANRIN_FAQ_ITEMS } from "./article-data";

export function SanrinFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="sanrin-faq"
      ariaLabel="山林の相続・売却・処分・森林組合 よくある質問"
      badgeText="Q&A"
      badgeNote="実務の疑問と落とし穴"
      heading="山林の相続・売却・森林組合に関する「よくある質問（FAQ）」"
      lead="森林組合の買い取り可否、90日以内の届出義務、国庫帰属の難易度、山林所得と譲渡所得の税金区分まで、実務上の疑問に回答します。"
      items={SANRIN_FAQ_ITEMS}
    />
  );
}
