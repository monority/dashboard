import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SupportHistoryItem } from '../types';

import { SupportHistory } from './SupportHistory';

const HISTORY: SupportHistoryItem[] = [
  {
    id: 'h1',
    subject: 'Probleme de connexion',
    type: 'technical',
    date: '2026-03-20T10:00:00Z',
    status: 'Resolved',
  },
  {
    id: 'h2',
    subject: 'Erreur de facturation',
    type: 'billing',
    date: '2026-03-25T14:30:00Z',
    status: 'Open',
  },
  {
    id: 'h3',
    subject: 'Demande de fonctionnalite',
    type: 'feature',
    date: '2026-04-01T09:00:00Z',
    status: 'Answered',
  },
];

describe('SupportHistory', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<SupportHistory history={[]} isLoading={true} />);

    expect(container.querySelector('.support-history-skeleton')).toBeInTheDocument();
  });

  it('affiche le titre et le badge de comptage', () => {
    render(<SupportHistory history={HISTORY} isLoading={false} />);

    expect(screen.getByText('Historique du support')).toBeInTheDocument();
    expect(screen.getByText('3 element(s)')).toBeInTheDocument();
  });

  it('affiche les en-tetes de colonnes en français', () => {
    render(<SupportHistory history={HISTORY} isLoading={false} />);

    expect(screen.getByRole('columnheader', { name: 'Sujet' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Statut' })).toBeInTheDocument();
  });

  it('traduit les types de ticket en français', () => {
    render(<SupportHistory history={HISTORY} isLoading={false} />);

    expect(screen.getByText('Technique')).toBeInTheDocument();
    expect(screen.getByText('Facturation')).toBeInTheDocument();
    expect(screen.getByText('Fonctionnalite')).toBeInTheDocument();
  });

  it('traduit les statuts de ticket en français', () => {
    render(<SupportHistory history={HISTORY} isLoading={false} />);

    expect(screen.getByText('Resolue')).toBeInTheDocument();
    expect(screen.getByText('Ouverte')).toBeInTheDocument();
    expect(screen.getByText('Repondue')).toBeInTheDocument();
  });

  it('affiche les sujets des tickets', () => {
    render(<SupportHistory history={HISTORY} isLoading={false} />);

    expect(screen.getByText('Probleme de connexion')).toBeInTheDocument();
    expect(screen.getByText('Erreur de facturation')).toBeInTheDocument();
  });
});
