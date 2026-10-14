import React, { useState } from 'react';
import { Camera, Plus, Trash2, ExternalLink, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const InstagramFeed = () => {
  const instagram = useCmsStore((s) => s.instagram);
  const updateInstagramFeed = useCmsStore((s) => s.updateInstagramFeed);

  const [feed, setFeed] = useState(instagram);
  const [feedMode, setFeedMode] = useState('manual'); // 'manual' or 'api'
  const [saved, setSaved] = useState(false);

  const handleAddPost = () => {
    const newPost = {
      id: `ig-${Date.now()}`,
      imageUrl: '/images/hero-jewellery.jpg',
      caption: 'New bridal Kundan design. #ZewarByKhushboo',
      postUrl: 'https://www.instagram.com/zewar_by_khushboo/',
      active: true,
      order: feed.length + 1,
    };
    const updated = [...feed, newPost];
    setFeed(updated);
    updateInstagramFeed(updated);
  };

  const handleRemove = (id) => {
    const updated = feed.filter((p) => p.id !== id);
    setFeed(updated);
    updateInstagramFeed(updated);
  };

  const handleChange = (id, field, val) => {
    const updated = feed.map((p) => (p.id === id ? { ...p, [field]: val } : p));
    setFeed(updated);
  };

  const handleSave = () => {
    updateInstagramFeed(feed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Instagram Feed Showcase"
        description="Curate live social photographs linked to @zewar_by_khushboo for the storefront carousel."
        badge={`${feed.length} Posts`}
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAddPost}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-3.5 py-2 border border-sand-border hover:bg-sand/30 text-espresso font-semibold text-xs rounded"
          >
            <Plus className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Add Post</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] shadow-sm"
          >
            {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Feed</span>
          </button>
        </div>
      </PageHeader>

      {/* Feed Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white border border-sand-border/80 rounded-[4px] shadow-subtle text-xs">
        <span className="font-semibold text-espresso">Feed Synchronization:</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFeedMode('manual')}
            className={`px-3 py-1 rounded-[2px] font-medium ${
              feedMode === 'manual'
                ? 'bg-espresso text-ivory font-semibold'
                : 'border border-sand-border hover:bg-sand/30 text-espresso'
            }`}
          >
            Manual Curation (Fast & Reliable)
          </button>
          <button
            type="button"
            onClick={() => setFeedMode('api')}
            className={`px-3 py-1 rounded-[2px] font-medium flex items-center gap-1 ${
              feedMode === 'api'
                ? 'bg-espresso text-ivory font-semibold'
                : 'border border-sand-border hover:bg-sand/30 text-espresso'
            }`}
          >
            <span>Instagram Graph API</span>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">Needs Token</span>
          </button>
        </div>
      </div>

      {feedMode === 'api' && (
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-[4px] text-xs text-amber-900 space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Meta Graph API Access Token Required</span>
          </p>
          <p className="text-amber-800 leading-relaxed">
            Configure your Facebook Developer Instagram Basic Display Token in Settings → Store to enable automatic synchronization. In the meantime, use Manual Mode below.
          </p>
        </div>
      )}

      {/* Grid of Instagram posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {feed.map((post, idx) => (
          <div
            key={post.id || idx}
            className="bg-white border border-sand-border rounded-[4px] overflow-hidden shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square bg-sand/30 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt="Instagram preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-jewellery.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(post.id)}
                  className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-rose-50 text-rose-600 rounded shadow-sm"
                  title="Remove post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 space-y-2 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-espresso/50 block">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={post.imageUrl}
                    onChange={(e) => handleChange(post.id, 'imageUrl', e.target.value)}
                    className="w-full px-2 py-1 border border-sand-border rounded text-[11px] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-espresso/50 block">
                    Post Caption
                  </label>
                  <textarea
                    rows={2}
                    value={post.caption}
                    onChange={(e) => handleChange(post.id, 'caption', e.target.value)}
                    className="w-full px-2 py-1 border border-sand-border rounded text-xs leading-normal"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-espresso/50 block">
                    Instagram Post Link
                  </label>
                  <input
                    type="text"
                    value={post.postUrl}
                    onChange={(e) => handleChange(post.id, 'postUrl', e.target.value)}
                    className="w-full px-2 py-1 border border-sand-border rounded text-[11px] font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-sand-border/60 bg-ivory/30 flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={post.active}
                  onChange={(e) => handleChange(post.id, 'active', e.target.checked)}
                  className="rounded text-champagne focus:ring-champagne"
                />
                <span className="text-[11px] font-medium text-espresso">Active</span>
              </label>

              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso/50 hover:text-espresso"
                title="Open post"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
