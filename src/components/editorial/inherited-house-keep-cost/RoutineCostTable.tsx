import React from "react";
import { MAINTENANCE_ROUTINES, ANNUAL_COST_BREAKDOWN } from "./article-data";

export function RoutineCostTable() {
  return (
    <div className="space-y-8">
      {/* 管理ルーティンと放置リスク一覧 */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
        <div className="border-b border-[#dfe9ee] bg-[#f0f7f7] p-4 sm:p-5">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            実務ルーティン
          </span>
          <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
            実家を「売らない」場合の具体的管理項目と放置リスク
          </h3>
          <p className="mt-1 text-xs text-[#506477]">
            建物の資産価値維持・近隣トラブル防止のために必須となる作業内容と費用目安
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#dfe9ee] bg-[#fbfaf7] text-[11px] font-black uppercase text-[#708696]">
              <tr>
                <th className="p-3.5 sm:p-4 whitespace-nowrap">管理項目・頻度</th>
                <th className="p-3.5 sm:p-4 min-w-[200px]">作業内容</th>
                <th className="p-3.5 sm:p-4 min-w-[160px]">費用目安（自主 / 外注）</th>
                <th className="p-3.5 sm:p-4 min-w-[180px]">放置した場合のリスク</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe9ee] text-[#14243a]">
              {MAINTENANCE_ROUTINES.map((item, index) => (
                <tr key={index} className="hover:bg-[#fbfaf7]/60 transition">
                  <td className="p-3.5 sm:p-4 align-top font-bold">
                    <div className="text-sm font-black text-[#14243a]">{item.category}</div>
                    <span className="mt-1 inline-block rounded bg-[#f0f7f7] px-2 py-0.5 text-[10px] font-bold text-[#0a7079]">
                      {item.frequency}
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                    {item.workDetail}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs space-y-1">
                    <div className="text-[#506477]">
                      <span className="font-bold text-[#14243a]">自主: </span>
                      {item.selfCostNotes}
                    </div>
                    <div className="text-[#0a7079]">
                      <span className="font-bold text-[#078c95]">外注: </span>
                      {item.vendorCostEstimate}
                    </div>
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-rose-700 font-medium bg-rose-50/30">
                    ⚠️ {item.neglectRisk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 標準年間維持費内訳モデル */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
        <div className="border-b border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
          <span className="rounded bg-[#14243a] px-2.5 py-1 text-[11px] font-black text-white">
            年間コスト内訳
          </span>
          <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
            戸建て住宅を売らずに保有する場合の標準年間費用（概算モデル）
          </h3>
          <p className="mt-1 text-xs text-[#506477]">
            土地評価額1,200万円（200㎡以下）・建物評価額300万円の標準的な木造戸建てを想定
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#dfe9ee] bg-[#fbfaf7] text-[11px] font-black uppercase text-[#708696]">
              <tr>
                <th className="p-3.5 sm:p-4 whitespace-nowrap">費用項目</th>
                <th className="p-3.5 sm:p-4 whitespace-nowrap">年間概算額</th>
                <th className="p-3.5 sm:p-4 min-w-[240px]">計算根拠・内訳</th>
                <th className="p-3.5 sm:p-4 min-w-[140px] whitespace-nowrap">公的根拠・出典</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe9ee] text-[#14243a]">
              {ANNUAL_COST_BREAKDOWN.map((item, index) => (
                <tr key={index} className="hover:bg-[#fbfaf7]/60 transition">
                  <td className="p-3.5 sm:p-4 align-top font-bold text-[#14243a]">
                    {item.costCategory}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top font-black text-[#078c95] whitespace-nowrap">
                    {item.estimatedAnnualAmount}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                    {item.calculationBasis}
                  </td>
                  <td className="p-3.5 sm:p-4 align-top text-[11px] text-[#708696]">
                    {item.officialReference}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f0f7f7] font-black">
                <td className="p-3.5 sm:p-4 text-[#14243a]">年間合計（標準レンジ）</td>
                <td className="p-3.5 sm:p-4 text-[#078c95] text-sm sm:text-base whitespace-nowrap">
                  約28万〜57万円 / 年
                </td>
                <td colSpan={2} className="p-3.5 sm:p-4 text-xs text-[#506477]">
                  5年間保有で約140万〜285万円、10年間保有で約280万〜570万円の維持コストが累積します（突発的な大規模修繕は別途）。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
