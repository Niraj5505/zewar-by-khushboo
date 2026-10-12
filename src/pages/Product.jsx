import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  Ruler,
  Maximize2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Accordion } from '../components/ui/Accordion';
import { formatPaise, calculateDiscount } from '../lib/formatINR';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import { usePopupStore } from '../store/popupStore';
import { toast } from '../store/toastStore';
import { BRAND } from '../lib/brand';

export const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const openPopup = usePopupStore((state) => state.openPopup);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast, openCart } = useUIStore();

  // Find product by slug
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const isFav = isInWishlist(product.id);
  const discount = calculateDiscount(product.compareAtPricePaise, product.pricePaise);

  // Recommendations: exclude current product
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Reset scroll and image index on slug change
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to bag`, {
      product,
      action: { label: 'View Bag', href: '/cart' },
    });
    openPopup('cart');
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const accordionItems = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <div className="space-y-2 text-xs text-espresso/80 font-sans">
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Materials:</strong> {product.materials}</p>
          <p><strong>Dimensions:</strong> {product.dimensions}</p>
          <p><strong>Closure:</strong> {product.closure || 'Push back with safety stopper'}</p>
          <p><strong>Package Contents:</strong> {product.packageContents}</p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-2 text-xs text-espresso/80 font-sans">
          <p>• {product.deliveryEstimate}</p>
          <p>• Free shipping on all prepaid orders above ₹999.</p>
          <p>• Orders are packaged in tamper-proof bubble mailers with complimentary luxury velvet pouches.</p>
          <p>• Easy 7-day exchange policy for unused items in original packaging.</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <div className="space-y-1.5 text-xs text-espresso/80 font-sans">
          <p>• Store in the provided Zewar zip-lock pouch or velvet box to protect micron plating.</p>
          <p>• Avoid direct contact with moisture, perfumes, sanitizers, and chemical hairsprays.</p>
          <p>• Gently wipe with the included soft microfiber cloth after each wear before storing.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-espresso/60 font-sans">
        <Link to="/" className="hover:text-espresso">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-espresso/40" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-espresso capitalize">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-espresso/40" />
        <span className="text-espresso font-medium truncate">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Column: Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image (4:5 Ratio) */}
          <div
            onClick={() => openPopup('lightbox', { images: product.images, initialIndex: selectedImage })}
            className="relative aspect-[4/5] bg-sand rounded-[4px] overflow-hidden border border-sand-border shadow-subtle group cursor-zoom-in"
          >
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-[#8C2D19] text-ivory text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-[2px] shadow-sm">
                {discount}% Off
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-espresso/80 backdrop-blur-sm text-ivory text-[10px] uppercase font-semibold px-2.5 py-1 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
              <Maximize2 className="w-3 h-3 text-champagne" />
              <span>Click to Expand</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="absolute top-3 right-3 p-2 bg-brandWhite/90 hover:bg-brandWhite rounded-full text-espresso/70 hover:text-espresso shadow-sm transition-all z-10"
              aria-label="Share product"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 sm:w-24 aspect-[4/5] rounded-[3px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx
                      ? 'border-champagne shadow-sm scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="eyebrow text-champagne-dark">{product.categoryName}</span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-espresso mt-1">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex text-champagne">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                ))}
              </div>
              <span className="text-xs text-espresso/70 font-sans font-medium">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-serif text-3xl font-bold text-espresso">
                {formatPaise(product.pricePaise)}
              </span>
              {product.compareAtPricePaise && product.compareAtPricePaise > product.pricePaise && (
                <span className="font-sans text-base text-espresso/45 line-through">
                  {formatPaise(product.compareAtPricePaise)}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-espresso/80 leading-relaxed border-t border-sand-border/80 pt-4">
            {product.shortDescription}
          </p>

          {/* Feature Badges (Matching Mockup: Handmade, Lightweight, Nickel Free) */}
          <div className="flex flex-wrap gap-2.5">
            {product.features?.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-[#F5EFE6] border border-sand-border text-espresso text-xs font-medium tracking-wide rounded-[2px] flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-champagne" />
                <span>{f}</span>
              </span>
            ))}
            <button
              type="button"
              onClick={() => openPopup('sizeguide')}
              className="px-3 py-1.5 bg-ivory border border-champagne/50 hover:bg-champagne/15 text-espresso text-xs font-semibold tracking-wide rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-champagne-dark" />
              <span>Size Guide</span>
            </button>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-espresso">Quantity</span>
              <div className="flex items-center border border-sand-border rounded-[2px] bg-brandWhite">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 text-espresso/70 hover:text-espresso font-semibold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-espresso min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3.5 py-1.5 text-espresso/70 hover:text-espresso font-semibold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-700 font-medium">In Stock ({product.stock} available)</span>
            </div>

            {/* Buttons: Add to Cart (Champagne) & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-widest font-bold rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#30251F]" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-brandWhite border border-espresso/40 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory text-xs uppercase tracking-widest font-bold rounded-[2px] transition-all"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Wishlist Link */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="inline-flex items-center gap-2 text-xs text-espresso/80 hover:text-espresso font-medium py-1 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : 'text-espresso/60'}`} />
              <span>{isFav ? 'In your Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Accordion Tabs */}
          <div className="pt-4">
            <Accordion items={accordionItems} />
          </div>

        </div>

      </div>

      {/* 3. "You May Also Like" Section (Matching Mockup) */}
      <section className="pt-12 border-t border-sand-border space-y-8">
        <div>
          <span className="eyebrow text-champagne-dark">Complete the Look</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso mt-1">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Mobile Fixed Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-brandWhite border-t border-sand-border p-3.5 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <p className="font-serif text-base font-bold text-espresso">
            {formatPaise(product.pricePaise)}
          </p>
          <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
        </div>
        <div className="flex gap-2 flex-1 max-w-xs justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-sm flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#30251F]" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
};
