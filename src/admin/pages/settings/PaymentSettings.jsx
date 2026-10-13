import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, Save, CheckCircle, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const PaymentSettings = () => {
  const paymentSettings = useCmsStore((s) => s.paymentSettings);
  const updatePaymentSettings = useCmsStore((s) => s.updatePaymentSettings);

  const [formData, setFormData] = useState({
    razorpayKeyId: paymentSettings?.razorpayKeyId || '',
    isTestMode: Boolean(paymentSettings?.isTestMode),
    upiId: paymentSettings?.upiId || 'zewarbykhushboo@hdfcbank',
    codEnabled: paymentSettings?.codEnabled !== false,
    codMinRupees: Math.round((paymentSettings?.codMinOrderPaise || 50000) / 100),
    codMaxRupees: Math.round((paymentSettings?.codMaxOrderPaise || 1000000) / 100),
  });

  const [newKeySecret, setNewKeySecret] = useState('');
  const [newWebhookSecret, setNewWebhookSecret] = useState('');
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      razorpayKeyId: formData.razorpayKeyId,
      isTestMode: formData.isTestMode,
      upiId: formData.upiId,
      codEnabled: formData.codEnabled,
      codMinOrderPaise: Number(formData.codMinRupees) * 100,
      codMaxOrderPaise: Number(formData.codMaxRupees) * 100,
    };

    if (newKeySecret.trim()) {
      payload.razorpayKeySecretMasked = `••••••••••••••••${newKeySecret.slice(-4)}`;
    }
    if (newWebhookSecret.trim()) {
      payload.webhookSecretMasked = `••••••••••••••••${newWebhookSecret.slice(-4)}`;
    }

    updatePaymentSettings(payload);
    setNewKeySecret('');
    setNewWebhookSecret('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Payment Gateways & COD"
        description="Configure Razorpay payment gateway credentials, webhook secrets, UPI routing, and Cash on Delivery rules."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Payment Config'}</span>
        </button>
      </PageHeader>

      <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-[4px] text-xs text-amber-900 flex items-start gap-3 max-w-3xl">
        <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-espresso">High Security Environment</p>
          <p className="text-amber-800 leading-relaxed mt-0.5">
            Razorpay API Secret Keys and Webhook tokens are never sent in plain-text to the browser. Existing secrets remain masked and will only be replaced if you enter a new value below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-6 max-w-3xl">
        {/* Razorpay Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sand-border/70">
            <h3 className="font-serif text-base font-medium text-espresso flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-champagne-dark" />
              <span>Razorpay Integration</span>
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-xs text-espresso/70">Gateway Mode:</span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isTestMode: !formData.isTestMode })}
                className={`px-2.5 py-1 text-xs font-semibold rounded-[2px] border ${
                  formData.isTestMode
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}
              >
                {formData.isTestMode ? 'Test Sandbox' : 'Production Live'}
              </button>
            </div>
          </div>

          <FormField label="Razorpay Key ID (Public)" required helperText="Begins with rzp_live_ or rzp_test_">
            <input
              type="text"
              required
              value={formData.razorpayKeyId}
              onChange={(e) => setFormData({ ...formData, razorpayKeyId: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
            />
          </FormField>

          <FormField
            label="Razorpay Key Secret (Server Only)"
            helperText={`Currently stored as: ${paymentSettings?.razorpayKeySecretMasked || '••••••••'}. Leave blank to keep existing secret.`}
          >
            <div className="relative">
              <input
                type={showKeySecret ? 'text' : 'password'}
                value={newKeySecret}
                onChange={(e) => setNewKeySecret(e.target.value)}
                placeholder="Enter new secret key to update..."
                className="w-full pl-3 pr-10 py-2 text-xs border border-sand-border rounded font-mono outline-none"
              />
              <button
                type="button"
                onClick={() => setShowKeySecret(!showKeySecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso"
              >
                {showKeySecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </FormField>

          <FormField
            label="Razorpay Webhook Secret"
            helperText={`Currently stored as: ${paymentSettings?.webhookSecretMasked || '••••••••'}. Leave blank to keep existing.`}
          >
            <input
              type="password"
              value={newWebhookSecret}
              onChange={(e) => setNewWebhookSecret(e.target.value)}
              placeholder="Enter new webhook verification secret..."
              className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
            />
          </FormField>
        </div>

        {/* UPI & Cash on Delivery */}
        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            UPI & Cash on Delivery (COD) Rules
          </h3>

          <FormField label="Boutique UPI ID (Display VPA)">
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
            />
          </FormField>

          <div className="flex items-center justify-between p-3 bg-ivory/60 border border-sand-border rounded">
            <div>
              <p className="text-xs font-semibold text-espresso">Enable Cash on Delivery (COD)</p>
              <p className="text-[11px] text-espresso/60">
                Allow customers to pay cash upon parcel delivery.
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.codEnabled}
              onChange={(e) => setFormData({ ...formData, codEnabled: e.target.checked })}
              className="w-4 h-4 text-champagne rounded focus:ring-champagne"
            />
          </div>

          {formData.codEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Minimum Order Value for COD (₹)">
                <input
                  type="number"
                  min="0"
                  value={formData.codMinRupees}
                  onChange={(e) => setFormData({ ...formData, codMinRupees: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                />
              </FormField>

              <FormField label="Maximum Order Limit for COD (₹)">
                <input
                  type="number"
                  min="0"
                  value={formData.codMaxRupees}
                  onChange={(e) => setFormData({ ...formData, codMaxRupees: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                />
              </FormField>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
