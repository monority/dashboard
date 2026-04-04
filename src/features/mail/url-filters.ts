import { MAIL_FOLDERS } from './types';
import type { MailFolder } from './types';

export const DEFAULT_MAIL_FOLDER: MailFolder = 'Inbox';

export interface MailUrlFilters {
  folder: MailFolder;
  search: string;
}

export const parseMailUrlFilters = (searchParams: URLSearchParams): MailUrlFilters => {
  const nextFolderRaw = searchParams.get('folder');
  const nextSearch = searchParams.get('search') ?? '';

  const nextFolder = MAIL_FOLDERS.includes(nextFolderRaw as MailFolder)
    ? (nextFolderRaw as MailFolder)
    : DEFAULT_MAIL_FOLDER;

  return {
    folder: nextFolder,
    search: nextSearch,
  };
};

export const buildMailSearchParams = (filters: MailUrlFilters): URLSearchParams => {
  const nextParams = new URLSearchParams();
  nextParams.set('folder', filters.folder);

  if (filters.search.trim()) {
    nextParams.set('search', filters.search);
  }

  return nextParams;
};
