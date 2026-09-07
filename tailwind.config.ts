import type { Config } from "tailwindcss";

/**
 * /guide 配下の移行記事（sobatan estate-lens から移植）が利用するトークンのみ収録。
 * 既存サイト（globals.css のカスタムCSS）とは別系統。値は sobatan estate-lens
 * tailwind.config.ts の正本から、移植対象が参照する分だけ抽出した。
 * preflight は有効（移植記事はその前提で書かれている）。既存ページは要視覚確認。
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#2A2520", soft: "#5C544A", faint: "#8C8275" },
        navy: { DEFAULT: "#172A42", deep: "#192F47" },
        teal: { DEFAULT: "#078C95", 600: "#087F88", 700: "#146F79" },
        cool: { bg: "#F1F7FA", card: "#FFFFFF", tint: "#EEF5F6", rule: "#E4EBEE" },
        brand: {
          50: "#FFF3EA",
          100: "#FFE2D0",
          200: "#FFC4A3",
          300: "#FF9E6E",
          400: "#FB7E3D",
          500: "#F26317",
          600: "#D44E08",
          700: "#A83A06",
        },
        trust: { 50: "#EAF5EF", 100: "#CFE8D9", 500: "#2E7D5B", 600: "#1F6649", 700: "#155038" },
      },
    },
  },
  plugins: [],
};

export default config;
