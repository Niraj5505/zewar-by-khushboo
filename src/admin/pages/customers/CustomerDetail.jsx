import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Lock,
  Send,
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const CustomerDetail = () => {
  const { id } = useParams();

  const customers = useCmsStore((s) => s.customers);
  const orders = useCmsStore((s) => s.orders);
  const updateCustomerNotes = useCmsStore((s) => s.updateCustomerNotes);

  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter(
    (o) => o.customer.email === customer?.email || o.customer.id === customer?.id
  );

  const [notes, setNotes] = useState(customer?.notes || '');
  const [tagInput, setTagInput] = useState(customer?.tags?.join(', ') || '');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  if (!customer) {
    return (
      <div className="p-8 text-center bg-white border border-sand-border rounded-[4px]">
        <h2 className="font-serif text-xl font-medium text-espresso">Customer Not Found</h2>
        <Link
          to="/admin/customers"
          className="mt-3 inline-block px-4 py-2 bg-champagne text-espresso text-xs font-semibold rounded"
        >
          Return to Customers
        </Link>
      </div>
    );
  }

  const handleSaveNotes = () => {
    const parsedTags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    updateCustomerNotes(customer.id, notes, parsedTags);
    alert('Patron styling notes saved successfully.');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    alert(`Email "${emailSubject}" dispatched to ${customer.email} successfully.`);
    setEmailModalOpen(false);
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-border/80">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/customers"
            className="p-2 border border-sand-border hover:bg-sand/30 rounded-[2px] text-espresso/70 hover:text-espresso transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-medium text-espresso">
                {customer.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-sand text-espresso border border-sand-border">
                {customer.id}
              </span>
            </div>
            <p className="font-sans text-xs text-espresso/60 mt-0.5">
              Patron since {customer.joinedDate}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEmailModalOpen(true)}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Send Personal Email</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Order History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-4 sm:p-6 space-y-4">
            <h2 className="font-serif text-base font-medium text-espresso pb-3 border-b border-sand-border/70 flex items-center justify-between">
              <span>Order History</span>
              <span className="text-xs font-sans text-espresso/60 font-normal">
                {customerOrders.length} order{customerOrders.length !== 1 ? 's' : ''} placed
              </span>
            </h2>

            {customerOrders.length === 0 ? (
              <p className="text-xs text-espresso/50 py-4 text-center">
                This customer has not placed any orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-sand-border text-espresso/60 font-semibold uppercase text-[10px]">
                      <th className="pb-2">Order #</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Total Paid</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-border/40 font-sans">
                    {customerOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-ivory/30">
                        <td className="py-3 font-mono font-semibold text-espresso">{o.id}</td>
                        <td className="py-3 text-espresso/70">
                          {new Date(o.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3 font-semibold text-espresso">
                          {formatINR(o.pricing?.grandTotalPaise)}
                        </td>
                        <td className="py-3">
                          <StatusBadge status={o.fulfillmentStatus} />
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/admin/orders/${o.id}`}
                            className="text-champagne-dark hover:text-espresso font-semibold underline text-[11px]"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Delivery Addresses */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-4 sm:p-6 space-y-3">
            <h2 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
              Saved Shipping Addresses
            </h2>
            {customer.addresses && customer.addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {customer.addresses.map((addr, idx) => (
                  <div key={idx} className="p-3 bg-ivory/40 border border-sand-border rounded space-y-1">
                    <p className="font-semibold text-espresso">{addr.name}</p>
                    <p className="text-espresso/70">{addr.street}</p>
                    <p className="text-espresso/70">
                      {addr.city}, {addr.state} — {addr.pincode}
                    </p>
                    <p className="text-[11px] font-mono text-espresso/50">Ph: {addr.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-espresso/50">
                Primary address recorded from order transactions.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Customer Metrics & Private Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key Metrics */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-3 text-xs">
            <h3 className="font-serif font-medium text-sm text-espresso pb-2 border-b border-sand-border/70">
              Patron Profile
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-espresso/60">Lifetime Spend</span>
                <span className="font-semibold text-emerald-800 text-sm">
                  {formatINR(customer.totalSpentPaise)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Completed Orders</span>
                <span className="font-semibold text-espresso">{customer.ordersCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Email</span>
                <span className="text-espresso font-mono truncate max-w-[170px]">
                  {customer.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Phone</span>
                <span className="text-espresso font-mono">{customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Tags & Private Notes */}
          <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle p-5 space-y-4 text-xs">
            <h3 className="font-serif font-medium text-sm text-espresso pb-2 border-b border-sand-border/70 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-champagne-dark" />
              <span>Studio Styling Notes & Tags</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-espresso/70 mb-1">
                Client Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="VIP, Kundan Lover, Wedding"
                className="w-full px-2.5 py-1.5 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-espresso/70 mb-1">
                Private Karigar & Concierge Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes on client preferences, sizing, or gifting dates..."
                className="w-full p-2.5 bg-ivory/30 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveNotes}
              className="w-full py-2 bg-espresso hover:bg-espresso-light text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Save Client Notes
            </button>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              Send Email to {customer.name}
            </h3>
            <form onSubmit={handleSendEmail} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                  Recipient
                </label>
                <input
                  type="text"
                  disabled
                  value={`${customer.name} <${customer.email}>`}
                  className="w-full px-3 py-1.5 bg-sand/30 border border-sand-border rounded text-xs text-espresso"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g. Regarding your recent Zewar heirloom order"
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                  Message Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Dear..."
                  className="w-full p-3 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-3 py-1.5 border border-sand-border text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
