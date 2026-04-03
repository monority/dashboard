import type { InputHTMLAttributes } from 'react';

import type { BaseComponentProps } from '@/types';

interface InputProps extends BaseComponentProps, InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
}

export const Input = ({ id, label, className, errorMessage, testId, ...inputProps }: InputProps) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    const wrapperClassName = ['ui-input-wrapper', className].filter(Boolean).join(' ');

    return (
        <div className={wrapperClassName} data-testid={testId}>
            {label ? <label htmlFor={inputId}>{label}</label> : null}
            <input id={inputId} className="ui-input" {...inputProps} />
            {errorMessage ? <p className="ui-input-error">{errorMessage}</p> : null}
        </div>
    );
};
