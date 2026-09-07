import Link from "next/link";

/** 空き家補助金ナビ共通フッター。英語表記を使わず、サービス名は日本語に統一する。 */
export function AkiyaFooter() {
  return (
    <footer className="border-t border-cool-rule bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-5 py-8 text-xs text-ink-faint md:px-10">
        <p className="font-black text-navy">
          空き家補助金ナビ <span className="font-medium text-ink-faint">空き家の処分と補助金の案内</span>
        </p>
        <nav aria-label="フッターメニュー" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/guide" className="hover:text-teal">ガイド</Link>
          <Link href="/subsidies" className="hover:text-teal">補助金を探す</Link>
          <Link href="/verification" className="hover:text-teal">検証方針</Link>
          <Link href="/operator" className="hover:text-teal">運営情報</Link>
          <Link href="/privacy" className="hover:text-teal">プライバシー</Link>
          <Link href="/contact" className="hover:text-teal">連絡先</Link>
        </nav>
      </div>
    </footer>
  );
}
