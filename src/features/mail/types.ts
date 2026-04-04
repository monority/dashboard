export const MAIL_FOLDERS = ['Inbox', 'Sent', 'Drafts', 'Archive', 'Trash'] as const;

export type MailFolder = (typeof MAIL_FOLDERS)[number];

export type MailTag = 'New' | 'Important' | 'Newsletter' | 'Support' | 'Urgent';

export interface MailThread {
  id: string;
  folder: MailFolder;
  fullName: string;
  email: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  tags: MailTag[];
  read: boolean;
}

export interface MailFilters {
  folder: MailFolder;
  search: string;
}
