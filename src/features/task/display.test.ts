import { describe, expect, it } from 'vitest';

import {
  formatTaskSelectionAriaLabel,
  formatTaskSummary,
  TASK_COPY,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from './display';

describe('task display', () => {
  it('provides french labels for statuses and priorities', () => {
    expect(TASK_STATUS_LABELS.Pending).toBe('En attente');
    expect(TASK_STATUS_LABELS['In Progress']).toBe('En cours');
    expect(TASK_STATUS_LABELS.Completed).toBe('Terminee');

    expect(TASK_PRIORITY_LABELS.Low).toBe('Basse');
    expect(TASK_PRIORITY_LABELS.Medium).toBe('Moyenne');
    expect(TASK_PRIORITY_LABELS.High).toBe('Haute');
  });

  it('exposes centralized task copy labels', () => {
    expect(TASK_COPY.pageTitle).toBe('Taches');
    expect(TASK_COPY.statusLabel).toBe('Statut');
    expect(TASK_COPY.clearFilters).toBe('Effacer les filtres');
    expect(TASK_COPY.tableHeaders.actions).toBe('Actions');
  });

  it('formats summary and selection aria labels', () => {
    expect(formatTaskSummary(12, 3)).toBe('12 taches affichees • 3 selectionnees');
    expect(formatTaskSelectionAriaLabel('Verifier paiement')).toBe(
      'Selectionner Verifier paiement',
    );
  });
});
