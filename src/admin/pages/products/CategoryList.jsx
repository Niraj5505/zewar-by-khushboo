import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  AlertTriangle,
  X,
  Save,
} from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { useCmsStore } from '../../lib/cmsStore';

export const CategoryList = () => {
  const categories = useCmsStore((s) => s.categories);
  const products = useCmsStore((s) => s.products);
  const addCategory = useCmsStore((s) => s.addCategory);
  const updateCategory = useCmsStore((s) => s.updateCategory);
  const deleteCategory = useCmsStore((s) => s.deleteCategory);
  const reorderCategories = useCmsStore((s) => s.reorderCategories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(null); // { category, productCount }
  const [reassignCategory, setReassignCategory] = useState('');

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    metaTitle: '',
    metaDescription: '',
  });

  const openCreateModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      image: '/images/pearl-bloom-earrings.jpg',
      metaTitle: '',
      metaDescription: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      image: cat.image || '',
      metaTitle: cat.metaTitle || '',
      metaDescription: cat.metaDescription || '',
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    const payload = {
      ...categoryForm,
      slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory({
        ...payload,
        id: payload.slug,
        sortOrder: categories.length + 1,
      });
    }

    setModalOpen(false);
  };

  const handleDeleteClick = (cat) => {
    const linkedProducts = products.filter((p) => p.category === cat.id || p.category === cat.slug);
    if (linkedProducts.length > 0) {
      setDeleteWarning({ category: cat, productCount: linkedProducts.length });
      const otherCat = categories.find((c) => c.id !== cat.id);
      setReassignCategory(otherCat ? otherCat.id : '');
    } else {
      if (confirm(`Delete category "${cat.name}"?`)) {
        deleteCategory(cat.id);
      }
    }
  };

  const handleConfirmReassignDelete = () => {
    if (deleteWarning) {
      deleteCategory(deleteWarning.category.id, reassignCategory);
      setDeleteWarning(null);
    }
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= categories.length) return;
    const copy = [...categories];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    reorderCategories(copy);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Categories & Collections"
        description="Organize your jewellery catalog into primary collections, header navigation links, and collection pages."
        badge={`${categories.length} Categories`}
      >
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Category</span>
        </button>
      </PageHeader>

      {/* Categories Table */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 w-16">Order</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Products Count</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans whitespace-nowrap">
              {categories.map((cat, index) => {
                const count = products.filter((p) => p.category === cat.id || p.category === cat.slug).length;
                return (
                  <tr key={cat.id || index} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-espresso/50">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMove(index, -1)}
                          className="p-1 hover:bg-sand/40 disabled:opacity-30 rounded text-espresso/60"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={index === categories.length - 1}
                          onClick={() => handleMove(index, 1)}
                          className="p-1 hover:bg-sand/40 disabled:opacity-30 rounded text-espresso/60"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[2px] bg-sand/40 border border-sand-border overflow-hidden flex-shrink-0">
                          <img
                            src={cat.image || '/images/hero-jewellery.jpg'}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-jewellery.jpg';
                            }}
                          />
                        </div>
                        <span className="font-semibold text-espresso">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-espresso/70">
                      /collections/{cat.slug}
                    </td>
                    <td className="px-4 py-3 font-semibold text-espresso">
                      {count} items
                    </td>
                    <td className="px-4 py-3 text-espresso/60 max-w-xs truncate">
                      {cat.description || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 hover:bg-sand/40 text-espresso/70 hover:text-espresso rounded transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(cat)}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-lg p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border">
              <h3 className="font-serif text-lg font-medium text-espresso">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-espresso/40 hover:text-espresso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <FormField label="Category Name" required>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: e.target.value,
                      slug: !editingCategory
                        ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        : categoryForm.slug,
                    })
                  }
                  placeholder="e.g. Chokers & Necklaces"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Slug" required>
                <input
                  type="text"
                  required
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="chokers-necklaces"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] font-mono focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Description">
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Editorial summary of this jewellery collection..."
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Cover Image URL">
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="/images/hero-jewellery.jpg"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-sand-border hover:bg-sand/30 text-xs font-semibold uppercase tracking-wider rounded-[2px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safety Reassignment Modal when products exist */}
      {deleteWarning && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start gap-3 text-amber-700">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-semibold text-espresso">
                  Cannot Delete Active Category Directly
                </h4>
                <p className="text-xs text-espresso/70 leading-relaxed mt-1">
                  <strong>{deleteWarning.category.name}</strong> currently contains <strong>{deleteWarning.productCount}</strong> products. To delete this category without leaving orphaned items, choose a replacement category to reassign them to:
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                Reassign products to:
              </label>
              <select
                value={reassignCategory}
                onChange={(e) => setReassignCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] bg-white outline-none focus:ring-2 focus:ring-champagne"
              >
                {categories
                  .filter((c) => c.id !== deleteWarning.category.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setDeleteWarning(null)}
                className="px-3 py-1.5 border border-sand-border hover:bg-sand/30 text-xs font-semibold uppercase tracking-wider rounded-[2px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReassignDelete}
                className="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm"
              >
                Reassign & Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
