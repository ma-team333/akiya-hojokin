export function SanrinDisposalComparisonTable() {
  const comparisonData = [
    {
      route: "森林組合への相談（立木売却・施業委託）",
      target: "スギ・ヒノキ等の人工林（用材林）、接道あり",
      cost: "基本的に自己負担なし（伐採木材の売上から経費相殺）",
      period: "3ヶ月〜1年（施業計画や市場時期による）",
      boundary: "要確認（森林組合が現地調査・確認を支援）",
      pros: "価値ある立木であれば売却益が出る。土地の所有権を維持しながら管理を任せられる。",
      cons: "土地そのものの買い取り・不動産仲介は原則行わない。雑木林や無道路地は対応困難。",
    },
    {
      route: "山林専門仲介・マッチング（山林バンク等）",
      target: "キャンプ・レジャー適地、眺望・渓流あり、接道あり",
      cost: "仲介手数料（売買価格の5%〜＋最低手数料）または成約時手数料",
      period: "3ヶ月〜2年（買い手の需要による）",
      boundary: "大まかな境界明示が必要（現況渡し特約も多い）",
      pros: "不要な土地を完全に売却手放しできる。レジャー需要があれば高値成約の可能性。",
      cons: "急傾斜地や無道路地、特徴のない山林は買い手が見つからず長期化しやすい。",
    },
    {
      route: "隣地森林所有者への売却・無償譲渡",
      target: "隣接地が林業経営者、または境界を整理したい隣人",
      cost: "所有権移転登記費用（司法書士報酬＋登録免許税 数万円〜）",
      period: "1ヶ月〜6ヶ月（交渉次第）",
      boundary: "当事者間で合意できれば簡易な確認で可能",
      pros: "仲介手数料がかからず、一番早く確実に手放せる可能性が高い。",
      cons: "隣地所有者の特定・連絡が必要。相手が不要と判断した場合は成立しない。",
    },
    {
      route: "相続土地国庫帰属制度（法務局）",
      target: "相続で取得した不要な山林（危険な崖地・境界争いなし）",
      cost: "審査手数料（1筆1.4万円）＋ 森林管理負担金（10年分・約20万〜90万円超）",
      period: "半年〜1年（法務局の書類審査・現地調査）",
      boundary: "境界が明らかであることが必須要件",
      pros: "買い手がいない山林でも、国の審査を通過すれば確実に手放せる（国が引き取り）。",
      cons: "負担金の出費が必要。崖地崩壊リスク等で却下・不承認となる要件が厳しい。",
    },
    {
      route: "森林経営管理制度（市町村窓口）",
      target: "管理できない人工林（市町村の意向調査対象林）",
      cost: "所有者の直接費用負担なし（森林環境譲与税等を活用）",
      period: "市町村の計画・集約化サイクルによる",
      boundary: "市町村主導の調査・航空レーザー等で把握",
      pros: "放置山林の荒廃を防ぎ、公的に森林管理・間伐を行ってもらえる。",
      cons: "土地を手放す（所有権移転）わけではなく、管理の信託・委託にとどまる。",
    },
  ];

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-[#dfe9ee] bg-white shadow-sm">
      <div className="border-b border-[#dfe9ee] bg-[#f0f7f7] p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#14243a]">
          山林の売却・処分・活用 5つの主要ルート徹底比較
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#506477]">
          対象となる山林の樹種・接道・地形条件に合わせて、最適な処分・活用窓口を選択してください。
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#dfe9ee] bg-[#f8fbfa] text-[#14243a]">
              <th className="p-3.5 sm:p-4 font-bold min-w-[160px]">処分・活用ルート</th>
              <th className="p-3.5 sm:p-4 font-bold min-w-[150px]">適した山林の条件</th>
              <th className="p-3.5 sm:p-4 font-bold min-w-[130px]">費用・負担</th>
              <th className="p-3.5 sm:p-4 font-bold min-w-[110px]">完了までの期間</th>
              <th className="p-3.5 sm:p-4 font-bold min-w-[110px]">境界確定の要否</th>
              <th className="p-3.5 sm:p-4 font-bold min-w-[200px]">主なメリット・注意点</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe9ee] text-[#506477]">
            {comparisonData.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#fbfaf7] transition">
                <td className="p-3.5 sm:p-4 font-bold text-[#14243a] align-top bg-[#f8fbfa]/50">
                  {item.route}
                </td>
                <td className="p-3.5 sm:p-4 align-top leading-relaxed text-[#14243a]">
                  {item.target}
                </td>
                <td className="p-3.5 sm:p-4 align-top leading-relaxed font-semibold text-[#d9483b]">
                  {item.cost}
                </td>
                <td className="p-3.5 sm:p-4 align-top leading-relaxed">
                  {item.period}
                </td>
                <td className="p-3.5 sm:p-4 align-top leading-relaxed">
                  {item.boundary}
                </td>
                <td className="p-3.5 sm:p-4 align-top space-y-1 text-xs">
                  <div className="text-[#078c95] font-semibold">⭕ {item.pros}</div>
                  <div className="text-[#506477]">⚠️ {item.cons}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#dfe9ee] bg-[#f8fbfa] p-4 text-xs text-[#708696] leading-relaxed">
        ※森林組合は土地の売買仲介業（宅建業）を行っていないため、土地ごと売却したい場合は山林専門のマッチングサービスや隣地所有者への譲渡、国庫帰属制度が適しています。
      </div>
    </div>
  );
}
