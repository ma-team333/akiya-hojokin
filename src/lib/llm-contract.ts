import type { HumanReviewStatus, PublicationStatus } from './registry';

export type StructuredSubsidyCandidate = {
  programName: string;
  target: string;
  maxAmount: string;
  requirements: string;
  originalUrl: string;
  checkedOn: string;
  humanReviewStatus: HumanReviewStatus;
  publicationStatus: PublicationStatus;
};

const requiredFields = [
  'programName',
  'target',
  'maxAmount',
  'requirements',
  'originalUrl',
  'checkedOn'
] as const;

export function validateStructuredCandidate(value: unknown): StructuredSubsidyCandidate {
  if (!value || typeof value !== 'object') throw new Error('candidate must be an object');
  const candidate = value as Record<string, unknown>;
  for (const field of requiredFields) {
    if (typeof candidate[field] !== 'string' || candidate[field].trim() === '') {
      throw new Error(`missing required field: ${field}`);
    }
  }
  if (!/^https?:\/\//.test(candidate.originalUrl as string)) {
    throw new Error('originalUrl must be an http(s) URL');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate.checkedOn as string)) {
    throw new Error('checkedOn must be YYYY-MM-DD');
  }
  if (candidate.humanReviewStatus !== 'pending' && candidate.humanReviewStatus !== 'approved' && candidate.humanReviewStatus !== 'rejected') {
    throw new Error('humanReviewStatus must be pending, approved, or rejected');
  }
  if (candidate.publicationStatus !== 'preview' && candidate.publicationStatus !== 'published' && candidate.publicationStatus !== 'held') {
    throw new Error('publicationStatus must be preview, published, or held');
  }
  return candidate as unknown as StructuredSubsidyCandidate;
}
