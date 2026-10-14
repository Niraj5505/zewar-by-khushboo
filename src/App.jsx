import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sparkles } from 'lucide-react';

// Storefront Components & Layout
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileMenu } from './components/layout/MobileMenu';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { PopupRoot } from './components/popups/PopupRoot';
import { Toaster } from './components/ui/Toaster';

// Seasonal Festive Dressing (Diwali / Deepavali)
import { FestiveProvider } from './components/festive/FestiveProvider';
import { DiwaliBanner } from './components/festive/DiwaliBanner';
import { DiyaGarland } from './components/festive/ambient/DiyaGarland';
import { DiwaliPopup } from './components/festive/DiwaliPopup';
import { DiwaliExitIntent } from './components/festive/overlays/DiwaliExitIntent';
import { FestiveControls } from './components/festive/FestiveControls';

// Storefront Pages (Standard Load)
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
import { DevPopups } from './pages/DevPopups';

// Admin Shell & Guard (Immediate load for speed)
import { AdminLayout } from './admin/layout/AdminLayout';
import { RequireAdmin } from './admin/components/RequireAdmin';

// Route-level Code Splitting for Admin Pages via React.lazy
const Login = lazy(() => import('./admin/pages/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('./admin/pages/Dashboard').then((m) => ({ default: m.Dashboard })));

// Catalog
const ProductList = lazy(() => import('./admin/pages/products/ProductList').then((m) => ({ default: m.ProductList })));
const ProductEditor = lazy(() => import('./admin/pages/products/ProductEditor').then((m) => ({ default: m.ProductEditor })));
const CategoryList = lazy(() => import('./admin/pages/products/CategoryList').then((m) => ({ default: m.CategoryList })));
const InventoryList = lazy(() => import('./admin/pages/products/InventoryList').then((m) => ({ default: m.InventoryList })));

// Sales & Customers
const OrderList = lazy(() => import('./admin/pages/orders/OrderList').then((m) => ({ default: m.OrderList })));
const OrderDetail = lazy(() => import('./admin/pages/orders/OrderDetail').then((m) => ({ default: m.OrderDetail })));
const ReturnsList = lazy(() => import('./admin/pages/orders/ReturnsList').then((m) => ({ default: m.ReturnsList })));
const CustomerList = lazy(() => import('./admin/pages/customers/CustomerList').then((m) => ({ default: m.CustomerList })));
const CustomerDetail = lazy(() => import('./admin/pages/customers/CustomerDetail').then((m) => ({ default: m.CustomerDetail })));

// Reviews & Marketing
const ReviewModeration = lazy(() => import('./admin/pages/reviews/ReviewModeration').then((m) => ({ default: m.ReviewModeration })));
const CouponsList = lazy(() => import('./admin/pages/marketing/CouponsList').then((m) => ({ default: m.CouponsList })));
const AnnouncementBarAdmin = lazy(() => import('./admin/pages/marketing/AnnouncementBar').then((m) => ({ default: m.AnnouncementBar })));
const HomepageEditor = lazy(() => import('./admin/pages/marketing/HomepageEditor').then((m) => ({ default: m.HomepageEditor })));
const PopupEditor = lazy(() => import('./admin/pages/marketing/PopupEditor').then((m) => ({ default: m.PopupEditor })));
const NewsletterList = lazy(() => import('./admin/pages/marketing/NewsletterList').then((m) => ({ default: m.NewsletterList })));
const FestiveMode = lazy(() => import('./admin/pages/marketing/FestiveMode').then((m) => ({ default: m.FestiveMode })));

// Content & Shipping
const PagesList = lazy(() => import('./admin/pages/content/PagesList').then((m) => ({ default: m.PagesList })));
const PageEditor = lazy(() => import('./admin/pages/content/PageEditor').then((m) => ({ default: m.PageEditor })));
const TestimonialsList = lazy(() => import('./admin/pages/content/TestimonialsList').then((m) => ({ default: m.TestimonialsList })));
const InstagramFeed = lazy(() => import('./admin/pages/content/InstagramFeed').then((m) => ({ default: m.InstagramFeed })));
const ShippingRules = lazy(() => import('./admin/pages/shipping/ShippingRules').then((m) => ({ default: m.ShippingRules })));
const PinCodeServiceability = lazy(() => import('./admin/pages/shipping/PinCodeServiceability').then((m) => ({ default: m.PinCodeServiceability })));

// Reports & Settings
const SalesReport = lazy(() => import('./admin/pages/reports/SalesReport').then((m) => ({ default: m.SalesReport })));
const ProductReport = lazy(() => import('./admin/pages/reports/ProductReport').then((m) => ({ default: m.ProductReport })));
const CustomerReport = lazy(() => import('./admin/pages/reports/CustomerReport').then((m) => ({ default: m.CustomerReport })));
const StoreSettings = lazy(() => import('./admin/pages/settings/StoreSettings').then((m) => ({ default: m.StoreSettings })));
const PaymentSettings = lazy(() => import('./admin/pages/settings/PaymentSettings').then((m) => ({ default: m.PaymentSettings })));
const EmailSettings = lazy(() => import('./admin/pages/settings/EmailSettings').then((m) => ({ default: m.EmailSettings })));
const SeoSettings = lazy(() => import('./admin/pages/settings/SeoSettings').then((m) => ({ default: m.SeoSettings })));
const UsersList = lazy(() => import('./admin/pages/settings/UsersList').then((m) => ({ default: m.UsersList })));
const AuditLog = lazy(() => import('./admin/pages/settings/AuditLog').then((m) => ({ default: m.AuditLog })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Admin Loading Skeleton Fallback
const AdminLoading = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3 p-12 text-center animate-pulse">
    <div className="w-10 h-10 rounded-full border-2 border-champagne border-t-transparent animate-spin" />
    <span className="font-serif italic text-sm text-espresso/70">
      Loading Zewar Back-of-House...
    </span>
  </div>
);

// Dedicated Storefront Layout Shell
function StorefrontLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso font-sans relative">
      <div className="relative z-40">
        <DiwaliBanner />
        <AnnouncementBar />
        <DiyaGarland />
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileMenu />
      <SearchOverlay />
      <PopupRoot />
      <DiwaliPopup />
      <DiwaliExitIntent />
      <FestiveControls />
      <Toaster />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FestiveProvider>
        <Routes>
        {/* PUBLIC STOREFRONT ROUTE TREE */}
        <Route element={<StorefrontLayout />}>
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
          <Route path="/dev/popups" element={<DevPopups />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN AUTH ROUTE */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminLoading />}>
              <Login />
            </Suspense>
          }
        />

        {/* PROTECTED ADMIN ROUTE TREE */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          {/* Overview */}
          <Route
            index
            element={
              <Suspense fallback={<AdminLoading />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/* Catalog */}
          <Route
            path="products"
            element={
              <Suspense fallback={<AdminLoading />}>
                <ProductList />
              </Suspense>
            }
          />
          <Route
            path="products/new"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <ProductEditor />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="products/:id/edit"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <ProductEditor />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="categories"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <CategoryList />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="inventory"
            element={
              <Suspense fallback={<AdminLoading />}>
                <InventoryList />
              </Suspense>
            }
          />

          {/* Sales */}
          <Route
            path="orders"
            element={
              <Suspense fallback={<AdminLoading />}>
                <OrderList />
              </Suspense>
            }
          />
          <Route
            path="orders/:id"
            element={
              <Suspense fallback={<AdminLoading />}>
                <OrderDetail />
              </Suspense>
            }
          />
          <Route
            path="returns"
            element={
              <Suspense fallback={<AdminLoading />}>
                <ReturnsList />
              </Suspense>
            }
          />

          {/* Customers */}
          <Route
            path="customers"
            element={
              <Suspense fallback={<AdminLoading />}>
                <CustomerList />
              </Suspense>
            }
          />
          <Route
            path="customers/:id"
            element={
              <Suspense fallback={<AdminLoading />}>
                <CustomerDetail />
              </Suspense>
            }
          />

          {/* Reviews */}
          <Route
            path="reviews"
            element={
              <Suspense fallback={<AdminLoading />}>
                <ReviewModeration />
              </Suspense>
            }
          />

          {/* Marketing */}
          <Route
            path="festive"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <FestiveMode />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="coupons"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <CouponsList />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="announcement"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <AnnouncementBarAdmin />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="homepage"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <HomepageEditor />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="popups"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <PopupEditor />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="newsletter"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <NewsletterList />
                </Suspense>
              </RequireAdmin>
            }
          />

          {/* Content */}
          <Route
            path="pages"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <PagesList />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="pages/:slug"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <PageEditor />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="testimonials"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <TestimonialsList />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="instagram"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <InstagramFeed />
                </Suspense>
              </RequireAdmin>
            }
          />

          {/* Shipping */}
          <Route
            path="shipping/rules"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <ShippingRules />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="shipping/pincodes"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <PinCodeServiceability />
                </Suspense>
              </RequireAdmin>
            }
          />

          {/* Reports */}
          <Route
            path="reports/sales"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <SalesReport />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="reports/products"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <ProductReport />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="reports/customers"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <CustomerReport />
                </Suspense>
              </RequireAdmin>
            }
          />

          {/* Settings */}
          <Route
            path="settings/store"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <StoreSettings />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="settings/payment"
            element={
              <RequireAdmin roles={['SUPER_ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <PaymentSettings />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="settings/email"
            element={
              <RequireAdmin roles={['SUPER_ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <EmailSettings />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="settings/seo"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <SeoSettings />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="settings/users"
            element={
              <RequireAdmin roles={['SUPER_ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <UsersList />
                </Suspense>
              </RequireAdmin>
            }
          />
          <Route
            path="settings/audit"
            element={
              <RequireAdmin roles={['SUPER_ADMIN', 'ADMIN']}>
                <Suspense fallback={<AdminLoading />}>
                  <AuditLog />
                </Suspense>
              </RequireAdmin>
            }
          />
        </Route>
      </Routes>
      </FestiveProvider>
    </QueryClientProvider>
  );
}

export default App;
