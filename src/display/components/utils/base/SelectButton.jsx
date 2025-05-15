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

const SelectButton = ({ options = [], onSelect, label }) => {
    const [selectedOption, setSelectedOption] = useState(options[0] || null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <div className="select-button-container">
            <button
                className="select-button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                type="button"
            >
                {selectedOption ? selectedOption.label : label}
                <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                </span>
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectButton;