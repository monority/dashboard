export interface BillingFilters {
  fromDate?: string;
  toDate?: string;
  status?: 'paid' | 'pending' | 'failed';
}
