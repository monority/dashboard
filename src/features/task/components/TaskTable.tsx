import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';

import { Badge, Button, Card, Skeleton } from '@/components/ui';

import {
  formatTaskSelectionAriaLabel,
  TASK_COPY,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from '../display';
import type { TaskItem } from '../types';

interface TaskTableProps {
  tasks: TaskItem[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onToggle: (taskId: string) => void;
}

const VIRTUALIZATION_THRESHOLD = 100;

export const TaskTable = ({ tasks, isLoading, selectedIds, onToggle }: TaskTableProps) => {
  const shouldVirtualize = tasks.length > VIRTUALIZATION_THRESHOLD;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: shouldVirtualize ? tasks.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 58,
    overscan: 8,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const statusVariantMap = useMemo(
    () =>
      ({
        Pending: 'warning',
        'In Progress': 'info',
        Completed: 'success',
      }) as const,
    [],
  );

  const priorityVariantMap = useMemo(
    () =>
      ({
        Low: 'info',
        Medium: 'warning',
        High: 'danger',
      }) as const,
    [],
  );

  if (isLoading) {
    return (
      <Card>
        <div className="task-skeleton-list" aria-hidden="true">
          <Skeleton height="2.4rem" />
          <Skeleton height="2.4rem" />
          <Skeleton height="2.4rem" />
          <Skeleton height="2.4rem" />
        </div>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <p className="task-empty">{TASK_COPY.emptyState}</p>
      </Card>
    );
  }

  const renderRow = (task: TaskItem) => {
    const isSelected = selectedIds.has(task.id);

    return (
      <div key={task.id} className="task-row" role="row">
        <div role="gridcell" className="task-cell task-cell-check">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(task.id)}
            aria-label={formatTaskSelectionAriaLabel(task.title)}
          />
        </div>
        <div role="gridcell" className="task-cell task-cell-title">
          <strong>{task.title}</strong>
          <p>{task.content}</p>
        </div>
        <div role="gridcell" className="task-cell">
          <Badge label={TASK_STATUS_LABELS[task.status]} variant={statusVariantMap[task.status]} />
        </div>
        <div role="gridcell" className="task-cell">
          <Badge
            label={TASK_PRIORITY_LABELS[task.priority]}
            variant={priorityVariantMap[task.priority]}
          />
        </div>
        <div role="gridcell" className="task-cell">
          {task.assignee}
        </div>
        <div role="gridcell" className="task-cell task-cell-actions">
          <Button variant="ghost">{TASK_COPY.editAction}</Button>
          <Button variant="danger">{TASK_COPY.deleteAction}</Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="task-grid" role="grid" aria-rowcount={tasks.length}>
        <div className="task-header" role="row">
          <div className="task-cell task-cell-check" role="columnheader" />
          <div className="task-cell task-cell-title" role="columnheader">
            {TASK_COPY.tableHeaders.title}
          </div>
          <div className="task-cell" role="columnheader">
            {TASK_COPY.tableHeaders.status}
          </div>
          <div className="task-cell" role="columnheader">
            {TASK_COPY.tableHeaders.priority}
          </div>
          <div className="task-cell" role="columnheader">
            {TASK_COPY.tableHeaders.assignee}
          </div>
          <div className="task-cell task-cell-actions" role="columnheader">
            {TASK_COPY.tableHeaders.actions}
          </div>
        </div>

        <div className="task-body" ref={scrollRef}>
          {shouldVirtualize ? (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {virtualRows.map((virtualRow) => {
                const task = tasks[virtualRow.index];

                if (!task) {
                  return null;
                }

                return (
                  <div
                    key={task.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {renderRow(task)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>{tasks.map((task) => renderRow(task))}</div>
          )}
        </div>
      </div>
    </Card>
  );
};
