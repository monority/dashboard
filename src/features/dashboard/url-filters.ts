import { DASHBOARD_RANGES, DASHBOARD_TEAMS } from './types';
import type { DashboardFilters } from './types';

export const DEFAULT_DASHBOARD_FILTERS: DashboardFilters = {
  range: '30d',
  team: 'all',
  search: '',
};

export const parseDashboardFilters = (searchParams: URLSearchParams): DashboardFilters => {
  const nextRangeRaw = searchParams.get('range');
  const nextTeamRaw = searchParams.get('team');
  const nextSearch = searchParams.get('search') ?? '';

  const nextRange = DASHBOARD_RANGES.includes(nextRangeRaw as DashboardFilters['range'])
    ? (nextRangeRaw as DashboardFilters['range'])
    : DEFAULT_DASHBOARD_FILTERS.range;

  const nextTeam = DASHBOARD_TEAMS.includes(nextTeamRaw as DashboardFilters['team'])
    ? (nextTeamRaw as DashboardFilters['team'])
    : DEFAULT_DASHBOARD_FILTERS.team;

  return {
    range: nextRange,
    team: nextTeam,
    search: nextSearch,
  };
};

export const buildDashboardSearchParams = (filters: DashboardFilters): URLSearchParams => {
  const nextParams = new URLSearchParams();
  nextParams.set('range', filters.range);
  nextParams.set('team', filters.team);

  if (filters.search.trim()) {
    nextParams.set('search', filters.search);
  }

  return nextParams;
};
