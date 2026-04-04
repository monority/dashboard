import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Badge, Button, Card, Skeleton } from '@/components/ui';

import { DASHBOARD_COPY, formatDashboardDateTime } from '../display';
import { useDashboardOverview } from '../hooks';
import type { DashboardFilters } from '../types';
import {
  buildDashboardSearchParams,
  DEFAULT_DASHBOARD_FILTERS,
  parseDashboardFilters,
} from '../url-filters';

import { DashboardAlertsPanel } from './DashboardAlertsPanel';
import { DashboardFiltersBar } from './DashboardFiltersBar';
import { DashboardGoalsPanel } from './DashboardGoalsPanel';
import { DashboardTrendChart } from './DashboardTrendChart';
import './dashboard-page.css';

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_DASHBOARD_FILTERS);
  const { data, isLoading, isError, refetch } = useDashboardOverview(filters);

  useEffect(() => {
    const nextFilters = parseDashboardFilters(searchParams);

    setFilters((previous) => {
      if (
        previous.range === nextFilters.range &&
        previous.team === nextFilters.team &&
        previous.search === nextFilters.search
      ) {
        return previous;
      }

      return nextFilters;
    });
  }, [searchParams]);

  useEffect(() => {
    const nextParams = buildDashboardSearchParams(filters);

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  return (
    <section className="dashboard-page">
      <header>
        <h1>{DASHBOARD_COPY.pageTitle}</h1>
        <p>{DASHBOARD_COPY.pageDescription}</p>
      </header>

      <DashboardFiltersBar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_DASHBOARD_FILTERS)}
      />

      {isError ? (
        <Card>
          <div className="dashboard-error-state" role="alert">
            <h2>{DASHBOARD_COPY.errorTitle}</h2>
            <p>{DASHBOARD_COPY.errorDescription}</p>
            <Button variant="ghost" onClick={() => void refetch()}>
              {DASHBOARD_COPY.retry}
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="dashboard-kpi-grid">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <Card key={`skeleton-${index}`}>
                <Skeleton height="4.1rem" />
              </Card>
            ))
          : (data?.kpis ?? []).map((kpi) => (
              <Card key={kpi.id}>
                <div className="dashboard-kpi-card">
                  <h3>{kpi.label}</h3>
                  <p>{kpi.value}</p>
                  <Badge
                    label={DASHBOARD_COPY.trendBadge(kpi.trendPercent)}
                    variant={kpi.trendPercent >= 0 ? 'success' : 'danger'}
                  />
                </div>
              </Card>
            ))}
      </div>

      <div className="dashboard-analytics-grid">
        {isLoading ? (
          <Card>
            <Skeleton height="12rem" />
          </Card>
        ) : (
          <DashboardTrendChart points={data?.trend ?? []} />
        )}

        {isLoading ? (
          <Card>
            <Skeleton height="12rem" />
          </Card>
        ) : (
          <DashboardAlertsPanel alerts={data?.alerts ?? []} />
        )}
      </div>

      {isLoading ? (
        <Card>
          <Skeleton height="8rem" />
        </Card>
      ) : (
        <DashboardGoalsPanel goals={data?.goals ?? []} />
      )}

      <Card>
        <h2>{DASHBOARD_COPY.activityTitle}</h2>
        {isLoading ? (
          <div className="dashboard-skeleton-list" aria-hidden="true">
            <Skeleton height="1.3rem" />
            <Skeleton height="1.3rem" />
            <Skeleton height="1.3rem" />
          </div>
        ) : (
          <ul className="dashboard-activity-list">
            {(data?.activities ?? []).map((activity) => (
              <li key={activity.id} className="dashboard-activity-item">
                <header>
                  <strong>{activity.title}</strong>
                  <time>{formatDashboardDateTime(activity.date)}</time>
                </header>
                <small>{activity.team}</small>
                <p>{activity.meta}</p>
              </li>
            ))}

            {!isLoading && (data?.activities?.length ?? 0) === 0 ? (
              <li className="dashboard-empty">{DASHBOARD_COPY.activityEmpty}</li>
            ) : null}
          </ul>
        )}
      </Card>
    </section>
  );
};
