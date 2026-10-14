import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Sparkles,
  Calendar,
  Save,
  Eye,
  CheckCircle,
  RotateCcw,
  ExternalLink,
  Flame,
  Info,
  Gift,
  Bell,
  Layers,
} from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { DiyaIcon } from '../../../components/festive/DiyaIcon';
import { useFestiveStore } from '../../../store/festiveStore';

export const FestiveMode = () => {
  const queryClient = useQueryClient();
  const festiveStore = useFestiveStore();

  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    enabled: festiveStore.enabled,
    mode: festiveStore.mode,
    startDate: festiveStore.startDate,
    endDate: festiveStore.endDate,
    bannerMessage: festiveStore.bannerMessage,
    bannerLinkText: festiveStore.bannerLinkText,
    bannerLinkUrl: festiveStore.bannerLinkUrl,
    popupTitle: festiveStore.popupTitle,
    popupBody: festiveStore.popupBody,
    popupCtaText: festiveStore.popupCtaText,
    popupCtaUrl: festiveStore.popupCtaUrl,
    popupImage: festiveStore.popupImage,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    festiveStore.updateFestiveSettings(formData);
    // Invalidate TanStack query key for instant reactivity across storefront
    queryClient.invalidateQueries({ queryKey: ['festive'] });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetDismissals = () => {
    festiveStore.resetBannerDismissal();
    festiveStore.resetPopupSeen();
    festiveStore.setUserOptOut(false);
    alert('Seasonal banner dismissals, popup seen status, and user opt-outs have been reset for testing.');
  };

  const handleOpenPreview = () => {
    window.open('/?festive=preview', '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <PageHeader
        title="Seasonal Festive Mode"
        description="Gracefully dress the Zewar boutique with warm ambient gold sparkles, Diya motifs, and seasonal gifting banners."
        badge="Diwali 2026"
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleOpenPreview}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-3.5 py-2 border border-sand-border hover:bg-sand/30 rounded text-xs font-semibold text-espresso transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Preview Storefront</span>
            <ExternalLink className="w-3 h-3 text-espresso/40" />
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved Live!' : 'Save Festive Mode'}</span>
          </button>
        </div>
      </PageHeader>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Master Activation & Scheduling */}
        <div className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-sand-border/70">
            <div className="w-7 h-7 rounded-full bg-sand/50 flex items-center justify-center">
              <DiyaIcon className="w-4 h-4 text-champagne-dark" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-espresso">
                Festival Activation & Schedule
              </h2>
              <p className="text-xs text-espresso/60">
                Choose whether the seasonal effects run automatically by date, stay forced on, or turn off completely.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'auto',
                label: 'Automatic Date Window',
                desc: 'Activates automatically between start & end dates, then removes itself.',
              },
              {
                id: 'on',
                label: 'Force Always Active',
                desc: 'Keeps festive effects live regardless of dates (for testing or extended celebration).',
              },
              {
                id: 'off',
                label: 'Force Disabled',
                desc: 'Completely disables festive effects across the entire boutique.',
              },
            ].map((m) => (
              <label
                key={m.id}
                className={`p-3.5 border rounded-[3px] cursor-pointer transition-all flex flex-col justify-between ${
                  formData.mode === m.id
                    ? 'border-champagne bg-champagne/10 ring-1 ring-champagne'
                    : 'border-sand-border hover:bg-ivory/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-espresso">{m.label}</span>
                  <input
                    type="radio"
                    name="festiveMode"
                    value={m.id}
                    checked={formData.mode === m.id}
                    onChange={() => handleChange('mode', m.id)}
                    className="text-champagne focus:ring-champagne"
                  />
                </div>
                <span className="text-[11px] text-espresso/60 leading-relaxed">{m.desc}</span>
              </label>
            ))}
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormField
              label="Festive Start Date"
              helperText="Festive styling automatically activates on 00:00 of this date."
            >
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne font-mono"
              />
            </FormField>

            <FormField
              label="Festive End Date"
              helperText="Effects cleanly shut down on 23:59 of this date with zero residual code."
            >
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne font-mono"
              />
            </FormField>
          </div>
        </div>

        {/* 2. Diwali Announcement Banner */}
        <div className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-sand-border/70">
            <div className="w-7 h-7 rounded-full bg-sand/50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-champagne-dark" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-espresso">
                Diwali Announcement Banner
              </h2>
              <p className="text-xs text-espresso/60">
                Shown at the top of the storefront with subtle espresso to deep vermilion gradient and Diya emblem.
              </p>
            </div>
          </div>

          {/* Banner Live Preview Simulation */}
          <div className="p-3 bg-gradient-to-r from-[#2B1E19] via-[#3C1C17] to-[#2B1E19] text-[#FAF7F0] border border-[#B33A2B]/40 rounded-[3px] text-xs flex items-center justify-between shadow-sm">
            <div className="w-4" />
            <div className="flex items-center gap-2 font-serif text-[12px] tracking-wide mx-auto">
              <DiyaIcon className="w-3.5 h-3.5 text-champagne" />
              <span>{formData.bannerMessage || 'Diwali Gifting — Complimentary Gift Wrapping on All Orders'}</span>
              {formData.bannerLinkText && (
                <span className="font-sans text-[10px] uppercase font-bold text-champagne underline ml-1">
                  {formData.bannerLinkText} →
                </span>
              )}
            </div>
            <div className="text-[10px] text-white/50">✕</div>
          </div>

          <div className="space-y-4 pt-2">
            <FormField label="Banner Message (Single line text)" required>
              <input
                type="text"
                value={formData.bannerMessage}
                onChange={(e) => handleChange('bannerMessage', e.target.value)}
                placeholder="Diwali Gifting — Complimentary Gift Wrapping on All Orders"
                className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne font-serif"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="CTA Link Text (Optional)">
                <input
                  type="text"
                  value={formData.bannerLinkText}
                  onChange={(e) => handleChange('bannerLinkText', e.target.value)}
                  placeholder="Explore Gifts"
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
                />
              </FormField>

              <FormField label="CTA Link URL">
                <input
                  type="text"
                  value={formData.bannerLinkUrl}
                  onChange={(e) => handleChange('bannerLinkUrl', e.target.value)}
                  placeholder="/shop"
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne font-mono"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* 3. Seasonal Gifting Popup */}
        <div className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-sand-border/70">
            <div className="w-7 h-7 rounded-full bg-sand/50 flex items-center justify-center">
              <Gift className="w-4 h-4 text-champagne-dark" />
            </div>
            <div>
              <h2 className="font-serif text-base font-medium text-espresso">
                Diwali Seasonal Dialog / Popup
              </h2>
              <p className="text-xs text-espresso/60">
                Shown once per season after 15 seconds dwell time. Respects single popup frequency limits.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Popup Headline" required>
                <input
                  type="text"
                  value={formData.popupTitle}
                  onChange={(e) => handleChange('popupTitle', e.target.value)}
                  placeholder="Celebrate with Zewar"
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne font-serif"
                />
              </FormField>

              <FormField label="Popup Action Button Text">
                <input
                  type="text"
                  value={formData.popupCtaText}
                  onChange={(e) => handleChange('popupCtaText', e.target.value)}
                  placeholder="Explore Diwali Edits"
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
                />
              </FormField>
            </div>

            <FormField label="Greeting & Atmosphere Copy" required>
              <textarea
                rows={3}
                value={formData.popupBody}
                onChange={(e) => handleChange('popupBody', e.target.value)}
                placeholder="May your festive celebrations sparkle with eternal light and joyous heirlooms..."
                className="w-full p-3 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne leading-relaxed font-sans"
              />
            </FormField>
          </div>
        </div>

        {/* 4. Luxury Dressing Principles & Testing Controls */}
        <div className="bg-ivory/50 border border-sand-border rounded-[4px] p-4 sm:p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-espresso font-serif font-medium text-sm">
            <Info className="w-4 h-4 text-champagne-dark" />
            <span>Boutique Luxury Standards & Guardrails</span>
          </div>
          <ul className="list-disc list-inside text-espresso/70 space-y-1 leading-relaxed">
            <li><strong>Ivory Palette Intact:</strong> The storefront never floods with bright orange or red. Only subtle marigold and deep vermilion accents are used.</li>
            <li><strong>Hero Sparkles:</strong> Strict limit of 16 particles confined to the hero section with automatic pause on scroll and tab switch.</li>
            <li><strong>Patron Control:</strong> Patrons have an instant on/off toggle button at bottom-left that persists permanently.</li>
            <li><strong>Accessibility:</strong> Respects <code className="bg-white px-1 py-0.5 rounded border border-sand-border font-mono text-[11px]">prefers-reduced-motion: reduce</code> automatically.</li>
          </ul>

          <div className="pt-3 border-t border-sand-border flex flex-wrap items-center justify-between gap-3">
            <span className="text-espresso/60 text-[11px]">
              Testing in local browser? Reset your browser's seasonal dismissed records.
            </span>
            <button
              type="button"
              onClick={handleResetDismissals}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sand-border hover:bg-white text-espresso rounded text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-champagne-dark" />
              <span>Reset Local Dismissals</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
