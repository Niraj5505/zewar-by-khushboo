import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import { ProductCard } from '../../product/ProductCard';
import { DiwaliDivider } from './DiwaliDivider';
import { PRODUCTS } from '../../../data/products';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliGifting = () => {
  const { isActive, giftingProductIds } = useFestiveMode();

  if (!isActive) return null;

  // Filter products based on admin selection or default curated heirloom list
  const curatedProducts = PRODUCTS.filter((p) =>
    giftingProductIds.includes(p.id)
  ).slice(0, 4);

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <DiwaliDivider />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="eyebrow text-champagne-dark flex items-center gap-1.5 mb-1">
            <Gift className="w-3.5 h-3.5 text-champagne" />
            <span>Seasonal Gifting</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-espresso tracking-tight">
            Thoughtful Gifts, Wrapped in Gold
          </h2>
          <p className="font-sans text-xs sm:text-sm text-espresso/65 mt-1 max-w-md">
            Each festive gift is encased in our velvet keepsake box with handwritten greetings and auspicious wax seal.
          </p>
        </div>

        <Link
          to="/shop"
          className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-espresso hover:text-champagne-dark transition-colors self-start sm:self-auto"
        >
          <span>Explore All Gifts</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {curatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
