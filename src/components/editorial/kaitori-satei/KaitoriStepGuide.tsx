import { StepGuide } from "../shared/StepGuide";
import { KAITORI_STEPS, KAITORI_STEPS_APPENDIX } from "./article-data";

/** ステップの表示は article-data.ts の KAITORI_STEPS が単一ソース。 */
export function KaitoriStepGuide() {
  return (
    <StepGuide
      sectionId="kaitori-step-guide"
      ariaLabel="空き家買取査定から売却完了までの手順ガイド"
      badgeText="実務フロー"
      badgeNote="相続登記義務化対応"
      heading="空き家買取 査定から引渡しまでの「6ステップ手順」"
      lead="相続登記の確認から査定依頼、契約条件の確認、決済・確定申告まで、未登記・共有名義の空き家にも対応した手順を整理しました。"
      steps={KAITORI_STEPS}
      appendix={KAITORI_STEPS_APPENDIX}
    />
  );
}
