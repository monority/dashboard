/**
 * Mock Service Worker setup for Node environment (unit and component tests)
 * This file sets up request interception for the test environment
 */

import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/**
 * Set up MSW server for Node environment
 * This is used in vitest for unit and component tests
 */
export const server = setupServer(...handlers);
