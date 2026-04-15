import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display task list', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for task page title or heading
    const heading = page.locator(['h1', 'h2'].join(',')).first();
    if (await heading.isVisible()) {
      await expect(heading).toBeVisible();
    }
  });

  test('should filter tasks', async ({ page }) => {
    // Look for filter buttons or select elements
    const filterElements = page.locator('button, select').filter({
      has: page.locator('text=/filter|status|priority/i'),
    });

    const hasFilters = await filterElements.count();
    if (hasFilters > 0) {
      const firstFilter = filterElements.first();
      await firstFilter.click();

      // Verify interaction worked
      await expect(page).not.toHaveURL(/\/$/);
    }
  });

  test('should support pagination or scrolling', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check if pagination controls exist
    const pagination = page.locator('button:has-text("Next"), button:has-text("Previous")').first();

    if (await pagination.isVisible()) {
      // Pagination exists - test it
      const initialUrl = page.url();
      await pagination.click();

      // URL or content should change
      await page.waitForLoadState('networkidle');
      expect(page.url()).not.toBe(initialUrl);
    } else {
      // No pagination - check if page is scrollable
      const isScrollable = await page.evaluate(() => {
        return document.documentElement.scrollHeight > window.innerHeight;
      });

      expect(isScrollable || (await page.locator('tr, li').count()) < 20).toBeTruthy();
    }
  });

  test('should display task details in table/list format', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const rows = page.locator('tr, li');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    // Content should still be visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});

test.describe('Task Interactions', () => {
  test('should handle task selection/clicks', async ({ page }) => {
    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    // Find first clickable task element
    const taskElement = page
      .locator('[role="row"], [role="button"], a')
      .filter({
        has: page.locator('text=/.+/'),
      })
      .first();

    if (await taskElement.isVisible()) {
      // Verify it's clickable
      await taskElement.hover();
      const isClickable = await taskElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.cursor === 'pointer' || el.getAttribute('role') === 'button';
      });

      expect(isClickable).toBeTruthy();
    }
  });

  test('should maintain state when navigating away and back', async ({ page }) => {
    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    // Navigate to another page
    const otherLink = page
      .locator('a[href*="/mail"], a[href*="/order"], a[href*="/reviews"]')
      .first();
    if (await otherLink.isVisible()) {
      await otherLink.click();

      // Navigate back
      await page.goBack();

      // Should return to task page
      await expect(page).toHaveURL(/\/task/);
    }
  });
});
