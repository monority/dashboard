# Testing Guide

This document outlines testing best practices and utilities available in this project.

## Test Structure

Tests follow a consistent pattern across the project:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from '@/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
    it('should render with props', () => {
        render(<MyComponent title="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should handle user interactions', async () => {
        const { user } = render(<MyComponent />);
        await user.click(screen.getByRole('button'));
        expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
});
```

## Custom Testing Utilities

### renderWithRouter

Renders a component with React Router context available:

```typescript
import { renderWithRouter } from '@/test-utils';

const { getByRole } = renderWithRouter(<Dashboard />);
// Component can now use useNavigate, useLocation, etc.
```

### Test Data Factory

Create consistent mock data for tests:

```typescript
import { testDataFactory } from '@/test-utils';

const user = testDataFactory.user({ role: 'admin' });
const task = testDataFactory.task({ status: 'completed' });
const order = testDataFactory.order({ totalAmount: 50000 });
```

### mockAsyncOp

Test loading and error states with controlled async operations:

```typescript
import { mockAsyncOp } from '@/test-utils';

const data = await mockAsyncOp({ status: 'success' }, 200);
// Promise resolves after 200ms
```

## Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ✅ Good - tests what user sees and does
it('should submit form on button click', async () => {
    const { user } = renderWithRouter(<Form />);
    await user.type(screen.getByRole('textbox'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText('Form submitted')).toBeInTheDocument();
});

// ❌ Bad - tests implementation details
it('should call handleSubmit', () => {
    const handleSubmit = vi.fn();
    render(<Form onSubmit={handleSubmit} />);
    expect(handleSubmit).toHaveBeenCalled();
});
```

### 2. Use Semantic Queries

```typescript
// ✅ Best - semantic role
screen.getByRole('button', { name: 'Submit' });

// ✅ Good - label association
screen.getByLabelText('Email');

// ⚠️ Avoid - testing implementation
screen.getByTestId('email-input');
```

### 3. Test Accessibility

```typescript
import { expectAccessible } from '@/test-utils';

it('should have proper accessibility attributes', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expectAccessible(button, 'button');
});
```

### 4. Test Edge Cases

```typescript
describe('Input validation', () => {
    it('should show error for empty email', () => {
        render(<EmailInput required />);
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        expect(screen.getByText(/email required/i)).toBeInTheDocument();
    });

    it('should show error for invalid email format', () => {
        render(<EmailInput required />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'invalid' } });
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
});
```

### 5. Mock External Dependencies

```typescript
import { vi } from 'vitest';
import * as api from '@/services/api';

describe('UserProfile', () => {
    beforeEach(() => {
        vi.spyOn(api, 'fetchUser').mockResolvedValue({
            id: '1',
            name: 'Test User',
        });
    });

    it('should display user data', async () => {
        render(<UserProfile userId="1" />);
        await screen.findByText('Test User');
    });
});
```

## Test Coverage Goals

- **Unit Tests**: Function behavior, utility functions
- **Component Tests**: Rendering, user interactions, accessibility
- **Integration Tests**: Feature workflows, state management
- **Error States**: Error boundaries, error messages

Current coverage:

- 102+ tests across components, features, services, hooks, and utilities
- 100% passing rate
- WCAG 2.1 Level AA accessibility compliance

## Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests for a specific file
npm run test -- src/components/Button.test.tsx

# Run tests with coverage
npm run test -- --coverage
```

## Debugging Tests

### Using debugger in tests

```typescript
import { render, screen } from '@testing-library/react';

it('should render correctly', () => {
    const { debug } = render(<MyComponent />);
    debug(); // Prints DOM to console
    debugger; // Pauses execution
});
```

### Using Vitest UI (if available)

```bash
npm run test:ui
```

## Common Testing Patterns

### Testing Forms

```typescript
it('should submit form data', async () => {
    const onSubmit = vi.fn();
    const { user } = render(<Form onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
});
```

### Testing Async Operations

```typescript
it('should load data', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue({ items: [1, 2, 3] });

    render(<DataList />);

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
});
```

### Testing Error States

```typescript
it('should show error message on API failure', async () => {
    vi.spyOn(api, 'fetchData').mockRejectedValue(new Error('Network error'));

    render(<DataList />);

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Network error');
});
```

### Testing with Routes

```typescript
it('should navigate on link click', async () => {
    const { user } = renderWithRouter(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );

    await user.click(screen.getByRole('link', { name: /about/i }));
    expect(screen.getByText(/about page/i)).toBeInTheDocument();
});
```

## Troubleshooting

### "Not wrapped in an act(...)"

This warning occurs when state updates happen outside of React's render/act cycle. Solution:

```typescript
// Wrap async operations that cause state updates
it('should update component', async () => {
    const { user } = render(<Component />);
    await user.click(screen.getByRole('button'));
    await waitFor(() => {
        expect(screen.getByText('Updated')).toBeInTheDocument();
    });
});
```

### "getByRole not finding element"

Check that the element has the correct role attribute:

```typescript
// Ensure semantic HTML
<button>Click me</button>  // ✅ has role="button" implicitly
<div role="button">Click me</div>  // ⚠️ needs explicit role

// Use screen.debug() to see actual DOM
const { debug } = render(<Component />);
debug();
```

### Timeout errors in tests

Increase timeout for slow operations:

```typescript
it('should load data', async () => {
    render(<SlowComponent />);
    await screen.findByText('Data', {}, { timeout: 5000 });
}, { timeout: 10000 });
```

## Performance Testing Tips

For testing component render performance:

```typescript
import { performance } from 'perf_hooks';

it('should render quickly', () => {
    const start = performance.now();
    render(<HeavyComponent />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100); // Less than 100ms
});
```

## Further Reading

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
