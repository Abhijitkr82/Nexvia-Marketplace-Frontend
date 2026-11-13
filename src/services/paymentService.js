import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { authConfig } from '../utils/http';

export const validateCoupon = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/payments/validate-coupon`,
    payload,
    authConfig(token),
  );
  return response.data;
};

export const createCodOrder = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/payments/cod-order`,
    payload,
    authConfig(token),
  );
  return response.data;
};

export const createRazorpayOrder = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/payments/create-order`,
    payload,
    authConfig(token),
  );
  return response.data;
};

export const verifyPayment = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/payments/verify`,
    payload,
    authConfig(token),
  );
  return response.data;
};
