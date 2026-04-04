import { Card } from '@/components/ui';

import type { DashboardGoal } from '../types';

interface DashboardGoalsPanelProps {
  goals: DashboardGoal[];
}

const toProgressPercent = (current: number, target: number) => {
  if (target <= 0) {
    return 0;
  }

  return Math.min(Math.round((current / target) * 100), 100);
};

export const DashboardGoalsPanel = ({ goals }: DashboardGoalsPanelProps) => {
  return (
    <Card>
      <h2>Progression des objectifs</h2>
      {goals.length === 0 ? (
        <p className="dashboard-empty">Aucun objectif ne correspond aux filtres actuels.</p>
      ) : (
        <ul className="dashboard-goal-list">
          {goals.map((goal) => {
            const progress = toProgressPercent(goal.current, goal.target);

            return (
              <li key={goal.id} className="dashboard-goal-item">
                <header>
                  <strong>{goal.label}</strong>
                  <span>{progress}%</span>
                </header>
                <div
                  className="dashboard-goal-progress"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label={`Progression de ${goal.label}`}
                >
                  <span style={{ width: `${progress}%` }} aria-hidden="true" />
                </div>
                <p>
                  {goal.current.toLocaleString('fr-FR')} / {goal.target.toLocaleString('fr-FR')}{' '}
                  {goal.unit}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};
