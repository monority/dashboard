import { useMemo } from 'react';

import { Badge, Card, Skeleton, Table } from '@/components/ui';
import type { TableColumn } from '@/types';

import {
  formatSupportDate,
  SUPPORT_COPY,
  SUPPORT_STATUS_LABELS,
  SUPPORT_TYPE_LABELS,
} from '../display';
import type { SupportHistoryItem } from '../types';

interface SupportHistoryRow {
  id: string;
  subject: string;
  type: string;
  date: string;
  status: string;
}

interface SupportHistoryProps {
  history: SupportHistoryItem[];
  isLoading: boolean;
}

export const SupportHistory = ({ history, isLoading }: SupportHistoryProps) => {
  const rows = useMemo<SupportHistoryRow[]>(
    () =>
      history.map((item) => ({
        id: item.id,
        subject: item.subject,
        type: SUPPORT_TYPE_LABELS[item.type],
        date: formatSupportDate(item.date),
        status: SUPPORT_STATUS_LABELS[item.status],
      })),
    [history],
  );

  const columns: TableColumn<SupportHistoryRow>[] = [
    { key: 'subject', label: 'Sujet', align: 'left' },
    { key: 'type', label: 'Type', align: 'left' },
    { key: 'date', label: 'Date', align: 'left' },
    { key: 'status', label: 'Statut', align: 'left' },
  ];

  if (isLoading) {
    return (
      <Card>
        <div className="support-history-skeleton" aria-hidden="true">
          <Skeleton height="1.3rem" />
          <Skeleton height="1.3rem" />
          <Skeleton height="1.3rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="support-history-header">
        <h3>{SUPPORT_COPY.historyTitle}</h3>
        <Badge label={SUPPORT_COPY.historyItems(rows.length)} variant="info" />
      </div>
      <Table<SupportHistoryRow> columns={columns} rows={rows} rowKey="id" />
    </Card>
  );
};
