import React, { useState } from 'react';
import { Store, Save, CheckCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const StoreSettings = () => {
  const storeSettings = useCmsStore((s) => s.storeSettings);
  const updateStoreSettings = useCmsStore((s) => s.updateStoreSettings);

  const [formData, setFormData] = useState({ ...storeSettings });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateStoreSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Store & Brand Settings"
        description="Boutique identity, concierge contact channels, studio address, and brand links."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Settings'}</span>
        </button>
      </PageHeader>

      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-6 max-w-3xl">
        <div className="space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Brand Name" required>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded font-serif text-sm outline-none"
              />
            </FormField>

            <FormField label="Tagline">
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
              />
            </FormField>
          </div>

          <FormField label="Story Subtitle">
            <input
              type="text"
              value={formData.subTagline || ''}
              onChange={(e) => setFormData({ ...formData, subTagline: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Concierge & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Support Email" required>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
              />
            </FormField>

            <FormField label="WhatsApp Concierge" required>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
              />
            </FormField>
          </div>

          <FormField label="Studio Flagship Address">
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 text-xs border border-sand-border rounded outline-none leading-relaxed"
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormField label="Instagram URL">
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-sand-border rounded outline-none font-mono"
              />
            </FormField>

            <FormField label="Facebook URL">
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-sand-border rounded outline-none font-mono"
              />
            </FormField>

            <FormField label="Pinterest URL">
              <input
                type="text"
                value={formData.pinterestUrl}
                onChange={(e) => setFormData({ ...formData, pinterestUrl: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-sand-border rounded outline-none font-mono"
              />
            </FormField>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-3">
          <h3 className="font-serif text-base font-medium text-espresso">
            Currency & Locale
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Store Currency (Locked)">
              <input
                type="text"
                disabled
                value="INR — Indian Rupee (₹)"
                className="w-full px-3 py-2 text-xs bg-sand/30 border border-sand-border rounded text-espresso font-semibold"
              />
            </FormField>
            <FormField label="Locale">
              <input
                type="text"
                disabled
                value="en-IN (English - India)"
                className="w-full px-3 py-2 text-xs bg-sand/30 border border-sand-border rounded text-espresso"
              />
            </FormField>
          </div>
        </div>
      </form>
    </div>
  );
};
