import { describe, expect, it } from 'vitest';

import { orderService } from './order-service';

describe('orderService', () => {
  it('getOverview retourne les KPI, url et collaborateurs attendus', async () => {
    const result = await orderService.getOverview();

    expect(result.kpis).toHaveLength(4);
    expect(result.documentUrl).toContain('order-report');
    expect(result.collaborators.length).toBeGreaterThan(0);
  });

  it('search retourne des resultats limites et deep-linkes', async () => {
    const results = await orderService.search('john');

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
    expect(results[0]?.route).toBe('/order');
    expect(results[0]?.kind).toBe('order');
  });

  it('search normalise la casse et les espaces', async () => {
    const results = await orderService.search('  JANE  ');

    expect(results[0]?.label).toBe('Jane Smith');
    expect(results[0]?.description).toContain('Editeur');
  });

  it('search retourne un tableau vide si la requete est vide', async () => {
    const results = await orderService.search('   ');

    expect(results).toEqual([]);
  });
});
