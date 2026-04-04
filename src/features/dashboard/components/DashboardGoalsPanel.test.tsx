import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { DashboardGoal } from '../types';

import { DashboardGoalsPanel } from './DashboardGoalsPanel';

const MOCK_GOALS: DashboardGoal[] = [
  {
    id: 'g1',
    label: 'Chiffre affaires',
    current: 75000,
    target: 100000,
    unit: 'EUR',
    team: 'Finance',
  },
  {
    id: 'g2',
    label: 'Tickets fermes',
    current: 200,
    target: 200,
    unit: 'tickets',
    team: 'Support',
  },
];

describe('DashboardGoalsPanel', () => {
  it('affiche le titre du panneau', () => {
    render(<DashboardGoalsPanel goals={[]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Progression des objectifs' }),
    ).toBeInTheDocument();
  });

  it("affiche l'etat vide quand aucun objectif", () => {
    render(<DashboardGoalsPanel goals={[]} />);
    expect(screen.getByText(/Aucun objectif/)).toBeInTheDocument();
  });

  it('affiche les objectifs avec leur label', () => {
    render(<DashboardGoalsPanel goals={MOCK_GOALS} />);
    expect(screen.getByText('Chiffre affaires')).toBeInTheDocument();
    expect(screen.getByText('Tickets fermes')).toBeInTheDocument();
  });

  it('affiche les barres de progression avec role progressbar', () => {
    render(<DashboardGoalsPanel goals={MOCK_GOALS} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(2);
  });

  it('calcule le pourcentage de progression (75%)', () => {
    render(<DashboardGoalsPanel goals={MOCK_GOALS} />);
    const bar = screen.getByRole('progressbar', { name: /Chiffre affaires/ });
    expect(bar).toHaveAttribute('aria-valuenow', '75');
  });

  it('plafonne la progression a 100% quand current >= target', () => {
    render(<DashboardGoalsPanel goals={MOCK_GOALS} />);
    const bar = screen.getByRole('progressbar', { name: /Tickets fermes/ });
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });
});
