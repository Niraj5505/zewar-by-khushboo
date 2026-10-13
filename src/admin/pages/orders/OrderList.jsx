import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, Calendar, Filter } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const OrderList = () => {
  const navigate = useNavigate();
  const orders = useCmsStore((s) => s.orders);

  const [paymentFilter, setPaymentFilter] = useState('all');
  const [fulfillmentFilter, setFulfillmentFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (paymentFilter !== 'all' && o.paymentStatus !== paymentFilter) return false;
      if (fulfillmentFilter !== 'all' && o.fulfillmentStatus !== fulfillmentFilter) return false;
      return true;
    });
  }, [orders, paymentFilter, fulfillmentFilter]);

  const columns = [
    {
      key: 'id',
      header: 'Order #',
      render: (id) => <span className="font-semibold text-espresso font-mono">{id}</span>,
    },
    {
      key: 'date',
      header: 'Date & Time',
      render: (date) => (
        <span className="text-espresso/70">
          {new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (c) => (
        <div>
          <p className="font-medium text-espresso">{c.name}</p>
          <p className="text-[11px] text-espresso/50 font-sans">{c.phone}</p>
        </div>
      ),
    },
    {
      key: 'itemsCount',
      header: 'Items',
      sortable: false,
      render: (_, row) => (
        <span className="text-espresso/80">
          {row.items?.reduce((sum, item) => sum + item.qty, 0) || 1} items
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Total Amount',
      render: (_, row) => (
        <span className="font-semibold text-espresso">
          {formatINR(row.pricing?.grandTotalPaise)}
        </span>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (st) => <StatusBadge status={st} />,
    },
    {
      key: 'fulfillmentStatus',
      header: 'Fulfillment',
      render: (st) => <StatusBadge status={st} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      className: 'text-right',
      render: (_, row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/orders/${row.id}`);
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-espresso hover:bg-sand/40 border border-sand-border rounded transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-champagne-dark" />
          <span>View</span>
        </button>
      ),
    },
  ];

  const filterComponent = (
    <div className="flex items-center gap-2">
      <select
        value={paymentFilter}
        onChange={(e) => setPaymentFilter(e.target.value)}
        className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none"
      >
        <option value="all">All Payments</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="refunded">Refunded</option>
        <option value="failed">Failed</option>
      </select>

      <select
        value={fulfillmentFilter}
        onChange={(e) => setFulfillmentFilter(e.target.value)}
        className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none"
      >
        <option value="all">All Fulfillments</option>
        <option value="unfulfilled">Unfulfilled</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Customer Orders"
        description="Track purchases, manage shipping manifests, update dispatch tracking, and process refunds."
        badge={`${orders.length} Orders`}
      />

      <DataTable
        columns={columns}
        data={filteredOrders}
        searchKey="id"
        searchPlaceholder="Search order #, customer, email, phone..."
        filterComponent={filterComponent}
        onRowClick={(row) => navigate(`/admin/orders/${row.id}`)}
      />
    </div>
  );
};
