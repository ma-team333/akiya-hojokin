import { SALE_METHODS_COMPARISON } from "./article-data";

export function DemolitionMethodComparisonTable() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_4px_20px_rgba(20,36,58,0.04)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-6 py-5 sm:px-8 sm:py-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
          <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
          SALE METHOD COMPARISON
        </span>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl leading-snug">
          空き家売却「3大手法」の特徴・リスク比較表
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#506477]">
          先行持ち出し費用・固定資産税リスク・3000万円特別控除の適用の違いを整理しました。
        </p>
      </div>

      {/* モバイル表示: スタックカードUI (md:hidden) */}
      <div className="divide-y divide-[#dfe9ee] md:hidden">
        {SALE_METHODS_COMPARISON.map((method, idx) => (
          <div key={method.id} className="p-5 sm:p-7 space-y-3.5 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#14243a] flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14243a] text-[10px] text-white">
                  {idx + 1}
                </span>
                {method.name}
              </span>
              <span
                className={`rounded px-2.5 py-0.5 text-[11px] font-black ${
                  method.id === "conditional-demolition"
                    ? "bg-[#078c95] text-white"
                    : "bg-[#f0f7f7] text-[#0a7079] border border-[#bbd8dc]"
                }`}
              >
                {method.badge}
              </span>
            </div>

            <div className="rounded-xl bg-[#f8fbfa] p-3.5 border border-[#dfe9ee] space-y-2 text-xs">
              <div>
                <span className="text-[#708696] block text-[10px]">初期持ち出し費用</span>
                <span className="font-bold text-[#14243a]">{method.initialCost}</span>
              </div>
              <div>
                <span className="text-[#708696] block text-[10px]">固定資産税リスク</span>
                <span className="font-bold text-[#14243a]">{method.taxRisk}</span>
              </div>
              <div>
                <span className="text-[#708696] block text-[10px]">3,000万円特別控除</span>
                <span className="font-bold text-[#14243a]">{method.deductionApplicability}</span>
              </div>
              <div>
                <span className="text-[#708696] block text-[10px]">適した物件・状況</span>
                <span className="font-bold text-[#078c95]">{method.recommendedFor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* デスクトップ表示: テーブルレイアウト (hidden md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f0f7f7] text-xs font-bold text-[#14243a]">
              <th className="px-5 py-4 w-1/5">売却手法</th>
              <th className="px-5 py-4 w-1/5">初期自己負担</th>
              <th className="px-5 py-4 w-1/4">固定資産税リスク</th>
              <th className="px-5 py-4 w-1/5">3000万円特別控除</th>
              <th className="px-5 py-4 w-1/5">おすすめの対象</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee]">
            {SALE_METHODS_COMPARISON.map((method) => {
              const isHighlight = method.id === "conditional-demolition";
              return (
                <tr
                  key={method.id}
                  className={isHighlight ? "bg-[#f0f7f7]/60 font-medium" : "bg-white"}
                >
                  <td className="px-5 py-4.5 font-black text-[#14243a]">
                    <div className="space-y-1">
                      <p>{method.name}</p>
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                          isHighlight
                            ? "bg-[#078c95] text-white"
                            : "bg-[#eaf5f6] text-[#078c95]"
                        }`}
                      >
                        {method.badge}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4.5 text-[#14243a] text-xs">
                    {method.initialCost}
                  </td>
                  <td className="px-5 py-4.5 text-[#506477] text-xs">
                    {method.taxRisk}
                  </td>
                  <td className="px-5 py-4.5 text-[#14243a] text-xs">
                    {method.deductionApplicability}
                  </td>
                  <td className="px-5 py-4.5 text-[#0a7079] font-bold text-xs">
                    {method.recommendedFor}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#f8fbfa] px-5 py-3.5 sm:px-6 sm:py-4 text-xs text-[#506477] border-t border-[#dfe9ee]">
        💡 <strong className="text-[#14243a]">実務のポイント:</strong> まずは「古家付き土地（更地渡しも相談可）」で募集を開始し、新築希望者が現れた段階で「更地渡し特約」を結ぶのが、手元資金と税制リスクの両面で最も安全な王道パターンです。
      </div>
    </div>
  );
}
