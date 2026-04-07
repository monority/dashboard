import { Card } from '@/components/ui';
import type { Transaction } from '@/types';

interface TransactionsPanelProps {
  transactions: Transaction[];
}

export function TransactionsPanel({ transactions }: TransactionsPanelProps) {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card>
      <div className="transactions-panel">
        <h3>Recent Transactions</h3>

        {transactions.length === 0 ? (
          <p className="no-data">No transactions yet</p>
        ) : (
          <div className="transactions-list">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div className="tx-info">
                  <span className="tx-user">{tx.userName}</span>
                  <span className="tx-time">{formatTime(tx.timestamp)}</span>
                </div>
                <div className="tx-amount">
                  <span className="amount">{formatAmount(tx.amount, tx.currency)}</span>
                  <span className={`status ${tx.status}`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
