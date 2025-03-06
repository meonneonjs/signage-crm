'use client';

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    revenue: 32000,
    expenses: 17000,
  },
  {
    name: 'Feb',
    revenue: 45000,
    expenses: 12000,
  },
  {
    name: 'Mar',
    revenue: 38000,
    expenses: 15000,
  },
  {
    name: 'Apr',
    revenue: 42000,
    expenses: 18000,
  },
  {
    name: 'May',
    revenue: 35000,
    expenses: 14000,
  },
  {
    name: 'Jun',
    revenue: 48000,
    expenses: 16000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="revenue"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          name="Revenue"
        />
        <Bar
          dataKey="expenses"
          fill="#ff4444"
          radius={[4, 4, 0, 0]}
          name="Expenses"
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 