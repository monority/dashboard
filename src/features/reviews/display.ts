export const REVIEWS_COPY = {
  pageTitle: 'Avis',
  pageDescription: 'Suis la qualite des retours clients et contacte rapidement les contributeurs.',
  listTitle: 'Avis',
  filterLabel: 'Filtrer les avis',
  filterPlaceholder: 'Rechercher un auteur ou un contenu',
  spend: (value: string) => `Depenses: ${value}`,
  reviews: (count: number) => `Avis: ${count}`,
  favorite: 'Favori',
  directMessage: 'Message direct',
  starsAria: (rating: number) => `${rating} etoiles`,
  summaryTotal: 'Total des avis',
  summaryAverage: 'Note moyenne',
  summaryAria: (value: number) => `Note ${value} sur 5`,
} as const;

export const formatReviewsDate = (value: string) => new Date(value).toLocaleDateString('fr-FR');
