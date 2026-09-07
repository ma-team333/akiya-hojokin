import { StepGuide } from "../shared/StepGuide";
import { DEMOLITION_SALE_STEPS, DEMOLITION_SALE_APPENDIX } from "./article-data";

export function DemolitionSaleStepGuide() {
  return (
    <StepGuide
      sectionId="demolition-sale-step-guide"
      ariaLabel="空き家解体・更地売却の失敗しない5ステップ手順"
      badgeText="実務ロードマップ"
      badgeNote="調査から決済・特例申告まで"
      heading="空き家売却・更地化で失敗しない「5ステップ手順」"
      lead="接道調査から両面査定、補助金申請、更地渡し特約、確定申告まで、手残りを最大化する手順をまとめました。"
      steps={DEMOLITION_SALE_STEPS}
      appendix={DEMOLITION_SALE_APPENDIX}
    />
  );
}

export { DEMOLITION_SALE_STEPS, DEMOLITION_SALE_APPENDIX };
