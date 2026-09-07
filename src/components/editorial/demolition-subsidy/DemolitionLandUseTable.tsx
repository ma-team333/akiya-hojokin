import { LAND_USE_OPTIONS } from "./article-data";

export function DemolitionLandUseTable() {
  return (
    <section className="my-10 sm:my-14 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_4px_24px_rgba(20,36,58,0.05)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-8 bg-[#f8fafc]">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-2.5 py-0.5 text-xs font-black text-white">
            COMPARISON
          </span>
          <span className="text-xs font-bold text-[#708696]">
            地方税法第349条・跡地出口戦略
          </span>
        </div>
        <h3 className="mt-2 text-xl font-black text-[#14243a] sm:text-2xl">
          解体後の跡地活用プランと固定資産税影響の総合比較
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#506477]">
          空き家を解体して更地にすると住宅用地特例（1/6減額）が解除されます。解体後の活用方針（売却・買取・駐車場・保有）ごとの固定資産税影響、キャッシュフロー特性、管理負担の違いを整理しました。
        </p>
      </div>

      {/* モバイル表示: カードスタック (md:hidden) */}
      <div className="divide-y divide-[#dfe9ee] md:hidden">
        {LAND_USE_OPTIONS.map((item, idx) => (
          <div key={idx} className="p-5 space-y-3 bg-white">
            <div className="inline-block rounded px-2 py-0.5 text-[11px] font-bold text-white bg-[#078c95]">
              {item.category}
            </div>
            <h4 className="text-sm font-black text-[#14243a]">{item.title}</h4>
            <div className="text-[11px] text-[#708696]">適するケース: {item.suitability}</div>
            <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-[#708696]">固定資産税（特例解除）への影響</div>
              <div className="text-xs font-medium text-[#e56f2d]">{item.fixedTaxImpact}</div>
            </div>
            <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-[#708696]">キャッシュフロー特性</div>
              <div className="text-xs text-[#334155] leading-relaxed">{item.cashFlowFeature}</div>
            </div>
            <div className="rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-[#708696]">管理負担と注意点</div>
              <div className="text-xs text-[#334155] leading-relaxed">{item.managementBurden}</div>
              <div className="text-[11px] text-[#708696]">※{item.notes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* デスクトップ表示: テーブルレイアウト (hidden md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f1f5f9] text-[#14243a]">
              <th className="p-4 font-black w-1/4">活用・処分プラン</th>
              <th className="p-4 font-black w-1/4">固定資産税（特例解除）への影響</th>
              <th className="p-4 font-black w-1/4">キャッシュフロー特性</th>
              <th className="p-4 font-black w-1/4">管理負担と注意点</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee]">
            {LAND_USE_OPTIONS.map((item, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#fbfcfd]"
                } hover:bg-[#f0f7f7]/40`}
              >
                <td className="p-4 align-top">
                  <div className="inline-block rounded px-2 py-0.5 text-[11px] font-bold text-white mb-1.5 bg-[#078c95]">
                    {item.category}
                  </div>
                  <div className="font-bold text-[#14243a] text-sm sm:text-base">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[11px] text-[#708696]">
                    適するケース: {item.suitability}
                  </div>
                </td>
                <td className="p-4 align-top text-[#334155] leading-relaxed">
                  <div className="font-medium text-[#e56f2d]">{item.fixedTaxImpact}</div>
                </td>
                <td className="p-4 align-top text-[#334155] leading-relaxed">
                  <div>{item.cashFlowFeature}</div>
                </td>
                <td className="p-4 align-top text-[#334155] leading-relaxed space-y-1">
                  <div>{item.managementBurden}</div>
                  <div className="text-[11px] text-[#708696]">※{item.notes}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#dfe9ee] bg-[#f8fafc] p-4 text-[11px] text-[#708696] leading-relaxed">
        <strong>【実務上の留意点】</strong>
        地方税法第349条の3の2により、更地になった土地は賦課期日（毎年1月1日）時点で住宅用地特例が外れます。解体後に売却を検討する場合は、同一年の12月31日までに決済・引渡しを完了させることが税負担を最小限に抑える鍵となります。
      </div>
    </section>
  );
}
