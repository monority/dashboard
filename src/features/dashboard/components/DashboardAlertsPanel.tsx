import { Badge, Card } from '@/components/ui';

import type { DashboardAlert } from '../types';

interface DashboardAlertsPanelProps {
  alerts: DashboardAlert[];
}

export const DashboardAlertsPanel = ({ alerts }: DashboardAlertsPanelProps) => {
  return (
    <Card>
      <div className="dashboard-card-title-row">
        <h2>Centre d'alertes</h2>
        <Badge label={`${alerts.length}`} variant={alerts.length > 0 ? 'warning' : 'info'} />
      </div>

      {alerts.length === 0 ? (
        <p className="dashboard-empty">Aucune alerte active pour les filtres actuels.</p>
      ) : (
        <ul className="dashboard-alert-list">
          {alerts.map((alert) => (
            <li key={alert.id} className="dashboard-alert-item">
              <header>
                <strong>{alert.title}</strong>
                <Badge label={alert.severity.toUpperCase()} variant={alert.severity} />
              </header>
              <p>{alert.description}</p>
              <small>{alert.team}</small>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
