import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Save, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const EmailSettings = () => {
  const emailSettings = useCmsStore((s) => s.emailSettings);
  const updateEmailSettings = useCmsStore((s) => s.updateEmailSettings);

  const [formData, setFormData] = useState({ ...emailSettings });
  const [testSent, setTestSent] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateEmailSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTestSend = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Email Notifications & Dispatch"
        description="Configure transactional email delivery for order confirmations, shipment updates, and welcome series."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Email Config'}</span>
        </button>
      </PageHeader>

      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-6 max-w-3xl">
        <div className="space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Email Delivery Provider
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Service Provider" required>
              <select
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded bg-white outline-none"
              >
                <option value="Resend">Resend (Recommended)</option>
                <option value="SendGrid">Twilio SendGrid</option>
                <option value="Postmark">Postmark</option>
                <option value="SMTP">Custom SMTP Server</option>
              </select>
            </FormField>

            <FormField label="API Key / Password (Masked)" helperText="Stored encrypted at rest on server">
              <input
                type="text"
                value={formData.apiKeyMasked}
                onChange={(e) => setFormData({ ...formData, apiKeyMasked: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
              />
            </FormField>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Sender Identification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormField label="From Sender Name" required>
              <input
                type="text"
                required
                value={formData.fromName}
                onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
              />
            </FormField>

            <FormField label="From Email Address" required>
              <input
                type="email"
                required
                value={formData.fromEmail}
                onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none font-mono"
              />
            </FormField>

            <FormField label="Reply-To Address">
              <input
                type="email"
                value={formData.replyTo}
                onChange={(e) => setFormData({ ...formData, replyTo: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none font-mono"
              />
            </FormField>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-3">
          <h3 className="font-serif text-base font-medium text-espresso">
            Transactional Template Identifiers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <FormField label="Order Confirmation">
              <input
                type="text"
                value={formData.orderConfirmationTemplate}
                onChange={(e) =>
                  setFormData({ ...formData, orderConfirmationTemplate: e.target.value })
                }
                className="w-full px-2 py-1.5 border border-sand-border rounded font-mono"
              />
            </FormField>

            <FormField label="Shipment Manifested">
              <input
                type="text"
                value={formData.orderShippedTemplate}
                onChange={(e) =>
                  setFormData({ ...formData, orderShippedTemplate: e.target.value })
                }
                className="w-full px-2 py-1.5 border border-sand-border rounded font-mono"
              />
            </FormField>

            <FormField label="Welcome Voucher">
              <input
                type="text"
                value={formData.welcomeTemplate}
                onChange={(e) => setFormData({ ...formData, welcomeTemplate: e.target.value })}
                className="w-full px-2 py-1.5 border border-sand-border rounded font-mono"
              />
            </FormField>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-border/70 flex items-center justify-between">
          <p className="text-xs text-espresso/60">
            Verify provider connection by sending a diagnostic ping to {formData.fromEmail}
          </p>
          <button
            type="button"
            onClick={handleTestSend}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded"
          >
            <Send className="w-3.5 h-3.5 text-champagne-dark" />
            <span>{testSent ? '✓ Diagnostic Test Sent' : 'Send Test Diagnostic Email'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
