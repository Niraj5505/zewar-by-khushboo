import React, { useState, useMemo } from 'react';
import {
  Boxes,
  AlertTriangle,
  Check,
  Edit2,
  Upload,
  Download,
  Search,
} from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';

export const InventoryList = () => {
  const products = useCmsStore((s) => s.products);
  const updateProductStock = useCmsStore((s) => s.updateProductStock);

  const [filter, setFilter] = useState('all'); // all, low_stock, out_of_stock
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState('');
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkAdjustment, setBulkAdjustment] = useState(10);

  // Flatten product variants for the inventory table
  const inventoryRows = useMemo(() => {
    const list = [];
    products.forEach((p) => {
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          list.push({
            id: p.id,
            uniqueKey: `${p.id}-${v.id}`,
            productName: p.name,
            variantName: v.name,
            sku: v.sku || p.sku,
            stock: v.stock !== undefined ? v.stock : p.stock,
            threshold: p.lowStockThreshold || 5,
            image: v.image || p.images?.[0] || '/images/hero-jewellery.jpg',
          });
        });
      } else {
        list.push({
          id: p.id,
          uniqueKey: p.id,
          productName: p.name,
          variantName: 'Standard',
          sku: p.sku,
          stock: p.stock,
          threshold: p.lowStockThreshold || 5,
          image: p.images?.[0] || '/images/hero-jewellery.jpg',
        });
      }
    });

    return list.filter((item) => {
      if (filter === 'low_stock' && (item.stock > item.threshold || item.stock <= 0)) return false;
      if (filter === 'out_of_stock' && item.stock > 0) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.productName.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.variantName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, filter, search]);

  const startEdit = (row) => {
    setEditingId(row.uniqueKey);
    setTempStock(String(row.stock));
  };

  const saveEdit = (row) => {
    const newStock = Number(tempStock);
    if (!isNaN(newStock) && newStock >= 0) {
      updateProductStock(row.id, newStock);
    }
    setEditingId(null);
  };

  const handleBulkAdd = () => {
    products.forEach((p) => {
      if (p.stock <= (p.lowStockThreshold || 5)) {
        updateProductStock(p.id, p.stock + Number(bulkAdjustment));
      }
    });
    setBulkModalOpen(false);
  };

  const lowCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 5) && p.stock > 0).length;
  const outCount = products.filter((p) => p.stock <= 0).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Inventory & Stock Control"
        description="Monitor physical stock levels across all designs and finishes. Edit quantities inline with single click."
        badge={`${inventoryRows.length} Variants`}
      >
        <button
          type="button"
          onClick={() => setBulkModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Restock All Low Items</span>
        </button>
      </PageHeader>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-sand-border/80 rounded-[4px] shadow-subtle">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product, variant or SKU..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-ivory/50 border border-sand-border rounded-[2px] outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-[2px] font-medium transition-colors ${
              filter === 'all'
                ? 'bg-espresso text-ivory font-semibold'
                : 'border border-sand-border hover:bg-sand/30 text-espresso'
            }`}
          >
            All Stock
          </button>
          <button
            type="button"
            onClick={() => setFilter('low_stock')}
            className={`px-3 py-1.5 rounded-[2px] font-medium transition-colors flex items-center gap-1.5 ${
              filter === 'low_stock'
                ? 'bg-amber-800 text-white font-semibold'
                : 'border border-sand-border hover:bg-amber-50 text-amber-900'
            }`}
          >
            <span>Low Stock</span>
            {lowCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full text-[10px]">
                {lowCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilter('out_of_stock')}
            className={`px-3 py-1.5 rounded-[2px] font-medium transition-colors flex items-center gap-1.5 ${
              filter === 'out_of_stock'
                ? 'bg-rose-800 text-white font-semibold'
                : 'border border-sand-border hover:bg-rose-50 text-rose-900'
            }`}
          >
            <span>Out of Stock</span>
            {outCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-100 text-rose-900 rounded-full text-[10px]">
                {outCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Product & Variant</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Available Quantity</th>
                <th className="px-4 py-3">Low Threshold</th>
                <th className="px-4 py-3">Inventory Status</th>
                <th className="px-4 py-3 text-right">Quick Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {inventoryRows.map((row) => {
                const isEditing = editingId === row.uniqueKey;
                const isLow = row.stock <= row.threshold && row.stock > 0;
                const isOut = row.stock <= 0;

                return (
                  <tr key={row.uniqueKey} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-11 rounded-[2px] bg-sand/40 border border-sand-border overflow-hidden flex-shrink-0">
                          <img
                            src={row.image}
                            alt={row.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-jewellery.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-espresso">{row.productName}</p>
                          <p className="text-[11px] text-espresso/50">{row.variantName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-espresso/70">
                      {row.sku}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={tempStock}
                            onChange={(e) => setTempStock(e.target.value)}
                            className="w-20 px-2 py-1 border border-sand-border rounded text-xs font-semibold focus:ring-1 focus:ring-champagne outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit(row);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => saveEdit(row)}
                            className="p-1 bg-champagne text-espresso rounded hover:bg-champagne-hover"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => startEdit(row)}
                          className="inline-flex items-center gap-2 cursor-pointer group py-1 px-2 rounded hover:bg-sand/30"
                          title="Click to edit stock quantity"
                        >
                          <span
                            className={`font-semibold text-sm ${
                              isOut
                                ? 'text-rose-700'
                                : isLow
                                ? 'text-amber-700'
                                : 'text-espresso'
                            }`}
                          >
                            {row.stock}
                          </span>
                          <Edit2 className="w-3 h-3 text-espresso/30 group-hover:text-espresso" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-espresso/60 font-mono">
                      {row.threshold} units
                    </td>
                    <td className="px-4 py-3">
                      {isOut ? (
                        <StatusBadge status="out_of_stock" label="Out of Stock" />
                      ) : isLow ? (
                        <StatusBadge status="low_stock" label="Low Stock" />
                      ) : (
                        <StatusBadge status="in_stock" label="Adequate Stock" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          const addQty = prompt(`Add restock units to "${row.productName}":`, '10');
                          if (addQty && !isNaN(addQty)) {
                            updateProductStock(row.id, row.stock + Number(addQty));
                          }
                        }}
                        className="px-2.5 py-1 bg-ivory border border-sand-border hover:bg-sand/40 text-espresso text-[11px] font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Restock Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              Batch Restock Low Items
            </h3>
            <p className="text-xs text-espresso/70 leading-relaxed">
              Add a uniform quantity to all products currently at or below their low-stock threshold.
            </p>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1">
                Units to add to each low item:
              </label>
              <input
                type="number"
                min="1"
                value={bulkAdjustment}
                onChange={(e) => setBulkAdjustment(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none font-semibold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                className="px-4 py-1.5 border border-sand-border hover:bg-sand/30 text-xs font-semibold uppercase tracking-wider rounded-[2px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkAdd}
                className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
