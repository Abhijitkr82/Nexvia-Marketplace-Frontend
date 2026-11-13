import { TOKEN_KEY, ROLE_KEY } from '../constants/storageKeys';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const setSession = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

// Removes only the JWT (used by the customer logout, as in the original app).
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Removes the JWT and the stored role.
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};
