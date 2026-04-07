import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface StockChartProps {
  data: Array<{ time: string; price: number; volume?: number }>;
  color?: string;
}

const getThemeColors = () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  return {
    grid: isDark ? '#2c3748' : '#e5e7eb',
    axis: isDark ? '#8f9cb0' : '#6b7280',
    text: isDark ? '#e6ebf3' : '#374151',
    bg: isDark ? '#171d26' : '#ffffff',
    border: isDark ? '#2c3748' : '#e5e7eb',
  };
};

export function StockChart({ data, color = '#3b82f6' }: StockChartProps) {
  const theme = getThemeColors();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
        <XAxis dataKey="time" stroke={theme.axis} fontSize={12} />
        <YAxis stroke={theme.axis} fontSize={12} domain={['auto', 'auto']} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
          }}
          labelStyle={{ color: theme.text }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${color})`}
          animationDuration={500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
