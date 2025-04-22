import React from 'react';
import PropTypes from 'prop-types';

// Import your input components - adjust paths as needed
import Input from './Input';
import Select from './Select';
import Option from './Option';
import Checkbox from './Checkbox';
import RadioGroup from './RadioGroup';

const Form = React.memo(({
  onSubmit,
  id,
  className = '',
  autoComplete = 'on',
  noValidate = false,
  children,
  resetOnSubmit = false,
  layout = 'vertical',
  disabled = false,
  loading = false,
  fields = [],
  values = {},
  errors = {},
  onChange,
  ...rest
}) => {
  const formClasses = ['form', `form-${layout}`, className]
    .filter(Boolean)
    .join(' ');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit && !disabled && !loading) {
      onSubmit(event);

      if (resetOnSubmit) {
        event.target.reset();
      }
    }
  };

  const renderField = (field) => {
    const {
      type = 'text',
      name,
      label,
      placeholder,
      options,
      required,
      ...fieldProps
    } = field;

    const fieldValue = values[name] !== undefined ? values[name] : '';
    const fieldError = errors[name];
    
    const commonProps = {
      key: name,
      name,
      label,
      value: fieldValue,
      onChange,
      error: fieldError,
      required,
      ...fieldProps
    };

    switch (type) {
      case 'select':
        return (
          <Select {...commonProps} placeholder={placeholder}>
            {options?.map(option => (
              <Option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            checked={!!fieldValue}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            {...commonProps}
            options={options}
          />
        );
      case 'textarea':
        return (
          <Input
            {...commonProps}
            type="textarea"
            placeholder={placeholder}
          />
        );
      default:
        return (
          <Input
            {...commonProps}
            type={type}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <form
      id={id}
      className={formClasses}
      onSubmit={handleSubmit}
      autoComplete={autoComplete}
      noValidate={noValidate}
      aria-busy={loading}
      {...rest}
    >
      <fieldset disabled={disabled || loading}>
        {fields.length > 0 && (
          <div className="form-fields">
            {fields.map(renderField)}
          </div>
        )}
        {children}
      </fieldset>

      {loading && (
        <div className="form-loading-overlay">
          <div className="form-loading-spinner" />
        </div>
      )}
    </form>
  );
});

Form.propTypes = {
  onSubmit: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  noValidate: PropTypes.bool,
  children: PropTypes.node,
  resetOnSubmit: PropTypes.bool,
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired,
          disabled: PropTypes.bool
        })
      )
    })
  ),
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func
};

Form.displayName = 'Form';

export default Form;