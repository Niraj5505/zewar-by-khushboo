import React, { useState } from 'react';
import { Star, Plus, Edit, Trash2, ArrowUp, ArrowDown, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';

export const TestimonialsList = () => {
  const testimonials = useCmsStore((s) => s.testimonials);
  const addTestimonial = useCmsStore((s) => s.addTestimonial);
  const updateTestimonial = useCmsStore((s) => s.updateTestimonial);
  const deleteTestimonial = useCmsStore((s) => s.deleteTestimonial);
  const reorderTestimonials = useCmsStore((s) => s.reorderTestimonials);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    rating: 5,
    text: '',
    productLink: '',
    photo: '',
    featured: true,
    published: true,
  });

  const openCreate = () => {
    setEditingItem(null);
    setFormData({
      customerName: '',
      location: 'Mumbai',
      rating: 5,
      text: '',
      productLink: '/shop',
      photo: '/images/hero-jewellery.jpg',
      featured: true,
      published: true,
    });
    setModalOpen(true);
  };

  const openEdit = (tst) => {
    setEditingItem(tst);
    setFormData({ ...tst });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return;

    if (editingItem) {
      updateTestimonial(editingItem.id, formData);
    } else {
      addTestimonial({ ...formData, order: testimonials.length + 1 });
    }
    setModalOpen(false);
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= testimonials.length) return;
    const copy = [...testimonials];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    reorderTestimonials(copy);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Patron Testimonials"
        description="Curate authentic client testimonials showcased on the public storefront homepage."
        badge={`${testimonials.length} Reviews`}
      >
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Testimonial</span>
        </button>
      </PageHeader>

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3 w-16">Order</th>
                <th className="px-4 py-3">Patron</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Quote Excerpt</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {testimonials.map((t, idx) => (
                <tr key={t.id || idx} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded"
                      >
                        <ArrowUp className="w-3 h-3 text-espresso/60" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === testimonials.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-1 hover:bg-sand/40 disabled:opacity-20 rounded"
                      >
                        <ArrowDown className="w-3 h-3 text-espresso/60" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-espresso block">{t.customerName}</span>
                    <span className="text-[11px] text-espresso/50">{t.location}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-espresso/70 max-w-sm truncate italic">
                    &ldquo;{t.text}&rdquo;
                  </td>
                  <td className="px-4 py-3">
                    {t.featured ? (
                      <span className="text-[10px] bg-champagne/20 text-espresso font-semibold px-2 py-0.5 rounded border border-champagne/40">
                        Featured
                      </span>
                    ) : (
                      <span className="text-espresso/40 text-[11px]">Standard</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.published ? 'published' : 'draft'} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="p-1.5 hover:bg-sand/40 text-espresso/70 rounded"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove testimonial from ${t.customerName}?`))
                            deleteTestimonial(t.id);
                        }}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              {editingItem ? 'Edit Testimonial' : 'New Patron Testimonial'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Customer Name" required>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                  />
                </FormField>
                <FormField label="City / Location">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                  />
                </FormField>
              </div>

              <FormField label="Star Rating (1-5)">
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-sand-border rounded bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </FormField>

              <FormField label="Testimonial Quote" required>
                <textarea
                  rows={3}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full p-2.5 border border-sand-border rounded outline-none leading-relaxed"
                />
              </FormField>

              <FormField label="Product Link URL">
                <input
                  type="text"
                  value={formData.productLink}
                  onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                  placeholder="/product/meena-charm-necklace"
                  className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                />
              </FormField>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-champagne focus:ring-champagne"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-champagne focus:ring-champagne"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 border border-sand-border text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
