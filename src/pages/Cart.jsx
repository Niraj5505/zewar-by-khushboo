import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, Check, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import { formatPaise } from '../lib/formatINR';
import { BRAND } from '../lib/brand';
import { DiwaliCouponCard } from '../components/festive/commerce/DiwaliCouponCard';
import { GiftWrapBadge } from '../components/festive/commerce/GiftWrapBadge';

export const Cart = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  
  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    getSubtotalPaise,
    getDiscountPaise,
    getShippingPaise,
    getTotalPaise,
  } = useCartStore();

  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useUIStore();

  const subtotal = getSubtotalPaise();
  const discount = getDiscountPaise();
  const shipping = getShippingPaise();
  const total = getTotalPaise();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      toggleWishlist(item.id);
    }
    removeItem(item.id, item.variant);
    showToast(`Moved ${item.name} to wishlist`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-espresso/40">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-medium text-espresso">Your Cart is Empty</h1>
          <p className="text-sm text-espresso/60 max-w-md mx-auto">
            You haven't added any pieces to your cart yet. Explore our handcrafted collection to find your next heirloom piece.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 text-champagne" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-sand-border">
        <div>
          <span className="eyebrow text-champagne-dark">Shopping Bag</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso mt-0.5">
            Your Cart
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Cart Items Table (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-brandWhite border border-sand-border rounded-[3px] overflow-hidden">
            {/* Table Header (Desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-sand/30 border-b border-sand-border text-xs uppercase tracking-wider font-semibold text-espresso/70">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-sand-border/70">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Info (6 cols) */}
                  <div className="col-span-6 flex gap-4 items-center">
                    <div className="w-16 sm:w-20 aspect-[4/5] bg-sand rounded-[2px] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-sm sm:text-base font-medium text-espresso hover:text-champagne-dark">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-espresso/60 mt-0.5">{item.variant}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 sm:hidden">
                        <span className="text-xs font-semibold text-espresso">
                          {formatPaise(item.pricePaise)}
                        </span>
                      </div>
                      
                      {/* Action Links */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => handleMoveToWishlist(item)}
                          className="inline-flex items-center gap-1 text-[11px] text-espresso/60 hover:text-rose-600 font-medium transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Move to Wishlist</span>
                        </button>
                        <span className="text-sand-border">•</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.variant)}
                          className="inline-flex items-center gap-1 text-[11px] text-espresso/60 hover:text-rose-600 font-medium transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Unit Price (2 cols) */}
                  <div className="col-span-2 hidden sm:block text-center font-sans text-xs sm:text-sm font-semibold text-espresso">
                    {formatPaise(item.pricePaise)}
                  </div>

                  {/* Qty Selector (2 cols) */}
                  <div className="col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-sand-border rounded-[2px] bg-ivory">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="px-2.5 py-1 text-xs text-espresso/70 hover:text-espresso font-semibold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-espresso text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="px-2.5 py-1 text-xs text-espresso/70 hover:text-espresso font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total (2 cols) */}
                  <div className="col-span-2 text-right font-sans text-xs sm:text-sm font-bold text-espresso">
                    {formatPaise(item.pricePaise * item.quantity)}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Festive Offer Card */}
          <DiwaliCouponCard
            code="DIWALI10"
            description="Special Diwali blessing: 10% complimentary festive celebration savings."
            onApply={(code) => {
              const res = applyCoupon(code);
              if (res.success) {
                showToast(res.message, 'success');
              }
            }}
            isApplied={appliedCoupon === 'DIWALI10'}
          />

          <div className="flex justify-start">
            <GiftWrapBadge />
          </div>

          {/* Coupon Entry Box */}
          <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-espresso">
                <Tag className="w-3.5 h-3.5 text-champagne" />
                <span>Apply Coupon</span>
              </div>
              <p className="text-xs text-espresso/60">
                Use code <strong className="text-espresso font-mono">DIWALI10</strong> or <strong className="text-espresso font-mono">ZEWAR10</strong> for 10% off.
              </p>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-[2px] text-xs font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{appliedCoupon} ({couponDiscountPercent}% OFF Applied)</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="ml-2 text-espresso/50 hover:text-rose-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="px-3.5 py-2 text-xs bg-ivory border border-sand-border rounded-[2px] uppercase text-espresso focus:outline-none focus:border-champagne"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right: Cart Totals Box (4 cols) */}
        <div className="lg:col-span-4 bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-5">
          <h2 className="font-serif text-lg font-bold text-espresso border-b border-sand-border pb-3">
            Cart Totals
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-espresso/80">
              <span>Subtotal</span>
              <span className="font-semibold text-espresso">{formatPaise(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon Discount ({appliedCoupon})</span>
                <span>-{formatPaise(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-espresso/80">
              <div>
                <span>Shipping</span>
                <p className="text-[11px] text-espresso/50">
                  {shipping === 0 ? 'Free Shipping on orders above ₹999' : 'Standard Shipping'}
                </p>
              </div>
              <span className="font-semibold text-espresso">
                {shipping === 0 ? <span className="text-emerald-700">₹0</span> : formatPaise(shipping)}
              </span>
            </div>

            <div className="border-t border-sand-border pt-3 flex justify-between items-baseline font-serif">
              <span className="text-base font-bold text-espresso">Total</span>
              <span className="text-xl font-bold text-espresso">{formatPaise(total)}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-widest font-bold rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/shop"
              className="w-full py-2.5 text-center text-xs text-espresso/70 hover:text-espresso block font-medium"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="pt-4 border-t border-sand-border/60 text-[11px] text-espresso/60 space-y-2">
            <p className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>Authentic handcrafted luxury packaging included</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pan-India secure delivery within 4-7 business days</span>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
