import { mailService } from '@/features/mail/services/mail-service';
import { orderService } from '@/features/order/services/order-service';
import { reviewsService } from '@/features/reviews/services/reviews-service';
import { supportService } from '@/features/support/services/support-service';
import { taskService } from '@/features/task/services/task-service';
import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

const SECTION_RESULTS: GlobalSearchResult[] = [
  {
    id: 'section-dashboard',
    label: 'Tableau de bord',
    description: 'KPIs, alertes, objectifs et activite recente',
    route: APP_ROUTES.dashboard,
    kind: 'section',
  },
  {
    id: 'section-mail',
    label: 'Boite mail',
    description: 'Fils, messages et mises a jour internes',
    route: APP_ROUTES.mail,
    kind: 'section',
  },
  {
    id: 'section-order',
    label: 'Commandes',
    description: "Pipeline de commandes et etat d'execution",
    route: APP_ROUTES.order,
    kind: 'section',
  },
  {
    id: 'section-task',
    label: 'Tableau des taches',
    description: 'Charge operationnelle et affectations',
    route: APP_ROUTES.task,
    kind: 'section',
  },
  {
    id: 'section-reviews',
    label: 'Avis',
    description: 'Satisfaction client et tendance des notes',
    route: APP_ROUTES.reviews,
    kind: 'section',
  },
  {
    id: 'section-support',
    label: 'Centre support',
    description: 'SLA, backlog et suivi des reponses',
    route: APP_ROUTES.support,
    kind: 'section',
  },
  {
    id: 'section-settings',
    label: 'Parametres',
    description: 'Preferences, espace de travail et compte',
    route: APP_ROUTES.settings,
    kind: 'section',
  },
];

const normalizeQuery = (value: string) => value.trim().toLowerCase().slice(0, 60);

const withQueryParams = (route: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);

  return `${route}?${searchParams.toString()}`;
};

const rankResults = (results: GlobalSearchResult[], query: string) => {
  if (!query) {
    return results;
  }

  return [...results].sort((left, right) => {
    const leftStartsWith = left.label.toLowerCase().startsWith(query) ? 1 : 0;
    const rightStartsWith = right.label.toLowerCase().startsWith(query) ? 1 : 0;

    return rightStartsWith - leftStartsWith;
  });
};

export const globalSearchService = {
  async search(query: string): Promise<GlobalSearchResult[]> {
    const normalizedQuery = normalizeQuery(query);

    const matchingSections = SECTION_RESULTS.filter((item) => {
      if (!normalizedQuery) {
        return true;
      }

      return [item.label, item.description].join(' ').toLowerCase().includes(normalizedQuery);
    });

    if (!normalizedQuery) {
      return matchingSections.slice(0, 6);
    }

    const [mailResults, taskResults, supportResults, reviewResults, orderResults] =
      await Promise.all([
        mailService.search(normalizedQuery),
        taskService.search(normalizedQuery),
        supportService.search(normalizedQuery),
        reviewsService.search(normalizedQuery),
        orderService.search(normalizedQuery),
      ]);

    const sectionResults = matchingSections.map((item) => {
      if (!normalizedQuery) {
        return item;
      }

      if (item.route === APP_ROUTES.dashboard) {
        return {
          ...item,
          route: withQueryParams(item.route, {
            range: '30d',
            team: 'all',
            search: normalizedQuery,
          }),
        };
      }

      if (item.route === APP_ROUTES.mail) {
        return {
          ...item,
          route: withQueryParams(item.route, {
            folder: 'Inbox',
            search: normalizedQuery,
          }),
        };
      }

      if (item.route === APP_ROUTES.task) {
        return {
          ...item,
          route: withQueryParams(item.route, {
            status: 'all',
            search: normalizedQuery,
          }),
        };
      }

      return item;
    });

    return rankResults(
      [
        ...sectionResults,
        ...mailResults,
        ...taskResults,
        ...supportResults,
        ...reviewResults,
        ...orderResults,
      ].slice(0, 8),
      normalizedQuery,
    );
  },
};
