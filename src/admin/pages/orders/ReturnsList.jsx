import React, { useState } from 'react';
import { RotateCcw, Check, X, Eye, AlertCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const ReturnsList = () => {
  const returns = useCmsStore((s) => s.returns);
  const updateReturnStatus = useCmsStore((s) => s.updateReturnStatus);

  const [selectedReturn, setSelectedReturn] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  const handleUpdate = (status) => {
    if (!selectedReturn) return;
    updateReturnStatus(selectedReturn.id, status, adminNote);
    setSelectedReturn(null);
    setAdminNote('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Returns & Exchanges"
        description="Inspect customer return requests, review photographic proof, and manage return workflows."
        badge={`${returns.length} Requests`}
      />

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto -mx-px scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap">
              <tr>
                <th className="px-4 py-3">Return ID</th>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Jewellery Item</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans whitespace-nowrap">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3 font-semibold font-mono text-espresso">{ret.id}</td>
                  <td className="px-4 py-3 font-mono text-espresso/70">{ret.orderId}</td>
                  <td className="px-4 py-3 font-medium text-espresso">{ret.customerName}</td>
                  <td className="px-4 py-3 text-espresso/80">{ret.productName}</td>
                  <td className="px-4 py-3 text-espresso/60 max-w-xs truncate">{ret.reason}</td>
                  <td className="px-4 py-3 text-espresso/60">
                    {new Date(ret.requestedDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ret.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReturn(ret);
                        setAdminNote(ret.adminNotes || '');
                      }}
                      className="px-2.5 py-1 bg-ivory border border-sand-border hover:bg-sand/40 text-espresso text-[11px] font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Detail / Action Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-lg p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border">
              <h3 className="font-serif text-lg font-medium text-espresso">
                Return Request: {selectedReturn.id}
              </h3>
              <StatusBadge status={selectedReturn.status} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-ivory/40 rounded border border-sand-border">
                <div>
                  <span className="text-espresso/50 block">Customer</span>
                  <span className="font-semibold text-espresso">{selectedReturn.customerName}</span>
                </div>
                <div>
                  <span className="text-espresso/50 block">Order</span>
                  <span className="font-mono text-espresso">{selectedReturn.orderId}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-espresso block mb-0.5">Item & Reason:</span>
                <p className="text-espresso/80 font-medium">{selectedReturn.productName}</p>
                <p className="text-espresso/70 italic mt-1 bg-sand/20 p-2 rounded">
                  &ldquo;{selectedReturn.reason}&rdquo;
                </p>
              </div>

              {selectedReturn.photos && selectedReturn.photos.length > 0 && (
                <div>
                  <span className="font-semibold text-espresso block mb-1">
                    Customer Photo Evidence:
                  </span>
                  <div className="flex gap-2">
                    {selectedReturn.photos.map((p, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-20 rounded bg-sand border border-sand-border overflow-hidden"
                      >
                        <img src={p} alt="Return photo" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="font-semibold text-espresso block mb-1">Studio Admin Note:</label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Notes on return parcel inspection..."
                  className="w-full p-2 border border-sand-border rounded outline-none focus:ring-1 focus:ring-champagne text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="px-3 py-1.5 border border-sand-border text-xs rounded hover:bg-sand/30"
              >
                Close
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdate('rejected')}
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded hover:bg-rose-100"
                >
                  Reject Return
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('approved')}
                  className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded hover:bg-amber-100"
                >
                  Approve Pickup
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('refunded')}
                  className="px-4 py-1.5 bg-champagne text-espresso text-xs font-semibold rounded hover:bg-champagne-hover shadow-sm"
                >
                  Confirm & Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
