import { Page, expect } from '@playwright/test';

/**
 * E2E test utilities and helper functions
 */

/**
 * Wait for network requests to complete
 */
export async function waitForNetwork(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Check if element has accessible name
 */
export async function hasAccessibleName(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate(
    ({ selector: sel }) => {
      const element = document.querySelector(sel) as HTMLElement;
      if (!element) return false;

      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const textContent = element.textContent?.trim();

      return !!(ariaLabel || ariaLabelledBy || textContent);
    },
    { selector },
  );
}

/**
 * Get all keyboard-accessible elements
 */
export async function getKeyboardAccessibleElements(page: Page) {
  return await page.evaluate(() => {
    const focusableSelectors = [
      'a',
      'button',
      'input',
      'select',
      'textarea',
      '[tabindex]',
      '[role="button"]',
      '[role="link"]',
      '[role="menuitem"]',
    ].join(',');

    const elements = Array.from(document.querySelectorAll(focusableSelectors));

    return elements.map((el) => ({
      tag: el.tagName,
      role: el.getAttribute('role') || undefined,
      text: el.textContent?.substring(0, 50) || '',
      visible: (el as HTMLElement).offsetParent !== null,
    }));
  });
}

/**
 * Check for console errors
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * Check if page meets accessibility baseline
 */
export async function checkAccessibilityBaseline(page: Page) {
  const results = {
    hasLandmarks: false,
    hasHeadings: false,
    hasLiveRegions: false,
    imagesHaveAlt: false,
    linksHaveName: false,
  };

  results.hasLandmarks =
    (await page.locator('[role="main"], main, [role="navigation"], nav').count()) > 0;
  results.hasHeadings = (await page.locator('h1, h2, h3').count()) > 0;
  results.hasLiveRegions =
    (await page.locator('[aria-live], [role="alert"], [role="status"]').count()) > 0;

  // Check images have alt
  const images = await page.locator('img').count();
  if (images > 0) {
    const imagesWithAlt = await page.locator('img[alt]').count();
    results.imagesHaveAlt = imagesWithAlt === images || images === 0;
  } else {
    results.imagesHaveAlt = true;
  }

  // Check links have accessible names
  const links = await page.locator('a').count();
  if (links > 0) {
    const accessibleLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).filter((link) => {
        const text = link.textContent?.trim();
        const ariaLabel = link.getAttribute('aria-label');
        const title = link.getAttribute('title');
        return text || ariaLabel || title;
      }).length;
    });

    results.linksHaveName = accessibleLinks === links || links === 0;
  } else {
    results.linksHaveName = true;
  }

  return results;
}

/**
 * Measure page load time
 */
export async function measureFullPageLoad(page: Page): Promise<{
  timeToFirstByte: number;
  domContentLoaded: number;
  fullPageLoad: number;
}> {
  const metrics = await page.evaluate(() => {
    const perfData = performance.timing;
    return {
      timeToFirstByte: perfData.responseStart - perfData.navigationStart,
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      fullPageLoad: perfData.loadEventEnd - perfData.navigationStart,
    };
  });

  return metrics;
}

/**
 * Check for layout shift
 */
export async function measureLayoutShift(page: Page): Promise<number> {
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalLayoutShift = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const perfEntry = entry as LayoutShift;
          if (!perfEntry.hadRecentInput) {
            totalLayoutShift += perfEntry.value;
          }
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });

      setTimeout(() => {
        observer.disconnect();
        resolve(totalLayoutShift);
      }, 2000);

      return totalLayoutShift;
    });
  });
}

/**
 * Take screenshot with unique filename
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: filename });
  return filename;
}

/**
 * Login helper (adapt based on your auth implementation)
 */
export async function loginUser(page: Page, email: string, password: string) {
  // Navigate to login page
  await page.goto('/login');

  // Fill credentials
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);

  // Submit form
  await page.click('button[type="submit"]');

  // Wait for redirect
  await page.waitForURL((url) => !url.pathname.includes('/login'));
}

/**
 * Assert element is in viewport
 */
export async function assertInViewport(page: Page, selector: string) {
  const element = page.locator(selector).first();
  await expect(element).toBeInViewport();
}

/**
 * Get color contrast ratio (basic check)
 */
export async function checkColorContrast(page: Page): Promise<{
  hasSufficientContrast: boolean;
  issues: string[];
}> {
  const issues = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*')).slice(0, 100); // Check first 100 elements
    const problems: string[] = [];

    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const color = style.color;

      // Simple check: if both are visible colors (not transparent/white/black)
      // This is a basic heuristic, real contrast checking is complex
      if (bgColor && color && bgColor !== 'rgba(0, 0, 0, 0)') {
        if (bgColor === color) {
          problems.push(`Element has same foreground and background: ${el.tagName}`);
        }
      }
    });

    return problems;
  });

  return {
    hasSufficientContrast: issues.length === 0,
    issues,
  };
}
