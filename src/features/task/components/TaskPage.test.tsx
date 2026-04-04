import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { TaskItem } from '../types';

// vi.mock is hoisted before imports by Vitest — static import of TaskPage works
vi.mock('../hooks', () => ({
  useTasks: vi.fn(() => ({ data: TASKS, isLoading: false })),
}));

import { TaskPage } from './TaskPage';

const TASKS: TaskItem[] = [
  {
    id: 't1',
    title: 'Corriger bug paiement',
    content: 'Le bouton de paiement cesse de repondre.',
    status: 'Pending',
    priority: 'High',
    assignee: 'Alice',
  },
  {
    id: 't2',
    title: 'Ecrire documentation',
    content: 'Documenter les endpoints REST.',
    status: 'In Progress',
    priority: 'Low',
    assignee: 'Bob',
  },
];

const renderTaskPage = () =>
  render(
    <MemoryRouter>
      <TaskPage />
    </MemoryRouter>,
  );

describe('TaskPage', () => {
  it('affiche le titre de la page en français', () => {
    renderTaskPage();

    expect(screen.getByRole('heading', { name: 'Taches' })).toBeInTheDocument();
  });

  it('affiche le champ de recherche et le select de statut', () => {
    renderTaskPage();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('le bouton Effacer les filtres est desactive par defaut', () => {
    renderTaskPage();

    const btn = screen.getByRole('button', { name: 'Effacer les filtres' });
    expect(btn).toBeDisabled();
  });

  it('le bouton Effacer les filtres devient actif apres saisie dans la recherche', async () => {
    const user = userEvent.setup();
    renderTaskPage();

    await user.type(screen.getByRole('searchbox'), 'bug');

    expect(screen.getByRole('button', { name: 'Effacer les filtres' })).not.toBeDisabled();
  });

  it('remet la recherche a vide apres clic sur Effacer les filtres', async () => {
    const user = userEvent.setup();
    renderTaskPage();

    const input = screen.getByRole('searchbox');
    await user.type(input, 'bug');
    await user.click(screen.getByRole('button', { name: 'Effacer les filtres' }));

    expect(input).toHaveValue('');
  });

  it('affiche les taches retournees par le hook', () => {
    renderTaskPage();

    expect(screen.getByText('Corriger bug paiement')).toBeInTheDocument();
    expect(screen.getByText('Ecrire documentation')).toBeInTheDocument();
  });

  it('affiche le recapitulatif du nombre de taches', () => {
    renderTaskPage();

    expect(screen.getByText('2 taches affichees \u2022 0 selectionnees')).toBeInTheDocument();
  });
});
