"use client";

import React, { useState, useId } from "react";

export function Simulator() {
  const baseId = useId();

  // 基本設定ステート
  const [landValue, setLandValue] = useState<number>(1200); // 万円
  const [buildingValue, setBuildingValue] = useState<number>(300); // 万円
  const [isCityPlanningTax, setIsCityPlanningTax] = useState<boolean>(true);
  const [isSmallScaleLand, setIsSmallScaleLand] = useState<boolean>(true); // 200㎡以下

  // 管理コスト設定
  const [managementType, setManagementType] = useState<"self" | "vendor">("self");
  const [selfTravelCostPerTrip, setSelfTravelCostPerTrip] = useState<number>(8000); // 自主管理1回往復交通費（円）
  const [vendorMonthlyCost, setVendorMonthlyCost] = useState<number>(8000); // 委託月額（円）
  const [gardeningTimesPerYear, setGardeningTimesPerYear] = useState<number>(2); // 草刈り年回数
  const [gardeningCostPerTime, setGardeningCostPerTime] = useState<number>(25000); // 草刈り1回費用（円）
  const [insuranceAnnualCost, setInsuranceAnnualCost] = useState<number>(45000); // 保険年額（円）
  const [utilityAnnualCost, setUtilityAnnualCost] = useState<number>(36000); // 水道光熱基本料年額（円）
  const [repairReserveAnnualCost, setRepairReserveAnnualCost] = useState<number>(60000); // 修繕積立年額（円）

  // 保有期間
  const [years, setYears] = useState<number>(5);

  // 特例解除（勧告）シミュレーション
  const [isTaxExemptionRevoked, setIsTaxExemptionRevoked] = useState<boolean>(false);

  // 3000万円控除の機会損失比較設定
  const [expectedCapitalGain, setExpectedCapitalGain] = useState<number>(2000); // 売却想定利益（万円）

  // --- 税金計算 ---
  // 土地固定資産税（通常: 1/6または1/3特例、解除時: 本則課税標準100%）
  const landTaxBaseRate = isTaxExemptionRevoked
    ? 1.0
    : isSmallScaleLand
    ? 1 / 6
    : 1 / 3;
  const annualLandFixedTax = Math.round(landValue * 10000 * landTaxBaseRate * 0.014);

  // 建物固定資産税
  const annualBuildingFixedTax = Math.round(buildingValue * 10000 * 0.014);

  // 都市計画税（通常: 1/3または2/3特例、解除時: 本則課税標準100%）
  const landCityTaxBaseRate = isTaxExemptionRevoked
    ? 1.0
    : isSmallScaleLand
    ? 1 / 3
    : 2 / 3;
  const annualLandCityTax = isCityPlanningTax
    ? Math.round(landValue * 10000 * landCityTaxBaseRate * 0.003)
    : 0;
  const annualBuildingCityTax = isCityPlanningTax
    ? Math.round(buildingValue * 10000 * 0.003)
    : 0;

  const totalAnnualTaxes =
    annualLandFixedTax +
    annualBuildingFixedTax +
    annualLandCityTax +
    annualBuildingCityTax;

  // 通常時の税額（比較用）
  const normalLandFixedTax = Math.round(
    landValue * 10000 * (isSmallScaleLand ? 1 / 6 : 1 / 3) * 0.014
  );
  const normalLandCityTax = isCityPlanningTax
    ? Math.round(landValue * 10000 * (isSmallScaleLand ? 1 / 3 : 2 / 3) * 0.003)
    : 0;
  const normalTotalTaxes =
    normalLandFixedTax +
    annualBuildingFixedTax +
    normalLandCityTax +
    annualBuildingCityTax;

  // 特例解除による増税額（年額）
  const taxIncreaseAnnual = Math.max(0, totalAnnualTaxes - normalTotalTaxes);

  // --- 管理・維持費用計算 ---
  const annualManagementFee =
    managementType === "self"
      ? selfTravelCostPerTrip * 12 // 月1回
      : vendorMonthlyCost * 12;

  const annualGardeningCost = gardeningTimesPerYear * gardeningCostPerTime;

  const totalAnnualMaintenance =
    annualManagementFee +
    annualGardeningCost +
    insuranceAnnualCost +
    utilityAnnualCost +
    repairReserveAnnualCost;

  // 年間総合計コスト
  const totalAnnualCost = totalAnnualTaxes + totalAnnualMaintenance;

  // 指定年数の累積コスト
  const cumulativeCost = totalAnnualCost * years;
  const cumulativeTaxes = totalAnnualTaxes * years;
  const cumulativeMaintenance = totalAnnualMaintenance * years;

  // 3000万円控除の税額比較（長期譲渡所得税率 20.315%）
  const capitalGainTaxNormal = Math.round(expectedCapitalGain * 10000 * 0.20315);
  // 期限内（3年以内）なら3000万まで控除され0円
  const capitalGainTaxWithDeduction = 0;
  const taxSavingFromDeduction = capitalGainTaxNormal;

  return (
    <div className="rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm sm:p-8">
      <div className="border-b border-[#dfe9ee] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            維持費＆税金シミュレーター
          </span>
          <span className="text-xs font-bold text-[#708696]">
            地方税法・特措法・租税特別措置法準拠
          </span>
        </div>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl">
          実家を売らない場合の年間維持費・特例解除増税・3000万控除期限の試算
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#506477] sm:text-sm">
          評価額や管理方法を設定し、保有し続ける場合の年別累計コストや、勧告による住宅用地特例解除の影響、3年期限経過時の税負担差をリアルタイムに計算します。
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* 左側: 入力パネル (7 col) */}
        <div className="space-y-6 lg:col-span-7">
          {/* 1. 不動産評価額・税金条件 */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-[#078c95]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#078c95] text-[10px] text-white">
                1
              </span>
              固定資産税・都市計画税の前提
            </h4>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#14243a]">
                  <label htmlFor={`${baseId}-land`}>土地の固定資産税評価額</label>
                  <span className="text-[#078c95] font-black">{landValue.toLocaleString()} 万円</span>
                </div>
                <input
                  id={`${baseId}-land`}
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={landValue}
                  onChange={(e) => setLandValue(Number(e.target.value))}
                  className="mt-1.5 h-2 w-full accent-[#078c95]"
                />
                <div className="flex justify-between text-[10px] text-[#708696]">
                  <span>200万円</span>
                  <span>2,500万円</span>
                  <span>5,000万円</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#14243a]">
                  <label htmlFor={`${baseId}-bldg`}>建物の固定資産税評価額</label>
                  <span className="text-[#078c95] font-black">{buildingValue.toLocaleString()} 万円</span>
                </div>
                <input
                  id={`${baseId}-bldg`}
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={buildingValue}
                  onChange={(e) => setBuildingValue(Number(e.target.value))}
                  className="mt-1.5 h-2 w-full accent-[#078c95]"
                />
                <div className="flex justify-between text-[10px] text-[#708696]">
                  <span>50万円（築古木造）</span>
                  <span>750万円</span>
                  <span>1,500万円</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-[#dfe9ee]">
                <label className="flex items-center gap-2 text-xs font-bold text-[#14243a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCityPlanningTax}
                    onChange={(e) => setIsCityPlanningTax(e.target.checked)}
                    className="h-4 w-4 rounded border-[#dfe9ee] text-[#078c95] focus:ring-[#078c95]"
                  />
                  都市計画税の対象区域（0.3%）
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#14243a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSmallScaleLand}
                    onChange={(e) => setIsSmallScaleLand(e.target.checked)}
                    className="h-4 w-4 rounded border-[#dfe9ee] text-[#078c95] focus:ring-[#078c95]"
                  />
                  小規模住宅用地（敷地200㎡以下）
                </label>
              </div>
            </div>
          </div>

          {/* 2. 管理・維持費用の設定 */}
          <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-[#078c95]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#078c95] text-[10px] text-white">
                2
              </span>
              管理方法・維持費用の設定
            </h4>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14243a]">管理体制の選択</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setManagementType("self")}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                      managementType === "self"
                        ? "border-[#078c95] bg-[#078c95] text-white"
                        : "border-[#dfe9ee] bg-white text-[#14243a] hover:bg-[#f0f7f7]"
                    }`}
                  >
                    自主管理（月1回訪問）
                  </button>
                  <button
                    type="button"
                    onClick={() => setManagementType("vendor")}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                      managementType === "vendor"
                        ? "border-[#078c95] bg-[#078c95] text-white"
                        : "border-[#dfe9ee] bg-white text-[#14243a] hover:bg-[#f0f7f7]"
                    }`}
                  >
                    専門会社委託（巡回管理）
                  </button>
                </div>
              </div>

              {managementType === "self" ? (
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#14243a]">
                    <label htmlFor={`${baseId}-travel`}>月1回の往復交通費（新幹線・ガソリン・高速代）</label>
                    <span className="text-[#078c95] font-black">{selfTravelCostPerTrip.toLocaleString()} 円/回</span>
                  </div>
                  <input
                    id={`${baseId}-travel`}
                    type="range"
                    min="1000"
                    max="30000"
                    step="1000"
                    value={selfTravelCostPerTrip}
                    onChange={(e) => setSelfTravelCostPerTrip(Number(e.target.value))}
                    className="mt-1.5 h-2 w-full accent-[#078c95]"
                  />
                  <p className="mt-1 text-[10px] text-[#708696]">年間: {(selfTravelCostPerTrip * 12).toLocaleString()} 円</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#14243a]">
                    <label htmlFor={`${baseId}-vendor`}>巡回委託の月額費用</label>
                    <span className="text-[#078c95] font-black">{vendorMonthlyCost.toLocaleString()} 円/月</span>
                  </div>
                  <input
                    id={`${baseId}-vendor`}
                    type="range"
                    min="5000"
                    max="20000"
                    step="1000"
                    value={vendorMonthlyCost}
                    onChange={(e) => setVendorMonthlyCost(Number(e.target.value))}
                    className="mt-1.5 h-2 w-full accent-[#078c95]"
                  />
                  <p className="mt-1 text-[10px] text-[#708696]">年間: {(vendorMonthlyCost * 12).toLocaleString()} 円</p>
                </div>
              )}

              {/* 草刈り・保険・光熱費 */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-[#dfe9ee]">
                <div>
                  <label htmlFor={`${baseId}-garden`} className="block text-xs font-bold text-[#14243a]">
                    草刈り・庭木管理（年回数）
                  </label>
                  <select
                    id={`${baseId}-garden`}
                    value={gardeningTimesPerYear}
                    onChange={(e) => setGardeningTimesPerYear(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-[#dfe9ee] bg-white p-2 text-xs font-bold text-[#14243a]"
                  >
                    <option value={0}>0回（舗装・除草不要）</option>
                    <option value={1}>年1回（約2.5万円）</option>
                    <option value={2}>年2回（標準・約5万円）</option>
                    <option value={3}>年3回（約7.5万円）</option>
                    <option value={4}>年4回（約10万円）</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={`${baseId}-ins`} className="block text-xs font-bold text-[#14243a]">
                    火災・地震保険（年額）
                  </label>
                  <select
                    id={`${baseId}-ins`}
                    value={insuranceAnnualCost}
                    onChange={(e) => setInsuranceAnnualCost(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-[#dfe9ee] bg-white p-2 text-xs font-bold text-[#14243a]"
                  >
                    <option value={25000}>最低限（年2.5万円）</option>
                    <option value={45000}>標準（年4.5万円）</option>
                    <option value={70000}>手厚い補償（年7万円）</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 特例解除・保有期間・3000万控除 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-amber-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] text-white">
                3
              </span>
              リスクシミュレーション（特例解除・3000万控除期限）
            </h4>

            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-white p-3">
                <input
                  id={`${baseId}-revoked`}
                  type="checkbox"
                  checked={isTaxExemptionRevoked}
                  onChange={(e) => setIsTaxExemptionRevoked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <label htmlFor={`${baseId}-revoked`} className="text-xs font-black text-[#14243a] cursor-pointer">
                    ⚠️ 管理不全空家・特定空家の勧告による「住宅用地特例解除」を適用する
                  </label>
                  <p className="mt-0.5 text-[11px] text-[#506477]">
                    自治体から指導・勧告を受け、土地の1/6特例が解除されて本則税率課税となった状態を試算します。
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#14243a]">
                  <label htmlFor={`${baseId}-years`}>想定保有年数（維持期間）</label>
                  <span className="text-[#078c95] font-black">{years} 年間</span>
                </div>
                <input
                  id={`${baseId}-years`}
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-1.5 h-2 w-full accent-[#078c95]"
                />
                <div className="flex justify-between text-[10px] text-[#708696]">
                  <span>1年</span>
                  <span>3年（3000万控除期限）</span>
                  <span>5年</span>
                  <span>10年</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#14243a]">
                  <label htmlFor={`${baseId}-gain`}>将来売却時の想定利益（譲渡益）</label>
                  <span className="text-[#078c95] font-black">{expectedCapitalGain.toLocaleString()} 万円</span>
                </div>
                <input
                  id={`${baseId}-gain`}
                  type="range"
                  min="500"
                  max="4000"
                  step="100"
                  value={expectedCapitalGain}
                  onChange={(e) => setExpectedCapitalGain(Number(e.target.value))}
                  className="mt-1.5 h-2 w-full accent-[#078c95]"
                />
                <p className="mt-1 text-[10px] text-[#708696]">
                  ※相続後3年の年末を過ぎると3,000万円特別控除が失効し、この利益に約20.315%の譲渡所得税が課税されます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 右側: 結果表示パネル (5 col) */}
        <div className="space-y-6 lg:col-span-5">
          {/* メイン結果カード */}
          <div className="rounded-2xl border border-[#dfe9ee] bg-[#f0f7f7] p-5 sm:p-6 shadow-sm">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#078c95]">
              SIMULATION RESULT
            </span>
            <h4 className="mt-1 text-base font-black text-[#14243a]">
              売らずに保有した場合の試算結果
            </h4>

            {/* 年間維持費 */}
            <div className="mt-5 rounded-xl border border-[#bbd8dc] bg-white p-4">
              <span className="text-xs font-bold text-[#708696]">年間の総維持費用（標準）</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-[#078c95]">
                  {(totalAnnualCost / 10000).toFixed(1)}
                </span>
                <span className="text-sm font-bold text-[#14243a]">万円 / 年</span>
              </div>
              <p className="mt-1 text-[11px] text-[#708696]">
                （月換算: 約 {Math.round(totalAnnualCost / 12).toLocaleString()} 円）
              </p>
            </div>

            {/* 指定年数の累計コスト */}
            <div className="mt-3 rounded-xl border border-[#dfe9ee] bg-white p-4">
              <span className="text-xs font-bold text-[#708696]">{years}年間の累計保有コスト</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black tracking-tight text-[#14243a]">
                  {(cumulativeCost / 10000).toFixed(1)}
                </span>
                <span className="text-sm font-bold text-[#14243a]">万円</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] border-t border-[#dfe9ee] pt-2">
                <div>
                  <span className="text-[#708696]">税金累計:</span>
                  <p className="font-bold text-[#14243a]">{(cumulativeTaxes / 10000).toFixed(1)} 万円</p>
                </div>
                <div>
                  <span className="text-[#708696]">管理・保険累計:</span>
                  <p className="font-bold text-[#14243a]">{(cumulativeMaintenance / 10000).toFixed(1)} 万円</p>
                </div>
              </div>
            </div>

            {/* 内訳詳細リスト */}
            <div className="mt-4 space-y-2 rounded-xl bg-white/70 p-3.5 text-xs">
              <div className="font-bold text-[#14243a] border-b border-[#dfe9ee] pb-1.5">
                年間費用の内訳明細
              </div>
              <div className="flex justify-between text-[#506477]">
                <span>固定資産税（土地＋建物）</span>
                <span className="font-bold text-[#14243a]">
                  {(annualLandFixedTax + annualBuildingFixedTax).toLocaleString()} 円
                </span>
              </div>
              {isCityPlanningTax && (
                <div className="flex justify-between text-[#506477]">
                  <span>都市計画税（土地＋建物）</span>
                  <span className="font-bold text-[#14243a]">
                    {(annualLandCityTax + annualBuildingCityTax).toLocaleString()} 円
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#506477]">
                <span>管理費（{managementType === "self" ? "交通費" : "巡回委託"}）</span>
                <span className="font-bold text-[#14243a]">
                  {annualManagementFee.toLocaleString()} 円
                </span>
              </div>
              <div className="flex justify-between text-[#506477]">
                <span>庭木剪定・除草費用</span>
                <span className="font-bold text-[#14243a]">
                  {annualGardeningCost.toLocaleString()} 円
                </span>
              </div>
              <div className="flex justify-between text-[#506477]">
                <span>火災・地震保険料</span>
                <span className="font-bold text-[#14243a]">
                  {insuranceAnnualCost.toLocaleString()} 円
                </span>
              </div>
              <div className="flex justify-between text-[#506477]">
                <span>水道・電気基本料金</span>
                <span className="font-bold text-[#14243a]">
                  {utilityAnnualCost.toLocaleString()} 円
                </span>
              </div>
              <div className="flex justify-between text-[#506477]">
                <span>建物修繕予備積立</span>
                <span className="font-bold text-[#14243a]">
                  {repairReserveAnnualCost.toLocaleString()} 円
                </span>
              </div>
            </div>

            {/* 特例解除時の警告アラート */}
            {isTaxExemptionRevoked && (
              <div className="mt-4 rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-900">
                <p className="font-black text-rose-700">🚨 住宅用地特例解除による税負担増</p>
                <p className="mt-1 text-[11px] leading-relaxed">
                  土地の1/6特例が解除されたため、税金が年額{" "}
                  <strong>+{(taxIncreaseAnnual / 10000).toFixed(1)} 万円</strong>{" "}
                  増加しています（{years}年間で計 +{(taxIncreaseAnnual * years / 10000).toFixed(1)} 万円の増税負担）。
                </p>
              </div>
            )}

            {/* 3000万円控除の機会損失 */}
            <div className="mt-4 rounded-xl border border-[#dfe9ee] bg-white p-4">
              <span className="text-xs font-black text-[#14243a]">
                💡 空き家3000万円特別控除の期限比較
              </span>
              <p className="mt-1 text-[11px] leading-relaxed text-[#506477]">
                相続開始から3年後の年末までに売却した場合、譲渡益に対する税負担は{" "}
                <strong className="text-[#078c95]">0円（控除適用）</strong> です。
              </p>
              <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/50 p-2.5 text-[11px]">
                <span className="font-bold text-amber-900">3年期限超過後の売却税額:</span>
                <p className="mt-0.5 font-black text-rose-700 text-sm">
                  約 {(capitalGainTaxNormal / 10000).toFixed(1)} 万円 の課税
                </p>
                <p className="mt-0.5 text-[10px] text-[#708696]">
                  譲渡益 {expectedCapitalGain.toLocaleString()}万円 × 20.315%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
