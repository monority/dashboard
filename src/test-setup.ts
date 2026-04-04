import '@testing-library/jest-dom';

/**
 * Extended test setup with custom matchers and global test configuration.
 * This file is executed before every test to set up the testing environment.
 */

// Extend Vitest matchers with jest-dom matchers
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll } from 'vitest';

import { server } from './mocks/server';

/**
 * Start MSW server before running tests.
 * This intercepts all API calls and returns mock responses.
 */
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

/**
 * Cleanup DOM after each test to prevent memory leaks and test interference.
 * This is especially important when testing components that use portals or refs.
 * Also reset MSW handlers to ensure test isolation.
 */
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

/**
 * Stop MSW server after all tests complete.
 */
afterAll(() => server.close());

/**
 * Mock window.matchMedia for testing components that use prefers-color-scheme,
 * prefers-reduced-motion, or other media queries.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
