import { Badge, Card } from '@/components/ui';

import { formatMailDateTime, MAIL_COPY, MAIL_TAG_LABELS } from '../display';
import type { MailThread } from '../types';

interface MailPreviewProps {
  thread: MailThread | null;
}

export const MailPreview = ({ thread }: MailPreviewProps) => {
  if (!thread) {
    return (
      <Card>
        <p className="mail-empty">{MAIL_COPY.emptyPreview}</p>
      </Card>
    );
  }

  return (
    <Card>
      <article className="mail-preview">
        <header className="mail-preview-header">
          <h2>{thread.subject}</h2>
          <div className="mail-preview-tags">
            {thread.tags.map((tag) => (
              <Badge
                key={tag}
                label={MAIL_TAG_LABELS[tag]}
                variant={tag === 'Urgent' ? 'danger' : 'info'}
              />
            ))}
          </div>
        </header>
        <div className="mail-preview-meta">
          <strong>{thread.fullName}</strong>
          <span>{thread.email}</span>
          <time>{formatMailDateTime(thread.date)}</time>
        </div>
        <p className="mail-preview-body">{thread.body}</p>
      </article>
    </Card>
  );
};
