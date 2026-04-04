import type { CollaboratorShare } from './types';

export const ORDER_ROLE_LABELS: Record<CollaboratorShare['role'], string> = {
  Owner: 'Proprietaire',
  Editor: 'Editeur',
  Viewer: 'Lecteur',
};

export const ORDER_COPY = {
  pageTitle: 'Commandes',
  pageDescription: 'Vue commerciale, controles de partage et acces des collaborateurs.',
  shareTitle: 'Partager le document',
  shareDescription: 'Toute personne disposant de ce lien peut consulter ce document.',
  documentUrlLabel: 'URL du document',
  linkCopiedTitle: 'Lien copie',
  copyLink: 'Copier le lien',
  collaboratorsTitle: 'Collaborateurs',
  collaboratorsCount: (count: number) => `${count} utilisateur(s)`,
} as const;
