import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ExternalLink,
  LogOut,
  User,
  ShieldCheck,
  AlertTriangle,
  ShoppingBag,
  Star,
  Package,
  X,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { useAuth } from '../hooks/useAuth';
import { useCmsStore } from '../lib/cmsStore';

export const Topbar = () => {
  const { user, role, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMobileSidebar = useCmsStore((s) => s.toggleMobileSidebar);
  const isMobileSidebarOpen = useCmsStore((s) => s.isMobileSidebarOpen);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const products = useCmsStore((s) => s.products);
  const orders = useCmsStore((s) => s.orders);
  const customers = useCmsStore((s) => s.customers);
  const reviews = useCmsStore((s) => s.reviews);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notifications summary
  const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold || 5));
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === 'unfulfilled');
  const pendingReviews = reviews.filter((r) => r.status === 'pending');
  const totalNotifications = lowStockProducts.length + pendingOrders.length + pendingReviews.length;

  // Global search matching
  const searchResults = searchQuery.trim()
    ? {
        products: products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.sku.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3),
        orders: orders
          .filter(
            (o) =>
              o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3),
        customers: customers
          .filter(
            (c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3),
      }
    : null;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderSearchResults = (onSelect) => {
    if (!searchResults) return null;
    const hasAny =
      searchResults.products.length > 0 ||
      searchResults.orders.length > 0 ||
      searchResults.customers.length > 0;

    if (!hasAny) {
      return (
        <p className="text-xs text-espresso/50 text-center py-2">
          No matching records found.
        </p>
      );
    }

    return (
      <div className="space-y-3 font-sans">
        {searchResults.products.length > 0 && (
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-espresso/50 mb-1">
              Products
            </p>
            <div className="space-y-1">
              {searchResults.products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    navigate(`/admin/products/${p.id}/edit`);
                    onSelect();
                  }}
                  className="w-full text-left p-1.5 hover:bg-sand/30 rounded flex items-center gap-2 text-xs text-espresso"
                >
                  <Package className="w-3.5 h-3.5 text-champagne-dark" />
                  <span className="font-medium truncate">{p.name}</span>
                  <span className="text-[11px] text-espresso/40 ml-auto">{p.sku}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {searchResults.orders.length > 0 && (
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-espresso/50 mb-1">
              Orders
            </p>
            <div className="space-y-1">
              {searchResults.orders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    navigate(`/admin/orders/${o.id}`);
                    onSelect();
                  }}
                  className="w-full text-left p-1.5 hover:bg-sand/30 rounded flex items-center gap-2 text-xs text-espresso"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-champagne-dark" />
                  <span className="font-medium">{o.id}</span>
                  <span className="text-espresso/60 truncate">— {o.customer.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {searchResults.customers.length > 0 && (
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-espresso/50 mb-1">
              Customers
            </p>
            <div className="space-y-1">
              {searchResults.customers.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    navigate(`/admin/customers/${c.id}`);
                    onSelect();
                  }}
                  className="w-full text-left p-1.5 hover:bg-sand/30 rounded flex items-center gap-2 text-xs text-espresso"
                >
                  <User className="w-3.5 h-3.5 text-champagne-dark" />
                  <span className="font-medium truncate">{c.name}</span>
                  <span className="text-espresso/40 text-[11px] ml-auto">{c.email}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur border-b border-sand-border/80 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative">
      {/* Left: Mobile Menu Button & Breadcrumbs */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="p-1.5 -ml-1 text-espresso/70 hover:text-espresso hover:bg-sand/40 rounded-[2px] transition-colors lg:hidden flex-shrink-0"
          aria-label={isMobileSidebarOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
        >
          <Menu className="w-5 h-5 text-espresso" />
        </button>
        <div className="min-w-0 flex-1 overflow-hidden">
          <Breadcrumbs />
        </div>
      </div>

      {/* Center: Global Search Input (Desktop) */}
      <div className="relative max-w-md w-full hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search products, orders, customers..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-ivory/60 border border-sand-border rounded-[2px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-champagne focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown (Desktop) */}
        {searchOpen && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-sand-border rounded-[4px] shadow-2xl p-3 z-50 max-h-96 overflow-y-auto">
            {renderSearchResults(() => {
              setSearchOpen(false);
              setSearchQuery('');
            })}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Mobile Search Toggle */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className={`p-2 text-espresso/70 hover:text-espresso hover:bg-sand/30 rounded-[2px] md:hidden transition-colors ${
            mobileSearchOpen ? 'bg-sand/40 text-espresso' : ''
          }`}
          aria-label="Toggle search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Storefront Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-espresso/70 hover:text-espresso border border-sand-border hover:bg-sand/30 rounded-[2px] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-champagne-dark" />
          <span>View Storefront</span>
        </a>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-espresso/70 hover:text-espresso hover:bg-sand/30 rounded-[2px] relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-champagne text-espresso font-bold text-[10px] flex items-center justify-center border-2 border-white">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm bg-white border border-sand-border rounded-[4px] shadow-2xl p-4 z-50 text-xs font-sans space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-sand-border/70">
                <span className="font-serif font-medium text-sm text-espresso">
                  Notifications
                </span>
                <span className="text-[11px] text-espresso/50">
                  {totalNotifications} action items
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lowStockProducts.length > 0 && (
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/admin/inventory');
                    }}
                    className="p-2.5 bg-amber-50/60 border border-amber-200/60 rounded cursor-pointer hover:bg-amber-100/50 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 text-xs">
                        Low Stock Alert ({lowStockProducts.length})
                      </p>
                      <p className="text-[11px] text-amber-800">
                        Items need restocking to prevent backorders.
                      </p>
                    </div>
                  </div>
                )}

                {pendingOrders.length > 0 && (
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/admin/orders');
                    }}
                    className="p-2.5 bg-sand/40 border border-sand-border rounded cursor-pointer hover:bg-sand/60 flex items-start gap-2.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-champagne-dark mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-espresso text-xs">
                        New Pending Orders ({pendingOrders.length})
                      </p>
                      <p className="text-[11px] text-espresso/70">
                        Awaiting fulfillment and packaging.
                      </p>
                    </div>
                  </div>
                )}

                {pendingReviews.length > 0 && (
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/admin/reviews');
                    }}
                    className="p-2.5 bg-ivory border border-sand-border rounded cursor-pointer hover:bg-sand/30 flex items-start gap-2.5"
                  >
                    <Star className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-espresso text-xs">
                        Pending Reviews ({pendingReviews.length})
                      </p>
                      <p className="text-[11px] text-espresso/70">
                        Customer reviews awaiting moderation.
                      </p>
                    </div>
                  </div>
                )}

                {totalNotifications === 0 && (
                  <p className="text-xs text-espresso/50 text-center py-4">
                    All caught up! No pending alerts.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-sand/30 rounded-[2px] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-espresso text-champagne flex items-center justify-center font-serif text-xs font-semibold">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="text-left hidden lg:block leading-tight">
              <span className="block text-xs font-medium text-espresso truncate max-w-[120px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="block text-[10px] text-champagne-dark font-semibold uppercase tracking-wider">
                {role || 'SUPER_ADMIN'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-espresso/40" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 max-w-[calc(100vw-1.5rem)] bg-white border border-sand-border rounded-[4px] shadow-2xl p-2 z-50 text-xs font-sans space-y-1">
              <div className="px-3 py-2 border-b border-sand-border/70">
                <p className="font-semibold text-espresso">{user?.name}</p>
                <p className="text-[11px] text-espresso/50 truncate">{user?.email}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 bg-champagne/15 text-espresso text-[10px] font-bold tracking-wider rounded uppercase">
                  <ShieldCheck className="w-3 h-3 text-champagne-dark" />
                  {role}
                </div>
              </div>

              {/* Quick Role Switcher for Testing Capability Matrix */}
              <div className="px-3 py-2 border-b border-sand-border/50 bg-ivory/30">
                <p className="text-[10px] font-bold uppercase tracking-wider text-espresso/50 mb-1">
                  Preview as Role:
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {['SUPER_ADMIN', 'ADMIN', 'STAFF'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => switchRole(r)}
                      className={`px-1 py-1 text-[10px] font-bold rounded border ${
                        role === r
                          ? 'bg-espresso text-ivory border-espresso'
                          : 'bg-white text-espresso/70 border-sand-border hover:bg-sand/30'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/admin/settings/users"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-espresso hover:bg-sand/30 rounded transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-dark" />
                <span>Manage Admins</span>
              </Link>
              <Link
                to="/admin/settings/store"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-espresso hover:bg-sand/30 rounded transition-colors"
              >
                <User className="w-3.5 h-3.5 text-champagne-dark" />
                <span>Store Settings</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-sand-border shadow-xl p-3 z-50 animate-fade-in">
          <div className="relative">
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, orders, customers..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-ivory/60 border border-sand-border rounded-[2px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-champagne focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {searchQuery.trim() && (
            <div className="mt-2 bg-white border border-sand-border rounded-[4px] p-2 max-h-72 overflow-y-auto">
              {renderSearchResults(() => {
                setMobileSearchOpen(false);
                setSearchQuery('');
              })}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
