import { useMemo } from 'react';

import { Badge, Card, Skeleton, Table } from '@/components/ui';
import type { TableColumn } from '@/types';

import { ORDER_COPY, ORDER_ROLE_LABELS } from '../display';
import type { CollaboratorShare } from '../types';

interface CollaboratorRow {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface OrderCollaboratorsProps {
  collaborators: CollaboratorShare[];
  isLoading: boolean;
}

export const OrderCollaborators = ({ collaborators, isLoading }: OrderCollaboratorsProps) => {
  const rows = useMemo<CollaboratorRow[]>(
    () =>
      collaborators.map((collaborator) => ({
        id: collaborator.id,
        name: collaborator.name,
        email: collaborator.email,
        role: ORDER_ROLE_LABELS[collaborator.role],
      })),
    [collaborators],
  );

  const columns: TableColumn<CollaboratorRow>[] = [
    { key: 'name', label: 'Nom', align: 'left' },
    { key: 'email', label: 'Email', align: 'left' },
    { key: 'role', label: 'Role', align: 'left' },
  ];

  if (isLoading) {
    return (
      <Card>
        <div className="order-collab-skeleton" aria-hidden="true">
          <Skeleton height="1.3rem" />
          <Skeleton height="1.3rem" />
          <Skeleton height="1.3rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="order-collab-header">
        <h2>{ORDER_COPY.collaboratorsTitle}</h2>
        <Badge label={ORDER_COPY.collaboratorsCount(rows.length)} variant="info" />
      </div>
      <Table<CollaboratorRow> columns={columns} rows={rows} rowKey="id" />
    </Card>
  );
};
