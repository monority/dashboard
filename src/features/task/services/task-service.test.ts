import { describe, expect, it } from 'vitest';

import { taskService } from './task-service';

describe('taskService.search', () => {
  it('returns deep-linked routes with status and normalized search query', async () => {
    const results = await taskService.search('  API  ');

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.route).toContain('/task?');
    expect(results[0]?.route).toContain('status=');
    expect(results[0]?.route).toContain('search=api');
  });

  it('returns empty results when query is blank', async () => {
    const results = await taskService.search('');

    expect(results).toEqual([]);
  });
});
