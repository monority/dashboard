import { describe, expect, it } from 'vitest';

import { taskService } from './task-service';

describe('taskService.list', () => {
  it('retourne des taches quand le statut est all', async () => {
    const results = await taskService.list({ status: 'all', search: '' });

    expect(results.length).toBeGreaterThan(0);
  });

  it('filtre les taches par statut connu', async () => {
    const results = await taskService.list({ status: 'Completed', search: '' });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((task) => task.status === 'Completed')).toBe(true);
  });

  it('revient a all quand le statut est inconnu', async () => {
    const results = await taskService.list({ status: 'Unknown' as never, search: '' });

    expect(results.length).toBeGreaterThan(0);
  });

  it('normalise la recherche et filtre sur titre, contenu ou assignee', async () => {
    const results = await taskService.list({ status: 'all', search: '  olivia  ' });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((task) =>
        [task.title, task.content, task.assignee].join(' ').toLowerCase().includes('olivia'),
      ),
    ).toBe(true);
  });
});
