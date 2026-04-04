import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('associe correctement le label a l input', () => {
    render(<Input label="Email" type="email" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('utilise l id fourni quand present', () => {
    render(<Input id="custom-id" label="Nom" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox', { name: 'Nom' })).toHaveAttribute('id', 'custom-id');
  });

  it('affiche le message d erreur', () => {
    render(<Input label="Telephone" value="" onChange={() => {}} errorMessage="Champ invalide" />);
    expect(screen.getByText('Champ invalide')).toBeInTheDocument();
  });

  it('annonce l erreur via aria-invalid et aria-describedby', () => {
    render(
      <Input
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
        errorMessage="Email invalide"
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    const errorId = input.getAttribute('aria-describedby');
    expect(screen.getByText('Email invalide')).toHaveAttribute('id', errorId);
  });

  it('n a pas aria-invalid quand il n y a pas d erreur', () => {
    render(<Input label="Email" type="email" value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('appelle onChange quand on saisit du texte', async () => {
    const onChange = vi.fn();
    render(<Input label="Ville" value="" onChange={onChange} />);

    await userEvent.type(screen.getByRole('textbox', { name: 'Ville' }), 'Paris');

    expect(onChange).toHaveBeenCalled();
  });

  it('applique la classe wrapper custom', () => {
    render(
      <Input
        label="Code"
        value=""
        onChange={() => {}}
        className="input-custom"
        testId="input-wrap"
      />,
    );
    expect(screen.getByTestId('input-wrap')).toHaveClass('ui-input-wrapper', 'input-custom');
  });

  it('affiche un asterisque quand required est true', () => {
    render(<Input label="Nom" value="" onChange={() => {}} required />);
    const asterisk = screen.getByLabelText('requis');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('ajoute aria-required au input quand required est true', () => {
    render(<Input label="Nom" value="" onChange={() => {}} required />);
    expect(screen.getByRole('textbox', { name: /Nom/i })).toHaveAttribute('aria-required', 'true');
    expect(screen.getByRole('textbox', { name: /Nom/i })).toHaveAttribute('required');
  });
});
