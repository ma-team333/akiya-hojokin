import { StepGuide } from "../shared/StepGuide";
import {
  BROKERAGE_BUYOUT_STEPS,
  BROKERAGE_BUYOUT_STEPS_APPENDIX,
} from "./article-data";

export function BrokerageBuyoutStepGuide() {
  return (
    <StepGuide
      sectionId="brokerage-buyout-steps"
      ariaLabel="仲介・買取の失敗しない売却手順ガイド"
      badgeText="実務フロー"
      badgeNote="査定から決済・申告まで"
      heading="損をしない売却手法選び「4ステップ実行手順」"
      lead="机上査定での相場把握から実質手取り試算、条件決定、売買契約・引渡しまでの具体手順をまとめました。"
      steps={BROKERAGE_BUYOUT_STEPS}
      appendix={BROKERAGE_BUYOUT_STEPS_APPENDIX}
    />
  );
}
