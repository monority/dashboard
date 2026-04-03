import type { ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

type ButtonProps = BaseComponentProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    };

const variantClassMap: Record<ButtonVariant, string> = {
    primary: 'ui-btn ui-btn--primary',
    ghost: 'ui-btn ui-btn--ghost',
    danger: 'ui-btn ui-btn--danger',
};

export const Button = ({
    children,
    className,
    variant = 'primary',
    type = 'button',
    testId,
    ...buttonProps
}: ButtonProps) => {
    const classes = [variantClassMap[variant], className].filter(Boolean).join(' ');

    return (
        <button type={type} className={classes} data-testid={testId} {...buttonProps}>
            {children}
        </button>
    );
};
