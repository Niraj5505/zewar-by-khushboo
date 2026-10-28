import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Package,
  MapPin,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { usePopupStore } from '../../store/popupStore';
import { useAuthStore } from '../../store/authStore';
import { toast } from '../../store/toastStore';
import { cn } from '../../lib/cn';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { openCart, openMobileMenu, openSearch } = useUIStore();
  const openPopup = usePopupStore((state) => state.openPopup);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on route change or outside click
  useEffect(() => {
    setIsAccountMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAccountMenuOpen(false);
    toast.info('You have safely signed out.');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 bg-ivory/95 backdrop-blur-md border-b",
        isScrolled
          ? "border-sand-border/80 shadow-subtle py-2.5 sm:py-3"
          : "border-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Trigger & Mobile Search */}
          <div className="flex items-center lg:hidden space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={openMobileMenu}
              className="p-1.5 text-espresso/80 hover:text-espresso"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={openSearch}
              className="p-1.5 text-espresso/80 hover:text-espresso"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Logo & Wordmark */}
          <div className="flex-1 text-center lg:text-left lg:flex-initial">
            <Link to="/" className="inline-flex items-center group focus:outline-none" aria-label="Zewar by Khushboo">
              <img
                src="/images/logo.png"
                alt="Zewar by Khushboo"
                className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "font-sans text-xs uppercase tracking-[0.14em] transition-colors py-1 relative font-medium",
                    isActive
                      ? "text-espresso font-semibold"
                      : "text-espresso/70 hover:text-espresso"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Search Button */}
            <button
              type="button"
              onClick={openSearch}
              className="hidden lg:flex p-1.5 text-espresso/80 hover:text-espresso hover:scale-105 transition-all cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Icon with Interactive Dropdown Menu */}
            <div className="relative" ref={accountMenuRef}>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="p-1.5 text-espresso/80 hover:text-espresso hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer rounded-full"
                aria-expanded={isAccountMenuOpen}
                aria-label="Patron Account Menu"
              >
                <div className="relative">
                  <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  {user?.isLoggedIn && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-600 ring-1 ring-white" />
                  )}
                </div>
                {user?.isLoggedIn && user?.name && (
                  <span className="hidden md:inline text-[11px] font-semibold text-espresso truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 text-espresso/40 transition-transform duration-200 hidden sm:block ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Floating Luxury Patron Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-brandWhite border border-sand-border shadow-2xl rounded-[4px] p-4 text-xs animate-in zoom-in-95 fade-in duration-200 z-50">
                  {user?.isLoggedIn ? (
                    <div className="space-y-3">
                      {/* Patron Header */}
                      <div className="pb-3 border-b border-sand-border flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne/30 to-champagne/10 border border-champagne/40 flex items-center justify-center font-serif text-sm font-semibold text-espresso">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <span className="font-semibold text-espresso block truncate text-xs">
                            {user.name}
                          </span>
                          <span className="text-[10px] text-espresso/60 block truncate">
                            {user.email}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-champagne-dark font-bold mt-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Royal Patron</span>
                          </span>
                        </div>
                      </div>

                      {/* Quick Navigation Links */}
                      <div className="space-y-1 py-1">
                        <Link
                          to="/account"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded hover:bg-sand/30 text-espresso transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Package className="w-3.5 h-3.5 text-champagne-dark" />
                            <span>My Orders</span>
                          </div>
                          <span className="text-[10px] font-mono text-espresso/50">Track</span>
                        </Link>

                        <Link
                          to="/account"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded hover:bg-sand/30 text-espresso transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-3.5 h-3.5 text-champagne-dark" />
                            <span>Saved Addresses</span>
                          </div>
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded hover:bg-sand/30 text-espresso transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Heart className="w-3.5 h-3.5 text-champagne-dark" />
                            <span>Saved Heirlooms</span>
                          </div>
                          {wishlistCount > 0 && (
                            <span className="bg-sand px-1.5 py-0.5 rounded text-[10px] font-bold text-espresso">
                              {wishlistCount}
                            </span>
                          )}
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="pt-2 border-t border-sand-border">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 p-2 rounded text-espresso/70 hover:text-espresso hover:bg-sand/30 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5 text-espresso/50" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <span className="font-serif font-medium text-espresso text-sm block">
                          Patron Sanctuary
                        </span>
                        <p className="text-[11px] text-espresso/60 leading-relaxed">
                          Sign in for private salon orders, bespoke tracking, and saved heirlooms.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="w-full py-2.5 bg-espresso hover:bg-espresso-light text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] text-center block transition-colors"
                        >
                          Sign In
                        </Link>

                        <Link
                          to="/register"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="w-full py-2.5 border border-sand-border hover:bg-sand/30 text-espresso text-xs uppercase tracking-wider font-semibold rounded-[2px] text-center block transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-sand-border/80 flex items-center justify-between text-[10px] text-espresso/50">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-champagne-dark" /> Insured Delivery
                        </span>
                        <span>•</span>
                        <span>Velvet Unboxing</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-1.5 text-espresso/80 hover:text-espresso relative hover:scale-105 transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-champagne text-espresso text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon & Drawer Trigger */}
            <button
              type="button"
              onClick={() => openPopup('cart')}
              className="p-1.5 text-espresso/80 hover:text-espresso relative hover:scale-105 transition-all cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-espresso text-ivory text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
