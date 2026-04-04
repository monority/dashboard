import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { TaskItem } from '../types';

import { TaskTable } from './TaskTable';

const TASKS: TaskItem[] = [
  {
    id: 't1',
    title: 'Corriger bug login',
    content: 'Le bouton de connexion ne repond pas.',
    status: 'Pending',
    priority: 'High',
    assignee: 'Alice',
  },
  {
    id: 't2',
    title: 'Ajouter tests',
    content: 'Couvrir les composants critiques.',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Bob',
  },
];

describe('TaskTable', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(
      <TaskTable tasks={[]} isLoading={true} selectedIds={new Set()} onToggle={vi.fn()} />,
    );

    expect(container.querySelector('.task-skeleton-list')).toBeInTheDocument();
  });

  it("affiche l'etat vide quand il n'y a pas de taches", () => {
    render(<TaskTable tasks={[]} isLoading={false} selectedIds={new Set()} onToggle={vi.fn()} />);

    expect(screen.getByText('Aucune tache pour ce filtre.')).toBeInTheDocument();
  });

  it('affiche les en-têtes de colonnes en français', () => {
    render(
      <TaskTable tasks={TASKS} isLoading={false} selectedIds={new Set()} onToggle={vi.fn()} />,
    );

    expect(screen.getByRole('columnheader', { name: 'Tache' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Statut' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Priorite' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Assignee' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeInTheDocument();
  });

  it('affiche les titres et assignees des taches', () => {
    render(
      <TaskTable tasks={TASKS} isLoading={false} selectedIds={new Set()} onToggle={vi.fn()} />,
    );

    expect(screen.getByText('Corriger bug login')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Ajouter tests')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('affiche les labels de statut et priorite traduits', () => {
    render(
      <TaskTable tasks={TASKS} isLoading={false} selectedIds={new Set()} onToggle={vi.fn()} />,
    );

    expect(screen.getByText('En attente')).toBeInTheDocument();
    expect(screen.getByText('En cours')).toBeInTheDocument();
    expect(screen.getByText('Haute')).toBeInTheDocument();
    expect(screen.getByText('Moyenne')).toBeInTheDocument();
  });

  it('coche les taches dont les ids sont dans selectedIds', () => {
    render(
      <TaskTable
        tasks={TASKS}
        isLoading={false}
        selectedIds={new Set(['t1'])}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByRole('checkbox', { name: /Corriger bug login/i })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Ajouter tests/i })).not.toBeChecked();
  });

  it('appelle onToggle avec le bon id au clic sur la checkbox', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskTable tasks={TASKS} isLoading={false} selectedIds={new Set()} onToggle={onToggle} />,
    );

    await user.click(screen.getByRole('checkbox', { name: /Corriger bug login/i }));

    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle).toHaveBeenCalledWith('t1');
  });
});
