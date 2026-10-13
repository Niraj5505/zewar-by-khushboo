import React, { useState } from 'react';
import { Globe, Save, CheckCircle, RefreshCw, FileCode } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const SeoSettings = () => {
  const seoSettings = useCmsStore((s) => s.seoSettings);
  const updateSeoSettings = useCmsStore((s) => s.updateSeoSettings);

  const [formData, setFormData] = useState({ ...seoSettings });
  const [sitemapRegenerated, setSitemapRegenerated] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSeoSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRegenerateSitemap = () => {
    setSitemapRegenerated(true);
    setTimeout(() => setSitemapRegenerated(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="SEO & Search Visibility"
        description="Global search indexing patterns, social OpenGraph images, tracking pixels, and robots.txt."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save SEO Rules'}</span>
        </button>
      </PageHeader>

      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-6 max-w-3xl">
        <div className="space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Default Meta Tags
          </h3>

          <FormField label="Default Meta Title Pattern" helperText="Use %s as page title variable placeholder">
            <input
              type="text"
              value={formData.defaultTitlePattern}
              onChange={(e) => setFormData({ ...formData, defaultTitlePattern: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
            />
          </FormField>

          <FormField label="Default Meta Description" helperText="Fallback description for search engines">
            <textarea
              rows={3}
              value={formData.defaultDescription}
              onChange={(e) => setFormData({ ...formData, defaultDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none leading-relaxed"
            />
          </FormField>

          <FormField label="Default OpenGraph Social Share Image URL">
            <input
              type="text"
              value={formData.defaultOgImage}
              onChange={(e) => setFormData({ ...formData, defaultOgImage: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
            Analytics & Tracking Pixels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Google Analytics Measurement ID (GA4)">
              <input
                type="text"
                value={formData.googleAnalyticsId}
                onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
              />
            </FormField>

            <FormField label="Meta / Facebook Pixel ID">
              <input
                type="text"
                value={formData.metaPixelId}
                onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                placeholder="109283749281726"
                className="w-full px-3 py-2 text-xs border border-sand-border rounded font-mono outline-none"
              />
            </FormField>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sand-border/70">
            <h3 className="font-serif text-base font-medium text-espresso flex items-center gap-2">
              <FileCode className="w-4 h-4 text-champagne-dark" />
              <span>Robots.txt Configuration</span>
            </h3>
            <button
              type="button"
              onClick={handleRegenerateSitemap}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-ivory border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded"
            >
              <RefreshCw className="w-3 h-3 text-champagne-dark" />
              <span>{sitemapRegenerated ? '✓ Sitemap Rebuilt' : 'Regenerate Sitemap.xml'}</span>
            </button>
          </div>

          <textarea
            rows={5}
            value={formData.robotsTxt}
            onChange={(e) => setFormData({ ...formData, robotsTxt: e.target.value })}
            className="w-full p-3 text-xs border border-sand-border rounded font-mono bg-ivory/30 outline-none leading-relaxed"
          />
        </div>
      </form>
    </div>
  );
};
