import { StepGuide } from "../shared/StepGuide";
import { MAINTENANCE_STEPS, MAINTENANCE_STEPS_APPENDIX } from "./article-data";

/** 手順ガイド。ステップ本文は article-data.ts（非client）の単一ソース。 */
export function MaintenanceStepGuide() {
  return (
    <StepGuide
      sectionId="maintenance-step-guide"
      ariaLabel="空き家の管理・処分の手順ガイド"
      badgeText="実務フロー"
      badgeNote="現状確認から出口の決定まで"
      heading="空き家を管理不全にしない「5ステップ手順」"
      lead="現状の記録から市町村の制度確認、管理方法の決定、出口（維持・活用・売却）の判断までの手順と、自治体補助金の申請フローを整理しました。"
      steps={MAINTENANCE_STEPS}
      appendix={MAINTENANCE_STEPS_APPENDIX}
    />
  );
}
