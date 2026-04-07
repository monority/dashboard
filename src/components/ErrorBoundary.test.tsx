import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { ErrorBoundary } from './ErrorBoundary';

// Mock console.error to avoid test output pollution
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

// Component that throws an error
const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

// Component that renders normally
const NormalComponent = () => <div>Normal content</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('should display error UI when children throw an error', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Nous nous excusons/i)).toBeInTheDocument();
  });

  it('should have refresh button', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Rafra\u00eechir/);
  });

  it('should have proper ARIA attributes for error display', () => {
    const { container } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    const errorDiv = container.querySelector('[role="alert"]');
    expect(errorDiv).toBeInTheDocument();
  });
});
