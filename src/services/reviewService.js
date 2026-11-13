import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { authConfig } from '../utils/http';

export const getProductReviews = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${productId}`);
  return response.data;
};

export const submitReview = async (payload, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/reviews`,
    payload,
    authConfig(token),
  );
  return response.data;
};
