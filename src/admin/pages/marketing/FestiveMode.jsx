import React, { useState, useRef } from 'react';
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
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
} from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { DiyaIcon } from '../../../components/festive/DiyaIcon';
import { useFestiveStore } from '../../../store/festiveStore';

export const FestiveMode = () => {
  const queryClient = useQueryClient();
  const festiveStore = useFestiveStore();

  const [saved, setSaved] = useState(false);
  const [isAdminAudioPlaying, setIsAdminAudioPlaying] = useState(false);
  const adminAudioRef = useRef(null);

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

  const [prefs, setPrefs] = useState({
    ambience: festiveStore.prefs?.ambience ?? true,
    ambient: festiveStore.prefs?.ambient ?? true,
    particles: festiveStore.prefs?.particles ?? true,
    heroScene: festiveStore.prefs?.heroScene ?? true,
    animations: festiveStore.prefs?.animations ?? true,
    confetti: festiveStore.prefs?.confetti ?? true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrefToggle = (key) => {
    const nextVal = !prefs[key];
    setPrefs((prev) => ({ ...prev, [key]: nextVal }));
    festiveStore.setPref(key, nextVal);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    festiveStore.updateFestiveSettings(formData);
    Object.keys(prefs).forEach((key) => {
      festiveStore.setPref(key, prefs[key]);
    });
    // Invalidate TanStack query key for instant reactivity across storefront
    queryClient.invalidateQueries({ queryKey: ['festive'] });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleAdminAudioPreview = () => {
    if (adminAudioRef.current) {
      if (isAdminAudioPlaying) {
        adminAudioRef.current.pause();
        setIsAdminAudioPlaying(false);
      } else {
        adminAudioRef.current.play()
          .then(() => setIsAdminAudioPlaying(true))
          .catch(() => {});
      }
    }
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

  const visualLayersList = [
    {
      key: 'ambience',
      label: 'Calm Luxury Music (Background)',
      desc: 'Starts automatically and loops continuously in the boutique storefront background.',
      icon: Music,
      isMusic: true,
    },
    {
      key: 'ambient',
      label: 'Ambient Garlands & Rangoli',
      desc: 'Traditional corner torans and marigold floral garlands framing the boutique.',
      icon: Layers,
    },
    {
      key: 'particles',
      label: 'Gold Sparkles & Lamps',
      desc: 'Subtle upward drifting gold particles and floating diya lamps.',
      icon: Sparkles,
    },
    {
      key: 'heroScene',
      label: 'Hero Lighting & 3D Diya Scene',
      desc: 'Illuminated seasonal focal scene and interactive diya lighting on homepage.',
      icon: Flame,
    },
    {
      key: 'animations',
      label: 'Shimmer & Glow Borders',
      desc: 'Slow gold foil sweeps across luxury cards, bestsellers, and hero accents.',
      icon: Sliders,
    },
    {
      key: 'confetti',
      label: 'Add-to-Bag Festive Confetti',
      desc: 'Celebratory gold & petal confetti burst when customers add jewellery to their cart.',
      icon: Gift,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <PageHeader
        title="Seasonal Festive Mode"
        description="Manage the seasonal boutique dressing, background music, gold sparkles, diya motifs, and gifting banners from this central control panel."
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

        {/* 2. Visual Layers & Background Music Controls (Admin Managed) */}
        <div className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-sand-border/70">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-sand/50 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-champagne-dark" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-espresso">
                  Atmosphere & Storefront Visual Layers
                </h2>
                <p className="text-xs text-espresso/60">
                  Control which elements are active on the storefront. Customers experience these seamlessly in the background without on-screen controls.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const allOn = {
                    ambience: true,
                    ambient: true,
                    particles: true,
                    heroScene: true,
                    animations: true,
                    confetti: true,
                  };
                  setPrefs(allOn);
                  Object.keys(allOn).forEach((k) => festiveStore.setPref(k, true));
                }}
                className="text-[11px] text-champagne-dark hover:text-espresso font-semibold underline px-2 py-1"
              >
                Enable All
              </button>
            </div>
          </div>

          {/* Hidden Admin Audio for Live Track Preview */}
          <audio
            ref={adminAudioRef}
            src="/audio/calm-music.mp3"
            onEnded={() => setIsAdminAudioPlaying(false)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {visualLayersList.map((item) => {
              const Icon = item.icon;
              const isChecked = Boolean(prefs[item.key]);

              return (
                <div
                  key={item.key}
                  className={`p-3.5 rounded-[3px] border transition-all flex items-start justify-between gap-3 ${
                    isChecked
                      ? 'border-champagne/60 bg-ivory/60 shadow-sm'
                      : 'border-sand-border bg-white opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded ${isChecked ? 'bg-champagne/20 text-champagne-dark' : 'bg-sand/30 text-espresso/50'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs text-espresso">{item.label}</span>
                        {item.isMusic && (
                          <button
                            type="button"
                            onClick={toggleAdminAudioPreview}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-sand/40 hover:bg-sand text-espresso font-semibold transition-colors cursor-pointer"
                            title="Preview music track"
                          >
                            {isAdminAudioPlaying ? (
                              <>
                                <Pause className="w-3 h-3 text-champagne-dark" />
                                <span>Stop Preview</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 text-champagne-dark" />
                                <span>Preview Audio</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-espresso/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePrefToggle(item.key)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-sand peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-champagne"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Diwali Announcement Banner */}
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

        {/* 4. Seasonal Gifting Popup */}
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

        {/* 5. Luxury Dressing Principles & Testing Controls */}
        <div className="bg-ivory/50 border border-sand-border rounded-[4px] p-4 sm:p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-espresso font-serif font-medium text-sm">
            <Info className="w-4 h-4 text-champagne-dark" />
            <span>Boutique Luxury Standards & Guardrails</span>
          </div>
          <ul className="list-disc list-inside text-espresso/70 space-y-1 leading-relaxed">
            <li><strong>Seamless Storefront:</strong> All visual layers and background audio run unobtrusively without cluttering customer shopping screens.</li>
            <li><strong>Ivory Palette Intact:</strong> The storefront never floods with bright orange or red. Only subtle marigold and deep vermilion accents are used.</li>
            <li><strong>Hero Sparkles:</strong> Strict limit of 16 particles confined to the hero section with automatic pause on scroll and tab switch.</li>
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
