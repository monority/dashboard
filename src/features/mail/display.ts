import type { MailFolder, MailTag } from './types';

export const MAIL_FOLDER_LABELS: Record<MailFolder, string> = {
  Inbox: 'Reception',
  Sent: 'Envoyes',
  Drafts: 'Brouillons',
  Archive: 'Archives',
  Trash: 'Corbeille',
};

export const MAIL_TAG_LABELS: Record<MailTag, string> = {
  New: 'Nouveau',
  Important: 'Important',
  Newsletter: 'Newsletter',
  Support: 'Support',
  Urgent: 'Urgent',
};

export const MAIL_COPY = {
  pageTitle: 'Mail',
  searchLabel: 'Recherche',
  searchPlaceholder: 'Filtrer par expediteur, sujet ou contenu',
  clearFilters: 'Effacer les filtres',
  foldersNavAriaLabel: 'Dossiers mail',
  emptyThreadList: 'Aucun mail correspondant aux filtres.',
  emptyPreview: 'Selectionne un email pour afficher le detail.',
};

export const formatMailDate = (value: string) => new Date(value).toLocaleDateString('fr-FR');

export const formatMailDateTime = (value: string) => new Date(value).toLocaleString('fr-FR');
