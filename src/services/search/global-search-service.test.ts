import { describe, expect, it } from 'vitest';

import { globalSearchService } from './global-search-service';

describe('globalSearchService', () => {
  it('returns default section suggestions when query is empty', async () => {
    const results = await globalSearchService.search('');

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(6);
    expect(results.every((result) => result.kind === 'section')).toBe(true);
  });

  it('returns deep-linked section results when a query exists', async () => {
    const results = await globalSearchService.search('tableau');
    const dashboardSection = results.find((result) => result.id === 'section-dashboard');

    expect(dashboardSection).toBeDefined();
    expect(dashboardSection?.route).toContain('/?');
    expect(dashboardSection?.route).toContain('search=tableau');
  });

  it('includes business entity results and caps list length', async () => {
    const results = await globalSearchService.search('emma');

    expect(results.length).toBeLessThanOrEqual(8);
    expect(results.some((result) => result.kind === 'mail' || result.kind === 'task')).toBe(true);
  });
});
