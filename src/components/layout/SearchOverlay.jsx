import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { PRODUCTS } from '../../data/products';
import { formatPaise } from '../../lib/formatINR';

export const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q) ||
      p.materials?.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (slug) => {
    closeSearch();
    navigate(`/product/${slug}`);
  };

  const handleSelectCategory = (cat) => {
    closeSearch();
    navigate(`/shop?category=${cat}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-espresso/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-ivory border-b border-sand-border shadow-lg w-full pt-8 pb-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar Input */}
          <div className="flex items-center justify-between pb-4 border-b border-sand-border">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-champagne" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jewellery, earrings, necklaces, rings..."
                className="w-full bg-transparent text-espresso text-base sm:text-xl font-serif placeholder:font-sans placeholder:text-espresso/40 focus:outline-none"
              />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs uppercase tracking-wider text-espresso/60 hover:text-espresso px-2 py-1 mr-2"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="p-1.5 text-espresso/70 hover:text-espresso rounded-full hover:bg-sand/40 transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Popular searches suggestions */}
          {!query && (
            <div className="pt-6">
              <p className="eyebrow text-espresso/60 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Earrings', 'Kundan Choker', 'Pearl Bloom', 'Jhumka', 'Bracelets', 'Ruby Ring'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 text-xs bg-brandWhite text-espresso border border-sand-border rounded-[2px] hover:border-champagne hover:text-champagne-dark transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="pt-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow text-espresso/60">
                  {results.length} {results.length === 1 ? 'Result' : 'Results'} found
                </p>
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-lg text-espresso/80">No jewellery pieces found for "{query}"</p>
                  <p className="text-xs text-espresso/60 mt-1">Try searching for "Earrings", "Pearl", or "Necklace"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group cursor-pointer flex items-center gap-3.5 p-2 rounded-[2px] hover:bg-sand/30 transition-all border border-transparent hover:border-sand-border"
                    >
                      <div className="w-16 h-20 bg-sand flex-shrink-0 overflow-hidden rounded-[2px]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-champagne-dark font-medium block">
                          {product.categoryName}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-espresso truncate group-hover:text-champagne-dark transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-semibold text-espresso mt-0.5">
                          {formatPaise(product.pricePaise)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-espresso/30 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" onClick={closeSearch} />
    </div>
  );
};
