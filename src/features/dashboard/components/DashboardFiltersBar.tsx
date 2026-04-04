import { Button, Input, Select } from '@/components/ui';
import type { SelectOption } from '@/types';

import { DASHBOARD_RANGES, DASHBOARD_TEAMS } from '../types';
import type { DashboardFilters, DashboardRange, DashboardTeam } from '../types';

interface DashboardFiltersBarProps {
  filters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
  onReset: () => void;
}

const RANGE_OPTIONS: SelectOption<DashboardRange>[] = DASHBOARD_RANGES.map((range) => ({
  label: range.toUpperCase(),
  value: range,
}));

const TEAM_OPTIONS: SelectOption<DashboardTeam>[] = DASHBOARD_TEAMS.map((team) => ({
  label: team,
  value: team,
}));

export const DashboardFiltersBar = ({ filters, onChange, onReset }: DashboardFiltersBarProps) => {
  return (
    <div className="dashboard-filters" role="search" aria-label="Filtres du tableau de bord">
      <Select
        label="Periode"
        options={RANGE_OPTIONS}
        value={filters.range}
        onChange={(range) => onChange({ ...filters, range })}
      />
      <Select
        label="Equipe"
        options={TEAM_OPTIONS}
        value={filters.team}
        onChange={(team) => onChange({ ...filters, team })}
      />
      <Input
        type="search"
        label="Recherche"
        value={filters.search}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
        placeholder="Rechercher alertes, activites, objectifs"
        maxLength={80}
      />
      <div className="dashboard-filters__actions">
        <Button variant="ghost" onClick={onReset}>
          Reinitialiser
        </Button>
      </div>
    </div>
  );
};
