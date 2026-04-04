import { describe, expect, it } from 'vitest';

import { SETTINGS_COPY } from './display';

describe('settings display', () => {
  it('provides french labels for settings page and status messages', () => {
    expect(SETTINGS_COPY.pageTitle).toBe('Parametres');
    expect(SETTINGS_COPY.savedTitle).toBe('Parametres enregistres');
    expect(SETTINGS_COPY.enableNotifications).toBe('Activer les notifications');
    expect(SETTINGS_COPY.save).toBe('Enregistrer les modifications');
  });

  it('provides french labels for theme options', () => {
    expect(SETTINGS_COPY.themeOptions.light).toBe('Clair');
    expect(SETTINGS_COPY.themeOptions.dark).toBe('Sombre');
    expect(SETTINGS_COPY.themeOptions.system).toBe('Systeme');
  });
});
