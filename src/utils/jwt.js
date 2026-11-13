// Decodes the payload of a JWT (no signature verification – display logic only).
export const decodeJwtPayload = (token) =>
  JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
