import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="layout-outlet">Outlet content</div>,
}));

vi.mock('@/app/useRouteMetadata', () => ({
  useRouteMetadata: vi.fn(),
}));

vi.mock('@/components', () => ({
  Header: () => <div data-testid="layout-header">Header component</div>,
  Sidebar: () => <div data-testid="layout-sidebar">Sidebar component</div>,
  Shell: ({
    sidebar,
    header,
    children,
  }: {
    sidebar: ReactNode;
    header: ReactNode;
    children: ReactNode;
  }) => (
    <div data-testid="layout-shell">
      <div data-testid="layout-shell-sidebar">{sidebar}</div>
      <div data-testid="layout-shell-header">{header}</div>
      <div data-testid="layout-shell-content">{children}</div>
    </div>
  ),
}));

import { AppLayout } from './AppLayout';

describe('AppLayout', () => {
  it('compose Shell avec Sidebar, Header et Outlet', () => {
    render(<AppLayout />);

    expect(screen.getByTestId('layout-shell')).toBeInTheDocument();
    expect(screen.getByTestId('layout-header')).toBeInTheDocument();
    expect(screen.getByTestId('layout-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('layout-outlet')).toBeInTheDocument();
  });

  it('injecte les elements dans les bonnes zones du shell', () => {
    render(<AppLayout />);

    expect(screen.getByTestId('layout-shell-sidebar')).toContainElement(
      screen.getByTestId('layout-sidebar'),
    );
    expect(screen.getByTestId('layout-shell-header')).toContainElement(
      screen.getByTestId('layout-header'),
    );
    expect(screen.getByTestId('layout-shell-content')).toContainElement(
      screen.getByTestId('layout-outlet'),
    );
  });
});
