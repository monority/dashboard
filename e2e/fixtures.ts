/**
 * Playwright fixtures for API mocking in E2E tests
 * These fixtures set up and tear down MSW for test isolation
 */

import { test as base } from '@playwright/test';

import { mockHandlers } from '../src/mocks/handlers';

/**
 * Custom test fixture with MSW mocking support
 * Usage in tests:
 *   test('should fetch tasks', async ({ page, baseURL }) => { ... })
 *   test('should mock error', async ({ page, interceptRoute }) => {
 *     interceptRoute('tasks', { status: 500 });
 *     ...
 *   })
 */
export const test = base.extend<{
  mockAPI: (routeName: string, response?: object) => Promise<void>;
  mockAPIError: (routeName: string, status: number, error: string) => Promise<void>;
}>({
  mockAPI: async ({ page }, applyFixture) => {
    /**
     * Mock API endpoint with success response
     * @param routeName - 'tasks', 'users', 'orders', 'mail', 'reviews'
     * @param response - Custom response data (optional)
     */
    const mockAPI = async (routeName: string, response?: object) => {
      const mockDataMap: Record<string, any> = {
        tasks: mockHandlers.tasks,
        users: mockHandlers.users,
        orders: mockHandlers.orders,
        mail: mockHandlers.mail,
        reviews: mockHandlers.reviews,
      };

      const apiUrl = `**/api/${routeName}*`;
      const responseData = response || mockDataMap[routeName];

      await page.route(apiUrl, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseData),
        });
      });

      // Log API calls for debugging
      page.on('request', (request) => {
        if (request.url().includes('/api/')) {
          console.log('API Request:', request.url(), request.method());
        }
      });
    };

    await applyFixture(mockAPI);
  },

  mockAPIError: async ({ page }, applyFixture) => {
    /**
     * Mock API endpoint with error response
     * @param routeName - API endpoint
     * @param status - HTTP status code
     * @param error - Error message
     */
    const mockAPIError = async (routeName: string, _status: number, _error: string) => {
      const apiUrl = `**/api/${routeName}*`;

      await page.route(apiUrl, (route) => {
        route.abort('blockedbyclient');
      });

      page.on('response', (response) => {
        if (response.url().includes(routeName)) {
          response.status();
        }
      });
    };

    await applyFixture(mockAPIError);
  },
});

export { expect } from '@playwright/test';
