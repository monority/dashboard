import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/features/reviews/hooks', () => ({
  useReviewsData: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

vi.mock('./ReviewsSummary', () => ({
  ReviewsSummary: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="reviews-summary" data-loading={isLoading} />
  ),
}));

vi.mock('./ReviewsList', () => ({
  ReviewsList: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="reviews-list" data-loading={isLoading} />
  ),
}));

import { useReviewsData } from '@/features/reviews/hooks';

import { ReviewsPage } from './ReviewsPage';

const renderPage = () => render(<ReviewsPage />);

describe('ReviewsPage', () => {
  it('affiche le titre de la page', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Avis' })).toBeInTheDocument();
  });

  it('affiche les sous-composants', () => {
    renderPage();
    expect(screen.getByTestId('reviews-summary')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });

  it('propage isLoading=true aux sous-composants', () => {
    vi.mocked(useReviewsData).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useReviewsData>);
    renderPage();
    expect(screen.getByTestId('reviews-summary')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('reviews-list')).toHaveAttribute('data-loading', 'true');
  });
});
