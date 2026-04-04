import { Badge, Card, Skeleton } from '@/components/ui';

import { SUPPORT_COPY } from '../display';
import type { SupportStats as SupportStatsModel } from '../types';

interface SupportStatsProps {
  stats: SupportStatsModel | null;
  isLoading: boolean;
}

export const SupportStats = ({ stats, isLoading }: SupportStatsProps) => {
  if (isLoading || !stats) {
    return (
      <Card>
        <div className="support-stats-skeleton" aria-hidden="true">
          <Skeleton height="1.4rem" />
          <Skeleton height="1.4rem" />
          <Skeleton height="1.4rem" />
          <Skeleton height="1.4rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="support-stats-grid">
        <div>
          <h3>{SUPPORT_COPY.stats.issuesThisMonth}</h3>
          <p>{stats.issuesThisMonth}</p>
          <Badge label={`${stats.issuesGrowthPercent}%`} variant="success" />
        </div>
        <div>
          <h3>{SUPPORT_COPY.stats.issuesSolved}</h3>
          <p>{stats.issuesSolved}</p>
        </div>
        <div>
          <h3>{SUPPORT_COPY.stats.avgResponseTime}</h3>
          <p>{stats.avgResponseTimePercent}%</p>
          <Badge
            label={`${Math.abs(stats.responseDeltaPercent)}%`}
            variant={stats.responseDeltaPercent > 0 ? 'success' : 'danger'}
          />
        </div>
        <div>
          <h3>{SUPPORT_COPY.stats.clientSatisfaction}</h3>
          <p>{stats.clientSatisfactionPercent}%</p>
          <Badge label={`${stats.satisfactionGrowthPercent}%`} variant="success" />
        </div>
        <div>
          <h3>{SUPPORT_COPY.stats.openTickets}</h3>
          <p>{stats.openTickets}</p>
        </div>
      </div>
    </Card>
  );
};
