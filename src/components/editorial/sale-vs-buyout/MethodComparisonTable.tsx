import { METHOD_COMPARISONS } from "./article-data";

export function MethodComparisonTable() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_4px_20px_rgba(20,36,58,0.04)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-6 py-5 sm:px-8 sm:py-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
          <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
          COMPARISON MATRIX
        </span>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl leading-snug">
          空き家の「一般仲介」と「不動産会社買取」の徹底比較
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#506477]">
          売買代金・所要期間・諸費用・引渡し後の責任・手間など、主要な7項目を対比整理しています。
        </p>
      </div>

      {/* モバイル表示: カードスタック (md:hidden) */}
      <div className="divide-y divide-[#dfe9ee] md:hidden">
        {METHOD_COMPARISONS.map((item, idx) => (
          <div key={idx} className="p-5 sm:p-7 space-y-3.5 bg-white">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14243a] text-[11px] font-black text-white">
                {idx + 1}
              </span>
              <h4 className="text-sm font-black text-[#14243a]">
                {item.feature}
              </h4>
            </div>

            {/* 仲介 */}
            <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#708696]">一般仲介売却</span>
                <span className="text-xs font-black text-[#14243a]">{item.brokerage.label}</span>
              </div>
              <p className="text-xs text-[#506477] leading-relaxed">{item.brokerage.detail}</p>
            </div>

            {/* 買取 */}
            <div className="rounded-xl border border-[#078c95]/30 bg-[#f0f7f7] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#087f88]">不動産会社買取</span>
                <span className="text-xs font-black text-[#078c95]">{item.buyout.label}</span>
              </div>
              <p className="text-xs text-[#14243a] leading-relaxed">{item.buyout.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* デスクトップ表示: テーブルレイアウト (hidden md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f0f7f7] text-[#14243a] font-black">
              <th className="py-4 px-6 w-[20%]">比較項目</th>
              <th className="py-4 px-6 w-[40%]">一般仲介売却（個人向け）</th>
              <th className="py-4 px-6 w-[40%]">不動産会社買取（直接取引）</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee]">
            {METHOD_COMPARISONS.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#fbfaf7]/60 transition">
                <td className="py-4 px-6 font-black text-[#14243a] align-top">
                  {item.feature}
                </td>
                <td className="py-4 px-6 align-top">
                  <div className="font-bold text-[#14243a]">{item.brokerage.label}</div>
                  <div className="text-xs text-[#506477] mt-1 leading-relaxed">{item.brokerage.detail}</div>
                </td>
                <td className="py-4 px-6 align-top bg-[#f0f7f7]/40">
                  <div className="font-bold text-[#078c95]">{item.buyout.label}</div>
                  <div className="text-xs text-[#14243a] mt-1 leading-relaxed">{item.buyout.detail}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
