# ZEWAR by Khushboo — Luxury Handcrafted Jewellery E-Commerce

A luxury, production-grade e-commerce application crafted for **Zewar by Khushboo** ([@zewar_by_khushboo](https://www.instagram.com/zewar_by_khushboo/)).

Built with **React 18 + JSX**, **Vite**, **Tailwind CSS v3**, **React Router v6**, and **Zustand**, following the brand guidelines, restrained luxury editorial layout, and custom brand palette.

---

## 🎨 Brand Design Tokens & Identity

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Ivory Background** | `#FAF7F0` | Primary canvas & background |
| **Champagne Gold** | `#C6A15B` (Hover: `#A8843F`) | Accent buttons, badges, micro-highlights |
| **Deep Espresso** | `#30251F` | Primary typography, CTA buttons |
| **Soft Sand** | `#EAE0D2` | Card sections, image containers |
| **Pure White** | `#FFFFFF` | Cards, modals, checkout inputs |

### Typography
- **Headings & Collections**: *Playfair Display* serif
- **Navigation, Body, Prices & Forms**: *Montserrat* sans-serif
- **Signature Script**: *Alex Brush* / *Cormorant Garamond* for `"by Khushboo"`

---

## 🚀 Key Features Implemented (Stages 1–4)

1. **Global Shell & Navigation**:
   - Sticky header with backdrop blur and responsive mobile navigation drawer.
   - Dismissible announcement bar (`Free Shipping on orders above ₹999 | Handmade with Love ♡`).
   - Global instant search overlay with live product filtering and query suggestions.
   - Comprehensive footer with quick links, customer care, newsletter signup, and social links.

2. **Homepage**:
   - Editorial Hero showcase featuring handcrafted Indian Kundan & pearl jewellery.
   - 4-pillar Trust Bar: *Handmade with Love*, *Premium Quality*, *Secure Payments*, *Pan-India Shipping*.
   - Best Sellers grid with 4:5 vertical portrait cards, wishlist toggles, and direct add-to-cart.
   - Craftsmanship story section: *"More Than Just Jewellery It's a Feeling"*.
   - Category navigation: Earrings, Necklaces, Rings, Bracelets.
   - Patron testimonials & live Instagram showcase grid.

3. **Shop & Collections**:
   - Filter pills (`All`, `Earrings`, `Necklaces`, `Rings`, `Bracelets`, `Pendants`).
   - Price range filter slider.
   - Multi-option sorting (Featured, Price: Low to High, Price: High to Low, Best Sellers, Rating).
   - Numerical pagination controls (`1  2  3  →`).

4. **Product Detail Page (PDP)**:
   - Dynamic route `/product/:slug`.
   - 4:5 aspect ratio image gallery with thumbnail selector.
   - Product information, price in INR, star ratings & verified reviews.
   - Feature pills: *Handmade*, *Lightweight*, *Nickel Free*.
   - Quantity selector with stock enforcement.
   - Collapsible accordions for *Product Details*, *Shipping & Returns*, and *Care Instructions*.
   - Recommendation carousel: *"You May Also Like"*.
   - Mobile-optimized fixed bottom purchase bar.

5. **Cart & Slide-over Drawer**:
   - Global slide-over CartDrawer + dedicated full Cart page (`/cart`).
   - Free shipping milestone progress bar (unlocks above ₹999 / 99,900 paise).
   - Coupon system: supports `ZEWAR10` (10% off), `ROYAL15` (15% off).
   - Integer paise math everywhere — never floating point errors.
   - LocalStorage persistence via Zustand.

6. **Checkout Experience**:
   - Multi-step mobile-first checkout flow (`Information` → `Review` → `Payment` → `Confirmation`).
   - Form validation for 6-digit Indian PIN codes and 10-digit phone numbers.
   - Razorpay test mode integration ready.

7. **Account & Policies**:
   - Customer account portal with Order History, Saved Addresses, and Profile tabs.
   - Dedicated Wishlist page (`/wishlist`).
   - Comprehensive policy pages: FAQ, Shipping Policy, Returns & Refund Policy, Contact Us.

---

## 🛠️ Project Structure

```text
src/
├── assets/             # Brand logos & icons
├── components/
│   ├── cart/           # CartDrawer, CartLine, CartSummary
│   ├── layout/         # Header, Footer, AnnouncementBar, MobileMenu, SearchOverlay
│   ├── product/        # ProductCard, ProductGrid, QuickViewModal
│   └── ui/             # Button, Input, Modal, Accordion, Badge, Toast, Icons
├── data/
│   └── products.js     # Catalog with prices in integer paise, categories & specs
├── lib/
│   ├── brand.js        # Brand constants, contacts, links, trust pillars
│   ├── cn.js           # clsx + tailwind-merge helper
│   ├── formatINR.js    # Currency formatting & paise math
│   └── validation.js   # Form & address validators
├── pages/
│   ├── Home.jsx        # Homepage with hero, bestsellers & story
│   ├── Shop.jsx        # Collections & catalog with live filters
│   ├── Product.jsx     # PDP with gallery, accordions & mobile bar
│   ├── Cart.jsx        # Full shopping bag page with coupon logic
│   ├── Checkout.jsx    # Multi-step checkout with delivery options
│   ├── Wishlist.jsx    # Saved items wishlist page
│   ├── Account.jsx     # Customer orders & saved addresses
│   ├── About.jsx       # Brand story & values
│   ├── Contact.jsx     # Contact form, WhatsApp & Instagram links
│   ├── FAQ.jsx         # Frequently asked questions accordion
│   └── ShippingPolicy.jsx
└── store/
    ├── cartStore.js    # Persistent Zustand cart state
    ├── wishlistStore.js# Persistent Zustand wishlist state
    ├── authStore.js    # User authentication & address state
    └── uiStore.js      # Modal, drawer, search & toast notification state
```

---

## 💻 Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Storefront: [http://localhost:5173](http://localhost:5173)
   - Admin Login: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
   - Admin Dashboard: [http://localhost:5173/admin](http://localhost:5173/admin)

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🏛️ Back-of-House Boutique Admin Panel (`/admin/*`)

A luxury, back-of-house admin dashboard and full CMS crafted specifically for Zewar by Khushboo, maintaining the boutique's ivory-and-champagne-gold design language, Montserrat typography, and Playfair serif accents.

### Pre-Seeded Admin Credentials
| Email | Password | Role Tier | Capabilities |
| :--- | :--- | :--- | :--- |
| `khushboo@zewar.com` | `admin123` | `SUPER_ADMIN` | Full control, manages admins, payment keys & audit logs |
| `arjun@zewar.com` | `admin123` | `ADMIN` | Catalog, inventory, orders, marketing, static pages & reviews |
| `staff@zewar.com` | `admin123` | `STAFF` | Order fulfillment, inventory counts, view-only catalog |

### Administrative Route Map
- `/admin` — Boutique Overview (Revenue metrics, Recharts sales curve, low-stock alerts, pending orders)
- `/admin/products` — Product catalog with thumbnail previews, category filters, publish toggles, and bulk actions
- `/admin/products/new` & `/:id/edit` — Multi-tab product editor (Basic, Media, Pricing in paise, Inventory, Variants, Shipping, Specs, SEO)
- `/admin/categories` — Drag/reorder collections, CRUD modal, safe product reassignment guards
- `/admin/inventory` — Flat stock variant table with one-click inline quantity editing and batch restock modal
- `/admin/orders` & `/:id` — Order ledger, line items, shipment tracking editor, Razorpay refund triggers, and cancellation
- `/admin/returns` — Customer exchange requests with photo verification and approval workflows
- `/admin/customers` & `/:id` — Patron directory, lifetime value (LTV), private styling notes, and email composer
- `/admin/reviews` — Customer review moderation, star ratings, and public brand reply threads
- `/admin/coupons` — Promotional discount codes (percentage, fixed ₹, free shipping), limits, and copy actions
- `/admin/announcement` — Live top banner editor with real-time preview and brand palette presets
- `/admin/homepage` — Reorderable homepage sections (Hero, Bestsellers, Story, Trust Bar) with iframe preview
- `/admin/popups` — Lead capture modal manager (Welcome discount, Exit intent, delay and frequency rules)
- `/admin/newsletter` — Subscriber list, CSV export, and VIP email campaign composer
- `/admin/pages` & `/:slug` — Content CMS for Our Story, FAQ, Shipping, and Returns with rich text editing
- `/admin/testimonials` — Patron testimonial curation with star ratings and homepage feature toggles
- `/admin/instagram` — Social media showcase with manual and Instagram Graph API modes
- `/admin/shipping/rules` — Tiered shipping rules and free shipping milestone thresholds
- `/admin/shipping/pincodes` — Postal code serviceability (All-India, Whitelist, Blacklist) with live PIN checker
- `/admin/reports/sales` — Daily/Weekly/Monthly revenue curves and Average Order Value (AOV)
- `/admin/reports/products` — High-margin velocity items and bestsellers breakdown
- `/admin/reports/customers` — Repeat purchase ratios and VIP loyalty tiers
- `/admin/settings/store` — Brand name, concierge WhatsApp, support email, flagship address, and socials
- `/admin/settings/payment` — Razorpay Key ID and masked secrets, webhook tokens, and COD thresholds
- `/admin/settings/email` — Transactional email provider settings (Resend/SMTP), templates, and diagnostic test
- `/admin/settings/seo` — Global meta title patterns, Google Analytics GA4, Meta Pixel, and robots.txt editor
- `/admin/settings/users` — Admin team members, role assignments, self-delete safeguards, and capability matrix
- `/admin/festive` — Seasonal Festive Mode (Diwali / Deepavali date scheduling, banner message, dialogue copy, preview)
- `/admin/settings/audit` — Immutable audit log recording every mutation with JSON before/after diff inspector

---

## 🪔 Seasonal Festive Dressing System (Full Diwali Luxury Experience)

The storefront features an on-brand, seasonal festive dressing architecture designed for high-end boutique aesthetics. It feels like an upscale jeweller's flagship store dressed for Diwali week: warm lights in the window, marigold garlands framing the door, a diya display near the entrance, and gold-foil accents on price tags.

### 🏛️ Architecture & Folder Structure

```text
src/
├── components/
│   └── festive/
│       ├── FestiveProvider.jsx              ← Context, body attributes & vignette mount
│       ├── FestiveControls.jsx              ← Floating bottom-left panel with granular toggles & mobile menu view
│       ├── ambient/
│       │   ├── DiyaGarland.jsx              ← Top marigold-and-diya hanging garland
│       │   ├── CornerTorans.jsx             ← Top-corner ornaments with mouse parallax on desktop
│       │   ├── FloatingDiyas.jsx            ← Slow-rising background lamp silhouettes (auto-pauses offscreen)
│       │   ├── SparkleCanvas.jsx            ← Non-blocking gold sparkle particles scaling with device tier
│       │   ├── RangoliCorner.jsx            ← Subtle 60s rotating lotus rangoli SVG
│       │   └── WarmVignette.jsx             ← Soft warm radial glow around viewport perimeter
│       ├── hero/
│       │   ├── DiwaliHeroScene.jsx          ← Multi-layered hero container (ambient + diyas + sparkles + torans)
│       │   ├── DiyaScene3D.jsx              ← Procedural 3D clay diya with ~2Hz flame flicker (lazy-loaded)
│       │   └── FestiveHeadline.jsx          ← 8s gold shimmer sweep on "Timeless Handcrafted Jewellery"
│       ├── commerce/
│       │   ├── FestiveBadge.jsx             ← "Diwali" pill on tagged products (Diwali > New > Sale)
│       │   ├── GlowBorder.jsx               ← 4s pulsating gold glow border wrapper
│       │   ├── FestivePriceTag.jsx          ← Gold foil sale price styling with sparkle icon
│       │   ├── GiftWrapBadge.jsx            ← "Complimentary Gift Wrapping" pill & info modal
│       │   └── DiwaliCouponCard.jsx         ← Decorated coupon card in cart (DIWALI10 / ZEWAR10)
│       ├── sections/
│       │   ├── DiwaliCollectionBanner.jsx   ← Full-width deep espresso (#1A1310) spotlight banner
│       │   ├── DiwaliGifting.jsx            ← Curated gifting section with admin-selectable picks
│       │   ├── DiwaliCountdown.jsx          ← 4-tile real-time countdown to offer end (Days/Hours/Mins/Secs)
│       │   ├── DiwaliStory.jsx              ← Two-column brand sentiment block ("Why We Celebrate Diwali")
│       │   └── DiwaliDivider.jsx            ← Ornamental section divider with centered Diya SVG
│       ├── overlays/
│       │   ├── DiwaliPopup.jsx              ← Timed 15s modal offer with one-per-season persistence
│       │   ├── DiwaliExitIntent.jsx         ← Festive variant of exit intent with coupon & gift wrap note
│       │   └── DiwaliConfettiBurst.jsx      ← Brand palette burst on Add to Cart and Order Confirmation
│       └── audio/
│           └── FestiveAmbience.jsx          ← Web Audio API tanpura drone synthesizer (0KB download, 100% royalty-free)
├── assets/
│   └── festive/
│       ├── diya.svg                         ← Vector Diya with brass base and two-tone flame
│       ├── rangoli.svg                      ← 8-petal geometric lotus rangoli line art
│       ├── toran.svg                        ← Hanging mango leaf and marigold garland
│       ├── marigold-garland.svg             ← Repeating horizontal marigold bloom border
│       └── sparkle.svg                      ← Diamond starburst vector icon
├── hooks/
│   ├── useFestiveMode.js                    ← Master hook combining store, reduced motion, and device tier
│   ├── usePrefersReducedMotion.js           ← Real-time listener for OS reduced motion preferences
│   ├── useDeviceTier.js                     ← Classifies client into low / mid / high hardware tiers
│   ├── useSparkles.js                       ← 60fps particle loop auto-paused off-screen & on tab blur
│   ├── useScrollProgress.js                 ← Normalized scroll tracker (0 to 1)
│   └── useFestiveCountdown.js               ← Live second-by-second countdown calculator
└── store/
    └── festiveStore.js                      ← Zustand store with localStorage persistence (`zewar.diwali.prefs.v1`)
```

---

### ⚙️ State & Granular Preferences (`zewar.diwali.prefs.v1`)

Patrons can adjust or reduce all effects via the floating Diya panel in the bottom-left corner (or via the mobile slide-out menu):
- **Ambient**: Garland, corner torans, rangoli, floating diyas
- **Particles**: Gold sparkles and slow-rising lamps
- **Hero Scene**: Lighting, backdrops, and procedural 3D diya
- **Animations**: Shimmering headlines, glowing borders, and transitions
- **Confetti**: Auspicious particle burst on Add to Cart and Order Confirmation
- **Ambience**: Optional soft tanpura meditative drone synthesizer (off by default, opt-in only)
- **Presets**: "Reduce all motion" and "Reset to default"

---

### 🛡️ Performance, Accessibility & Safety Guarantees

- **Total Added JS**: < 10KB gzipped (well below the < 60KB limit).
- **Lazy 3D Diya**: Isolated into its own lazy chunk (`DiyaScene3D-*.js`, 1.13KB gzip) and rendered only on `deviceTier === 'high'`.
- **Zero Layout Shift (CLS = 0)**: All decorative elements and garlands use absolute positioning with reserved heights.
- **LCP Unaffected**: Particle canvas mounts inside `requestIdleCallback`.
- **prefers-reduced-motion: reduce**: Automatically disables all canvas sparkles, floating diyas, rotational rangoli, and shimmering animations.
- **Admin Control**: Complete management at **Admin → Marketing → Festive Mode** (`/admin/festive`) with instant preview trigger (`/?festive=preview`).
- **Clean Removability**: To completely remove the festive system, delete `src/components/festive/` and `src/assets/festive/`, and remove the 3 import lines from `App.jsx`.

---

### 🎨 How to Reuse for Next Year or Other Festivals (Holi, Raksha Bandhan, Christmas, Eid)

The entire seasonal architecture is modular and parameter-driven. To adapt for another festival:
1. **Change the 3 CSS Palette Variables** in `src/index.css`:
   ```css
   :root {
     --festive-accent: #E8A33D; /* Holi: #FF4081 (Gulal Pink) | Eid: #10B981 (Emerald) | Christmas: #DC2626 (Ruby) */
     --festive-deep:   #B33A2B; /* Holi: #9C27B0 (Royal Purple) | Eid: #047857 (Forest) | Christmas: #15803D (Evergreen) */
     --festive-glow:   rgba(198, 161, 91, 0.35); /* Soft ambient aura */
   }
   ```
2. **Swap the Vector Assets** in `src/assets/festive/`:
   - Replace `diya.svg`, `toran.svg`, and `rangoli.svg` with festival-specific icons (e.g. pichkari/gulal for Holi, crescent/star for Eid, or bell/holly for Christmas).
3. **Update Date Window & Copy** in **Admin → Marketing → Festive Mode**:
   - Set the festival's start and end dates.
   - Adjust banner, coupon (`DIWALI10` → `HOLI10` / `EID10`), and story text.


