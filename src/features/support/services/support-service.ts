import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

import type { SupportDashboardData } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_SUPPORT_DATA: SupportDashboardData = {
  stats: {
    issuesThisMonth: 153,
    issuesGrowthPercent: 10,
    issuesSolved: 55,
    avgResponseTimePercent: 92,
    responseDeltaPercent: -2,
    clientSatisfactionPercent: 90,
    satisfactionGrowthPercent: 10,
    openTickets: 204,
  },
  faq: [
    {
      id: 'faq-1',
      title: 'Comment reinitialiser mon mot de passe ?',
      content:
        "Va sur la page de connexion puis selectionne 'Mot de passe oublie'. Suis ensuite les instructions recues par email.",
    },
    {
      id: 'faq-2',
      title: 'Ou trouver mes factures ?',
      content:
        'Les factures sont disponibles dans la section Facturation. Chaque facture peut etre exportee en PDF depuis le panneau de details.',
    },
    {
      id: 'faq-3',
      title: 'Comment contacter le support technique ?',
      content: "Cree un ticket depuis cette page ou ecris a support@example.com en cas d'urgence.",
    },
    {
      id: 'faq-4',
      title: "Puis-je changer d'offre a tout moment ?",
      content:
        "Oui, les changements d'offre sont disponibles a tout moment depuis Parametres > Offre.",
    },
  ],
  history: [
    {
      id: 'history-1',
      subject: 'Impossible de se connecter',
      type: 'technical',
      date: '2026-03-10T10:00:00Z',
      status: 'Resolved',
    },
    {
      id: 'history-2',
      subject: 'Demande de facture pour mars',
      type: 'billing',
      date: '2026-03-08T08:30:00Z',
      status: 'Resolved',
    },
    {
      id: 'history-3',
      subject: 'Suggestion : tables compactes',
      type: 'feature',
      date: '2026-03-03T14:15:00Z',
      status: 'Closed',
    },
    {
      id: 'history-4',
      subject: 'Comment supprimer un compte ?',
      type: 'other',
      date: '2026-02-28T09:20:00Z',
      status: 'Answered',
    },
  ],
};

export const supportService = {
  async getDashboardData(): Promise<SupportDashboardData> {
    await wait(280);
    return MOCK_SUPPORT_DATA;
  },

  async search(query: string): Promise<GlobalSearchResult[]> {
    await wait(110);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const faqResults = MOCK_SUPPORT_DATA.faq
      .filter((item) =>
        [item.title, item.content].join(' ').toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 2)
      .map((item) => ({
        id: `support-faq-${item.id}`,
        label: item.title,
        description: 'FAQ support',
        route: APP_ROUTES.support,
        kind: 'support' as const,
      }));

    const historyResults = MOCK_SUPPORT_DATA.history
      .filter((item) =>
        [item.subject, item.type, item.status].join(' ').toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 2)
      .map((item) => ({
        id: `support-history-${item.id}`,
        label: item.subject,
        description: `${item.type} - ${item.status}`,
        route: APP_ROUTES.support,
        kind: 'support' as const,
      }));

    return [...faqResults, ...historyResults].slice(0, 3);
  },
};
