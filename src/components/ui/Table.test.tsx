import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { TableColumn } from '@/types';

import { Table } from './Table';

interface UserRow {
  id: string;
  name: string;
  status: string;
}

const COLUMNS: TableColumn<UserRow>[] = [
  { key: 'name', label: 'Nom' },
  { key: 'status', label: 'Statut', align: 'center', width: '8rem' },
];

const ROWS: UserRow[] = [
  { id: 'u1', name: 'Nadia', status: 'Active' },
  { id: 'u2', name: 'Marc', status: 'En attente' },
];

describe('Table', () => {
  it('affiche les en-tetes', () => {
    render(<Table columns={COLUMNS} rows={ROWS} rowKey="id" />);
    expect(screen.getByRole('columnheader', { name: 'Nom' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Statut' })).toBeInTheDocument();
  });

  it('affiche les lignes de donnees', () => {
    render(<Table columns={COLUMNS} rows={ROWS} rowKey="id" />);
    expect(screen.getByText('Nadia')).toBeInTheDocument();
    expect(screen.getByText('En attente')).toBeInTheDocument();
  });

  it('applique alignement et largeur sur les colonnes', () => {
    render(<Table columns={COLUMNS} rows={ROWS} rowKey="id" />);
    const statusHeader = screen.getByRole('columnheader', { name: 'Statut' });
    expect(statusHeader).toHaveStyle({ textAlign: 'center', width: '8rem' });
  });

  it('rend des cellules vides si la valeur est undefined ou null', () => {
    const partialRows = [{ id: 'u3', name: 'Ines', status: undefined as unknown as string }];
    render(<Table columns={COLUMNS} rows={partialRows} rowKey="id" />);
    const row = screen.getByText('Ines').closest('tr');
    expect(row).not.toBeNull();
    const cells = within(row as HTMLTableRowElement).getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('');
  });
});
