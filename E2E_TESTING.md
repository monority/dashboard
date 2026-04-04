# End-to-End Testing Guide (Playwright)

This guide covers E2E testing with Playwright, which tests real user workflows across the entire application.

## Quick Start

### Running E2E Tests

```bash
# Run tests headless (CI mode)
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug
```

### Development Workflow

```bash
# Start development server
npm run dev

# In another terminal, run tests with UI
npm run test:e2e:ui

# Or for debugging
npm run test:e2e:debug
```

## Test Structure

E2E tests are organized in `/e2e` directory:

- `navigation.spec.ts` - Page navigation, layout, accessibility
- `task-management.spec.ts` - Task feature workflows
- `forms.spec.ts` - Form interactions and validation
- `responsive.spec.ts` - Responsive design and performance
- `helpers.ts` - Utility functions for E2E tests

## Writing E2E Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to tasks page', async ({ page }) => {
  // Arrange: Navigate to app
  await page.goto('/');

  // Act: Click task link
  const taskLink = page.locator('a[href="/task"]');
  await taskLink.click();

  // Assert: Verify navigation
  await expect(page).toHaveURL('/task');
});
```

### Key Patterns

#### 1. Waiting for Content

```typescript
// Wait for network requests
await page.waitForLoadState('networkidle');

// Wait for specific element
await expect(page.locator('button')).toBeVisible();

// Wait for navigation
await expect(page).toHaveURL('/expected-url');
```

#### 2. User Interactions

```typescript
// Click element
await page.locator('button').click();

// Type in input
await page.locator('input').fill('search term');

// Select dropdown
await page.locator('select').selectOption('option2');

// Submit form
await page.locator('form').press('Enter');

// Keyboard navigation
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
```

#### 3. Assertions

```typescript
// Element visibility
await expect(page.locator('button')).toBeVisible();
await expect(page.locator('[hidden]')).not.toBeVisible();

// Element content
await expect(page.locator('h1')).toContainText('Dashboard');

// URL checks
await expect(page).toHaveURL(/\/dashboard/);

// Attributes
await expect(page.locator('button')).toHaveAttribute('aria-label', 'Close');

// State
await expect(page.locator('input')).toBeDisabled();
await expect(page.locator('input')).toHaveValue('expected value');
```

#### 4. Accessibility Testing

```typescript
import { checkAccessibilityBaseline, getKeyboardAccessibleElements } from './helpers';

test('should be accessible', async ({ page }) => {
  await page.goto('/');

  // Check basic accessibility
  const a11y = await checkAccessibilityBaseline(page);
  expect(a11y.hasLandmarks).toBeTruthy();
  expect(a11y.hasHeadings).toBeTruthy();

  // Check keyboard navigation
  const keyboardElements = await getKeyboardAccessibleElements(page);
  expect(keyboardElements.length).toBeGreaterThan(0);
});
```

#### 5. Responsive Testing

```typescript
test('should work on mobile', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });

  await page.goto('/');

  // Content should be visible
  await expect(page.locator('main')).toBeVisible();

  // No horizontal scrollbar
  const hasScroll = await page.evaluate(() => {
    return window.innerWidth < document.documentElement.scrollWidth;
  });
  expect(hasScroll).toBeFalsy();
});
```

#### 6. Performance Testing

```typescript
import { measureFullPageLoad } from './helpers';

test('should load quickly', async ({ page }) => {
  const metrics = await measureFullPageLoad(page);

  expect(metrics.fullPageLoad).toBeLessThan(3000); // 3 seconds
});
```

## Using Helpers

The `helpers.ts` file provides utility functions:

```typescript
import {
  waitForNetwork,
  hasAccessibleName,
  checkAccessibilityBaseline,
  measureFullPageLoad,
  loginUser,
  takeScreenshot,
} from './helpers';

test('should use helpers', async ({ page }) => {
  // Wait for network
  await waitForNetwork(page);

  // Check accessibility
  const a11y = await checkAccessibilityBaseline(page);

  // Measure performance
  const metrics = await measureFullPageLoad(page);

  // Take screenshot for failures
  await takeScreenshot(page, 'failure-point');
});
```

## Test Organization

### Using test.describe for grouping

```typescript
test.describe('Dashboard Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display tasks', async ({ page }) => {
    // Test implementation
  });

  test('should filter tasks', async ({ page }) => {
    // Test implementation
  });
});
```

### Using fixtures for setup

```typescript
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await loginUser(page, 'test@example.com', 'password');
    await page.goto('/dashboard');
    await use(page);
  },
});

test('should show user dashboard', async ({ authenticatedPage }) => {
  // authenticatedPage is already logged in and on dashboard
});
```

## Best Practices

### 1. Use Page Object Model for Complex Pages

```typescript
// pages/TaskPage.ts
export class TaskPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/task');
  }

  async filterByStatus(status: string) {
    const filter = this.page.locator('[aria-label="Filter by status"]');
    await filter.click();
    await this.page.locator(`text=${status}`).click();
  }

  async getTaskCount() {
    return await this.page.locator('[role="row"]').count();
  }
}

// In test:
test('should filter tasks', async ({ page }) => {
  const taskPage = new TaskPage(page);
  await taskPage.goto();
  await taskPage.filterByStatus('Completed');
  const count = await taskPage.getTaskCount();
  expect(count).toBeGreaterThan(0);
});
```

### 2. Avoid Hard Waits

```typescript
// ❌ Bad
await page.waitForTimeout(2000);

// ✅ Good
await expect(page.locator('data-loaded')).toBeVisible();
await page.waitForLoadState('networkidle');
```

### 3. Use Data Attributes for Selection

```typescript
// In component
<button data-testid="submit-button">Submit</button>

// In test
await page.locator('[data-testid="submit-button"]').click();
```

### 4. Test Critical User Paths

Focus on:

- Navigation flows
- Form submissions
- Search functionality
- Error handling
- Responsive behavior
- Performance requirements

### 5. Keep Tests Independent

```typescript
test.beforeEach(async ({ page }) => {
  // Reset state before each test
  await page.goto('/');
});
```

## Configuration

The Playwright configuration (`playwright.config.ts`) includes:

- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: Pixel 5, iPhone 12
- **Auto-server** : Starts dev server automatically
- **Retries**: 2 retries on CI for flaky tests
- **Artifacts**: Screenshots, traces, videos on failure
- **Timeout**: 30 seconds per test

### Running Specific Browsers

```bash
# Chromium only
npx playwright test --project=chromium

# Mobile Safari
npx playwright test --project="Mobile Safari"

# All projects
npx playwright test
```

## Debugging

### Debug Mode

```bash
npm run test:e2e:debug
```

This opens Playwright Inspector where you can:

- Step through tests
- Inspect DOM
- Play/pause execution
- View locators

### Headed Mode

```bash
npm run test:e2e:headed
```

See browser while tests run.

### Generate Test Code

```bash
npx playwright codegen http://localhost:5173
```

Records your interactions and generates test code.

### Trace Viewer

Trace files capture full execution history. View with:

```bash
npx playwright show-trace trace.zip
```

## CI/CD Integration

Tests run in GitHub Actions:

```yaml
- name: Run E2E Tests
  run: npm run test:e2e
```

Tests run:

- On pull requests
- On push to main
- In parallel on multiple browsers
- With automatic artifact collection

## Troubleshooting

### Tests timeout

```typescript
test('slow test', async ({ page }) => {
  // Increase timeout for this test
  test.setTimeout(60000);

  await page.goto('/slow-page');
  // ...
});
```

### Flaky tests

- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Use data attributes instead of text/role selectors
- Avoid hard timeouts: `waitForTimeout()`
- Check for race conditions in test logic

### Element not found

```typescript
// Use visible option
const element = page.locator('text=Submit').first();

// Filter by visibility
const visible = page.locator('button').filter({ has: page.locator('text=Click') });

// Check multiple selectors
const element = page.locator('button[aria-label="Submit"], input[value="Submit"]').first();
```

## Performance Benchmarks

Target metrics for good performance:

- **Time to First Byte**: < 500ms
- **DOM Interactive**: < 1.5s
- **Full Page Load**: < 3s
- **Cumulative Layout Shift**: < 0.25
- **Touch target size**: ≥ 44×44px

## Coverage

Current E2E test coverage:

- **Navigation**: Full app navigation flows ✓
- **Forms**: Input, validation, submission ✓
- **Accessibility**: Keyboard nav, screen reader support ✓
- **Responsive**: Desktop, tablet, mobile viewports ✓
- **Performance**: Load times, layout shift ✓
- **Mobile interactions**: Touch targets, gestures ✓

## Next Steps

1. Add authentication tests (login, logout, sessions)
2. Add API mocking for stable testing
3. Add visual regression testing
4. Add performance profiling
5. Expand feature coverage as app grows

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
