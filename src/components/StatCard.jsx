import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { val: 10 }, { val: 25 }, { val: 15 }, { val: 40 }, { val: 30 }, { val: 50 }, { val: 45 }
];

export default function StatCard({ title, value, trend, trendValue, color = "green" }) {
  const isPositive = trend === 'up';

  const colors = {
    green: { text: '#22c55e', bg: 'rgba(34,197,94,0.12)', stroke: '#22c55e', fill: '#22c55e' },
    red: { text: '#ef4444', bg: 'rgba(239,68,68,0.12)', stroke: '#ef4444', fill: '#ef4444' },
    yellow: { text: '#f59e0b', bg: 'rgba(245,158,11,0.12)', stroke: '#f59e0b', fill: '#f59e0b' },
  }[color];

  return (
    <div
      className="p-4 md:p-5 rounded-2xl border transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{title}</p>
          <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{value}</h3>
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      </div>

      <div className="h-16 w-full -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.fill} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={colors.stroke}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${color})`}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
