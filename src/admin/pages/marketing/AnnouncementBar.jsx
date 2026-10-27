import React, { useState } from 'react';
import { Sparkles, Save, CheckCircle, Eye, Megaphone, Link as LinkIcon } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const AnnouncementBar = () => {
  const announcement = useCmsStore((s) => s.announcement);
  const updateAnnouncement = useCmsStore((s) => s.updateAnnouncement);

  const [formData, setFormData] = useState({
    message: announcement?.message || '',
    link: announcement?.link || '/shop',
    linkText: announcement?.linkText || 'Shop Collection',
    backgroundColor: announcement?.backgroundColor || '#FAF7F0',
    textColor: announcement?.textColor || '#30251F',
    dismissible: announcement?.dismissible !== false,
    active: announcement?.active !== false,
    startDate: announcement?.startDate || '2026-01-01',
    endDate: announcement?.endDate || '2027-12-31',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateAnnouncement(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const colorPresets = [
    { label: 'Ivory (Storefront Default)', bg: '#FAF7F0', text: '#30251F' },
    { label: 'Deep Espresso', bg: '#30251F', text: '#FAF7F0' },
    { label: 'Champagne Gold', bg: '#C6A15B', text: '#30251F' },
    { label: 'Soft Sand', bg: '#EAE0D2', text: '#30251F' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Storefront Announcement Bar"
        description="Top banner broadcast message running across all public boutique pages."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Updated Live!' : 'Publish Changes'}</span>
        </button>
      </PageHeader>

      {/* Live Preview Box */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-espresso/60 font-semibold uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Real-time Storefront Banner Preview</span>
        </div>

        <div
          style={{
            backgroundColor: formData.backgroundColor,
            color: formData.textColor,
          }}
          className="p-3 rounded-[3px] border border-sand-border/80 shadow-sm flex items-center justify-between transition-colors duration-200"
        >
          <div className="w-4" />
          <div className="flex items-center gap-2 text-xs font-medium font-sans tracking-wide text-center">
            <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
            <span>{formData.message || 'Announcement message goes here'}</span>
            {formData.linkText && (
              <span className="underline font-semibold ml-1 cursor-pointer">
                {formData.linkText} →
              </span>
            )}
            <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
          </div>
          <div className="text-xs opacity-50">✕</div>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-6 max-w-2xl">
        <div className="flex items-center justify-between p-3 bg-ivory/60 border border-sand-border rounded">
          <div>
            <p className="text-xs font-semibold text-espresso">Enable Announcement Banner</p>
            <p className="text-[11px] text-espresso/60">
              When disabled, the banner is hidden from all visitors.
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4 text-champagne rounded focus:ring-champagne border-sand-border"
          />
        </div>

        <FormField label="Banner Message Text" required helperText="Supports emojis and symbols (e.g. ♡ ✨ 💎)">
          <input
            type="text"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Free Shipping on orders above ₹999 | Handmade with Love ♡"
            className="w-full px-3 py-2 text-xs border border-sand-border rounded focus:ring-2 focus:ring-champagne outline-none"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Call to Action URL" helperText="Destination link when clicked">
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="/shop or /collections/necklaces"
              className="w-full px-3 py-2 text-xs border border-sand-border rounded focus:ring-2 focus:ring-champagne outline-none"
            />
          </FormField>

          <FormField label="CTA Link Text" helperText="e.g. Shop Now, Explore">
            <input
              type="text"
              value={formData.linkText}
              onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
              placeholder="Shop Collection"
              className="w-full px-3 py-2 text-xs border border-sand-border rounded focus:ring-2 focus:ring-champagne outline-none"
            />
          </FormField>
        </div>

        {/* Color Palette Presets */}
        <div className="space-y-2">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70">
            Brand Color Presets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {colorPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    backgroundColor: preset.bg,
                    textColor: preset.text,
                  })
                }
                className="p-2 border border-sand-border rounded text-left text-xs hover:border-champagne flex items-center gap-2"
              >
                <div
                  className="w-4 h-4 rounded-full border border-sand-border"
                  style={{ backgroundColor: preset.bg }}
                />
                <span className="truncate text-[11px] text-espresso font-medium">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Custom Background Color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-8 h-8 rounded border border-sand-border cursor-pointer"
              />
              <input
                type="text"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-sand-border rounded font-mono"
              />
            </div>
          </FormField>

          <FormField label="Custom Text Color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-8 h-8 rounded border border-sand-border cursor-pointer"
              />
              <input
                type="text"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-full px-2 py-1.5 text-xs border border-sand-border rounded font-mono"
              />
            </div>
          </FormField>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-sand-border/60">
          <div>
            <p className="text-xs font-semibold text-espresso">Allow Dismissal</p>
            <p className="text-[11px] text-espresso/60">
              Users can close the bar with an &apos;X&apos; button during their session.
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.dismissible}
            onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
            className="w-4 h-4 text-champagne rounded focus:ring-champagne"
          />
        </div>
      </form>
    </div>
  );
};
