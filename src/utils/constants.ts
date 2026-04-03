export const APP_ROUTES = {
    dashboard: '/',
    mail: '/mail',
    order: '/order',
    task: '/task',
    reviews: '/reviews',
    support: '/support',
    settings: '/settings',
} as const;

export const QUERY_KEYS = {
    users: ['users'],
    billing: ['billing'],
    settings: ['settings'],
} as const;

export const UI_THEME = {
    light: 'light',
    dark: 'dark',
    system: 'system',
} as const;

export type UiTheme = (typeof UI_THEME)[keyof typeof UI_THEME];
