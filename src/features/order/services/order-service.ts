import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

import type { OrderOverview } from '../types';

const ROLE_LABELS = {
  Owner: 'Proprietaire',
  Editor: 'Editeur',
  Viewer: 'Lecteur',
} as const;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_ORDER_OVERVIEW: OrderOverview = {
  kpis: [
    { key: 'revenue', title: "Chiffre d'affaires total", value: '45 000 €', deltaPercent: 20.3 },
    { key: 'subscriptions', title: 'Abonnements', value: '2 350', deltaPercent: 11.7 },
    { key: 'sales', title: 'Ventes', value: '12 500', deltaPercent: 5.7 },
    { key: 'active', title: 'Actifs maintenant', value: '125', deltaPercent: 4.5 },
  ],
  documentUrl: 'https://example.com/order-report/q2',
  collaborators: [
    { id: 'collab-1', name: 'John Doe', email: 'john.doe@example.com', role: 'Owner' },
    { id: 'collab-2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
    { id: 'collab-3', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Viewer' },
    { id: 'collab-4', name: 'Marc Devis', email: 'marc.devis@example.com', role: 'Viewer' },
  ],
};

export const orderService = {
  async getOverview(): Promise<OrderOverview> {
    await wait(260);
    return MOCK_ORDER_OVERVIEW;
  },

  async search(query: string): Promise<GlobalSearchResult[]> {
    await wait(100);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return MOCK_ORDER_OVERVIEW.collaborators
      .filter((item) =>
        [item.name, item.email, item.role].join(' ').toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 3)
      .map((item) => ({
        id: `order-collaborator-${item.id}`,
        label: item.name,
        description: `${ROLE_LABELS[item.role]} - ${item.email}`,
        route: APP_ROUTES.order,
        kind: 'order',
      }));
  },
};
