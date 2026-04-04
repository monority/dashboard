import { describe, expect, it } from 'vitest';

import {
  buildDashboardSearchParams,
  DEFAULT_DASHBOARD_FILTERS,
  parseDashboardFilters,
} from './url-filters';

describe('dashboard url filters', () => {
  it('parses valid params and preserves search', () => {
    const params = new URLSearchParams('range=7d&team=Support&search=sla');

    expect(parseDashboardFilters(params)).toEqual({
      range: '7d',
      team: 'Support',
      search: 'sla',
    });
  });

  it('falls back to defaults for invalid params', () => {
    const params = new URLSearchParams('range=bad&team=unknown');

    expect(parseDashboardFilters(params)).toEqual(DEFAULT_DASHBOARD_FILTERS);
  });

  it('builds canonical search params without empty search', () => {
    const params = buildDashboardSearchParams({
      range: '30d',
      team: 'all',
      search: '   ',
    });

    expect(params.toString()).toBe('range=30d&team=all');
  });
});
