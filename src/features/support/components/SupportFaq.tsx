import { Card, Skeleton } from '@/components/ui';

import { SUPPORT_COPY } from '../display';
import type { SupportFaqItem } from '../types';

interface SupportFaqProps {
  faq: SupportFaqItem[];
  isLoading: boolean;
}

export const SupportFaq = ({ faq, isLoading }: SupportFaqProps) => {
  if (isLoading) {
    return (
      <Card>
        <div className="support-faq-skeleton" aria-hidden="true">
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
          <Skeleton height="1.2rem" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3>{SUPPORT_COPY.faqTitle}</h3>
      <div className="support-faq-list">
        {faq.map((item) => (
          <details key={item.id}>
            <summary>{item.title}</summary>
            <p>{item.content}</p>
          </details>
        ))}
      </div>
    </Card>
  );
};
