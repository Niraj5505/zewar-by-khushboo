import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPaise } from '../lib/formatINR';

export const Account = () => {
  const { user, addresses, logout } = useAuthStore();
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'profile'

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-border">
        <div>
          <span className="eyebrow text-champagne-dark">Customer Portal</span>
          <h1 className="font-serif text-3xl font-medium text-espresso mt-0.5">
            Welcome, {user?.name || "Valued Patron"}
          </h1>
          <p className="text-xs text-espresso/60">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brandWhite border border-sand-border text-espresso text-xs rounded-[2px] hover:border-champagne"
          >
            <Heart className="w-3.5 h-3.5 text-champagne" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sand/40 text-espresso/70 hover:text-espresso text-xs rounded-[2px]"
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
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors ${
              activeTab === 'orders' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors ${
              activeTab === 'addresses' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors ${
              activeTab === 'profile' ? 'bg-espresso text-ivory' : 'text-espresso/70 hover:bg-sand/30'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-medium text-espresso">Order History</h2>
              
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-brandWhite border border-sand-border rounded-[3px] p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-sand-border text-xs">
                      <div>
                        <span className="text-espresso/60">Order #</span>
                        <strong className="text-espresso font-mono ml-1">{order.id}</strong>
                        <span className="text-espresso/40 mx-2">•</span>
                        <span className="text-espresso/70">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded-[2px] ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-bold text-espresso">{formatPaise(order.totalPaise)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-[2px] bg-sand" />
                          <div className="text-xs">
                            <p className="font-medium text-espresso">{item.name}</p>
                            <p className="text-espresso/60">Qty: {item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-espresso">Saved Shipping Addresses</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-5 bg-brandWhite border border-sand-border rounded-[3px] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-espresso text-sm">{addr.name}</strong>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-champagne/20 text-espresso uppercase font-bold px-2 py-0.5 rounded-[2px]">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-espresso/75 leading-relaxed">
                      {addr.street}<br />
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-espresso/60 pt-1">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Profile */}
          {activeTab === 'profile' && (
            <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 space-y-4 text-xs">
              <h2 className="font-serif text-xl font-medium text-espresso border-b border-sand-border pb-3">
                Account Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-espresso/60 block">Full Name</span>
                  <span className="font-semibold text-espresso">{user?.name}</span>
                </div>
                <div>
                  <span className="text-espresso/60 block">Email Address</span>
                  <span className="font-semibold text-espresso">{user?.email}</span>
                </div>
                <div>
                  <span className="text-espresso/60 block">Mobile Number</span>
                  <span className="font-semibold text-espresso">{user?.phone}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
