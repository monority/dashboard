import type { TaskPriority, TaskStatus } from './types';

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  Pending: 'En attente',
  'In Progress': 'En cours',
  Completed: 'Terminee',
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  Low: 'Basse',
  Medium: 'Moyenne',
  High: 'Haute',
};

export const TASK_COPY = {
  pageTitle: 'Taches',
  searchLabel: 'Rechercher',
  searchPlaceholder: 'Filtrer par titre, contenu ou assignee',
  statusLabel: 'Statut',
  allStatusesOption: 'Tous',
  clearFilters: 'Effacer les filtres',
  emptyState: 'Aucune tache pour ce filtre.',
  editAction: 'Modifier',
  deleteAction: 'Supprimer',
  tableHeaders: {
    title: 'Tache',
    status: 'Statut',
    priority: 'Priorite',
    assignee: 'Assignee',
    actions: 'Actions',
  },
};

export const formatTaskSummary = (taskCount: number, selectedCount: number) =>
  `${taskCount} taches affichees • ${selectedCount} selectionnees`;

export const formatTaskSelectionAriaLabel = (taskTitle: string) => `Selectionner ${taskTitle}`;
