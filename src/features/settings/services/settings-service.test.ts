import { describe, expect, it } from 'vitest';

import { settingsService } from './settings-service';

describe('settingsService', () => {
  it('retourne les parametres courants', async () => {
    const result = await settingsService.get();

    expect(result).toEqual({
      theme: 'system',
      notificationsEnabled: true,
    });
  });

  it('save persiste et retourne les nouveaux parametres', async () => {
    const saved = await settingsService.save({
      theme: 'dark',
      notificationsEnabled: false,
    });

    expect(saved).toEqual({
      theme: 'dark',
      notificationsEnabled: false,
    });

    const current = await settingsService.get();
    expect(current).toEqual(saved);

    await settingsService.save({
      theme: 'system',
      notificationsEnabled: true,
    });
  });
});
