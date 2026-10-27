import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { BRAND } from '../lib/brand';

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="eyebrow text-champagne-dark">Our Legacy & Artistry</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
          About Zewar by Khushboo
        </h1>
        <p className="text-sm sm:text-base text-espresso/70 leading-relaxed font-sans">
          Handcrafted jewellery created to elevate everyday moments and festive celebrations with timeless grace.
        </p>
      </div>

      {/* Featured Editorial Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="aspect-[4/3] rounded-[4px] overflow-hidden bg-sand border border-sand-border shadow-subtle">
          <img
            src="/images/brand-story.jpg"
            alt="Handcrafted Zewar Jewellery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <span className="eyebrow text-champagne-dark">The Vision</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-medium">
            Bridging Heritage with Contemporary Poise
          </h2>
          <p className="text-sm text-espresso/75 leading-relaxed font-sans">
            At Zewar by Khushboo, every ornament is conceived as an intimate work of wearable art. We celebrate classical Indian metalwork traditions—intricate Kundan settings, luminous meenakari enamelling, and hand-strung freshwater pearls.
          </p>
          <p className="text-sm text-espresso/75 leading-relaxed font-sans">
            Designed for the discerning individual who appreciates subtle luxury, our pieces transition effortlessly from traditional wedding festivities to elevated modern ensembles.
          </p>
        </div>
      </div>

      {/* Our Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-sand-border">
        <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-2">
          <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-2">
            <Heart className="w-5 h-5 fill-champagne/20" />
          </div>
          <h3 className="font-serif text-lg font-medium text-espresso">Handcrafted Devotion</h3>
          <p className="text-xs text-espresso/70 leading-relaxed">
            Every motif is individually positioned and finished by skilled artisans, ensuring distinct charm and bespoke character.
          </p>
        </div>

        <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-2">
          <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-medium text-espresso">Refined Materials</h3>
          <p className="text-xs text-espresso/70 leading-relaxed">
            We use high-grade brass bases protected by long-lasting micron gold plating, hypoallergenic backings, and curated stones.
          </p>
        </div>

        <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-2">
          <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-medium text-espresso">Transparent Service</h3>
          <p className="text-xs text-espresso/70 leading-relaxed">
            Pan-India safe dispatch, insured packaging, and personalized customer care through our Instagram and WhatsApp concierges.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 sm:p-12 bg-[#F5EFE6] border border-sand-border rounded-[4px] text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-medium">
          Discover the Collection
        </h3>
        <p className="text-xs sm:text-sm text-espresso/70 max-w-md mx-auto">
          Explore our signature Kundan earrings, chokers, bracelets, and rings.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-4 h-4 text-champagne" />
          </Link>
        </div>
      </div>

    </div>
  );
};
