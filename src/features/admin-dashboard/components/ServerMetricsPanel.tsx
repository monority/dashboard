import { memo } from 'react';

import { ServerMetricsChart } from '@/components/charts';
import { Card } from '@/components/ui';
import type { ServerMetrics } from '@/types';

interface ServerMetricsPanelProps {
  metrics: ServerMetrics | null;
  history: Array<{ time: string; cpu: number; memory: number; disk: number }>;
}

function ServerMetricsPanelComponent({ metrics, history }: ServerMetricsPanelProps) {
  return (
    <Card>
      <div className="server-metrics-panel">
        <h3>Server Metrics</h3>

        {metrics && (
          <div className="metrics-grid">
            <div className="metric-card cpu">
              <span className="metric-label">CPU</span>
              <span className="metric-value">{metrics.cpu}%</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.cpu}%` }} />
              </div>
            </div>
            <div className="metric-card memory">
              <span className="metric-label">Memory</span>
              <span className="metric-value">{metrics.memory}%</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.memory}%` }} />
              </div>
            </div>
            <div className="metric-card disk">
              <span className="metric-label">Disk</span>
              <span className="metric-value">{metrics.disk}%</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metrics.disk}%` }} />
              </div>
            </div>
            <div className="metric-card network">
              <span className="metric-label">Network I/O</span>
              <span className="metric-value">
                ↓ {metrics.networkIn} / ↑ {metrics.networkOut} MB/s
              </span>
            </div>
          </div>
        )}

        <div className="metrics-charts">
          <div className="chart-container">
            <h4>CPU Usage</h4>
            <ServerMetricsChart
              data={history.map((h) => ({ time: h.time, value: h.cpu }))}
              metric="cpu"
            />
          </div>
          <div className="chart-container">
            <h4>Memory Usage</h4>
            <ServerMetricsChart
              data={history.map((h) => ({ time: h.time, value: h.memory }))}
              metric="memory"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export const ServerMetricsPanel = memo(ServerMetricsPanelComponent);
