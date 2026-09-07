"use client";

import { useId, useState } from "react";

/**
 * 売れない実家の「処分方法ごとの手取り比較」シミュレーター。
 *
 * 計算ロジックの根拠（公的資料のみ・価格入力は利用者が査定・見積りから入力する設計）:
 * - 仲介手数料の上限: 宅地建物取引業法第46条の2の規定に基づく上限
 *   （国土交通省告示: 200万円以下5%、200万円超400万円以下4%＋2万円、400万円超3%＋6万円、
 *   それぞれに消費税相当額を加算）
 * - 買取: 宅建業法第46条の2の報酬上限は「媒介・代理」に関する報酬が対象のため、
 *   買取（業者が自ら買主となる売買）では売主の仲介手数料を計算しない
 * - 長期譲渡所得の税額: 国税庁タックスアンサーNo.3208〔令和7年4月1日現在法令等〕
 *   税額 ＝ 課税長期譲渡所得金額 × 15%（住民税 5%）＋ 復興特別所得税（所得税額の2.1%）
 *   ＝ 実効 20.315%
 * - 取得費の概算: 国税庁タックスアンサーNo.3258〔令和7年4月1日現在法令等〕
 *   取得費が分からない場合は譲渡価額の5%相当額
 * - 3,000万円特別控除: 国税庁タックスアンサーNo.3302〔令和7年4月1日現在法令等〕
 *   （要件を満たす場合のみ適用。詳細は3,000万円特別控除の記事で確認）
 * - 解体費用・維持費は公定価格が存在しないため入力値（複数見積り・納税通知書等の実額）
 */
export function ChihoShobunSimulator() {
  // 万円単位で管理
  const [brokeragePrice, setBrokeragePrice] = useState<number>(800); // ① 仲介売却の想定価格
  const [purchasePrice, setPurchasePrice] = useState<number>(500); // ② 買取の想定価格
  const [demolitionCost, setDemolitionCost] = useState<number>(300); // ③ 解体費用
  const [landPrice, setLandPrice] = useState<number>(500); // ④ 解体後の更地想定価格
  const [annualHolding, setAnnualHolding] = useState<number>(10); // ⑤ 年間の維持費
  const [holdYears, setHoldYears] = useState<number>(5); // ⑥ 保有する年数
  const [useDeduction, setUseDeduction] = useState<boolean>(false); // 3,000万円特別控除の想定

  const brokeragePriceId = useId();
  const purchasePriceId = useId();
  const demolitionCostId = useId();
  const landPriceId = useId();
  const annualHoldingId = useId();
  const holdYearsId = useId();
  const deductionId = useId();

  /** 宅建業法第46条の2の上限（3段階税率＋消費税10%）・仲介手数料（万円）。 */
  const agentFeeCap = (price: number): number => {
    if (price <= 0) return 0;
    if (price <= 200) return price * 0.05 * 1.1;
    if (price <= 400) return (price * 0.04 + 2) * 1.1;
    return (price * 0.03 + 6) * 1.1;
  };

  /** 長期譲渡所得税の概算（No.3208・No.3258・No.3302・万円）。 */
  const transferTax = (price: number): number => {
    const acquisitionCost = price * 0.05; // 取得費5%概算
    const deduction = useDeduction ? 3000 : 0; // 3,000万円特別控除の想定
    const taxableGain = Math.max(0, price - acquisitionCost - deduction);
    const incomeTax = taxableGain * 0.15;
    const reconstructionTax = incomeTax * 0.021; // 復興特別所得税 = 所得税額の2.1%
    const residentTax = taxableGain * 0.05;
    return incomeTax + reconstructionTax + residentTax;
  };

  // 各処分方法の手取り概算
  const brokerageNet = brokeragePrice - agentFeeCap(brokeragePrice) - transferTax(brokeragePrice);
  const purchaseNet = purchasePrice - transferTax(purchasePrice); // 買取は仲介手数料なし
  const demolitionNet =
    landPrice - demolitionCost - agentFeeCap(landPrice) - transferTax(landPrice);
  const holdingTotal = annualHolding * holdYears; // 保有し続けた場合の累積維持費
  // 解体後に更地が売れ残る場合の「二重苦」: 解体費の持ち出し＋売れ残り期間の維持費
  const stuckBareLandTotal = demolitionCost + holdingTotal;

  const cases = [
    {
      name: "仲介で売却",
      price: brokeragePrice,
      fee: agentFeeCap(brokeragePrice),
      tax: transferTax(brokeragePrice),
      net: brokerageNet,
      note: "買主が決まるまで販売活動を行う。手数料は宅建業法第46条の2の上限で計算。",
    },
    {
      name: "買取で売却",
      price: purchasePrice,
      fee: 0,
      tax: transferTax(purchasePrice),
      net: purchaseNet,
      note: "買主が業者自身となる売買。媒介報酬の上限規制の対象外のため仲介手数料なし。",
    },
    {
      name: "解体して更地売却",
      price: landPrice,
      fee: agentFeeCap(landPrice),
      tax: transferTax(landPrice),
      net: demolitionNet,
      note: `解体費用 ${demolitionCost} 万円を差引。更地は住宅用地特例の適用外（固定資産税最大6倍）。`,
    },
  ];

  const best = cases.reduce((a, b) => (b.net > a.net ? b : a), cases[0]);
  const fmt = (value: number) => value.toLocaleString();

  return (
    <section className="my-8 sm:my-10 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-[0_6px_24px_rgba(20,36,58,0.06)]">
      <div className="border-b border-[#dfe9ee] p-6 sm:p-9 md:p-10">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#078c95] px-3 py-1 text-xs font-black text-white">
            TOOL
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-[#708696]">
            手数料は宅建業法第46条の2上限・税率は国税庁No.3208/3258/3302で自動計算
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#14243a] sm:text-2xl leading-snug">
          売れない実家の「処分方法比較」手取りシミュレーター
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#506477]">
          仲介売却・買取・解体して更地売却の3つの方法の手取り概算と、売らずに保有し続けた場合の累積維持費を並べて比較できます。想定価格は不動産取引価格情報（国土交通省・土地総合情報システム）の周辺成約事例や、複数の査定・見積りの提示額を参考に入力します。
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:gap-10 sm:p-9 md:p-10 md:grid-cols-12">
        {/* 入力フォーム */}
        <div className="space-y-6 sm:space-y-8 md:col-span-6">
          <div>
            <label
              htmlFor={brokeragePriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>① 仲介売却の想定価格</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {fmt(brokeragePrice)} 万円
              </span>
            </label>
            <input
              id={brokeragePriceId}
              type="range"
              min={0}
              max={5000}
              step={50}
              value={brokeragePrice}
              onChange={(e) => setBrokeragePrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>0万円</span>
              <span>5,000万円</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#708696]">
              ※不動産会社2社以上の査定額と、不動産取引価格情報（土地総合情報システム）の周辺成約事例を比べて入力します。
            </p>
          </div>

          <div>
            <label
              htmlFor={purchasePriceId}
              className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
            >
              <span>② 買取の想定価格</span>
              <span className="text-base sm:text-lg font-black text-[#078c95]">
                {fmt(purchasePrice)} 万円
              </span>
            </label>
            <input
              id={purchasePriceId}
              type="range"
              min={0}
              max={5000}
              step={50}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
            />
            <div className="mt-2 flex justify-between text-xs text-[#708696]">
              <span>0万円</span>
              <span>5,000万円</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#708696]">
              ※買取価格の公定価格はありません。複数事業者の提示額とその根拠を比較して入力します。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor={demolitionCostId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>③ 解体費用</span>
                <span className="text-base font-black text-[#078c95]">
                  {fmt(demolitionCost)} 万円
                </span>
              </label>
              <input
                id={demolitionCostId}
                type="range"
                min={0}
                max={1000}
                step={10}
                value={demolitionCost}
                onChange={(e) => setDemolitionCost(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                ※公定価格はなく複数見積りの実費で入力。自治体の解体補助金の有無は市町村で確認します。
              </p>
            </div>
            <div>
              <label
                htmlFor={landPriceId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>④ 解体後の更地想定価格</span>
                <span className="text-base font-black text-[#078c95]">
                  {fmt(landPrice)} 万円
                </span>
              </label>
              <input
                id={landPriceId}
                type="range"
                min={0}
                max={3000}
                step={50}
                value={landPrice}
                onChange={(e) => setLandPrice(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                ※古家付き価格と更地価格は買い手層が異なるため、査定で両方確認します。
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor={annualHoldingId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>⑤ 年間の維持費</span>
                <span className="text-base font-black text-[#078c95]">
                  {fmt(annualHolding)} 万円/年
                </span>
              </label>
              <input
                id={annualHoldingId}
                type="range"
                min={0}
                max={100}
                step={1}
                value={annualHolding}
                onChange={(e) => setAnnualHolding(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                ※固定資産税・都市計画税（納税通知書）に維持管理費を加えた実額で入力します。
              </p>
            </div>
            <div>
              <label
                htmlFor={holdYearsId}
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#14243a]"
              >
                <span>⑥ 保有する想定年数</span>
                <span className="text-base font-black text-[#078c95]">
                  {holdYears} 年
                </span>
              </label>
              <input
                id={holdYearsId}
                type="range"
                min={1}
                max={20}
                step={1}
                value={holdYears}
                onChange={(e) => setHoldYears(Number(e.target.value))}
                className="mt-3 h-3.5 w-full cursor-pointer accent-[#078c95]"
              />
              <p className="mt-2 text-xs leading-relaxed text-[#708696]">
                ※売らずに持ち続ける場合の維持費累計を試算します。
              </p>
            </div>
          </div>

          <label
            htmlFor={deductionId}
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-[#dfe9ee] bg-[#f8fbfa] p-4"
          >
            <input
              id={deductionId}
              type="checkbox"
              checked={useDeduction}
              onChange={(e) => setUseDeduction(e.target.checked)}
              className="h-5 w-5 shrink-0 accent-[#078c95]"
            />
            <span className="text-xs sm:text-sm font-bold text-[#14243a]">
              3,000万円特別控除の適用を想定する
              <span className="block text-xs font-normal leading-relaxed text-[#708696]">
                相続した空き家で国税庁No.3302〔令和7年4月1日現在法令等〕の要件を満たす場合のみ（譲渡は現行では2027年12月31日まで）。要件は
                <a
                  href="https://www.r-sic.com/akiya/articles/3000man-deduction"
                  className="text-[#078c95] underline"
                >
                  3,000万円特別控除の記事
                </a>
                で確認します。
              </span>
            </span>
          </label>
        </div>

        {/* 試算結果パネル */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-6 sm:p-8 shadow-sm md:col-span-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#087f88]">
              <span className="h-2 w-2 rounded-full bg-[#ed7b3d]" />
              SIMULATION RESULT
            </span>
            <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#506477]">
              処分方法ごとの手取り概算の比較
            </h4>

            {/* 比較テーブル */}
            <div className="mt-5 space-y-3">
              {cases.map((c) => (
                <div
                  key={c.name}
                  className={`rounded-xl border bg-white p-4 text-xs sm:text-sm ${
                    c === best
                      ? "border-[#078c95] shadow-[0_4px_14px_rgba(7,140,149,0.15)]"
                      : "border-[#dfe9ee]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-black text-[#14243a]">
                      {c.name}
                      {c === best && (
                        <span className="ml-2 rounded bg-[#078c95] px-2 py-0.5 text-[10px] font-black text-white">
                          手取り最大
                        </span>
                      )}
                    </p>
                    <p
                      className={`text-lg font-black ${
                        c.net >= 0 ? "text-[#078c95]" : "text-[#d9483b]"
                      }`}
                    >
                      {c.net >= 0 ? "" : "−"}
                      {fmt(Math.round(Math.abs(c.net)))}{" "}
                      <span className="text-xs font-normal text-[#506477]">万円</span>
                    </p>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-[#708696]">
                    <p>
                      想定価格 {fmt(c.price)} 万円 − 仲介手数料上限 {fmt(Math.round(c.fee))} 万円
                      − 譲渡所得税 {fmt(Math.round(c.tax))} 万円
                      {c.name === "解体して更地売却" && ` − 解体費用 ${fmt(demolitionCost)} 万円`}
                    </p>
                    <p>{c.note}</p>
                  </div>
                </div>
              ))}

              {/* 保有継続コスト */}
              <div className="rounded-xl border border-amber-200 bg-white p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-[#14243a]">売らずに保有し続ける場合</p>
                  <p className="text-lg font-black text-[#d9483b]">
                    ▲ {fmt(holdingTotal)}{" "}
                    <span className="text-xs font-normal text-[#506477]">万円</span>
                  </p>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
                  維持費 {fmt(annualHolding)} 万円/年 × {holdYears} 年の累計。固定資産税の住宅用地特例は建物が存続する間適用されますが、特定空家等・管理不全空家として勧告を受けると最大6倍に増額されます（地方税法第349条の3・空家等対策特別措置法）。
                </p>
              </div>

              {/* 解体後に売れ残る二重苦 */}
              <div className="rounded-xl border border-amber-200 bg-[#fdf6f3] p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-[#14243a]">解体したのに更地が売れ残る場合（二重苦）</p>
                  <p className="text-lg font-black text-[#d9483b]">
                    ▲ {fmt(stuckBareLandTotal)}{" "}
                    <span className="text-xs font-normal text-[#506477]">万円</span>
                  </p>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#708696]">
                  解体費用 {fmt(demolitionCost)} 万円の持ち出し＋売れ残り期間の維持費 {fmt(annualHolding)} 万円/年 × {holdYears} 年の累計。更地は住宅用地特例（地方税法第349条の3）の適用外で土地の固定資産税が最大6倍になるため、⑤の年間維持費（建物存続時＝特例適用中ベース）を上回る負担が発生し得ます。解体更地売却を検討する場合は「更地にしても売れる見込み」を査定で確認してから進めるのが原則です。
                </p>
              </div>
            </div>

            {/* 参考ボックス */}
            <div className="mt-5 rounded-xl border border-[#bbd8dc] bg-white p-4 text-xs sm:text-sm leading-relaxed text-[#506477]">
              <span className="font-bold text-[#0a7079]">参考: 手数料と税額の計算根拠 </span>
              仲介手数料は宅建業法第46条の2の上限（200万円以下5%、200万円超400万円以下4%＋2万円、400万円超3%＋6万円に消費税相当額を加算）で計算します。買取は業者が自ら買主となるため売主の仲介手数料は発生しません。譲渡所得税は長期譲渡所得（No.3208〔令和7年4月1日現在法令等〕: 所得税15%＋住民税5%＋復興特別所得税＝所得税額の2.1%）と取得費5%概算（No.3258〔令和7年4月1日現在法令等〕）による概算です。
            </div>
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-[#708696]">
            ※本シミュレーションは、宅建業法第46条の2の報酬上限・国税庁タックスアンサーNo.3208/No.3258/No.3302〔令和7年4月1日現在法令等〕のみを用いた概算です。買取価格・解体費用・更地価格・維持費は入力値であり、実際の相場・費用は査定・見積りで確認が必要です。印紙税・登記費用・抵当権抹消費用、相続税の取得費加算の特例と3,000万円特別控除の併用可否、仲介手数料の実際の額（上限以下の設定も可）は含めていません。実際の税額・契約条件は税務署・不動産会社等に確認してください。
          </p>
        </div>
      </div>
    </section>
  );
}
