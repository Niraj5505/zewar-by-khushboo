import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  CreditCard,
  ShoppingBag,
  Sparkles,
  MapPin,
  User,
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { formatPaise } from '../lib/formatINR';
import { BRAND } from '../lib/brand';
import { triggerFestiveConfetti } from '../components/festive/overlays/DiwaliConfettiBurst';
import { DiyaIcon } from '../components/festive/DiyaIcon';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    items,
    appliedCoupon,
    couponDiscountPercent,
    getSubtotalPaise,
    getDiscountPaise,
    getShippingPaise,
    getTotalPaise,
    clearCart,
  } = useCartStore();

  const { showToast } = useUIStore();
  const { user } = useAuthStore();

  const [step, setStep] = useState(1); // 1: Info & Address, 2: Delivery & Review, 3: Payment, 4: Confirmed
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '9876543210',
    flatNo: 'Flat 402, Royal Palms',
    street: 'Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    deliveryNotes: '',
    paymentMethod: 'razorpay', // 'razorpay' | 'cod' | 'upi'
  });

  const [errors, setErrors] = useState({});

  const subtotal = getSubtotalPaise();
  const discount = getDiscountPaise();
  const shipping = getShippingPaise();
  const total = getTotalPaise();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = '10-digit mobile number is required';
    }
    if (!formData.flatNo.trim()) newErrors.flatNo = 'Flat/Building is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.replace(/\D/g, '').length !== 6) {
      newErrors.pincode = 'Valid 6-digit PIN code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showToast('Please fill in all required shipping fields', 'error');
      }
    } else if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    // Simulate Razorpay gateway flow & signature verification
    setTimeout(() => {
      const generatedId = `ZBK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep(4);
      clearCart();
      triggerFestiveConfetti();
      showToast(`Order confirmed successfully! Order #${generatedId}`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="eyebrow text-champagne-dark">Order Confirmed</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
            Thank you, {formData.fullName}!
          </h1>
          <p className="text-sm text-espresso/70">
            Order Reference: <strong className="text-espresso font-mono">{orderId}</strong>
          </p>
        </div>

        <div className="p-3.5 bg-sand/40 border border-champagne/40 rounded-[3px] text-xs text-espresso/80 flex items-center justify-center gap-2">
          <DiyaIcon className="w-4 h-4 text-champagne-dark flex-shrink-0" />
          <span>Your heirlooms will be enclosed in complimentary Diwali gift packaging with handwritten greetings.</span>
        </div>

        <div className="bg-brandWhite border border-sand-border rounded-[4px] p-6 text-left space-y-4 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-sand-border pb-3">
            <span className="text-espresso/60">Estimated Delivery:</span>
            <span className="font-semibold text-espresso">4–6 Business Days (Express)</span>
          </div>
          <div className="flex justify-between border-b border-sand-border pb-3">
            <span className="text-espresso/60">Shipping Address:</span>
            <span className="font-medium text-espresso text-right max-w-xs">
              {formData.flatNo}, {formData.street}, {formData.city}, {formData.state} - {formData.pincode}
            </span>
          </div>
          <div className="flex justify-between border-b border-sand-border pb-3">
            <span className="text-espresso/60">Payment Method:</span>
            <span className="font-semibold text-espresso uppercase">{formData.paymentMethod} (Verified)</span>
          </div>
          <div className="flex justify-between pt-1 font-serif text-base font-bold text-espresso">
            <span>Total Paid:</span>
            <span>{formatPaise(total)}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/shop"
            className="px-8 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account"
            className="px-8 py-3.5 bg-brandWhite border border-sand-border text-espresso text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-ivory transition-colors"
          >
            View in Account
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="font-serif text-2xl text-espresso">No items to checkout</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-espresso text-ivory text-xs uppercase tracking-widest rounded-[2px]"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Checkout Progress Stepper */}
      <div className="max-w-xl mx-auto flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-espresso/50">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-espresso font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? 'bg-espresso text-ivory' : 'bg-sand text-espresso'
          }`}>1</span>
          <span>Information</span>
        </div>
        <div className="w-8 sm:w-16 h-[1px] bg-sand-border" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-espresso font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 2 ? 'bg-espresso text-ivory' : 'bg-sand text-espresso'
          }`}>2</span>
          <span>Review</span>
        </div>
        <div className="w-8 sm:w-16 h-[1px] bg-sand-border" />
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-espresso font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 3 ? 'bg-espresso text-ivory' : 'bg-sand text-espresso'
          }`}>3</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Address & Info */}
          {step === 1 && (
            <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-sand-border pb-3">
                <User className="w-4 h-4 text-champagne" />
                <h2 className="font-serif text-lg font-bold text-espresso">
                  Contact & Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Khushboo Sharma"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="care@example.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Flat / House No. / Building *
                  </label>
                  <input
                    type="text"
                    name="flatNo"
                    value={formData.flatNo}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Building A"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.flatNo && <p className="text-rose-600 text-xs mt-1">{errors.flatNo}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Street Address / Landmark *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Linking Road, Near Khar Station"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.street && <p className="text-rose-600 text-xs mt-1">{errors.street}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.city && <p className="text-rose-600 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Maharashtra"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.state && <p className="text-rose-600 text-xs mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    PIN Code (6 Digits) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400050"
                    maxLength={6}
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                  {errors.pincode && <p className="text-rose-600 text-xs mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full text-xs px-3.5 py-2.5 bg-sand/30 border border-sand-border rounded-[2px] text-espresso/70"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to Order Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Delivery & Review */}
          {step === 2 && (
            <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-sand-border pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-champagne" />
                  <h2 className="font-serif text-lg font-bold text-espresso">
                    Shipping & Delivery Method
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-champagne-dark hover:underline font-semibold"
                >
                  Edit Address
                </button>
              </div>

              {/* Delivery options */}
              <div className="space-y-3">
                <div className="p-4 border-2 border-champagne bg-sand/20 rounded-[3px] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-espresso block">
                      Pan-India Express Courier
                    </span>
                    <span className="text-[11px] text-espresso/70">
                      Delivered via BlueDart / Delhivery in 4-6 business days with tracking
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {shipping === 0 ? 'FREE' : formatPaise(shipping)}
                  </span>
                </div>
              </div>

              {/* Review Delivery address */}
              <div className="p-4 bg-ivory rounded-[2px] border border-sand-border text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-espresso/60 block">
                  Delivering to:
                </span>
                <p className="font-semibold text-espresso">{formData.fullName} ({formData.phone})</p>
                <p className="text-espresso/75">
                  {formData.flatNo}, {formData.street}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-sand-border text-espresso text-xs uppercase tracking-wider font-semibold rounded-[2px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-sand-border pb-3">
                <Lock className="w-4 h-4 text-champagne" />
                <h2 className="font-serif text-lg font-bold text-espresso">
                  Secure Payment Method
                </h2>
              </div>

              {/* Payment methods */}
              <div className="space-y-3">
                <label className={`block p-4 border rounded-[3px] cursor-pointer transition-all ${
                  formData.paymentMethod === 'razorpay'
                    ? 'border-champagne bg-sand/20'
                    : 'border-sand-border bg-brandWhite'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === 'razorpay'}
                        onChange={handleInputChange}
                        className="accent-champagne"
                      />
                      <div>
                        <span className="text-xs font-bold text-espresso block">
                          Razorpay (Cards / UPI / NetBanking / Wallets)
                        </span>
                        <span className="text-[11px] text-espresso/60">
                          Instant encrypted checkout with 128-bit bank-grade SSL security
                        </span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-champagne" />
                  </div>
                </label>

                <label className={`block p-4 border rounded-[3px] cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-champagne bg-sand/20'
                    : 'border-sand-border bg-brandWhite'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-champagne"
                    />
                    <div>
                      <span className="text-xs font-bold text-espresso block">
                        Cash on Delivery (Verified OTP upon delivery)
                      </span>
                      <span className="text-[11px] text-espresso/60">
                        Pay in cash or UPI at the doorstep upon receiving your parcel
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[2px] text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Test Mode enabled: Click Complete Order to verify checkout with simulated Razorpay transaction.</span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-sand-border text-espresso text-xs uppercase tracking-wider font-semibold rounded-[2px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="flex-1 py-4 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-widest font-bold rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Secure Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#30251F]" />
                      <span>Complete Order ({formatPaise(total)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-5 sticky top-24">
          <div className="flex items-center justify-between border-b border-sand-border pb-3">
            <h3 className="font-serif text-lg font-bold text-espresso">
              Order Summary
            </h3>
            <span className="text-xs text-espresso/60 font-sans">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Items list */}
          <div className="divide-y divide-sand-border/60 max-h-72 overflow-y-auto space-y-3">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-3 pt-3 items-center">
                <div className="w-14 aspect-[4/5] bg-sand rounded-[2px] overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs font-medium text-espresso truncate">{item.name}</h4>
                  <span className="text-[11px] text-espresso/60 block">Qty: {item.quantity}</span>
                </div>
                <span className="text-xs font-semibold text-espresso">
                  {formatPaise(item.pricePaise * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="space-y-2.5 pt-3 border-t border-sand-border text-xs">
            <div className="flex justify-between text-espresso/70">
              <span>Subtotal</span>
              <span className="font-semibold text-espresso">{formatPaise(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount ({appliedCoupon})</span>
                <span>-{formatPaise(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-espresso/70">
              <span>Shipping</span>
              <span className="font-semibold text-espresso">
                {shipping === 0 ? <span className="text-emerald-700">FREE</span> : formatPaise(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-sand-border pt-3 font-serif text-base font-bold text-espresso">
              <span>Grand Total</span>
              <span>{formatPaise(total)}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-espresso/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-champagne" />
            <span>Guaranteed safe checkout with 100% authentic handcrafted jewellery</span>
          </div>
        </div>

      </div>

    </div>
  );
};
