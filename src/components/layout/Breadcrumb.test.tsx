import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it("affiche une navigation avec l'aria-label attendu", () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: "Fil d'ariane" })).toBeInTheDocument();
  });

  it('rend les elements intermediaires en liens et le dernier en texte', () => {
    render(
      <MemoryRouter>
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: 'Support', to: '/support' },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
    expect(screen.queryByRole('link', { name: 'Support' })).not.toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('rend un seul element sans lien quand il est unique', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: 'Parametres', to: '/settings' }]} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: 'Parametres' })).not.toBeInTheDocument();
    expect(screen.getByText('Parametres')).toBeInTheDocument();
  });

  it('marque le dernier element avec aria-current="page"', () => {
    render(
      <MemoryRouter>
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: 'Support', to: '/support' },
          ]}
        />
      </MemoryRouter>,
    );

    const firstItem = screen.getByRole('link', { name: 'Accueil' });
    const lastItem = screen.getByText('Support');

    expect(firstItem.parentElement).not.toHaveAttribute('aria-current');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });
});
