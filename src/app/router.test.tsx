import { describe, expect, it } from 'vitest';

import { APP_ROUTES } from '@/utils';

import { router } from './router';

describe('router', () => {
  it('definit une route racine sur /', () => {
    const rootRoute = router.routes[0];

    expect(rootRoute).toBeDefined();
    if (!rootRoute) {
      throw new Error('Route racine introuvable');
    }
    expect(rootRoute.path).toBe(APP_ROUTES.dashboard);
  });

  it('expose les routes enfants principales', () => {
    const rootRoute = router.routes[0];
    if (!rootRoute) {
      throw new Error('Route racine introuvable');
    }
    const children = rootRoute.children ?? [];

    const childPaths = children.map((route) => route.path ?? 'index');

    expect(childPaths).toContain('index');
    expect(childPaths).toContain(APP_ROUTES.mail.slice(1));
    expect(childPaths).toContain(APP_ROUTES.order.slice(1));
    expect(childPaths).toContain(APP_ROUTES.task.slice(1));
    expect(childPaths).toContain(APP_ROUTES.reviews.slice(1));
    expect(childPaths).toContain(APP_ROUTES.support.slice(1));
    expect(childPaths).toContain(APP_ROUTES.settings.slice(1));
  });
});
