
import { API_BASE_URL } from '../config/api';

const COUPON_API = `${API_BASE_URL}/coupons`;

async function couponRequest(path = '', { token, method = 'GET', body } = {}) {
  const response = await fetch(`${COUPON_API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Coupon request failed.');
  }

  return data;
}

export function getCoupons(token) {
  return couponRequest('', { token });
}

export function createCoupon(couponData, token) {
  return couponRequest('', {
    token,
    method: 'POST',
    body: couponData,
  });
}

export function updateCoupon(couponId, couponData, token) {
  return couponRequest(`/${couponId}`, {
    token,
    method: 'PATCH',
    body: couponData,
  });
}

export function deactivateCoupon(couponId, token) {
  return couponRequest(`/${couponId}`, {
    token,
    method: 'DELETE',
  });
}
