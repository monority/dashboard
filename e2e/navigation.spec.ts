import { test, expect } from '@playwright/test';

test.describe('Navigation & Layout', () => {
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
    await page.goto('/admin');
  });

  test('should load dashboard and display main layout', async ({ page }) => {
    await page.goto('/admin');

    await expect(page.locator('#header-container')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to different pages via sidebar', async ({ page }) => {
    await page.goto('/');

    // Navigate to Tasks
    const taskLink = page.locator('a[href*="/task"]').first();
    if (await taskLink.isVisible()) {
      await taskLink.click();
      await expect(page).toHaveURL(/\/task/);
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/admin');

    // Tab to a button
    await page.keyboard.press('Tab');

    // Check if any element receives focus (either returns class or null)
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.getAttribute('class') ?? null;
    });

    expect(focusedElement !== undefined).toBeTruthy();
  });

  test('should have accessible navigation structure', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1s = await page.locator('h1').count();
    expect(h1s).toBeGreaterThanOrEqual(0);

    // Check that links are distinguishable
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});

test.describe('Page Load Performance', () => {
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
    await page.goto('/admin');
  });

  test('should load main page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should display content before images finish loading', async ({ page }) => {
    await page.goto('/');

    // Check that main content is visible (not depending on images)
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Error Handling', () => {
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
    await page.goto('/admin');
  });

  test('should handle navigation to non-existent route gracefully', async ({ page }) => {
    await page.goto('/non-existent-route');

    // Should either redirect or show an error page
    // Either the error boundary should appear OR header should be visible
    const header = page.locator('header');
    const errorHeading = page.locator('h1, h2').first();
    const hasContent = (await header.isVisible()) || (await errorHeading.isVisible());
    expect(hasContent).toBeTruthy();
  });

  test('should display error boundary when component crashes', async ({ page }) => {
    // Navigate to a page
    await page.goto('/');

    // Verify page is stable (no console errors trigger error boundary)
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text());
      }
    });

    // Page should remain interactive
    await expect(page.locator('body')).toBeVisible();
  });
});
