import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatPaise } from '../../lib/formatINR';
import { BRAND } from '../../lib/brand';

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotalPaise,
    getShippingPaise,
    getTotalPaise,
    getItemCount,
  } = useCartStore();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = getSubtotalPaise();
  const freeShippingNeeded = Math.max(0, BRAND.freeShippingThresholdPaise - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / BRAND.freeShippingThresholdPaise) * 100);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-ivory h-full shadow-drawer flex flex-col justify-between z-10 border-l border-sand-border animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sand-border flex items-center justify-between bg-[#F5EFE6]/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-champagne" />
            <h3 className="font-serif text-lg font-semibold text-espresso">
              Your Cart
            </h3>
            <span className="text-xs text-espresso/60 font-sans">
              ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-espresso/60 hover:text-espresso rounded-full hover:bg-sand/40 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#FAF7F0] border-b border-sand-border/80 text-xs">
          {freeShippingNeeded > 0 ? (
            <div>
              <p className="text-espresso/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>
                  Add <strong className="text-espresso">{formatPaise(freeShippingNeeded)}</strong> more to get <strong>Free Pan-India Shipping</strong>!
                </span>
              </p>
              <div className="w-full bg-sand h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-champagne h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-emerald-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>You've unlocked <strong>Free Pan-India Delivery!</strong> 🎉</span>
            </p>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-sand/50 flex items-center justify-center mx-auto text-espresso/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-espresso">Your bag is currently empty</p>
                <p className="text-xs text-espresso/60">Discover our handcrafted heirloom collection.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
              >
                <span>Explore Jewellery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="flex gap-3.5 p-3 bg-brandWhite rounded-[3px] border border-sand-border/80 shadow-sm"
              >
                <div className="w-16 h-20 aspect-[4/5] bg-sand rounded-[2px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="pr-2">
                      <h4 className="font-serif text-sm font-medium text-espresso truncate">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="hover:text-champagne-dark"
                        >
                          {item.name}
                        </Link>
                      </h4>
                      {item.variant && (
                        <span className="text-[11px] text-espresso/60 block">
                          {item.variant}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.variant)}
                      className="text-espresso/40 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand-border/40">
                    {/* Qty controls */}
                    <div className="flex items-center border border-sand-border rounded-[2px] bg-ivory">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="px-2 py-0.5 text-xs text-espresso/70 hover:text-espresso"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-espresso">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="px-2 py-0.5 text-xs text-espresso/70 hover:text-espresso"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-espresso">
                      {formatPaise(item.pricePaise * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-sand-border bg-[#F5EFE6]/70 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-espresso/70">
                <span>Subtotal</span>
                <span>{formatPaise(subtotal)}</span>
              </div>
              <div className="flex justify-between text-espresso/70">
                <span>Estimated Shipping</span>
                <span>
                  {getShippingPaise() === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                  ) : (
                    formatPaise(getShippingPaise())
                  )}
                </span>
              </div>
              <div className="flex justify-between text-espresso font-serif text-base font-bold pt-2 border-t border-sand-border">
                <span>Total</span>
                <span>{formatPaise(getTotalPaise())}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase tracking-widest rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleViewCart}
                className="w-full py-2.5 bg-brandWhite border border-sand-border text-espresso hover:bg-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
              >
                View Bag & Apply Coupon
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
