import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { authConfig } from '../utils/http';

// ---- Public storefront ----

export const searchProducts = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/search`, { params });
  return response.data;
};

// ---- Vendor product management ----

export const getMyProducts = async (token) => {
  const response = await axios.get(
    `${API_BASE_URL}/products/mine`,
    authConfig(token),
  );
  return response.data;
};

export const addProduct = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/products/add`,
    payload,
    authConfig(token),
  );
  return response.data;
};

export const updateProduct = async (productId, payload, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/products/${productId}`,
    payload,
    authConfig(token),
  );
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await axios.delete(
    `${API_BASE_URL}/products/${productId}`,
    authConfig(token),
  );
  return response.data;
};

// Uploads one product image (multipart) and returns { imageKey, imageUrl }.
export const uploadProductImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(
    `${API_BASE_URL}/uploads/product-image`,
    formData,
    authConfig(token),
  );
  return response.data;
};
