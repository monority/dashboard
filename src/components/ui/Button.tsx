import type { ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

/** Button component styling variants */
type ButtonProps = BaseComponentProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Visual style variant of the button */
    variant?: ButtonVariant;
  };

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'ui-btn ui-btn--primary',
  ghost: 'ui-btn ui-btn--ghost',
  danger: 'ui-btn ui-btn--danger',
};

/**
 * Interactive button component with multiple style variants.
 * Supports primary, ghost, and danger styles. Inherits all standard HTML button attributes.
 *
 * @param props - Button component props
 * @returns Rendered button element
 * @example
 * <Button variant="primary" onClick={handleClick}>Click me</Button>
 * <Button variant="danger" type="submit">Delete</Button>
 */
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

Button.displayName = 'Button';
