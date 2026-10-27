import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { DataTable } from '../../components/DataTable';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const CustomerList = () => {
  const navigate = useNavigate();
  const customers = useCmsStore((s) => s.customers);

  const [filterType, setFilterType] = useState('all');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (filterType === 'has_orders' && (c.ordersCount || 0) === 0) return false;
      if (filterType === 'vip' && !c.tags?.includes('VIP')) return false;
      return true;
    });
  }, [customers, filterType]);

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      render: (name, row) => (
        <div>
          <span className="font-semibold text-espresso block">{name}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {row.tags?.map((t, i) => (
              <span
                key={i}
                className="px-1.5 py-0.2 bg-sand/60 text-espresso text-[10px] font-semibold rounded border border-sand-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact Info',
      render: (email, row) => (
        <div className="text-espresso/70 space-y-0.5">
          <p className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-espresso/40" />
            <span>{email}</span>
          </p>
          <p className="flex items-center gap-1 font-mono text-[11px]">
            <Phone className="w-3 h-3 text-espresso/40" />
            <span>{row.phone}</span>
          </p>
        </div>
      ),
    },
    {
      key: 'ordersCount',
      header: 'Orders',
      render: (cnt) => (
        <span className="font-semibold text-espresso">
          {cnt} order{cnt !== 1 ? 's' : ''}
        </span>
      ),
    },
    {
      key: 'totalSpentPaise',
      header: 'Total Spent',
      render: (spent) => (
        <span className="font-semibold text-emerald-800">
          {formatINR(spent)}
        </span>
      ),
    },
    {
      key: 'joinedDate',
      header: 'Joined',
      render: (date) => (
        <span className="text-espresso/60">
          {new Date(date).toLocaleDateString('en-IN', {
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
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
            navigate(`/admin/customers/${row.id}`);
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-espresso hover:bg-sand/40 border border-sand-border rounded transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Profile</span>
        </button>
      ),
    },
  ];

  const filterComponent = (
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso outline-none"
    >
      <option value="all">All Patrons</option>
      <option value="has_orders">With Orders</option>
      <option value="vip">VIP Clients</option>
    </select>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Boutique Customers"
        description="View patron history, lifetime value in INR, delivery addresses, and personal styling notes."
        badge={`${customers.length} Patrons`}
      />

      <DataTable
        columns={columns}
        data={filteredCustomers}
        searchKey="name"
        searchPlaceholder="Search customer by name, email, phone..."
        filterComponent={filterComponent}
        onRowClick={(row) => navigate(`/admin/customers/${row.id}`)}
      />
    </div>
  );
};
