import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { formatPaise } from '../../lib/formatINR';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { usePopupStore } from '../../store/popupStore';
import { toast } from '../../store/toastStore';

export const QuickViewModal = ({ isOpen, onClose, product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard');

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { openPopup } = usePopupStore();

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    onClose();
    toast.success(`Added ${quantity} × ${product.name} to cart`, {
      product,
      action: { label: 'View Bag', href: '/cart' },
    });

    // Per spec: Closes on add-to-cart; opens cart drawer after 400ms
    setTimeout(() => {
      openPopup('cart');
    }, 400);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      showClose={true}
      className="p-0 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
        
        {/* Left: Gallery (6 cols) */}
        <div className="md:col-span-6 p-5 sm:p-6 bg-sand/20 border-b md:border-b-0 md:border-r border-espresso/10 flex flex-col justify-between">
          <div className="aspect-[4/5] bg-sand rounded-[2px] overflow-hidden shadow-sm">
            <img
              src={product.images?.[selectedImage] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2.5 pt-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 sm:w-16 aspect-[4/5] rounded-[2px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx ? 'border-champagne shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions (6 cols) */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <span className="eyebrow text-champagne-dark">{product.categoryName || 'Jewellery'}</span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-espresso leading-snug">
              {product.name}
            </h2>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-champagne">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                ))}
              </div>
              <span className="text-xs text-espresso/60">
                ({product.reviewCount || 24} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="font-serif text-2xl font-bold text-espresso">
                {formatPaise(product.pricePaise)}
              </span>
              {product.compareAtPricePaise && (
                <span className="text-sm text-espresso/45 line-through">
                  {formatPaise(product.compareAtPricePaise)}
                </span>
              )}
            </div>

            <p className="text-xs text-espresso/75 leading-relaxed pt-1">
              {product.shortDescription}
            </p>

            {/* Variant picker if bracelets/rings */}
            {product.category === 'bracelets' && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-espresso/70 block">
                  Select Size
                </span>
                <div className="flex gap-2">
                  {['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedVariant(size)}
                      className={`px-3 py-1.5 text-xs rounded-[2px] border transition-all ${
                        selectedVariant === size
                          ? 'border-champagne bg-champagne/10 font-semibold text-espresso'
                          : 'border-espresso/20 text-espresso/70 hover:border-espresso'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-3 border-t border-espresso/10">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-espresso/70">Qty</span>
              <div className="flex items-center border border-espresso/20 rounded-[2px] bg-brandWhite">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-espresso/70 hover:text-espresso font-semibold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-espresso">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="px-2.5 py-1 text-espresso/70 hover:text-espresso font-semibold"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium">In Stock</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase tracking-widest rounded-[2px] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#30251F]" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded-[2px] transition-colors ${
                  isFav
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-espresso/20 hover:border-espresso text-espresso/70'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <div className="pt-1">
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-champagne-dark hover:text-espresso font-semibold transition-colors"
              >
                <span>View full product details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};
