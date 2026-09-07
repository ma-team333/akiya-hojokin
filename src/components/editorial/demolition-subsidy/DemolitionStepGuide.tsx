import { StepGuide } from "../shared/StepGuide";
import { DEMOLITION_STEPS, DEMOLITION_STEPS_APPENDIX } from "./article-data";

export { DEMOLITION_STEPS, DEMOLITION_STEPS_APPENDIX };

export function DemolitionStepGuide() {
  return (
    <StepGuide
      sectionId="demolition-step-guide"
      ariaLabel="空き家解体補助金の申請から受給までの4ステップ手順"
      badgeText="実務フロー"
      badgeNote="事前申請から完了報告・受給まで"
      heading="解体補助金を確実に受給する「4ステップ申請フロー」"
      lead="着工前の事前調査から交付決定、工事代金の立替払い、実績報告による補助金受取までの手続きと必要書類を整理しました。"
      steps={DEMOLITION_STEPS}
      appendix={DEMOLITION_STEPS_APPENDIX}
    />
  );
}
