import { Badge, Card, Skeleton } from '@/components/ui';

import type { OrderKpi } from '../types';

interface OrderKpiGridProps {
  kpis: OrderKpi[];
  isLoading: boolean;
}

export const OrderKpiGrid = ({ kpis, isLoading }: OrderKpiGridProps) => {
  if (isLoading) {
    return (
      <div className="order-kpi-grid" aria-hidden="true">
        <Card>
          <Skeleton height="4.2rem" />
        </Card>
        <Card>
          <Skeleton height="4.2rem" />
        </Card>
        <Card>
          <Skeleton height="4.2rem" />
        </Card>
        <Card>
          <Skeleton height="4.2rem" />
        </Card>
      </div>
    );
  }

  return (
    <div className="order-kpi-grid">
      {kpis.map((kpi) => (
        <Card key={kpi.key}>
          <div className="order-kpi-card">
            <h3>{kpi.title}</h3>
            <p>{kpi.value}</p>
            <Badge
              label={`${kpi.deltaPercent.toFixed(1)}%`}
              variant={kpi.deltaPercent >= 0 ? 'success' : 'danger'}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
