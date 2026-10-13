import React, { useState } from 'react';
import { Tag, Plus, Copy, Check, Trash2, Edit, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const CouponsList = () => {
  const coupons = useCmsStore((s) => s.coupons);
  const addCoupon = useCmsStore((s) => s.addCoupon);
  const updateCoupon = useCmsStore((s) => s.updateCoupon);
  const deleteCoupon = useCmsStore((s) => s.deleteCoupon);

  const [modalOpen, setModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percent', // percent, fixed, free_shipping
    value: 10,
    minOrderRupees: 999,
    usageLimit: 500,
    firstOrderOnly: false,
    onePerCustomer: true,
    status: 'active',
    expiryDate: '2026-12-31',
  });

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      type: 'percent',
      value: 10,
      minOrderRupees: 999,
      usageLimit: 500,
      firstOrderOnly: false,
      onePerCustomer: true,
      status: 'active',
      expiryDate: '2026-12-31',
    });
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingCoupon(c);
    setFormData({
      code: c.code,
      type: c.type,
      value: c.type === 'fixed' ? Math.round(c.value / 100) : c.value,
      minOrderRupees: Math.round((c.minOrderPaise || 0) / 100),
      usageLimit: c.usageLimit || 100,
      firstOrderOnly: Boolean(c.firstOrderOnly),
      onePerCustomer: Boolean(c.onePerCustomer),
      status: c.status || 'active',
      expiryDate: c.expiryDate || '2026-12-31',
    });
    setModalOpen(true);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const payload = {
      code: formData.code.toUpperCase().trim(),
      type: formData.type,
      value: formData.type === 'fixed' ? Number(formData.value) * 100 : Number(formData.value),
      minOrderPaise: Number(formData.minOrderRupees) * 100,
      usageLimit: Number(formData.usageLimit),
      firstOrderOnly: formData.firstOrderOnly,
      onePerCustomer: formData.onePerCustomer,
      status: formData.status,
      expiryDate: formData.expiryDate,
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, payload);
    } else {
      addCoupon(payload);
    }
    setModalOpen(false);
  };

  const handleToggleStatus = (c) => {
    const newStatus = c.status === 'active' ? 'inactive' : 'active';
    updateCoupon(c.id, { status: newStatus });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Promotional Coupons"
        description="Create discount codes, festive vouchers, and free shipping promotional triggers."
        badge={`${coupons.length} Active Codes`}
      >
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Coupon</span>
        </button>
      </PageHeader>

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Coupon Code</th>
                <th className="px-4 py-3">Discount Type</th>
                <th className="px-4 py-3">Benefit</th>
                <th className="px-4 py-3">Min. Order</th>
                <th className="px-4 py-3">Usage</th>
                <th className="px-4 py-3">Expires</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-espresso text-sm bg-sand/40 px-2 py-0.5 rounded border border-sand-border">
                        {c.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(c.code)}
                        title="Copy code"
                        className="text-espresso/40 hover:text-espresso"
                      >
                        {copiedCode === c.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-espresso/70">
                    {c.type === 'free_shipping' ? 'Free Shipping' : `${c.type} discount`}
                  </td>
                  <td className="px-4 py-3 font-semibold text-espresso">
                    {c.type === 'percent'
                      ? `${c.value}% OFF`
                      : c.type === 'fixed'
                      ? formatINR(c.value)
                      : 'Complimentary Shipping'}
                  </td>
                  <td className="px-4 py-3 text-espresso/80">
                    {formatINR(c.minOrderPaise)}
                  </td>
                  <td className="px-4 py-3 text-espresso/70">
                    {c.usedCount || 0} / {c.usageLimit || '∞'}
                  </td>
                  <td className="px-4 py-3 text-espresso/60 font-mono">
                    {c.expiryDate}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(c)}
                      className="cursor-pointer"
                    >
                      <StatusBadge status={c.status} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(c)}
                        className="p-1.5 hover:bg-sand/40 text-espresso/60 hover:text-espresso rounded"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete coupon "${c.code}"?`)) deleteCoupon(c.id);
                        }}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Coupon'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <FormField label="Coupon Code" required helperText="e.g. DIWALI15, WELCOME10">
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="CODE10"
                  className="w-full px-3 py-2 border border-sand-border rounded font-mono font-bold text-espresso uppercase outline-none focus:ring-1 focus:ring-champagne"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Discount Type" required>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-sand-border rounded bg-white outline-none"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Rupees (₹)</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </FormField>

                {formData.type !== 'free_shipping' && (
                  <FormField
                    label={formData.type === 'percent' ? 'Discount %' : 'Discount ₹'}
                    required
                  >
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-sand-border rounded outline-none font-semibold"
                    />
                  </FormField>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Min Order Value (₹)">
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrderRupees}
                    onChange={(e) => setFormData({ ...formData, minOrderRupees: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                  />
                </FormField>

                <FormField label="Usage Limit">
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                  />
                </FormField>
              </div>

              <FormField label="Expiry Date">
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                />
              </FormField>

              <div className="space-y-2 pt-2 border-t border-sand-border/60">
                <label className="flex items-center gap-2 cursor-pointer text-espresso">
                  <input
                    type="checkbox"
                    checked={formData.firstOrderOnly}
                    onChange={(e) => setFormData({ ...formData, firstOrderOnly: e.target.checked })}
                    className="rounded text-champagne focus:ring-champagne"
                  />
                  <span>First-time orders only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-espresso">
                  <input
                    type="checkbox"
                    checked={formData.onePerCustomer}
                    onChange={(e) => setFormData({ ...formData, onePerCustomer: e.target.checked })}
                    className="rounded text-champagne focus:ring-champagne"
                  />
                  <span>One use per customer</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 border border-sand-border text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
