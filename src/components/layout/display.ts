import { APP_ROUTES } from '@/utils';

export const LAYOUT_ROUTE_LABELS: Record<string, string> = {
  [APP_ROUTES.dashboard]: 'Tableau de bord',
  [APP_ROUTES.mail]: 'Mail',
  [APP_ROUTES.order]: 'Commandes',
  [APP_ROUTES.task]: 'Taches',
  [APP_ROUTES.reviews]: 'Avis',
  [APP_ROUTES.support]: 'Support',
  [APP_ROUTES.settings]: 'Parametres',
};

export const LAYOUT_NAV_ITEMS = [
  {
    label: 'Tableau de bord',
    to: APP_ROUTES.dashboard,
    description: "Vue d'ensemble et KPIs",
    code: 'DB',
    shortcut: 'G D',
  },
  {
    label: 'Mail',
    to: APP_ROUTES.mail,
    description: 'Boite de reception et fils',
    code: 'ML',
    shortcut: 'G M',
  },
  {
    label: 'Commandes',
    to: APP_ROUTES.order,
    description: 'Pipeline et partage',
    code: 'OR',
    shortcut: 'G O',
  },
  {
    label: 'Taches',
    to: APP_ROUTES.task,
    description: 'Charge et statuts',
    code: 'TK',
    shortcut: 'G T',
  },
  {
    label: 'Avis',
    to: APP_ROUTES.reviews,
    description: 'Qualite des retours',
    code: 'RV',
    shortcut: 'G R',
  },
  {
    label: 'Support',
    to: APP_ROUTES.support,
    description: 'SLA et historique',
    code: 'SP',
    shortcut: 'G S',
  },
  {
    label: 'Parametres',
    to: APP_ROUTES.settings,
    description: "Preferences de l'espace",
    code: 'ST',
    shortcut: 'G P',
  },
] as const;

export const LAYOUT_COPY = {
  searchLoading: 'Recherche des resultats en cours.',
  searchIdle: 'Saisis une recherche dans les sections et les donnees du tableau de bord.',
  workspace: 'Espace de travail',
  searchPlaceholder: 'Rechercher une page, un outil, une vue',
  searchEmpty: 'Aucun resultat correspondant.',
  searchInProgress: 'Recherche...',
  sidebarTitle: 'Hub admin',
  sidebarSubtitle: 'Centre de pilotage',
  sidebarOpen: 'Ouvrir la navigation',
  sidebarCollapse: 'Replier la navigation',
} as const;
