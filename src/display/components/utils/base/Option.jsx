import React from 'react';
import PropTypes from 'prop-types';

const Option = React.memo(({
	value,
	disabled = false,
	className = '',
	children,
	...rest
}) => {
	const optionClasses = ['option', className]
		.filter(Boolean)
		.join(' ');

	return (
		<option
			value={value}
			disabled={disabled}
			className={optionClasses}
			{...rest}
		>
			{children}
		</option>
	);
});

Option.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Option.displayName = 'Option';

export default Option;