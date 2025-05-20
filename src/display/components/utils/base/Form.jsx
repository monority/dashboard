import React from 'react';
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
  const formClasses = ['form', `form-${layout}`, className].filter(Boolean).join(' ');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit && !disabled && !loading) {
      onSubmit(event);
      if (resetOnSubmit) event.target.reset();
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

    const fieldValue = values[name] ?? '';
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

    if (type === 'select') {
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
    }
    if (type === 'checkbox') {
      return <Checkbox {...commonProps} checked={!!fieldValue} />;
    }
    if (type === 'radio') {
      return <RadioGroup {...commonProps} options={options} />;
    }
    if (type === 'textarea') {
      return <Input {...commonProps} type="textarea" placeholder={placeholder} />;
    }
    return <Input {...commonProps} type={type} placeholder={placeholder} />;
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

export default Form;