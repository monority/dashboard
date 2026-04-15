import { test, expect } from '@playwright/test';

test.describe('Guest Access (Unauthenticated)', () => {
  test('should show login form on /login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('main')).toBeVisible();
  });
});
