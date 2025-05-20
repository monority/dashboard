import React from 'react';

const Option = React.memo(({
    value,
    disabled = false,
    className = '',
    children,
    ...rest
}) => (
    <option
        value={value}
        disabled={disabled}
        className={['option', className].filter(Boolean).join(' ')}
        {...rest}
    >
        {children}
    </option>
));

export default Option;