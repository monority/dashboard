export const DASHBOARD_RANGES = ['7d', '30d', '90d'] as const;
export const DASHBOARD_TEAMS = ['all', 'Operations', 'Finance', 'Support', 'Product'] as const;

export type DashboardRange = (typeof DASHBOARD_RANGES)[number];
export type DashboardTeam = (typeof DASHBOARD_TEAMS)[number];

export interface DashboardKpi {
  id: string;
  label: string;
  value: string;
  trendPercent: number;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  meta: string;
  team: Exclude<DashboardTeam, 'all'>;
  date: string;
}

export interface DashboardAlert {
  id: string;
  severity: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  team: Exclude<DashboardTeam, 'all'>;
}

export interface DashboardGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  team: Exclude<DashboardTeam, 'all'>;
}

export interface DashboardTrendPoint {
  label: string;
  value: number;
}

export interface DashboardFilters {
  range: DashboardRange;
  team: DashboardTeam;
  search: string;
}

export interface DashboardOverview {
  kpis: DashboardKpi[];
  trend: DashboardTrendPoint[];
  alerts: DashboardAlert[];
  goals: DashboardGoal[];
  activities: DashboardActivityItem[];
  appliedFilters: DashboardFilters;
}
