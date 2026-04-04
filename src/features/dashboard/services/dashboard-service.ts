import { DASHBOARD_RANGES, DASHBOARD_TEAMS } from '../types';
import type {
  DashboardActivityItem,
  DashboardAlert,
  DashboardFilters,
  DashboardGoal,
  DashboardKpi,
  DashboardOverview,
  DashboardRange,
  DashboardTeam,
  DashboardTrendPoint,
} from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RANGE_POINT_COUNT: Record<DashboardRange, number> = {
  '7d': 7,
  '30d': 10,
  '90d': 12,
};

const BASE_KPIS: DashboardKpi[] = [
  { id: 'revenue', label: "Chiffre d'affaires total", value: '45 000 €', trendPercent: 20.3 },
  { id: 'subscriptions', label: 'Abonnements', value: '2 350', trendPercent: 11.7 },
  { id: 'sales', label: 'Ventes', value: '12 500', trendPercent: 5.7 },
  { id: 'active', label: 'Utilisateurs actifs', value: '125', trendPercent: 4.5 },
];

const BASE_TREND: DashboardTrendPoint[] = [
  { label: 'W1', value: 21000 },
  { label: 'W2', value: 22400 },
  { label: 'W3', value: 21800 },
  { label: 'W4', value: 23600 },
  { label: 'W5', value: 24100 },
  { label: 'W6', value: 24750 },
  { label: 'W7', value: 25200 },
  { label: 'W8', value: 26800 },
  { label: 'W9', value: 27400 },
  { label: 'W10', value: 28700 },
  { label: 'W11', value: 29450 },
  { label: 'W12', value: 30600 },
];

const BASE_ACTIVITIES: DashboardActivityItem[] = [
  {
    id: 'act-1',
    title: 'Nouvel export de facturation genere',
    meta: 'Equipe Finance - rapport T2',
    team: 'Finance',
    date: '2026-04-03T09:10:00Z',
  },
  {
    id: 'act-2',
    title: 'Amelioration du SLA de reponse support',
    meta: 'Equipe Support - 92 % de moyenne',
    team: 'Support',
    date: '2026-04-02T17:25:00Z',
  },
  {
    id: 'act-3',
    title: 'Matrice de permissions mise a jour',
    meta: 'Equipe Operations - 8 roles revus',
    team: 'Operations',
    date: '2026-04-02T11:40:00Z',
  },
  {
    id: 'act-4',
    title: 'Experience cohortes retention livree',
    meta: "Equipe Produit - etape d'onboarding A/B",
    team: 'Product',
    date: '2026-04-01T13:15:00Z',
  },
];

const BASE_ALERTS: DashboardAlert[] = [
  {
    id: 'alert-1',
    severity: 'warning',
    title: 'Hausse du taux de retry sur la synchro facturation',
    description: 'Les retries API ont atteint 4,6 % sur les 2 dernieres heures.',
    team: 'Finance',
  },
  {
    id: 'alert-2',
    severity: 'danger',
    title: 'Backlog support au-dessus du seuil',
    description: 'Les tickets ouverts depassent la cible de 18 %.',
    team: 'Support',
  },
  {
    id: 'alert-3',
    severity: 'info',
    title: "La fenetre d'audit RBAC demarre demain",
    description: 'Prepare la validation proprietaire pour tous les roles admin.',
    team: 'Operations',
  },
];

const BASE_GOALS: DashboardGoal[] = [
  {
    id: 'goal-1',
    label: 'Revenu mensuel recurrent',
    current: 45000,
    target: 50000,
    unit: 'EUR',
    team: 'Finance',
  },
  {
    id: 'goal-2',
    label: 'SLA premiere reponse support',
    current: 89,
    target: 95,
    unit: '%',
    team: 'Support',
  },
  {
    id: 'goal-3',
    label: 'Score qualite release admin',
    current: 82,
    target: 90,
    unit: '%',
    team: 'Operations',
  },
];

const normalizeSearch = (search: string) => search.trim().toLowerCase().slice(0, 80);

const normalizeRange = (range: string): DashboardRange => {
  return DASHBOARD_RANGES.includes(range as DashboardRange) ? (range as DashboardRange) : '30d';
};

const normalizeTeam = (team: string): DashboardTeam => {
  return DASHBOARD_TEAMS.includes(team as DashboardTeam) ? (team as DashboardTeam) : 'all';
};

const normalizeFilters = (filters: DashboardFilters): DashboardFilters => {
  return {
    range: normalizeRange(filters.range),
    team: normalizeTeam(filters.team),
    search: normalizeSearch(filters.search),
  };
};

const includesSearch = (values: string[], search: string) => {
  if (!search) {
    return true;
  }

  return values.join(' ').toLowerCase().includes(search);
};

const applyTeamFilter = <TItem extends { team: Exclude<DashboardTeam, 'all'> }>(
  items: TItem[],
  team: DashboardTeam,
) => {
  if (team === 'all') {
    return items;
  }

  return items.filter((item) => item.team === team);
};

const toSafeTimestamp = (date: string) => {
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getTrendForRange = (range: DashboardRange) => {
  const points = RANGE_POINT_COUNT[range];

  return BASE_TREND.slice(-points);
};

const buildOverview = (filters: DashboardFilters): DashboardOverview => {
  const teamFilteredActivities = applyTeamFilter(BASE_ACTIVITIES, filters.team).filter((activity) =>
    includesSearch([activity.title, activity.meta], filters.search),
  );

  const teamFilteredAlerts = applyTeamFilter(BASE_ALERTS, filters.team).filter((alert) =>
    includesSearch([alert.title, alert.description], filters.search),
  );

  const teamFilteredGoals = applyTeamFilter(BASE_GOALS, filters.team).filter((goal) =>
    includesSearch([goal.label, goal.unit], filters.search),
  );

  return {
    kpis: BASE_KPIS,
    trend: getTrendForRange(filters.range),
    alerts: teamFilteredAlerts,
    goals: teamFilteredGoals,
    activities: teamFilteredActivities.sort(
      (a, b) => toSafeTimestamp(b.date) - toSafeTimestamp(a.date),
    ),
    appliedFilters: filters,
  };
};

export const dashboardService = {
  async getOverview(rawFilters: DashboardFilters): Promise<DashboardOverview> {
    await wait(220);

    const normalizedFilters = normalizeFilters(rawFilters);

    return buildOverview(normalizedFilters);
  },
};
