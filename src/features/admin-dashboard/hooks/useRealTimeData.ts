import { useState, useEffect, useCallback } from 'react';

import { useWebSocket } from '@/hooks';
import type { StockData, ServerMetrics, Transaction } from '@/types';

interface UseRealTimeDataOptions {
  wsUrl?: string;
}

interface UseRealTimeDataReturn {
  stocks: StockData[];
  serverMetrics: ServerMetrics | null;
  transactions: Transaction[];
  activeUsers: number;
  isConnected: boolean;
  stockHistory: Record<string, Array<{ time: string; price: number }>>;
  metricsHistory: Array<{ time: string; cpu: number; memory: number; disk: number }>;
}

function generateMockStocks(): StockData[] {
  const symbols = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
  ];

  return symbols.map((s) => {
    const basePrice = Math.random() * 500 + 50;
    const change = (Math.random() - 0.5) * 20;
    return {
      ...s,
      price: Math.round(basePrice * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round((change / basePrice) * 10000) / 100,
      timestamp: Date.now(),
    };
  });
}

function generateMockMetrics(): ServerMetrics {
  return {
    cpu: Math.round(Math.random() * 60 + 20),
    memory: Math.round(Math.random() * 40 + 40),
    disk: Math.round(Math.random() * 20 + 60),
    networkIn: Math.round(Math.random() * 100),
    networkOut: Math.round(Math.random() * 80),
    timestamp: Date.now(),
  };
}

function generateMockTransaction(): Transaction {
  const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown', 'Charlie Davis'];
  const idx = Math.floor(Math.random() * names.length);
  return {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    userName: names[idx] || 'Unknown',
    amount: Math.round(Math.random() * 1000 * 100) / 100,
    currency: 'USD',
    status: Math.random() > 0.1 ? 'success' : Math.random() > 0.5 ? 'pending' : 'failed',
    timestamp: Date.now(),
  };
}

function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

export function useRealTimeData(options: UseRealTimeDataOptions = {}): UseRealTimeDataReturn {
  const { wsUrl = 'ws://localhost:3001' } = options;

  const [stocks, setStocks] = useState<StockData[]>(() => generateMockStocks());
  const [serverMetrics, setServerMetrics] = useState<ServerMetrics | null>(() =>
    generateMockMetrics(),
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeUsers] = useState(Math.floor(Math.random() * 500) + 100);
  const [stockHistory, setStockHistory] = useState<
    Record<string, Array<{ time: string; price: number }>>
  >({});
  const [metricsHistory, setMetricsHistory] = useState<
    Array<{ time: string; cpu: number; memory: number; disk: number }>
  >([]);

  const handleMessage = useCallback((message: { type: string; payload: unknown }) => {
    switch (message.type) {
      case 'stocks':
        setStocks(message.payload as StockData[]);
        break;
      case 'metrics':
        setServerMetrics(message.payload as ServerMetrics);
        break;
      case 'transaction':
        setTransactions((prev) => [message.payload as Transaction, ...prev].slice(0, 10));
        break;
    }
  }, []);

  const { isConnected } = useWebSocket({
    url: wsUrl,
    autoConnect: false,
    onMessage: handleMessage,
  });

  useEffect(() => {
    const updateData = () => {
      setStocks((prev) =>
        prev.map((s) => {
          const change = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(1, s.price + change);
          return {
            ...s,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            changePercent: Math.round((change / s.price) * 10000) / 100,
            timestamp: Date.now(),
          };
        }),
      );

      const newMetrics = generateMockMetrics();
      setServerMetrics(newMetrics);

      setMetricsHistory((prev) => {
        const now = new Date();
        const time = formatTime(now);
        return [
          ...prev,
          { time, cpu: newMetrics.cpu, memory: newMetrics.memory, disk: newMetrics.disk },
        ].slice(-30);
      });

      setStockHistory((prevHistory) => {
        const newHistory: Record<string, Array<{ time: string; price: number }>> = {
          ...prevHistory,
        };

        setStocks((currentStocks) => {
          currentStocks.forEach((stock) => {
            const time = formatTime(new Date());
            const existing = newHistory[stock.symbol] || [];
            newHistory[stock.symbol] = [...existing, { time, price: stock.price }].slice(-20);
          });
          return currentStocks;
        });

        return newHistory;
      });

      if (Math.random() > 0.7) {
        setTransactions((prev) => [generateMockTransaction(), ...prev].slice(0, 10));
      }
    };

    updateData();
    const interval = setInterval(updateData, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    stocks,
    serverMetrics,
    transactions,
    activeUsers,
    isConnected,
    stockHistory,
    metricsHistory,
  };
}
