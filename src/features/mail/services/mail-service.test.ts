import { describe, expect, it } from 'vitest';

import { mailService } from './mail-service';

describe('mailService.search', () => {
  it('returns deep-linked routes with folder and normalized search query', async () => {
    const results = await mailService.search('  Emma  ');

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.route).toContain('/mail?');
    expect(results[0]?.route).toContain('folder=');
    expect(results[0]?.route).toContain('search=emma');
  });

  it('returns empty results when query is blank', async () => {
    const results = await mailService.search('   ');

    expect(results).toEqual([]);
  });
});
