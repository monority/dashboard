import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { SupportFaqItem } from '../types';

import { SupportFaq } from './SupportFaq';

const FAQ: SupportFaqItem[] = [
  {
    id: 'f1',
    title: 'Comment reinitialiser mon mot de passe?',
    content: 'Rendez-vous sur la page de connexion et cliquez sur "Mot de passe oublie".',
  },
  {
    id: 'f2',
    title: 'Comment contacter le support?',
    content: 'Utilisez le formulaire de contact ou envoyez un email a support@exemple.fr.',
  },
  {
    id: 'f3',
    title: 'Quels sont les horaires du support?',
    content: 'Le support est disponible du lundi au vendredi de 9h a 18h.',
  },
];

describe('SupportFaq', () => {
  it('affiche un skeleton pendant le chargement', () => {
    const { container } = render(<SupportFaq faq={[]} isLoading={true} />);

    expect(container.querySelector('.support-faq-skeleton')).toBeInTheDocument();
  });

  it('affiche le titre de la FAQ', () => {
    render(<SupportFaq faq={FAQ} isLoading={false} />);

    expect(screen.getByText('Questions frequentes')).toBeInTheDocument();
  });

  it('affiche les titres de toutes les entrees FAQ', () => {
    render(<SupportFaq faq={FAQ} isLoading={false} />);

    expect(screen.getByText('Comment reinitialiser mon mot de passe?')).toBeInTheDocument();
    expect(screen.getByText('Comment contacter le support?')).toBeInTheDocument();
    expect(screen.getByText('Quels sont les horaires du support?')).toBeInTheDocument();
  });

  it('le contenu est masque par defaut (details ferme)', () => {
    render(<SupportFaq faq={FAQ} isLoading={false} />);

    const details = screen.getAllByRole('group');
    for (const el of details) {
      expect(el).not.toHaveAttribute('open');
    }
  });

  it('revele le contenu apres un clic sur le summary', async () => {
    const user = userEvent.setup();
    render(<SupportFaq faq={FAQ} isLoading={false} />);

    const firstSummary = screen.getByText('Comment reinitialiser mon mot de passe?');
    await user.click(firstSummary);

    const details = firstSummary.closest('details');
    expect(details).toHaveAttribute('open');
    expect(
      screen.getByText(
        'Rendez-vous sur la page de connexion et cliquez sur "Mot de passe oublie".',
      ),
    ).toBeInTheDocument();
  });
});
