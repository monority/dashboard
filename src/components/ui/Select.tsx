import type { SelectHTMLAttributes } from 'react';

import type { BaseComponentProps, SelectOption } from '@/types';

interface SelectProps<TValue extends string>
    extends BaseComponentProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption<TValue>[];
    value: TValue;
    onChange: (value: TValue) => void;
    label?: string;
}

export const Select = <TValue extends string>({
    options,
    value,
    onChange,
    label,
    className,
    testId,
    ...selectProps
}: SelectProps<TValue>) => {
    const classes = ['ui-select', className].filter(Boolean).join(' ');

    return (
        <div className="ui-select-wrapper" data-testid={testId}>
            {label ? <label>{label}</label> : null}
            <select
                className={classes}
                value={value}
                onChange={(event) => onChange(event.target.value as TValue)}
                {...selectProps}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
