import { describe, expect, it, vi } from 'vitest';

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock('@/services', () => ({
  httpClient: {
    get: getMock,
  },
}));

import { usersService } from './users-service';

describe('usersService', () => {
  it('list appelle GET /users et retourne response.data.data', async () => {
    const payload = [{ id: 'u1', firstName: 'Alice' }];
    getMock.mockResolvedValue({
      data: {
        data: payload,
      },
    });

    const result = await usersService.list();

    expect(getMock).toHaveBeenCalledWith('/users');
    expect(result).toEqual(payload);
  });
});
