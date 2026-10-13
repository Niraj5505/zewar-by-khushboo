import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../lib/api';

export const ADMIN_QUERY_KEYS = {
  PRODUCTS: ['admin', 'products'],
  PRODUCT_DETAIL: (id) => ['admin', 'products', id],
  CATEGORIES: ['admin', 'categories'],
  ORDERS: ['admin', 'orders'],
  ORDER_DETAIL: (id) => ['admin', 'orders', id],
  CUSTOMERS: ['admin', 'customers'],
  CUSTOMER_DETAIL: (id) => ['admin', 'customers', id],
  AUDIT_LOGS: ['admin', 'audit-logs'],
};

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.PRODUCTS,
    queryFn: () => adminApi.getProducts(),
  });
};

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.CATEGORIES,
    queryFn: () => adminApi.getCategories(),
  });
};

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ORDERS,
    queryFn: () => adminApi.getOrders(),
  });
};

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.CUSTOMERS,
    queryFn: () => adminApi.getCustomers(),
  });
};
