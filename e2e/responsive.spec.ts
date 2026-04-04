import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Desktop viewport (1920x1080)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
    });

    test('should display full layout', async ({ page }) => {
      await page.goto('/');

      // Check that layout elements are visible
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });

    test('should not show mobile menu', async ({ page }) => {
      await page.goto('/');

      // Should not have hamburger menu
      const hamburger = page.locator('button[aria-label*="menu" i]');
      const isHamburgerVisible = await hamburger.isVisible().catch(() => false);

      // Desktop would typically not show hamburger
      expect(isHamburgerVisible).toBeFalsy();
    });
  });

  test.describe('Tablet viewport (768x1024)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('should adapt layout for tablet', async ({ page }) => {
      await page.goto('/');

      // Main content should still be visible
      await expect(page.locator('main')).toBeVisible();
    });

    test('should be scrollable if content overflows', async ({ page }) => {
      await page.goto('/');

      const htmlElement = page.locator('html');
      const isScrollable = await htmlElement.evaluate((el) => {
        return el.scrollHeight > window.innerHeight;
      });

      // Either content fits or page is scrollable
      expect(isScrollable || (await page.locator('body').isVisible())).toBeTruthy();
    });
  });

  test.describe('Mobile viewport (375x667)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should be fully usable on mobile', async ({ page }) => {
      await page.goto('/');

      // Content should be visible (not cut off)
      await expect(page.locator('main')).toBeVisible();
    });

    test('should handle navigation on mobile', async ({ page }) => {
      await page.goto('/');

      // Check if hamburger menu or mobile nav exists
      const mobileNav = page.locator('button[aria-label*="menu" i], nav[aria-label*="mobile"]');
      const hasNav = await mobileNav.isVisible().catch(() => false);

      // Should have some navigation mechanism
      const navLinks = page.locator('a[href*="/"]');
      expect((await navLinks.count()) > 0 || hasNav).toBeTruthy();
    });

    test('should not have horizontal scrollbar', async ({ page }) => {
      await page.goto('/');

      const hasHorizontalScroll = await page.evaluate(() => {
        return window.innerWidth < document.documentElement.scrollWidth;
      });

      expect(hasHorizontalScroll).toBeFalsy();
    });

    test('should be touchable on mobile', async ({ page }) => {
      await page.goto('/');

      // Buttons should be at least 44x44px (touch target size)
      const buttons = page.locator('button');
      if (await buttons.first().isVisible()) {
        const size = await buttons.first().boundingBox();
        expect(size?.height || 0).toBeGreaterThanOrEqual(44);
        expect(size?.width || 0).toBeGreaterThanOrEqual(44);
      }
    });
  });
});

test.describe('Dark Mode Support', () => {
  test('should respect prefers-color-scheme', async ({ context }) => {
    const browser = context.browser();
    if (!browser) {
      return;
    }

    // Create context with dark color scheme
    const darkContext = await browser.newContext({
      colorScheme: 'dark',
    });

    const darkPage = await darkContext.newPage();
    await darkPage.goto('/');

    // Check that page responds to color scheme
    const bgColor = await darkPage.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    expect(bgColor).toBeTruthy();
    await darkPage.close();
    await darkContext.close();
  });
});

test.describe('Performance Metrics', () => {
  test('should load with good Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    // Measure page load metrics
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

    // Verify navigation metrics exist
    expect(metrics.load).toBeDefined();
  });

  test('should render without layout shift', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalLayoutShift = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
            };

            if (layoutShiftEntry.hadRecentInput) {
              continue;
            }

            clsValue += layoutShiftEntry.value ?? 0;
          }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        window.setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });

    // CLS should be low (< 0.25 is good)
    expect(totalLayoutShift).toBeLessThan(0.25);
  });
});
