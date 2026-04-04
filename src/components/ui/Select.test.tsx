import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

const OPTIONS = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'system', label: 'Systeme', disabled: true },
] as const;

describe('Select', () => {
  it('affiche la valeur selectionnee', () => {
    render(<Select options={[...OPTIONS]} value="dark" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveValue('dark');
  });

  it('associe correctement le label au select', () => {
    render(<Select options={[...OPTIONS]} value="light" onChange={() => {}} label="Theme" />);
    expect(screen.getByRole('combobox', { name: 'Theme' })).toBeInTheDocument();
  });

  it('affiche toutes les options avec etat disabled', () => {
    render(<Select options={[...OPTIONS]} value="light" onChange={() => {}} />);
    expect(screen.getByRole('option', { name: 'Clair' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sombre' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Systeme' })).toBeDisabled();
  });

  it('declenche onChange avec la nouvelle valeur', async () => {
    const onChange = vi.fn();
    render(<Select options={[...OPTIONS]} value="light" onChange={onChange} />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'dark');

    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('utilise l id fourni quand present', () => {
    render(
      <Select
        options={[...OPTIONS]}
        value="light"
        onChange={() => {}}
        label="Theme"
        id="theme-select"
      />,
    );
    expect(screen.getByRole('combobox', { name: 'Theme' })).toHaveAttribute('id', 'theme-select');
  });

  it('affiche le message d erreur', () => {
    render(
      <Select
        options={[...OPTIONS]}
        value="light"
        onChange={() => {}}
        label="Theme"
        errorMessage="Selectionnez un theme valide"
      />,
    );
    expect(screen.getByText('Selectionnez un theme valide')).toBeInTheDocument();
  });

  it('annonce l erreur via aria-invalid et aria-describedby', () => {
    render(
      <Select
        options={[...OPTIONS]}
        value="light"
        onChange={() => {}}
        label="Theme"
        errorMessage="Theme requise"
      />,
    );
    const select = screen.getByRole('combobox', { name: 'Theme' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby');
    const errorId = select.getAttribute('aria-describedby');
    expect(screen.getByText('Theme requise')).toHaveAttribute('id', errorId);
  });

  it('n a pas aria-invalid quand il n y a pas d erreur', () => {
    render(<Select options={[...OPTIONS]} value="light" onChange={() => {}} label="Theme" />);
    const select = screen.getByRole('combobox', { name: 'Theme' });
    expect(select).toHaveAttribute('aria-invalid', 'false');
    expect(select).not.toHaveAttribute('aria-describedby');
  });

  it('affiche un asterisque quand required est true', () => {
    render(
      <Select options={[...OPTIONS]} value="light" onChange={() => {}} label="Theme" required />,
    );
    const asterisk = screen.getByLabelText('requis');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('ajoute aria-required au select quand required est true', () => {
    render(
      <Select options={[...OPTIONS]} value="light" onChange={() => {}} label="Theme" required />,
    );
    expect(screen.getByRole('combobox', { name: /Theme/i })).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByRole('combobox', { name: /Theme/i })).toHaveAttribute('required');
  });
});
