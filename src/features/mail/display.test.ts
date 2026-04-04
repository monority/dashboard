import { describe, expect, it } from 'vitest';

import {
  formatMailDate,
  formatMailDateTime,
  MAIL_COPY,
  MAIL_FOLDER_LABELS,
  MAIL_TAG_LABELS,
} from './display';

describe('mail display', () => {
  it('provides french labels for folders and tags', () => {
    expect(MAIL_FOLDER_LABELS.Inbox).toBe('Reception');
    expect(MAIL_FOLDER_LABELS.Trash).toBe('Corbeille');
    expect(MAIL_TAG_LABELS.New).toBe('Nouveau');
    expect(MAIL_TAG_LABELS.Urgent).toBe('Urgent');
  });

  it('formats mail date and datetime in french locale', () => {
    const date = formatMailDate('2026-04-03T09:10:00Z');
    const dateTime = formatMailDateTime('2026-04-03T09:10:00Z');

    expect(date).toContain('2026');
    expect(dateTime).toContain('2026');
  });

  it('exposes centralized mail copy for page and empty states', () => {
    expect(MAIL_COPY.pageTitle).toBe('Mail');
    expect(MAIL_COPY.clearFilters).toBe('Effacer les filtres');
    expect(MAIL_COPY.foldersNavAriaLabel).toBe('Dossiers mail');
    expect(MAIL_COPY.emptyThreadList).toBe('Aucun mail correspondant aux filtres.');
    expect(MAIL_COPY.emptyPreview).toBe('Selectionne un email pour afficher le detail.');
  });
});
