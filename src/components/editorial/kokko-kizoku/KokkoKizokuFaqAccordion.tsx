import { FaqAccordion } from "../shared/FaqAccordion";
import { KOKKO_KIZOKU_FAQ_ITEMS } from "./article-data";

/** FAQのJSON-LDは buildFaqJsonLd(KOKKO_KIZOKU_FAQ_ITEMS) で生成（手書き禁止・単一ソース）。 */
export function KokkoKizokuFaqAccordion() {
  return (
    <FaqAccordion
      sectionId="kokko-kizoku-faq"
      ariaLabel="相続土地国庫帰属制度の負担金と要件 よくある質問"
      badgeText="Q&A"
      badgeNote="負担金・要件の実務疑問"
      heading="相続土地国庫帰属制度の「よくある質問（FAQ）」"
      lead="負担金の額と計算方法、審査手数料の返還、隣接土地の合算特例、建物や抵当権がある場合の扱いまで回答します。"
      items={KOKKO_KIZOKU_FAQ_ITEMS}
    />
  );
}
