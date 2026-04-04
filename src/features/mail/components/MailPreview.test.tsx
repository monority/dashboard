import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { MailThread } from '../types';

import { MailPreview } from './MailPreview';

const THREAD: MailThread = {
  id: 'p1',
  folder: 'Inbox',
  fullName: 'Sophie Bernard',
  email: 'sophie@exemple.fr',
  subject: 'Compte-rendu reunion',
  snippet: 'Bonjour, voici le compte-rendu...',
  body: 'Bonjour, voici le compte-rendu de la reunion du 2 avril.',
  date: '2026-04-02T11:00:00Z',
  tags: ['Important', 'Urgent'],
  read: false,
};

describe('MailPreview', () => {
  it("affiche l'etat vide quand aucun thread n'est selectionne", () => {
    render(<MailPreview thread={null} />);

    expect(screen.getByText('Selectionne un email pour afficher le detail.')).toBeInTheDocument();
  });

  it('affiche le sujet et le corps du thread selectionne', () => {
    render(<MailPreview thread={THREAD} />);

    expect(screen.getByRole('heading', { name: 'Compte-rendu reunion' })).toBeInTheDocument();
    expect(
      screen.getByText('Bonjour, voici le compte-rendu de la reunion du 2 avril.'),
    ).toBeInTheDocument();
  });

  it("affiche le nom et l'email de l'expediteur", () => {
    render(<MailPreview thread={THREAD} />);

    expect(screen.getByText('Sophie Bernard')).toBeInTheDocument();
    expect(screen.getByText('sophie@exemple.fr')).toBeInTheDocument();
  });

  it('affiche les etiquettes traduites du thread', () => {
    render(<MailPreview thread={THREAD} />);

    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('affiche la date avec un element <time>', () => {
    render(<MailPreview thread={THREAD} />);

    const time = screen.getByRole('time');
    expect(time).toBeInTheDocument();
    expect(time.textContent).toContain('2026');
  });
});
