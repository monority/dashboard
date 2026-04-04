import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('rend un element aria-hidden', () => {
    render(<Skeleton testId="skel" />);
    expect(screen.getByTestId('skel')).toHaveAttribute('aria-hidden', 'true');
  });

  it('utilise les dimensions par defaut', () => {
    render(<Skeleton testId="skel-default" />);
    expect(screen.getByTestId('skel-default')).toHaveStyle({ height: '1rem', width: '100%' });
  });

  it('accepte des dimensions personnalisees', () => {
    render(<Skeleton testId="skel-custom" height="3rem" width="50%" className="pulse" />);
    expect(screen.getByTestId('skel-custom')).toHaveStyle({ height: '3rem', width: '50%' });
    expect(screen.getByTestId('skel-custom')).toHaveClass('ui-skeleton', 'pulse');
  });
});
