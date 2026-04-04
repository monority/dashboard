import { describe, expect, it } from 'vitest';

import { toApiError } from './errors';

describe('toApiError', () => {
  it('transforme une AxiosError en ApiError detaillee', () => {
    const result = toApiError({
      isAxiosError: true,
      response: {
        status: 403,
        data: {
          message: 'Interdit',
          code: 'FORBIDDEN',
          details: { role: ['missing'] },
        },
      },
    });

    expect(result).toEqual({
      message: 'Interdit',
      code: 'FORBIDDEN',
      status: 403,
      details: { role: ['missing'] },
    });
  });

  it('utilise les valeurs de repli reseau pour une AxiosError incomplete', () => {
    const result = toApiError({
      isAxiosError: true,
      response: undefined,
    });

    expect(result).toEqual({
      message: 'Une erreur reseau est survenue.',
      code: 'NETWORK_ERROR',
      status: 500,
      details: undefined,
    });
  });

  it('transforme une Error standard en erreur inconnue typée', () => {
    const result = toApiError(new Error('Boom'));

    expect(result).toEqual({
      message: 'Boom',
      code: 'UNKNOWN_ERROR',
      status: 500,
    });
  });
});
