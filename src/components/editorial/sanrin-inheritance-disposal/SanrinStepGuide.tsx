import { StepGuide } from "../shared/StepGuide";
import { SANRIN_STEPS, SANRIN_STEPS_APPENDIX } from "./article-data";

export function SanrinStepGuide() {
  return (
    <StepGuide
      sectionId="sanrin-step-guide"
      ariaLabel="山林相続後の調査・処分4ステップ手順ガイド"
      badgeText="実務フロー"
      badgeNote="届出から処分・確定申告まで"
      heading="山林の相続・調査から売却・処分完了までの「4ステップ手順」"
      lead="森林法に基づく90日以内の届出から、森林組合への現況調査、売却・国庫帰属のルート選定、税務申告までの実務手順を整理しました。"
      steps={SANRIN_STEPS}
      appendix={SANRIN_STEPS_APPENDIX}
    />
  );
}
