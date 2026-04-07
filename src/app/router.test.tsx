import { describe, expect, it } from 'vitest';

import { APP_ROUTES } from '@/utils';

import { router } from './router';

describe('router', () => {
  it('definit une route racine sur /', () => {
    const dashboardRoute = router.routes.find((r) => r.path === '/');

    expect(dashboardRoute).toBeDefined();
    if (!dashboardRoute) {
      throw new Error('Route racine introuvable');
    }
    expect(dashboardRoute.path).toBe(APP_ROUTES.dashboard);
  });

  it('expose les routes enfants principales', () => {
    const dashboardRoute = router.routes.find((r) => r.path === '/');
    if (!dashboardRoute) {
      throw new Error('Route racine introuvable');
    }
    const children = dashboardRoute.children ?? [];

    const childPaths = children.map((route) => route.path ?? 'index');

    expect(childPaths).toContain('index');
    expect(childPaths).toContain(APP_ROUTES.admin.slice(1));
    expect(childPaths).toContain(APP_ROUTES.fetchUrls.slice(1));
    expect(childPaths).toContain(APP_ROUTES.mail.slice(1));
    expect(childPaths).toContain(APP_ROUTES.order.slice(1));
    expect(childPaths).toContain(APP_ROUTES.task.slice(1));
    expect(childPaths).toContain(APP_ROUTES.reviews.slice(1));
    expect(childPaths).toContain(APP_ROUTES.support.slice(1));
    expect(childPaths).toContain(APP_ROUTES.settings.slice(1));
  });
});
