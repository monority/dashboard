import { Badge, Card, Skeleton } from '@/components/ui';

import { formatMailDate, MAIL_COPY, MAIL_TAG_LABELS } from '../display';
import type { MailThread } from '../types';

interface MailThreadListProps {
  threads: MailThread[];
  selectedThreadId: string | null;
  isLoading: boolean;
  onSelect: (thread: MailThread) => void;
}

export const MailThreadList = ({
  threads,
  selectedThreadId,
  isLoading,
  onSelect,
}: MailThreadListProps) => {
  if (isLoading) {
    return (
      <Card>
        <div className="mail-list-skeleton" aria-hidden="true">
          <Skeleton height="1.25rem" />
          <Skeleton height="1.25rem" />
          <Skeleton height="1.25rem" />
          <Skeleton height="1.25rem" />
        </div>
      </Card>
    );
  }

  if (threads.length === 0) {
    return (
      <Card>
        <p className="mail-empty">{MAIL_COPY.emptyThreadList}</p>
      </Card>
    );
  }

  return (
    <Card>
      <ul className="mail-thread-list">
        {threads.map((thread) => {
          const isSelected = selectedThreadId === thread.id;

          return (
            <li key={thread.id}>
              <button
                type="button"
                className={`mail-thread-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelect(thread)}
                aria-pressed={isSelected}
              >
                <header>
                  <strong>{thread.fullName}</strong>
                  <time>{formatMailDate(thread.date)}</time>
                </header>
                <p className="mail-thread-subject">{thread.subject}</p>
                <p className="mail-thread-snippet">{thread.snippet}</p>
                <div className="mail-thread-tags">
                  {thread.tags.map((tag) => (
                    <Badge
                      key={tag}
                      label={MAIL_TAG_LABELS[tag]}
                      variant={tag === 'Urgent' ? 'danger' : 'info'}
                    />
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
