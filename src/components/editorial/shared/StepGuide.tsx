"use client";

import React, { useState } from "react";

/**
 * 汎用ステップガイド（データ駆動・全クラスタ共通の唯一のrender経路）。
 *
 * - ステップ本文はデータのみ（`steps`）で供給する。本文をJSXに直書きしない。
 * - チェックリストはインタラクティブ（タップ領域 min-h-11）。
 * - `critical` ステップはオレンジ枠でハイライト。
 */

export interface StepGuideStep {
  /** ステップ番号（例: "01" / "STEP 1"） */
  number: string;
  title: string;
  /** 段階バッジ（例: 「売却前」「自治体手続き」「目安時期」）。任意。 */
  subtitle?: string;
  summary: string;
  /** 実務ポイント箇条書き。任意。 */
  points?: string[];
  /** 補足情報（費用・税影響など、オレンジ系情報ボックス）。任意。 */
  note?: string;
  /** 警告（⚠ 注意）。任意。 */
  warning?: string;
  /** クリック式チェックリスト。任意。 */
  checklist?: string[];
  /** 重要ステップのハイライト。任意。 */
  critical?: boolean;
}

export interface StepGuideAppendix {
  title: string;
  items: string[];
}

export interface StepGuideProps {
  sectionId: string;
  ariaLabel: string;
  badgeText: string;
  badgeNote: string;
  heading: string;
  lead: string;
  steps: readonly StepGuideStep[];
  /** 末尾の資料・書類一覧パネル。任意。 */
  appendix?: StepGuideAppendix;
}

export function StepGuide({
  sectionId,
  ariaLabel,
  badgeText,
  badgeNote,
  heading,
  lead,
  steps,
  appendix,
}: StepGuideProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className="my-10 rounded-2xl border border-[#dfe9ee] bg-white p-5 shadow-sm sm:p-8"
    >
      {/* ヘッダー */}
      <div className="border-b border-[#dfe9ee] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#078c95] px-2.5 py-1 text-[11px] font-black text-white">
            {badgeText}
          </span>
          <span className="text-xs font-bold text-[#506477]">{badgeNote}</span>
        </div>
        <h3 className="mt-2 text-lg font-black text-[#14243a] sm:text-xl">
          {heading}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#506477] sm:text-sm">
          {lead}
        </p>
      </div>

      {/* ステップ一覧 */}
      <div className="mt-6 space-y-6">
        {steps.map((step, sIdx) => (
          <div
            key={step.number}
            className={`rounded-xl border p-5 sm:p-6 ${
              step.critical
                ? "border-[#e56f2d]/40 bg-[#fff9f5] shadow-sm"
                : "border-[#dfe9ee] bg-[#f8fbfa]"
            }`}
          >
            {/* ステップ見出し */}
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#078c95] text-sm font-black text-white">
                {step.number}
              </span>
              <div>
                {step.subtitle && (
                  <span className="text-[11px] font-bold text-[#078c95]">
                    {step.subtitle}
                  </span>
                )}
                <h4 className="text-sm font-black text-[#14243a] sm:text-base">
                  {step.title}
                </h4>
              </div>
            </div>

            {/* 概要 */}
            <p className="mt-3 text-xs leading-relaxed text-[#506477] sm:text-sm">
              {step.summary}
            </p>

            {/* 実務ポイント */}
            {step.points && step.points.length > 0 && (
              <div className="mt-3 space-y-1.5 rounded-lg border border-[#dfe9ee] bg-white p-3 text-xs">
                <span className="text-[10px] font-black text-[#14243a] block">
                  📌 実務上の重要ポイント
                </span>
                <ul className="space-y-1 text-[11px] text-[#506477]">
                  {step.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-1.5">
                      <span className="font-bold text-[#078c95]">・</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 補足情報（費用・税影響） */}
            {step.note && (
              <div className="mt-3 rounded-lg border border-[#e56f2d]/30 bg-[#fff9f5] p-2.5 text-xs">
                <span className="text-xs font-bold text-[#708696]">💡 </span>
                <span className="font-bold text-[#e56f2d]">{step.note}</span>
              </div>
            )}

            {/* 警告 */}
            {step.warning && (
              <div className="mt-3 rounded-lg border border-[#e56f2d]/30 bg-[#fdf2f2] p-2.5 text-xs text-[#d9483b]">
                <strong>⚠ 注意:</strong> {step.warning}
              </div>
            )}

            {/* チェックリスト */}
            {step.checklist && step.checklist.length > 0 && (
              <div className="mt-4 border-t border-[#dfe9ee] pt-3">
                <span className="text-[10px] font-bold text-[#708696] block mb-2">
                  実務チェックリスト（クリックで確認完了）
                </span>
                <div className="space-y-1.5">
                  {step.checklist.map((item, cIdx) => {
                    const checkId = `${step.number}-${sIdx}-${cIdx}`;
                    const isDone = !!checkedItems[checkId];

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => toggleCheck(checkId)}
                        className={`flex w-full min-h-11 items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                          isDone
                            ? "border-[#078c95] bg-[#f0f7f7] text-[#078c95] font-bold"
                            : "border-[#dfe9ee] bg-white text-[#14243a] hover:bg-[#fbfaf7]"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                            isDone
                              ? "border-[#078c95] bg-[#078c95] text-white"
                              : "border-[#dfe9ee] bg-white text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span className={isDone ? "line-through opacity-80" : ""}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 末尾アペンディクス（書類一覧等） */}
      {appendix && (
        <div className="mt-6 rounded-2xl border border-[#bbd8dc] bg-[#f0f7f7] p-5 text-xs text-[#506477] sm:p-6 sm:text-sm">
          <p className="font-bold text-[#0a7079] text-sm sm:text-base">
            📋 {appendix.title}
          </p>
          <ul className="mt-3.5 list-inside list-disc space-y-2 leading-relaxed text-[#14243a]">
            {appendix.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
