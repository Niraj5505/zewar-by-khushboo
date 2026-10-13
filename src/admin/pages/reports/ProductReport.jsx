import React from 'react';
import { PieChart, Download, Gem, TrendingUp, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { useCmsStore } from '../../lib/cmsStore';
import { formatINR } from '../../../lib/formatINR';

export const ProductReport = () => {
  const products = useCmsStore((s) => s.products);

  // Top products calculation
  const ranked = [...products].sort((a, b) => (b.stock || 0) - (a.stock || 0));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Product Performance Report"
        description="Top-performing designs, category share, inventory velocity, and conversion engagement."
        badge={`${products.length} Products Tracked`}
      />

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-sand-border/70 flex items-center justify-between">
          <h3 className="font-serif text-base font-medium text-espresso">
            Product Engagement & Velocity
          </h3>
          <span className="text-xs text-espresso/50">Sorted by catalog presence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Retail Price</th>
                <th className="px-4 py-3">Units in Stock</th>
                <th className="px-4 py-3">Margin Rate</th>
                <th className="px-4 py-3 text-right">Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {ranked.map((p) => {
                const margin = p.costPricePaise
                  ? Math.round(((p.pricePaise - p.costPricePaise) / p.pricePaise) * 100)
                  : 60;

                return (
                  <tr key={p.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-espresso">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-espresso/60">{p.sku}</td>
                    <td className="px-4 py-3 capitalize text-espresso/80">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-espresso">
                      {formatINR(p.pricePaise)}
                    </td>
                    <td className="px-4 py-3 text-espresso font-medium">{p.stock} units</td>
                    <td className="px-4 py-3 font-semibold text-emerald-800">{margin}%</td>
                    <td className="px-4 py-3 text-right">
                      {p.isBestSeller && (
                        <span className="px-2 py-0.5 bg-champagne text-espresso text-[10px] font-bold uppercase rounded">
                          Bestseller
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
