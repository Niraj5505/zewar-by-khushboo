import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageCircle, Mail, HelpCircle, Phone, Sparkles } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/Popover';
import { BRAND } from '../../lib/brand';
import { WhatsAppIcon } from '../ui/Icons';

export const FloatingSupport = () => {
  const location = useLocation();

  // Hidden on /checkout
  if (location.pathname === '/checkout') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open support and styling concierge"
            className="w-12 h-12 rounded-full bg-espresso text-champagne shadow-2xl border border-champagne/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-champagne"
          >
            <MessageCircle className="w-6 h-6 fill-champagne/20" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="top"
          className="w-80 p-5 bg-ivory border border-espresso/20 shadow-2xl rounded-[3px] space-y-4"
        >
          <div className="flex items-center gap-2 border-b border-espresso/10 pb-3">
            <Sparkles className="w-4 h-4 text-champagne" />
            <div>
              <h4 className="font-serif text-sm font-bold text-espresso">
                Zewar Concierge
              </h4>
              <p className="text-[11px] text-espresso/60">
                We're here to assist with styling and order queries.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-[2px] bg-brandWhite border border-espresso/10 hover:border-champagne hover:bg-sand/20 transition-all text-espresso"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold block">Chat on WhatsApp</span>
                <span className="text-[10px] text-espresso/60">Instant response (10 AM – 7 PM IST)</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="flex items-center gap-3 p-2.5 rounded-[2px] bg-brandWhite border border-espresso/10 hover:border-champagne hover:bg-sand/20 transition-all text-espresso"
            >
              <Mail className="w-4 h-4 text-champagne-dark flex-shrink-0" />
              <div>
                <span className="font-bold block">Email Customer Care</span>
                <span className="text-[10px] text-espresso/60">care@zewarbykhushboo.com</span>
              </div>
            </a>

            {/* FAQs */}
            <Link
              to="/faq"
              className="flex items-center gap-3 p-2.5 rounded-[2px] bg-brandWhite border border-espresso/10 hover:border-champagne hover:bg-sand/20 transition-all text-espresso"
            >
              <HelpCircle className="w-4 h-4 text-espresso/60 flex-shrink-0" />
              <div>
                <span className="font-bold block">Frequently Asked Questions</span>
                <span className="text-[10px] text-espresso/60">Shipping, care, sizing and returns</span>
              </div>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
