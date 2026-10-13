import React, { useState } from 'react';
import {
  Layout,
  ArrowUp,
  ArrowDown,
  Edit,
  Eye,
  CheckCircle,
  Save,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const HomepageEditor = () => {
  const homepageSections = useCmsStore((s) => s.homepageSections);
  const updateHomepageSections = useCmsStore((s) => s.updateHomepageSections);
  const products = useCmsStore((s) => s.products);

  const [sections, setSections] = useState(homepageSections);
  const [editingSection, setEditingSection] = useState(null);
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' or 'preview'
  const [saved, setSaved] = useState(false);

  const handleToggle = (id) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSections(updated);
    updateHomepageSections(updated);
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setSections(copy);
    updateHomepageSections(copy);
  };

  const handleSaveSectionEdits = (e) => {
    e.preventDefault();
    if (!editingSection) return;
    const updated = sections.map((s) => (s.id === editingSection.id ? editingSection : s));
    setSections(updated);
    updateHomepageSections(updated);
    setEditingSection(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublishAll = () => {
    updateHomepageSections(sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Homepage Layout & Sections"
        description="Arrange visual sections, customize hero copy, curating bestsellers, and manage layout sequence."
      >
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-sand-border rounded-[2px] p-0.5 text-xs mr-2">
            <button
              type="button"
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1 rounded-[2px] font-medium ${
                activeTab === 'sections'
                  ? 'bg-espresso text-ivory font-semibold'
                  : 'text-espresso/70 hover:text-espresso'
              }`}
            >
              Sections Sequence
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-[2px] font-medium flex items-center gap-1 ${
                activeTab === 'preview'
                  ? 'bg-espresso text-ivory font-semibold'
                  : 'text-espresso/70 hover:text-espresso'
              }`}
            >
              <Eye className="w-3 h-3 text-champagne-dark" />
              <span>Live Preview</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePublishAll}
            className="inline-flex items-center gap-2 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Published Live!' : 'Publish Sections'}</span>
          </button>
        </div>
      </PageHeader>

      {activeTab === 'sections' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sections List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle divide-y divide-sand-border/60">
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                    !section.enabled ? 'bg-sand/15 opacity-70' : 'bg-white hover:bg-ivory/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded text-espresso/60"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === sections.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded text-espresso/60"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-espresso text-xs">
                          {idx + 1}. {section.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-sand/40 text-espresso/60 border border-sand-border">
                          {section.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-espresso/50 mt-0.5">
                        {section.enabled ? 'Visible on storefront' : 'Hidden from storefront'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingSection(section)}
                      className="px-2.5 py-1 text-xs border border-sand-border hover:bg-sand/30 rounded text-espresso font-medium flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3 text-champagne-dark" />
                      <span>Configure</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggle(section.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-[2px] border transition-colors ${
                        section.enabled
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}
                    >
                      {section.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Inline Section Config Form (5 cols) */}
          <div className="lg:col-span-5">
            {editingSection ? (
              <div className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sand-border">
                  <h3 className="font-serif text-base font-medium text-espresso">
                    Configure: {editingSection.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingSection(null)}
                    className="text-xs text-espresso/50 hover:text-espresso"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleSaveSectionEdits} className="space-y-3 text-xs">
                  {editingSection.type === 'hero' && (
                    <>
                      <FormField label="Hero Headline">
                        <input
                          type="text"
                          value={editingSection.headline || ''}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, headline: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                        />
                      </FormField>

                      <FormField label="Hero Subheadline">
                        <textarea
                          rows={2}
                          value={editingSection.subheadline || ''}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, subheadline: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded outline-none leading-relaxed"
                        />
                      </FormField>

                      <div className="grid grid-cols-2 gap-2">
                        <FormField label="Primary CTA Text">
                          <input
                            type="text"
                            value={editingSection.ctaPrimaryText || ''}
                            onChange={(e) =>
                              setEditingSection({
                                ...editingSection,
                                ctaPrimaryText: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1.5 border border-sand-border rounded"
                          />
                        </FormField>
                        <FormField label="Primary CTA Link">
                          <input
                            type="text"
                            value={editingSection.ctaPrimaryUrl || ''}
                            onChange={(e) =>
                              setEditingSection({
                                ...editingSection,
                                ctaPrimaryUrl: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1.5 border border-sand-border rounded"
                          />
                        </FormField>
                      </div>

                      <FormField label="Hero Background / Showcase Image">
                        <input
                          type="text"
                          value={editingSection.backgroundImage || ''}
                          onChange={(e) =>
                            setEditingSection({
                              ...editingSection,
                              backgroundImage: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded outline-none font-mono"
                        />
                      </FormField>
                    </>
                  )}

                  {editingSection.type === 'bestsellers' && (
                    <>
                      <FormField label="Selection Mode">
                        <select
                          value={editingSection.mode || 'manual'}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, mode: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded bg-white"
                        >
                          <option value="manual">Manual Curated Products</option>
                          <option value="auto">Automatic (Top 4 by Sales)</option>
                        </select>
                      </FormField>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-espresso block text-[11px] uppercase">
                          Featured Products in Grid:
                        </label>
                        <div className="max-h-48 overflow-y-auto space-y-1 p-2 bg-ivory/40 border border-sand-border rounded">
                          {products.map((p) => {
                            const isSelected = editingSection.productIds?.includes(p.id);
                            return (
                              <label
                                key={p.id}
                                className="flex items-center gap-2 p-1.5 hover:bg-sand/30 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={Boolean(isSelected)}
                                  onChange={(e) => {
                                    const current = editingSection.productIds || [];
                                    const next = e.target.checked
                                      ? [...current, p.id]
                                      : current.filter((id) => id !== p.id);
                                    setEditingSection({ ...editingSection, productIds: next });
                                  }}
                                  className="rounded text-champagne focus:ring-champagne"
                                />
                                <span className="text-xs text-espresso font-medium truncate">
                                  {p.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {editingSection.type === 'story' && (
                    <>
                      <FormField label="Story Headline">
                        <input
                          type="text"
                          value={editingSection.headline || ''}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, headline: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded"
                        />
                      </FormField>

                      <FormField label="Craftsmanship Image URL">
                        <input
                          type="text"
                          value={editingSection.storyImage || ''}
                          onChange={(e) =>
                            setEditingSection({ ...editingSection, storyImage: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-sand-border rounded font-mono"
                        />
                      </FormField>
                    </>
                  )}

                  {['trust_bar', 'categories', 'testimonials', 'instagram', 'newsletter'].includes(
                    editingSection.type
                  ) && (
                    <div className="p-4 bg-sand/20 border border-sand-border rounded text-center text-xs text-espresso/70 space-y-1">
                      <p className="font-semibold text-espresso">Pre-configured Dynamic Section</p>
                      <p>
                        This section automatically reflects items from its corresponding CMS manager (e.g. Testimonials, Instagram, or Categories tab).
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="px-3 py-1.5 border border-sand-border text-xs rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm"
                    >
                      Save Section
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white border border-sand-border/80 rounded-[4px] p-8 text-center text-xs text-espresso/60 space-y-2">
                <Sparkles className="w-6 h-6 text-champagne-dark mx-auto" />
                <p className="font-semibold text-espresso">Select a Section to Configure</p>
                <p>
                  Click &apos;Configure&apos; on any section to adjust its copy, showcase images, or featured products.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Storefront Live Frame Preview */
        <div className="bg-white border border-sand-border rounded-[4px] p-2 shadow-hover space-y-2">
          <div className="flex items-center justify-between px-3 py-1 bg-ivory rounded text-xs text-espresso/70">
            <span className="font-mono text-[11px]">Previewing: / (Live Storefront)</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-champagne-dark hover:text-espresso font-semibold"
            >
              <span>Open in new window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <iframe
            src="/"
            title="Storefront Preview"
            className="w-full h-[650px] border border-sand-border rounded bg-ivory"
          />
        </div>
      )}
    </div>
  );
};
