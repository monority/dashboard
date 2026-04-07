/** Application route paths for navigation */
export const APP_ROUTES = {
  dashboard: '/',
  admin: '/admin',
  login: '/login',
  fetchUrls: '/fetch-urls',
  mail: '/mail',
  order: '/order',
  task: '/task',
  reviews: '/reviews',
  support: '/support',
  settings: '/settings',
} as const;

/**
 * Query keys for TanStack Query cache management.
 * Organized by feature with optional parameters for filtering.
 * Used for cache invalidation and refetching.
 */
export const QUERY_KEYS = {
  users: ['users'] as const,
  billing: ['billing'] as const,
  settings: ['settings'] as const,
  dashboardOverview: (range: string, team: string, search: string) =>
    ['dashboard', 'overview', range, team, search] as const,
  mailThreads: (folder: string, search: string) => ['mail', 'threads', folder, search] as const,
  orderOverview: ['order', 'overview'] as const,
  reviewsData: ['reviews', 'data'] as const,
  supportDashboard: ['support', 'dashboard'] as const,
  tasks: (status: string, search: string) => ['tasks', status, search] as const,
  fetchUrlsHistory: ['fetch-urls', 'history'] as const,
} as const;

/** UI theme options for user preference */
export const UI_THEME = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type UiTheme = (typeof UI_THEME)[keyof typeof UI_THEME];
