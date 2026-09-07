import { StepGuide } from "../shared/StepGuide";
import { KOKKO_KIZOKU_STEPS, KOKKO_KIZOKU_STEPS_APPENDIX } from "./article-data";

export function KokkoKizokuStepGuide() {
  return (
    <StepGuide
      sectionId="kokko-kizoku-step-guide"
      ariaLabel="相続土地国庫帰属制度の申請手順ガイド"
      badgeText="実務フロー"
      badgeNote="相談から国庫帰属まで"
      heading="相続土地国庫帰属制度を利用する「5ステップ手順」"
      lead="法務局での事前相談から負担金の納付・国庫帰属まで、相続土地国庫帰属法（令和3年法律第25号）に基づく手続きの流れを整理しました。"
      steps={KOKKO_KIZOKU_STEPS}
      appendix={KOKKO_KIZOKU_STEPS_APPENDIX}
    />
  );
}
