import { useEffect, useRef, useState } from 'react';
import {
  clearCart as clearServerCart,
  getCart,
  saveCart,
} from '../../../services/cartService';
import { getToken } from '../../../utils/authStorage';
import {
  calculateCartCount,
  calculateCartTotal,
  extractCartItems,
  readStoredCart,
  toMigratableCartItems,
  toServerCartItems,
  writeStoredCart,
} from '../utils/cart';

// Owns the shopping cart: local persistence, server (Redis) sync, migration of
// a locally stored cart on first login, and quantity helpers.
//
// `products`    – currently listed products (used for the stock limit)
// `onSyncError` – called with a message when the initial server sync fails
export default function useCart({ products, onSyncError }) {
  const [cart, setCart] = useState(readStoredCart);
  const [cartReady, setCartReady] = useState(false);

  const onSyncErrorRef = useRef(onSyncError);

  useEffect(() => {
    onSyncErrorRef.current = onSyncError;
  });

  // Load cart from the server and migrate the local cart if needed
  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      const token = getToken();

      if (!token) {
        setCartReady(false);
        return;
      }

      try {
        const serverCart = extractCartItems(await getCart(token));

        if (!serverCart) {
          throw new Error('Unexpected cart response from server.');
        }

        if (cancelled) return;

        if (serverCart.length > 0) {
          setCart(serverCart);
        } else {
          const items = toMigratableCartItems(readStoredCart());

          if (items.length > 0) {
            const migratedCart = extractCartItems(await saveCart(items, token));

            if (!migratedCart) {
              throw new Error('Unexpected migrated cart response.');
            }

            if (cancelled) return;
            setCart(migratedCart);
          } else {
            setCart([]);
          }
        }

        setCartReady(true);
      } catch (err) {
        console.error('Redis cart loading failed:', err);
        if (!cancelled) {
          setCartReady(false);
          onSyncErrorRef.current?.(
            'Cart could not sync with the server. Please refresh and try again.',
          );
        }
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist locally and (debounced) sync to the server
  useEffect(() => {
    writeStoredCart(cart);

    if (!cartReady) return;

    const token = getToken();
    if (!token) return;

    const timer = setTimeout(async () => {
      try {
        await saveCart(toServerCartItems(cart), token);
      } catch (err) {
        console.error('Redis cart sync failed:', err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [cart, cartReady]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      if (existing) {
        if (existing.quantity >= Number(product.stock)) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (Number(product.stock) <= 0) return prevCart;

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Decreases quantity by one; removes the item when it reaches zero.
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const getStockLimit = (item) =>
    products.find((p) => p._id === item._id)?.stock ?? item.stock;

  const increaseQuantity = (item) => {
    const product = products.find((p) => p._id === item._id) || item;

    if (Number(item.quantity) >= Number(product.stock)) return;

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  const emptyCart = () => setCart([]);

  // Clears the server-side cart; failures are logged and ignored.
  const clearServerCartSafely = async (token, label = '') => {
    try {
      await clearServerCart(token);
    } catch (cartError) {
      console.error(`Could not clear Redis cart${label}:`, cartError);
    }
  };

  return {
    cart,
    cartCount: calculateCartCount(cart),
    totalPrice: calculateCartTotal(cart),
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    getStockLimit,
    emptyCart,
    clearServerCartSafely,
  };
}
