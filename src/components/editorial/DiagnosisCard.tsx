import Link from "next/link";

const steps = [
  { number: "01", title: "対象となる工事を確認", body: "解体・除却など、補助金の対象になる工事を確かめます。" },
  { number: "02", title: "自治体の制度を探す", body: "物件の所在地で実施中の補助金の有無と要件を確認します。" },
  { number: "03", title: "申請時期を確認", body: "契約・着工前の事前申請が要かどうか、公式要項で確かめます。" },
] as const;

/** 文言・入口はページごとに差し替え可能。 */
export interface DiagnosisCardProps {
  title?: string;
  lead?: string;
}

/**
 * 記事サイドバー末尾の導線カード。
 * sobatan estate-lens の DiagnosisCard（かんたん診断 → /assess）を移植し、
 * 当サイトの一次導線（補助金レジストリ /subsidies）へ張り替えた。
 */
export function DiagnosisCard({
  title = "自分の空き家にかかる補助金、まずは制度を探すところから",
  lead = "いきなり決めなくても大丈夫です。お住まいの自治体の制度の有無、上限額、申請時期を、原典と確認日つきで確認できます。",
}: DiagnosisCardProps) {
  return (
    <section id="diagnosis" aria-labelledby="diagnosis-title" className="mx-auto max-w-[1240px] px-5 py-20 md:px-10 md:py-28">
      <div className="border border-[rgba(23,42,66,.10)] bg-white p-6 shadow-[0_18px_50px_rgba(23,42,66,.06)] md:p-12 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] text-teal">補助金を探す</p>
            <h2 id="diagnosis-title" className="mt-4 max-w-2xl text-3xl font-black leading-[1.45] tracking-[-0.05em] text-navy md:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-ink-soft md:text-base">
              {lead}
            </p>
            <Link href="/subsidies" className="mt-8 inline-flex min-h-12 items-center justify-center bg-brand-500 px-7 text-sm font-black text-white transition hover:bg-brand-600">
              補助金を探す <span className="ml-3" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element -- 単一の装飾SVGのため最適化対象外 */}
            <img src="/guide/diagnosis-house.svg" alt="家の状況から今後の方向性を整理する線画" className="h-full w-full object-contain" loading="lazy" />
          </div>
        </div>

        <ol className="mt-12 grid border-t border-cool-rule md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.number} className={`relative py-7 md:px-7 ${index > 0 ? "border-t border-cool-rule md:border-l md:border-t-0" : ""}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-teal text-xs font-black text-teal">{step.number}</span>
              <h3 className="mt-4 text-base font-black text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
