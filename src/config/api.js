// Central API configuration.
// The default matches the backend URL used by the original project.
// Set VITE_API_URL in a .env file to point the frontend at another backend.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AUTH_API = `${API_BASE_URL}/auth`;
export const ADMIN_API = `${API_BASE_URL}/admin`;

export const RAZORPAY_CHECKOUT_SCRIPT =
  'https://checkout.razorpay.com/v1/checkout.js';
