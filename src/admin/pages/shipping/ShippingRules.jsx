import React, { useState } from 'react';
import { Truck, Plus, Edit, Trash2, ArrowUp, ArrowDown, Save, CheckCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const ShippingRules = () => {
  const shippingRules = useCmsStore((s) => s.shippingRules);
  const updateShippingRules = useCmsStore((s) => s.updateShippingRules);

  const [rules, setRules] = useState(shippingRules);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [saved, setSaved] = useState(false);

  const [ruleForm, setRuleForm] = useState({
    name: '',
    condition: 'order_total_min',
    conditionValue: 999,
    action: 'free',
    value: 0,
    active: true,
  });

  const openCreate = () => {
    setEditingRule(null);
    setRuleForm({
      name: 'Festive Free Delivery',
      condition: 'order_total_min',
      conditionValue: 999,
      action: 'free',
      value: 0,
      active: true,
    });
    setModalOpen(true);
  };

  const openEdit = (r) => {
    setEditingRule(r);
    setRuleForm({
      name: r.name,
      condition: r.condition,
      conditionValue: r.condition.includes('total') ? Math.round(r.conditionValue / 100) : r.conditionValue,
      action: r.action,
      value: Math.round(r.value / 100),
      active: r.active !== false,
    });
    setModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!ruleForm.name.trim()) return;

    const payload = {
      id: editingRule ? editingRule.id : `ship-${Date.now()}`,
      name: ruleForm.name,
      condition: ruleForm.condition,
      conditionValue: ruleForm.condition.includes('total')
        ? Number(ruleForm.conditionValue) * 100
        : Number(ruleForm.conditionValue),
      action: ruleForm.action,
      value: Number(ruleForm.value) * 100,
      active: ruleForm.active,
      priority: editingRule ? editingRule.priority : rules.length + 1,
    };

    let updated;
    if (editingRule) {
      updated = rules.map((r) => (r.id === editingRule.id ? payload : r));
    } else {
      updated = [...rules, payload];
    }

    setRules(updated);
    updateShippingRules(updated);
    setModalOpen(false);
  };

  const handleToggle = (id) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r));
    setRules(updated);
    updateShippingRules(updated);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this shipping rule?')) {
      const updated = rules.filter((r) => r.id !== id);
      setRules(updated);
      updateShippingRules(updated);
    }
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= rules.length) return;
    const copy = [...rules];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setRules(copy);
    updateShippingRules(copy);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Shipping Rules & Thresholds"
        description="Configure tiered delivery charges, Pan-India courier classes, and complimentary free shipping milestones."
        badge={`${rules.length} Rules`}
      >
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Shipping Rule</span>
        </button>
      </PageHeader>

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3 w-16">Priority</th>
                <th className="px-4 py-3">Rule Name</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Rate Charged</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {rules.map((rule, idx) => (
                <tr key={rule.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded"
                      >
                        <ArrowUp className="w-3 h-3 text-espresso/60" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === rules.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded"
                      >
                        <ArrowDown className="w-3 h-3 text-espresso/60" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-espresso">
                    {rule.name}
                  </td>
                  <td className="px-4 py-3 text-espresso/70">
                    {rule.condition === 'order_total_min'
                      ? `Cart total ≥ ${formatINR(rule.conditionValue)}`
                      : rule.condition === 'order_total_below'
                      ? `Cart total < ${formatINR(rule.conditionValue)}`
                      : `Weight < ${rule.conditionValue} kg`}
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-800">
                    {rule.action === 'free' ? 'FREE (₹0)' : formatINR(rule.value)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggle(rule.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        rule.active
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {rule.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(rule)}
                        className="p-1.5 hover:bg-sand/40 text-espresso/70 rounded"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(rule.id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              {editingRule ? 'Edit Shipping Rule' : 'New Shipping Rule'}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <FormField label="Rule Title" required>
                <input
                  type="text"
                  required
                  value={ruleForm.name}
                  onChange={(e) => setRuleForm({ ...ruleForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Condition">
                  <select
                    value={ruleForm.condition}
                    onChange={(e) => setRuleForm({ ...ruleForm, condition: e.target.value })}
                    className="w-full px-3 py-2 border border-sand-border rounded bg-white"
                  >
                    <option value="order_total_min">Cart Total Above / Equal</option>
                    <option value="order_total_below">Cart Total Below</option>
                    <option value="weight_below">Package Weight Below</option>
                  </select>
                </FormField>

                <FormField label="Condition Value">
                  <input
                    type="number"
                    value={ruleForm.conditionValue}
                    onChange={(e) =>
                      setRuleForm({ ...ruleForm, conditionValue: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Rate Action">
                  <select
                    value={ruleForm.action}
                    onChange={(e) => setRuleForm({ ...ruleForm, action: e.target.value })}
                    className="w-full px-3 py-2 border border-sand-border rounded bg-white"
                  >
                    <option value="free">Free Shipping (₹0)</option>
                    <option value="flat_rate">Flat Fee (₹)</option>
                  </select>
                </FormField>

                {ruleForm.action === 'flat_rate' && (
                  <FormField label="Shipping Fee (₹)">
                    <input
                      type="number"
                      value={ruleForm.value}
                      onChange={(e) =>
                        setRuleForm({ ...ruleForm, value: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-sand-border rounded outline-none font-semibold"
                    />
                  </FormField>
                )}
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
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
