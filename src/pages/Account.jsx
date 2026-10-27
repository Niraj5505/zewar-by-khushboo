import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  CheckCircle2,
  Edit3,
  Save,
  Truck,
  Sparkles,
  ShieldCheck,
  Download,
  ExternalLink,
  ChevronRight,
  Clock,
  Trash2,
  Lock,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPaise } from '../lib/formatINR';
import { toast } from '../store/toastStore';
import { Auth } from './Auth';

export const Account = () => {
  const { user, addresses, logout, updateProfile, addAddress } = useAuthStore();
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'profile' | 'security'

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // Add Address State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Tracking details modal
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  // Password change state
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // If visitor is unauthenticated, show luxury Login / Registration view
  if (!user || !user.isLoggedIn) {
    return <Auth />;
  }

  const handleLogout = () => {
    logout();
    toast.info('You have safely signed out.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      toast.error('Please enter a valid name.');
      return;
    }
    updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
    toast.success('Patron profile updated successfully.');
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) {
      toast.error('Please complete street, city, and pincode.');
      return;
    }
    addAddress({
      name: user.name || 'Patron',
      street: newStreet,
      city: newCity,
      state: newState || 'Maharashtra',
      pincode: newPincode,
      phone: newPhone || user.phone || '9876543210',
      isDefault: false,
    });
    setShowAddAddress(false);
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
    setNewPhone('');
    toast.success('New delivery address saved.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Security credentials updated successfully.');
  };

  // Mock past orders with live tracking steps
  const mockOrders = [
    {
      id: "ZBK-829104",
      date: "Oct 10, 2026",
      status: "In Transit",
      courier: "BlueDart Insured Air Express",
      trackingNumber: "BD982749102IN",
      estDelivery: "Oct 13, 2026",
      step: 3, // 1: Confirmed, 2: Hallmarking, 3: In Transit, 4: Delivered
      totalPaise: 349800,
      items: [
        { name: "Pearl Bloom Earrings", qty: 1, pricePaise: 189900, image: "/images/pearl-bloom-earrings.jpg" },
        { name: "Floral Kundan Bracelet", qty: 1, pricePaise: 159900, image: "/images/floral-kundan-bracelet.jpg" },
      ]
    },
    {
      id: "ZBK-618492",
      date: "Sep 22, 2026",
      status: "Delivered",
      courier: "BlueDart Insured Air Express",
      trackingNumber: "BD716294018IN",
      estDelivery: "Delivered Sep 25, 2026",
      step: 4,
      totalPaise: 179900,
      items: [
        { name: "Classic Jhumka", qty: 1, pricePaise: 179900, image: "/images/classic-jhumka.jpg" },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8 animate-fade-in">
      
      {/* 1. LUXURY PATRON BANNER CARD */}
      <div className="bg-gradient-to-r from-[#2B1E19] via-[#38241D] to-[#251813] text-[#FAF7F0] border border-champagne/30 rounded-[6px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Monogram Crest Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-champagne via-[#D8B46C] to-champagne-dark p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full rounded-full bg-espresso flex items-center justify-center font-serif text-2xl sm:text-3xl font-semibold text-champagne tracking-wider">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'Z'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-champagne text-[10px]">Private Salon Patron</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-champagne-dark bg-champagne/15 px-2 py-0.5 rounded-full border border-champagne/30">
                  <Sparkles className="w-2.5 h-2.5" /> Royal Tier
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-ivory">
                {user?.name || "Valued Patron"}
              </h1>
              <p className="text-xs text-ivory/65 font-sans">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-ivory text-xs font-semibold rounded-[3px] transition-all backdrop-blur-sm"
            >
              <Heart className="w-3.5 h-3.5 text-champagne" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-ivory/80 hover:text-ivory text-xs font-medium rounded-[3px] transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-ivory/60" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-ivory/50 block text-[10px] uppercase tracking-wider">Total Heirlooms</span>
            <span className="font-serif text-base sm:text-lg text-champagne font-medium">3 Pieces</span>
          </div>
          <div>
            <span className="text-ivory/50 block text-[10px] uppercase tracking-wider">Orders Placed</span>
            <span className="font-serif text-base sm:text-lg text-ivory font-medium">2 Dispatches</span>
          </div>
          <div>
            <span className="text-ivory/50 block text-[10px] uppercase tracking-wider">Default Pincode</span>
            <span className="font-serif text-base sm:text-lg text-ivory font-medium">400050 (Mumbai)</span>
          </div>
          <div>
            <span className="text-ivory/50 block text-[10px] uppercase tracking-wider">Delivery Protection</span>
            <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold text-xs mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Insured
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION & CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-brandWhite border border-sand-border rounded-[4px] p-2 space-y-1 shadow-subtle">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-espresso text-ivory shadow-sm' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-champagne" />
              <span>My Orders</span>
            </div>
            <span className="text-[10px] opacity-75">2</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer ${
              activeTab === 'addresses' ? 'bg-espresso text-ivory shadow-sm' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-champagne" />
              <span>Saved Addresses</span>
            </div>
            <span className="text-[10px] opacity-75">{addresses.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-espresso text-ivory shadow-sm' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-champagne" />
              <span>Profile Details</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer ${
              activeTab === 'security' ? 'bg-espresso text-ivory shadow-sm' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-champagne" />
              <span>Security & Password</span>
            </div>
          </button>
        </div>

        {/* Content Panel (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: Orders with Live Interactive Tracking */}
          {activeTab === 'orders' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-sand-border">
                <div>
                  <h2 className="font-serif text-xl font-medium text-espresso">
                    Bespoke Heirloom Dispatches
                  </h2>
                  <p className="text-xs text-espresso/60">
                    Track packaging milestones, Hallmarking certificates, and insured transit.
                  </p>
                </div>
              </div>

              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-brandWhite border border-sand-border rounded-[4px] p-5 sm:p-6 space-y-5 text-xs shadow-subtle hover:border-champagne/60 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border/80 pb-3.5">
                    <div>
                      <span className="font-mono text-xs font-bold text-espresso">{order.id}</span>
                      <span className="text-espresso/40 mx-2">•</span>
                      <span className="text-espresso/60 font-sans">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[2px] border ${
                          order.status === 'In Transit'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {order.status === 'In Transit' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {order.status}
                      </span>
                      <span className="font-serif font-medium text-base text-espresso">
                        {formatPaise(order.totalPaise)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Timeline Progress Bar */}
                  <div className="bg-ivory/50 border border-sand-border/60 rounded-[3px] p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-espresso">
                        {order.status === 'In Transit' ? 'Estimated Arrival: ' + order.estDelivery : 'Delivered on Schedule'}
                      </span>
                      <span className="text-espresso/60 font-mono text-[10px]">
                        AWB: {order.trackingNumber}
                      </span>
                    </div>

                    {/* Step Bar */}
                    <div className="relative flex items-center justify-between pt-2">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sand -translate-y-1/2 z-0" />
                      <div
                        className="absolute top-1/2 left-0 h-0.5 bg-champagne-dark -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: order.step === 4 ? '100%' : '66%' }}
                      />

                      {/* Step 1 */}
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-champagne-dark text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                        <span className="text-[10px] text-espresso/70 text-center">Confirmed</span>
                      </div>

                      {/* Step 2 */}
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-champagne-dark text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                        <span className="text-[10px] text-espresso/70 text-center">Hallmarking</span>
                      </div>

                      {/* Step 3 */}
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          order.step >= 3 ? 'bg-champagne-dark text-white ring-4 ring-champagne/20' : 'bg-sand text-espresso/50'
                        }`}>
                          {order.step > 3 ? '✓' : <Truck className="w-3 h-3" />}
                        </div>
                        <span className="text-[10px] font-semibold text-espresso text-center">In Transit</span>
                      </div>

                      {/* Step 4 */}
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          order.step === 4 ? 'bg-emerald-700 text-white' : 'bg-sand text-espresso/40'
                        }`}>
                          {order.step === 4 ? '✓' : '4'}
                        </div>
                        <span className="text-[10px] text-espresso/70 text-center">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 pt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-espresso py-1 border-b border-sand-border/40 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs">{item.name}</span>
                          <span className="text-[11px] text-espresso/50">× {item.qty}</span>
                        </div>
                        <span className="font-serif font-medium text-espresso/90">
                          {formatPaise(item.pricePaise)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        toast.info(`Tracking details dispatched to ${user.email}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-champagne-dark hover:text-espresso font-semibold"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track with BlueDart Express</span>
                      <ExternalLink className="w-3 h-3 text-espresso/40" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        toast.success(`Tax Invoice for ${order.id} downloaded.`);
                      }}
                      className="inline-flex items-center gap-1.5 text-espresso/60 hover:text-espresso underline text-[11px]"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Tax Invoice (PDF)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-sand-border">
                <div>
                  <h2 className="font-serif text-xl font-medium text-espresso">
                    Saved Delivery Addresses
                  </h2>
                  <p className="text-xs text-espresso/60">
                    Manage your primary residences and gifting addresses for expedited checkout.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm cursor-pointer"
                >
                  {showAddAddress ? 'Cancel' : '+ Add New Address'}
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleCreateAddress} className="bg-ivory/60 border border-sand-border rounded-[4px] p-5 space-y-4 text-xs animate-fade-in shadow-subtle">
                  <h3 className="font-serif text-sm font-semibold text-espresso">Add New Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Flat, Apartment, Society or Building Name"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                      <input
                        type="text"
                        placeholder="State (e.g. Maharashtra)"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="6-digit PIN Code"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne font-mono"
                      />
                      <input
                        type="tel"
                        placeholder="Recipient Phone (+91...)"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[3px] shadow-sm hover:bg-espresso-light transition-colors"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-brandWhite border border-sand-border hover:border-champagne/60 rounded-[4px] p-5 space-y-2.5 text-xs relative shadow-subtle transition-all"
                  >
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-champagne-dark bg-champagne/15 px-2 py-0.5 rounded-full tracking-wider">
                        ★ Primary Residence
                      </span>
                    )}
                    <span className="font-serif font-medium text-espresso block text-base">{addr.name}</span>
                    <p className="text-espresso/70 leading-relaxed font-sans">
                      {addr.street}<br />
                      {addr.city}, {addr.state} — {addr.pincode}
                    </p>
                    <span className="text-espresso/60 block pt-1 font-mono text-[11px]">Contact: {addr.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-brandWhite border border-sand-border rounded-[4px] p-6 space-y-5 text-xs shadow-subtle animate-fade-in">
              <div className="flex items-center justify-between border-b border-sand-border pb-3">
                <div>
                  <h2 className="font-serif text-xl font-medium text-espresso">
                    Patron Profile Details
                  </h2>
                  <p className="text-xs text-espresso/60">
                    Personalized credentials and boutique salon contact details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sand-border hover:border-champagne text-xs text-espresso font-semibold rounded-[3px] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-champagne-dark" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {!isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                  <div className="p-4 bg-sand/15 border border-sand-border/70 rounded-[3px] space-y-1">
                    <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold">Full Name</span>
                    <span className="font-serif text-espresso text-base font-medium">{user?.name}</span>
                  </div>
                  <div className="p-4 bg-sand/15 border border-sand-border/70 rounded-[3px] space-y-1">
                    <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold">Email Address</span>
                    <span className="text-espresso text-xs font-semibold">{user?.email}</span>
                  </div>
                  <div className="p-4 bg-sand/15 border border-sand-border/70 rounded-[3px] space-y-1">
                    <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold">Mobile Number</span>
                    <span className="text-espresso text-xs font-semibold font-mono">{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="p-4 bg-sand/15 border border-sand-border/70 rounded-[3px] space-y-1">
                    <span className="text-espresso/60 block text-[10px] uppercase tracking-wider font-semibold">Boutique Status</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Verified Patron
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4 pt-1 animate-fade-in max-w-lg">
                  <div>
                    <label className="block text-espresso/70 mb-1.5 text-xs font-semibold uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-espresso/70 mb-1.5 text-xs font-semibold uppercase tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[3px] hover:bg-espresso-light transition-colors shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5 text-champagne" />
                    <span>Save Changes</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: Security */}
          {activeTab === 'security' && (
            <div className="bg-brandWhite border border-sand-border rounded-[4px] p-6 space-y-5 text-xs shadow-subtle animate-fade-in max-w-lg">
              <div className="border-b border-sand-border pb-3">
                <h2 className="font-serif text-xl font-medium text-espresso">
                  Security & Access Credentials
                </h2>
                <p className="text-xs text-espresso/60">
                  Update your account password to keep your bespoke orders and saved heirlooms protected.
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-espresso/70 mb-1 text-xs font-semibold uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-espresso/70 mb-1 text-xs font-semibold uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-espresso/70 mb-1 text-xs font-semibold uppercase tracking-wider">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[3px] hover:bg-espresso-light transition-colors shadow-sm"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
