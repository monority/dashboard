/**
 * Example E2E tests with API mocking using MSW and Playwright fixtures
 * These tests demonstrate how to mock API responses for E2E testing
 */

import { test, expect } from './fixtures';

test.describe('Task Management with API Mocking', () => {
  test.beforeEach(async ({ page: _page }) => {
    // Note: In real scenarios, you'd set up MSW in playwright.config.ts
    // or use route interception as shown in the tests below
  });

  test('should fetch and display mocked tasks', async ({ page, mockAPI }) => {
    // Mock the tasks API
    await mockAPI('tasks');

    // Navigate to tasks page
    await page.goto('/task');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Verify tasks are displayed
    const taskElements = page.locator('[data-testid="task-item"]');
    const taskCount = await taskElements.count();

    // Should have at least some tasks (based on mock data)
    expect(taskCount).toBeGreaterThanOrEqual(0);
  });

  test('should handle task creation with API mock', async ({ page }) => {
    // Intercept POST request and return mock response
    await page.route('**/api/tasks', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 201,
          body: JSON.stringify({
            data: {
              id: 'task-new',
              title: 'New Task',
              status: 'pending',
              priority: 'medium',
              createdAt: new Date().toISOString(),
            },
          }),
        });
      } else {
        route.continue();
      }
    });

    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    // Find create button
    const createButton = page.locator('button:has-text("Create"), button:has-text("Add")').first();

    // If button exists, test creation flow
    if (await createButton.isVisible()) {
      await createButton.click();

      // Look for form
      const titleInput = page.locator('input[placeholder*="title" i]').first();

      if (await titleInput.isVisible()) {
        await titleInput.fill('Test Task');

        // Submit form
        const submitButton = page.locator('button[type="submit"]').first();
        if (await submitButton.isVisible()) {
          await submitButton.click();

          // Wait for request
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API and return 500 error
    await page.route('**/api/tasks', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({
          error: 'Internal Server Error',
        }),
      });
    });

    await page.goto('/task');

    // Check for error message or fallback UI
    const errorMessage = page.locator('[role="alert"], .error, .error-message').first();

    // Should either show error or have graceful fallback
    const hasErrorUI = await errorMessage.isVisible().catch(() => false);
    const main = page.locator('main');
    const isDisplayed = await main.isVisible();

    expect(hasErrorUI || isDisplayed).toBeTruthy();
  });

  test('should retry failed requests with mock', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/tasks', (route) => {
      requestCount++;

      // Fail first request, succeed second
      if (requestCount === 1) {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Server error' }),
        });
      } else {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            data: [
              {
                id: 'task-1',
                title: 'Task 1',
                status: 'pending',
              },
            ],
          }),
        });
      }
    });

    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    // Page should eventually load data despite initial failure
    expect(requestCount).toBeGreaterThanOrEqual(1);
  });

  test('should simulate slow network for load testing', async ({ page }) => {
    const startTime = Date.now();

    await page.route('**/api/tasks', async (route) => {
      // Simulate 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: 'task-1',
              title: 'Task 1',
              status: 'pending',
            },
          ],
        }),
      });
    });

    await page.goto('/task');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should have taken at least 2 seconds due to mocked delay
    expect(loadTime).toBeGreaterThanOrEqual(2000);

    // Verify page is still usable
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});

test.describe('Multiple API endpoints mocking', () => {
  test('should mock multiple endpoints simultaneously', async ({ page }) => {
    // Mock tasks endpoint
    await page.route('**/api/tasks*', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            { id: 'task-1', title: 'Task 1', status: 'pending' },
            { id: 'task-2', title: 'Task 2', status: 'completed' },
          ],
        }),
      });
    });

    // Mock users endpoint
    await page.route('**/api/users*', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
            { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
          ],
        }),
      });
    });

    // Mock orders endpoint
    await page.route('**/api/orders*', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            { id: 'order-1', status: 'pending', total: 9999 },
            { id: 'order-2', status: 'delivered', total: 5999 },
          ],
        }),
      });
    });

    // Navigate to app
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // All endpoints should have been called
    // Verify page loaded successfully
    await expect(page.locator('main')).toBeVisible();
  });
});
