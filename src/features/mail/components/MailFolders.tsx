import { Button } from '@/components/ui';

import { MAIL_COPY, MAIL_FOLDER_LABELS } from '../display';
import type { MailFolder } from '../types';
import { MAIL_FOLDERS } from '../types';

interface MailFoldersProps {
  activeFolder: MailFolder;
  onChange: (folder: MailFolder) => void;
}

export const MailFolders = ({ activeFolder, onChange }: MailFoldersProps) => {
  return (
    <nav className="mail-folders" aria-label={MAIL_COPY.foldersNavAriaLabel}>
      {MAIL_FOLDERS.map((folder) => (
        <Button
          key={folder}
          variant={activeFolder === folder ? 'primary' : 'ghost'}
          onClick={() => onChange(folder)}
        >
          {MAIL_FOLDER_LABELS[folder]}
        </Button>
      ))}
    </nav>
  );
};
