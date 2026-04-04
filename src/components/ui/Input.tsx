import { useId, type InputHTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

/**
 * Props for the Input component
 * @extends BaseComponentProps
 */
interface InputProps extends BaseComponentProps, InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Error message to display below the input */
  errorMessage?: string;
}

/**
 * Accessible text input component with optional label and error message.
 * Automatically generates accessible IDs and announces errors to screen readers.
 *
 * @param props - Input component props
 * @returns Rendered input element with label and error message
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   errorMessage={errors.email}
 *   onChange={handleChange}
 * />
 */
export const Input = ({
  id,
  label,
  className,
  errorMessage,
  testId,
  required,
  ...inputProps
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const wrapperClassName = ['ui-input-wrapper', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} data-testid={testId}>
      {label ? (
        <label htmlFor={inputId}>
          {label}
          {required ? <span aria-label="requis">*</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className="ui-input"
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorId : undefined}
        aria-required={required}
        required={required}
        {...inputProps}
      />
      {errorMessage ? (
        <p id={errorId} className="ui-input-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

Input.displayName = 'Input';
