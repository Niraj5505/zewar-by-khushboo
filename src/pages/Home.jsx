import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { BRAND } from '../lib/brand';

export const Home = () => {
  const navigate = useNavigate();
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-4 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left py-4 sm:py-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/60 border border-sand-border/80 rounded-full text-espresso text-[11px] tracking-wider uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>Heirloom Indian Craftsmanship</span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-medium leading-[1.15] tracking-tight">
                  Timeless Handcrafted Jewellery
                </h1>
                <p className="font-sans text-sm sm:text-base text-espresso/75 leading-relaxed max-w-lg">
                  Each piece tells a story — of tradition, artistry and you. Discover curated Kundan, pearl, and meenakari heirlooms made to be cherished.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-all duration-300 shadow-sm hover:translate-x-0.5"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-champagne" />
                </Link>
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-espresso/30 text-espresso text-xs uppercase tracking-widest font-medium rounded-[2px] hover:border-espresso hover:bg-espresso/5 transition-all duration-300"
                >
                  <span>Explore Collections</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-[4px] overflow-hidden shadow-2xl border border-sand-border bg-sand">
                <img
                  src="/images/hero-jewellery.jpg"
                  alt="Zewar Handcrafted Kundan Jewellery"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS BAR */}
      <section className="border-y border-sand-border bg-[#F8F4EC]/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center justify-center space-y-1.5 p-2">
              <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-1">
                <Heart className="w-5 h-5 fill-champagne/20" />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Handmade</h4>
              <p className="text-[11px] text-espresso/60 font-sans">with Love</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1.5 p-2">
              <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Premium Quality</h4>
              <p className="text-[11px] text-espresso/60 font-sans">Materials</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1.5 p-2">
              <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Secure Payments</h4>
              <p className="text-[11px] text-espresso/60 font-sans">(UPI / Cards)</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1.5 p-2">
              <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark mb-1">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Pan India Shipping</h4>
              <p className="text-[11px] text-espresso/60 font-sans">(5-7 Days)</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="eyebrow text-champagne-dark">Customer Favorites</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-espresso mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop?filter=bestsellers"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-espresso hover:text-champagne-dark transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BRAND CRAFTSMANSHIP / EDITORIAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAE0D2]/50 border border-sand-border rounded-[4px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Editorial text */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="eyebrow text-champagne-dark">Our Philosophy</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-medium leading-snug">
                More Than Just Jewellery<br />It's a Feeling
              </h2>
              <p className="font-sans text-sm sm:text-base text-espresso/75 leading-relaxed max-w-md">
                Zewar by Khushboo brings you handcrafted designs that blend tradition with modern elegance. Every pearl is knotted by hand, every stone framed in gold foil with reverence.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-all"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                </Link>
              </div>
            </div>

            {/* Right Hand / Bracelet Photo */}
            <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-sand">
              <img
                src="/images/brand-story.jpg"
                alt="Zewar Craftsmanship Handcrafted Kundan Bracelet"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR COLLECTIONS */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="eyebrow text-champagne-dark">Curated Silhouettes</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-espresso mt-1">
              Our Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-espresso hover:text-champagne-dark transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-full aspect-[4/5] rounded-[3px] overflow-hidden bg-sand border border-sand-border shadow-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-espresso/15 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-medium text-espresso group-hover:text-champagne-dark transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-[#FAF7F0] border-y border-sand-border py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10">
          <div>
            <span className="eyebrow text-champagne-dark">From Our Patrons</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso mt-1">
              Cherished Moments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                quote: "The Pearl Bloom Earrings exceeded my expectations! The weight is surprisingly comfortable and the pearl luster is royal.",
                author: "Ananya M.",
                city: "Mumbai",
                product: "Pearl Bloom Earrings",
              },
              {
                quote: "I wore the Meena Charm Necklace for my sister's wedding and received non-stop compliments. True artisan perfection.",
                author: "Pooja V.",
                city: "Delhi",
                product: "Meena Charm Necklace",
              },
              {
                quote: "Impeccable packaging, lightning-fast dispatch, and the bracelet is as gorgeous as depicted on their Instagram.",
                author: "Ritu S.",
                city: "Bengaluru",
                product: "Floral Kundan Bracelet",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-brandWhite border border-sand-border rounded-[3px] shadow-subtle space-y-4"
              >
                <div className="flex text-champagne">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                  ))}
                </div>
                <p className="font-sans text-xs sm:text-sm text-espresso/80 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-sand-border/50">
                  <p className="text-xs font-semibold text-espresso">{t.author}</p>
                  <p className="text-[11px] text-espresso/50">{t.city} • Verified Buyer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div>
          <span className="eyebrow text-champagne-dark">Follow Our Journey</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso mt-1">
            @zewar_by_khushboo
          </h2>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-champagne-dark font-medium hover:underline mt-1"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Join our community on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { img: "/images/pearl-bloom-earrings.jpg", alt: "Zewar Instagram feature 1" },
            { img: "/images/meena-charm-necklace.jpg", alt: "Zewar Instagram feature 2" },
            { img: "/images/floral-kundan-bracelet.jpg", alt: "Zewar Instagram feature 3" },
            { img: "/images/classic-jhumka.jpg", alt: "Zewar Instagram feature 4" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square bg-sand rounded-[2px] overflow-hidden block shadow-subtle"
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-ivory">
                <InstagramIcon className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};
