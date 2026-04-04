import { REVIEWS_COPY } from '../display';
import { useReviewsData } from '../hooks';

import { ReviewsList } from './ReviewsList';
import { ReviewsSummary } from './ReviewsSummary';
import './reviews-page.css';

export const ReviewsPage = () => {
  const { data, isLoading } = useReviewsData();

  return (
    <section className="reviews-page">
      <header>
        <h1>{REVIEWS_COPY.pageTitle}</h1>
        <p>{REVIEWS_COPY.pageDescription}</p>
      </header>

      <ReviewsSummary summary={data?.summary ?? null} isLoading={isLoading} />
      <ReviewsList items={data?.items ?? []} isLoading={isLoading} />
    </section>
  );
};
