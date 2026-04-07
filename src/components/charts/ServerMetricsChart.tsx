import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MetricDataPoint {
  time: string;
  value: number;
}

interface ServerMetricsChartProps {
  data: MetricDataPoint[];
  metric: 'cpu' | 'memory' | 'disk';
  color?: string;
}

const COLORS = {
  cpu: '#ef4444',
  memory: '#f59e0b',
  disk: '#10b981',
};

export function ServerMetricsChart({ data, metric, color }: ServerMetricsChartProps) {
  const chartColor = color || COLORS[metric];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`, metric.toUpperCase()]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          fill={`url(#gradient-${metric})`}
          animationDuration={300}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
