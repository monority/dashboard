import { DASHBOARD_RANGES, DASHBOARD_TEAMS } from '../types';
import type {
  DashboardActivityItem,
  DashboardAlert,
  DashboardFilters,
  DashboardGoal,
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

let revenueKpi = { value: 45000, trendPercent: 2.3 };

let dynamicKpis = [
  { id: 'revenue', label: "Chiffre d'affaires total", value: 45000, trendPercent: 2.3 },
  { id: 'subscriptions', label: 'Abonnements', value: 2350, trendPercent: 1.8 },
  { id: 'sales', label: 'Ventes', value: 12500, trendPercent: -0.5 },
  { id: 'active', label: 'Utilisateurs actifs', value: 125, trendPercent: 3.2 },
];

const BASE_TREND: DashboardTrendPoint[] = [
  { label: 'S1', value: 38500 },
  { label: 'S2', value: 39200 },
  { label: 'S3', value: 40100 },
  { label: 'S4', value: 41500 },
  { label: 'S5', value: 42800 },
  { label: 'S6', value: 43900 },
  { label: 'S7', value: 44800 },
  { label: 'S8', value: 45200 },
  { label: 'S9', value: 46100 },
  { label: 'S10', value: 47200 },
  { label: 'S11', value: 47900 },
  { label: 'S12', value: 48500 },
];

let currentTrend: DashboardTrendPoint[] = [...BASE_TREND];

setInterval(() => {
  const variation = (Math.random() - 0.48) * 0.01;
  const newRevenue = Math.max(35000, revenueKpi.value * (1 + variation));
  revenueKpi = {
    value: Math.round(newRevenue),
    trendPercent:
      Math.round(
        Math.max(-10, Math.min(10, revenueKpi.trendPercent * 0.6 + variation * 100 * 0.4)) * 10,
      ) / 10,
  };

  currentTrend = currentTrend.map((point) => ({
    ...point,
    value: Math.round(point.value * (1 + (Math.random() - 0.48) * 0.008)),
  }));
  const lastPoint = currentTrend[currentTrend.length - 1];
  if (lastPoint) {
    const idx = currentTrend.indexOf(lastPoint);
    currentTrend[idx] = { label: lastPoint.label, value: revenueKpi.value };
  }

  dynamicKpis = [
    {
      id: 'revenue',
      label: "Chiffre d'affaires total",
      value: revenueKpi.value,
      trendPercent: revenueKpi.trendPercent,
    },
    ...dynamicKpis.slice(1).map((kpi) => ({
      ...kpi,
      value: Math.round(Math.max(0, kpi.value * (1 + (Math.random() - 0.48) * 0.02))),
      trendPercent:
        Math.round(
          Math.max(-15, Math.min(15, kpi.trendPercent * 0.7 + (Math.random() - 0.48) * 50)) * 10,
        ) / 10,
    })),
  ];
}, 3000);

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

  return currentTrend.slice(-points);
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

  const formattedKpis = dynamicKpis.map((kpi) => ({
    ...kpi,
    value:
      kpi.id === 'revenue'
        ? `${kpi.value.toLocaleString('fr-FR')} €`
        : kpi.value.toLocaleString('fr-FR'),
  }));

  return {
    kpis: formattedKpis,
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
