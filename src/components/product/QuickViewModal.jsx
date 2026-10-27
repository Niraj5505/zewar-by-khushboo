import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { formatPaise } from '../../lib/formatINR';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, showToast, openCart } = useUIStore();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to cart`);
    closeQuickView();
    openCart();
  };

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={closeQuickView}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-sand rounded-[2px] overflow-hidden">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-16 rounded-[2px] overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-champagne' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="eyebrow text-champagne-dark">{product.categoryName}</span>
            <h2 className="font-serif text-xl sm:text-2xl text-espresso mt-1 font-medium">
              {product.name}
            </h2>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-champagne">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                ))}
              </div>
              <span className="text-xs text-espresso/60 font-sans">
                ({product.reviewCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="font-serif text-2xl font-bold text-espresso">
                {formatPaise(product.pricePaise)}
              </span>
              {product.compareAtPricePaise && (
                <span className="text-sm text-espresso/45 line-through font-sans">
                  {formatPaise(product.compareAtPricePaise)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-espresso/75 mt-3 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.features?.map((f, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-ivory border border-sand-border text-espresso text-[10px] tracking-wider uppercase rounded-[2px]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-sand-border/80 space-y-3">
            {/* Qty selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-espresso/80 font-medium">Qty:</span>
              <div className="flex items-center border border-sand-border rounded-[2px] bg-brandWhite">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-espresso/60 hover:text-espresso"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-2.5 py-1 text-espresso/60 hover:text-espresso"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded-[2px] transition-colors ${
                  isFav
                    ? 'border-rose-400 bg-rose-50 text-rose-600'
                    : 'border-sand-border hover:border-espresso text-espresso/70'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={closeQuickView}
              className="inline-flex items-center gap-1.5 text-xs text-champagne-dark font-medium hover:underline pt-1"
            >
              <span>View full product details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
