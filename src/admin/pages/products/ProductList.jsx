import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Filter, Gem } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const ProductList = () => {
  const navigate = useNavigate();
  const products = useCmsStore((s) => s.products);
  const categories = useCmsStore((s) => s.categories);
  const deleteProduct = useCmsStore((s) => s.deleteProduct);
  const updateProduct = useCmsStore((s) => s.updateProduct);
  const bulkUpdateProductStatus = useCmsStore((s) => s.bulkUpdateProductStatus);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [productToDelete, setProductToDelete] = useState(null);

  // Filtered dataset
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (stockFilter === 'low_stock' && (p.stock > (p.lowStockThreshold || 5) || p.stock === 0)) return false;
      if (stockFilter === 'out_of_stock' && p.stock > 0) return false;
      if (stockFilter === 'in_stock' && p.stock <= 0) return false;
      return true;
    });
  }, [products, categoryFilter, statusFilter, stockFilter]);

  const handleToggleStatus = (p, e) => {
    e.stopPropagation();
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    updateProduct(p.id, { status: newStatus });
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const columns = [
    {
      key: 'image',
      header: 'Product',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 rounded-[2px] bg-sand/40 border border-sand-border overflow-hidden flex-shrink-0">
            <img
              src={row.images?.[0] || '/images/hero-jewellery.jpg'}
              alt={row.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/hero-jewellery.jpg';
              }}
            />
          </div>
          <div className="min-w-0">
            <span className="font-medium text-espresso block truncate hover:text-champagne-dark">
              {row.name}
            </span>
            <span className="text-[11px] text-espresso/50 block font-mono">
              SKU: {row.sku}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (cat) => {
        const found = categories.find((c) => c.id === cat || c.slug === cat);
        return (
          <span className="capitalize text-espresso/80 font-medium">
            {found ? found.name : cat}
          </span>
        );
      },
    },
    {
      key: 'pricePaise',
      header: 'Price',
      render: (pricePaise) => (
        <span className="font-semibold text-espresso">
          {formatINR(pricePaise)}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (stock, row) => {
        const isLow = stock <= (row.lowStockThreshold || 5);
        const isOut = stock <= 0;
        return (
          <div className="flex items-center gap-1.5">
            <span
              className={`font-semibold ${
                isOut
                  ? 'text-rose-700'
                  : isLow
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }`}
            >
              {stock} units
            </span>
            {isLow && !isOut && (
              <span className="text-[10px] bg-amber-50 text-amber-800 px-1 py-0.5 rounded border border-amber-200">
                Low
              </span>
            )}
            {isOut && (
              <span className="text-[10px] bg-rose-50 text-rose-800 px-1 py-0.5 rounded border border-rose-200">
                Out
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (status) => <StatusBadge status={status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      className: 'text-right whitespace-nowrap',
      render: (_, row) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => handleToggleStatus(row, e)}
            title={row.status === 'published' ? 'Unpublish to Draft' : 'Publish live'}
            className="p-1.5 hover:bg-sand/40 text-espresso/60 hover:text-espresso rounded transition-colors"
          >
            {row.status === 'published' ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-champagne-dark" />
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/products/${row.id}/edit`)}
            title="Edit product"
            className="p-1.5 hover:bg-sand/40 text-espresso/60 hover:text-espresso rounded transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setProductToDelete(row)}
            title="Delete product"
            className="p-1.5 hover:bg-rose-50 text-rose-600 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const bulkActions = [
    {
      label: 'Publish Selected',
      onClick: (ids) => bulkUpdateProductStatus(ids, 'published'),
    },
    {
      label: 'Set as Draft',
      onClick: (ids) => bulkUpdateProductStatus(ids, 'draft'),
    },
    {
      label: 'Delete Selected',
      variant: 'danger',
      onClick: (ids) => {
        if (confirm(`Are you sure you want to delete ${ids.length} products?`)) {
          ids.forEach((id) => deleteProduct(id));
        }
      },
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Products Catalog"
        description="Curate and manage handcrafted luxury items, inventory counts, pricing, and visibility."
        badge={`${products.length} Items`}
      >
        <button
          type="button"
          onClick={() => navigate('/admin/products/new')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </PageHeader>

      {/* Filter Component for DataTable */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none flex-1 sm:flex-none min-w-[120px]"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none flex-1 sm:flex-none min-w-[110px]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none flex-1 sm:flex-none min-w-[120px]"
        >
          <option value="all">All Stock Levels</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock (≤ 5)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        searchKey="name"
        searchPlaceholder="Search product by name, SKU..."
        bulkActions={bulkActions}
        onRowClick={(row) => navigate(`/admin/products/${row.id}/edit`)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        title={`Delete "${productToDelete?.name}"?`}
        description="This will remove the product permanently from both the admin inventory and the customer storefront."
        confirmLabel="Delete Product"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
