import { describe, expect, it, vi } from 'vitest';

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock('@/services', () => ({
  httpClient: {
    get: getMock,
  },
}));

import { billingService } from './billing-service';

describe('billingService', () => {
  it('list appelle GET /billing et retourne response.data.data', async () => {
    const payload = [{ id: 'b1', amount: 1200 }];
    getMock.mockResolvedValue({
      data: {
        data: payload,
      },
    });

    const result = await billingService.list();

    expect(getMock).toHaveBeenCalledWith('/billing');
    expect(result).toEqual(payload);
  });
});
