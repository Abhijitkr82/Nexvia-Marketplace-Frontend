import { useState } from 'react';

// Open/closed state of the cart drawer and its status banner.
export default function useCartDrawer() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const openCart = () => {
    setOrderMessage('');
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  return {
    isCartOpen,
    setIsCartOpen,
    orderMessage,
    setOrderMessage,
    openCart,
    closeCart,
  };
}
