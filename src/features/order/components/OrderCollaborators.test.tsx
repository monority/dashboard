import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CollaboratorShare } from '../types';

import { OrderCollaborators } from './OrderCollaborators';

const COLLABORATORS: CollaboratorShare[] = [
  { id: 'c1', name: 'Nadia Roussel', email: 'nadia@exemple.fr', role: 'Owner' },
  { id: 'c2', name: 'Marc Leroy', email: 'marc@exemple.fr', role: 'Editor' },
  { id: 'c3', name: 'Lise Fontaine', email: 'lise@exemple.fr', role: 'Viewer' },
];

describe('OrderCollaborators', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<OrderCollaborators collaborators={[]} isLoading={true} />);

    expect(container.querySelector('.order-collab-skeleton')).toBeInTheDocument();
  });

  it('affiche le titre et le badge de comptage', () => {
    render(<OrderCollaborators collaborators={COLLABORATORS} isLoading={false} />);

    expect(screen.getByText('Collaborateurs')).toBeInTheDocument();
    expect(screen.getByText('3 utilisateur(s)')).toBeInTheDocument();
  });

  it('affiche les noms et emails des collaborateurs', () => {
    render(<OrderCollaborators collaborators={COLLABORATORS} isLoading={false} />);

    expect(screen.getByText('Nadia Roussel')).toBeInTheDocument();
    expect(screen.getByText('marc@exemple.fr')).toBeInTheDocument();
    expect(screen.getByText('Lise Fontaine')).toBeInTheDocument();
  });

  it('traduit les roles en français dans le tableau', () => {
    render(<OrderCollaborators collaborators={COLLABORATORS} isLoading={false} />);

    expect(screen.getByText('Proprietaire')).toBeInTheDocument();
    expect(screen.getByText('Editeur')).toBeInTheDocument();
    expect(screen.getByText('Lecteur')).toBeInTheDocument();
  });

  it('affiche les en-tetes de colonnes du tableau', () => {
    render(<OrderCollaborators collaborators={COLLABORATORS} isLoading={false} />);

    expect(screen.getByText('Nom')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });
});
