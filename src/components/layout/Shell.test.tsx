import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { uiStore } from '@/stores';

import { Shell } from './Shell';

const renderShell = () =>
  render(
    <Shell
      sidebar={<div data-testid="slot-sidebar">Sidebar slot</div>}
      header={<div data-testid="slot-header">Header slot</div>}
    >
      <div data-testid="slot-content">Content slot</div>
    </Shell>,
  );

afterEach(() => {
  act(() => {
    uiStore.setState({ isSidebarOpen: true });
  });
});

describe('Shell', () => {
  it('rend les trois slots (sidebar, header, content)', () => {
    renderShell();

    expect(screen.getByTestId('slot-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('slot-header')).toBeInTheDocument();
    expect(screen.getByTestId('slot-content')).toBeInTheDocument();
  });

  it('expose un lien d evitement vers le contenu principal', () => {
    renderShell();

    expect(screen.getByRole('link', { name: /Aller au contenu principal/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('applique la classe sidebar-open quand le store est ouvert', () => {
    act(() => {
      uiStore.setState({ isSidebarOpen: true });
    });
    const { container } = renderShell();

    expect(container.firstElementChild).toHaveClass('app-shell', 'sidebar-open');
  });

  it('applique la classe sidebar-collapsed quand le store est ferme', () => {
    act(() => {
      uiStore.setState({ isSidebarOpen: false });
    });
    const { container } = renderShell();

    expect(container.firstElementChild).toHaveClass('app-shell', 'sidebar-collapsed');
  });
});
