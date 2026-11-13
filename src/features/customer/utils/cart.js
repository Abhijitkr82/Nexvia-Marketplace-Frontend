import { CART_KEY, SHIPPING_ADDRESS_KEY } from '../../../constants/storageKeys';

export const EMPTY_ADDRESS = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
};

// ---- localStorage helpers ----

export const readStoredCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeStoredCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const readStoredAddress = () => {
  try {
    const saved = localStorage.getItem(SHIPPING_ADDRESS_KEY);
    return saved ? { ...EMPTY_ADDRESS, ...JSON.parse(saved) } : EMPTY_ADDRESS;
  } catch {
    return EMPTY_ADDRESS;
  }
};

export const writeStoredAddress = (address) => {
  localStorage.setItem(SHIPPING_ADDRESS_KEY, JSON.stringify(address));
};

// ---- Server cart payload helpers ----

// The cart endpoint may answer with an array or { items: [...] }.
export const extractCartItems = (data) =>
  Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : null;

// [{ productId, quantity }] – body of PUT /cart
export const toServerCartItems = (cart) =>
  cart.map((item) => ({
    productId: String(item._id),
    quantity: Number(item.quantity),
  }));

// Local cart entries that are valid enough to be migrated to the server.
export const toMigratableCartItems = (cart) =>
  toServerCartItems(
    cart.filter((item) => item._id && Number(item.quantity) > 0),
  );

// [{ product, quantity }] – body of coupon / order requests
export const toOrderProducts = (cart, { coerceQuantity = false } = {}) =>
  cart.map((item) => ({
    product: item._id,
    quantity: coerceQuantity ? Number(item.quantity) : item.quantity,
  }));

// ---- Totals ----

export const calculateCartTotal = (cart) =>
  cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
    0,
  );

export const calculateCartCount = (cart) =>
  cart.reduce((total, item) => total + Number(item.quantity || 0), 0);

export const calculateFinalTotal = (totalPrice, appliedCoupon) =>
  Math.max(0, totalPrice - (appliedCoupon?.discount || 0));
