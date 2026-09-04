import prefectureRows from '../../data/prefectures.json';
import subsidyRows from '../../data/subsidies.json';

export type HumanReviewStatus = 'pending' | 'approved' | 'rejected';
export type PublicationStatus = 'preview' | 'published' | 'held';

export type SubsidyRecord = {
  prefectureSlug: string;
  prefecture: string;
  citySlug: string;
  city: string;
  programName: string;
  target: string;
  maxAmount: string;
  requirements: string;
  originalUrl: string;
  checkedOn: string;
  source: 'municipal-official' | 'sumaimachi' | 'athome' | 'competitor';
  humanReviewStatus: HumanReviewStatus;
  publicationStatus: PublicationStatus;
};

export const prefectures = prefectureRows as [string, string][];
export const subsidies = subsidyRows as SubsidyRecord[];

export function getSubsidiesForPrefecture(prefectureSlug: string) {
  return subsidies.filter((record) => record.prefectureSlug === prefectureSlug);
}

export function getSubsidy(prefectureSlug: string, citySlug: string) {
  return subsidies.find(
    (record) => record.prefectureSlug === prefectureSlug && record.citySlug === citySlug
  );
}
