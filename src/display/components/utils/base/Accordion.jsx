import React, { useState } from 'react';

const ArrowDown = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
    <path d="M6 8l4 4 4-4" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUp = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
    <path d="M6 12l4-4 4 4" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    >
                        <span>{item.title}</span>
                        <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
                            {openIndex === idx ? <ArrowUp /> : <ArrowDown />}
                        </span>
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