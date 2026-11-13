// Builds the axios request config that carries the JWT.
export const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});
