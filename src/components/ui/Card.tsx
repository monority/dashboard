import type { HTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

type CardProps = BaseComponentProps & HTMLAttributes<HTMLDivElement>;

/**
 * Container component for grouping related content.
 * Renders as a semantic <section> element with card styling.
 *
 * @param props - Card component props
 * @returns Rendered section element
 * @example
 * <Card className="w-full">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 */
export const Card = ({ children, className, testId, ...rest }: CardProps) => {
  const classes = ['ui-card', className].filter(Boolean).join(' ');

  return (
    <section className={classes} data-testid={testId} {...rest}>
      {children}
    </section>
  );
};

Card.displayName = 'Card';
