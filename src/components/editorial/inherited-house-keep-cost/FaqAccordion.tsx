import React from "react";
import { FaqAccordion } from "../shared/FaqAccordion";
import { INHERITED_HOUSE_KEEP_COST_FAQ_ITEMS } from "./article-data";

export function InheritedHouseKeepCostFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="inherited-house-keep-cost-faq"
      ariaLabel="相続した家を売らない場合の維持費・固定資産税 よくある質問"
      badgeText="Q&A"
      badgeNote="維持費・固定資産税・放置リスクの実務疑問"
      heading="相続した家を売らない選択に関する「よくある質問（FAQ）」"
      lead="年間維持費の目安、特定空家・管理不全空家による固定資産税の特例解除、必須の管理ルーティン、民法上の賠償責任、3,000万円特別控除の期限まで客観的に解説します。"
      items={INHERITED_HOUSE_KEEP_COST_FAQ_ITEMS}
    />
  );
}
