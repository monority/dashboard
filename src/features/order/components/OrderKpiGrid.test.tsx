import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { OrderKpi } from '../types';

import { OrderKpiGrid } from './OrderKpiGrid';

const KPIS: OrderKpi[] = [
  { key: 'revenue', title: 'Total commandes', value: '1 240', deltaPercent: 2.4 },
  { key: 'sales', title: 'Retards', value: '18', deltaPercent: -1.2 },
];

describe('OrderKpiGrid', () => {
  it('affiche 4 skeletons pendant le chargement', () => {
    const { container } = render(<OrderKpiGrid kpis={[]} isLoading />);
    expect(container.querySelectorAll('.ui-skeleton')).toHaveLength(4);
  });

  it('affiche les KPI en mode data', () => {
    render(<OrderKpiGrid kpis={KPIS} isLoading={false} />);
    expect(screen.getByText('Total commandes')).toBeInTheDocument();
    expect(screen.getByText('1 240')).toBeInTheDocument();
    expect(screen.getByText('Retards')).toBeInTheDocument();
  });

  it('formate le badge avec 1 decimale', () => {
    render(<OrderKpiGrid kpis={KPIS} isLoading={false} />);
    expect(screen.getByText('2.4%')).toBeInTheDocument();
    expect(screen.getByText('-1.2%')).toBeInTheDocument();
  });

  it('applique les variantes success/danger selon delta', () => {
    render(<OrderKpiGrid kpis={KPIS} isLoading={false} />);
    expect(screen.getByText('2.4%')).toHaveClass('ui-badge--success');
    expect(screen.getByText('-1.2%')).toHaveClass('ui-badge--danger');
  });
});
