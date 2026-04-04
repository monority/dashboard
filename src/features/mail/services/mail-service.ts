import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

import { MAIL_FOLDER_LABELS } from '../display';
import type { MailFilters, MailThread } from '../types';

const MOCK_THREADS: MailThread[] = [
  {
    id: '1',
    folder: 'Inbox',
    fullName: 'Emma Johnson',
    email: 'emma.johnson@company.com',
    subject: 'Preparation de la revue tableau de bord T2',
    snippet: 'Peut-on planifier la revue parties prenantes pour mardi prochain ?',
    body: 'Bonjour equipe,\n\nPeut-on planifier la revue parties prenantes pour mardi prochain a 14:00 ? Nous devons valider les KPIs, les mises a jour du graphe de retention et finaliser les notes de release pour le deploiement interne.\n\nMerci,\nEmma',
    date: '2026-04-02T10:00:00Z',
    tags: ['New', 'Important'],
    read: false,
  },
  {
    id: '2',
    folder: 'Inbox',
    fullName: 'Platform Alerts',
    email: 'alerts@platform.internal',
    subject: "Synthese hebdomadaire d'usage",
    snippet:
      'Les utilisateurs actifs hebdomadaires ont augmente de 8,4 % par rapport a la semaine derniere.',
    body: "Synthese hebdomadaire :\n- UAH +8,4 %\n- Session moyenne : 36 min\n- Consommation du budget d'erreur : 12 %\n\nAucune action requise.",
    date: '2026-04-01T08:30:00Z',
    tags: ['Newsletter'],
    read: true,
  },
  {
    id: '3',
    folder: 'Inbox',
    fullName: 'Olivia Baker',
    email: 'olivia.baker@company.com',
    subject: "Besoin d'aide sur le comportement responsive du graphe",
    snippet: "Les labels d'axe se chevauchent sous 1280 px. As-tu une recommandation ?",
    body: "Bonjour,\n\nLes labels d'axe du graphe se chevauchent sous 1280 px dans le tableau de bord finance. Peux-tu partager le pattern responsive recommande ?\n\nMerci,\nOlivia",
    date: '2026-03-31T17:42:00Z',
    tags: ['Support', 'Urgent'],
    read: false,
  },
  {
    id: '4',
    folder: 'Archive',
    fullName: 'Sarah Williams',
    email: 'sarah.williams@company.com',
    subject: 'Notes de reunion - backlog admin panel',
    snippet: 'Tu trouveras ci-joint les priorites de backlog pour le sprint 14.',
    body: 'Notes de reunion ci-jointes. Priorites du sprint 14 : notifications, audit des permissions et virtualisation des tableaux pour les gros jeux de donnees.',
    date: '2026-03-20T12:10:00Z',
    tags: ['Important'],
    read: true,
  },
  {
    id: '5',
    folder: 'Sent',
    fullName: 'Marc Devis',
    email: 'marc.devis@company.com',
    subject: 'Re: mise a jour de la doc API',
    snippet:
      "Beau travail, la doc est propre. J'ai ajoute des commentaires sur les endpoints auth.",
    body: "Beau travail, la documentation est propre. J'ai ajoute des commentaires sur les endpoints d'authentification et des exemples de requetes pour les ressources de facturation.",
    date: '2026-03-30T09:05:00Z',
    tags: [],
    read: true,
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeSearch = (search: string) => search.trim().toLowerCase();

const withQueryParams = (route: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);

  return `${route}?${searchParams.toString()}`;
};

const getThreadTimestamp = (date: string) => {
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export const mailService = {
  async listThreads(filters: MailFilters): Promise<MailThread[]> {
    await wait(300);

    const normalizedSearch = normalizeSearch(filters.search);

    return MOCK_THREADS.filter((thread) => {
      if (thread.folder !== filters.folder) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [thread.fullName, thread.subject, thread.snippet, thread.email]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    }).sort((a, b) => getThreadTimestamp(b.date) - getThreadTimestamp(a.date));
  },

  async search(query: string): Promise<GlobalSearchResult[]> {
    await wait(120);

    const normalizedQuery = normalizeSearch(query);

    if (!normalizedQuery) {
      return [];
    }

    return MOCK_THREADS.filter((thread) =>
      [thread.fullName, thread.subject, thread.snippet, thread.email, thread.folder]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
      .sort((a, b) => getThreadTimestamp(b.date) - getThreadTimestamp(a.date))
      .slice(0, 3)
      .map((thread) => ({
        id: `mail-${thread.id}`,
        label: thread.subject,
        description: `${thread.fullName} - ${MAIL_FOLDER_LABELS[thread.folder]}`,
        route: withQueryParams(APP_ROUTES.mail, {
          folder: thread.folder,
          search: normalizedQuery,
        }),
        kind: 'mail',
      }));
  },
};
