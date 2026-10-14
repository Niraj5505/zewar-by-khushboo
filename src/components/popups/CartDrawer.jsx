import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Sheet } from '../ui/Sheet';
import { useCartStore } from '../../store/cartStore';
import { formatPaise } from '../../lib/formatINR';
import { BRAND } from '../../lib/brand';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { GiftWrapBadge } from '../festive/commerce/GiftWrapBadge';

export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotalPaise,
    getShippingPaise,
    getTotalPaise,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotalPaise();
  const freeShippingNeeded = Math.max(0, BRAND.freeShippingThresholdPaise - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / BRAND.freeShippingThresholdPaise) * 100);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Sheet
      open={isOpen}
      onClose={onClose}
      side={isMobile ? 'bottom' : 'right'}
      title="Shopping Bag"
      description={`${getItemCount()} ${getItemCount() === 1 ? 'item' : 'items'} in your cart`}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        
        {/* Free Shipping Meter */}
        <div className="p-3 bg-sand/30 border border-espresso/10 rounded-[2px] text-xs">
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
            <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>You've unlocked <strong>Free Pan-India Delivery!</strong> 🎉</span>
            </p>
          )}
        </div>

        {/* Complimentary Festive Gift Wrapping Indicator */}
        <div className="flex justify-start">
          <GiftWrapBadge />
        </div>

        {/* Line Items List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-espresso/40">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-serif text-base text-espresso">Your bag is currently empty</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="px-5 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
              >
                Explore Jewellery
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="flex gap-3.5 p-3 bg-brandWhite rounded-[2px] border border-espresso/10 shadow-sm"
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
                      <h4 className="font-serif text-xs font-semibold text-espresso truncate">
                        <Link to={`/product/${item.slug}`} onClick={onClose} className="hover:text-champagne-dark">
                          {item.name}
                        </Link>
                      </h4>
                      {item.variant && (
                        <span className="text-[10px] text-espresso/60 block">{item.variant}</span>
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

                  <div className="flex items-center justify-between pt-2 border-t border-espresso/5">
                    <div className="flex items-center border border-espresso/15 rounded-[2px] bg-ivory">
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

                    <span className="text-xs font-bold text-espresso">
                      {formatPaise(item.pricePaise * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Actions */}
        {items.length > 0 && (
          <div className="pt-3 border-t border-espresso/15 space-y-3">
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-espresso">
              <span>Subtotal</span>
              <span>{formatPaise(subtotal)}</span>
            </div>

            <div className="space-y-2">
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
                className="w-full py-2.5 bg-brandWhite border border-espresso/20 text-espresso hover:bg-sand/30 text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
              >
                View Full Bag & Apply Coupon
              </button>
            </div>
          </div>
        )}

      </div>
    </Sheet>
  );
};
