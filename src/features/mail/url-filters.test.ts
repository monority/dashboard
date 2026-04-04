import { describe, expect, it } from 'vitest';

import { buildMailSearchParams, DEFAULT_MAIL_FOLDER, parseMailUrlFilters } from './url-filters';

describe('mail url filters', () => {
  it('parses valid folder and search params', () => {
    const params = new URLSearchParams('folder=Archive&search=emma');

    expect(parseMailUrlFilters(params)).toEqual({
      folder: 'Archive',
      search: 'emma',
    });
  });

  it('falls back to default folder when invalid', () => {
    const params = new URLSearchParams('folder=Invalid');

    expect(parseMailUrlFilters(params)).toEqual({
      folder: DEFAULT_MAIL_FOLDER,
      search: '',
    });
  });

  it('builds canonical params without empty search', () => {
    const params = buildMailSearchParams({
      folder: 'Inbox',
      search: ' ',
    });

    expect(params.toString()).toBe('folder=Inbox');
  });
});
