import { StepGuide } from "../shared/StepGuide";
import { TOKUTEI_AKIYA_STEPS } from "./article-data";

export { TOKUTEI_AKIYA_STEPS } from "./article-data";

export function TokuteiAkiyaStepGuide() {
  return (
    <StepGuide
      sectionId="tokutei-akiya-step-guide"
      ariaLabel="自治体の通知フローと固定資産税ペナルティの段階"
      badgeText="行政対応ロードマップ"
      badgeNote="自治体手続きと税制の流れ"
      heading="自治体の通知フローと固定資産税ペナルティの段階"
      lead="実態調査から指導・勧告・命令・代執行に至る手続きの流れと、各段階における税負担の変化を整理しました。"
      steps={TOKUTEI_AKIYA_STEPS}
    />
  );
}

// 別名export（規約互換用）
export { TokuteiAkiyaStepGuide as StepGuide };
