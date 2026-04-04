export const DASHBOARD_COPY = {
  pageTitle: 'Tableau de bord',
  pageDescription: "Analyse operationnelle, alertes, objectifs et suivi d'activite.",
  errorTitle: 'Impossible de charger les donnees du tableau de bord',
  errorDescription:
    'Relance la requete. Si le probleme persiste, verifie la disponibilite du service.',
  retry: 'Reessayer',
  trendBadge: (value: number) => `${value.toFixed(1)}% vs periode precedente`,
  activityTitle: 'Activite recente',
  activityEmpty: 'Aucune activite ne correspond aux filtres actuels.',
} as const;

export const formatDashboardDateTime = (value: string) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return parsedDate.toLocaleString('fr-FR');
};
