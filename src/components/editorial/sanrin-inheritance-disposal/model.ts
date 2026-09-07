/**
 * 山林の処分・売却・保有コスト比較シミュレーター計算モデル（純関数・React非依存）。
 *
 * `SanrinDisposalSimulator.tsx` と vitest 不変条件テスト
 * (`tests/sanrin-inheritance-disposal-model.test.ts`) の単一計算ソース。
 *
 * 根拠となる費用・換算:
 * - 森林負担金: 相続等により取得した土地所有権の国庫への帰属に関する法律の
 *   負担金の額の算定基準等を定める政令（令和4年政令第356号）第5条の算定式
 *   （面積帯ごと「1㎡単価 × 面積 + 基本額」、千円未満切捨て）。
 * - 審査手数料: 1筆につき14,000円（法務省令）。
 * - 反・町歩: 1反 = 991.736㎡ / 1町歩 = 9,917.36㎡（地積単位換算）。
 *
 * 不変条件: 負担金は政令帯のどの面積でも基本額以上（下限保証）/
 * 立木・土地売却の手取り >= 0（極端な入力でも負にならない）/
 * 面積↑→売却価格↑（単調）。
 */

/** 国庫帰属の審査手数料（万円・1筆14,000円）。 */
export const SANRIN_INSPECTION_FEE_MAN = 1.4;

/** 1反（㎡）。 */
export const TAN_SQM = 991.736;

/** 1町歩（㎡）。 */
export const CHOBU_SQM = 9917.36;

/**
 * 森林負担金の面積帯（令和4年政令第356号第5条）。
 * 円/㎡ × 面積 + 基本額（円）、千円未満切捨て。
 * 上限は当該帯の最大面積（最終帯は無上限 = Infinity）。
 */
export const FOREST_BURDEN_BANDS: readonly {
  maxSqm: number;
  ratePerSqm: number;
  baseYen: number;
}[] = [
  { maxSqm: 750, ratePerSqm: 59, baseYen: 210_000 },
  { maxSqm: 1_500, ratePerSqm: 24, baseYen: 237_000 },
  { maxSqm: 3_000, ratePerSqm: 17, baseYen: 248_000 },
  { maxSqm: 6_000, ratePerSqm: 12, baseYen: 263_000 },
  { maxSqm: 12_000, ratePerSqm: 8, baseYen: 287_000 },
  { maxSqm: Infinity, ratePerSqm: 6, baseYen: 311_000 },
];

/** 森林負担金（万円・政令第5条の算定式・千円未満切捨て）。 */
export function forestBurdenMan(areaSqm: number): number {
  const area = Math.max(0, areaSqm);
  const band =
    FOREST_BURDEN_BANDS.find((b) => area <= b.maxSqm) ??
    FOREST_BURDEN_BANDS[FOREST_BURDEN_BANDS.length - 1];
  const yen = band.ratePerSqm * area + band.baseYen;
  return Math.floor(yen / 1_000) / 10; // 千円未満切捨て → 万円
}

/** 面積 → 反表示（0.1反刻み）。 */
export function areaToTan(areaSqm: number): number {
  return Math.round((areaSqm / TAN_SQM) * 10) / 10;
}

/** 面積 → 町歩表示（0.1町歩刻み）。 */
export function areaToChobu(areaSqm: number): number {
  return Math.round((areaSqm / CHOBU_SQM) * 10) / 10;
}

export interface SanrinSimInputs {
  /** 山林面積（㎡） */
  areaSqm: number;
  /** 森林の種類（cedar=人工林 / mixed=雑木林・放置林） */
  forestType: "cedar" | "mixed";
  /** 接道あり（トラック・重機進入可） */
  hasRoadAccess: boolean;
  /** 年間保有コスト（万円・固定資産税＋交通費＋維持費） */
  annualHoldingCost: number;
  /** 保有継続年数 */
  targetYears: number;
}

export interface SanrinDisposalResult {
  /** 保有継続時の累積コスト（万円・年コスト×年数） */
  cumulativeHoldingCost: number;
  /** 国庫帰属: 手数料・負担金・合計（万円） */
  kokko: { inspectionFee: number; burden: number; total: number };
  /** 立木売却: 材積（㎥）・粗収入・所得税概算・手取り（万円） */
  timber: {
    volume: number;
    grossIncome: number;
    tax: number;
    netProceeds: number;
    viable: boolean;
  };
  /** 土地売却: 想定価格・諸費用・手取り（万円） */
  landSale: { price: number; expenses: number; netProceeds: number };
}

/**
 * 4ルートの収支計算（万円）。定数の根拠は `SanrinDisposalSimulator` の表示注释と
 * 上記政令・税制。手取りは非負クランプ。
 */
export function calcSanrinDisposal(inputs: SanrinSimInputs): SanrinDisposalResult {
  const { areaSqm, forestType, hasRoadAccess, annualHoldingCost, targetYears } = inputs;

  // 1. 保有継続時の累積コスト
  const cumulativeHoldingCost = annualHoldingCost * targetYears;

  // 2. 相続土地国庫帰属: 審査手数料 + 森林負担金（政令算定式）
  const inspectionFee = SANRIN_INSPECTION_FEE_MAN;
  const burden = forestBurdenMan(areaSqm);
  const kokkoTotal = Math.round((inspectionFee + burden) * 10) / 10;

  // 3. 立木売却（皆伐・主伐）: 1,000㎡あたり約35㎥、純手取り1㎥あたり1,500円
  //    （スギ・ヒノキ人工林かつ接道ありの場合のみ成立しやすい）
  const timberVolumePer1000sqm = 35;
  const volume = Math.round((areaSqm / 1000) * timberVolumePer1000sqm);
  const netProfitPerCbm = forestType === "cedar" && hasRoadAccess ? 1500 : 0;
  const grossIncome = Math.round((volume * netProfitPerCbm) / 10000);
  // 山林所得税（特別控除50万円、5分5乗方式の概算: 所得税5%＋住民税10%等 → 15%）
  const taxable = Math.max(0, grossIncome - 50);
  const tax = taxable > 0 ? Math.round(taxable * 0.15 * 10) / 10 : 0;
  const timberNet = Math.max(0, grossIncome - tax);

  // 4. 山林専門売買: 坪単価から概算（㎡あたり30〜200円。立地・接道で変動）
  const pricePerSqm = hasRoadAccess ? (forestType === "cedar" ? 150 : 200) : 30;
  const landPrice = Math.round((areaSqm * pricePerSqm) / 10000);
  const expenses = landPrice > 0 ? Math.max(10, Math.round(landPrice * 0.1)) : 0; // 登記・仲介手数料等

  return {
    cumulativeHoldingCost,
    kokko: { inspectionFee, burden, total: kokkoTotal },
    timber: {
      volume,
      grossIncome,
      tax,
      netProceeds: timberNet,
      viable: netProfitPerCbm > 0,
    },
    landSale: {
      price: landPrice,
      expenses,
      netProceeds: Math.max(0, landPrice - expenses),
    },
  };
}
