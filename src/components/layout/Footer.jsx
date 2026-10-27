import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Heart } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../ui/Icons';
import { BRAND } from '../../lib/brand';
import { useUIStore } from '../../store/uiStore';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useUIStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Thank you for subscribing to Zewar by Khushboo!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#F5EFE6] text-espresso border-t border-sand-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-sand-border/80">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex flex-col group">
              <span className="font-serif tracking-[0.25em] text-xl sm:text-2xl font-bold uppercase text-espresso group-hover:text-champagne-dark transition-colors">
                ZEWAR
              </span>
              <span className="brand-logo-script text-base sm:text-lg -mt-1 text-champagne">
                by Khushboo
              </span>
            </Link>
            <p className="text-sm text-espresso/70 max-w-sm font-sans leading-relaxed">
              Handmade Jewellery for your beautiful moments. Handcrafted with devotion, celebrating tradition and timeless poise.
            </p>
            <div className="pt-2 text-xs text-espresso/60 space-y-1">
              <p>Email: {BRAND.contactEmail}</p>
              <p>WhatsApp: {BRAND.whatsappNumber}</p>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-espresso">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-espresso/75">
              <li>
                <Link to="/" className="hover:text-champagne-dark transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-champagne-dark transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-champagne-dark transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-champagne-dark transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-champagne-dark transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-espresso">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-espresso/75">
              <li>
                <Link to="/shipping" className="hover:text-champagne-dark transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-champagne-dark transition-colors">Return & Refund</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-champagne-dark transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/care-guide" className="hover:text-champagne-dark transition-colors">Care Guide</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-champagne-dark transition-colors">Terms of Service</Link>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="text-champagne-dark hover:text-espresso font-semibold transition-colors flex items-center gap-1">
                  <span>Back-of-House Admin</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-espresso">
              Join Our Journey
            </h4>
            <p className="text-xs text-espresso/70 leading-relaxed">
              Get updates on new launches, exclusive festive offers, and styling guides.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full text-xs bg-brandWhite px-3.5 py-2.5 border border-sand-border rounded-l-[2px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-champagne"
              />
              <button
                type="submit"
                className="bg-champagne hover:bg-champagne-hover text-espresso px-3.5 py-2.5 rounded-r-[2px] transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brandWhite border border-sand-border flex items-center justify-center text-espresso/70 hover:text-champagne-dark hover:border-champagne transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/919876543210`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brandWhite border border-sand-border flex items-center justify-center text-espresso/70 hover:text-champagne-dark hover:border-champagne transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-espresso/60 gap-3">
          <p>© {new Date().getFullYear()} Zewar by Khushboo. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-champagne fill-champagne inline" />
            <span>in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
