import { describe, expect, it } from 'vitest';

import { reviewsService } from './reviews-service';

describe('reviewsService', () => {
  it('getReviewsData retourne un resume et des items', async () => {
    const result = await reviewsService.getReviewsData();

    expect(result.summary.totalReviews).toBe(5000);
    expect(result.summary.averageRating).toBe(4.5);
    expect(result.items.length).toBeGreaterThan(0);
  });

  it('search retourne des resultats limites et deep-linkes', async () => {
    const results = await reviewsService.search('support');

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
    expect(results[0]?.route).toBe('/reviews');
    expect(results[0]?.kind).toBe('review');
  });

  it('search normalise la requete et retrouve un client par nom', async () => {
    const results = await reviewsService.search('  jean  ');

    expect(results[0]?.label).toBe('Jean Martin');
    expect(results[0]?.description).toContain('4/5');
  });

  it('search retourne vide quand la requete est blanche', async () => {
    const results = await reviewsService.search('   ');

    expect(results).toEqual([]);
  });
});
