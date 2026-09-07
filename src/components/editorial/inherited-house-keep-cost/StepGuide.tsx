import React from "react";

interface StepItem {
  stepNumber: string;
  title: string;
  badge: string;
  lead: string;
  checklist: string[];
  officialNote: string;
}

const STEPS: readonly StepItem[] = [
  {
    stepNumber: "01",
    title: "所有権・名義の確定と相続登記の申請",
    badge: "2024年4月義務化対応",
    lead: "実家を売らずに維持・管理する場合でも、まず所有名義を明確にする必要があります。未登記のまま放置すると、将来の管理責任の所在が曖昧になり、過料の対象となります。",
    checklist: [
      "遺産分割協議書の作成または法定相続分に応じた名義確定",
      "法務局への相続登記申請（取得を知った日から3年以内の義務化、違反時は10万円以下の過料）",
      "自治体固定資産税課への納税義務者（相続人代表者）指定届出書の提出",
      "火災保険の契約者・被保険者名義の変更手続き",
    ],
    officialNote: "根拠法令: 不動産登記法第76条の2（相続登記の申請義務）、地方税法第343条第2項",
  },
  {
    stepNumber: "02",
    title: "年間維持費の正確な試算と管理用口座の準備",
    badge: "資金計画・口座一元化",
    lead: "固定資産税・都市計画税、空家対応保険、水道光熱費基本料金、草刈り外注費など、年30万〜50万円の支出を一元管理できる体制を整えます。",
    checklist: [
      "固定資産税納税通知書（毎年4〜5月到着）による課税標準額と税額の確認",
      "空家に対応した火災保険・施設所有者賠償責任保険への加入・更新（住宅用から一般物件用への切替要否確認）",
      "水道局・電力会社との契約見直し（通水・防犯用の最低容量契約の維持と口座振替設定）",
      "共有名義の場合は相続人間での年間費用負担割合・清算ルールの書面化",
    ],
    officialNote: "参考: 国土交通省「空き家所有者等の実態調査」、損害保険料率算出機構基準",
  },
  {
    stepNumber: "03",
    title: "管理ルーティンの固定化と近隣・自治体対策",
    badge: "放置・近隣トラブル防止",
    lead: "月1回の通風・通水・外壁点検と、年2回以上の除草・剪定作業をスケジュール化します。遠方の場合は地元の巡回代行会社やシルバー人材センターと契約します。",
    checklist: [
      "月1回の通風（全窓開放30分以上）・通水（全水栓1分以上放水）・郵便物回収の実施",
      "春・夏季の敷地除草と、道路・隣地へ越境する庭木の剪定（民法233条越境枝切除への対応）",
      "近隣隣接者または町内会長への緊急連絡先（氏名・電話番号）の共有",
      "郵便局への転送届提出（1年ごとに更新手続きが必要）",
    ],
    officialNote: "根拠法令: 民法第233条（竹木の枝の切除及び根の切取り）、第717条（工作物責任）",
  },
  {
    stepNumber: "04",
    title: "年1回の建物劣化点検と保有継続・売却期限の棚卸し",
    badge: "特例3年リミット確認",
    lead: "建物の劣化進行や家族のライフスタイルの変化を踏まえ、年1回「このまま保有し続けるか、利活用または売却に切り替えるか」を定期評価します。",
    checklist: [
      "台風・大雨・大雪後の屋根瓦・雨樋・外壁ひび割れ・雨漏りの目視点検",
      "空家等対策特措法に基づく自治体からの「指導」「勧告」通知の有無確認",
      "「相続空き家の3,000万円特別控除（相続から3年後の年末まで）」の残存期間確認",
      "保有コスト累計額と将来の売却手残りシミュレーションの再計算",
    ],
    officialNote: "根拠法令: 租税特別措置法第35条第3項、空家等対策特別措置法第13条・第22条",
  },
];

export function StepGuide() {
  return (
    <div className="space-y-6">
      {STEPS.map((step, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm sm:p-8 transition hover:border-[#078c95]/40"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#078c95] text-xs font-black text-white">
              {step.stepNumber}
            </span>
            <span className="rounded bg-[#f0f7f7] px-2.5 py-1 text-xs font-black text-[#0a7079]">
              {step.badge}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-black text-[#14243a] sm:text-xl">
            {step.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-[#506477] sm:text-sm">
            {step.lead}
          </p>

          <div className="mt-5 rounded-xl border border-[#dfe9ee] bg-[#fbfaf7] p-4 sm:p-5">
            <h4 className="text-xs font-black uppercase text-[#078c95]">
              チェックリスト・実施手順
            </h4>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#14243a]">
              {step.checklist.map((item, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#078c95] bg-[#f0f7f7] text-[10px] font-bold text-[#078c95]">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3 text-[11px] text-[#708696]">
            {step.officialNote}
          </p>
        </div>
      ))}
    </div>
  );
}
