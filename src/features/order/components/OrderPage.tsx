import { ORDER_COPY } from '../display';
import { useOrderOverview } from '../hooks';

import { OrderCollaborators } from './OrderCollaborators';
import { OrderKpiGrid } from './OrderKpiGrid';
import { OrderSharePanel } from './OrderSharePanel';
import './order-page.css';

export const OrderPage = () => {
  const { data, isLoading } = useOrderOverview();

  return (
    <section className="order-page">
      <header>
        <h1>{ORDER_COPY.pageTitle}</h1>
        <p>{ORDER_COPY.pageDescription}</p>
      </header>

      <OrderKpiGrid kpis={data?.kpis ?? []} isLoading={isLoading} />

      <div className="order-content-grid">
        <OrderSharePanel initialUrl={data?.documentUrl ?? ''} isLoading={isLoading} />
        <OrderCollaborators collaborators={data?.collaborators ?? []} isLoading={isLoading} />
      </div>
    </section>
  );
};
