export type UserRole = 'admin' | 'manager' | 'viewer';

export interface Permission {
  code: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  permissions: Permission[];
}

export interface BillingRecord {
  id: string;
  amountCents: number;
  currency: 'EUR' | 'USD';
  status: 'paid' | 'pending' | 'failed';
  issuedAt: Date;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
}

export type GlobalSearchResultKind = 'section' | 'mail' | 'task' | 'support' | 'review' | 'order';

export interface GlobalSearchResult {
  id: string;
  label: string;
  description: string;
  route: string;
  kind: GlobalSearchResultKind;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface ServerMetrics {
  cpu: number;
  memory: number;
  disk: number;
  networkIn: number;
  networkOut: number;
  timestamp: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: number;
}
