# Development Guide

Complete guide for developing features in this dashboard application.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests in watch mode
pnpm run test:watch

# Check types and lint
pnpm run typecheck
pnpm run lint

# Build for production
pnpm run build
```

## Project Structure

```
src/
├── app/              # Application routing and setup
├── components/       # Shared UI and layout components
│   ├── ui/          # Basic UI components (Button, Input, Card, etc.)
│   ├── layout/      # Layout components (Header, Sidebar, etc.)
│   └── ErrorBoundary.tsx
├── features/        # Feature modules (feature-based architecture)
│   ├── dashboard/
│   ├── mail/
│   ├── order/
│   ├── task/
│   ├── reviews/
│   ├── support/
│   ├── settings/
│   ├── users/       # Shared user/billing data
│   └── billing/
├── hooks/           # Custom React hooks
├── services/        # API calls and business logic
│   ├── http/       # HTTP client and error handling
│   ├── search/     # Global search service
│   └── query/      # TanStack Query configuration
├── stores/          # Zustand state management (UI + Auth only)
├── styles/          # Global CSS and design tokens
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and constants
```

## Architecture Principles

### 1. Feature-Based Structure

Features are self-contained directories with:

- Components (feature-specific components)
- Services (feature-specific API logic)
- Hooks (feature-specific custom hooks)
- Types (feature-specific types)
- Index barrel export

```typescript
// src/features/task/index.ts
export { TaskPage } from './components/TaskPage';
export * from './types';
export * from './services';
```

### 2. Separation of Concerns

- **UI Components** (src/components/): Pure presentation, no business logic
- **Custom Hooks** (src/hooks/): logic composition for components
- **Services** (src/services/): API calls and data transformation
- **Stores** (src/stores/): Global state (UI + Auth only)
- **TanStack Query**: Server state caching and synchronization

### 3. Type Safety

- TypeScript strict mode enabled
- No `.js` files in source (allowJs: false)
- All APIs have JSDoc with examples
- Components typed with explicit props interfaces

### 4. Accessibility (WCAG 2.1 Level AA)

- Semantic HTML elements
- ARIA attributes (aria-invalid, aria-describedby, aria-required)
- Keyboard navigation support
- Screen reader announcements
- Color contrast standards
- prefers-reduced-motion support

## Creating a New Feature

### 1. Create Feature Directory

```bash
mkdir -p src/features/myfeature/{components,services,hooks}
```

### 2. Define Types

```typescript
// src/features/myfeature/types.ts
export interface MyEntity {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}
```

### 3. Create Services

```typescript
// src/features/myfeature/services/my-service.ts
import { httpClient } from '@/services/http';
import type { MyEntity } from '../types';

/**
 * Fetch entities for the feature.
 * @param filters - Optional filters to apply
 * @returns Promise resolving to array of entities
 */
export const fetchEntities = async (filters?: Record<string, any>) => {
  const response = await httpClient.get<MyEntity[]>('/api/myfeature', {
    params: filters,
  });
  return response.data;
};
```

### 4. Create Custom Hook (if needed)

```typescript
// src/features/myfeature/hooks/useMyFeature.ts
import { useQuery } from '@tanstack/react-query';
import { fetchEntities } from '../services/my-service';

/** Hook for feature data with caching */
export const useMyFeature = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ['myfeature', filters],
    queryFn: () => fetchEntities(filters),
  });
};
```

### 5. Create Components

```typescript
// src/features/myfeature/components/MyFeature.tsx

import { useMyFeature } from '../hooks/useMyFeature';

interface MyFeatureProps {
    title: string;
}

/**
 * Main feature component.
 * Displays entities in a paginated table with filters.
 *
 * @param props - Component props
 * @returns Rendered feature component
 */
export const MyFeatureComponent = ({ title }: MyFeatureProps) => {
    const { data, isLoading, error } = useMyFeature();

    if (isLoading) {
        return <Skeleton height="20rem" />;
    }

    if (error) {
        return <ErrorBoundary>Error loading feature</ErrorBoundary>;
    }

    return (
        <div>
            <h1>{title}</h1>
            {/* Feature content */}
        </div>
    );
};

MyFeatureComponent.displayName = 'MyFeatureComponent';
```

## Component Development

### Creating a UI Component

```typescript
// src/components/ui/MyButton.tsx

import type { ButtonHTMLAttributes } from 'react';
import type { BaseComponentProps } from '@/types';

/** Props for MyButton component */
interface MyButtonProps extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: 'primary' | 'secondary';
    /** Whether button is in loading state */
    isLoading?: boolean;
}

/**
 * Custom button component with loading state support.
 *
 * @param props - Button component props
 * @returns Rendered button element
 * @example
 * <MyButton variant="primary" onClick={handleClick}>Click me</MyButton>
 */
export const MyButton = ({
    children,
    variant = 'primary',
    isLoading = false,
    ...props
}: MyButtonProps) => {
    return (
        <button disabled={isLoading} data-variant={variant} {...props}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

MyButton.displayName = 'MyButton';
```

## Testing Strategy

### Test Files

Place test files next to components:

```
Button.tsx
Button.test.tsx
```

### Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from '@/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render with default props', () => {
        render(<MyComponent />);
        expect(screen.getByText(/expected text/i)).toBeInTheDocument();
    });

    it('should handle user interaction', async () => {
        const { user } = render(<MyComponent />);
        await user.click(screen.getByRole('button'));
        expect(screen.getByText(/after click/i)).toBeInTheDocument();
    });

    it('should be accessible', () => {
        render(<MyComponent />);
        const button = screen.getByRole('button');
        expect(button).toHaveAccessibleName();
    });
});
```

## Styling

### Design Tokens

CSS custom properties are defined in `src/styles/tokens.css`:

```css
--text-primary: color value --text-secondary: color value --accent: color value --danger: color
  value --radius-sm: border-radius value;
```

### Creating Styles

```css
/* src/features/myfeature/my-feature.css */

.my-feature {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-1);
  border: 1px solid var(--border-default);
}

.my-feature__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .my-feature {
    animation: none;
    transition: none;
  }
}
```

## Performance Best Practices

### 1. Code Splitting

Features are lazy-loaded by route:

```typescript
// src/app/router.tsx
const DashboardPage = lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })),
);
```

### 2. Memoization

Use `useMemo` for expensive computations:

```typescript
const expensiveValue = useMemo(() => {
  return computeValue(data);
}, [data]);
```

### 3. Vendor Chunks

Dependencies are split into separate bundles:

- `vendor-react`: React, React Router, React DOM
- `vendor-data`: TanStack, Zustand, Axios
- `vendor`: Other dependencies

## Debugging

### Browser DevTools

1. **React DevTools**: Inspect component tree and props
   - Components show their `displayName`
   - Hooks show their values
2. **Redux/Zustand DevTools**: Inspect state mutations

### Vitest Debugging

```typescript
// In test file
import { render, screen } from '@testing-library/react';

it('should work', () => {
    const { debug } = render(<Component />);
    debug(); // Prints DOM to console
    debugger; // Pauses execution
});
```

Run with:

```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs run test-file.test.tsx
```

## Code Quality Tools

### Type Checking

```bash
pnpm run typecheck
```

All TypeScript errors must be fixed before committing.

### Linting

```bash
pnpm run lint
```

Checks:

- ESLint (syntax, accessibility, best practices)
- Prettier (code formatting)
- Import ordering

### Testing

```bash
pnpm run test
```

All tests must pass before committing.

### Husky Pre-commit Hooks

Automatically runs:

- ESLint with auto-fix
- Prettier formatting
- On staged files only

## Common Tasks

### Adding a New Page

1. Create feature directory in `src/features`
2. Add `Page.tsx` component
3. Define route in `src/app/router.tsx`
4. Add to navigation items
5. Create tests alongside components

### Adding a Global Component

1. Create in `src/components/ui/`
2. Export from `src/components/index.ts`
3. Add `displayName` for DevTools
4. Include JSDoc with examples
5. Create comprehensive tests
6. Add CSS to `src/styles/ui.css`

### Adding State

Only use Zustand for:

- ✅ UI state (sidebar open, theme, modals)
- ✅ Auth state (user, token, permissions)
- ❌ Server state (use TanStack Query instead)
- ❌ Form state (use React hook form or local state)

### Error Handling

Global error boundary is configured in router. Local error boundaries for sections:

```typescript
<ErrorBoundary>
    <FeatureSection />
</ErrorBoundary>
```

## Deployment

### Vercel

Pre-configured in `vercel.json`:

- Builds with `pnpm run build`
- Default deployment branch: main
- Preview deployments for PRs

```bash
pnpm run build
# Creates dist/ folder ready for deployment
```

## Resources

- [React Documentation](https://react.dev)
- [React Router v7](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

For questions or issues:

1. Check the existing code for similar patterns
2. Review JSDoc examples on functions/components
3. Check TESTING.md for test examples
4. Refer to this Development Guide
