/**
 * 空き家解体費用・補助金・固定資産税シミュレーター計算モデル（純関数・React非依存）。
 *
 * `DemolitionSubsidySimulator.tsx` と vitest 不変条件テスト
 * (`tests/demolition-subsidy-model.test.ts`) の単一計算ソース。
 * 坪単価は既存ドメインロジック `src/lib/demolition-subsidy.ts`（STRUCTURE_DEFINITIONS）
 * を唯一の正本として再利用し、本モデル内に重複定義しない。
 *
 * 不変条件: 自己負担額 >= 0 / 補助金 <= 上限額 / 坪数↑→費用↑（単調）/
 * 更地課税標準は住宅用地特例適用時の6倍（地方税法第349条の3の2）。
 */

import {
  STRUCTURE_DEFINITIONS,
  type StructureType,
} from "@/lib/demolition-subsidy";

export type { StructureType };
export type SiteCondition = "normal" | "narrow" | "sloped";
export type SubsidyRateType = "one_third" | "one_half" | "two_thirds";

/** 敷地条件別の工事費係数（1.0=標準）。当サイト試算用の相対モデル係数（制度的定数ではない）。 */
export const SITE_CONDITION_FACTORS: Record<
  SiteCondition,
  { multiplier: number; desc: string }
> = {
  normal: { multiplier: 1.0, desc: "標準的な解体工法（重機施工＋トラック搬出）" },
  narrow: { multiplier: 1.25, desc: "小型重機または手壊し併用・小運搬費用加算" },
  sloped: { multiplier: 1.4, desc: "全手壊し・クレーン作業・足場養生費用加算" },
};

/** 補助率の選択肢。実際の率・上限は自治体の募集要項に従う（記事本文の類型参照）。 */
export const SUBSIDY_RATE_RATIOS: Record<SubsidyRateType, number> = {
  one_third: 1 / 3,
  one_half: 1 / 2,
  two_thirds: 2 / 3,
};

/** 固定資産税 標準税率（地方税法第350条第1項: 1.4パーセント）。 */
export const STANDARD_TAX_RATE = 0.014;

/** 小規模住宅用地の課税標準の特例率（地方税法第349条の3の2: 課税標準 = 价格の6分の1）。 */
export const SMALL_SCALE_RESIDENTIAL_LAND_RATIO = 1 / 6;

/** 解体費用（万円）。坪単価は lib/demolition-subsidy の STRUCTURE_DEFINITIONS が正本。 */
export function calcDemolitionCostMan(
  structure: StructureType,
  tsubo: number,
  siteCondition: SiteCondition,
): number {
  const safeTsubo = Math.max(5, Math.min(200, Number(tsubo) || 30));
  const baseRatePerTsubo = STRUCTURE_DEFINITIONS[structure].baseCostPerTsubo;
  return Math.round((baseRatePerTsubo * safeTsubo * SITE_CONDITION_FACTORS[siteCondition].multiplier) / 10000);
}

/** 補助金額（万円）。raw = 費用×率、最終 = min(raw, 上限)。 */
export function calcSubsidyMan(
  totalDemolitionCostMan: number,
  rate: SubsidyRateType,
  maxSubsidyCapMan: number,
): { raw: number; final: number } {
  const safeCap = Math.max(0, Number(maxSubsidyCapMan) || 0);
  const raw = Math.round(totalDemolitionCostMan * SUBSIDY_RATE_RATIOS[rate]);
  return { raw, final: Math.min(raw, safeCap) };
}

/** 実質自己負担額（万円）= max(0, 費用 − 補助金)。 */
export function calcNetOutflowMan(
  totalDemolitionCostMan: number,
  finalSubsidyMan: number,
): number {
  return Math.max(0, Math.round(totalDemolitionCostMan - finalSubsidyMan));
}

export interface LandTaxChangeResult {
  /** 建物あり（小規模宅地特例 1/6 適用）の年固定資産税（円） */
  taxWithBuildingYen: number;
  /** 更地（特例除外・本則課税）の年固定資産税（円） */
  taxBareLandYen: number;
  /** 年間増税額（円） */
  taxIncreaseAnnualYen: number;
}

/**
 * 解体前後の土地固定資産税（円）。
 * 課税標準: 建物あり = 評価額×1/6（地方税法第349条の3の2 小規模住宅用地）/
 * 更地 = 評価額（本則）。税率 = 標準税率1.4%（地方税法第350条第1項）。
 * 負担調整措置等により実際の税額はこれより低くなる場合がある（本文記載の前提）。
 */
export function calcLandTaxChange(
  landTaxValuationMan: number,
): LandTaxChangeResult {
  const safeValuation = Math.max(0, Number(landTaxValuationMan) || 0);
  const taxWithBuildingYen = Math.round(
    safeValuation * SMALL_SCALE_RESIDENTIAL_LAND_RATIO * STANDARD_TAX_RATE * 10000,
  );
  const taxBareLandYen = Math.round(safeValuation * STANDARD_TAX_RATE * 10000);
  return {
    taxWithBuildingYen,
    taxBareLandYen,
    taxIncreaseAnnualYen: taxBareLandYen - taxWithBuildingYen,
  };
}

/** 坪 ↔ ㎡ 換算（1坪 = 3.30578㎡）。 */
export function tsuboToSqm(tsubo: number): number {
  return Math.round(tsubo * 3.30578 * 10) / 10;
}
