export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  publishDate: string; // ISO 8601, np. "2026-03-01"
}

export interface PlaceReviewsResult {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

export function formatRatingCount(count: number): string {
  if (count === 1) return '1 opinia';
  if (count >= 2 && count <= 4) return `${count} opinie`;
  return `${count} opinii`;
}

// Obliczana przy każdym buildzie — po każdym deployu czasy są aktualne.
export function relativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44));
  const diffYears = Math.floor(diffMonths / 12);

  if (diffMonths < 1) return 'niedawno';
  if (diffMonths === 1) return 'miesiąc temu';
  if (diffYears < 1) return diffMonths <= 4 ? `${diffMonths} miesiące temu` : `${diffMonths} miesięcy temu`;
  if (diffYears === 1) return 'rok temu';
  if (diffYears <= 4) return `${diffYears} lata temu`;
  return `${diffYears} lat temu`;
}
