import { describe, expect, it } from 'vitest';

import { buildTaskSearchParams, DEFAULT_TASK_FILTERS, parseTaskFilters } from './url-filters';

describe('task url filters', () => {
  it('parses valid task params', () => {
    const params = new URLSearchParams('status=Pending&search=api');

    expect(parseTaskFilters(params)).toEqual({
      status: 'Pending',
      search: 'api',
    });
  });

  it('falls back to defaults for invalid status', () => {
    const params = new URLSearchParams('status=Invalid');

    expect(parseTaskFilters(params)).toEqual(DEFAULT_TASK_FILTERS);
  });

  it('builds canonical params without empty search', () => {
    const params = buildTaskSearchParams({
      status: 'all',
      search: '',
    });

    expect(params.toString()).toBe('status=all');
  });
});
