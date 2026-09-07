import { SPECIAL_PROPERTY_CASES } from "./article-data";

export function SpecialPropertyCaseTable() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_4px_20px_rgba(20,36,58,0.04)]">
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] bg-[#f8fbfa] px-6 py-5 sm:px-8 sm:py-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#078c95]">
          <span className="h-2 w-2 rounded-full bg-[#e56f2d]" />
          SPECIAL PROPERTY BUYOUT MATRIX
        </span>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl leading-snug">
          特殊空き家（ゴミ屋敷・再建築不可・老朽物件）の買取実例と価格水準
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#506477]">
          一般仲介では成約が困難な「訳あり物件」がどのように専門業者に買い取られ、再生されるかの構造分析です。
        </p>
      </div>

      {/* モバイル表示: カードスタック (md:hidden) */}
      <div className="divide-y divide-[#dfe9ee] md:hidden">
        {SPECIAL_PROPERTY_CASES.map((item, idx) => (
          <div key={idx} className="p-5 sm:p-7 space-y-3.5 bg-white">
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-md bg-[#14243a] px-2.5 py-1 text-xs font-black text-white">
                {item.category}
              </span>
              <span className="text-xs font-black text-[#078c95]">
                査定目安: {item.priceEstimateRatio}
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-[#708696]">物件状態の定義</p>
              <p className="text-xs sm:text-sm font-medium text-[#14243a] mt-0.5">
                {item.condition}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3 text-xs">
              <span className="font-bold text-amber-900">仲介における課題:</span>
              <p className="mt-0.5 text-amber-950">{item.brokerageChallenge}</p>
            </div>

            <div className="rounded-xl bg-[#f0f7f7] border border-[#bbd8dc] p-3 text-xs">
              <span className="font-bold text-[#087f88]">専門業者の買取・再生スキーム:</span>
              <p className="mt-0.5 text-[#14243a]">{item.buyoutMechanism}</p>
            </div>

            <p className="text-[11px] text-[#708696] bg-[#fbfaf7] p-2.5 rounded-lg border border-[#dfe9ee]">
              <strong className="text-[#14243a]">実務ポイント:</strong> {item.point}
            </p>
          </div>
        ))}
      </div>

      {/* デスクトップ表示: テーブルレイアウト (hidden md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f0f7f7] text-[#14243a] font-black">
              <th className="py-4 px-5 w-[18%]">物件区分・状態</th>
              <th className="py-4 px-5 w-[27%]">一般仲介での課題</th>
              <th className="py-4 px-5 w-[27%]">買取業者の再生スキーム</th>
              <th className="py-4 px-5 w-[14%]">買取価格水準目安</th>
              <th className="py-4 px-5 w-[14%]">売主メリット</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee]">
            {SPECIAL_PROPERTY_CASES.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#fbfaf7]/60 transition">
                <td className="py-4 px-5 align-top">
                  <div className="font-black text-[#14243a]">{item.category}</div>
                  <div className="text-[11px] text-[#708696] mt-1 leading-snug">{item.condition}</div>
                </td>
                <td className="py-4 px-5 align-top text-xs text-[#506477] leading-relaxed">
                  {item.brokerageChallenge}
                </td>
                <td className="py-4 px-5 align-top text-xs text-[#14243a] leading-relaxed">
                  {item.buyoutMechanism}
                </td>
                <td className="py-4 px-5 align-top font-black text-[#078c95]">
                  {item.priceEstimateRatio}
                </td>
                <td className="py-4 px-5 align-top text-[11px] text-[#506477] leading-snug">
                  {item.point}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
