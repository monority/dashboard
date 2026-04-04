import { describe, expect, it } from 'vitest';

import { formatReviewsDate, REVIEWS_COPY } from './display';

describe('reviews display', () => {
  it('provides french labels and helper text', () => {
    expect(REVIEWS_COPY.pageTitle).toBe('Avis');
    expect(REVIEWS_COPY.filterLabel).toBe('Filtrer les avis');
    expect(REVIEWS_COPY.spend('EUR 120')).toBe('Depenses: EUR 120');
    expect(REVIEWS_COPY.reviews(4)).toBe('Avis: 4');
    expect(REVIEWS_COPY.starsAria(5)).toBe('5 etoiles');
  });

  it('formats review date in french locale style', () => {
    expect(formatReviewsDate('2026-04-03T09:10:00Z')).toContain('2026');
  });
});
