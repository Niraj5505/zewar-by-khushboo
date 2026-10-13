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
- `/admin/settings/audit` — Immutable audit log recording every mutation with JSON before/after diff inspector

