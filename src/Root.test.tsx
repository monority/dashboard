import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { mockRouter, RouterProviderMock } = vi.hoisted(() => ({
  mockRouter: { marker: 'router' },
  RouterProviderMock: vi.fn((_props: { router: unknown }) => <div data-testid="router-provider" />),
}));

vi.mock('react-router-dom', () => ({
  RouterProvider: RouterProviderMock,
}));

vi.mock('./app/router', () => ({
  router: mockRouter,
}));

vi.mock('@/components/ui', () => ({
  Toast: () => <div data-testid="toast-component" />,
}));

import Root from './Root';

describe('Root', () => {
  it('rend RouterProvider et Toast', () => {
    render(<Root />);

    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toast-component')).toBeInTheDocument();
  });

  it('injecte le router configure dans RouterProvider', () => {
    render(<Root />);

    const firstCall = RouterProviderMock.mock.calls[0];
    expect(firstCall).toBeDefined();

    const props = firstCall?.[0];
    expect(props).toBeDefined();

    if (!props || typeof props !== 'object') {
      throw new Error('Props RouterProvider indisponibles');
    }

    expect((props as { router: unknown }).router).toBe(mockRouter);
  });
});
