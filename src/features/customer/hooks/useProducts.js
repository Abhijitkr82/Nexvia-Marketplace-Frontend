import { useEffect, useState } from 'react';
import { searchProducts } from '../../../services/productService';
import { normalizeProducts } from '../utils/products';

// Loads storefront products, re-querying (debounced 300 ms) whenever the
// search text or selected category changes.
export default function useProducts(searchQuery, selectedCategory) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const params = {};

        if (searchQuery.trim()) params.q = searchQuery.trim();
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }

        const data = await searchProducts(params);

        if (!active) return;

        setProducts(normalizeProducts(data));
      } catch (err) {
        if (!active) return;
        setError(
          err.response?.data?.message ||
            'Failed to load products. Please check your connection.',
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCategory]);

  return { products, loading, error };
}
