import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import { uiStore } from '@/stores';

import { Sidebar } from './Sidebar';

const renderSidebar = () =>
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>,
  );

afterEach(() => {
  // Reset store state between tests
  act(() => {
    uiStore.setState({ isSidebarOpen: true });
  });
});

describe('Sidebar', () => {
  it('a la region de navigation principale en accessible', () => {
    renderSidebar();

    expect(screen.getByRole('navigation', { name: 'Navigation principale' })).toBeInTheDocument();
  });

  it('affiche le titre et le sous-titre du hub', () => {
    renderSidebar();

    expect(screen.getByText('Hub admin')).toBeInTheDocument();
    expect(screen.getByText('Centre de pilotage')).toBeInTheDocument();
  });

  it('affiche les 7 entrees de navigation en français', () => {
    renderSidebar();

    const labels = [
      'Tableau de bord',
      'Mail',
      'Commandes',
      'Taches',
      'Avis',
      'Support',
      'Parametres',
    ];

    for (const label of labels) {
      expect(screen.getByTitle(label)).toBeInTheDocument();
    }
  });

  it('affiche le bouton Replier quand le sidebar est ouvert', () => {
    act(() => {
      uiStore.setState({ isSidebarOpen: true });
    });
    renderSidebar();

    expect(
      screen.getByRole('button', { name: 'Replier ou ouvrir la navigation' }),
    ).toHaveTextContent('Replier la navigation');
  });

  it('affiche le bouton Ouvrir quand le sidebar est replie', () => {
    act(() => {
      uiStore.setState({ isSidebarOpen: false });
    });
    renderSidebar();

    expect(
      screen.getByRole('button', { name: 'Replier ou ouvrir la navigation' }),
    ).toHaveTextContent('Ouvrir la navigation');
  });

  it('bascule le store au clic sur le bouton toggle', async () => {
    const user = userEvent.setup();
    act(() => {
      uiStore.setState({ isSidebarOpen: true });
    });
    renderSidebar();

    await user.click(screen.getByRole('button', { name: 'Replier ou ouvrir la navigation' }));

    expect(uiStore.getState().isSidebarOpen).toBe(false);
  });
});
