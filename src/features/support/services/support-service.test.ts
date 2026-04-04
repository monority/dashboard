import { describe, expect, it } from 'vitest';

import { supportService } from './support-service';

describe('supportService', () => {
  it('getDashboardData retourne stats, faq et historique', async () => {
    const result = await supportService.getDashboardData();

    expect(result.stats.openTickets).toBe(204);
    expect(result.faq.length).toBeGreaterThan(0);
    expect(result.history.length).toBeGreaterThan(0);
  });

  it('search retourne des resultats FAQ limites et deep-linkes', async () => {
    const results = await supportService.search('facture');

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
    expect(results[0]?.route).toBe('/support');
    expect(results[0]?.kind).toBe('support');
  });

  it('search retrouve l historique via type ou statut', async () => {
    const results = await supportService.search('resolved');

    expect(results.some((item) => item.id.includes('support-history-'))).toBe(true);
  });

  it('search retourne vide si la requete est blanche', async () => {
    const results = await supportService.search('   ');

    expect(results).toEqual([]);
  });
});
