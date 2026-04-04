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

  it('affiche la valeur la plus recente dans le header', () => {
    render(<DashboardTrendChart points={POINTS} />);
    expect(screen.getByText(/au plus recent/)).toBeInTheDocument();
  });

  it('garantit une hauteur minimum de 8% pour les barres', () => {
    const flatPoints: DashboardTrendPoint[] = [
      { label: 'A', value: 1000 },
      { label: 'B', value: 1000 },
    ];
    const { container } = render(<DashboardTrendChart points={flatPoints} />);
    const fills = container.querySelectorAll('.dashboard-chart-bar__fill');
    expect(fills).toHaveLength(2);
    expect(fills[0]).toHaveStyle({ height: '8%' });
    expect(fills[1]).toHaveStyle({ height: '8%' });
  });
});
