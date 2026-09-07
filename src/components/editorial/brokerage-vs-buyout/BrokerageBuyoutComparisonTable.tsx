import { PatternComparisonTable } from "../shared/PatternComparisonTable";
import {
  BROKERAGE_BUYOUT_COMPARISON_COLUMNS,
  BROKERAGE_BUYOUT_COMPARISON_ROWS,
} from "./article-data";

export function BrokerageBuyoutComparisonTable() {
  return (
    <PatternComparisonTable
      sectionId="brokerage-buyout-comparison"
      ariaLabel="不動産売却の仲介と買取の徹底比較表"
      badgeText="手法比較"
      badgeNote="仲介・買取・買取保証"
      heading="「仲介」と「買取」の決定的な違い 6項目比較表"
      lead="売却価格・現金化までのスピード・手数料・室内の荷物・売却後の瑕疵責任など、実務上の重要項目を整理しました。"
      columns={BROKERAGE_BUYOUT_COMPARISON_COLUMNS}
      items={BROKERAGE_BUYOUT_COMPARISON_ROWS}
      prosHeader="主なメリット"
      consHeader="デメリット・注意点"
      recommendationHeader="おすすめのケース"
    />
  );
}
