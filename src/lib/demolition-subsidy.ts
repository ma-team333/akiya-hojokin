/**
 * 空き家解体補助金（自治体助成金）計算ロジックおよび診断モデル
 */

export type StructureType = "wood" | "steel" | "rc";

export interface StructureMeta {
  name: string;
  label: string;
  description: string;
  baseCostPerTsubo: number; // 円/坪
  range: [number, number]; // [min, max] 円/坪
}

export const STRUCTURE_DEFINITIONS: Record<StructureType, StructureMeta> = {
  wood: {
    name: "木造",
    label: "木造（W造）",
    description: "一般的な木造住宅。解体しやすく費用は比較的抑えめ",
    baseCostPerTsubo: 45000,
    range: [40000, 55000],
  },
  steel: {
    name: "鉄骨造",
    label: "軽量・重量鉄骨造（S造）",
    description: "プレハブや鉄骨住宅。建材の切断や分別処理が必要",
    baseCostPerTsubo: 60000,
    range: [50000, 70000],
  },
  rc: {
    name: "RC造",
    label: "鉄筋コンクリート造（RC/SRC造）",
    description: "頑丈なコンクリート構造。重機作業と産業廃棄物処分費が高額",
    baseCostPerTsubo: 80000,
    range: [70000, 100000],
  },
};

export type SubsidyProgramType =
  | "dangerous_decay" // 計算例A（制度相場ではない）
  | "standard_vacant" // 計算例B（制度相場ではない）
  | "substandard_housing" // 計算例C（制度相場ではない）
  | "custom"; // 自治体要項から入力

export interface SubsidyProgramMeta {
  type: SubsidyProgramType;
  name: string;
  rate: number; // 0.5 = 1/2
  rateText: string;
  cap: number; // 上限額（円）
  capText: string;
  description: string;
}

export const SUBSIDY_PROGRAMS: Record<SubsidyProgramType, SubsidyProgramMeta> = {
  dangerous_decay: {
    type: "dangerous_decay",
    name: "計算例A（1/2・上限100万円）",
    rate: 0.5,
    rateText: "1/2",
    cap: 1000000,
    capText: "最大100万円",
    description: "補助額計算を検証するための例示値。全国相場・代表値ではありません",
  },
  standard_vacant: {
    type: "standard_vacant",
    name: "計算例B（1/3・上限50万円）",
    rate: 0.333333,
    rateText: "1/3",
    cap: 500000,
    capText: "最大50万円",
    description: "補助額計算を検証するための例示値。全国相場・代表値ではありません",
  },
  substandard_housing: {
    type: "substandard_housing",
    name: "計算例C（4/5・上限150万円）",
    rate: 0.8,
    rateText: "4/5",
    cap: 1500000,
    capText: "最大150万円",
    description: "補助額計算を検証するための例示値。全国相場・代表値ではありません",
  },
  custom: {
    type: "custom",
    name: "自治体の個別指定（カスタム）",
    rate: 0.5,
    rateText: "指定比率",
    cap: 500000,
    capText: "指定上限",
    description: "お住まいの自治体募集要項に合わせて補助率と上限を自由設定",
  },
};

export interface DemolitionCostInput {
  structure: StructureType;
  tsubo: number;
  hasNarrowRoad?: boolean; // 狭小地・重機搬入困難（+15%）
  hasLeftoverWaste?: boolean; // 家財・残置物あり（+25万円）
  hasAsbestos?: boolean; // アスベスト調査・一部除去（+15万円）
}

export interface DemolitionCostResult {
  baseCost: number; // 基本建物解体費
  narrowRoadCost: number; // 道路・敷地割増
  wasteCost: number; // 残置物処分費
  asbestosCost: number; // アスベスト対策費
  totalDemolitionCost: number; // 総解体工事費
  costPerTsubo: number; // 実効坪単価
}

export function calculateDemolitionCost(input: DemolitionCostInput): DemolitionCostResult {
  const { structure, tsubo, hasNarrowRoad = false, hasLeftoverWaste = false, hasAsbestos = false } = input;
  const def = STRUCTURE_DEFINITIONS[structure];
  const safeTsubo = Math.max(5, Math.min(200, Number(tsubo) || 30));

  const baseCost = Math.round(def.baseCostPerTsubo * safeTsubo);
  const narrowRoadCost = hasNarrowRoad ? Math.round(baseCost * 0.15) : 0;
  const wasteCost = hasLeftoverWaste ? 250000 : 0;
  const asbestosCost = hasAsbestos ? 150000 : 0;

  const totalDemolitionCost = baseCost + narrowRoadCost + wasteCost + asbestosCost;
  const costPerTsubo = Math.round(totalDemolitionCost / safeTsubo);

  return {
    baseCost,
    narrowRoadCost,
    wasteCost,
    asbestosCost,
    totalDemolitionCost,
    costPerTsubo,
  };
}

export interface SubsidyCalculationInput extends DemolitionCostInput {
  programType: SubsidyProgramType;
  customRate?: number; // 0.1 ~ 1.0
  customCap?: number; // 円
}

export interface SubsidyCalculationResult {
  cost: DemolitionCostResult;
  program: SubsidyProgramMeta;
  subsidyAmount: number; // 補助金額（円）
  selfPayAmount: number; // 実質自己負担額（円）
  effectiveSubsidyRate: number; // 総額に対する実質補助割合（0.0〜1.0）
}

export function calculateDemolitionSubsidy(input: SubsidyCalculationInput): SubsidyCalculationResult {
  const cost = calculateDemolitionCost(input);
  let program = SUBSIDY_PROGRAMS[input.programType];

  let rate = program.rate;
  let cap = program.cap;

  if (input.programType === "custom") {
    rate = Math.max(0.05, Math.min(1.0, input.customRate ?? 0.5));
    cap = Math.max(50000, Math.min(5000000, input.customCap ?? 500000));
    program = {
      ...program,
      rate,
      rateText: `${Math.round(rate * 100)}%`,
      cap,
      capText: `最大${Math.round(cap / 10000)}万円`,
    };
  }

  // 計算モデルでは基本工事費+狭小割増を対象経費として扱う。実際の補助対象経費は自治体要項に従う。
  const eligibleCost = cost.baseCost + cost.narrowRoadCost;
  const rawSubsidy = Math.floor(eligibleCost * rate);
  const subsidyAmount = Math.min(rawSubsidy, cap);
  const selfPayAmount = Math.max(0, cost.totalDemolitionCost - subsidyAmount);
  const effectiveSubsidyRate = cost.totalDemolitionCost > 0 ? subsidyAmount / cost.totalDemolitionCost : 0;

  return {
    cost,
    program,
    subsidyAmount,
    selfPayAmount,
    effectiveSubsidyRate,
  };
}

export interface EligibilityQuestion {
  id: string;
  title: string;
  subtitle: string;
  weight: number; // 重要度（重み）
  isDisqualifier?: boolean; // これがNOだと受給不可となるクリティカル条件
}

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    id: "not_started",
    title: "まだ解体業者と契約・着工していない",
    subtitle: "【最重要】ほとんどの自治体で『交付決定前の着工』は補助金対象外になります",
    weight: 30,
    isDisqualifier: true,
  },
  {
    id: "ownership",
    title: "登記上の所有者本人、または全法定相続人の同意がある",
    subtitle: "名義人確認書類（登記事項証明書）や遺産分割協議書・同意書が提出可能",
    weight: 20,
    isDisqualifier: true,
  },
  {
    id: "tax_paid",
    title: "固定資産税・住民税などの市町村税に滞納がない",
    subtitle: "申請者（所有者・相続人）の完納証明書が必要となります",
    weight: 15,
    isDisqualifier: true,
  },
  {
    id: "vacancy_period",
    title: "おおむね1年以上、誰も居住しておらず空き家状態である",
    subtitle: "水道・電気の使用実績や住民票の転出状況で自治体が確認します",
    weight: 15,
  },
  {
    id: "building_decay",
    title: "建物の老朽化・破損が目立つ（倒壊・部材落下の危険性がある）",
    subtitle: "自治体の事前調査（外観目視・老朽度判定）で点数化されます",
    weight: 10,
  },
  {
    id: "land_utilization",
    title: "解体後の更地を適切に管理・売却・活用する見込みがある",
    subtitle: "自治体によっては更地の一定期間適正管理や誓約書の提出が求められます",
    weight: 10,
  },
];

export type DiagnosticRank = "A" | "B" | "C" | "D";

export interface DiagnosticResult {
  score: number; // 0 - 100
  rank: DiagnosticRank;
  rankTitle: string;
  rankBadgeColor: string;
  summary: string;
  actionItems: string[];
  disqualifiedReason?: string;
}

export function evaluateEligibility(answers: Record<string, boolean>): DiagnosticResult {
  let score = 0;
  let disqualifiedReason: string | undefined = undefined;

  for (const q of ELIGIBILITY_QUESTIONS) {
    const isChecked = Boolean(answers[q.id]);
    if (isChecked) {
      score += q.weight;
    } else if (q.isDisqualifier) {
      if (q.id === "not_started") {
        disqualifiedReason = "すでに工事契約・着工している場合、事後申請は原則認められません。";
      } else if (q.id === "ownership") {
        disqualifiedReason = "所有権の確認または相続人全員の合意がないと申請が受理されません。";
      } else if (q.id === "tax_paid") {
        disqualifiedReason = "市町村税の滞納があると補助金の交付要件を満たせません。";
      }
    }
  }

  if (disqualifiedReason) {
    return {
      score: Math.min(score, 45),
      rank: "D",
      rankTitle: "要確認・現状では対象外リスク大",
      rankBadgeColor: "#e53e3e",
      summary: `必須要件に未達の項目があります（${disqualifiedReason}）。解消してから自治体へ事前相談してください。`,
      actionItems: [
        "着工前であれば、解体業者への工事発注・契約を一旦ストップする",
        "登記名義人の確認および相続人間の同意を取り付ける",
        "未納の市町村税を速やかに納付し完納証明書を取得する",
      ],
      disqualifiedReason,
    };
  }

  if (score >= 85) {
    return {
      score,
      rank: "A",
      rankTitle: "受給可能性：極めて高い（A判定）",
      rankBadgeColor: "#078c95",
      summary: "自治体の空き家解体補助金の主要要件を網羅しています。今年度の公募枠が埋まる前に、速やかに自治体窓口へ事前相談を行ってください。",
      actionItems: [
        "役所の空き家対策窓口（建築指導課など）へ事前相談・現地調査を申し込む",
        "解体業者2〜3社から相見積もりを取得（交付申請書に添付が必要）",
        "自治体の交付決定通知書を受け取った後に正式着工契約を結ぶ",
      ],
    };
  }

  if (score >= 65) {
    return {
      score,
      rank: "B",
      rankTitle: "受給可能性：良好（B判定）",
      rankBadgeColor: "#e56f2d",
      summary: "補助金対象となる可能性が高い状態です。建物の老朽度判定や空き家期間の証明書類について自治体窓口で確認しましょう。",
      actionItems: [
        "空き家になった時期（水道休止日や住民票除票）を確認する",
        "自治体の老朽危険度チェック（職員による現地確認）の日程を調整する",
        "解体見積書の取得と並行して申請書類一式を準備する",
      ],
    };
  }

  return {
    score,
    rank: "C",
    rankTitle: "受給可能性：要相談・要件整備が必要（C判定）",
    rankBadgeColor: "#d97706",
    summary: "一部の要件で確認が必要です。老朽度や空き家期間の認定基準は自治体ごとに異なるため、まずは役所へ個別相談をおすすめします。",
    actionItems: [
      "自治体の空き家解体補助金の最新要綱を取り寄せる",
      "解体以外の選択肢（古家付き土地売却や買取）も視野に見積もりを比較する",
      "自治体職員に写真や図面を見せて対象になり得るかヒアリングする",
    ],
  };
}
