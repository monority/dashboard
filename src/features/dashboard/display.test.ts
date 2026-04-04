import { describe, expect, it } from 'vitest';

import { DASHBOARD_COPY, formatDashboardDateTime } from './display';

describe('dashboard display', () => {
  it('builds trend badge text in french', () => {
    expect(DASHBOARD_COPY.trendBadge(12.34)).toBe('12.3% vs periode precedente');
  });

  it('formats dashboard date time and handles invalid values', () => {
    expect(formatDashboardDateTime('2026-04-03T09:10:00Z')).toContain('2026');
    expect(formatDashboardDateTime('not-a-date')).toBe('-');
  });
});
