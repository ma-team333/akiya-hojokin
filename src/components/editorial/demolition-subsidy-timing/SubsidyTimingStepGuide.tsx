import { StepGuide } from "../shared/StepGuide";
import { TIMING_STEPS, TIMING_STEPS_APPENDIX } from "./article-data";

/**
 * 申請手順ガイド（共有StepGuideへのデータ供給のみ）。
 * ステップ本文は article-data.ts の TIMING_STEPS が単一ソース。
 */
export function SubsidyTimingStepGuide() {
  return (
    <StepGuide
      sectionId="subsidy-timing-steps"
      ariaLabel="空き家解体補助金の申請から入金までの手順"
      badgeText="実務フロー"
      badgeNote="事前相談から補助金入金・跡地届出まで"
      heading="交付申請から入金までの「6ステップ手順」"
      lead="年度当初の情報収集から、交付決定前の着手禁止、実績報告後の後払い入金、解体後の税務対応までを時系列で整理しました。"
      steps={TIMING_STEPS}
      appendix={TIMING_STEPS_APPENDIX}
    />
  );
}
