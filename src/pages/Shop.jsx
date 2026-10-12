import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { formatPaise } from '../lib/formatINR';
import { BRAND } from '../lib/brand';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400000); // 4000 rupees in paise
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state if URL searchParam changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setMaxPrice(400000);
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Special query filter (e.g. bestsellers)
    if (filterParam === 'bestsellers') {
      result = result.filter((p) => p.isBestSeller);
    }

    // Price filter
    result = result.filter((p) => p.pricePaise <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePaise - b.pricePaise);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePaise - a.pricePaise);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCategory, filterParam, maxPrice, sortBy]);

  // Pagination slice
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const categoryPills = [
    { id: 'all', name: 'All' },
    ...CATEGORIES.map((c) => ({ id: c.slug, name: c.name })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="eyebrow text-champagne-dark">Curated Selection</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-espresso">
          Our Collections
        </h1>
        <p className="text-xs sm:text-sm text-espresso/70 font-sans">
          Handcrafted for every mood, every moment. Traditional artistry reimagined for timeless poise.
        </p>
      </div>

      {/* 2. Filter Pills Navigation (Matching the Mockup) */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
        {categoryPills.map((pill) => {
          const isActive = selectedCategory === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => handleCategoryChange(pill.id)}
              className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-espresso text-ivory shadow-sm'
                  : 'bg-brandWhite text-espresso border border-sand-border hover:border-champagne hover:text-champagne-dark'
              }`}
            >
              {pill.name}
            </button>
          );
        })}
      </div>

      {/* 3. Controls Bar: Results Count, Max Price Filter, Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-brandWhite border border-sand-border rounded-[3px]">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-espresso">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
          {(selectedCategory !== 'all' || maxPrice < 400000 || sortBy !== 'featured') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-champagne-dark font-semibold hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Price Range Slider */}
          <div className="hidden md:flex items-center gap-2 text-xs text-espresso/80">
            <span>Max: {formatPaise(maxPrice)}</span>
            <input
              type="range"
              min="140000"
              max="400000"
              step="20000"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="accent-champagne w-24 sm:w-32 cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-espresso/60 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-ivory border border-sand-border text-espresso px-3 py-1.5 rounded-[2px] text-xs font-medium focus:outline-none focus:border-champagne cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Best Sellers</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Product Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="py-20 text-center bg-brandWhite border border-sand-border rounded-[3px] space-y-3">
          <p className="font-serif text-xl text-espresso">No handcrafted pieces match your selection</p>
          <p className="text-xs text-espresso/60">Try adjusting your filters or price limit.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 5. Pagination (Matching Mockup: 1 2 3 →) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`w-9 h-9 rounded-[2px] text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-espresso text-ivory'
                    : 'bg-brandWhite text-espresso border border-sand-border hover:border-champagne'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="px-3 h-9 bg-brandWhite text-espresso border border-sand-border rounded-[2px] text-xs font-semibold hover:border-champagne"
            >
              →
            </button>
          )}
        </div>
      )}

    </div>
  );
};
