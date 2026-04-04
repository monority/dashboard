import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { DashboardFilters } from '../types';

import { DashboardFiltersBar } from './DashboardFiltersBar';

const DEFAULT_FILTERS: DashboardFilters = {
  range: '30d',
  team: 'all',
  search: '',
};

const renderBar = (filters = DEFAULT_FILTERS, onChange = vi.fn(), onReset = vi.fn()) =>
  render(<DashboardFiltersBar filters={filters} onChange={onChange} onReset={onReset} />);

describe('DashboardFiltersBar', () => {
  it('affiche la zone de rechercche avec role search', () => {
    renderBar();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('affiche les deux selects et le champ recherche', () => {
    renderBar();
    const combos = screen.getAllByRole('combobox');
    expect(combos).toHaveLength(2);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('appelle onChange quand la periode change', async () => {
    const onChange = vi.fn();
    renderBar(DEFAULT_FILTERS, onChange);
    const [rangeSelect] = screen.getAllByRole('combobox');
    await userEvent.selectOptions(rangeSelect!, '7d');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ range: '7d' }));
  });

  it('appelle onReset au clic sur Reinitialiser', async () => {
    const onReset = vi.fn();
    renderBar(DEFAULT_FILTERS, vi.fn(), onReset);
    await userEvent.click(screen.getByRole('button', { name: /Reinitialiser/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('appelle onChange avec la valeur saisie dans la recherche', async () => {
    const onChange = vi.fn();
    renderBar(DEFAULT_FILTERS, onChange);
    await userEvent.type(screen.getByRole('searchbox'), 'alert');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ search: 'a' }));
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
