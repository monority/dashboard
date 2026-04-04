import type { GlobalSearchResult } from '@/types';
import { APP_ROUTES } from '@/utils';

import { TASK_PRIORITY_LABELS, TASK_STATUS_LABELS } from '../display';
import { TASK_PRIORITIES, TASK_STATUSES } from '../types';
import type { TaskFilters, TaskItem, TaskPriority, TaskStatus } from '../types';

const ASSIGNEES = ['Emma', 'Marc', 'Olivia', 'Sarah', 'Lucas', 'Amina'] as const;
const TITLES = [
  'Revue design',
  'Integration API',
  'Migration de donnees',
  'Tri des bugs',
  'Checklist de release',
  'Audit accessibilite',
  'Passe performance tableau',
  'Cartographie des permissions',
] as const;

const STATUS_BY_INDEX: readonly TaskStatus[] = TASK_STATUSES;
const PRIORITY_BY_INDEX: readonly TaskPriority[] = TASK_PRIORITIES;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeSearch = (search: string) => search.trim().toLowerCase();

const withQueryParams = (route: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);

  return `${route}?${searchParams.toString()}`;
};

const isKnownStatus = (status: TaskFilters['status']): status is TaskStatus => {
  return status !== 'all' && TASK_STATUSES.includes(status);
};

const getByModulo = <TValue>(values: readonly TValue[], index: number): TValue => {
  if (values.length === 0) {
    throw new Error('Cannot read from empty values array.');
  }

  const value = values[index % values.length];

  if (value === undefined) {
    throw new Error('Modulo access returned undefined unexpectedly.');
  }

  return value;
};

const createMockTasks = (): TaskItem[] => {
  return Array.from({ length: 140 }, (_, index) => {
    const title = getByModulo(TITLES, index);
    const status = getByModulo(STATUS_BY_INDEX, index);
    const priority = getByModulo(PRIORITY_BY_INDEX, index);
    const assignee = getByModulo(ASSIGNEES, index);

    return {
      id: `task-${index + 1}`,
      title: `${title} #${index + 1}`,
      content: `La tache ${index + 1} cible des ameliorations operationnelles du tableau de bord admin et la verification des cas limites.`,
      status,
      priority,
      assignee,
    };
  });
};

const MOCK_TASKS = createMockTasks();

export const taskService = {
  async list(filters: TaskFilters): Promise<TaskItem[]> {
    await wait(250);

    const normalizedSearch = normalizeSearch(filters.search);
    const statusFilter = isKnownStatus(filters.status) ? filters.status : 'all';

    return MOCK_TASKS.filter((task) => {
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [task.title, task.content, task.assignee]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    });
  },

  async search(query: string): Promise<GlobalSearchResult[]> {
    await wait(100);

    const normalizedQuery = normalizeSearch(query);

    if (!normalizedQuery) {
      return [];
    }

    return MOCK_TASKS.filter((task) =>
      [task.title, task.content, task.assignee, task.status, task.priority]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
      .slice(0, 3)
      .map((task) => ({
        id: `task-${task.id}`,
        label: task.title,
        description: `${task.assignee} - ${TASK_STATUS_LABELS[task.status]} - ${TASK_PRIORITY_LABELS[task.priority]}`,
        route: withQueryParams(APP_ROUTES.task, {
          status: task.status,
          search: normalizedQuery,
        }),
        kind: 'task',
      }));
  },
};
