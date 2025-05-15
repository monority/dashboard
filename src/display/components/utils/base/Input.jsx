import React, { useState } from 'react';
import Icon from '../Icon';

const Input = ({ type, initialValue, name, defValue, placeholder, icon, className = '', inputClassName, maxWidth }) => {
	const getDefaultValue = () => {
		if (type === 'date' && !initialValue && !defValue) {
			const today = new Date();
			return today.toISOString().split('T')[0];
		}
		return initialValue || defValue || '';
	};

	const [value, setValue] = useState(getDefaultValue());
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === 'password';
	const inputType = isPassword && showPassword ? 'text' : type;

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const togglePasswordVisibility = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div
			className={`form_element relative ${className}`}
			style={maxWidth ? { maxWidth } : undefined}
		>
			<div className="input_wrapper">
				{icon && <>{icon}</>}
				<input
					type={inputType}
					value={value}
					name={name}
					id={name}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
					className={` ${icon ? 'with_icon' : ''} ${inputClassName}`}
					min={type === 'number' ? 1 : undefined}
					max={type === 'number' ? 8 : undefined}
				/>
				<label
					htmlFor={name}
					className={`label_default ${value && !isFocused ? 'label_disabled' : ''}`}
				>
				</label>
			</div>
			{isPassword && (
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="password_toggle"
					aria-label={showPassword ? 'Hide password' : 'Show password'}>
					{showPassword ? (
						<Icon type="eye-off" size="2rem" />
					) : (
						<Icon type="eye" size="2rem" />
					)}
				</button>
			)}
		</div>
	);
}
export default Input;