import { useEffect, useState } from 'react';
import { readStoredAddress, writeStoredAddress } from '../utils/cart';

// Shipping address form state, persisted in localStorage.
export default function useShippingAddress() {
  const [shippingAddress, setShippingAddress] = useState(readStoredAddress);

  useEffect(() => {
    writeStoredAddress(shippingAddress);
  }, [shippingAddress]);

  const updateAddress = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { shippingAddress, updateAddress };
}
