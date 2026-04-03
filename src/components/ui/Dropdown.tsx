import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DropdownItem {
    id: string;
    label: string;
    onSelect: () => void;
}

interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItem[];
}

export const Dropdown = ({ trigger, items }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onClickOutside);

        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, []);

    return (
        <div className="ui-dropdown" ref={menuRef}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                {trigger}
            </button>
            {open ? (
                <ul className="ui-dropdown-menu" role="menu">
                    {items.map((item) => (
                        <li key={item.id} role="none">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    item.onSelect();
                                    setOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
