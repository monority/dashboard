import type { HTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

type CardProps = BaseComponentProps & HTMLAttributes<HTMLDivElement>;

export const Card = ({ children, className, testId, ...rest }: CardProps) => {
    const classes = ['ui-card', className].filter(Boolean).join(' ');

    return (
        <section className={classes} data-testid={testId} {...rest}>
            {children}
        </section>
    );
};
