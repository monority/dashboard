import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/support/hooks', () => ({
  useSupportData: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('./SupportTicketForm', () => ({
  SupportTicketForm: () => <div data-testid="ticket-form" />,
}));

vi.mock('./SupportStats', () => ({
  SupportStats: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="support-stats" data-loading={isLoading} />
  ),
}));

vi.mock('./SupportFaq', () => ({
  SupportFaq: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="support-faq" data-loading={isLoading} />
  ),
}));

vi.mock('./SupportHistory', () => ({
  SupportHistory: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="support-history" data-loading={isLoading} />
  ),
}));

import { useSupportData } from '@/features/support/hooks';

import { SupportPage } from './SupportPage';

const renderPage = () => render(<SupportPage />);

describe('SupportPage', () => {
  it('affiche le titre de la page', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Support' })).toBeInTheDocument();
  });

  it('affiche tous les sous-composants', () => {
    renderPage();
    expect(screen.getByTestId('ticket-form')).toBeInTheDocument();
    expect(screen.getByTestId('support-stats')).toBeInTheDocument();
    expect(screen.getByTestId('support-faq')).toBeInTheDocument();
    expect(screen.getByTestId('support-history')).toBeInTheDocument();
  });

  it('propage isLoading=true aux sous-composants', () => {
    vi.mocked(useSupportData).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useSupportData>);
    renderPage();
    expect(screen.getByTestId('support-stats')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('support-faq')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('support-history')).toHaveAttribute('data-loading', 'true');
  });
});
