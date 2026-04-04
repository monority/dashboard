export interface OrderKpi {
  key: 'revenue' | 'subscriptions' | 'sales' | 'active';
  title: string;
  value: string;
  deltaPercent: number;
}

export interface CollaboratorShare {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Editor' | 'Viewer';
}

export interface OrderOverview {
  kpis: OrderKpi[];
  documentUrl: string;
  collaborators: CollaboratorShare[];
}
