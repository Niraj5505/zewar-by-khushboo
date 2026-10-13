import React from 'react';
import { Users, TrendingUp, Download, Heart, Award } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const CustomerReport = () => {
  const customers = useCmsStore((s) => s.customers);
  const orders = useCmsStore((s) => s.orders);

  const totalSpent = customers.reduce((sum, c) => sum + (c.totalSpentPaise || 0), 0);
  const avgLtv = customers.length > 0 ? Math.round(totalSpent / customers.length) : 0;
  const repeatBuyers = customers.filter((c) => (c.ordersCount || 0) > 1).length;
  const repeatRate = customers.length > 0 ? Math.round((repeatBuyers / customers.length) * 100) : 0;

  const exportCustomers = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Name,Email,Phone,Orders,TotalSpent(INR),Joined\n' +
      customers
        .map(
          (c) =>
            `"${c.name}","${c.email}","${c.phone}",${c.ordersCount},${Math.round(
              (c.totalSpentPaise || 0) / 100
            )},${c.joinedDate}`
        )
        .join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `customer_analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Patron Retention & LTV Report"
        description="Customer lifetime value, repeat purchase rates, VIP loyalty tiers, and client retention."
      >
        <button
          type="button"
          onClick={exportCustomers}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-sand-border hover:bg-sand/30 rounded text-xs font-semibold text-espresso"
        >
          <Download className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Export Patrons CSV</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Average Patron LTV"
          value={formatINR(avgLtv)}
          change="+19.4%"
          isPositive={true}
          subtext="Strong loyalty metrics"
          icon={Award}
        />
        <StatCard
          title="Repeat Purchase Rate"
          value={`${repeatRate}%`}
          change="+6.2%"
          isPositive={true}
          subtext="Repeat heirloom buyers"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Client Base"
          value={customers.length}
          change="+8 clients"
          isPositive={true}
          subtext="Registered patrons"
          icon={Users}
        />
      </div>

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-sand-border/70">
          <h3 className="font-serif text-base font-medium text-espresso">
            Top Patrons Ranked by Lifetime Spend
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Patron Name</th>
                <th className="px-4 py-3">Email & Contact</th>
                <th className="px-4 py-3">Total Orders</th>
                <th className="px-4 py-3">Lifetime Value</th>
                <th className="px-4 py-3">Joined Since</th>
                <th className="px-4 py-3 text-right">Loyalty Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {[...customers]
                .sort((a, b) => (b.totalSpentPaise || 0) - (a.totalSpentPaise || 0))
                .map((c, idx) => (
                  <tr key={c.id || idx} className="hover:bg-ivory/30">
                    <td className="px-4 py-3 font-semibold text-espresso">{c.name}</td>
                    <td className="px-4 py-3 text-espresso/60 font-mono text-[11px]">
                      {c.email}
                    </td>
                    <td className="px-4 py-3 font-medium text-espresso">{c.ordersCount} orders</td>
                    <td className="px-4 py-3 font-semibold text-emerald-800">
                      {formatINR(c.totalSpentPaise)}
                    </td>
                    <td className="px-4 py-3 text-espresso/60">{c.joinedDate}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sand/60 text-espresso border border-sand-border">
                        {c.tags?.[0] || 'Patron'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
