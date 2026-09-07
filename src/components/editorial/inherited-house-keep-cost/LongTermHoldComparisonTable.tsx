import React from "react";
import Link from "next/link";
import { LONG_TERM_HOLD_COMPARISONS } from "./article-data";

/**
 * 5年・10年保有 vs 今売却の長期損益シミュレーション比較表
 * （年間維持費40万円・譲渡益2,000万円想定モデル・出典は article-data.ts のコメント参照）
 */
export function LongTermHoldComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
      <div className="border-b border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
        <span className="rounded bg-[#e56f2d] px-2.5 py-1 text-[11px] font-black text-white">
          長期保有シミュレーション
        </span>
        <h3 className="mt-2 text-base font-black text-[#14243a] sm:text-lg">
          「今売る」vs「5年・10年持ち続けてから売る」の手残り比較
        </h3>
        <p className="mt-1 text-xs text-[#506477]">
          年間維持費40万円（30〜50万円の中心値）・譲渡益2,000万円想定。査定価格自体の下落は含まないため、実際の差はさらに拡大する方向に働きます
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-[#dfe9ee] bg-[#fbfaf7] text-[11px] font-black uppercase text-[#708696]">
            <tr>
              <th className="p-3.5 sm:p-4 min-w-[150px]">売却時期</th>
              <th className="p-3.5 sm:p-4 min-w-[130px]">そこまでの累積維持費</th>
              <th className="p-3.5 sm:p-4 min-w-[120px]">3,000万円特別控除</th>
              <th className="p-3.5 sm:p-4 min-w-[170px]">譲渡所得税（20.315%）</th>
              <th className="p-3.5 sm:p-4 min-w-[160px] text-[#e56f2d]">今売却との手残り差</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee] text-[#14243a]">
            {LONG_TERM_HOLD_COMPARISONS.map((item, index) => (
              <tr key={item.timing} className="hover:bg-[#fbfaf7]/60 transition">
                <td className="p-3.5 sm:p-4 align-top font-bold text-[#14243a]">
                  {item.timing}
                </td>
                <td className="p-3.5 sm:p-4 align-top text-xs font-bold text-[#14243a]">
                  {item.cumulativeKeepCost}
                </td>
                <td className="p-3.5 sm:p-4 align-top text-xs font-black">
                  {index <= 1 ? (
                    <span className="text-[#078c95]">{item.deductionEligibility}</span>
                  ) : (
                    <span className="text-rose-700">{item.deductionEligibility}</span>
                  )}
                </td>
                <td className="p-3.5 sm:p-4 align-top text-xs leading-relaxed text-[#506477]">
                  {item.capitalGainsTax}
                </td>
                <td className="p-3.5 sm:p-4 align-top text-xs font-black">
                  {index === 0 ? (
                    <span className="text-[#078c95]">{item.netDifferenceFromSaleNow}</span>
                  ) : (
                    <span className="text-rose-700">{item.netDifferenceFromSaleNow}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#dfe9ee] bg-[#fbfaf7] p-4 text-[11px] leading-relaxed text-[#708696] sm:p-5">
        試算根拠：維持費の年30万〜50万円は国土交通省「空き家所有者等の実態調査」等に基づく（2026年時点の公表相場）。譲渡所得税率20.315%（所得税15%・住民税5%・復興特別所得税0.315%）は長期譲渡の国税庁基準。3,000万円特別控除の期限は「相続開始があった日から3年を経過する日の属する年の12月31日まで」（租税特別措置法第35条第3項）。個別条件（建物の築年数・取得費の不明率・適用要件）により結果は変わるため、詳細は
        <Link href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="font-bold text-[#078c95] hover:underline">
          空き家売却の3,000万円特別控除の解説記事
        </Link>
        と
        <Link href="https://www.r-sic.com/akiya/articles/acquisition-cost-addition" className="font-bold text-[#078c95] hover:underline">
          取得費加算の特例の解説記事
        </Link>
        を参照してください。
      </div>
    </div>
  );
}
