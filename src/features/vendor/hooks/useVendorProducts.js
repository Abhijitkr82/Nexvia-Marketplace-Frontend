
import { useCallback, useEffect, useState } from 'react';
import {
  deleteProduct,
  getMyProducts,
} from '../../../services/productService';

// Manages vendor products: fetching, refreshing and deleting.
export default function useVendorProducts({
  token,
  navigate,
  handleAuthError,
  showMessage,
  onProductDeleted,
}) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch vendor products
  const fetchProducts = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setLoadingProducts(true);

    try {
      const data = await getMyProducts(token);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(
          error.response?.data?.message ||
            'Unable to load your products.',
          'error'
        );
      }
    } finally {
      setLoadingProducts(false);
    }
  }, [token, navigate, handleAuthError, showMessage]);

  // Initial product loading
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Delete product
  const handleDelete = useCallback(
    async (product) => {
      if (!token) {
        navigate('/login');
        return;
      }

      if (!product?._id) {
        showMessage('Invalid product. Please try again.', 'error');
        return;
      }

      const confirmed = window.confirm(
        `Delete "${product.title || 'this product'}"? This action cannot be undone.`
      );

      if (!confirmed) return;

      try {
        await deleteProduct(product._id, token);

        setProducts((previous) =>
          previous.filter((item) => item._id !== product._id)
        );

        onProductDeleted?.(product);

        showMessage('Product deleted successfully!');
      } catch (error) {
        if (!handleAuthError(error)) {
          showMessage(
            error.response?.data?.message ||
              'Failed to delete product.',
            'error'
          );
        }
      }
    },
    [token, navigate, handleAuthError, showMessage, onProductDeleted]
  );

  return {
    products,
    loadingProducts,
    fetchProducts,
    handleDelete,
  };
}
