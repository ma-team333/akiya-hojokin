import { GUIDE_SOURCES } from "@/lib/guide-sources";

interface GuideSourcesProps {
  slug: string;
}

/**
 * 移植記事（/guide/<slug>）末尾の「出典と確認日・運営者判定」ブロック。
 * 出典データは src/lib/guide-sources.ts に単一ソースとして管理し、
 * 表示とここでしか使わない非保証の注記を一括で付ける。
 */
export function GuideSources({ slug }: GuideSourcesProps) {
  const entry = GUIDE_SOURCES[slug];
  if (!entry) {
    return null;
  }

  return (
    <section aria-labelledby={`guide-sources-${slug}`} className="mx-auto mt-12 max-w-[960px] px-5 md:px-8">
      <div className="rounded-2xl border border-[#dfe9ee] bg-white p-6 shadow-sm sm:p-8">
        <h2 id={`guide-sources-${slug}`} className="text-lg font-black text-[#14243a] sm:text-xl">
          出典と確認日（一次資料）
        </h2>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#334155] sm:text-sm">
          {entry.sources.map((source) => (
            <li key={source.label} className="flex flex-wrap items-baseline gap-x-2">
              <span aria-hidden="true" className="font-black text-[#078c95]">▪</span>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#078c95] underline decoration-[#bbd8dc] hover:decoration-[#078c95]"
                >
                  {source.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : (
                <span className="font-bold text-[#14243a]">{source.label}</span>
              )}
              {source.note && <span className="text-[#506477]">（{source.note}）</span>}
              {source.confirmedOn && <span className="text-[#708696]">確認日: {source.confirmedOn}</span>}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-sm font-black text-[#14243a] sm:text-base">運営者判定</h3>
        <p className="mt-2 text-xs leading-relaxed text-[#334155] sm:text-sm">{entry.judgment}</p>

        <p className="mt-4 rounded-lg bg-[#f0f4f8] p-3 text-[11px] leading-relaxed text-[#506477]">
          本文の出典確認日: {entry.confirmedOn}。法令・制度・税制は改正されることがあり、確認日以降の変更は反映していない場合があります。最終的な意思決定はご自身の責任で行い、個別の案件では弁護士・税理士・司法書士等の専門家や所轄官庁にご確認ください。
        </p>
      </div>
    </section>
  );
}
