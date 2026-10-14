import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Edit, Globe, Eye, CheckCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';

export const PagesList = () => {
  const navigate = useNavigate();
  const pages = useCmsStore((s) => s.pages);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Content Pages & Policies"
        description="Manage brand story, studio heritage, FAQ questions, shipping and return legal policies."
        badge={`${pages.length} Pages`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <div
            key={page.slug}
            className="bg-white border border-sand-border/80 rounded-[4px] p-5 shadow-subtle hover:border-champagne transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-sand-border/60">
                <span className="font-serif text-base font-medium text-espresso">
                  {page.title}
                </span>
                <StatusBadge status={page.published ? 'published' : 'draft'} />
              </div>

              <p className="font-mono text-xs text-champagne-dark mb-2">
                /{page.slug}
              </p>

              <p className="text-xs text-espresso/60 line-clamp-2 leading-relaxed">
                {page.metaDescription || 'No description set'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-sand-border/60 text-xs">
              <span className="text-[11px] text-espresso/40">
                Updated: {page.updatedAt || 'Recently'}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 border border-sand-border hover:bg-sand/30 rounded text-espresso font-medium flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-champagne-dark" />
                  <span>Preview</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate(`/admin/pages/${page.slug}`)}
                  className="px-3 py-1 bg-champagne hover:bg-champagne-hover text-espresso font-semibold uppercase tracking-wider rounded-[2px] shadow-sm flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit Content</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
