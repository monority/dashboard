import { useId, type SelectHTMLAttributes } from 'react';

import type { BaseComponentProps, SelectOption } from '@/types';

/**
 * Props for the Select component
 * @extends BaseComponentProps
 * @template TValue - The type of the select value (must extend string)
 */
interface SelectProps<TValue extends string>
  extends BaseComponentProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /** Array of selectable options */
  options: SelectOption<TValue>[];
  /** Current selected value */
  value: TValue;
  /** Callback fired when selection changes */
  onChange: (value: TValue) => void;
  /** Optional label text displayed above the select */
  label?: string;
  /** Error message to display below the select */
  errorMessage?: string;
}

/**
 * Accessible dropdown select component with optional label and error message.
 * Automatically generates accessible IDs and announces errors to screen readers.
 *
 * @template TValue - The type of values in the options
 * @param props - Select component props
 * @returns Rendered select element with label and error message
 * @example
 * <Select
 *   label="Status"
 *   options={[
 *     { value: 'active', label: 'Active' },
 *     { value: 'inactive', label: 'Inactive' }
 *   ]}
 *   value={status}
 *   onChange={setStatus}
 *   required
 * />
 */
export const Select = <TValue extends string>({
  options,
  value,
  onChange,
  id,
  label,
  className,
  testId,
  errorMessage,
  required,
  ...selectProps
}: SelectProps<TValue>) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const classes = ['ui-select', className].filter(Boolean).join(' ');

  return (
    <div className="ui-select-wrapper" data-testid={testId}>
      {label ? (
        <label htmlFor={selectId}>
          {label}
          {required ? <span aria-label="requis">*</span> : null}
        </label>
      ) : null}
      <select
        id={selectId}
        className={classes}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorId : undefined}
        aria-required={required}
        required={required}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage ? (
        <p id={errorId} className="ui-select-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

Select.displayName = 'Select';
