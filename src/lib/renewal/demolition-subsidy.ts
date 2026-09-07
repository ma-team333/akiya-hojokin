/**
 * 空き家解体補助金（LT-159, regulation-eligibility テンプレート）の制度データ契約と
 * fail-closed ルール。SOB-405 ページコントラクト準拠。
 *
 * ルール（evidence_gate: not-collected / primary source mandatory）:
 * - このページは自治体の制度内容（受付状況・上限額・要件・期限）を一切主張しない。
 * - 検証済みデータ（VERIFIED_MUNICIPALITY_PROGRAMS）が存在し、verified_at が
 *   鮮度 SLA 内のときだけ「検証済み」として表示する。それ以外はすべて 未確認。
 * - 支給の確定・内定を表明しない。判定は3値（likely-eligible / official-confirmation-needed /
 *   likely-ineligible）で、公式確認を必ず伴う。
 */

/** 自治体制度データ契約（issue SCOPE / Municipality program data contract）。 */
export interface MunicipalityDemolitionProgram {
  municipality_code: string;
  municipality_name: string;
  program_type: string;
  program_name: string;
  target_property: string;
  /** 検証済みの場合のみ数値。未検証は null。 */
  subsidy_rate: string | null;
  max_amount: number | null;
  application_open: string | null;
  application_close: string | null;
  status: "受付中" | "終了" | "次年度未発表" | "未確認";
  required_precheck: string;
  official_url: string;
  /** ISO date (YYYY-MM-DD)。一次情報（自治体公式ページ）で確認した日。 */
  verified_at: string;
}

/**
 * 検証済み自治体制度データ（SOB-675 row 4・ENRICH_EXISTING）。
 * すべて自治体公式ページ（一次情報）のみから 2026-08-17 に確認した内容を記録する。
 * 鮮度 SLA（90日）と lookupMunicipalityProgram の fail-closed はここから自動で効く。
 * 数字・受付状況は確認日時点の公式ページの記載のみ。 scraping 由来の断定は入れない。
 * ponytail: この配列が制度データの唯一の投入口。追加は一次情報確認日付きで。
 */
export const VERIFIED_MUNICIPALITY_PROGRAMS: readonly MunicipalityDemolitionProgram[] = [
  {
    municipality_code: "292010",
    municipality_name: "奈良市",
    program_type: "特定空家等除却費用補助金",
    program_name: "奈良市特定空家等除却費用補助金",
    target_property: "特定空家等の判断を受けた空家等（倒壊等危険・衛生有害等の状態で市が判断）",
    subsidy_rate: "除却工事費用の2分の1以内",
    max_amount: 300000,
    application_open: "2026-04-13",
    application_close: null,
    status: "受付中",
    required_precheck: "申請前に特定空家等の判断を受けていること（予算上限到達で受付終了）",
    official_url: "https://www.city.nara.lg.jp/site/akiya-bank/9205.html",
    verified_at: "2026-08-16",
  },
  {
    municipality_code: "292095",
    municipality_name: "生駒市",
    program_type: "既存住宅解体工事費用補助",
    program_name: "既存住宅解体工事補助金",
    target_property: "平成12年以前に建築された住宅・長屋・共同住宅で耐震基準未満のもの（将来空き家化防止が制度目的）",
    subsidy_rate: "補助対象経費の23.0%（戸建て限度50万円・長屋等は100万円）",
    max_amount: 500000,
    application_open: "2026-05-20",
    application_close: null,
    status: "終了",
    required_precheck: "解体契約・着手前の補助申請（建築課建築審査係）・予算到達により令和8年度受付休止",
    official_url: "https://www.city.ikoma.lg.jp/0000009876.html",
    verified_at: "2026-08-16",
  },
  {
    municipality_code: "292052",
    municipality_name: "橿原市",
    program_type: "空家等除却事業補助金",
    program_name: "橿原市空家等除却補助金",
    target_property: "不良住宅空家（市の認定済み）または跡地活用事業（3年以上の公共利用）予定の空家等",
    subsidy_rate: "除却工事費の5分の4以内",
    max_amount: 500000,
    application_open: null,
    application_close: null,
    status: "受付中",
    required_precheck: "不良住宅空家の認定または跡地活用事業計画の事前確認（住宅政策課）",
    official_url: "https://www.city.kashihara.nara.jp/living_scene/sumai_hikkoshi/3/16183.html",
    verified_at: "2026-08-16",
  },
  {
    municipality_code: "131000",
    municipality_name: "東京都",
    program_type: "空き家家財整理・解体促進事業",
    program_name: "東京都空き家家財整理・解体促進事業",
    target_property: "都内に所在する空き家（ワンストップ相談窓口の相談者が対象）",
    subsidy_rate: "解体費用（税抜）の2分の1（家財整理は別枠で上限5万円）",
    max_amount: 100000,
    application_open: null,
    application_close: null,
    status: "未確認",
    required_precheck: "東京都空き家ワンストップ相談窓口での相談が前提。公式ページに今年度の受付状況の記載がないため受付状況は未確認として扱う",
    official_url: "https://www.juutakuseisaku.metro.tokyo.lg.jp/akiya/hojo/kaitai_seiri",
    verified_at: "2026-08-20",
  },
];

/** 制度状況の再確認 SLA（日）。これを過ぎた verified_at は 未確認 に落とす。 */
export const PROGRAM_REVIEW_SLA_DAYS = 90;

export type MunicipalityProgramStatus = "受付中" | "終了" | "次年度未発表" | "未確認";

export interface MunicipalityProgramLookupResult {
  query: string;
  status: MunicipalityProgramStatus;
  /** 検証済みの場合のみ確認日（YYYY-MM-DD）。未確認は null = UNVERIFIED。 */
  verified_at: string | null;
  program: MunicipalityDemolitionProgram | null;
  reason: string;
  /** 公式確認への導線。検証済みエントリの URL または総合窓口の案内。 */
  officialCheckNote: string;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * ISO date (YYYY-MM-DD) が実在する暦日か（月・日・うるう年を含む厳密検証）。
 * Date.parse は 2026-06-31 のような存在しない日付を翌月1日に正規化して
 * 有効扱いにするため、fail-closed には自前の暦検証が必須。
 */
function isRealCalendarDate(iso: string): boolean {
  if (!ISO_DATE_RE.test(iso)) return false;
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  if (m < 1 || m > 12 || d < 1) return false;
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return d <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
}

function daysBetween(aIso: string, bIso: string): number {
  const a = Date.parse(`${aIso}T00:00:00Z`);
  const b = Date.parse(`${bIso}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.NaN;
  return Math.round((b - a) / 86_400_000);
}

/** 空白のみ除去。都府県の末尾除去は部分一致を許すため行わない（完全一致契約）。 */
function normalizeMunicipalityName(value: string): string {
  return value.replace(/[\s　]/g, "");
}

/**
 * 自治体名から解体補助金制度の状況を引く。fail-closed:
 * 検証済みエントリが無い／鮮度 SLA 超過／名前が一致しない → すべて 未確認。
 */
export function lookupMunicipalityProgram(
  query: string,
  todayIso: string = new Date().toISOString().slice(0, 10),
  programs: readonly MunicipalityDemolitionProgram[] = VERIFIED_MUNICIPALITY_PROGRAMS,
): MunicipalityProgramLookupResult {
  const normalized = normalizeMunicipalityName(query.trim());
  if (normalized === "") {
    return {
      query,
      status: "未確認",
      verified_at: null,
      program: null,
      reason: "自治体名が入力されていません",
      officialCheckNote: "お住まい・物件所在地の市区町村名を入力すると、このページで確認できている範囲を表示します。",
    };
  }

  // 完全一致のみ（正規の自治体名 または 自治体コード）。部分一致・曖昧は 未確認。
  const trimmedQuery = query.trim();
  const matched = programs.filter(
    (p) => normalizeMunicipalityName(p.municipality_name) === normalized || trimmedQuery === p.municipality_code,
  );

  if (matched.length === 0) {
    return {
      query,
      status: "未確認",
      verified_at: null,
      program: null,
      reason:
        "自治体名（市区町村名）が完全一致しないため特定できません。制度の有無も含め、自治体の公式情報で確認します",
      officialCheckNote:
        "市区町村の公式サイトで「空き家 解体 除却 補助金」を検索し、担当窓口（空き家対策・住宅政策課など）に確認します。",
    };
  }

  if (matched.length > 1) {
    return {
      query,
      status: "未確認",
      verified_at: null,
      program: null,
      reason: `「${query}」は複数の自治体に一致するため特定できません。自治体名（市区町村名）を完全な形で入力してください`,
      officialCheckNote:
        "市区町村の公式サイトで「空き家 解体 除却 補助金」を検索し、担当窓口（空き家対策・住宅政策課など）に確認します。",
    };
  }

  const exact = matched[0];
  // 存在しない暦日（例: 2026-06-31）は日付演算の前に排除する（fail-closed）。
  const ageDays = isRealCalendarDate(exact.verified_at) ? daysBetween(exact.verified_at, todayIso) : Number.NaN;
  if (Number.isNaN(ageDays) || ageDays < 0) {
    return {
      query,
      status: "未確認",
      verified_at: null,
      program: null,
      reason: `確認日（${exact.verified_at}）が無効または未来日のため、未確認として扱います`,
      officialCheckNote: `最新の受付状況は ${exact.official_url} で必ず確認します。`,
    };
  }
  if (ageDays > PROGRAM_REVIEW_SLA_DAYS) {
    return {
      query,
      status: "未確認",
      verified_at: null,
      program: null,
      reason: `確認日（${exact.verified_at}）が鮮度基準（${PROGRAM_REVIEW_SLA_DAYS}日）を超えたため、未確認として扱います`,
      officialCheckNote: `最新の受付状況は ${exact.official_url} で必ず確認します。`,
    };
  }

  return {
    query,
    status: exact.status,
    verified_at: exact.verified_at,
    program: exact,
    reason: `${exact.municipality_name}（${exact.municipality_code}）の制度状況（${exact.verified_at} 確認済み）。予算・受付は変動するため、申請前に公式ページで再確認します。`,
    officialCheckNote: `${exact.official_url} （${exact.verified_at} 確認）`,
  };
}

/** 絞り込み質問の選択肢（FV: 制度確認 → 事前相談 → 申請 → 決定 → 契約 → 解体）。 */
export const DEMOLITION_PLAN_STAGE_OPTIONS = [
  { value: "not-started", label: "まだ何も調べていない" },
  { value: "program-check", label: "自治体の制度を調べている" },
  { value: "consulting", label: "事前相談・事前審査の段階" },
  { value: "applying", label: "申請を準備・提出している" },
  { value: "decided", label: "交付決定済み" },
  { value: "contracted", label: "解体契約を結んだ／着工した" },
] as const;

export const DEMOLITION_OWNERSHIP_OPTIONS = [
  { value: "owner", label: "自分（家族）名義で所有している" },
  { value: "inheritance-pending", label: "相続が未整理" },
  { value: "other", label: "名義が自分ではない（賃貸・他人名義など）" },
] as const;

export const DEMOLITION_BUILDING_STATE_OPTIONS = [
  { value: "dangerous", label: "倒壊寸前・特定空き家等を指摘されている" },
  { value: "poor", label: "傷みが大きく、住む・貸すのは難しい" },
  { value: "old", label: "古いが建物は残っている" },
] as const;

export const DEMOLITION_WORK_STATUS_OPTIONS = [
  { value: "before-contract", label: "解体契約はまだ（見積・相談の段階）" },
  { value: "planned-soon", label: "近く解体したい・業者と調整中" },
  { value: "already-done", label: "すでに解体済み・着工済み" },
] as const;

export const DEMOLITION_LAND_DEMAND_OPTIONS = [
  { value: "unclear", label: "不明（更地としての需要を確認していない）" },
  { value: "expected", label: "見込める（更地の買い手が想定できる）" },
] as const;

export type DemolitionPlanStage = (typeof DEMOLITION_PLAN_STAGE_OPTIONS)[number]["value"];
export type DemolitionOwnership = (typeof DEMOLITION_OWNERSHIP_OPTIONS)[number]["value"];
export type DemolitionBuildingState = (typeof DEMOLITION_BUILDING_STATE_OPTIONS)[number]["value"];
export type DemolitionWorkStatus = (typeof DEMOLITION_WORK_STATUS_OPTIONS)[number]["value"];

export interface DemolitionSubsidyScreenInput {
  municipalityStatus: MunicipalityProgramStatus;
  /**
   * lookupMunicipalityProgram の結果（検証済み証拠）。likely-eligible には
   * 新鮮で整合した証拠が必須。素の「受付中」文字列だけでは到達しない（fail-closed）。
   */
  programProof?: MunicipalityProgramLookupResult | null;
  ownership: DemolitionOwnership;
  buildingState: DemolitionBuildingState;
  workStatus: DemolitionWorkStatus;
  /** 証拠の鮮度判定基準日（テスト注入用）。既定は今日。 */
  todayIso?: string;
}

export type DemolitionSubsidyVerdict = "likely-eligible" | "official-confirmation-needed" | "likely-ineligible";

export interface DemolitionSubsidyScreenResult {
  verdict: DemolitionSubsidyVerdict;
  title: string;
  reasons: readonly string[];
  /** 必ず伴う公式確認・専門家への引き渡し。 */
  handoff: string;
  /** 申請前の不可逆アクションに関する警告。 */
  preContractWarning: string;
}

/**
 * likely-eligible に必要な検証済み証拠のバリデータ（fail-closed）。
 * ルックアップと制度の双方が受付中・証拠と制度の確認日一致・鮮度 SLA 内・
 * 自治体識別と公式URLが有効、すべて揃ってのみ true。
 */
export function isFreshOpenProgramProof(
  proof: MunicipalityProgramLookupResult | null | undefined,
  todayIso: string,
): proof is MunicipalityProgramLookupResult & { verified_at: string; program: MunicipalityDemolitionProgram } {
  if (proof == null) return false;
  if (proof.status !== "受付中" || proof.program == null || proof.verified_at == null) return false;
  const program = proof.program;
  if (program.status !== "受付中") return false;
  if (program.verified_at !== proof.verified_at) return false;
  if (!isRealCalendarDate(program.verified_at)) return false;
  const ageDays = daysBetween(program.verified_at, todayIso);
  if (Number.isNaN(ageDays) || ageDays < 0 || ageDays > PROGRAM_REVIEW_SLA_DAYS) return false;
  if (program.municipality_code.trim() === "" || program.municipality_name.trim() === "") return false;
  if (!/^https?:\/\/.+/.test(program.official_url)) return false;
  return true;
}

/**
 * 制度適用の見立て（3値・非保証）。確定しない:
 * - likely-eligible は「新鮮に検証済みの制度が受付中（programProof）＋解体契約前＋所有者」
 *   の組み合わせのみ。素の municipalityStatus: "受付中" だけでは到達しない（fail-closed）。
 *   検証済みデータが無い本日の状態では返り得ない。
 * - likely-ineligible は利用者自身が答えた客観的事実（解体済み・所有者でない）のみ。
 * - それ以外はすべて official-confirmation-needed。
 */
export function screenDemolitionSubsidy(input: DemolitionSubsidyScreenInput): DemolitionSubsidyScreenResult {
  const todayIso = input.todayIso ?? new Date().toISOString().slice(0, 10);
  const verifiedOpen = isFreshOpenProgramProof(input.programProof, todayIso);
  const preContractWarning =
    "多くの自治体では、申請・交付決定前に解体契約を結ぶ・着工すると補助対象外になります。確認が取れるまで契約・着工は行いません。";

  if (input.workStatus === "already-done") {
    return {
      verdict: "likely-ineligible",
      title: "解体済みの場合、事後申請は原則対象外",
      reasons: [
        "解体補助金は原則、申請→交付決定→契約→着工の順番が前提です",
        "まれに完了後の特例や別制度（除撤費の助成など）がある自治体もあります",
      ],
      handoff: "自治体の担当窓口に「解体済みだが何らかの制度はあるか」を確認します。事後適用の可否は自治体の判断です。",
      preContractWarning,
    };
  }

  if (input.ownership === "other") {
    return {
      verdict: "likely-ineligible",
      title: "所有者でないと申請主体になれないのが原則",
      reasons: [
        "解体補助金の申請者は原則、建物の所有者（または管理責任者）です",
        "相続が未整理なら先に名義の確認が必要です",
      ],
      handoff: "登記を確認し、名義人・相続状況を整理してから、制度の相談先を決めます。",
      preContractWarning,
    };
  }

  if (input.municipalityStatus !== "受付中") {
    return {
      verdict: "official-confirmation-needed",
      title:
        input.municipalityStatus === "終了"
          ? "この自治体は受付終了（このページの確認範囲）— 次年度・別制度を確認"
          : input.municipalityStatus === "次年度未発表"
            ? "次年度の要件は未発表 — 発表時に要件が変わる前提で確認"
            : "制度の有無・受付状況は自治体の公式情報での確認が必須",
      reasons: [
        "解体補助金は自治体ごとに制度の有無・要件・時期・予算が変わります",
        input.ownership === "inheritance-pending"
          ? "相続が未整理の場合、申請前に名義確認が求められる自治体が多くあります"
          : "所有名義の確認は申請書類の前提です",
      ],
      handoff: "市区町村の空き家担当窓口に、制度の有無・受付時期・対象要件・事前相談の要否を確認します。",
      preContractWarning,
    };
  }

  if (!verifiedOpen) {
    return {
      verdict: "official-confirmation-needed",
      title: "「受付中」の表示には、鮮度基準内に検証済みの制度情報が必要です",
      reasons: [
        "このページでは検証済み（確認日付き・鮮度基準内）の制度情報が確認できていないため、受付状況は確定しません",
        "制度の有無・受付時期は自治体の公式情報での確認が必須です",
      ],
      handoff: "市区町村の空き家担当窓口に、制度の有無・受付時期・対象要件・事前相談の要否を確認します。",
      preContractWarning,
    };
  }

  if (input.ownership === "inheritance-pending" || input.workStatus !== "before-contract" || input.buildingState !== "dangerous") {
    return {
      verdict: "official-confirmation-needed",
      title: "条件が揃いかけでも、適用は自治体の審査で決まる",
      reasons: [
        "受付中でも、対象建物（特定空き家等の指定・危険度）の判定は自治体が行います",
        input.ownership === "inheritance-pending"
          ? "相続登記が未整理なら、先に名義を確認します"
          : input.workStatus === "planned-soon"
            ? "契約の見込みが立っているほど、交付決定前の契約・着工に注意します"
            : "建物の状態要件（倒壊等危険・特定空き家等）が該当するかは事前審査で確認します",
      ],
      handoff: "自治体の事前相談・事前審査で、対象建物に該当するかを確認してから申請します。",
      preContractWarning,
    };
  }

  return {
    verdict: "likely-eligible",
    title: "検証済み制度の受付中＋解体契約前。ただし適用は審査で決まる",
    reasons: [
      "この見立ては、このページが確認した制度情報とあなたの回答に基づく仮の整理です",
      "対象建物の判定・予算枠・書類は、自治体の事前審査と本審査で確定します",
    ],
    handoff: "事前相談・事前審査→申請→交付決定の順で進めます。交付決定前に解体契約は結びません。",
    preContractWarning,
  };
}

/** 解体して売る vs このまま（現況）で売る の比較軸。 */
export const DEMOLISH_VS_ASIS_AXES = [
  { axis: "先行費用", asIs: "解体費は不要。残置物の処分は販売条件で調整", demolish: "解体費用が売却前に必要。補助金で一部がカバーされる可能性は自治体次第" },
  { axis: "買い手の広さ", asIs: "建物を使う買い手と土地目的の買い手の両方", demolish: "土地目的の買い手が中心。更地需要が地域にあるかが前提" },
  { axis: "不可逆性", asIs: "建物を残すので選択肢は残る", demolish: "一度解体すると建物は戻せない。税務（空き家特例など）への影響も確認" },
  { axis: "制度の関わり", asIs: "解体補助金は使わない。譲渡所得の特例要件は別途確認", demolish: "補助金は申請→交付決定→契約の順が前提。金額は予算と審査次第" },
] as const;

export interface DemolishVsAsIsInput {
  buildingState: DemolitionBuildingState;
  landDemand: "expected" | "unclear";
  /** 解体費用の概算（円）。ユーザー入力のみ。未入力 null。 */
  demolitionCost: number | null;
  /** 補助金の見込み額（円）。ユーザー入力のみ。未入力 null。 */
  subsidyEstimate: number | null;
}

export interface DemolishVsAsIsResult {
  title: string;
  recommendation: string;
  holdConditions: readonly string[];
  nextCheck: string;
}

/**
 * Decision Unit: as-is売却 vs 解体+土地売却。補助金は一変数であって目的ではない。
 * 不可逆な解体を推奨しない。常に「解体前に両方の条件を取る」方向へ fail-safe。
 */
export function buildDemolishVsAsIs(input: DemolishVsAsIsInput): DemolishVsAsIsResult {
  const netCost = input.demolitionCost == null ? null : Math.max(0, input.demolitionCost - (input.subsidyEstimate ?? 0));
  const costNote =
    netCost == null
      ? "解体費用と補助金の見込みは未入力のため、金額での比較は行いません"
      : `手出し概算（解体費−補助金見込み）: 約${Math.round(netCost / 10_000)}万円。これは試算で、見積と交付決定で変わります`;

  const holdConditions = [
    "自治体の制度確認・事前相談が済むまで解体契約は結ばない",
    input.landDemand === "unclear" ? "土地需要（更地としての需要）が確認できるまで解体しない" : "解体後の売却条件を、解体前に不動産会社の見立てで確認する",
    "名義・相続が未整理なら先に整理する",
  ];

  if (input.buildingState === "old") {
    return {
      title: "建物が残せる状態なら、解体前に両方の条件を取る",
      recommendation: `建物としての価値が残っている可能性があるため、現況（古家付き）の売却条件と解体後の見立てを並べて比較します。${costNote}。`,
      holdConditions,
      nextCheck: "同じ物件条件で、現況売却と解体後売却の2つの見立てを不動産会社に確認する",
    };
  }

  if (input.landDemand === "unclear") {
    return {
      title: "土地需要が見えないうちの解体は保留",
      recommendation: `解体して得をするかは土地需要次第です。需要の確認が先。${costNote}。`,
      holdConditions,
      nextCheck: "地域の土地取引実績（集計期間・N・価格の意味を確認）で更地需要を調べる",
    };
  }

  return {
    title: "解体前の段階なら、両方の売却条件を解体前に比較する",
    recommendation: `建物の傷みが大きく土地需要が見込める場合でも、解体は最後の手段として比較材料が揃ってから決めます。${costNote}。補助金の有無が解体を決める理由にはしません。`,
    holdConditions,
    nextCheck: "解体見積を取り、補助金の事前相談を受け、現況売却の見立てと並べて比べる",
  };
}
