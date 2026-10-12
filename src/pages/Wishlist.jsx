import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { PRODUCTS } from '../data/products';
import { formatPaise } from '../lib/formatINR';

export const Wishlist = () => {
  const { items: wishlistIds, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast, openCart } = useUIStore();

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
    showToast(`Moved ${product.name} to cart`);
    openCart();
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-espresso/40">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-medium text-espresso">Your Wishlist is Empty</h1>
          <p className="text-sm text-espresso/60 max-w-md mx-auto">
            Save pieces you love by clicking the heart icon on any product card or detail page.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            <span>Discover Jewellery</span>
            <ArrowRight className="w-4 h-4 text-champagne" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-sand-border">
        <div>
          <span className="eyebrow text-champagne-dark">Saved Pieces</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso mt-0.5">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-espresso hover:text-champagne-dark transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-brandWhite border border-sand-border rounded-[3px] overflow-hidden hover:shadow-hover transition-all"
          >
            <div className="relative aspect-[4/5] bg-sand overflow-hidden">
              <Link to={`/product/${product.slug}`} className="block w-full h-full">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2.5 right-2.5 p-1.5 bg-brandWhite/90 rounded-full text-rose-600 hover:bg-brandWhite transition-colors shadow-sm"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="eyebrow text-champagne-dark">{product.categoryName}</span>
                <h3 className="font-serif text-base font-medium text-espresso line-clamp-1 mt-0.5">
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="font-sans text-sm font-semibold text-espresso mt-1">
                  {formatPaise(product.pricePaise)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleMoveToCart(product)}
                className="w-full py-2.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
