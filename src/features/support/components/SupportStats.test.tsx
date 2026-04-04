import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SupportStats } from '../types';

import { SupportStats as SupportStatsComponent } from './SupportStats';

const STATS: SupportStats = {
  issuesThisMonth: 42,
  issuesGrowthPercent: 12,
  issuesSolved: 35,
  avgResponseTimePercent: 88,
  responseDeltaPercent: 5,
  clientSatisfactionPercent: 94,
  satisfactionGrowthPercent: 3,
  openTickets: 7,
};

describe('SupportStats', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<SupportStatsComponent stats={null} isLoading={true} />);

    expect(container.querySelector('.support-stats-skeleton')).toBeInTheDocument();
  });

  it('affiche un skeleton quand stats est null', () => {
    const { container } = render(<SupportStatsComponent stats={null} isLoading={false} />);

    expect(container.querySelector('.support-stats-skeleton')).toBeInTheDocument();
  });

  it('affiche les libelles de colonnes en français', () => {
    render(<SupportStatsComponent stats={STATS} isLoading={false} />);

    expect(screen.getByText('Tickets ce mois-ci')).toBeInTheDocument();
    expect(screen.getByText('Tickets resolus')).toBeInTheDocument();
    expect(screen.getByText('Temps de reponse moyen')).toBeInTheDocument();
    expect(screen.getByText('Satisfaction client')).toBeInTheDocument();
    expect(screen.getByText('Tickets ouverts')).toBeInTheDocument();
  });

  it('affiche les valeurs numeriques des stats', () => {
    render(<SupportStatsComponent stats={STATS} isLoading={false} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });
});
