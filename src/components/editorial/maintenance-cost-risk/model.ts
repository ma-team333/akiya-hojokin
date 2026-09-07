/**
 * 空き家の年間維持費用シミュレーター計算モデル（純関数・React非依存）。
 *
 * `MaintenanceCostSimulator.tsx` と vitest 不変条件テスト
 * (`tests/maintenance-cost-risk-model.test.ts`) の単一計算ソース。
 * 税額は法定の計算式（地方税法）のみで算出する。
 *
 * 出典:
 * - 固定資産税 標準税率1.4% … 地方税法第350条第1項
 * - 都市計画税 制限税率0.3%（市街化区域内）… 地方税法第702条の4第1項（制限税率0.3%）・市町村条例
 * - 小規模住宅用地（200㎡まで）課税標準 固1/6・都計1/3、
 *   一般住宅用地 固1/3・都計2/3 … 地方税法第349条の3の2・附則第15条
 * - 住宅用地の面積上限（一戸建て: 床面積の10倍まで）… 地方税法施行令第52条の11
 * - 指導・勧告等を受けた土地の特例除外 … 地方税法附則第15条（空家特措法の措置に連動）
 */

/** 固定資産税の標準税率（地方税法第350条第1項）。 */
export const FIXED_TAX_RATE = 0.014;
/** 都市計画税の制限税率（市街化区域内・地方税法第702条の4第1項）。 */
export const CITY_TAX_RATE = 0.003;

export interface LandTaxInputs {
  /** 土地の固定資産税評価額（万円） */
  landPrice: number;
  /** 土地面積（㎡） */
  landArea: number;
  /** 建物の固定資産税評価額（万円） */
  buildingPrice: number;
  /** 建物延床面積（㎡）— 住宅用地の範囲は床面積の10倍まで */
  buildingArea: number;
  /** 指導・勧告等を受けた（特例適用外） */
  advised: boolean;
}

export interface LandTaxResult {
  /** 小規模住宅用地として特例計算される面積（㎡・最大200） */
  smallArea: number;
  /** 一般住宅用地として特例計算される面積（㎡・床面積10倍上限の残り） */
  generalArea: number;
  /** 住宅用地に算入されない面積（㎡・床面積の10倍を超える部分） */
  nonResidentialArea: number;
  /** 特例適用時の固定資産税課税標準（土地分・万円） */
  landStandardWith: number;
  /** 特例適用時の都市計画税課税標準（土地分・万円） */
  cityLandStandardWith: number;
  /** 現行の固定資産税課税標準（土地分） */
  landStandard: number;
  /** 現行の都市計画税課税標準（土地分） */
  cityLandStandard: number;
  /** 固定資産税（万円/年） */
  fixedTax: number;
  /** 都市計画税（万円/年） */
  cityTax: number;
  /** 特例が適用されていた場合との年間差額（万円・advised時のみ>0） */
  taxGap: number;
}

/** 住宅用地の面積上限（一戸建て: 床面積の10倍まで・地方税法施行令第52条の11）。 */
export function residentialLandCap(buildingArea: number): number {
  return Math.max(0, (Number(buildingArea) || 0)) * 10;
}

/** 土地の課税標準と年間税額（建物分は評価額そのまま課税標準）。 */
export function calcLandTax(inputs: LandTaxInputs): LandTaxResult {
  const landPrice = Math.max(0, Number(inputs.landPrice) || 0);
  const landArea = Math.max(0, Number(inputs.landArea) || 0);
  const buildingPrice = Math.max(0, Number(inputs.buildingPrice) || 0);

  // 住宅用地に算入されるのは床面積の10倍まで（地方税法施行令第52条の11）
  const cap = residentialLandCap(inputs.buildingArea);
  const residentialArea = Math.min(landArea, cap);
  const smallArea = Math.min(residentialArea, 200);
  const generalArea = Math.max(0, residentialArea - 200);
  const nonResidentialArea = Math.max(0, landArea - residentialArea);

  const unit = landArea > 0 ? landPrice / landArea : 0; // 万円/㎡

  // 特例適用時の課税標準（土地分）: 小規模1/6・一般1/3・住宅用地外は本則
  const landStandardWith =
    unit * smallArea * (1 / 6) +
    unit * generalArea * (1 / 3) +
    unit * nonResidentialArea;
  const cityLandStandardWith =
    unit * smallArea * (1 / 3) +
    unit * generalArea * (2 / 3) +
    unit * nonResidentialArea;

  const landStandard = inputs.advised ? landPrice : landStandardWith;
  const cityLandStandard = inputs.advised ? landPrice : cityLandStandardWith;

  const fixedTax = (landStandard + buildingPrice) * FIXED_TAX_RATE;
  const cityTax = (cityLandStandard + buildingPrice) * CITY_TAX_RATE;
  const fixedTaxIfKept = (landStandardWith + buildingPrice) * FIXED_TAX_RATE;
  const cityTaxIfKept = (cityLandStandardWith + buildingPrice) * CITY_TAX_RATE;

  return {
    smallArea,
    generalArea,
    nonResidentialArea,
    landStandardWith,
    cityLandStandardWith,
    landStandard,
    cityLandStandard,
    fixedTax,
    cityTax,
    taxGap: inputs.advised ? fixedTax + cityTax - (fixedTaxIfKept + cityTaxIfKept) : 0,
  };
}

export interface UpkeepInputs {
  /** 火災保険等（万円/年） */
  insurance: number;
  /** 修繕・草刈り等（万円/年） */
  upkeep: number;
  /** 巡回管理代行等（万円/年） */
  agent: number;
  /** 通い交通費等（万円/年） */
  travel: number;
}

/** 税以外の年間維持費（万円/年）。入力値の合計のみ（市場相場は主張しない）。 */
export function calcUpkeepTotal(inputs: UpkeepInputs): number {
  const v = (x: number) => Math.max(0, Number(x) || 0);
  return v(inputs.insurance) + v(inputs.upkeep) + v(inputs.agent) + v(inputs.travel);
}

/** 年間合計（万円）と n 年累計（万円）。 */
export function calcAnnualTotal(
  tax: LandTaxResult,
  upkeepTotal: number,
): number {
  return tax.fixedTax + tax.cityTax + upkeepTotal;
}

export function calcCumulative(annualTotal: number, years: number): number {
  return Math.max(0, Number(annualTotal) || 0) * Math.max(0, Number(years) || 0);
}
