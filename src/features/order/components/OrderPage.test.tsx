import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/order/hooks', () => ({
  useOrderOverview: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('./OrderKpiGrid', () => ({
  OrderKpiGrid: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="kpi-grid" data-loading={isLoading} />
  ),
}));

vi.mock('./OrderSharePanel', () => ({
  OrderSharePanel: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="share-panel" data-loading={isLoading} />
  ),
}));

vi.mock('./OrderCollaborators', () => ({
  OrderCollaborators: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="collaborators" data-loading={isLoading} />
  ),
}));

import { useOrderOverview } from '@/features/order/hooks';

import { OrderPage } from './OrderPage';

const renderPage = () => render(<OrderPage />);

describe('OrderPage', () => {
  it('affiche le titre de la page', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Commandes' })).toBeInTheDocument();
  });

  it('affiche les sous-composants', () => {
    renderPage();
    expect(screen.getByTestId('kpi-grid')).toBeInTheDocument();
    expect(screen.getByTestId('share-panel')).toBeInTheDocument();
    expect(screen.getByTestId('collaborators')).toBeInTheDocument();
  });

  it('propage isLoading=true aux sous-composants', () => {
    vi.mocked(useOrderOverview).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useOrderOverview>);
    renderPage();
    expect(screen.getByTestId('kpi-grid')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('share-panel')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('collaborators')).toHaveAttribute('data-loading', 'true');
  });
});
