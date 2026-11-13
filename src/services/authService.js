import axios from 'axios';
import { AUTH_API } from '../config/api';
import { authConfig } from '../utils/http';

export const login = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);
  return response.data;
};

export const register = async (details) => {
  const response = await axios.post(`${AUTH_API}/register`, details);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${AUTH_API}/profile`, authConfig(token));
  return response.data;
};

export const updateProfile = async (profile, token) => {
  const response = await axios.put(
    `${AUTH_API}/profile`,
    profile,
    authConfig(token),
  );
  return response.data;
};
