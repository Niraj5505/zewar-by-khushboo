import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, Mail, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { useUIStore } from '../../store/uiStore';
import { BRAND } from '../../lib/brand';
import { cn } from '../../lib/cn';

export const MobileMenu = () => {
  const { isMobileMenuOpen, closeMobileMenu, openCart } = useUIStore();
  const location = useLocation();

  if (!isMobileMenuOpen) return null;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Earrings', href: '/shop?category=earrings' },
    { name: 'Necklaces', href: '/shop?category=necklaces' },
    { name: 'Bracelets', href: '/shop?category=bracelets' },
    { name: 'Rings', href: '/shop?category=rings' },
    { name: 'Pendants', href: '/shop?category=pendants' },
    { name: 'About Zewar', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-ivory h-full shadow-2xl flex flex-col justify-between z-10 border-r border-sand-border animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sand-border">
            <Link to="/" onClick={closeMobileMenu} className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Zewar by Khushboo"
                className="h-9 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="p-1.5 text-espresso/70 hover:text-espresso"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname + location.search === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center justify-between py-2.5 px-3 rounded text-xs uppercase tracking-widest font-medium transition-colors",
                    isActive
                      ? "bg-sand text-espresso font-semibold"
                      : "text-espresso/80 hover:bg-sand/40 hover:text-espresso"
                  )}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-espresso/40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info in menu */}
        <div className="p-5 border-t border-sand-border bg-[#F5EFE6]/50 space-y-4">
          <div className="flex items-center gap-3">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-espresso/75 hover:text-champagne-dark font-medium"
            >
              <InstagramIcon className="w-4 h-4 text-champagne" />
              <span>{BRAND.instagramHandle}</span>
            </a>
          </div>
          <div className="text-[11px] text-espresso/60 leading-relaxed">
            Free shipping Pan-India above ₹999. Handcrafted with love.
          </div>
        </div>
      </div>
    </div>
  );
};
