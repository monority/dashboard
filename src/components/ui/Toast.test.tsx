import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useToast: vi.fn(),
}));

import { useToast } from '@/hooks';

import { Toast } from './Toast';

describe('Toast', () => {
  it('ne rend rien quand la pile est vide', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [],
      notify: vi.fn(),
      removeToast: vi.fn(),
    } as unknown as ReturnType<typeof useToast>);

    const { container } = render(<Toast />);
    expect(container.firstChild).toBeNull();
  });

  it('affiche les notifications avec titre et description', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [
        { id: 't1', title: 'Succes', description: 'Operation terminee', variant: 'success' },
      ],
      notify: vi.fn(),
      removeToast: vi.fn(),
    } as unknown as ReturnType<typeof useToast>);

    render(<Toast />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Succes')).toBeInTheDocument();
    expect(screen.getByText('Operation terminee')).toBeInTheDocument();
  });

  it('appelle removeToast au clic sur fermer', async () => {
    const removeToast = vi.fn();
    vi.mocked(useToast).mockReturnValue({
      toasts: [{ id: 't1', title: 'Succes', variant: 'success' }],
      notify: vi.fn(),
      removeToast,
    } as unknown as ReturnType<typeof useToast>);

    render(<Toast />);
    await userEvent.click(screen.getByRole('button', { name: 'Fermer la notification' }));

    expect(removeToast).toHaveBeenCalledWith('t1');
  });
});
