import React from 'react';

const Button = React.memo(({
    text,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
    variant = 'default',
    icon,
    children,
    ...rest
}) => {
    const buttonClasses = ['btn', `btn_${variant}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children || text}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;