import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '空き家補助金ナビ',
  description: '自治体の空き家支援制度を、原典と確認日つきで確認するためのレジストリ。'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <a className="brand" href="/">空き家補助金ナビ</a>
          <span className="header-note">原典・確認日を追跡する制度レジストリ</span>
        </header>
        <main>{children}</main>
        <footer className="site-footer">機械生成候補は人間確認後に公開します。</footer>
      </body>
    </html>
  );
}
