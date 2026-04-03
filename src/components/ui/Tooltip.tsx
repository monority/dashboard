import { useState, type ReactNode } from 'react';

interface TooltipProps {
    content: string;
    children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
    const [open, setOpen] = useState(false);

    return (
        <span
            className="ui-tooltip"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            {children}
            {open ? <span role="tooltip">{content}</span> : null}
        </span>
    );
};
