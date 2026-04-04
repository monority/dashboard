import { describe, expect, it } from 'vitest';

import { ORDER_COPY, ORDER_ROLE_LABELS } from './display';

describe('order display', () => {
  it('provides french labels for roles and counters', () => {
    expect(ORDER_ROLE_LABELS.Owner).toBe('Proprietaire');
    expect(ORDER_ROLE_LABELS.Editor).toBe('Editeur');
    expect(ORDER_ROLE_LABELS.Viewer).toBe('Lecteur');

    expect(ORDER_COPY.collaboratorsCount(2)).toBe('2 utilisateur(s)');
  });
});
