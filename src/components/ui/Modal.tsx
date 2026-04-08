import { useEffect, useRef, useState } from 'react';

import type { BaseComponentProps } from '@/types';

/** Props for the Modal component */
interface ModalProps extends BaseComponentProps {
  /** Modal title displayed in header */
  title: string;
  /** Whether the modal is open and visible */
  isOpen: boolean;
  /** Callback when modal should close (Escape key or backdrop click) */
  onClose: () => void;
}

/**
 * Accessible modal dialog component with focus trap and keyboard navigation.
 * Features:
 * - Focus trap prevents focus leaving the modal when open
 * - Escape key closes the modal
 * - Backdrop click closes the modal
 * - Full keyboard navigation support within modal
 * - Screen reader announcements for modal state changes
 *
 * @param props - Modal component props
 * @returns Modal dialog element, null when not open
 */
export const Modal = ({ title, isOpen, onClose, children, className, testId }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnnouncement(`Modal "${title}" opened. Use Escape key to close.`);
    } else {
      setAnnouncement(`Modal "${title}" closed.`);
    }
  }, [isOpen, title]);

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
    <>
      {/* Screen reader announcements for modal state changes */}
      <div className="app-visually-hidden" aria-live="assertive" aria-atomic="true">
        {announcement}
      </div>

      <div
        className="ui-modal-overlay"
        role="button"
        tabIndex={0}
        aria-label="Fermer la fenetre modale"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClose();
          }
        }}
      >
        <div
          ref={dialogRef}
          className={classes}
          role="dialog"
          aria-modal="true"
          aria-label={title}
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
    </>
  );
};

Modal.displayName = 'Modal';
