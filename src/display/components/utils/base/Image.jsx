import React from 'react';

const Image = ({ path, alt, title, loading, classname }) => {
	return (
		<img
			src={path}
			alt={alt}
			title={title}
			loading={loading}
			className={classname}
		/>
	);
};

export default Image;