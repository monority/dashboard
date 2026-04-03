import type { BaseComponentProps } from '@/types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends BaseComponentProps {
    label: string;
    variant?: BadgeVariant;
}

const variantClassMap: Record<BadgeVariant, string> = {
    success: 'ui-badge ui-badge--success',
    warning: 'ui-badge ui-badge--warning',
    danger: 'ui-badge ui-badge--danger',
    info: 'ui-badge ui-badge--info',
};

export const Badge = ({ label, className, variant = 'info', testId }: BadgeProps) => {
    const classes = [variantClassMap[variant], className].filter(Boolean).join(' ');

    return (
        <span className={classes} data-testid={testId}>
            {label}
        </span>
    );
};
