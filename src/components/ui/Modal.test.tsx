import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

describe('Modal', () => {
  it('ne rend rien quand isOpen=false', () => {
    render(
      <Modal title="Edition" isOpen={false} onClose={() => {}}>
        <p>Contenu</p>
      </Modal>,
    );

    expect(screen.queryByRole('dialog', { name: 'Edition' })).not.toBeInTheDocument();
  });

  it('rend le dialog quand isOpen=true', () => {
    render(
      <Modal title="Edition" isOpen onClose={() => {}}>
        <p>Contenu</p>
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Edition' })).toBeInTheDocument();
    expect(screen.getByText('Contenu')).toBeInTheDocument();
  });

  it('ferme via le bouton de fermeture', async () => {
    const onClose = vi.fn();
    render(
      <Modal title="Edition" isOpen onClose={onClose}>
        <button type="button">Action</button>
      </Modal>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Fermer la fenetre' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ferme via Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal title="Edition" isOpen onClose={onClose}>
        <button type="button">Action</button>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ferme quand on clique sur overlay', async () => {
    const onClose = vi.fn();
    render(
      <Modal title="Edition" isOpen onClose={onClose}>
        <button type="button">Action</button>
      </Modal>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Fermer la fenetre modale' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
