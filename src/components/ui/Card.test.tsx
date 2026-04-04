import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('affiche son contenu', () => {
    render(<Card>Contenu carte</Card>);
    expect(screen.getByText('Contenu carte')).toBeInTheDocument();
  });

  it('applique la classe de base et la classe custom', () => {
    render(<Card className="card-custom">Bloc</Card>);
    expect(screen.getByText('Bloc').closest('section')).toHaveClass('ui-card', 'card-custom');
  });

  it('propage les attributs HTML standards', () => {
    render(
      <Card aria-label="resume" id="card-id">
        Resume
      </Card>,
    );
    expect(screen.getByLabelText('resume')).toHaveAttribute('id', 'card-id');
  });
});
