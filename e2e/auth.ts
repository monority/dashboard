import { test as base } from '@playwright/test';

export type TestUser = {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'manager' | 'viewer';
  permissions: Array<{ code: string; description: string }>;
};

const TEST_USER: TestUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  fullName: 'Test User',
  role: 'admin',
  permissions: [
    { code: 'users.read', description: 'Read users' },
    { code: 'users.write', description: 'Write users' },
    { code: 'tasks.read', description: 'Read tasks' },
    { code: 'tasks.write', description: 'Write tasks' },
  ],
};

export const test = base.extend<{
  authenticatedUser: (role?: TestUser['role']) => Promise<void>;
}>({
  authenticatedUser: async ({ page }, use) => {
    const authenticatedUser = async (role: TestUser['role'] = 'admin') => {
      const user: TestUser = { ...TEST_USER, role };

      await page.addInitScript((userData: TestUser) => {
        (window as Window & { __authState__?: TestUser }).__authState__ = userData;
      }, user);

      await page.goto('/');

      await page.waitForURL((url) => !url.pathname.includes('/login'));
    };

    await use(authenticatedUser);
  },
});

export { expect } from '@playwright/test';
