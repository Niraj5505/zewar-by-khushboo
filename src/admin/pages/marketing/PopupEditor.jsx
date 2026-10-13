import React, { useState } from 'react';
import { Sparkles, Eye, Save, Plus, Edit, Trash2, CheckCircle, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const PopupEditor = () => {
  const popups = useCmsStore((s) => s.popups);
  const updatePopup = useCmsStore((s) => s.updatePopup);

  const [editingPopup, setEditingPopup] = useState(popups[0] || null);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingPopup) return;
    updatePopup(editingPopup.id, editingPopup);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggle = (p) => {
    updatePopup(p.id, { enabled: !p.enabled });
    if (editingPopup?.id === p.id) {
      setEditingPopup({ ...editingPopup, enabled: !editingPopup.enabled });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Promotional Popups & Modals"
        description="Configure welcome vouchers, newsletter lead capture modals, and exit-intent dialogs."
        badge={`${popups.length} Modals`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Popups List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {popups.map((p) => {
            const isSelected = editingPopup?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setEditingPopup(p)}
                className={`p-4 rounded-[4px] border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-champagne ring-1 ring-champagne shadow-sm'
                    : 'bg-white border-sand-border/80 hover:bg-ivory/50'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-sand-border/60">
                  <span className="font-semibold text-espresso text-xs">{p.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(p);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      p.enabled
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {p.enabled ? 'Active' : 'Inactive'}
                  </button>
                </div>
                <p className="text-[11px] text-espresso/60 truncate">&quot;{p.headline}&quot;</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-espresso/40">
                  <span>Trigger: {p.triggerType}</span>
                  <span>Delay: {p.delaySeconds}s</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Popup Configuration Form (8 cols) */}
        <div className="lg:col-span-8">
          {editingPopup ? (
            <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand-border">
                <div>
                  <h3 className="font-serif text-base font-medium text-espresso">
                    Edit: {editingPopup.name}
                  </h3>
                  <p className="text-xs text-espresso/60">Configure triggers, messaging, and reveal codes.</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/dev/popups"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-sand-border hover:bg-sand/30 rounded text-xs text-espresso font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5 text-champagne-dark" />
                    <span>Test on Storefront</span>
                  </a>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] shadow-sm"
                  >
                    {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{saved ? 'Saved!' : 'Save Popup'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Headline Title" required>
                  <input
                    type="text"
                    required
                    value={editingPopup.headline}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, headline: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                  />
                </FormField>

                <FormField label="Coupon Code to Reveal (Optional)">
                  <input
                    type="text"
                    value={editingPopup.codeToReveal || ''}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, codeToReveal: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. WELCOME10"
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono font-bold uppercase outline-none"
                  />
                </FormField>
              </div>

              <FormField label="Body Message Copy">
                <textarea
                  rows={3}
                  value={editingPopup.body}
                  onChange={(e) => setEditingPopup({ ...editingPopup, body: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none leading-relaxed"
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Trigger Event">
                  <select
                    value={editingPopup.triggerType}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, triggerType: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded bg-white outline-none"
                  >
                    <option value="time_delay">Time Delay (Seconds)</option>
                    <option value="exit_intent">Exit Intent (Mouse Leave)</option>
                    <option value="scroll_depth">Scroll Depth (50%)</option>
                  </select>
                </FormField>

                <FormField label="Delay (Seconds)">
                  <input
                    type="number"
                    min="0"
                    value={editingPopup.delaySeconds}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, delaySeconds: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                  />
                </FormField>

                <FormField label="Display Frequency">
                  <select
                    value={editingPopup.frequency}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, frequency: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded bg-white outline-none"
                  >
                    <option value="once_per_session">Once per session</option>
                    <option value="once_per_user">Once per user (permanent)</option>
                    <option value="every_visit">Every visit</option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Call to Action Button Text">
                  <input
                    type="text"
                    value={editingPopup.ctaText}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, ctaText: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                  />
                </FormField>

                <FormField label="CTA Destination URL">
                  <input
                    type="text"
                    value={editingPopup.ctaLink}
                    onChange={(e) =>
                      setEditingPopup({ ...editingPopup, ctaLink: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                  />
                </FormField>
              </div>

              <FormField label="Showcase Photograph URL">
                <input
                  type="text"
                  value={editingPopup.image}
                  onChange={(e) =>
                    setEditingPopup({ ...editingPopup, image: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none font-mono"
                />
              </FormField>
            </form>
          ) : (
            <div className="p-8 text-center text-xs text-espresso/50">
              Select a popup to configure.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
