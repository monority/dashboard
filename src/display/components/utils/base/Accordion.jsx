import React, { useState } from 'react';

const Accordion = ({ items = [], className = '' }) => {
	const [openIndex, setOpenIndex] = useState(null);

	const handleToggle = idx => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<div className={`accordion ${className}`}>
			{items.map((item, idx) => (
				<div className="accordion-item" key={idx}>
					<button
						className="accordion-title"
						onClick={() => handleToggle(idx)}
						aria-expanded={openIndex === idx}
						type="button"
					>
						{item.title}
					</button>
					<div
						className="accordion-content"
						style={{
							display: openIndex === idx ? 'block' : 'none'
						}}
					>
						{item.content}
					</div>
				</div>
			))}
		</div>
	);
};

export default Accordion;