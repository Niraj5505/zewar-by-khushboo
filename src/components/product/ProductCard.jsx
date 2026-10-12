import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { formatPaise, calculateDiscount } from '../../lib/formatINR';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { usePopupStore } from '../../store/popupStore';
import { toast } from '../../store/toastStore';
import { cn } from '../../lib/cn';

export const ProductCard = ({ product, priority = false }) => {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const openPopup = usePopupStore((state) => state.openPopup);

  const isFav = isInWishlist(product.id);
  const discount = calculateDiscount(product.compareAtPricePaise, product.pricePaise);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to bag`, {
      product,
      action: { label: 'View Bag', href: '/cart' },
    });
    openPopup('cart');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isFav) {
      toast.success(`Added ${product.name} to wishlist`);
    } else {
      toast.info(`Removed from wishlist`);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPopup('quickview', { product });
  };

  return (
    <div className="group relative flex flex-col bg-brandWhite border border-sand-border/70 rounded-[3px] overflow-hidden transition-all duration-300 hover:shadow-hover hover:border-champagne/40">
      
      {/* 4:5 Portrait Image Container */}
      <div className="relative aspect-[4/5] bg-sand overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-espresso text-ivory text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-[2px] shadow-sm">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#8C2D19] text-ivory text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-[2px] shadow-sm">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm",
            isFav
              ? "bg-brandWhite text-rose-600 scale-105"
              : "bg-brandWhite/90 text-espresso/70 hover:text-rose-600 hover:bg-brandWhite"
          )}
        >
          <Heart className={cn("w-4 h-4", isFav && "fill-rose-600 text-rose-600")} />
        </button>

        {/* Hover Quick-View Action Overlay (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full py-2 bg-brandWhite/95 backdrop-blur-sm text-espresso text-[11px] font-semibold uppercase tracking-wider rounded-[2px] hover:bg-brandWhite shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-brandWhite">
        <div>
          {/* Eyebrow / Category */}
          <span className="text-[10px] tracking-eyebrow uppercase font-medium text-espresso/60 block mb-1">
            {product.categoryName}
          </span>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-medium text-espresso line-clamp-1 group-hover:text-champagne-dark transition-colors">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-sans text-sm sm:text-base font-semibold text-espresso">
              {formatPaise(product.pricePaise)}
            </span>
            {product.compareAtPricePaise && product.compareAtPricePaise > product.pricePaise && (
              <span className="font-sans text-xs text-espresso/45 line-through">
                {formatPaise(product.compareAtPricePaise)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3.5 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2.5 px-3 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#30251F]" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
};
