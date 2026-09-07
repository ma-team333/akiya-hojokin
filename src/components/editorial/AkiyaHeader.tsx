"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "ガイド", href: "/guide" },
  { label: "補助金を探す", href: "/subsidies" },
  { label: "検証方針", href: "/verification" },
  { label: "運営情報", href: "/operator" },
] as const;

/** サービス名。英語併記は行わず日本語のみ。 */
export const AKIYA_MEDIA_NAME = "空き家補助金ナビ";

/**
 * 空き家補助金ナビ（akiya-hojokin）のヘッダー。
 * sobatan estate-lens の AkiyaHeader（固定・スクロール検知）を移植し、
 * ナビゲーションを当サイトのIA（/guide・/subsidies・/verification・/operator）へ張り替えた。
 */
export function AkiyaHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        scrolled
          ? "border-cool-rule bg-white/95 shadow-[0_8px_30px_rgba(23,42,66,.06)] backdrop-blur"
          : "border-transparent bg-cool-bg/75 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-5 px-5 md:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-navy"
          aria-label={`${AKIYA_MEDIA_NAME} トップ`}
        >
          <svg
            viewBox="0 0 36 36"
            className="h-8 w-8 text-teal"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m4 17 14-11 14 11" />
            <path d="M8 15v15h20V15M14 30v-9h8v9" />
          </svg>
          <span className="text-[17px] font-black tracking-[-0.04em] md:text-xl">
            空き家<span className="text-teal">補助金</span>ナビ
          </span>
        </Link>

        <nav
          aria-label={`${AKIYA_MEDIA_NAME} メニュー`}
          className="ml-auto hidden items-center gap-5 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold text-navy/70 transition hover:text-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/subsidies"
          className="ml-auto inline-flex min-h-11 items-center justify-center border border-navy bg-white/90 px-4 text-xs font-black text-navy transition hover:bg-navy hover:text-white lg:ml-2"
        >
          補助金を探す
        </Link>
      </div>
    </header>
  );
}
