import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { DashboardAlert } from '../types';

import { DashboardAlertsPanel } from './DashboardAlertsPanel';

const MOCK_ALERTS: DashboardAlert[] = [
  {
    id: 'a1',
    severity: 'warning',
    title: 'CPU eleve',
    description: 'Usage > 90%',
    team: 'Operations',
  },
  {
    id: 'a2',
    severity: 'info',
    title: 'Deploiement planifie',
    description: 'v2.1 ce soir',
    team: 'Product',
  },
];

describe('DashboardAlertsPanel', () => {
  it('affiche le titre du panneau', () => {
    render(<DashboardAlertsPanel alerts={[]} />);
    expect(screen.getByRole('heading', { level: 2, name: "Centre d'alertes" })).toBeInTheDocument();
  });

  it('affiche le badge avec le nombre d alertes', () => {
    render(<DashboardAlertsPanel alerts={MOCK_ALERTS} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it("affiche l'etat vide quand aucune alerte", () => {
    render(<DashboardAlertsPanel alerts={[]} />);
    expect(screen.getByText(/Aucune alerte active/)).toBeInTheDocument();
  });

  it('affiche les alertes avec titre et description', () => {
    render(<DashboardAlertsPanel alerts={MOCK_ALERTS} />);
    expect(screen.getByText('CPU eleve')).toBeInTheDocument();
    expect(screen.getByText('Usage > 90%')).toBeInTheDocument();
    expect(screen.getByText('Deploiement planifie')).toBeInTheDocument();
  });
});
