"use client";

import { useId, useState } from "react";

/**
 * リースバックの「売却代金 vs 総家賃」収支シミュレーター。
 *
 * 計算ロジックの根拠（公的資料のみ）:
 * - 比較の考え方: 国土交通省「住宅のリースバックに関するガイドブック」（令和4年6月24日公表）
 *   確認ポイント3「『売却で受け取る金額』と、『数年かけて賃料として支払う金額』、
 *   どちらが高いか自分で計算して比較」
 * - 「売却代金が賃料何か月分相当か」: 国交省「リースバックに関するガイドライン」
 *   （令和8年7月策定・令和8年10月1日施行）が対応望ましい事項として例示する比較
 * - 長期譲渡所得の税額: 国税庁タックスアンサーNo.3208〔令和7年4月1日現在法令等〕
 *   税額 ＝ 課税長期譲渡所得金額 × 15%（住民税 5%）＋ 復興特別所得税（所得税額の2.1%）
 * - 取得費の概算: 国税庁タックスアンサーNo.3258〔令和7年4月1日現在法令等〕
 *   取得費が分からない場合は譲渡価額の5%相当額
 * - デフォルト値はガイドブックCASE2（約2,000万円売却・家賃約20万円・10年間居住）に準拠
 */
export function LeasebackSimulator() {
  // 万円単位で管理
  const [salePrice, setSalePrice] = useState<number>(2000); // 想定売却価格
  const [monthlyRent, setMonthlyRent] = useState<number>(20); // 月額家賃
  const [years, setYears] = useState<number>(10); // 住み続ける年数

  const salePriceId = useId();
  const monthlyRentId = useId();
  const yearsId = useId();

  // 総家賃支払額 = 月額家賃 × 12 × 年数
  const totalRent = Math.round(monthlyRent * 12 * years);

  // 売却価格は家賃何か月分に相当するか（ガイドラインの比較軸）
  const rentMonths = monthlyRent > 0 ? Math.round((salePrice / monthlyRent) * 10) / 10 : 0;
  const rentYears = rentMonths > 0 ? Math.round((rentMonths / 12) * 10) / 10 : 0;

  // 長期譲渡所得税の概算（No.3208・No.3258）
  // 課税長期譲渡所得金額 = 譲渡価額 − 取得費（5%概算）− 特別控除額（0で試算）
  const acquisitionCost = salePrice * 0.05;
  const taxableGain = Math.max(0, salePrice - acquisitionCost);
  const incomeTax = taxableGain * 0.15;
  const reconstructionTax = incomeTax * 0.021; // 復興特別所得税 = 所得税額の2.1%
  const residentTax = taxableGain * 0.05;
  const totalTransferTax = incomeTax + reconstructionTax + residentTax;

  // 税引後の受取額と総家賃の差引（ガイドブック・ポイント3の比較）
  const netProceeds = salePrice - totalTransferTax;
  const balance = netProceeds - totalRent;

  const fmt = (value: number) => value.toLocaleString();

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            税率は国税庁No.3208・取得費は5%概算（No.3258）で自動計算
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          リースバック「売却代金 vs 総家賃」収支シミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          想定売却価格・月額家賃・住み続ける年数を入力して、国交省ガイドブックが推奨する「売却で受け取る金額」と「賃料として支払う金額」の比較を試算します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-6">
          <div>
            <label
              htmlFor={salePriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 想定売却価格</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {fmt(salePrice)} 万円
              </span>
            </label>
            <input
              id={salePriceId}
              type="range"
              min={500}
              max={10000}
              step={50}
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>500万円</span>
              <span>1億円</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#708696]">
              ※不動産取引価格情報（国土交通省・土地総合情報システム）や複数事業者の提示額を参考に入力します。
            </p>
          </div>

          <div>
            <label
              htmlFor={monthlyRentId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 月額家賃（賃料）</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {fmt(monthlyRent)} 万円
              </span>
            </label>
            <input
              id={monthlyRentId}
              type="range"
              min={2}
              max={100}
              step={1}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>2万円</span>
              <span>100万円</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#708696]">
              ※提示された家賃のほか、総務省「令和5年住宅・土地統計調査」の借家平均家賃59,656円/月（令和6年9月25日公表）など周辺の公的統計とも比べてみましょう。
            </p>
          </div>

          <div>
            <label
              htmlFor={yearsId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>③ 住み続ける想定年数</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {years} 年
              </span>
            </label>
            <input
              id={yearsId}
              type="range"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>1年</span>
              <span>30年</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#708696]">
              ※定期借家契約の場合、契約で定めた期間の満了により契約が終了します（借地借家法第38条）。実際に住み続けられる期間は契約条件の確認が必要です。
            </p>
          </div>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 shadow-sm md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              SIMULATION RESULT
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#506477]">
              税引後の受取額と総家賃支払額の差引（{years}年間）
            </h4>

            {/* ハイライト差引額 */}
            <div className="mt-5 rounded-2xl bg-white p-5 sm:p-7 text-center shadow-[0_8px_24px_rgba(7,140,149,0.08)] border border-[#a7cbd0]/50">
              <p className="text-xs sm:text-sm font-bold text-[#0a7079]">
                {balance >= 0
                  ? "税引後受取額が総家賃を上回る場合"
                  : "総家賃支払額が税引後受取額を上回る場合"}
              </p>
              <p
                className={`mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  balance >= 0 ? "text-[#078c95]" : "text-[#d9483b]"
                }`}
              >
                {balance >= 0 ? "+" : "−"}
                {fmt(Math.round(Math.abs(balance)))}{" "}
                <span className="text-base sm:text-lg font-normal text-[#506477]">万円</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                税引後受取額 {fmt(Math.round(netProceeds))} 万円 − 総家賃 {fmt(totalRent)} 万円
              </p>
            </div>

            {/* 比較テーブル */}
            <div className="mt-6 space-y-2.5 divide-y divide-[#dfe9ee] text-xs sm:text-sm">
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">想定売却価格</span>
                <span className="font-bold text-[#14243a]">{fmt(salePrice)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">長期譲渡所得税の概算（No.3208・No.3258）</span>
                <span className="font-bold text-[#d9483b]">▲ {fmt(Math.round(totalTransferTax))} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">
                  税引後の受取額（取得費5%概算・譲渡費用・特例は考慮せず）
                </span>
                <span className="font-bold text-[#14243a]">{fmt(Math.round(netProceeds))} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-[#506477]">
                  総家賃支払額（{fmt(monthlyRent)} 万円 × 12か月 × {years} 年）
                </span>
                <span className="font-bold text-[#d9483b]">▲ {fmt(totalRent)} 万円</span>
              </div>
              <div className="flex justify-between pt-2.5 bg-white/90 p-2.5 rounded-[5px] border border-[#bbd8dc] font-bold">
                <span className="text-[#14243a]">売却価格は家賃何か月分に相当するか</span>
                <span className="text-base text-[#14243a] font-black">
                  約 {fmt(rentMonths)} か月（約 {rentYears} 年）
                </span>
              </div>
            </div>

            {/* ガイドラインの比較軸に関する参考ボックス */}
            <div className="mt-5 rounded-xl border border-[#bbd8dc] bg-white p-4 text-xs sm:text-sm leading-relaxed text-[#506477]">
              <span className="font-bold text-[#0a7079]">参考: 「賃料何か月分相当か」は契約前に確認できる比較軸 </span>
              令和8年10月1日施行の国交省「リースバックに関するガイドライン」は、売買価額及び借賃の算定根拠の説明や「売却代金が賃料等の何か月分に相当するか等」の説明を、事業者が可能な範囲で対応することが望ましい事項としています。
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※本シミュレーションは、長期譲渡所得（所有期間5年超）の税額計算（国税庁No.3208〔令和7年4月1日現在法令等〕: 所得税15%＋住民税5%＋復興特別所得税=所得税額の2.1%）と取得費5%概算（国税庁No.3258〔令和7年4月1日現在法令等〕）のみを用いた概算です。仲介手数料等の譲渡費用、家賃の改定、更新料、3,000万円特別控除等の特例の適用可否、住民税の減免等は含んでいません。実際の税額・契約条件は税務署・事業者等に確認してください。
          </p>
        </div>
      </div>
    </section>
  );
}
