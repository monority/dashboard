import { Card } from '@/components/ui';

import type { DashboardTrendPoint } from '../types';

interface DashboardTrendChartProps {
  points: DashboardTrendPoint[];
}

const formatYAxisValue = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

export const DashboardTrendChart = ({ points }: DashboardTrendChartProps) => {
  if (points.length === 0) {
    return (
      <Card>
        <h2>Tendance du chiffre d'affaires</h2>
        <p className="dashboard-empty">Aucune tendance disponible pour les filtres actuels.</p>
      </Card>
    );
  }

  const maxValue = Math.max(...points.map((point) => point.value));
  const minValue = Math.min(...points.map((point) => point.value));
  const valueRange = Math.max(maxValue - minValue, 1);

  return (
    <Card>
      <div className="dashboard-chart-header">
        <h2>Tendance du chiffre d'affaires</h2>
        <p>{formatYAxisValue(points[points.length - 1]?.value ?? 0)} au plus recent</p>
      </div>
      <div
        className="dashboard-chart"
        role="img"
        aria-label="Graphique de tendance du chiffre d'affaires"
      >
        {points.map((point) => {
          const normalized = (point.value - minValue) / valueRange;
          const height = Math.max(Math.round(normalized * 100), 8);

          return (
            <div key={point.label} className="dashboard-chart-bar">
              <span
                className="dashboard-chart-bar__fill"
                style={{ height: `${height}%` }}
                aria-hidden="true"
              />
              <span className="dashboard-chart-bar__label">{point.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
