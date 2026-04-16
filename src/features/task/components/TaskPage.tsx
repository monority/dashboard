import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input, Select } from '@/components/ui';
import { debounce } from '@/utils/debounce';

import { formatTaskSummary, TASK_COPY, TASK_STATUS_LABELS } from '../display';
import { useTasks } from '../hooks';
import { TASK_STATUSES, type TaskFilters } from '../types';
import { buildTaskSearchParams, parseTaskFilters } from '../url-filters';

import { TaskTable } from './TaskTable';
import './task-page.css';

export const TaskPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskFilters['status']>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const { search: nextSearch, status: nextStatus } = parseTaskFilters(searchParams);

    setSearch(nextSearch);
    setDebouncedSearch(nextSearch);
    setStatusFilter(nextStatus);
  }, [searchParams]);

  useEffect(() => {
    const nextParams = buildTaskSearchParams({
      status: statusFilter,
      search,
    });

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [search, searchParams, setSearchParams, statusFilter]);

  const updateDebouncedSearch = useMemo(
    () =>
      debounce<[string]>((nextValue) => {
        setDebouncedSearch(nextValue);
      }, 250),
    [],
  );

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useTasks({
    search: debouncedSearch,
    status: statusFilter,
  });

  const selectedCount = selectedIds.size;
  const canResetFilters = statusFilter !== 'all' || search.trim() !== '';

  if (error) {
    return (
      <section className="task-page">
        <div role="alert" className="error-message">
          Erreur de chargement des tâches
        </div>
      </section>
    );
  }

  return (
    <section className="task-page">
      <header>
        <h1>{TASK_COPY.pageTitle}</h1>
        <p className="task-summary">{formatTaskSummary(tasks.length, selectedCount)}</p>
      </header>

      <div className="task-toolbar">
        <Input
          type="search"
          label={TASK_COPY.searchLabel}
          placeholder={TASK_COPY.searchPlaceholder}
          value={search}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setSearch(nextValue);
            updateDebouncedSearch(nextValue);
          }}
        />

        <Select
          label={TASK_COPY.statusLabel}
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: TASK_COPY.allStatusesOption },
            ...TASK_STATUSES.map((status) => ({
              value: status,
              label: TASK_STATUS_LABELS[status],
            })),
          ]}
        />

        <Button
          variant="ghost"
          disabled={!canResetFilters}
          onClick={() => {
            setSearch('');
            setDebouncedSearch('');
            setStatusFilter('all');
            setSelectedIds(new Set());
          }}
        >
          {TASK_COPY.clearFilters}
        </Button>
      </div>

      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggle={(taskId) => {
          setSelectedIds((previous) => {
            const next = new Set(previous);

            if (next.has(taskId)) {
              next.delete(taskId);
            } else {
              next.add(taskId);
            }

            return next;
          });
        }}
      />
    </section>
  );
};
