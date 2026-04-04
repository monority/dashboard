import { SUPPORT_COPY } from '../display';
import { useSupportData } from '../hooks';

import { SupportFaq } from './SupportFaq';
import { SupportHistory } from './SupportHistory';
import { SupportStats } from './SupportStats';
import { SupportTicketForm } from './SupportTicketForm';
import './support-page.css';

export const SupportPage = () => {
  const { data, isLoading } = useSupportData();

  return (
    <section className="support-page">
      <header>
        <h1>{SUPPORT_COPY.pageTitle}</h1>
        <p>{SUPPORT_COPY.pageDescription}</p>
      </header>

      <div className="support-layout">
        <SupportTicketForm />
        <SupportStats stats={data?.stats ?? null} isLoading={isLoading} />
        <div className="support-bottom">
          <SupportFaq faq={data?.faq ?? []} isLoading={isLoading} />
          <SupportHistory history={data?.history ?? []} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};
