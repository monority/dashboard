import { describe, expect, it } from 'vitest';

import { APP_ROUTES, QUERY_KEYS, UI_THEME } from './constants';

describe('constants', () => {
  it('expose les routes applicatives attendues', () => {
    expect(APP_ROUTES).toEqual({
      dashboard: '/',
      admin: '/admin',
      login: '/login',
      fetchUrls: '/fetch-urls',
      mail: '/mail',
      order: '/order',
      task: '/task',
      reviews: '/reviews',
      support: '/support',
      settings: '/settings',
    });
  });

  it('construit les query keys dynamiques correctement', () => {
    expect(QUERY_KEYS.dashboardOverview('30d', 'Support', 'ticket')).toEqual([
      'dashboard',
      'overview',
      '30d',
      'Support',
      'ticket',
    ]);
    expect(QUERY_KEYS.mailThreads('Inbox', 'urgent')).toEqual([
      'mail',
      'threads',
      'Inbox',
      'urgent',
    ]);
    expect(QUERY_KEYS.tasks('Done', 'release')).toEqual(['tasks', 'Done', 'release']);
  });

  it('expose les themes UI autorises', () => {
    expect(UI_THEME).toEqual({
      light: 'light',
      dark: 'dark',
      system: 'system',
    });
  });
});
