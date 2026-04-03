import { useEffect, useRef } from 'react';

import type { BaseComponentProps } from '@/types';

interface ModalProps extends BaseComponentProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ title, isOpen, onClose, children, className, testId }: ModalProps) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen || !dialogRef.current) {
            return;
        }

        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'Tab' && focusable.length > 0) {
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                }

                if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const classes = ['ui-modal', className].filter(Boolean).join(' ');

    return (
        <div className="ui-modal-overlay" role="presentation" onClick={onClose}>
            <div
                ref={dialogRef}
                className={classes}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                data-testid={testId}
            >
                <header className="ui-modal-header">
                    <h2>{title}</h2>
                    <button type="button" onClick={onClose} aria-label="Fermer la fenetre">
                        ×
                    </button>
                </header>
                <div className="ui-modal-content">{children}</div>
            </div>
        </div>
    );
};
