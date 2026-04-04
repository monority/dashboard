import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useGlobalSearch: vi.fn(() => ({ results: [], isLoading: false })),
}));

import { useGlobalSearch } from '@/hooks';
import { uiStore } from '@/stores';
import type { GlobalSearchResult } from '@/types';

import { Header } from './Header';

const renderHeader = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>,
  );

const MOCK_RESULTS: GlobalSearchResult[] = [
  {
    id: 'r1',
    label: 'Tableau de bord',
    description: "Vue d'ensemble",
    route: '/dashboard',
    kind: 'section',
  },
  {
    id: 'r2',
    label: 'Section Mail',
    description: 'Boite de reception',
    route: '/mail',
    kind: 'section',
  },
];

afterEach(() => {
  vi.mocked(useGlobalSearch).mockReturnValue({ results: [], isLoading: false });
});

describe('Header', () => {
  it('affiche le bouton Menu', () => {
    renderHeader();

    expect(
      screen.getByRole('button', { name: 'Ouvrir ou fermer la barre laterale' }),
    ).toBeInTheDocument();
  });

  it('affiche le fil d ariane avec Espace de travail', () => {
    renderHeader('/dashboard');

    const breadcrumb = screen.getByRole('navigation', { name: "Fil d'ariane" });
    expect(breadcrumb).toBeInTheDocument();
    expect(breadcrumb).toHaveTextContent('Espace de travail');
  });

  it('affiche le label de section correspondant a la route active', () => {
    renderHeader('/mail');

    expect(screen.getByRole('navigation', { name: "Fil d'ariane" })).toHaveTextContent('Mail');
  });

  it('affiche le champ de recherche globale', () => {
    renderHeader();

    expect(screen.getByRole('combobox', { name: 'Recherche globale' })).toBeInTheDocument();
  });

  it('affiche le message par defaut dans la zone de statut', () => {
    renderHeader();

    expect(
      screen.getByText('Saisis une recherche dans les sections et les donnees du tableau de bord.'),
    ).toBeInTheDocument();
  });

  it('bascule le store au clic sur le bouton Menu', async () => {
    const initial = uiStore.getState().isSidebarOpen;
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Ouvrir ou fermer la barre laterale' }));

    expect(uiStore.getState().isSidebarOpen).toBe(!initial);
    uiStore.setState({ isSidebarOpen: initial });
  });

  it('affiche les resultats quand le mock retourne des donnees et l input est focus', async () => {
    vi.mocked(useGlobalSearch).mockReturnValue({ results: MOCK_RESULTS, isLoading: false });
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('combobox', { name: 'Recherche globale' }));

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    // Cherche les labels DANS le listbox pour eviter le conflit avec le breadcrumb
    expect(within(listbox).getByText('Tableau de bord')).toBeInTheDocument();
    expect(within(listbox).getByText('Section Mail')).toBeInTheDocument();
  });

  it('ferme la liste de resultats apres Escape', async () => {
    vi.mocked(useGlobalSearch).mockReturnValue({ results: MOCK_RESULTS, isLoading: false });
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('combobox', { name: 'Recherche globale' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('affiche Aucun resultat quand la recherche ne retourne rien et l input est focus', async () => {
    vi.mocked(useGlobalSearch).mockReturnValue({ results: [], isLoading: false });
    const user = userEvent.setup();
    renderHeader();

    const input = screen.getByRole('combobox', { name: 'Recherche globale' });
    await user.click(input);
    await user.type(input, 'zzz');

    expect(screen.getByText('Aucun resultat correspondant.')).toBeInTheDocument();
  });
});
