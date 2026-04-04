import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('affiche le label', () => {
    render(<Badge label="Actif" />);
    expect(screen.getByText('Actif')).toBeInTheDocument();
  });

  it('utilise la variante info par defaut', () => {
    render(<Badge label="Info" />);
    expect(screen.getByText('Info')).toHaveClass('ui-badge', 'ui-badge--info');
  });

  it('applique la variante danger', () => {
    render(<Badge label="Critique" variant="danger" />);
    expect(screen.getByText('Critique')).toHaveClass('ui-badge--danger');
  });

  it('fusionne les classes custom', () => {
    render(<Badge label="Warning" variant="warning" className="custom-badge" />);
    expect(screen.getByText('Warning')).toHaveClass('ui-badge--warning', 'custom-badge');
  });
});
