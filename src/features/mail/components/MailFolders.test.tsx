import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MailFolders } from './MailFolders';

const renderFolders = (activeFolder = 'Inbox' as const, onChange = vi.fn()) =>
  render(<MailFolders activeFolder={activeFolder} onChange={onChange} />);

describe('MailFolders', () => {
  it('affiche un bouton par dossier', () => {
    renderFolders();
    expect(screen.getByRole('button', { name: 'Reception' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Brouillons' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Archives' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Corbeille' })).toBeInTheDocument();
  });

  it('affiche la nav avec le bon aria-label', () => {
    renderFolders();
    expect(screen.getByRole('navigation', { name: /dossiers/i })).toBeInTheDocument();
  });

  it('appelle onChange avec le dossier selectionne', async () => {
    const onChange = vi.fn();
    renderFolders('Inbox', onChange);
    await userEvent.click(screen.getByRole('button', { name: 'Envoyes' }));
    expect(onChange).toHaveBeenCalledWith('Sent');
  });

  it('change de dossier vers Brouillons', async () => {
    const onChange = vi.fn();
    renderFolders('Inbox', onChange);
    await userEvent.click(screen.getByRole('button', { name: 'Brouillons' }));
    expect(onChange).toHaveBeenCalledWith('Drafts');
  });
});
