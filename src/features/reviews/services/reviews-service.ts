import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

import type { ReviewItem, ReviewsData } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'review-1',
    name: 'Alice Dupont',
    totalSpend: 'EUR 1,250',
    totalReviews: 12,
    rating: 5,
    date: '2026-03-12T10:20:00Z',
    text: 'Excellent service. La livraison a ete rapide et la prise en main du tableau de bord a ete claire pour toute notre equipe.',
    favorite: false,
  },
  {
    id: 'review-2',
    name: 'Jean Martin',
    totalSpend: 'EUR 320',
    totalReviews: 3,
    rating: 4,
    date: '2026-03-06T08:45:00Z',
    text: 'Tres bon rapport valeur et des fonctionnalites utiles. Les outils de filtrage nous ont fait gagner beaucoup de temps operationnel.',
    favorite: true,
  },
  {
    id: 'review-3',
    name: 'Sophie Bernard',
    totalSpend: 'EUR 2,100',
    totalReviews: 20,
    rating: 5,
    date: '2026-02-25T12:10:00Z',
    text: 'Solution fiable dans la duree avec un support solide. Nous utilisons le tableau de bord tous les jours sans friction.',
    favorite: false,
  },
  {
    id: 'review-4',
    name: 'Lucas Petit',
    totalSpend: 'EUR 150',
    totalReviews: 1,
    rating: 3,
    date: '2026-02-12T16:35:00Z',
    text: 'Base solide, mais il nous manque encore quelques exports avances pour le reporting mensuel.',
    favorite: false,
  },
];

const REVIEWS_DATA: ReviewsData = {
  summary: {
    totalReviews: 5000,
    totalGrowthPercent: 21,
    averageRating: 4.5,
    ratingDistribution: {
      5: 400,
      4: 200,
      3: 120,
      2: 80,
      1: 50,
    },
  },
  items: REVIEW_ITEMS,
};

export const reviewsService = {
  async getReviewsData(): Promise<ReviewsData> {
    await wait(240);
    return REVIEWS_DATA;
  },

  async search(query: string): Promise<GlobalSearchResult[]> {
    await wait(100);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return REVIEW_ITEMS.filter((item) =>
      [item.name, item.text, item.totalSpend, String(item.rating)]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
      .slice(0, 3)
      .map((item) => ({
        id: `review-${item.id}`,
        label: item.name,
        description: `${item.rating}/5 - ${item.totalSpend}`,
        route: APP_ROUTES.reviews,
        kind: 'review',
      }));
  },
};
