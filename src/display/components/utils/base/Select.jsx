import React from 'react';

const Select = ({
    name,
    value,
    onChange,
    onBlur,
    disabled = false,
    className = '',
    size = 'medium',
    variant = 'default',
    label,
    placeholder,
    error,
    required = false,
    children,
    ...rest
}) => {
    const selectClasses = ['select', `select-${variant}`, `select-${size}`, className]
        .filter(Boolean)
        .join(' ');

    const id = name ? `select-${name}` : undefined;

    return (
        <div className="select-container">
            {label && (
                <label htmlFor={id} className="select-label">
                    {label} {required && <span className="required-indicator">*</span>}
                </label>
            )}
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={selectClasses}
                required={required}
                {...rest}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {children}
            </select>
            {error && <div className="select-error">{error}</div>}
        </div>
    );
};

export default React.memo(Select);