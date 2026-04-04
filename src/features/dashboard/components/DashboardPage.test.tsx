import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/features/dashboard/hooks', () => ({
  useDashboardOverview: vi.fn(),
}));

vi.mock('./DashboardFiltersBar', () => ({
  DashboardFiltersBar: () => <div data-testid="filters-bar" />,
}));

vi.mock('./DashboardAlertsPanel', () => ({
  DashboardAlertsPanel: () => <div data-testid="alerts-panel" />,
}));

vi.mock('./DashboardGoalsPanel', () => ({
  DashboardGoalsPanel: () => <div data-testid="goals-panel" />,
}));

vi.mock('./DashboardTrendChart', () => ({
  DashboardTrendChart: () => <div data-testid="trend-chart" />,
}));

import { useDashboardOverview } from '@/features/dashboard/hooks';
import type { DashboardOverview } from '@/features/dashboard/types';

import { DashboardPage } from './DashboardPage';

const MOCK_OVERVIEW: DashboardOverview = {
  kpis: [
    { id: 'k1', label: 'Chiffre affaires', value: '12000', trendPercent: 5.2 },
    { id: 'k2', label: 'Tickets resolus', value: '134', trendPercent: -2.1 },
  ],
  trend: [],
  alerts: [],
  goals: [],
  activities: [
    {
      id: 'a1',
      title: 'Deploiement v2.1',
      meta: 'Branche main',
      team: 'Operations',
      date: '2024-01-15T10:00:00Z',
    },
  ],
  appliedFilters: { range: '30d', team: 'all', search: '' },
};

const makeHookState = (overrides: Record<string, unknown>) =>
  ({
    data: undefined,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
    ...overrides,
  }) as unknown;

const renderPage = () =>
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ isLoading: true }) as ReturnType<typeof useDashboardOverview>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le titre et la description de la page', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Tableau de bord' })).toBeInTheDocument();
    expect(screen.getByText(/Analyse operationnelle/)).toBeInTheDocument();
  });

  it('affiche la barre de filtres', () => {
    renderPage();
    expect(screen.getByTestId('filters-bar')).toBeInTheDocument();
  });

  it('affiche les cartes KPI apres chargement', () => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ data: MOCK_OVERVIEW }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(screen.getByText('Chiffre affaires')).toBeInTheDocument();
    expect(screen.getByText('12000')).toBeInTheDocument();
    expect(screen.getByText('Tickets resolus')).toBeInTheDocument();
  });

  it('affiche un badge de tendance positive', () => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ data: MOCK_OVERVIEW }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(screen.getByText(/5\.2%/)).toBeInTheDocument();
  });

  it("affiche l'etat d'erreur avec alerte", () => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ isError: true }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Impossible de charger/)).toBeInTheDocument();
  });

  it('le bouton Reessayer appelle refetch', async () => {
    const refetch = vi.fn();
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ isError: true, refetch }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Reessayer/i }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('affiche les elements de l activite recente', () => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ data: MOCK_OVERVIEW }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(screen.getByText('Deploiement v2.1')).toBeInTheDocument();
    expect(screen.getByText('Branche main')).toBeInTheDocument();
  });

  it('affiche l etat vide quand il n y a aucune activite', () => {
    const emptyData = { ...MOCK_OVERVIEW, activities: [] };
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ data: emptyData }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(
      screen.getByText('Aucune activite ne correspond aux filtres actuels.'),
    ).toBeInTheDocument();
  });

  it('affiche les sous-composants apres chargement', () => {
    vi.mocked(useDashboardOverview).mockReturnValue(
      makeHookState({ data: MOCK_OVERVIEW }) as ReturnType<typeof useDashboardOverview>,
    );
    renderPage();
    expect(screen.getByTestId('trend-chart')).toBeInTheDocument();
    expect(screen.getByTestId('alerts-panel')).toBeInTheDocument();
    expect(screen.getByTestId('goals-panel')).toBeInTheDocument();
  });
});
