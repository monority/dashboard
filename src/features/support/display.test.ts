import { describe, expect, it } from 'vitest';

import {
  formatSupportDate,
  SUPPORT_COPY,
  SUPPORT_STATUS_LABELS,
  SUPPORT_TYPE_LABELS,
} from './display';

describe('support display', () => {
  it('provides french labels for support types and statuses', () => {
    expect(SUPPORT_TYPE_LABELS.technical).toBe('Technique');
    expect(SUPPORT_TYPE_LABELS.billing).toBe('Facturation');

    expect(SUPPORT_STATUS_LABELS.Resolved).toBe('Resolue');
    expect(SUPPORT_STATUS_LABELS.Answered).toBe('Repondue');
  });

  it('provides copy helpers and formats french date', () => {
    expect(SUPPORT_COPY.historyItems(3)).toBe('3 element(s)');
    expect(formatSupportDate('2026-04-03T09:10:00Z')).toContain('2026');
  });
});
