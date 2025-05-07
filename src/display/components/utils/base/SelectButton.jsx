import React, { useState } from 'react';

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
            >
                {selectedOption ? selectedOption.label : label}
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