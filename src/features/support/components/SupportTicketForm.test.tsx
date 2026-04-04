import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useToast: vi.fn(() => ({ notify: vi.fn() })),
}));

import { useToast } from '@/hooks';

import { SupportTicketForm } from './SupportTicketForm';

const renderForm = () => render(<SupportTicketForm />);

const submitForm = (container: HTMLElement) => {
  const form = container.querySelector('form');
  if (form) fireEvent.submit(form);
};

describe('SupportTicketForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le titre et les champs du formulaire', () => {
    renderForm();
    expect(screen.getByRole('heading', { level: 2, name: 'Creer un ticket' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Sujet/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('affiche le bouton de soumission', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /Envoyer le ticket/i })).toBeInTheDocument();
  });

  it('appelle notify avec le sujet saisi apres soumission', async () => {
    const notify = vi.fn();
    vi.mocked(useToast).mockReturnValue({ notify } as unknown as ReturnType<typeof useToast>);
    const { container } = renderForm();
    await userEvent.type(screen.getByRole('textbox', { name: /Sujet/i }), 'Bug critique login');
    submitForm(container);
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Ticket cree',
        variant: 'success',
      }),
    );
    const call = notify.mock.calls[0]?.[0] as { description: string };
    expect(call.description).toContain('Bug critique login');
  });

  it('reinitialise les champs apres soumission', async () => {
    const { container } = renderForm();
    const subjectInput = screen.getByRole('textbox', { name: /Sujet/i });
    await userEvent.type(subjectInput, 'Probleme facturation');
    submitForm(container);
    expect(subjectInput).toHaveValue('');
  });

  it('inclut le label du type dans la description notify', async () => {
    const notify = vi.fn();
    vi.mocked(useToast).mockReturnValue({ notify } as unknown as ReturnType<typeof useToast>);
    const { container } = renderForm();
    await userEvent.selectOptions(screen.getByRole('combobox'), 'billing');
    await userEvent.type(screen.getByRole('textbox', { name: /Sujet/i }), 'Facture manquante');
    submitForm(container);
    const call = notify.mock.calls[0]?.[0] as { description: string };
    expect(call.description).toContain('Question de facturation');
  });
});
