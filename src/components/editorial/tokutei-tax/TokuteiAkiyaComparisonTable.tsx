import { PatternComparisonTable } from "../shared/PatternComparisonTable";
import {
  TOKUTEI_AKIYA_PATTERNS,
  TOKUTEI_AKIYA_PATTERNS_COLUMNS,
} from "./article-data";

export {
  TOKUTEI_AKIYA_PATTERNS,
  TOKUTEI_AKIYA_PATTERNS_COLUMNS,
} from "./article-data";

export function TokuteiAkiyaComparisonTable() {
  return (
    <PatternComparisonTable
      sectionId="tokutei-akiya-comparison"
      ariaLabel="一般空家・管理不全空家・特定空家の違いと税制比較"
      badgeText="空家分類比較"
      badgeNote="特例維持から強制解体まで"
      heading="一般空家・管理不全空家・特定空家の違いと税制比較"
      lead="管理状態による3区分の法的定義と、それぞれの固定資産税・行政処分・罰則の違いを整理しました。"
      columns={TOKUTEI_AKIYA_PATTERNS_COLUMNS}
      items={TOKUTEI_AKIYA_PATTERNS}
    />
  );
}

// 別名export（規約互換用）
export { TokuteiAkiyaComparisonTable as ComparisonTable };
