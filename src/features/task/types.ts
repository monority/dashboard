export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed'] as const;
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface TaskItem {
  id: string;
  title: string;
  content: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
}

export interface TaskFilters {
  search: string;
  status: 'all' | TaskStatus;
}
