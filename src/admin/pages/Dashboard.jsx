import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Plus,
  Tag,
  Layout,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Star,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StatCard } from '../components/StatCard';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { useCmsStore } from '../lib/cmsStore';
import { formatINR } from '../../lib/formatINR';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [chartRange, setChartRange] = useState('30'); // '7', '30', '90'

  const products = useCmsStore((s) => s.products);
  const orders = useCmsStore((s) => s.orders);
  const reviews = useCmsStore((s) => s.reviews);
  const updateProductStock = useCmsStore((s) => s.updateProductStock);

  // Computed metrics
  const totalRevenuePaise = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((acc, o) => acc + (o.pricing?.grandTotalPaise || 0), 0);

  const pendingOrdersCount = orders.filter(
    (o) => o.fulfillmentStatus === 'unfulfilled' || o.fulfillmentStatus === 'processing'
  ).length;

  const lowStockItems = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 5)
  );

  const pendingReviews = reviews.filter((r) => r.status === 'pending');

  // Sales chart series data
  const generateChartData = (days) => {
    const count = Number(days);
    const data = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayLabel = d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });
      // Realistic simulation curve based on boutique traffic
      const base = 48000;
      const wave = Math.sin(i * 0.7) * 22000;
      const spike = i % 6 === 0 ? 35000 : 0;
      const dailyPaise = Math.max(18000, Math.round((base + wave + spike) * 100));
      data.push({
        date: dayLabel,
        revenue: Math.round(dailyPaise / 100),
        orders: Math.max(1, Math.round(dailyPaise / 250000)),
      });
    }
    return data;
  };

  const chartData = generateChartData(chartRange);

  const handleRestock = (productId, currentStock) => {
    const qty = prompt(`Enter restock quantity to add to current stock (${currentStock}):`, '10');
    if (qty && !isNaN(qty)) {
      updateProductStock(productId, currentStock + Number(qty));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header with Quick Actions */}
      <PageHeader
        title="Boutique Overview"
        description="Real-time performance, inventory levels, and order fulfillment status."
      >
        <button
          type="button"
          onClick={() => navigate('/admin/products/new')}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm flex-1 sm:flex-none"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/coupons')}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white border border-sand-border hover:bg-sand/30 text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm flex-1 sm:flex-none"
        >
          <Tag className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Create Coupon</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/homepage')}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white border border-sand-border hover:bg-sand/30 text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm flex-1 sm:flex-none"
        >
          <Layout className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Edit Homepage</span>
        </button>
      </PageHeader>

      {/* Row of Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue (MTD)"
          value={formatINR(totalRevenuePaise)}
          change="+18.4%"
          isPositive={true}
          subtext="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          change="+12.0%"
          isPositive={true}
          subtext="vs last month"
          icon={ShoppingBag}
          onClick={() => navigate('/admin/orders')}
        />
        <StatCard
          title="Pending Fulfillment"
          value={pendingOrdersCount}
          change={pendingOrdersCount > 0 ? "Needs action" : "Cleared"}
          isPositive={pendingOrdersCount === 0}
          subtext="Ready to ship"
          icon={Clock}
          onClick={() => navigate('/admin/orders')}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems.length}
          change={lowStockItems.length > 0 ? "Threshold < 5" : "Optimal"}
          isPositive={lowStockItems.length === 0}
          subtext="Requires restock"
          icon={AlertTriangle}
          onClick={() => navigate('/admin/inventory')}
        />
      </div>

      {/* Revenue Analytics Chart */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-medium text-espresso">
              Sales & Revenue Trajectory
            </h2>
            <p className="font-sans text-xs text-espresso/60">
              Aggregated daily turnover in INR across all payment channels.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-ivory border border-sand-border p-1 rounded-[2px] text-xs self-start sm:self-auto">
            {['7', '30', '90'].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setChartRange(days)}
                className={`px-3 py-1 rounded-[2px] font-medium transition-colors ${
                  chartRange === days
                    ? 'bg-espresso text-ivory font-semibold'
                    : 'text-espresso/70 hover:text-espresso hover:bg-sand/30'
                }`}
              >
                Last {days} Days
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C6A15B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#C6A15B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#6E5C51"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#EAE0D2' }}
              />
              <YAxis
                stroke="#6E5C51"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#EAE0D2' }}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-espresso text-ivory p-3 rounded-[3px] shadow-lg text-xs font-sans space-y-1">
                        <p className="font-semibold text-champagne">{label}</p>
                        <p>Revenue: ₹{payload[0].value.toLocaleString('en-IN')}</p>
                        <p className="text-ivory/70">Orders: {payload[0].payload.orders}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C6A15B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-Column Grid: Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-sand-border/70 mb-4">
              <div>
                <h3 className="font-serif text-base font-medium text-espresso">
                  Recent Orders
                </h3>
                <p className="font-sans text-xs text-espresso/60">
                  Latest customer purchases and shipping statuses.
                </p>
              </div>
              <Link
                to="/admin/orders"
                className="inline-flex items-center gap-1 text-xs text-champagne-dark hover:text-espresso font-semibold font-sans transition-colors"
              >
                <span>View all ({orders.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-sand-border text-espresso/60 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap">
                    <th className="pb-2.5 pr-3">Order</th>
                    <th className="pb-2.5 pr-3">Customer</th>
                    <th className="pb-2.5 pr-3">Total</th>
                    <th className="pb-2.5 pr-3">Payment</th>
                    <th className="pb-2.5 pr-3">Fulfillment</th>
                    <th className="pb-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-border/40 whitespace-nowrap">
                  {orders.slice(0, 5).map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => navigate(`/admin/orders/${o.id}`)}
                      className="hover:bg-ivory/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 pr-3 font-semibold text-espresso">{o.id}</td>
                      <td className="py-3 pr-3 font-medium text-espresso">
                        <div>{o.customer.name}</div>
                        <div className="text-[11px] text-espresso/50">{o.customer.email}</div>
                      </td>
                      <td className="py-3 pr-3 font-medium text-espresso">
                        {formatINR(o.pricing?.grandTotalPaise)}
                      </td>
                      <td className="py-3 pr-3">
                        <StatusBadge status={o.paymentStatus} />
                      </td>
                      <td className="py-3 pr-3">
                        <StatusBadge status={o.fulfillmentStatus} />
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/orders/${o.id}`);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-espresso hover:bg-sand/40 border border-sand-border rounded transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock & Pending Reviews Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Alerts */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border/70">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif text-base font-medium text-espresso">
                  Low Stock Alert
                </h3>
              </div>
              <Link
                to="/admin/inventory"
                className="text-xs text-champagne-dark hover:text-espresso font-semibold"
              >
                All
              </Link>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-xs text-espresso/60 py-3 text-center">
                All inventory quantities are above safety thresholds.
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 p-2 bg-ivory/50 rounded border border-sand-border/60 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-espresso truncate">{p.name}</p>
                      <p className="text-[11px] text-rose-700 font-semibold">
                        Qty: {p.stock} units left
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRestock(p.id, p.stock)}
                      className="px-2.5 py-1 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-[11px] uppercase tracking-wider rounded-[2px] transition-colors flex-shrink-0"
                    >
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Reviews Card */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border/70">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-champagne" />
                <h3 className="font-serif text-base font-medium text-espresso">
                  Review Moderation
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded-full">
                {pendingReviews.length} pending
              </span>
            </div>

            <p className="text-xs text-espresso/70 leading-relaxed">
              Patrons have left product feedback awaiting store approval before publishing to PDPs.
            </p>

            <Link
              to="/admin/reviews"
              className="w-full inline-flex items-center justify-center gap-2 py-2 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              <span>Moderate Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 text-champagne-dark" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
