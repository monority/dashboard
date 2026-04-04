import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ReviewSummary } from '../types';

import { ReviewsSummary } from './ReviewsSummary';

const SUMMARY: ReviewSummary = {
  totalReviews: 1284,
  totalGrowthPercent: 8,
  averageRating: 4.3,
  ratingDistribution: {
    5: 620,
    4: 390,
    3: 150,
    2: 80,
    1: 44,
  },
};

describe('ReviewsSummary', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<ReviewsSummary summary={null} isLoading={true} />);

    expect(container.querySelector('.reviews-summary-skeleton')).toBeInTheDocument();
  });

  it('affiche un skeleton quand summary est null sans chargement', () => {
    const { container } = render(<ReviewsSummary summary={null} isLoading={false} />);

    expect(container.querySelector('.reviews-summary-skeleton')).toBeInTheDocument();
  });

  it('affiche les libelles Total des avis et Note moyenne', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    expect(screen.getByText('Total des avis')).toBeInTheDocument();
    expect(screen.getByText('Note moyenne')).toBeInTheDocument();
  });

  it('affiche le total des avis formate et la note moyenne', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    // toLocaleString() produit un format dependant de la locale jsdom (ex: "1,284")
    // on verifie la presence du chiffre sans figer le separateur
    expect(screen.getByText(/1.?284/)).toBeInTheDocument();
    expect(screen.getByText('4.3')).toBeInTheDocument();
  });

  it('affiche le badge de croissance', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    expect(screen.getByText('8%')).toBeInTheDocument();
  });

  it('affiche l aria-label des etoiles de la note moyenne', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    expect(screen.getByLabelText('Note 4.3 sur 5')).toBeInTheDocument();
  });

  it('affiche une ligne de distribution pour chaque score de 1 a 5', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    // Les scores 5, 4, 3, 2, 1 apparaissent comme labels dans la distribution
    for (const score of [5, 4, 3, 2, 1]) {
      expect(screen.getByText(String(score))).toBeInTheDocument();
    }
  });

  it('affiche les comptages de la distribution', () => {
    render(<ReviewsSummary summary={SUMMARY} isLoading={false} />);

    expect(screen.getByText('620')).toBeInTheDocument();
    expect(screen.getByText('44')).toBeInTheDocument();
  });
});
