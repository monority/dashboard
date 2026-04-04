import { describe, expect, it } from 'vitest';

import { LAYOUT_COPY, LAYOUT_NAV_ITEMS, LAYOUT_ROUTE_LABELS } from './display';

describe('layout display', () => {
  it('provides route labels and navigation metadata in french', () => {
    expect(LAYOUT_ROUTE_LABELS['/']).toBe('Tableau de bord');
    expect(LAYOUT_ROUTE_LABELS['/reviews']).toBe('Avis');

    expect(LAYOUT_NAV_ITEMS).toHaveLength(7);
    expect(LAYOUT_NAV_ITEMS[0]?.label).toBe('Tableau de bord');
  });

  it('provides global search and sidebar copy', () => {
    expect(LAYOUT_COPY.searchEmpty).toBe('Aucun resultat correspondant.');
    expect(LAYOUT_COPY.sidebarTitle).toBe('Hub admin');
  });
});
