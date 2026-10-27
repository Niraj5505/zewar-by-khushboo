import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, Eye, Globe } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { RichTextEditor } from '../../components/RichTextEditor';
import { useCmsStore } from '../../lib/cmsStore';

export const PageEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const pages = useCmsStore((s) => s.pages);
  const updatePage = useCmsStore((s) => s.updatePage);

  const page = pages.find((p) => p.slug === slug);

  const [formData, setFormData] = useState({
    title: page?.title || '',
    content: page?.content || '',
    metaTitle: page?.metaTitle || '',
    metaDescription: page?.metaDescription || '',
    published: page?.published !== false,
  });

  const [saved, setSaved] = useState(false);

  if (!page) {
    return (
      <div className="p-8 text-center bg-white border border-sand-border rounded">
        <h2 className="font-serif text-lg font-medium text-espresso">Page Not Found</h2>
        <Link to="/admin/pages" className="text-xs text-champagne-dark underline mt-2 inline-block">
          Return to Pages
        </Link>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updatePage(page.slug, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-border/80">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages"
            className="p-2 border border-sand-border hover:bg-sand/30 rounded-[2px] text-espresso/70 hover:text-espresso transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-medium text-espresso">
              Edit: {page.title}
            </h1>
            <p className="font-sans text-xs text-espresso/60 font-mono">
              Public Route: /{page.slug}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <a
            href={`/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none justify-center px-3 py-2 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Storefront View</span>
          </a>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle space-y-6 max-w-4xl">
        <div className="flex items-center justify-between p-3 bg-ivory/50 border border-sand-border rounded">
          <div>
            <p className="text-xs font-semibold text-espresso">Publication Status</p>
            <p className="text-[11px] text-espresso/60">
              Published pages are publicly indexed; drafts are viewable only in admin preview.
            </p>
          </div>
          <select
            value={formData.published ? 'published' : 'draft'}
            onChange={(e) => setFormData({ ...formData, published: e.target.value === 'published' })}
            className="px-3 py-1 bg-white border border-sand-border rounded text-xs font-semibold outline-none"
          >
            <option value="published">Published Live</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <FormField label="Page Headline Title" required>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none focus:ring-2 focus:ring-champagne"
          />
        </FormField>

        <FormField label="Page Body Content" helperText="Formatted with RichTextEditor">
          <RichTextEditor
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            minHeight="280px"
          />
        </FormField>

        <div className="pt-4 border-t border-sand-border/70 space-y-4">
          <h3 className="font-serif text-sm font-medium text-espresso flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Search Engine Optimization (SEO)</span>
          </h3>

          <FormField label="Meta Title Tag">
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
            />
          </FormField>

          <FormField label="Meta Description">
            <textarea
              rows={2}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
            />
          </FormField>
        </div>
      </form>
    </div>
  );
};
