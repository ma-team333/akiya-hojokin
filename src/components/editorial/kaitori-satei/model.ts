/**
 * 空き家買取査定シミュレーター計算モデル（純関数・React非依存）。
 *
 * `KaitoriSateiSimulator.tsx` と vitest 不変条件テスト
 * (`tests/kaitori-satei-model.test.ts`) の単一計算ソース。
 *
 * 不変条件: 査定額 >= 0（控除過多でも負にならない）/ 土地価格↑→査定額↑（単調）/
 * 仲介手数料上限は宅地建物取引業法第46条第1項＋国土交通省告示第十五号の段階算式（税込）。
 */

export type BuildingStatus = "aged" | "resalable";

/**
 * 宅地建物取引業法第46条第1項に基づく国土交通省告示第十五号の仲介手数料上限（税抜・万円単位）。
 * 200万円以下の部分 5%、200万円超400万円以下の部分 4%、400万円超の部分 2%（加算定数なし）。
 */
export function brokerageFeeCapExTax(priceManYen: number): number {
  const p = Math.max(0, Number(priceManYen) || 0);
  if (p <= 200) return p * 0.05;
  if (p <= 400) return 10 + (p - 200) * 0.04;
  return 18 + (p - 400) * 0.02;
}

/** 仲介手数料上限（税込・万円単位）。 */
export function brokerageFeeCapTaxIncluded(priceManYen: number): number {
  return Math.round(brokerageFeeCapExTax(priceManYen) * 1.1);
}

export interface BuyoutEstimateInputs {
  buildingStatus: BuildingStatus;
  /** 土地の想定価格（万円） */
  landPrice: number;
  /** 建物評価額（万円・再販可能時のみ） */
  buildingValue: number;
  /** 解体費用見積額（万円） */
  demolitionCost: number;
  /** 残置物処分費用見積額（万円） */
  remainsCost: number;
  /** 測量・登記等その他費用（万円） */
  otherCost: number;
}

/** 査定額（万円・更地換算または古家評価加算）。負にならない。 */
export function calcBuyoutEstimate(inputs: BuyoutEstimateInputs): {
  rawEstimate: number;
  estimate: number;
} {
  // 老朽化(aged)は解体前提 → 解体費を控除。再販可能(resalable)は古家として評価加算。
  const base =
    inputs.buildingStatus === "resalable"
      ? inputs.landPrice + inputs.buildingValue - inputs.remainsCost - inputs.otherCost
      : inputs.landPrice - inputs.demolitionCost - inputs.remainsCost - inputs.otherCost;
  const raw = base;
  return { rawEstimate: raw, estimate: Math.max(0, Math.round(raw)) };
}

/** 参考: 仲介で現状のまま売却した場合の仲介手数料上限（税込・万円）。 */
export function referenceBrokerageFeeCap(inputs: BuyoutEstimateInputs): number {
  const salePrice =
    inputs.buildingStatus === "resalable"
      ? inputs.landPrice + inputs.buildingValue
      : inputs.landPrice;
  return brokerageFeeCapTaxIncluded(salePrice);
}
