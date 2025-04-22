import React from 'react';
import PropTypes from 'prop-types';

const Select = React.memo(({
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
});

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline']),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  error: PropTypes.node,
  required: PropTypes.bool,
  children: PropTypes.node,
};

Select.displayName = 'Select';

export default Select;