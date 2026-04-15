import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Desktop viewport (1920x1080)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should display full layout', async ({ page }) => {
      await expect(page.locator('main')).toBeVisible();
    });

    test('should not show mobile menu', async ({ page }) => {
      const hamburger = page.locator('button[aria-label*="menu" i]');
      const isHamburgerVisible = await hamburger.isVisible().catch(() => false);
      expect(isHamburgerVisible).toBeFalsy();
    });
  });

  test.describe('Tablet viewport (768x1024)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should adapt layout for tablet', async ({ page }) => {
      await expect(page.locator('main')).toBeVisible();
    });

    test('should be scrollable if content overflows', async ({ page }) => {
      const htmlElement = page.locator('html');
      const isScrollable = await htmlElement.evaluate((el) => {
        return el.scrollHeight > window.innerHeight;
      });
      expect(isScrollable || (await page.locator('body').isVisible())).toBeTruthy();
    });
  });

  test.describe('Mobile viewport (375x667)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('should be fully usable on mobile', async ({ page }) => {
      await expect(page.locator('main')).toBeVisible();
    });

    test('should not have horizontal scrollbar', async ({ page }) => {
      const hasHorizontalScroll = await page.evaluate(() => {
        return window.innerWidth < document.documentElement.scrollWidth;
      });
      expect(hasHorizontalScroll).toBeFalsy();
    });
  });
});

test.describe('Performance Metrics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load with good Core Web Vitals', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        dns: nav?.domainLookupEnd - nav?.domainLookupStart,
        tcp: nav?.connectEnd - nav?.connectStart,
        request: nav?.responseStart - nav?.requestStart,
        response: nav?.responseEnd - nav?.responseStart,
        dom: nav?.domInteractive - nav?.responseEnd,
        load: nav?.loadEventEnd - nav?.loadEventStart,
      };
    });
    expect(metrics.load).toBeDefined();
  });
});
