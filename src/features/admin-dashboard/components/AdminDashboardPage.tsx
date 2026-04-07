import { useState } from 'react';

import { useRealTimeData } from '../hooks';

import { ServerMetricsPanel } from './ServerMetricsPanel';
import { StatsCards } from './StatsCards';
import { StockPortfolio } from './StockPortfolio';
import { TransactionsPanel } from './TransactionsPanel';
import './admin-dashboard.css';

export function AdminDashboardPage() {
  const { stocks, serverMetrics, transactions, activeUsers, stockHistory, metricsHistory } =
    useRealTimeData();
  const [selectedStock, setSelectedStock] = useState('AAPL');

  return (
    <section className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Real-time monitoring and analytics</p>
        </div>
        <div className="connection-status">
          <span className="status-dot connected" />
          <span>Live Data</span>
        </div>
      </header>

      <StatsCards
        serverMetrics={serverMetrics}
        activeUsers={activeUsers}
        transactionsCount={transactions.length}
      />

      <div className="admin-grid">
        <StockPortfolio
          stocks={stocks}
          history={stockHistory}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
        />

        <ServerMetricsPanel metrics={serverMetrics} history={metricsHistory} />
      </div>

      <TransactionsPanel transactions={transactions} />
    </section>
  );
}
