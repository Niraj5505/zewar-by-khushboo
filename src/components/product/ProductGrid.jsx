import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({
  products = [],
  emptyMessage = "No jewellery pieces found.",
  columns = 4, // 3 or 4
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-brandWhite border border-sand-border/60 rounded-[3px] p-8">
        <p className="font-serif text-lg text-espresso/80">{emptyMessage}</p>
        <p className="text-xs text-espresso/60 mt-1">Please try modifying your filter criteria or search terms.</p>
      </div>
    );
  }

  const gridColsClass = columns === 3
    ? "grid-cols-2 md:grid-cols-3"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-3 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
