import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('affiche son contenu texte', () => {
    render(<Button>Valider</Button>);
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument();
  });

  it('utilise type="button" par defaut', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button', { name: 'Action' })).toHaveAttribute('type', 'button');
  });

  it('applique la variante ghost', () => {
    render(<Button variant="ghost">Secondaire</Button>);
    expect(screen.getByRole('button', { name: 'Secondaire' })).toHaveClass('ui-btn--ghost');
  });

  it('appelle onClick quand on clique', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Supprimer</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Supprimer' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fusionne les classes custom', () => {
    render(<Button className="custom-btn">Classe</Button>);
    expect(screen.getByRole('button', { name: 'Classe' })).toHaveClass(
      'ui-btn',
      'ui-btn--primary',
      'custom-btn',
    );
  });

  it('est disabled quand la prop disabled est true', () => {
    render(<Button disabled>Desactif</Button>);
    expect(screen.getByRole('button', { name: 'Desactif' })).toBeDisabled();
  });

  it('n appelle pas onClick quand le bouton est disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Bloquer
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Bloquer' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
