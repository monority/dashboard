# Contributing Guide

Thanks for contributing to the Dashboard! This guide will help you get started with development, testing, and deployment.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style & Quality](#code-style--quality)
- [Testing](#testing)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- **Node.js**: 18.x or 20.x (check with `node --version`)
- **npm**: 9.x or higher (check with `npm --version`)
- **Git**: Latest version

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/dashboard.git
   cd dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Project Structure

```
dashboard/
├── src/
│   ├── features/          # Feature-specific code (task, mail, order, etc.)
│   │   └── task/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types.ts
│   ├── components/       # Shared UI components
│   │   ├── ui/           # Atomic components (Button, Input, etc.)
│   │   └── layout/       # Layout components (Header, Sidebar, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state (auth, ui only)
│   ├── services/         # Business logic, API clients
│   ├── types/            # Global TypeScript types
│   ├── utils/            # Utility functions
│   ├── mocks/            # MSW mock handlers for testing
│   └── styles/           # Global styles
├── e2e/                  # Playwright E2E tests
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── DEVELOPMENT.md        # Architecture & feature creation guide
├── TESTING.md            # Unit/component testing guide
├── E2E_TESTING.md        # E2E testing with Playwright
├── API_MOCKING.md        # API mocking with MSW
└── playwright.config.ts  # Playwright configuration
```

## Development Workflow

### Creating a Feature

Follow the step-by-step process in [DEVELOPMENT.md](DEVELOPMENT.md):

1. **Create feature directory**

   ```bash
   mkdir -p src/features/my-feature/{components,hooks,services}
   ```

2. **Create types file**

   ```typescript
   // src/features/my-feature/types.ts
   export interface MyModel {
     id: string;
     name: string;
     createdAt: string;
   }
   ```

3. **Create service layer**

   ```typescript
   // src/features/my-feature/services/my-service.ts
   import { httpClient } from '@/services/http/client';

   export const myService = {
     list: () => httpClient.get('/api/my-feature'),
     create: (data: any) => httpClient.post('/api/my-feature', data),
     update: (id: string, data: any) => httpClient.put(`/api/my-feature/${id}`, data),
     delete: (id: string) => httpClient.delete(`/api/my-feature/${id}`),
   };
   ```

4. **Create custom hook**

   ```typescript
   // src/features/my-feature/hooks/useMyFeature.ts
   import { useQuery } from '@tanstack/react-query';
   import { myService } from '../services/my-service';

   export const useMyFeature = () => {
     return useQuery({
       queryKey: ['my-feature'],
       queryFn: myService.list,
     });
   };
   ```

5. **Create components**

   ```typescript
   // src/features/my-feature/components/MyList.tsx
   import { useMyFeature } from '../hooks/useMyFeature';

   export function MyList() {
     const { data, isLoading, error } = useMyFeature();

     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;

     return (
       <div>
         {data?.map(item => (
           <div key={item.id}>{item.name}</div>
         ))}
       </div>
     );
   }

   MyList.displayName = 'MyList';
   ```

6. **Write tests**
   - See [TESTING.md](TESTING.md) for patterns
   - See [E2E_TESTING.md](E2E_TESTING.md) for E2E tests

### Adding a New Page

1. **Create page component**

   ```typescript
   // src/features/my-feature/pages/MyPage.tsx
   export function MyPage() {
     return <div>My Page</div>;
   }

   MyPage.displayName = 'MyPage';
   ```

2. **Add route in router**

   ```typescript
   // src/app/router.tsx
   {
     path: '/my-feature',
     element: <Suspense fallback={...}><MyPage /></Suspense>,
   }
   ```

3. **Add navigation link**
   ```typescript
   // src/components/layout/Sidebar.tsx
   <Link to="/my-feature">My Feature</Link>
   ```

## Code Style & Quality

### Formatting

Code is automatically formatted using Prettier:

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

### Linting

ESLint checks code quality and style:

```bash
# Run linter
npm run lint

# Lint is automatically run on commit (pre-commit hook)
```

### Type Checking

TypeScript strict mode is enabled:

```bash
# Type check
npm run typecheck

# Fix common type errors
npm run typecheck
```

### Code Style Guide

#### Components

- Use functional components with hooks
- Add `displayName` for React DevTools
- Add JSDoc comments with usage examples
- Use TypeScript for prop types (no PropTypes)

```typescript
/**
 * Displays a list of tasks with filtering and pagination
 * @example
 * <TaskList onSelect={(task) => console.log(task)} />
 */
export function TaskList({ onSelect }: TaskListProps) {
  return <div>...</div>;
}

TaskList.displayName = 'TaskList';
```

#### State Management

- Use **Zustand** for UI state (theme, sidebar open, etc.)
- Use **TanStack Query** for server state (tasks, users, etc.)
- Keep stores simple and focused

```typescript
// ✅ Good - UI state in Zustand
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));

// ✅ Good - Server state with TanStack Query
export const useTasksQuery = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.list,
  });
};
```

#### Styling

- Use CSS modules or inline styles with design tokens
- Prefer semantic SCSS when needed
- Follow design system variables

```tsx
// ✅ Good
<button className={styles.primary}>Click</button>

// ✅ Good
<button style={{ color: 'var(--color-primary)' }}>Click</button>

// ❌ Avoid
<button style={{ color: '#0066FF' }}>Click</button>
```

## Testing

### Running Tests

```bash
# Run all tests once
npm run test

# Watch mode (re-run on file changes)
npm run test:watch

# Run specific test file
npm run test -- src/features/task/hooks/useTasks.test.ts

# Run with UI
npm run test -- --ui

# Generate coverage report
npm run test -- --coverage
```

### Unit & Component Tests

See [TESTING.md](TESTING.md) for comprehensive guide.

**Quick example:**

```typescript
import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';

test('should display tasks', async () => {
  render(<TaskList />);

  const tasks = await screen.findAllByRole('listitem');
  expect(tasks).toHaveLength(3); // 3 tasks in mock data
});
```

### E2E Tests

See [E2E_TESTING.md](E2E_TESTING.md) for comprehensive guide.

**Quick example:**

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to tasks', async ({ page }) => {
  await page.goto('/');

  const taskLink = page.locator('a[href="/task"]');
  await taskLink.click();

  await expect(page).toHaveURL('/task');
});
```

### API Mocking

See [API_MOCKING.md](API_MOCKING.md) for comprehensive guide.

Mock data is automatically available in tests:

- Unit/component tests: Uses MSW (Mock Service Worker)
- E2E tests: Uses Playwright route interception

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style (formatting, semicolons)
- `refactor:` Code reorganization
- `perf:` Performance improvements
- `test:` Test additions/changes
- `chore:` Build, dependencies, tooling

**Examples:**

```
feat(task): add task filtering by status
fix(auth): prevent login redirect loop
docs: update API mocking guide
refactor(components): extract common button logic
perf(task-list): memoize task items
test(task): add task creation tests
```

## Pull Request Process

### Before Creating PR

1. **Update your branch** with latest main

   ```bash
   git fetch origin main
   git rebase origin/main
   ```

2. **Run all checks locally**

   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run test:e2e
   npm run build
   ```

3. **Stay small and focused** - one feature per PR

   ```bash
   # ✅ Good
   - Add task filtering

   # ❌ Too broad
   - Add task filtering, refactor sidebar, update styles
   ```

### Creating PR

1. **Push your branch**

   ```bash
   git push origin my-feature-branch
   ```

2. **Create PR** with:
   - Clear title following commit message format
   - Description of changes
   - Screenshots for UI changes
   - Link to related issues
   - Checklist:
     - [ ] Tests added/updated
     - [ ] Accessibility checked
     - [ ] Documentation updated
     - [ ] No breaking changes

3. **Example PR description**

   ```markdown
   ## Description

   Adds task filtering by status (pending/in-progress/completed)

   ## Changes

   - New TaskFilter component with status select
   - Hook `useTasks` now accepts status filter param
   - E2E tests for filtering flow

   ## Testing

   - Unit tests: 4 new tests in useTasks.test.ts
   - E2E tests: 2 new tests in task-management.spec.ts
   - Manual: Tested on Chrome, Firefox, Safari

   Fixes #123
   ```

### PR Review

- Automated checks run automatically (CI/CD)
- At least one approval required
- Address feedback promptly
- Rebase and force-push after changes

## Troubleshooting

### Common Issues

#### "npm install" fails

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Port 5173 already in use

```bash
# Find process using port 5173
lsof -i :5173

# Kill process (macOS/Linux)
kill -9 <PID>

# Windows: Change port in vite.config.ts
```

#### Tests fail with "unhandled request"

```bash
# Check that MSW handlers are defined for the endpoint
# See src/mocks/handlers.ts

# Or disable unhandled request errors (only for debugging)
// In src/test-setup.ts
server.listen({ onUnhandledRequest: 'bypass' });
```

#### Build fails with TS errors

```bash
# Check all type errors
npm run typecheck

# Verify imports are correct
grep -r "from '@/" src/ | head -20
```

#### E2E tests timeout

```bash
# Increase timeout in test
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds

  await page.goto('/slow-page');
  // ...
});

# Or run tests with more workers
npx playwright test --workers=1
```

### Performance Issues

- **Slow dev server**: Clear Vite cache

  ```bash
  rm -rf node_modules/.vite
  npm run dev
  ```

- **Slow tests**: Run in parallel

  ```bash
  npm run test -- --threads
  ```

- **Large bundle**: Check with
  ```bash
  npm run build
  # Check dist/ folder size
  ```

## Resources

- **Architecture & Features**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Testing Guide**: [TESTING.md](TESTING.md)
- **E2E Testing**: [E2E_TESTING.md](E2E_TESTING.md)
- **API Mocking**: [API_MOCKING.md](API_MOCKING.md)

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.vercel.app/)
- [Testing Library](https://testing-library.com)
- [Playwright Docs](https://playwright.dev)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Acknowledge good work
- Help others learn and grow

## Questions?

- Check existing issues and documentation
- Ask in pull request comments
- Open a new issue for bugs or features
- Reach out to maintainers

Thank you for contributing! 🎉
