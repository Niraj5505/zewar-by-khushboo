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
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```
