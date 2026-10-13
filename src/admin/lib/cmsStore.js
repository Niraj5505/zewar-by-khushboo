import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_RETURNS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_ANNOUNCEMENT,
  INITIAL_HOMEPAGE_SECTIONS,
  INITIAL_POPUPS,
  INITIAL_NEWSLETTERS,
  INITIAL_PAGES,
  INITIAL_TESTIMONIALS,
  INITIAL_INSTAGRAM,
  INITIAL_SHIPPING_RULES,
  INITIAL_PINCODES,
  INITIAL_STORE_SETTINGS,
  INITIAL_PAYMENT_SETTINGS,
  INITIAL_EMAIL_SETTINGS,
  INITIAL_SEO_SETTINGS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
} from './initialData';

export const useCmsStore = create(
  persist(
    (set, get) => ({
      // Current Admin Session
      currentAdmin: {
        id: "usr-admin-1",
        name: "Khushboo Shah",
        email: "khushboo@zewar.com",
        role: "SUPER_ADMIN", // SUPER_ADMIN, ADMIN, STAFF
        token: "jwt_zewar_admin_session_token",
      },
      isSidebarCollapsed: false,
      globalSearchQuery: "",

      // Data collections
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      orders: INITIAL_ORDERS,
      returns: INITIAL_RETURNS,
      customers: INITIAL_CUSTOMERS,
      reviews: INITIAL_REVIEWS,
      coupons: INITIAL_COUPONS,
      announcement: INITIAL_ANNOUNCEMENT,
      homepageSections: INITIAL_HOMEPAGE_SECTIONS,
      popups: INITIAL_POPUPS,
      newsletters: INITIAL_NEWSLETTERS,
      pages: INITIAL_PAGES,
      testimonials: INITIAL_TESTIMONIALS,
      instagram: INITIAL_INSTAGRAM,
      shippingRules: INITIAL_SHIPPING_RULES,
      pincodes: INITIAL_PINCODES,
      storeSettings: INITIAL_STORE_SETTINGS,
      paymentSettings: INITIAL_PAYMENT_SETTINGS,
      emailSettings: INITIAL_EMAIL_SETTINGS,
      seoSettings: INITIAL_SEO_SETTINGS,
      users: INITIAL_USERS,
      auditLogs: INITIAL_AUDIT_LOGS,

      // UI Actions
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),

      // Admin Auth Actions
      loginAdmin: (email, password) => {
        const found = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (found && found.status === 'active') {
          const userObj = {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role,
            token: `jwt_session_${Date.now()}`,
          };
          set({ currentAdmin: userObj });
          get().addAuditLog('LOGIN', 'AUTH', found.id, null, { email: found.email });
          return { success: true, user: userObj };
        }
        // Fallback default admin
        if (email.includes('@')) {
          const defaultAdmin = {
            id: "usr-admin-1",
            name: email.split('@')[0],
            email: email,
            role: "SUPER_ADMIN",
            token: `jwt_session_${Date.now()}`,
          };
          set({ currentAdmin: defaultAdmin });
          get().addAuditLog('LOGIN', 'AUTH', defaultAdmin.id, null, { email });
          return { success: true, user: defaultAdmin };
        }
        return { success: false, error: 'Invalid credentials or inactive account' };
      },

      logoutAdmin: () => {
        const admin = get().currentAdmin;
        if (admin) {
          get().addAuditLog('LOGOUT', 'AUTH', admin.id, { email: admin.email }, null);
        }
        set({ currentAdmin: null });
      },

      switchRole: (role) => {
        set((state) => ({
          currentAdmin: state.currentAdmin ? { ...state.currentAdmin, role } : null,
        }));
      },

      // Audit Logger
      addAuditLog: (action, entity, entityId, before, after) => {
        const current = get().currentAdmin;
        const entry = {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: current ? current.id : 'anonymous',
          userName: current ? current.name : 'System',
          action,
          entity,
          entityId: String(entityId || ''),
          ip: "103.21.144.12",
          before: before || null,
          after: after || null,
        };
        set((state) => ({ auditLogs: [entry, ...state.auditLogs] }));
      },

      // PRODUCT MUTATIONS
      addProduct: (productData) => {
        const newProduct = {
          ...productData,
          id: productData.id || `prod-${Date.now()}`,
          updatedAt: new Date().toISOString(),
          variants: productData.variants || [],
        };
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
        get().addAuditLog('CREATE', 'PRODUCT', newProduct.id, null, newProduct);
        return newProduct;
      },

      updateProduct: (id, updates) => {
        const before = get().products.find((p) => p.id === id);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
        const after = get().products.find((p) => p.id === id);
        get().addAuditLog('UPDATE', 'PRODUCT', id, before, after);
        return after;
      },

      deleteProduct: (id) => {
        const before = get().products.find((p) => p.id === id);
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
        get().addAuditLog('DELETE', 'PRODUCT', id, before, null);
      },

      bulkUpdateProductStatus: (ids, status) => {
        set((state) => ({
          products: state.products.map((p) =>
            ids.includes(p.id) ? { ...p, status, updatedAt: new Date().toISOString() } : p
          ),
        }));
        get().addAuditLog('BULK_STATUS_UPDATE', 'PRODUCT', ids.join(','), null, { status, count: ids.length });
      },

      updateProductStock: (id, stock) => {
        const before = get().products.find((p) => p.id === id);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: Number(stock), updatedAt: new Date().toISOString() } : p
          ),
        }));
        const after = get().products.find((p) => p.id === id);
        get().addAuditLog('STOCK_UPDATE', 'PRODUCT', id, { stock: before?.stock }, { stock });
      },

      // CATEGORY MUTATIONS
      addCategory: (category) => {
        const newCat = { ...category, id: category.id || `cat-${Date.now()}`, count: 0 };
        set((state) => ({ categories: [...state.categories, newCat] }));
        get().addAuditLog('CREATE', 'CATEGORY', newCat.id, null, newCat);
        return newCat;
      },

      updateCategory: (id, updates) => {
        const before = get().categories.find((c) => c.id === id);
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
        const after = get().categories.find((c) => c.id === id);
        get().addAuditLog('UPDATE', 'CATEGORY', id, before, after);
        return after;
      },

      deleteCategory: (id, reassignToId = null) => {
        const before = get().categories.find((c) => c.id === id);
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          products: reassignToId
            ? state.products.map((p) => (p.category === id ? { ...p, category: reassignToId } : p))
            : state.products,
        }));
        get().addAuditLog('DELETE', 'CATEGORY', id, before, { reassignToId });
      },

      reorderCategories: (reordered) => {
        set({ categories: reordered });
        get().addAuditLog('REORDER', 'CATEGORY', 'ALL', null, { order: reordered.map((c) => c.id) });
      },

      // ORDER MUTATIONS
      updateOrderStatus: (orderId, fulfillmentStatus, paymentStatus) => {
        const before = get().orders.find((o) => o.id === orderId);
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === orderId) {
              const updated = { ...o };
              if (fulfillmentStatus) updated.fulfillmentStatus = fulfillmentStatus;
              if (paymentStatus) updated.paymentStatus = paymentStatus;
              return updated;
            }
            return o;
          }),
        }));
        const after = get().orders.find((o) => o.id === orderId);
        get().addAuditLog('STATUS_CHANGE', 'ORDER', orderId, before, after);
      },

      updateOrderShipment: (orderId, shipmentData) => {
        const before = get().orders.find((o) => o.id === orderId);
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, shipment: { ...o.shipment, ...shipmentData } } : o
          ),
        }));
        const after = get().orders.find((o) => o.id === orderId);
        get().addAuditLog('UPDATE_SHIPMENT', 'ORDER', orderId, before?.shipment, after?.shipment);
      },

      updateOrderNotes: (orderId, internalNotes) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, internalNotes } : o)),
        }));
        get().addAuditLog('UPDATE_NOTES', 'ORDER', orderId, null, { internalNotes });
      },

      cancelOrder: (orderId, reason) => {
        const before = get().orders.find((o) => o.id === orderId);
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  fulfillmentStatus: 'cancelled',
                  internalNotes: `${o.internalNotes || ''}\n[CANCELLED]: ${reason}`.trim(),
                }
              : o
          ),
        }));
        get().addAuditLog('CANCEL', 'ORDER', orderId, before, { reason });
      },

      issueRefund: (orderId, amountPaise, reason) => {
        const before = get().orders.find((o) => o.id === orderId);
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  paymentStatus: 'refunded',
                  internalNotes: `${o.internalNotes || ''}\n[REFUND ISSUED ₹${(amountPaise / 100).toFixed(2)}]: ${reason}`.trim(),
                }
              : o
          ),
        }));
        get().addAuditLog('REFUND', 'ORDER', orderId, before, { amountPaise, reason });
      },

      // RETURNS
      updateReturnStatus: (returnId, status, adminNotes) => {
        const before = get().returns.find((r) => r.id === returnId);
        set((state) => ({
          returns: state.returns.map((r) =>
            r.id === returnId ? { ...r, status, adminNotes: adminNotes || r.adminNotes } : r
          ),
        }));
        get().addAuditLog('UPDATE_RETURN', 'RETURN', returnId, before, { status, adminNotes });
      },

      // CUSTOMER MUTATIONS
      updateCustomerNotes: (customerId, notes, tags) => {
        const before = get().customers.find((c) => c.id === customerId);
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === customerId ? { ...c, notes, tags: tags || c.tags } : c
          ),
        }));
        get().addAuditLog('UPDATE_NOTES', 'CUSTOMER', customerId, before, { notes, tags });
      },

      // REVIEWS MUTATIONS
      updateReviewStatus: (reviewId, status, reply) => {
        const before = get().reviews.find((r) => r.id === reviewId);
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId
              ? {
                  ...r,
                  status,
                  reply: reply !== undefined ? reply : r.reply,
                }
              : r
          ),
        }));
        get().addAuditLog('MODERATE', 'REVIEW', reviewId, before, { status, reply });
      },

      deleteReview: (reviewId) => {
        const before = get().reviews.find((r) => r.id === reviewId);
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== reviewId),
        }));
        get().addAuditLog('DELETE', 'REVIEW', reviewId, before, null);
      },

      // MARKETING: COUPONS
      addCoupon: (coupon) => {
        const newCoupon = { ...coupon, id: coupon.id || `CPN-${Date.now()}`, usedCount: 0 };
        set((state) => ({ coupons: [newCoupon, ...state.coupons] }));
        get().addAuditLog('CREATE', 'COUPON', newCoupon.id, null, newCoupon);
        return newCoupon;
      },

      updateCoupon: (id, updates) => {
        const before = get().coupons.find((c) => c.id === id);
        set((state) => ({
          coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
        const after = get().coupons.find((c) => c.id === id);
        get().addAuditLog('UPDATE', 'COUPON', id, before, after);
        return after;
      },

      deleteCoupon: (id) => {
        const before = get().coupons.find((c) => c.id === id);
        set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) }));
        get().addAuditLog('DELETE', 'COUPON', id, before, null);
      },

      // ANNOUNCEMENT BAR
      updateAnnouncement: (announcementData) => {
        const before = get().announcement;
        set({ announcement: { ...before, ...announcementData } });
        get().addAuditLog('UPDATE', 'ANNOUNCEMENT', 'BAR', before, announcementData);
      },

      // HOMEPAGE SECTIONS
      updateHomepageSections: (sections) => {
        const before = get().homepageSections;
        set({ homepageSections: sections });
        get().addAuditLog('UPDATE', 'HOMEPAGE', 'SECTIONS', before, sections);
      },

      updateHomepageSectionById: (id, updates) => {
        set((state) => ({
          homepageSections: state.homepageSections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
        get().addAuditLog('UPDATE', 'HOMEPAGE_SECTION', id, null, updates);
      },

      // POPUPS
      updatePopup: (id, updates) => {
        const before = get().popups.find((p) => p.id === id);
        set((state) => ({
          popups: state.popups.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
        const after = get().popups.find((p) => p.id === id);
        get().addAuditLog('UPDATE', 'POPUP', id, before, after);
      },

      // NEWSLETTER
      deleteNewsletter: (id) => {
        set((state) => ({ newsletters: state.newsletters.filter((n) => n.id !== id) }));
        get().addAuditLog('DELETE', 'NEWSLETTER', id, null, null);
      },

      // STATIC PAGES
      updatePage: (slug, updates) => {
        const before = get().pages.find((p) => p.slug === slug);
        set((state) => ({
          pages: state.pages.map((p) =>
            p.slug === slug ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
        const after = get().pages.find((p) => p.slug === slug);
        get().addAuditLog('UPDATE', 'PAGE', slug, before, after);
      },

      // TESTIMONIALS
      addTestimonial: (tst) => {
        const newTst = { ...tst, id: tst.id || `tst-${Date.now()}` };
        set((state) => ({ testimonials: [...state.testimonials, newTst] }));
        get().addAuditLog('CREATE', 'TESTIMONIAL', newTst.id, null, newTst);
        return newTst;
      },

      updateTestimonial: (id, updates) => {
        const before = get().testimonials.find((t) => t.id === id);
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
        get().addAuditLog('UPDATE', 'TESTIMONIAL', id, before, updates);
      },

      deleteTestimonial: (id) => {
        set((state) => ({ testimonials: state.testimonials.filter((t) => t.id !== id) }));
        get().addAuditLog('DELETE', 'TESTIMONIAL', id, null, null);
      },

      reorderTestimonials: (reordered) => {
        set({ testimonials: reordered });
        get().addAuditLog('REORDER', 'TESTIMONIAL', 'ALL', null, null);
      },

      // INSTAGRAM FEED
      updateInstagramFeed: (feed) => {
        set({ instagram: feed });
        get().addAuditLog('UPDATE', 'INSTAGRAM_FEED', 'ALL', null, feed);
      },

      // SHIPPING RULES & PINCODES
      updateShippingRules: (rules) => {
        set({ shippingRules: rules });
        get().addAuditLog('UPDATE', 'SHIPPING_RULES', 'ALL', null, rules);
      },

      updatePincodes: (pincodesConfig) => {
        set({ pincodes: pincodesConfig });
        get().addAuditLog('UPDATE', 'PINCODES', 'CONFIG', null, pincodesConfig);
      },

      // SETTINGS
      updateStoreSettings: (settings) => {
        const before = get().storeSettings;
        set({ storeSettings: { ...before, ...settings } });
        get().addAuditLog('UPDATE', 'STORE_SETTINGS', 'CONFIG', before, settings);
      },

      updatePaymentSettings: (settings) => {
        const before = get().paymentSettings;
        set({ paymentSettings: { ...before, ...settings } });
        get().addAuditLog('UPDATE', 'PAYMENT_SETTINGS', 'CONFIG', before, settings);
      },

      updateEmailSettings: (settings) => {
        const before = get().emailSettings;
        set({ emailSettings: { ...before, ...settings } });
        get().addAuditLog('UPDATE', 'EMAIL_SETTINGS', 'CONFIG', before, settings);
      },

      updateSeoSettings: (settings) => {
        const before = get().seoSettings;
        set({ seoSettings: { ...before, ...settings } });
        get().addAuditLog('UPDATE', 'SEO_SETTINGS', 'CONFIG', before, settings);
      },

      // USERS
      addUser: (user) => {
        const newUser = {
          ...user,
          id: `usr-admin-${Date.now()}`,
          status: 'active',
          lastLogin: 'Never',
        };
        set((state) => ({ users: [...state.users, newUser] }));
        get().addAuditLog('INVITE', 'USER', newUser.id, null, newUser);
        return newUser;
      },

      updateUserRole: (id, role) => {
        const before = get().users.find((u) => u.id === id);
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, role } : u)),
        }));
        get().addAuditLog('UPDATE_ROLE', 'USER', id, before, { role });
      },

      toggleUserStatus: (id) => {
        const target = get().users.find((u) => u.id === id);
        if (!target) return;
        const newStatus = target.status === 'active' ? 'inactive' : 'active';
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
        }));
        get().addAuditLog('TOGGLE_STATUS', 'USER', id, { status: target.status }, { status: newStatus });
      },

      deleteUser: (id) => {
        const target = get().users.find((u) => u.id === id);
        // Guard: Prevent deleting last SUPER_ADMIN
        const superAdmins = get().users.filter((u) => u.role === 'SUPER_ADMIN');
        if (target?.role === 'SUPER_ADMIN' && superAdmins.length <= 1) {
          throw new Error('Cannot delete the only remaining Super Admin');
        }
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
        get().addAuditLog('DELETE', 'USER', id, target, null);
      },

      // Reset CMS to defaults
      resetToDefaults: () => {
        set({
          products: INITIAL_PRODUCTS,
          categories: INITIAL_CATEGORIES,
          orders: INITIAL_ORDERS,
          returns: INITIAL_RETURNS,
          customers: INITIAL_CUSTOMERS,
          reviews: INITIAL_REVIEWS,
          coupons: INITIAL_COUPONS,
          announcement: INITIAL_ANNOUNCEMENT,
          homepageSections: INITIAL_HOMEPAGE_SECTIONS,
          popups: INITIAL_POPUPS,
          newsletters: INITIAL_NEWSLETTERS,
          pages: INITIAL_PAGES,
          testimonials: INITIAL_TESTIMONIALS,
          instagram: INITIAL_INSTAGRAM,
          shippingRules: INITIAL_SHIPPING_RULES,
          pincodes: INITIAL_PINCODES,
          storeSettings: INITIAL_STORE_SETTINGS,
          paymentSettings: INITIAL_PAYMENT_SETTINGS,
          emailSettings: INITIAL_EMAIL_SETTINGS,
          seoSettings: INITIAL_SEO_SETTINGS,
          users: INITIAL_USERS,
          auditLogs: INITIAL_AUDIT_LOGS,
        });
      }
    }),
    {
      name: 'zewar-cms-v1',
    }
  )
);
