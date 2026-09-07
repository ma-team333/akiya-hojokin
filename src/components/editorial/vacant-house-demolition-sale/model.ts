/**
 * 空き家売却シミュレーターの計算ヘルパー（純関数・React非依存）。
 * vitest 不変条件テスト `tests/vacant-house-demolition-sale-model.test.ts` の単一計算ソース。
 */

function round1(x: number): number {
  return Math.round(x * 10) / 10;
}

/**
 * 仲介手数料の法定上限（万円・税込）。
 * 宅地建物取引業法第46条第1項に基づく国土交通省告示第十五号の上限額
 * （税抜: 売買代金200万円以下の部分 5%、200万円超400万円以下の部分 4%、
 * 400万円超の部分 2%・加算定数なし）に消費税相当額（×1.10）を加えた額。
 */
export function brokerageFeeCapMan(salePriceMan: number): number {
  const p = Math.max(0, Number(salePriceMan) || 0);
  if (p <= 200) {
    return round1(p * 0.05 * 1.1);
  }
  if (p <= 400) {
    return round1((200 * 0.05 + (p - 200) * 0.04) * 1.1);
  }
  return round1((200 * 0.05 + 200 * 0.04 + (p - 400) * 0.02) * 1.1);
}
