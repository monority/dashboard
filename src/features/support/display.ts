import type { SupportRequestType, SupportTicketStatus } from './types';

export const SUPPORT_TYPE_LABELS: Record<SupportRequestType, string> = {
  technical: 'Technique',
  billing: 'Facturation',
  feature: 'Fonctionnalite',
  other: 'Autre',
};

export const SUPPORT_STATUS_LABELS: Record<SupportTicketStatus, string> = {
  Resolved: 'Resolue',
  Closed: 'Cloturee',
  Answered: 'Repondue',
  Open: 'Ouverte',
};

export const SUPPORT_COPY = {
  pageTitle: 'Support',
  pageDescription: 'Pilote les tickets, la FAQ et les operations de support depuis un seul ecran.',
  faqTitle: 'Questions frequentes',
  historyTitle: 'Historique du support',
  historyItems: (count: number) => `${count} element(s)`,
  stats: {
    issuesThisMonth: 'Tickets ce mois-ci',
    issuesSolved: 'Tickets resolus',
    avgResponseTime: 'Temps de reponse moyen',
    clientSatisfaction: 'Satisfaction client',
    openTickets: 'Tickets ouverts',
  },
} as const;

export const formatSupportDate = (value: string) => new Date(value).toLocaleDateString('fr-FR');
