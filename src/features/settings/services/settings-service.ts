import type { SettingsApiModel } from '@/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let settingsState: SettingsApiModel = {
  theme: 'system',
  notificationsEnabled: true,
};

export const settingsService = {
  async get() {
    await wait(140);
    return settingsState;
  },
  async save(nextSettings: SettingsApiModel) {
    await wait(160);
    settingsState = nextSettings;
    return settingsState;
  },
};
