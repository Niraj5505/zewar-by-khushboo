import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const SalesReport = () => {
  const [groupBy, setGroupBy] = useState('day'); // 'day', 'week', 'month'
  const orders = useCmsStore((s) => s.orders);

  // Sales trend data
  const data = [
    { period: 'Mon', revenue: 42000, orders: 4, aov: 10500 },
    { period: 'Tue', revenue: 68000, orders: 7, aov: 9714 },
    { period: 'Wed', revenue: 53000, orders: 5, aov: 10600 },
    { period: 'Thu', revenue: 89000, orders: 9, aov: 9888 },
    { period: 'Fri', revenue: 112000, orders: 12, aov: 9333 },
    { period: 'Sat', revenue: 145000, orders: 15, aov: 9666 },
    { period: 'Sun', revenue: 168000, orders: 18, aov: 9333 },
  ];

  const totalRev = data.reduce((a, b) => a + b.revenue, 0);
  const totalOrd = data.reduce((a, b) => a + b.orders, 0);
  const averageAov = Math.round(totalRev / totalOrd);

  const exportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Period,Revenue(INR),Orders,AOV(INR)\n' +
      data.map((r) => `${r.period},${r.revenue},${r.orders},${r.aov}`).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `sales_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Sales & Revenue Analytics"
        description="Daily sales volumes, average basket sizes (AOV), and financial turnover breakdown."
      >
        <button
          type="button"
          onClick={exportReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-sand-border hover:bg-sand/30 rounded text-xs font-semibold text-espresso"
        >
          <Download className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Export Sales CSV</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Period Gross Turnover"
          value={`₹${(totalRev / 1000).toFixed(0)}k`}
          change="+24.8%"
          isPositive={true}
          subtext="vs previous window"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders Count"
          value={totalOrd}
          change="+15.2%"
          isPositive={true}
          subtext="Completed purchases"
          icon={CreditCard}
        />
        <StatCard
          title="Average Order Value (AOV)"
          value={`₹${averageAov.toLocaleString('en-IN')}`}
          change="+8.3%"
          isPositive={true}
          subtext="Healthy luxury basket"
          icon={TrendingUp}
        />
      </div>

      <div className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-serif text-base font-medium text-espresso">
            Revenue Over Time (₹ INR)
          </h2>
          <div className="flex bg-ivory border border-sand-border rounded p-0.5 text-xs">
            {['day', 'week', 'month'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setGroupBy(m)}
                className={`px-3 py-1 rounded capitalize font-medium ${
                  groupBy === m
                    ? 'bg-espresso text-ivory font-semibold'
                    : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                By {m}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="period" stroke="#6E5C51" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#6E5C51"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-espresso text-ivory p-2.5 rounded text-xs">
                        <p className="font-bold text-champagne">{label}</p>
                        <p>Turnover: ₹{payload[0].value.toLocaleString('en-IN')}</p>
                        <p className="text-ivory/60">Orders: {payload[0].payload.orders}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#C6A15B" fill="#FAF7F0" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
