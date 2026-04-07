import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { APP_ROUTES } from '@/utils';

const DEFAULT_TITLE = 'Hub admin';
const DEFAULT_DESCRIPTION =
  'Panneau admin interne pour piloter les operations, la relation client et les parametres depuis une interface React rapide et accessible.';

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  [APP_ROUTES.dashboard]: {
    title: 'Tableau de bord',
    description:
      'Vue d ensemble des KPI, alertes, objectifs et activites recentes de l espace de travail.',
  },
  [APP_ROUTES.admin]: {
    title: 'Admin Dashboard',
    description: 'Monitoring temps reel des metriques serveur, actions et transactions.',
  },
  [APP_ROUTES.fetchUrls]: {
    title: 'Fetch URLs',
    description: 'Testeur de requetes HTTP pour deboguer et tester vos endpoints API.',
  },
  [APP_ROUTES.mail]: {
    title: 'Mail',
    description: 'Gestion des fils de conversation, recherche rapide et tri par dossier.',
  },
  [APP_ROUTES.order]: {
    title: 'Commandes',
    description:
      'Suivi des KPIs commandes, partage de documents et coordination des collaborateurs.',
  },
  [APP_ROUTES.task]: {
    title: 'Taches',
    description: 'Pilotage des taches, filtres rapides et suivi des statuts de production.',
  },
  [APP_ROUTES.reviews]: {
    title: 'Avis',
    description: 'Lecture des retours clients, note moyenne et suivi de la qualite percue.',
  },
  [APP_ROUTES.support]: {
    title: 'Support',
    description: 'Suivi des tickets, FAQ, historique et indicateurs de support client.',
  },
  [APP_ROUTES.settings]: {
    title: 'Parametres',
    description: 'Configuration de l espace de travail, preferences visuelles et notifications.',
  },
};

const ensureMetaTag = (name: string) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  return element;
};

const ensureCanonicalLink = () => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  return element;
};

export const useRouteMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const metadata = ROUTE_METADATA[location.pathname] ?? {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };
    const title =
      metadata.title === DEFAULT_TITLE ? DEFAULT_TITLE : `${metadata.title} | ${DEFAULT_TITLE}`;
    const descriptionMeta = ensureMetaTag('description');
    const robotsMeta = ensureMetaTag('robots');
    const googlebotMeta = ensureMetaTag('googlebot');
    const canonicalLink = ensureCanonicalLink();
    const canonicalUrl = new URL(location.pathname, window.location.origin);

    document.title = title;
    descriptionMeta.setAttribute('content', metadata.description);
    robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    googlebotMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    canonicalLink.setAttribute('href', canonicalUrl.toString());
  }, [location.pathname]);
};
