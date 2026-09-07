"use client";

import React, { useState } from "react";
import type { FaqItem } from "@/lib/faq-jsonld";

/**
 * 汎用FAQアコーディオン（データ駆動・全クラスタ共通の唯一のrender経路）。
 *
 * - 設問本文はデータのみ（`items`）で供給する。FAQ本文をJSXに直書きしない。
 * - ページのFAQPage JSON-LDは `buildFaqJsonLd(items)` で同一配列から生成する
 *   （単一ソース原則・tests/editorial-faq-consistency.test.ts で強制）。
 * - タップ領域 min-h-11、コントラストはデザイントークン準拠。
 */

export interface TaggedFaqItem extends FaqItem {
  /** 分類タグ（例: 「相場・評価」「法的効力」）。任意。 */
  tag?: string;
  /** 回答直下の要点ボックス。任意。 */
  highlight?: string;
}

export interface FaqAccordionProps {
  sectionId: string;
  ariaLabel: string;
  /** ヘッダーバッジの文言（例: "Q&A"） */
  badgeText: string;
  /** バッジ横の注記 */
  badgeNote: string;
  heading: string;
  lead: string;
  items: readonly TaggedFaqItem[];
}

export function FaqAccordion({
  sectionId,
  ariaLabel,
  badgeText,
  badgeNote,
  heading,
  lead,
  items,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className="my-10 rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="border-b border-[#dfe9ee] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            {badgeText}
          </span>
          <span className="text-xs font-bold text-[#708696]">{badgeNote}</span>
        </div>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl">
          {heading}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#506477] sm:text-sm">
          {lead}
        </p>
      </div>

      <div className="mt-6 divide-y divide-[#dfe9ee]">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="flex w-full min-h-11 items-start justify-between gap-4 text-left focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#078c95] text-xs font-black text-white">
                    Q
                  </span>
                  <div>
                    {item.tag && (
                      <span className="inline-block rounded bg-[#f0f7f7] px-2 py-0.5 text-[11px] font-bold text-[#0a7079]">
                        {item.tag}
                      </span>
                    )}
                    <h4 className="mt-1 text-sm font-black leading-relaxed text-[#14243a] sm:text-base">
                      {item.question}
                    </h4>
                  </div>
                </div>
                <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#dfe9ee] text-xs font-black text-[#708696]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3.5 pl-9">
                  <div className="rounded-xl border border-[#078c95]/20 bg-[#f8fbfa] p-4 text-sm leading-relaxed text-[#506477] sm:text-[15px]">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e56f2d] text-[11px] font-black text-white">
                        A
                      </span>
                      <div className="space-y-2 pt-0.5">
                        <p>{item.answer}</p>
                        {item.highlight && (
                          <div className="rounded-lg border border-[#bbd8dc] bg-[#f0f7f7] p-2.5 text-xs font-bold leading-relaxed text-[#0a7079]">
                            📌 要点: {item.highlight}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
