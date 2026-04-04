import { TASK_STATUSES } from './types';
import type { TaskFilters } from './types';

export const DEFAULT_TASK_FILTERS: TaskFilters = {
  status: 'all',
  search: '',
};

export const parseTaskFilters = (searchParams: URLSearchParams): TaskFilters => {
  const nextSearch = searchParams.get('search') ?? '';
  const nextStatusRaw = searchParams.get('status');
  const nextStatus =
    nextStatusRaw === 'all' ||
    TASK_STATUSES.includes(nextStatusRaw as (typeof TASK_STATUSES)[number])
      ? (nextStatusRaw as TaskFilters['status'])
      : DEFAULT_TASK_FILTERS.status;

  return {
    search: nextSearch,
    status: nextStatus ?? DEFAULT_TASK_FILTERS.status,
  };
};

export const buildTaskSearchParams = (filters: TaskFilters): URLSearchParams => {
  const nextParams = new URLSearchParams();
  nextParams.set('status', filters.status);

  if (filters.search.trim()) {
    nextParams.set('search', filters.search);
  }

  return nextParams;
};
