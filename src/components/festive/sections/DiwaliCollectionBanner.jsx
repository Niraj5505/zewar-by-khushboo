import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DiyaIcon } from '../DiyaIcon';
import { GlowBorder } from '../commerce/GlowBorder';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliCollectionBanner = () => {
  const { isActive } = useFestiveMode();

  if (!isActive) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 select-none">
      <GlowBorder>
        <div className="relative rounded-[4px] bg-[#1A1310] text-ivory border border-champagne/40 overflow-hidden shadow-2xl">
          {/* Ambient Warm Corner Radial Backdrops */}
          <div
            aria-hidden="true"
            className="absolute -top-12 -left-12 w-64 h-64 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(232,163,61,0.3) 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,161,91,0.3) 0%, transparent 70%)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-champagne/30 rounded-full text-champagne-light text-[11px] font-semibold tracking-wider uppercase">
                <DiyaIcon className="w-3.5 h-3.5" />
                <span>Curated Festive Capsule</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF7F0] leading-tight">
                  The Diwali Edit
                </h2>
                <p className="font-sans text-xs sm:text-sm text-ivory/75 leading-relaxed max-w-lg">
                  Handcrafted polki chandeliers, radiant meenakari chokers, and sculpted temple jhumkas curated specifically to catch the warm glow of candlelight this festival season.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-champagne hover:bg-champagne-hover text-espresso text-xs uppercase tracking-widest font-semibold rounded-[2px] transition-all duration-300 shadow-md hover:translate-x-0.5"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-ivory/60 font-sans">
                  Complimentary Gift Packaging Included
                </span>
              </div>
            </div>

            {/* Right Product Showcase on Illuminated Pedestal */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex items-center justify-center relative">
              <div
                className="relative w-64 sm:w-72 aspect-square rounded-full p-3 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(232,163,61,0.2) 0%, rgba(198,161,91,0.08) 60%, transparent 80%)',
                }}
              >
                <div className="w-56 h-56 rounded-[4px] overflow-hidden border border-champagne/40 shadow-2xl transform hover:scale-105 transition-transform duration-700">
                  <img
                    src="/images/festive-chandbali.jpg"
                    alt="Festive Chandbali Jewellery"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlowBorder>
    </section>
  );
};
