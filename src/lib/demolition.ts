export const DEMOLITION_V0 = [
  { structure: '木造', minPerTsubo: 30000, maxPerTsubo: 50000 },
  { structure: '軽量鉄骨', minPerTsubo: 35000, maxPerTsubo: 60000 },
  { structure: '重量鉄骨', minPerTsubo: 45000, maxPerTsubo: 70000 },
  { structure: 'RC', minPerTsubo: 60000, maxPerTsubo: 100000 }
] as const;

export function estimateDemolition(structure: string, tsubo: number) {
  const band = DEMOLITION_V0.find((entry) => entry.structure === structure);
  if (!band || !Number.isFinite(tsubo) || tsubo <= 0) return null;
  return {
    min: band.minPerTsubo * tsubo,
    max: band.maxPerTsubo * tsubo,
    disclaimer: 'v0合成目安。正式な見積もりではありません。'
  };
}
