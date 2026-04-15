import { useState } from 'react';

import { Card } from '@/components/ui';

import type { DashboardTrendPoint } from '../types';

interface DashboardTrendChartProps {
  points: DashboardTrendPoint[];
}

const formatEuro = (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 0,
  }).format(value);

const buildSmoothPath = (pts: DashboardTrendPoint[], maxVal: number, minVal: number) => {
  const W = 800;
  const H = 140;
  const PAD = 12;

  const coords = pts.map((p, i) => ({
    x: (i / (pts.length - 1)) * W,
    y: PAD + ((maxVal - p.value) / (maxVal - minVal || 1)) * (H - PAD * 2),
  }));

  const first = coords[0];
  if (!first) return { d: '', coords: [] };

  let d = `M ${first.x} ${first.y}`;

  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    if (!curr || !next) continue;
    const cp1x = curr.x + (next.x - curr.x) * 0.35;
    const cp1y = curr.y;
    const cp2x = next.x - (next.x - curr.x) * 0.35;
    const cp2y = next.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return { d, coords };
};

export const DashboardTrendChart = ({ points }: DashboardTrendChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (points.length === 0) {
    return (
      <Card className="dashboard-chart-card">
        <h2>Tendance du chiffre d'affaires</h2>
        <p className="dashboard-empty">Aucune tendance disponible pour les filtres actuels.</p>
      </Card>
    );
  }

  const maxValue = Math.max(...points.map((p) => p.value));
  const minValue = Math.min(...points.map((p) => p.value));
  const avgValue = points.reduce((sum, p) => sum + p.value, 0) / points.length;
  const firstValue = points[0]?.value ?? 0;
  const lastValue = points[points.length - 1]?.value ?? 0;
  const totalVariation = ((lastValue - firstValue) / firstValue) * 100;

  const { d: linePath, coords } = buildSmoothPath(points, maxValue, minValue);

  return (
    <Card className="dashboard-chart-card">
      <div className="dashboard-chart-header">
        <div>
          <h2>Tendance du chiffre d'affaires</h2>
          <p className="dashboard-chart-subtitle">
            {formatEuro(firstValue)} → {formatEuro(lastValue)}{' '}
            <span className={totalVariation >= 0 ? 'text-success' : 'text-danger'}>
              ({totalVariation >= 0 ? '+' : ''}
              {totalVariation.toFixed(1)}%)
            </span>
          </p>
        </div>
        <div className="dashboard-chart-stats">
          <div>
            <span className="dashboard-chart-stat-label">Moyenne</span>
            <span className="dashboard-chart-stat-value">{formatEuro(avgValue)}</span>
          </div>
          <div>
            <span className="dashboard-chart-stat-label">Min</span>
            <span className="dashboard-chart-stat-value">{formatEuro(minValue)}</span>
          </div>
          <div>
            <span className="dashboard-chart-stat-label">Max</span>
            <span className="dashboard-chart-stat-value">{formatEuro(maxValue)}</span>
          </div>
        </div>
      </div>
      <div
        className="dashboard-chart"
        role="img"
        aria-label="Graphique de tendance du chiffre d'affaires"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg viewBox="0 0 800 140" className="dashboard-chart-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d={linePath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
            opacity="0.3"
          />
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {coords.map((coord, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <circle
                key={i}
                cx={coord.x}
                cy={coord.y}
                r={isHovered ? 3 : 0}
                fill="var(--accent)"
                style={{ transition: 'r 0.15s ease' }}
              />
            );
          })}
        </svg>
        <div className="dashboard-chart-x-labels">
          {points.map((point, i) => (
            <span
              key={point.label}
              className={`dashboard-chart-x-label ${hoveredIndex === i ? 'active' : ''}`}
              style={{ left: `${(i / (points.length - 1)) * 100}%` }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
