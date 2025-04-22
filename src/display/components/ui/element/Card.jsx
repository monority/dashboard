import React from 'react';
import PropTypes from 'prop-types';

const Card = React.memo(({
	title,
	subtitle,
	children,
	footer,
	image,
	imageAlt = '',
	imagePosition = 'top',
	className = '',
	variant = 'default',
	elevation = 1,
	onClick,
	hoverable = false,
	...rest
}) => {
	const cardClasses = [
		'card',
		`card-${variant}`,
		`elevation-${elevation}`,
		imagePosition && `image-${imagePosition}`,
		hoverable && 'card-hoverable',
		onClick && 'card-clickable',
		className
	].filter(Boolean).join(' ');

	return (
		<div
			className={cardClasses}
			onClick={onClick}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}
			{...rest}
		>
			{image && (
				<div className="card_image">
					<img src={image} alt={imageAlt} />
				</div>
			)}

			<div className="card_content">
				{title && <h3 className="card_title">{title}</h3>}
				{subtitle && <div className="card_subtitle">{subtitle}</div>}
				{children && <div className="card_body">{children}</div>}
			</div>

			{footer && (
				<div className="card-footer">
					{footer}
				</div>
			)}
		</div>
	);
});

Card.propTypes = {
	title: PropTypes.node,
	subtitle: PropTypes.node,
	children: PropTypes.node,
	footer: PropTypes.node,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	imagePosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
	className: PropTypes.string,
	variant: PropTypes.string,
	elevation: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
	onClick: PropTypes.func,
	hoverable: PropTypes.bool,
};

Card.displayName = 'Card';

export default Card;