import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { MailThread } from '../types';

vi.mock('../hooks', () => ({
  useMailThreads: vi.fn(() => ({ data: THREADS, isLoading: false })),
}));

import { MailPage } from './MailPage';

const THREADS: MailThread[] = [
  {
    id: 'm1',
    folder: 'Inbox',
    fullName: 'Camille Dupont',
    email: 'camille@exemple.fr',
    subject: 'Rapport mensuel',
    snippet: 'Veuillez trouver ci-joint...',
    body: 'Veuillez trouver ci-joint le rapport mensuel.',
    date: '2026-04-01T09:00:00Z',
    tags: ['Important'],
    read: false,
  },
];

const renderMailPage = () =>
  render(
    <MemoryRouter>
      <MailPage />
    </MemoryRouter>,
  );

describe('MailPage', () => {
  it('affiche le titre Mail', () => {
    renderMailPage();

    expect(screen.getByRole('heading', { name: 'Mail' })).toBeInTheDocument();
  });

  it('affiche le champ de recherche', () => {
    renderMailPage();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('affiche les boutons de dossiers en français', () => {
    renderMailPage();

    expect(screen.getByRole('button', { name: 'Reception' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Brouillons' })).toBeInTheDocument();
  });

  it('le bouton Effacer les filtres est desactive par defaut', () => {
    renderMailPage();

    expect(screen.getByRole('button', { name: 'Effacer les filtres' })).toBeDisabled();
  });

  it('le bouton Effacer les filtres devient actif apres saisie dans la recherche', async () => {
    const user = userEvent.setup();
    renderMailPage();

    await user.type(screen.getByRole('searchbox'), 'camille');

    expect(screen.getByRole('button', { name: 'Effacer les filtres' })).not.toBeDisabled();
  });

  it('le bouton Effacer les filtres devient actif apres changement de dossier', async () => {
    const user = userEvent.setup();
    renderMailPage();

    await user.click(screen.getByRole('button', { name: 'Envoyes' }));

    expect(screen.getByRole('button', { name: 'Effacer les filtres' })).not.toBeDisabled();
  });

  it('remet le dossier et la recherche a zero apres clic sur Effacer les filtres', async () => {
    const user = userEvent.setup();
    renderMailPage();

    await user.type(screen.getByRole('searchbox'), 'test');
    await user.click(screen.getByRole('button', { name: 'Effacer les filtres' }));

    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Effacer les filtres' })).toBeDisabled();
  });

  it('affiche le thread retourne par le hook', () => {
    renderMailPage();

    // Le nom apparait dans la liste ET dans la preview (thread auto-selectionne)
    expect(screen.getAllByText('Camille Dupont').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Rapport mensuel').length).toBeGreaterThanOrEqual(1);
  });
});
