import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

/**
 * Custom render function that wraps components with necessary providers.
 * Automatically includes MemoryRouter for components that need routing.
 *
 * @param ui - React component to render
 * @param options - Render options and router configuration
 * @returns Render result with React Testing Library utilities
 *
 * @example
 * import { screen } from '@testing-library/react';
 * import { renderWithRouter } from '@/test-utils';
 *
 * const { getByRole } = renderWithRouter(<MyComponent />);
 * // Component can now use useNavigate, useLocation, etc.
 */
export const renderWithRouter = (
  ui: ReactElement,
  {
    initialEntries = ['/'],
    ...renderOptions
  }: RenderOptions & { initialEntries?: MemoryRouterProps['initialEntries'] } = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const React = require('react');
    return React.createElement(MemoryRouter, { initialEntries }, children);
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Create a mock user for testing authentication flows.
 *
 * @param overrides - Partial user object to override defaults
 * @returns Mock user object
 *
 * @example
 * const user = createMockUser({ role: 'admin' });
 * authStore.getState().setAuth({ user, token: 'token', permissions: [] });
 */
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  email: 'test@example.com',
  fullName: 'Test User',
  role: 'viewer' as const,
  permissions: [],
  ...overrides,
});

/**
 * Wait for an element with text to appear in the DOM.
 * More readable alternative to waitFor + getByText.
 *
 * @param text - Text to search for
 * @param options - Query options
 * @returns Promise that resolves when element appears
 *
 * @example
 * await waitForText('Success message');
 */
export const waitForText = (
  text: string | RegExp,
  options?: { timeout?: number; selector?: string },
) => {
  return new Promise((resolve, reject) => {
    const timeout = options?.timeout ?? 3000;
    const startTime = Date.now();

    const checkElement = () => {
      const selector = options?.selector
        ? `${options.selector}:contains("${text}")`
        : `:contains("${text}")`;
      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Text not found: ${text}`));
      } else {
        setTimeout(checkElement, 50);
      }
    };

    checkElement();
  });
};

/**
 * Type-safe screen query wrapper with better error messages.
 * Provides common queries with improved autocomplete and error handling.
 *
 * @example
 * const { getByRole, getByLabelText } = screen;
 * screen.expectVisible('Success');
 */
export const createScreenUtils = (queriesFromRTL: any) => ({
  ...queriesFromRTL,
  expectVisible: (text: string | RegExp, expectFn?: (el: HTMLElement) => void) => {
    const element = queriesFromRTL.queryByText(text);
    if (!element) {
      throw new Error(`Element with text "${text}" not found`);
    }
    if (expectFn) expectFn(element);
  },
  expectHidden: (text: string | RegExp, expectFn?: (el: HTMLElement) => void) => {
    const element = queriesFromRTL.queryByText(text);
    if (element && element.offsetParent !== null) {
      throw new Error(`Element with text "${text}" is visible but should be hidden`);
    }
    if (expectFn && element) expectFn(element);
  },
  expectAccessible: (element: HTMLElement, expectFn?: (el: HTMLElement) => void) => {
    const hasAccessibleName =
      element.getAttribute('aria-label') || element.getAttribute('title') || element.textContent;
    if (!hasAccessibleName) {
      throw new Error('Element does not have accessible name');
    }
    if (expectFn) expectFn(element);
  },
});

/**
 * Generate test data for different entity types.
 * Useful for creating consistent mock data across tests.
 */
export const testDataFactory = {
  user: (overrides = {}) => createMockUser(overrides),

  task: (overrides = {}) => ({
    id: 'task-1',
    title: 'Test Task',
    status: 'todo' as const,
    priority: 'medium' as const,
    assignee: null,
    createdAt: new Date(),
    ...overrides,
  }),

  mailThread: (overrides = {}) => ({
    id: 'thread-1',
    subject: 'Test Subject',
    participants: ['test@example.com'],
    messageCount: 1,
    unreadCount: 0,
    lastMessageAt: new Date(),
    ...overrides,
  }),

  order: (overrides = {}) => ({
    id: 'order-1',
    status: 'pending' as const,
    totalAmount: 10000,
    currency: 'EUR' as const,
    createdAt: new Date(),
    ...overrides,
  }),
};

/**
 * Mock async operation with controllable resolution.
 * Useful for testing loading and error states.
 *
 * @param value - Value to resolve with
 * @param delayMs - Delay before resolution (default: 100ms)
 * @returns Promise that resolves after delay
 *
 * @example
 * const result = await mockAsyncOp({ data: 'success' }, 200);
 */
export const mockAsyncOp = <T>(value: T, delayMs = 100): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delayMs));

/**
 * Verify that a component is accessible according to basic standards.
 * Checks for common accessibility attributes.
 *
 * @param element - Element to check
 * @param role - Expected role attribute
 * @throws Error if element is not accessible
 */
export const expectAccessible = (element: HTMLElement, role?: string) => {
  if (role) {
    const elementRole = element.getAttribute('role');
    if (elementRole !== role) {
      throw new Error(`Expected role "${role}", got "${elementRole}"`);
    }
  }

  // Check for common accessibility attributes
  const interactiveRoles = ['button', 'link', 'textbox', 'combobox', 'listbox'];
  const elementRole = element.getAttribute('role');

  if (elementRole && interactiveRoles.includes(elementRole)) {
    const hasAccessibleName =
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.textContent?.trim();
    if (!hasAccessibleName) {
      throw new Error(
        `Interactive element with role "${elementRole}" does not have accessible name`,
      );
    }
  }
};
