export interface ReviewSummary {
  totalReviews: number;
  totalGrowthPercent: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  totalSpend: string;
  totalReviews: number;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
  favorite: boolean;
}

export interface ReviewsData {
  summary: ReviewSummary;
  items: ReviewItem[];
}
