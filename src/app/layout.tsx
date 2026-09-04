import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "空き家の活用・解体を考える人のために、自治体の補助金情報を原典付きで整理するメディア。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "自治体の空き家補助金を、原典と確認日つきで探せるように整理します。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">空</span>
              <span>空き家補助金ナビ</span>
            </Link>
            <nav aria-label="メインナビゲーション">
              <Link href="/subsidies">補助金を探す</Link>
              <Link href="/verification">検証方針</Link>
              <Link href="/operator">運営情報</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <p className="footer-brand">空き家補助金ナビ</p>
              <p className="footer-note">制度の原典をたどれる、空き家情報の入口。</p>
            </div>
            <nav className="footer-links" aria-label="フッターナビゲーション">
              <Link href="/operator">運営情報</Link>
              <Link href="/privacy">プライバシーポリシー</Link>
              <Link href="/contact">連絡先</Link>
            </nav>
          </div>
          <p className="copyright">© 空き家補助金ナビ</p>
        </footer>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
