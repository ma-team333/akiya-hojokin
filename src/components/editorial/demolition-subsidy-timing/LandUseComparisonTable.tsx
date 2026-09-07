import { LAND_USE_OPTIONS } from "./article-data";

/**
 * 解体後の跡地活用プラン比較（静的サーバーコンポーネント）。
 *
 * 数値ではなく制度上の扱い（補助金・固定資産税・譲渡所得特例）で比較する。
 * 根拠: 地方税法第349条の3・第349条の4（住宅用地特例）、
 * 国税庁タックスアンサーNo.4507（空き家3,000万円特別控除の要件）。
 */
const TABLE_HEADERS = [
  "跡地活用プラン",
  "解体費用",
  "自治体の解体補助金",
  "固定資産税（住宅用地特例）",
  "3,000万円特別控除",
  "主な注意点",
] as const;

export function LandUseComparisonTable() {
  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
      <table className="w-full min-w-[900px] text-left text-xs">
        <thead className="bg-[#f0f7f7] border-b border-[#dfe9ee]">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header} className="p-3.5 text-[11px] font-black text-[#14243a] whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e2e8f0]">
          {LAND_USE_OPTIONS.map((option) => (
            <tr key={option.plan} className="align-top">
              <td className="p-3.5 font-black text-[#14243a]">
                {option.plan}
              </td>
              <td className="p-3.5 text-[#506477] leading-relaxed">
                {option.demolitionCost}
              </td>
              <td className="p-3.5 text-[#506477] leading-relaxed">
                {option.subsidy}
              </td>
              <td className="p-3.5 text-[#506477] leading-relaxed">
                {option.propertyTax}
              </td>
              <td className="p-3.5 text-[#506477] leading-relaxed">
                {option.specialDeduction}
              </td>
              <td className="p-3.5 text-[#506477] leading-relaxed">
                {option.cautions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[#dfe9ee] bg-[#f8fbfa] p-3.5 text-[11px] leading-relaxed text-[#708696]">
        ※3,000万円特別控除（被相続人の居住用財産に係る譲渡所得の特別控除）は、昭和56年（1981年）5月31日以前に建築された一戸建てなど、国税庁が定める複数の要件をすべて満たす場合に適用されます（詳細は
        <a href="https://www.r-sic.com/akiya/articles/3000man-deduction" className="font-bold text-[#078c95] hover:underline">
          3,000万円特別控除の解説記事
        </a>
        を参照）。
      </p>
    </div>
  );
}
