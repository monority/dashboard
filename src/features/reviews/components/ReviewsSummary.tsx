import { Badge, Card, Skeleton } from '@/components/ui';

import { REVIEWS_COPY } from '../display';
import type { ReviewSummary } from '../types';

const REVIEW_SCORES = [5, 4, 3, 2, 1] as const;

interface ReviewsSummaryProps {
  summary: ReviewSummary | null;
  isLoading: boolean;
}

export const ReviewsSummary = ({ summary, isLoading }: ReviewsSummaryProps) => {
  if (isLoading || !summary) {
    return (
      <Card>
        <div className="reviews-summary-skeleton" aria-hidden="true">
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="reviews-summary-grid">
        <div>
          <h3>{REVIEWS_COPY.summaryTotal}</h3>
          <p>{summary.totalReviews.toLocaleString()}</p>
          <Badge label={`${summary.totalGrowthPercent}%`} variant="success" />
        </div>
        <div>
          <h3>{REVIEWS_COPY.summaryAverage}</h3>
          <p>{summary.averageRating.toFixed(1)}</p>
          <span
            className="reviews-stars"
            aria-label={REVIEWS_COPY.summaryAria(summary.averageRating)}
          >
            {'★'.repeat(Math.round(summary.averageRating))}
            {'☆'.repeat(5 - Math.round(summary.averageRating))}
          </span>
        </div>
      </div>

      <div className="reviews-distribution">
        {REVIEW_SCORES.map((score) => {
          const value = summary.ratingDistribution[score];
          const max = Math.max(...Object.values(summary.ratingDistribution));
          const widthPercent = max === 0 ? 0 : (value / max) * 100;

          return (
            <div key={score} className="reviews-distribution-row">
              <span>{score}</span>
              <div className="reviews-distribution-bar-track">
                <div className="reviews-distribution-bar" style={{ width: `${widthPercent}%` }} />
              </div>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
