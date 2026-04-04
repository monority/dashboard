import { describe, expect, it } from 'vitest';

import { dashboardService } from './dashboard-service';

describe('dashboardService.getOverview', () => {
  it('normalise les filtres invalides avant de construire la reponse', async () => {
    const result = await dashboardService.getOverview({
      range: 'invalid' as never,
      team: 'unknown' as never,
      search: '  SLA  ',
    });

    expect(result.appliedFilters).toEqual({
      range: '30d',
      team: 'all',
      search: 'sla',
    });
  });

  it('filtre les alertes, activites et objectifs par equipe', async () => {
    const result = await dashboardService.getOverview({
      range: '30d',
      team: 'Support',
      search: '',
    });

    expect(result.alerts.every((item) => item.team === 'Support')).toBe(true);
    expect(result.activities.every((item) => item.team === 'Support')).toBe(true);
    expect(result.goals.every((item) => item.team === 'Support')).toBe(true);
  });

  it('filtre les resultats par recherche normalisee', async () => {
    const result = await dashboardService.getOverview({
      range: '30d',
      team: 'all',
      search: '  retention ',
    });

    expect(result.activities).toHaveLength(1);
    expect(result.activities[0]?.title).toContain('retention');
    expect(result.alerts).toEqual([]);
    expect(result.goals).toEqual([]);
  });

  it('retourne le nombre de points attendu selon la plage', async () => {
    const sevenDays = await dashboardService.getOverview({ range: '7d', team: 'all', search: '' });
    const ninetyDays = await dashboardService.getOverview({
      range: '90d',
      team: 'all',
      search: '',
    });

    expect(sevenDays.trend).toHaveLength(7);
    expect(ninetyDays.trend).toHaveLength(12);
  });
});
