import { useCmsStore } from './cmsStore';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminApi = {
  // Products
  async getProducts() {
    await delay();
    return useCmsStore.getState().products;
  },
  async getProduct(id) {
    await delay();
    const prod = useCmsStore.getState().products.find((p) => p.id === id);
    if (!prod) throw new Error('Product not found');
    return prod;
  },
  async createProduct(data) {
    await delay();
    return useCmsStore.getState().addProduct(data);
  },
  async updateProduct(id, data) {
    await delay();
    return useCmsStore.getState().updateProduct(id, data);
  },
  async deleteProduct(id) {
    await delay();
    useCmsStore.getState().deleteProduct(id);
    return { success: true };
  },

  // Categories
  async getCategories() {
    await delay();
    return useCmsStore.getState().categories;
  },
  async createCategory(data) {
    await delay();
    return useCmsStore.getState().addCategory(data);
  },
  async updateCategory(id, data) {
    await delay();
    return useCmsStore.getState().updateCategory(id, data);
  },
  async deleteCategory(id, reassignTo) {
    await delay();
    useCmsStore.getState().deleteCategory(id, reassignTo);
    return { success: true };
  },

  // Orders
  async getOrders() {
    await delay();
    return useCmsStore.getState().orders;
  },
  async getOrder(id) {
    await delay();
    const order = useCmsStore.getState().orders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },
  async updateOrderStatus(id, fulfillmentStatus, paymentStatus) {
    await delay();
    useCmsStore.getState().updateOrderStatus(id, fulfillmentStatus, paymentStatus);
    return useCmsStore.getState().orders.find((o) => o.id === id);
  },

  // Customers
  async getCustomers() {
    await delay();
    return useCmsStore.getState().customers;
  },
  async getCustomer(id) {
    await delay();
    const cust = useCmsStore.getState().customers.find((c) => c.id === id);
    if (!cust) throw new Error('Customer not found');
    return cust;
  },

  // Audit Logs
  async getAuditLogs() {
    await delay();
    return useCmsStore.getState().auditLogs;
  },
};
