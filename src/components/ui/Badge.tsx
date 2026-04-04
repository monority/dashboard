import type { BaseComponentProps } from '@/types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info';

/** Badge component props with variant styling options */
interface BadgeProps extends BaseComponentProps {
  /** Text content to display in the badge */
  label: string;
  /** Visual style variant of the badge */
  variant?: BadgeVariant;
}

const variantClassMap: Record<BadgeVariant, string> = {
  success: 'ui-badge ui-badge--success',
  warning: 'ui-badge ui-badge--warning',
  danger: 'ui-badge ui-badge--danger',
  info: 'ui-badge ui-badge--info',
};

/**
 * Small inline status indicator component.
 * Displays short text with colored badge styling (success, warning, danger, info).
 *
 * @param props - Badge component props
 * @returns Rendered badge span element
 * @example
 * <Badge label="Active" variant="success" />
 * <Badge label="Error" variant="danger" />
 */
export const Badge = ({ label, className, variant = 'info', testId }: BadgeProps) => {
  const classes = [variantClassMap[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes} data-testid={testId}>
      {label}
    </span>
  );
};

Badge.displayName = 'Badge';
