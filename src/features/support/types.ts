export const SUPPORT_REQUEST_TYPES = ['technical', 'billing', 'feature', 'other'] as const;

export type SupportRequestType = (typeof SUPPORT_REQUEST_TYPES)[number];

export type SupportTicketStatus = 'Resolved' | 'Closed' | 'Answered' | 'Open';

export interface SupportStats {
  issuesThisMonth: number;
  issuesGrowthPercent: number;
  issuesSolved: number;
  avgResponseTimePercent: number;
  responseDeltaPercent: number;
  clientSatisfactionPercent: number;
  satisfactionGrowthPercent: number;
  openTickets: number;
}

export interface SupportFaqItem {
  id: string;
  title: string;
  content: string;
}

export interface SupportHistoryItem {
  id: string;
  subject: string;
  type: SupportRequestType;
  date: string;
  status: SupportTicketStatus;
}

export interface SupportTicketFormValues {
  type: SupportRequestType;
  subject: string;
  dueDate: string;
}

export interface SupportDashboardData {
  stats: SupportStats;
  faq: SupportFaqItem[];
  history: SupportHistoryItem[];
}
