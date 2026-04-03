import { useToast } from '@/hooks';

export const Toast = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) {
        return null;
    }

    return (
        <aside className="ui-toast-stack" aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => (
                <article key={toast.id} className={`ui-toast ui-toast--${toast.variant}`} role="status">
                    <div>
                        <strong>{toast.title}</strong>
                        {toast.description ? <p>{toast.description}</p> : null}
                    </div>
                    <button type="button" aria-label="Fermer la notification" onClick={() => removeToast(toast.id)}>
                        ×
                    </button>
                </article>
            ))}
        </aside>
    );
};
