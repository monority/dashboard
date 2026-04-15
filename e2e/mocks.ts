/**
 * Script to initialize MSW in Playwright E2E tests
 * Injects the MSW service worker into the browser context
 *
 * Usage: Include this script in playwright.config.ts initializeScript
 */

import path from 'path';

declare global {
  interface Window {
    msw?: {
      plugins: {
        interaction: Record<string, unknown>;
      };
    };
  }
}

/**
 * This function is injected into every page created by Playwright
 * It sets up MSW for API mocking in E2E tests
 */
import type { Page } from '@playwright/test';

export async function initializeMSW(page: Page) {
  // Path to the MSW worker script
  const workerPath = path.resolve('node_modules/msw/browser');

  // Inject and initialize MSW in the browser context
  await page.addInitScript({
    path: path.join(workerPath, 'mockServiceWorker.js'),
  });

  // Set up MSW handlers in the page context
  await page.addInitScript(() => {
    // Define mock handlers directly in browser
    // These are simplified versions - you can also load from a bundled script
    window.msw = {
      plugins: {
        interaction: {
          // Placeholder for MSW setup in browser
        },
      },
    };
  });
}

export default initializeMSW;
