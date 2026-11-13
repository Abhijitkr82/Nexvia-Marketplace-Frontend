import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { authConfig } from '../utils/http';

// ---- Customer ----

export const getMyOrders = async (token) => {
  const response = await axios.get(
    `${API_BASE_URL}/orders/my-orders`,
    authConfig(token),
  );
  return response.data;
};

export const cancelOrder = async (orderId, reason, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/orders/${orderId}/cancel`,
    { reason },
    authConfig(token),
  );
  return response.data;
};

// ---- Vendor ----

export const getVendorOrders = async (token) => {
  const response = await axios.get(
    `${API_BASE_URL}/orders/vendor-orders`,
    authConfig(token),
  );
  return response.data;
};

export const updateVendorOrderStatus = async (
  orderId,
  status,
  token,
  productId,
) => {
  const response = await axios.put(
    `${API_BASE_URL}/orders/${orderId}/status`,
    { status, productId },
    authConfig(token),
  );
  return response.data;
};
