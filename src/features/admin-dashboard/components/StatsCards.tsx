import { Card } from '@/components/ui';
import type { ServerMetrics } from '@/types';

interface StatsCardsProps {
  serverMetrics: ServerMetrics | null;
  activeUsers: number;
  transactionsCount: number;
}

export function StatsCards({ serverMetrics, activeUsers, transactionsCount }: StatsCardsProps) {
  return (
    <div className="stats-cards">
      <Card>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-content">
            <span className="stat-value">{activeUsers}</span>
            <span className="stat-label">Active Users</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-content">
            <span className="stat-value">{transactionsCount}</span>
            <span className="stat-label">Transactions Today</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stat-card">
          <span className="stat-icon">🔴</span>
          <div className="stat-content">
            <span className="stat-value">{serverMetrics?.cpu ?? 0}%</span>
            <span className="stat-label">CPU Usage</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stat-card">
          <span className="stat-icon">💾</span>
          <div className="stat-content">
            <span className="stat-value">{serverMetrics?.memory ?? 0}%</span>
            <span className="stat-label">Memory Usage</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
