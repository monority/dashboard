import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './Dropdown';

const ITEMS = [
  { id: 'i1', label: 'Editer', onSelect: vi.fn() },
  { id: 'i2', label: 'Supprimer', onSelect: vi.fn() },
];

describe('Dropdown', () => {
  it('ouvre et ferme le menu via le trigger', async () => {
    render(<Dropdown trigger="Actions" items={ITEMS} />);

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await userEvent.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('declenche onSelect et ferme le menu au clic item', async () => {
    const onSelect = vi.fn();
    render(<Dropdown trigger="Actions" items={[{ id: 'i1', label: 'Editer', onSelect }]} />);

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Editer' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('ferme le menu lors d un clic exterieur', async () => {
    render(<Dropdown trigger="Actions" items={ITEMS} />);

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('ferme le menu quand on appuie sur Escape', async () => {
    render(<Dropdown trigger="Actions" items={ITEMS} />);

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
