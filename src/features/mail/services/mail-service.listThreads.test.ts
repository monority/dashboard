import { describe, expect, it } from 'vitest';

import { mailService } from './mail-service';

describe('mailService.listThreads', () => {
  it('retourne uniquement les threads du dossier demande', async () => {
    const results = await mailService.listThreads({ folder: 'Inbox', search: '' });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((thread) => thread.folder === 'Inbox')).toBe(true);
  });

  it('normalise la recherche et filtre sur plusieurs champs', async () => {
    const results = await mailService.listThreads({ folder: 'Inbox', search: '  Olivia  ' });

    expect(results).toHaveLength(1);
    expect(results[0]?.fullName).toBe('Olivia Baker');
  });

  it('retourne les threads tries du plus recent au plus ancien', async () => {
    const results = await mailService.listThreads({ folder: 'Inbox', search: '' });

    expect(results[0]?.date).toBe('2026-04-02T10:00:00Z');
    expect(results.at(-1)?.date).toBe('2026-03-31T17:42:00Z');
  });

  it('retourne vide quand aucun thread ne correspond', async () => {
    const results = await mailService.listThreads({ folder: 'Drafts', search: 'missing' });

    expect(results).toEqual([]);
  });
});
