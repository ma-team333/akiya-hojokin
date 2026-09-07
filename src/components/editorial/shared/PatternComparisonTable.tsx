import React from "react";

/**
 * 汎用パターン比較テーブル（データ駆動・PC/SPデュアルレンダリング）。
 *
 * - 行データは「名称 + バッジ + メリット/デメリット + 列ごとの値（フラット）」のみ。
 *   列は `columns` の key で行の対応フィールドを参照する。
 * - PC: 横スクロールテーブル（hidden md:block）/ SP: カード型スタックUI（md:hidden）。
 * - テーブルレイアウトのSP崩れ回避のため、テーブル単体でのSP表示は禁止（スキル契約）。
 */

export interface ComparisonColumn {
  /** 行データのフィールドキー（pros/cons/name 以外） */
  key: string;
  header: string;
  /** center: 中央寄せ強調（SPカード上部のハイライト枠にも表示）/ text: 通常 */
  cell?: "text" | "center";
}

export type ComparisonRow = {
  name: string;
  badge?: string;
  /** tailwind背景クラス（例: "bg-[#078c95]"） */
  badgeColor?: string;
  pros?: string;
  cons?: string;
  recommendation?: string;
  /** 行ハイライト（要注意パターン等） */
  highlight?: boolean;
} & Record<string, string | boolean | undefined>;

export interface PatternComparisonTableProps {
  sectionId: string;
  ariaLabel: string;
  badgeText: string;
  badgeNote: string;
  heading: string;
  lead: string;
  columns: readonly ComparisonColumn[];
  items: readonly ComparisonRow[];
  prosHeader?: string;
  consHeader?: string;
  recommendationHeader?: string;
}

export function PatternComparisonTable({
  sectionId,
  ariaLabel,
  badgeText,
  badgeNote,
  heading,
  lead,
  columns,
  items,
  prosHeader = "主なメリット",
  consHeader = "デメリット・注意点",
  recommendationHeader = "おすすめのケース",
}: PatternComparisonTableProps) {
  const hasPros = items.some((item) => item.pros);
  const hasCons = items.some((item) => item.cons);
  const hasRecommendation = items.some((item) => item.recommendation);
  const highlightColumns = columns.filter((col) => col.cell === "center");
  const value = (item: ComparisonRow, key: string) => String(item[key] ?? "");

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className="my-10 rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm sm:p-8"
    >
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            {badgeText}
          </span>
          <span className="text-xs font-bold text-[#506477]">{badgeNote}</span>
        </div>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl">
          {heading}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#506477] sm:text-sm">
          {lead}
        </p>
      </div>

      {/* モバイル表示: カード型スタックUI */}
      <div className="mt-6 space-y-4 md:hidden">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`space-y-3 rounded-xl border p-4.5 ${
              item.highlight
                ? "border-[#e56f2d]/40 bg-[#fff9f5]"
                : "border-[#dfe9ee] bg-[#f8fbfa]"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-black text-[#14243a]">{item.name}</h4>
              {item.badge && item.badgeColor && (
                <span
                  className={`shrink-0 rounded-[4px] px-2 py-0.5 text-[10px] font-black text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {highlightColumns.length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {highlightColumns.map((col) => (
                  <div
                    key={col.key}
                    className="rounded-lg border border-[#dfe9ee] bg-white p-2.5"
                  >
                    <span className="block text-[10px] font-bold text-[#708696]">
                      {col.header}
                    </span>
                    <span className="text-xs font-black text-[#14243a]">
                      {value(item, col.key)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {item.pros && (
              <div className="space-y-1 rounded-xl border border-[#078c95]/30 bg-[#f0f7f7] p-3 text-xs">
                <span className="block text-[10px] font-black text-[#078c95]">
                  ✓ {prosHeader}
                </span>
                <p className="text-xs leading-relaxed text-[#14243a]">{item.pros}</p>
              </div>
            )}

            {item.cons && (
              <div className="space-y-1 rounded-xl border border-[#dfe9ee] bg-white p-3 text-xs">
                <span className="block text-[10px] font-black text-[#d9483b]">
                  ⚠ {consHeader}
                </span>
                <p className="text-[11px] leading-relaxed text-[#506477]">{item.cons}</p>
              </div>
            )}

            {item.recommendation && (
              <div className="border-t border-[#dfe9ee] pt-2 text-[11px] text-[#708696]">
                <strong className="text-[#14243a]">おすすめ:</strong>{" "}
                {item.recommendation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* デスクトップ表示: ワイドテーブル */}
      <div className="mt-6 hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f0f7f7] text-[#14243a]">
              <th className="min-w-[140px] px-4 py-3.5 font-black">区分</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-3.5 font-black ${
                    col.cell === "center" ? "text-center" : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {hasPros && <th className="min-w-[160px] px-4 py-3.5 font-black">{prosHeader}</th>}
              {hasCons && <th className="min-w-[160px] px-4 py-3.5 font-black">{consHeader}</th>}
              {hasRecommendation && (
                <th className="min-w-[140px] bg-[#eef7f5] px-4 py-3.5 font-black text-[#0a7079]">
                  {recommendationHeader}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee]">
            {items.map((item, idx) => (
              <tr
                key={idx}
                className={item.highlight ? "bg-[#fff9f5]" : "hover:bg-[#fbfaf7]"}
              >
                <td className="px-4 py-4 font-black text-[#14243a]">
                  {item.badge && item.badgeColor && (
                    <span
                      className={`mr-1.5 inline-block rounded px-2 py-0.5 text-[10px] font-bold text-white ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div>{item.name}</div>
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-4 leading-relaxed ${
                      col.cell === "center"
                        ? "whitespace-nowrap text-center font-black text-[#078c95]"
                        : "text-[#506477]"
                    }`}
                  >
                    {value(item, col.key)}
                  </td>
                ))}
                {hasPros && (
                  <td className="px-4 py-4 leading-relaxed text-[#14243a]">{item.pros}</td>
                )}
                {hasCons && (
                  <td className="px-4 py-4 leading-relaxed text-[#506477]">{item.cons}</td>
                )}
                {hasRecommendation && (
                  <td className="bg-[#f8fbfa] px-4 py-4 font-bold leading-relaxed text-[#0a7079]">
                    {item.recommendation}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
