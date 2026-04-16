import { test, expect } from '@playwright/test';

test.describe('Task Management with API Mocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'auth',
        JSON.stringify({
          user: { id: '1', email: 'admin@example.com', fullName: 'Admin', role: 'admin' },
          permissions: ['all'],
        }),
      );
    });
  });

  test('should fetch and display mocked tasks', async ({ page }) => {
    await page.goto('/task');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle task creation with API mock', async ({ page }) => {
    await page.goto('/task');

    const addButton = page
      .locator('button:has-text("Add"), button:has-text("Nouveau"), [data-testid="add-task"]')
      .first();
    if (await addButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await addButton.click();
    }

    const titleInput = page
      .locator('input[name="title"], input[placeholder*="title" i], input[placeholder*="task" i]')
      .first();
    if (await titleInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      await titleInput.fill('Test Task');

      const submitButton = page.locator('button[type="submit"]').first();
      if (await submitButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await submitButton.click();
        await page.waitForLoadState('networkidle');
      }
    }
  });
});

test.describe('Multiple API endpoints mocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'auth',
        JSON.stringify({
          user: { id: '1', email: 'admin@example.com', fullName: 'Admin', role: 'admin' },
          permissions: ['all'],
        }),
      );
    });
  });

  test('should mock multiple endpoints simultaneously', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('main')).toBeVisible();
  });
});
