import React from "react";
import {
  TAX_EXEMPTION_COMPARISONS,
  DEDUCTION_DEADLINE_COMPARISONS,
  REVOKED_TAX_CALC_STEPS,
} from "./article-data";

export function TaxExemptionComparisonTable() {
  return (
    <div className="space-y-8">
      {/* 住宅用地特例 vs 特例解除（勧告時）の比較 */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
        <div className="border-b border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
          <span className="rounded bg-rose-600 px-2.5 py-1 text-[11px] font-black text-white">
            地方税法・特措法対比
          </span>
          <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
            住宅用地特例（通常）と特定空家・管理不全空家勧告後（解除）の税制比較
          </h3>
          <p className="mt-1 text-xs text-[#506477]">
            放置により自治体から勧告を受けた場合、固定資産税・都市計画税の課税標準が本来の評価水準に戻ります
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#dfe9ee] bg-[#fbfaf7] text-[11px] font-black uppercase text-[#708696]">
              <tr>
                <th className="p-3.5 sm:p-4 min-w-[160px]">税目・適用区分</th>
                <th className="p-3.5 sm:p-4 min-w-[200px] text-[#078c95]">通常時（住宅用地特例 適用）</th>
                <th className="p-3.5 sm:p-4 min-w-[200px] text-rose-700 bg-rose-50/40">勧告後（特例 解除）</th>
                <th className="p-3.5 sm:p-4 min-w-[140px] whitespace-nowrap">根拠法令</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe9ee] text-[#14243a]">
              {TAX_EXEMPTION_COMPARISONS.map((item, index) => (
                <tr key={index} className="hover:bg-[#fbfaf7]/60 transition">
                  <td className="p-3.5 sm:p-4 align-top font-bold text-[#14243a]">
                    {item.item}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                    {item.normalStatus}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed font-bold text-rose-800 bg-rose-50/20">
                    {item.revokedStatus}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-[11px] text-[#708696]">
                    {item.legalBasis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 改正空家特措法による特例解除の実税額計算ステップ */}
      <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm">
        <div className="border-b border-rose-100 bg-rose-50/50 p-4 sm:p-5">
          <span className="rounded bg-rose-600 px-2.5 py-1 text-[11px] font-black text-white">
            実税額計算ステップ
          </span>
          <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
            改正空家特措法（令和5年法律第50号・2023年12月13日施行）による特例解除の具体的計算
          </h3>
          <p className="mt-1 text-xs text-[#506477]">
            土地評価額1,200万円・小規模住宅用地（200㎡以下の部分）の例で計算プロセスを追います
          </p>
        </div>
        <ol className="divide-y divide-[#dfe9ee]">
          {REVOKED_TAX_CALC_STEPS.map((item) => (
            <li key={item.step} className="flex gap-4 p-4 sm:p-5">
              <span className="h-fit shrink-0 rounded bg-[#14243a] px-2 py-1 text-[11px] font-black text-white">
                {item.step}
              </span>
              <div>
                <h4 className="text-sm font-black text-[#14243a]">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#506477]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-rose-100 bg-rose-50/30 p-4 text-[11px] leading-relaxed text-[#708696] sm:p-5">
          出典：国土交通省「空家等対策の推進に関する特別措置法の一部を改正する法律（令和5年法律第50号）について」（2023年12月13日施行・mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000138.html）、地方税法第349条の3の2第1項（住宅用地の定義からの除外）、地方税法附則第18条（負担調整措置）。個別の税額は市町村の賦課状況により異なります。
        </div>
      </div>

      {/* 3,000万円特別控除の保有期間リミット比較 */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
        <div className="border-b border-[#dfe9ee] bg-[#f0f7f7] p-4 sm:p-5">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            税制特例の期限
          </span>
          <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
            空き家3,000万円特別控除の適用期限（3年リミット）と保有損失の比較
          </h3>
          <p className="mt-1 text-xs text-[#506477]">
            租税特別措置法第35条第3項に基づく期限内売却と期限経過後の税負担・累積維持費の差異
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#dfe9ee] bg-[#fbfaf7] text-[11px] font-black uppercase text-[#708696]">
              <tr>
                <th className="p-3.5 sm:p-4 min-w-[160px]">保有期間・売却時期</th>
                <th className="p-3.5 sm:p-4 min-w-[140px]">特別控除の可否</th>
                <th className="p-3.5 sm:p-4 min-w-[180px]">譲渡益に対する税負担</th>
                <th className="p-3.5 sm:p-4 min-w-[140px]">累積維持費用の目安</th>
                <th className="p-3.5 sm:p-4 min-w-[200px]">手残りへの影響・結論</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe9ee] text-[#14243a]">
              {DEDUCTION_DEADLINE_COMPARISONS.map((item, index) => (
                <tr key={index} className="hover:bg-[#fbfaf7]/60 transition">
                  <td className="p-3.5 sm:p-4 align-top font-bold text-[#14243a]">
                    {item.timeline}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top font-black text-xs">
                    {index === 0 ? (
                      <span className="text-[#078c95]">{item.deductionEligibility}</span>
                    ) : (
                      <span className="text-rose-700">{item.deductionEligibility}</span>
                    )}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                    {item.estimatedTaxOnGain}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs font-bold text-[#14243a]">
                    {item.cumulativeKeepCost}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                    {item.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
