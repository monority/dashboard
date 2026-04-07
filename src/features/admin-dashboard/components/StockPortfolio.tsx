import { memo } from 'react';

import { StockChart } from '@/components/charts';
import { Card } from '@/components/ui';
import type { StockData } from '@/types';

interface StockPortfolioProps {
  stocks: StockData[];
  history: Record<string, Array<{ time: string; price: number }>>;
  selectedStock: string;
  onSelectStock: (symbol: string) => void;
}

function StockPortfolioComponent({
  stocks,
  history,
  selectedStock,
  onSelectStock,
}: StockPortfolioProps) {
  const chartData = history[selectedStock] || [];
  const selectedStockData = stocks.find((s) => s.symbol === selectedStock);

  return (
    <Card>
      <div className="stock-portfolio">
        <h3>Stock Market</h3>

        <div className="stock-list">
          {stocks.map((stock) => (
            <button
              key={stock.symbol}
              type="button"
              className={`stock-item ${selectedStock === stock.symbol ? 'active' : ''}`}
              onClick={() => onSelectStock(stock.symbol)}
              aria-pressed={selectedStock === stock.symbol}
            >
              <div className="stock-info">
                <span className="stock-symbol">{stock.symbol}</span>
                <span className="stock-name">{stock.name}</span>
              </div>
              <div className="stock-price">
                <span className="price">${stock.price.toFixed(2)}</span>
                <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="stock-chart">
          <h4>{selectedStock} - Price History</h4>
          {chartData.length > 0 ? (
            <StockChart
              data={chartData}
              color={selectedStockData && selectedStockData.change >= 0 ? '#10b981' : '#ef4444'}
            />
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export const StockPortfolio = memo(StockPortfolioComponent);
