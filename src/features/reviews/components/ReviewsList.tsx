import { useMemo, useState } from 'react';

import { Badge, Button, Card, Input, Skeleton } from '@/components/ui';
import { debounce } from '@/utils/debounce';

import { formatReviewsDate, REVIEWS_COPY } from '../display';
import type { ReviewItem } from '../types';

interface ReviewsListProps {
  items: ReviewItem[];
  isLoading: boolean;
}

export const ReviewsList = ({ items, isLoading }: ReviewsListProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const updateDebouncedSearch = useMemo(
    () =>
      debounce<[string]>((nextValue) => {
        setDebouncedSearch(nextValue);
      }, 220),
    [],
  );

  const filteredItems = useMemo(() => {
    const normalized = debouncedSearch.trim().toLowerCase();

    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      return [item.name, item.text, item.totalSpend].join(' ').toLowerCase().includes(normalized);
    });
  }, [debouncedSearch, items]);

  if (isLoading) {
    return (
      <Card>
        <div className="reviews-list-skeleton" aria-hidden="true">
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="reviews-list-header">
        <h2>{REVIEWS_COPY.listTitle}</h2>
        <Input
          type="search"
          label={REVIEWS_COPY.filterLabel}
          placeholder={REVIEWS_COPY.filterPlaceholder}
          value={search}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setSearch(nextValue);
            updateDebouncedSearch(nextValue);
          }}
        />
      </div>

      <ul className="reviews-list">
        {filteredItems.map((review) => (
          <li key={review.id} className="reviews-item">
            <header className="reviews-item-header">
              <strong>{review.name}</strong>
              <span>{formatReviewsDate(review.date)}</span>
            </header>

            <div className="reviews-item-meta">
              <Badge label={REVIEWS_COPY.spend(review.totalSpend)} variant="info" />
              <Badge label={REVIEWS_COPY.reviews(review.totalReviews)} variant="warning" />
              {review.favorite ? <Badge label={REVIEWS_COPY.favorite} variant="success" /> : null}
            </div>

            <p>{review.text}</p>

            <footer className="reviews-item-footer">
              <span className="reviews-stars" aria-label={REVIEWS_COPY.starsAria(review.rating)}>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </span>
              <Button variant="ghost">{REVIEWS_COPY.directMessage}</Button>
            </footer>
          </li>
        ))}
      </ul>
    </Card>
  );
};
