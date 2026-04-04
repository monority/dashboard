# API Mocking Guide

This guide covers API mocking strategies using Mock Service Worker (MSW) for both unit/component tests and E2E tests.

## Quick Start

### Mock data is defined in:

- **`src/mocks/handlers.ts`** — All MSW request handlers and mock data
- **`src/mocks/server.ts`** — Node.js server setup for unit tests
- **`e2e/fixtures.ts`** — Playwright fixtures for E2E test mocking

## Unit and Component Testing with MSW

### Why MSW?

Mock Service Worker intercepts HTTP requests at the network level:

- ✅ Tests run without real backend
- ✅ Deterministic responses (no network flakiness)
- ✅ Easy to test error scenarios
- ✅ No need for backend server
- ✅ Works with any HTTP client (Axios, Fetch, etc.)

### Automatic Setup

MSW is automatically initialized in all tests via `src/test-setup.ts`:

```typescript
// src/test-setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Writing Tests with MSW

#### Basic Test (Uses Default Mocks)

```typescript
import { render, screen } from '@testing-library/react';
import { TaskList } from '@/features/task/components/TaskList';

test('should display tasks from API', async () => {
  // Render component - it will fetch from mocked API
  render(<TaskList />);

  // Wait for tasks to load
  const tasks = await screen.findAllByRole('listitem');

  // Verify tasks are displayed (using mock data)
  expect(tasks).toHaveLength(3); // 3 tasks in mock data
});
```

#### Override Default Mocks

```typescript
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

test('should handle empty task list', async () => {
  // Override the default handlers for this test
  server.use(
    http.get('http://localhost:3000/api/tasks', () => {
      return HttpResponse.json({ data: [] });
    })
  );

  render(<TaskList />);

  // Should show "no tasks" message
  const emptyState = await screen.findByText(/no tasks/i);
  expect(emptyState).toBeInTheDocument();
});
```

#### Mock API Errors

```typescript
import { server } from '@/mocks/server';
import { HttpResponse } from 'msw';

test('should show error message on API failure', async () => {
  // Mock error response
  server.use(
    http.get('http://localhost:3000/api/tasks', () => {
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    })
  );

  render(<TaskList />);

  // Should show error message
  const error = await screen.findByRole('alert');
  expect(error).toHaveTextContent('error');
});
```

#### Mock with Delay (Simulate Slow Network)

```typescript
import { server } from '@/mocks/server';
import { delay, http, HttpResponse } from 'msw';

test('should show loading state', async () => {
  server.use(
    http.get('http://localhost:3000/api/tasks', async () => {
      // Simulate 2 second delay
      await delay(2000);

      return HttpResponse.json({
        data: [{ id: '1', title: 'Task 1' }],
      });
    })
  );

  render(<TaskList />);

  // Should initially show loading
  expect(screen.getByRole('status')).toHaveTextContent(/loading/i);

  // Eventually loads data
  const task = await screen.findByText('Task 1');
  expect(task).toBeInTheDocument();
});
```

### Available Mock Data

All mock data is defined in `src/mocks/handlers.ts`:

```typescript
// Tasks
mockHandlers.tasks // Array of 3 sample tasks
  - task-1: pending, high priority
  - task-2: in-progress, high priority
  - task-3: completed, low priority

// Users
mockHandlers.users // Array of 2 sample users
  - user-1: John Doe (admin)
  - user-2: Jane Smith (editor)

// Orders
mockHandlers.orders // Array of 2 sample orders
  - order-1: processing
  - order-2: delivered

// Mail
mockHandlers.mail // Array of 2 sample emails

// Reviews
mockHandlers.reviews // Array of 2 sample reviews
```

### Mocking POST Requests

```typescript
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

test('should create new task', async () => {
  const user = userEvent.setup();

  const onTaskCreated = vi.fn();

  server.use(
    http.post('http://localhost:3000/api/tasks', async ({ request }) => {
      const body = await request.json();

      return HttpResponse.json(
        {
          data: {
            id: 'task-new',
            ...body,
            createdAt: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    })
  );

  render(<TaskForm onSuccess={onTaskCreated} />);

  const titleInput = screen.getByLabelText('Title');
  await user.type(titleInput, 'New Task');

  const submitButton = screen.getByRole('button', { name: /save/i });
  await user.click(submitButton);

  // Verify task was created
  await waitFor(() => {
    expect(onTaskCreated).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Task',
      })
    );
  });
});
```

## E2E Testing with Playwright

### Route Interception Method

For E2E tests, use Playwright's route interception instead of MSW (simpler setup):

```typescript
import { test, expect } from '@playwright/test';

test('should fetch tasks and display them', async ({ page }) => {
  // Mock GET /api/tasks
  await page.route('**/api/tasks', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          { id: '1', title: 'Task 1', status: 'pending' },
          { id: '2', title: 'Task 2', status: 'completed' },
        ],
      }),
    });
  });

  await page.goto('/task');

  // Verify tasks are displayed
  const tasks = page.locator('[role="row"]');
  await expect(tasks).toHaveCount(2);
});
```

### Mock Multiple Endpoints

```typescript
test('should load page with multiple API calls', async ({ page }) => {
  // Mock tasks
  await page.route('**/api/tasks', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          /* mock tasks */
        ],
      }),
    });
  });

  // Mock users
  await page.route('**/api/users', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          /* mock users */
        ],
      }),
    });
  });

  // Mock orders
  await page.route('**/api/orders', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          /* mock orders */
        ],
      }),
    });
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // All endpoints called successfully
  await expect(page.locator('main')).toBeVisible();
});
```

### Mock API Errors in E2E

```typescript
test('should handle server error gracefully', async ({ page }) => {
  // Mock error response
  await page.route('**/api/tasks', (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });

  await page.goto('/task');

  // Should show error message
  const error = page.locator('[role="alert"]');
  await expect(error).toBeVisible();
});
```

### Using Playwright Fixtures

The `e2e/fixtures.ts` provides custom fixtures for convenience:

```typescript
import { test, expect } from './fixtures';

test('should use mock API fixture', async ({ page, mockAPI }) => {
  await mockAPI('tasks');

  await page.goto('/task');
  await page.waitForLoadState('networkidle');

  const taskCount = await page.locator('[data-testid="task-item"]').count();
  expect(taskCount).toBeGreaterThanOrEqual(0);
});

test('should handle API error', async ({ page, mockAPIError }) => {
  await mockAPIError('tasks', 500, 'Server error');

  await page.goto('/task');

  const error = page.locator('[role="alert"]');
  await expect(error).toBeVisible();
});
```

### Simulate Network Delays

```typescript
test('should handle slow network', async ({ page }) => {
  await page.route('**/api/**', async (route) => {
    // Add 2 second delay
    await page.waitForTimeout(2000);

    route.continue();
  });

  const startTime = Date.now();
  await page.goto('/task');
  const loadTime = Date.now() - startTime;

  // Should have delayed
  expect(loadTime).toBeGreaterThanOrEqual(2000);
});
```

## Best Practices

### 1. Use Default Mocks When Possible

```typescript
// ✅ Good - uses default mock data
test('should display tasks', async () => {
  render(<TaskList />);
  const tasks = await screen.findAllByRole('listitem');
  expect(tasks).toHaveLength(3);
});

// ❌ Avoid - unnecessary override
test('should display tasks', async () => {
  server.use(
    http.get('http://localhost:3000/api/tasks', () => {
      return HttpResponse.json({
        data: [
          { id: '1', title: 'Task 1', status: 'pending' },
          { id: '2', title: 'Task 2', status: 'pending' },
          { id: '3', title: 'Task 3', status: 'pending' },
        ],
      });
    })
  );

  render(<TaskList />);
  // ... same test
});
```

### 2. Test Error States

```typescript
// ✅ Good - test error handling
test('should show error message', async () => {
  server.use(
    http.get('http://localhost:3000/api/tasks', () => {
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    })
  );

  render(<TaskList />);
  expect(await screen.findByRole('alert')).toBeInTheDocument();
});
```

### 3. Reset Handlers Between Tests

MSW automatically resets handlers between tests via `afterEach`. But you can also reset manually:

```typescript
test('test 1 with custom handler', async () => {
  server.use(/* custom handler */);
  // test code
});

test('test 2 - handler is reset', async () => {
  // Should use default handlers
  render(<Component />);
});
```

### 4. Name Test Data Clearly

```typescript
// ✅ Good
const completedTask = { id: '1', title: 'Task 1', status: 'completed' };
const pendingTask = { id: '2', title: 'Task 2', status: 'pending' };

// ❌ Avoid
const task1 = { id: '1', title: 'Task 1', status: 'completed' };
const task2 = { id: '2', title: 'Task 2', status: 'pending' };
```

### 5. Separate Mocks by Concern

Keep mocks organized in `src/mocks/handlers.ts`:

- Task-related endpoints together
- User-related endpoints together
- Auth endpoints together

## Debugging Mocked Requests

### Log Unhandled Requests

```typescript
// In test-setup.ts
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn', // or 'error' to fail tests
  });
});
```

### Debug Request Details

```typescript
server.use(
  http.get('http://localhost:3000/api/tasks', ({ request }) => {
    console.log('Request URL:', request.url);
    console.log('Request method:', request.method);
    console.log('Request headers:', request.headers);

    return HttpResponse.json({ data: [] });
  }),
);
```

### Intercept and Log All Requests

```typescript
import { http, passthrough } from 'msw';

server.use(
  http.all('*', ({ request }) => {
    console.log(`${request.method} ${request.url}`);
    return passthrough();
  }),
);
```

## Common Issues

### Issue: "Request to X was not handled"

**Cause**: No handler defined for this endpoint

**Solution**:

1. Add handler to `src/mocks/handlers.ts`
2. Or override in test: `server.use(http.get('/api/endpoint', ...))`
3. Or set `onUnhandledRequest: 'bypass'` to allow real requests

```typescript
server.listen({ onUnhandledRequest: 'bypass' });
```

### Issue: Tests are flaky (sometimes pass, sometimes fail)

**Cause**: Real API calls leaking through

**Solution**:

1. Ensure all endpoints are mocked
2. Check for correct URL patterns in route handlers
3. Use `waitForLoadState('networkidle')` in E2E tests
4. Avoid hard timeouts: `waitForTimeout()`

### Issue: Mock responds with wrong data

**Cause**: Handler order matters - first match wins

**Solution**: Place more specific handlers before generic ones:

```typescript
// ✅ Good order
http.get('http://localhost:3000/api/tasks/123', ...), // Specific
http.get('http://localhost:3000/api/tasks', ...), // General

// ❌ Bad order
http.get('http://localhost:3000/api/tasks', ...), // General
http.get('http://localhost:3000/api/tasks/123', ...), // Never reached
```

## Adding New Mock Data

To add mock data for a new endpoint:

1. **Add to handlers.ts**:

```typescript
export const mockHandlers = {
  yourEndpoint: [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
  ],
};
```

2. **Add handler**:

```typescript
export const handlers = [
  http.get(`${API_BASE_URL}/your-endpoint`, () => {
    return HttpResponse.json({ data: mockHandlers.yourEndpoint });
  }),
];
```

3. **Use in tests**:

```typescript
// Unit test
test('should fetch items', async () => {
  render(<YourComponent />);
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(2);
});

// E2E test
test('should display items', async ({ page }) => {
  await page.route('**/api/your-endpoint', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ data: mockHandlers.yourEndpoint }),
    });
  });

  await page.goto('/your-page');
  const items = page.locator('[role="listitem"]');
  await expect(items).toHaveCount(2);
});
```

## Resources

- [MSW Documentation](https://mswjs.io)
- [MSW API Reference](https://mswjs.io/docs/api)
- [Playwright Route Interception](https://playwright.dev/docs/network)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)

## Summary

| Context             | Tool       | Method                                                |
| ------------------- | ---------- | ----------------------------------------------------- |
| Unit tests          | MSW        | Global mock server in test-setup.ts                   |
| Component tests     | MSW        | Global mock server in test-setup.ts                   |
| E2E tests           | Playwright | Route interception (`page.route()`)                   |
| Performance testing | Playwright | Route delay: `await page.waitForTimeout()`            |
| Error scenarios     | Both       | Override handlers (unit) or mock error response (E2E) |
