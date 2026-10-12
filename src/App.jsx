import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileMenu } from './components/layout/MobileMenu';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';
import { Toast } from './components/ui/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { Account } from './pages/Account';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { ReturnsPolicy } from './pages/ReturnsPolicy';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso font-sans">
      {/* Top Banner & Header */}
      <AnnouncementBar />
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<ReturnsPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Modals & Drawers */}
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <QuickViewModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
