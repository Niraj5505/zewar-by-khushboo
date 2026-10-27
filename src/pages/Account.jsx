import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, CheckCircle2, Edit3, Save } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPaise } from '../lib/formatINR';
import { toast } from '../store/toastStore';
import { Auth } from './Auth';

export const Account = () => {
  const { user, addresses, logout, updateProfile, addAddress } = useAuthStore();
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'profile'

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

  // If visitor is not authenticated, show luxury Login / Registration page
  if (!user || !user.isLoggedIn) {
    return <Auth />;
  }

  const handleLogout = () => {
    logout();
    toast.info('You have safely signed out.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
    toast.success('Profile details updated successfully.');
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

  // Mock past orders
  const mockOrders = [
    {
      id: "ZBK-829104",
      date: "Oct 10, 2026",
      status: "In Transit",
      totalPaise: 349800,
      items: [
        { name: "Pearl Bloom Earrings", qty: 1, image: "/images/pearl-bloom-earrings.jpg" },
        { name: "Floral Kundan Bracelet", qty: 1, image: "/images/floral-kundan-bracelet.jpg" },
      ]
    },
    {
      id: "ZBK-618492",
      date: "Sep 22, 2026",
      status: "Delivered",
      totalPaise: 179900,
      items: [
        { name: "Classic Jhumka", qty: 1, image: "/images/classic-jhumka.jpg" },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8 animate-fade-in">
      
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-border">
        <div>
          <span className="eyebrow text-champagne-dark">Authenticated Patron Portal</span>
          <h1 className="font-serif text-3xl font-medium text-espresso mt-0.5">
            Welcome, {user?.name || "Valued Patron"}
          </h1>
          <p className="text-xs text-espresso/60">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brandWhite border border-sand-border text-espresso text-xs rounded-[2px] hover:border-champagne transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-champagne" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sand/40 hover:bg-sand/70 text-espresso/70 hover:text-espresso text-xs rounded-[2px] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-brandWhite border border-sand-border rounded-[3px] p-2 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer ${
              activeTab === 'addresses' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Content Panel (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-medium text-espresso pb-2 border-b border-sand-border">
                Recent Heirloom Orders
              </h2>
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-brandWhite border border-sand-border rounded-[3px] p-5 space-y-4 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-espresso">{order.id}</span>
                      <span className="text-espresso/40 mx-2">•</span>
                      <span className="text-espresso/60">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[2px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {order.status}
                      </span>
                      <span className="font-serif font-medium text-sm text-espresso">
                        {formatPaise(order.totalPaise)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-espresso/80">
                        <span>{item.name} × {item.qty}</span>
                        <span className="text-champagne-dark font-medium">Bespoke Finished</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-sand-border">
                <h2 className="font-serif text-xl font-medium text-espresso">
                  Saved Delivery Addresses
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3.5 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
                >
                  {showAddAddress ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleCreateAddress} className="bg-ivory/50 border border-sand-border rounded p-4 space-y-3 text-xs animate-fade-in">
                  <h3 className="font-semibold text-espresso">New Address</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Street Address, Building, Apartment"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="PIN Code"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px]"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-brandWhite border border-sand-border rounded-[3px] p-5 space-y-2 text-xs relative"
                  >
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase font-bold text-champagne-dark tracking-wider block">
                        Default Delivery Address
                      </span>
                    )}
                    <span className="font-semibold text-espresso block text-sm">{addr.name}</span>
                    <p className="text-espresso/70 leading-relaxed">
                      {addr.street}<br />
                      {addr.city}, {addr.state} — {addr.pincode}
                    </p>
                    <span className="text-espresso/60 block pt-1">Phone: {addr.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-sand-border pb-3">
                <h2 className="font-serif text-xl font-medium text-espresso">
                  Patron Profile Information
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="inline-flex items-center gap-1.5 text-xs text-champagne-dark font-semibold hover:text-espresso"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {!isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  <div>
                    <span className="text-espresso/60 block text-[11px] uppercase tracking-wider">Full Name</span>
                    <span className="font-semibold text-espresso text-sm">{user?.name}</span>
                  </div>
                  <div>
                    <span className="text-espresso/60 block text-[11px] uppercase tracking-wider">Email Address</span>
                    <span className="font-semibold text-espresso text-sm">{user?.email}</span>
                  </div>
                  <div>
                    <span className="text-espresso/60 block text-[11px] uppercase tracking-wider">Mobile Number</span>
                    <span className="font-semibold text-espresso text-sm">{user?.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-espresso/60 block text-[11px] uppercase tracking-wider">Account Status</span>
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Patron
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4 pt-1 animate-fade-in">
                  <div>
                    <label className="block text-espresso/70 mb-1 text-xs">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-espresso/70 mb-1 text-xs">Mobile Number</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 border border-sand-border rounded bg-white text-xs outline-none focus:border-champagne"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px]"
                  >
                    <Save className="w-3.5 h-3.5 text-champagne" />
                    <span>Save Changes</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
