import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { usePopupStore } from '../../store/popupStore';
import { cn } from '../../lib/cn';

export const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { openCart, openMobileMenu, openSearch } = useUIStore();
  const openPopup = usePopupStore((state) => state.openPopup);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={openMobileMenu}
              className="p-1.5 -ml-1 text-espresso hover:text-champagne transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={openSearch}
              className="p-1.5 ml-2 text-espresso hover:text-champagne transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Logo (Left or Center) */}
          <div className="flex items-center">
            <Link to="/" className="flex flex-col items-center sm:items-start group">
              <span className="font-serif tracking-[0.25em] text-lg sm:text-2xl font-bold uppercase text-espresso group-hover:text-champagne-dark transition-colors">
                ZEWAR
              </span>
              <span className="brand-logo-script text-base sm:text-lg -mt-1 text-champagne font-normal tracking-wide">
                by Khushboo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-xs tracking-widest uppercase font-medium transition-colors duration-200 relative py-1",
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
              className="hidden lg:flex p-1.5 text-espresso/80 hover:text-espresso hover:scale-105 transition-all"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Icon */}
            <Link
              to="/account"
              className="p-1.5 text-espresso/80 hover:text-espresso hover:scale-105 transition-all"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </Link>

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
              className="p-1.5 text-espresso/80 hover:text-espresso relative hover:scale-105 transition-all"
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
