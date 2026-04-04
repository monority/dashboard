import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { MailThread } from '../types';

import { MailThreadList } from './MailThreadList';

const THREADS: MailThread[] = [
  {
    id: 'm1',
    folder: 'Inbox',
    fullName: 'Marie Dupont',
    email: 'marie@exemple.fr',
    subject: 'Reunion vendredi',
    snippet: 'Bonjour, pouvez-vous confirmer...',
    body: 'Bonjour, pouvez-vous confirmer votre presence a la reunion de vendredi?',
    date: '2026-04-01T10:00:00Z',
    tags: ['Important'],
    read: false,
  },
  {
    id: 'm2',
    folder: 'Inbox',
    fullName: 'Jean Martin',
    email: 'jean@exemple.fr',
    subject: 'Devis projet',
    snippet: 'Veuillez trouver ci-joint...',
    body: 'Veuillez trouver ci-joint le devis pour le projet.',
    date: '2026-04-02T14:30:00Z',
    tags: ['Urgent'],
    read: true,
  },
];

describe('MailThreadList', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(
      <MailThreadList threads={[]} selectedThreadId={null} isLoading={true} onSelect={vi.fn()} />,
    );

    expect(container.querySelector('.mail-list-skeleton')).toBeInTheDocument();
  });

  it("affiche l'etat vide quand aucun thread ne correspond", () => {
    render(
      <MailThreadList threads={[]} selectedThreadId={null} isLoading={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByText('Aucun mail correspondant aux filtres.')).toBeInTheDocument();
  });

  it('affiche les noms et sujets des threads', () => {
    render(
      <MailThreadList
        threads={THREADS}
        selectedThreadId={null}
        isLoading={false}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('Marie Dupont')).toBeInTheDocument();
    expect(screen.getByText('Reunion vendredi')).toBeInTheDocument();
    expect(screen.getByText('Jean Martin')).toBeInTheDocument();
    expect(screen.getByText('Devis projet')).toBeInTheDocument();
  });

  it('affiche les etiquettes traduites', () => {
    render(
      <MailThreadList
        threads={THREADS}
        selectedThreadId={null}
        isLoading={false}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('marque le thread selectionne avec aria-pressed=true', () => {
    render(
      <MailThreadList
        threads={THREADS}
        selectedThreadId="m1"
        isLoading={false}
        onSelect={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'false');
  });

  it('appelle onSelect avec le bon thread au clic', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <MailThreadList
        threads={THREADS}
        selectedThreadId={null}
        isLoading={false}
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByText('Reunion vendredi'));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(THREADS[0]);
  });
});
