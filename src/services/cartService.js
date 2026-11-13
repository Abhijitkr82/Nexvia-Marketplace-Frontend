import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { authConfig } from '../utils/http';

export const getCart = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/cart`, authConfig(token));
  return response.data;
};

// Replaces the server cart. `items` = [{ productId, quantity }]
export const saveCart = async (items, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/cart`,
    { items },
    authConfig(token),
  );
  return response.data;
};

export const clearCart = async (token) => {
  const response = await axios.delete(
    `${API_BASE_URL}/cart`,
    authConfig(token),
  );
  return response.data;
};
