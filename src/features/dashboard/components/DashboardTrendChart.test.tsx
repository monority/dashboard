import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { DashboardTrendPoint } from '../types';

import { DashboardTrendChart } from './DashboardTrendChart';

const POINTS: DashboardTrendPoint[] = [
  { label: 'Lun', value: 1200 },
  { label: 'Mar', value: 2600 },
  { label: 'Mer', value: 1800 },
];

describe('DashboardTrendChart', () => {
  it('affiche un etat vide sans points', () => {
    render(<DashboardTrendChart points={[]} />);
    expect(screen.getByText(/Aucune tendance disponible/)).toBeInTheDocument();
  });

  it('affiche le graphique et les labels quand des points existent', () => {
    render(<DashboardTrendChart points={POINTS} />);
    expect(screen.getByRole('img', { name: /Graphique de tendance/i })).toBeInTheDocument();
    expect(screen.getByText('Lun')).toBeInTheDocument();
    expect(screen.getByText('Mar')).toBeInTheDocument();
    expect(screen.getByText('Mer')).toBeInTheDocument();
  });

  it('affiche la variation en pourcentage dans le header', () => {
    render(<DashboardTrendChart points={POINTS} />);
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });

  it('affiche les stats (moyenne, min, max)', () => {
    render(<DashboardTrendChart points={POINTS} />);
    expect(screen.getByText('Moyenne')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });
});
