import { ADMIN_API } from '../config/api';

// The admin API client intentionally keeps using fetch() so its error
// behaviour (Error(message) from the JSON body) is identical to the original.
const adminRequest = async (
  path,
  { token, method = 'GET', body, fallbackMessage },
) => {
  const headers = { Authorization: `Bearer ${token}` };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${ADMIN_API}${path}`, {
    method,
    headers,
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        (typeof fallbackMessage === 'function'
          ? fallbackMessage(response)
          : fallbackMessage),
    );
  }

  return data;
};

export const getStats = (token) =>
  adminRequest('/stats', {
    token,
    fallbackMessage: 'Unable to load statistics.',
  });

export const getUsers = (token) =>
  adminRequest('/users', { token, fallbackMessage: 'Unable to load users.' });

export const getVendors = (token) =>
  adminRequest('/vendors', {
    token,
    fallbackMessage: 'Unable to load vendors.',
  });

export const updateVendorStatus = (vendorId, status, token) =>
  adminRequest(`/vendors/${vendorId}/status`, {
    token,
    method: 'PUT',
    body: { status },
    fallbackMessage: `Unable to ${
      status === 'approved' ? 'approve' : 'reject'
    } vendor.`,
  });

export const getProducts = (token) =>
  adminRequest('/products', {
    token,
    fallbackMessage: 'Unable to load products.',
  });

export const updateProduct = (productId, fields, token) =>
  adminRequest(`/products/${productId}`, {
    token,
    method: 'PUT',
    body: fields,
    fallbackMessage: 'Unable to update product.',
  });

export const deleteProduct = (productId, token) =>
  adminRequest(`/products/${productId}`, {
    token,
    method: 'DELETE',
    fallbackMessage: 'Unable to delete product.',
  });

export const getOrders = (token) =>
  adminRequest('/orders', {
    token,
    fallbackMessage: (response) => `Request failed: ${response.status}`,
  });

export const updateOrderStatus = (orderId, status, token) =>
  adminRequest(`/orders/${orderId}/status`, {
    token,
    method: 'PUT',
    body: { status },
    fallbackMessage: 'Unable to update order status.',
  });
