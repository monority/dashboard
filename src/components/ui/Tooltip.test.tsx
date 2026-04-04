import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('n affiche pas le tooltip par defaut', () => {
    render(
      <Tooltip content="Info utile">
        <button type="button">Aide</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('affiche et cache le tooltip au survol', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Info utile">
        <button type="button">Aide</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Aide' });
    await user.hover(button);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Info utile');

    await user.unhover(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('affiche et cache le tooltip au focus clavier', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Avant</button>
        <Tooltip content="Raccourci">
          <button type="button">Aide clavier</button>
        </Tooltip>
      </>,
    );

    await user.tab();
    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Raccourci');

    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
