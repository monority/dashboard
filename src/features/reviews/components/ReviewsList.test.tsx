import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { ReviewItem } from '../types';

import { ReviewsList } from './ReviewsList';

const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Alice Moreau',
    totalSpend: '240 €',
    totalReviews: 5,
    rating: 5,
    date: '2026-03-10T08:00:00Z',
    text: 'Excellent service, tres satisfaite.',
    favorite: true,
  },
  {
    id: 'r2',
    name: 'Bruno Petit',
    totalSpend: '89 €',
    totalReviews: 2,
    rating: 3,
    date: '2026-03-15T14:00:00Z',
    text: 'Correct mais peut mieux faire.',
    favorite: false,
  },
];

describe('ReviewsList', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<ReviewsList items={[]} isLoading={true} />);

    expect(container.querySelector('.reviews-list-skeleton')).toBeInTheDocument();
  });

  it('affiche les noms des auteurs des avis', () => {
    render(<ReviewsList items={REVIEWS} isLoading={false} />);

    expect(screen.getByText('Alice Moreau')).toBeInTheDocument();
    expect(screen.getByText('Bruno Petit')).toBeInTheDocument();
  });

  it('affiche les textes des avis', () => {
    render(<ReviewsList items={REVIEWS} isLoading={false} />);

    expect(screen.getByText('Excellent service, tres satisfaite.')).toBeInTheDocument();
    expect(screen.getByText('Correct mais peut mieux faire.')).toBeInTheDocument();
  });

  it('affiche le badge Favori uniquement pour les favoris', () => {
    render(<ReviewsList items={REVIEWS} isLoading={false} />);

    const favorites = screen.getAllByText('Favori');
    expect(favorites).toHaveLength(1);
  });

  it('affiche les etoiles avec le bon aria-label', () => {
    render(<ReviewsList items={REVIEWS} isLoading={false} />);

    expect(screen.getByLabelText('5 etoiles')).toBeInTheDocument();
    expect(screen.getByLabelText('3 etoiles')).toBeInTheDocument();
  });

  it('filtre les avis par nom au fil de la saisie', async () => {
    const user = userEvent.setup();
    render(<ReviewsList items={REVIEWS} isLoading={false} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'Alice');

    await waitFor(() => {
      expect(screen.queryByText('Bruno Petit')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Alice Moreau')).toBeInTheDocument();
  });
});
