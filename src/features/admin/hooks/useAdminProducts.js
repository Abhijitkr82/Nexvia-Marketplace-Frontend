import { useState } from 'react';
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../../services/adminService';
import { getToken } from '../../../utils/authStorage';
import { filterProducts } from '../utils/filters';

// Marketplace products: list, search, edit and delete.
//
// refreshStats – re-fetches the dashboard statistics after a change
export default function useAdminProducts(checkAdmin, refreshStats) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [productActionMessage, setProductActionMessage] = useState('');

  const fetchProducts = async () => {
    if (!checkAdmin()) return;

    setProductsLoading(true);
    setProductsError('');

    try {
      const data = await getProducts(getToken());

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      setProductsError(err.message || 'Unable to fetch products.');
    } finally {
      setProductsLoading(false);
    }
  };

  // Opens the edit form with string values for the inputs.
  const startEditing = (product) => {
    setProductActionMessage('');
    setEditingProduct({
      _id: product._id,
      title: product.title || '',
      description: product.description || '',
      price: String(product.price ?? 0),
      category: product.category || '',
      stock: String(product.stock ?? 0),
    });
  };

  const updateEditingField = (field, value) => {
    setEditingProduct((current) => ({ ...current, [field]: value }));
  };

  const cancelEditing = () => setEditingProduct(null);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editingProduct || !checkAdmin()) return;

    setSavingProduct(true);
    setProductActionMessage('');

    try {
      await updateProduct(
        editingProduct._id,
        {
          title: editingProduct.title,
          description: editingProduct.description,
          price: editingProduct.price,
          category: editingProduct.category,
          stock: editingProduct.stock,
        },
        getToken(),
      );

      setProductActionMessage('Product updated successfully!');
      setEditingProduct(null);

      await Promise.all([fetchProducts(), refreshStats()]);
    } catch (err) {
      setProductActionMessage(err.message || 'Unable to update product.');
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!checkAdmin()) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingProductId(product._id);
    setProductActionMessage('');

    try {
      await deleteProduct(product._id, getToken());

      if (editingProduct?._id === product._id) {
        setEditingProduct(null);
      }

      setProductActionMessage('Product deleted successfully!');

      await Promise.all([fetchProducts(), refreshStats()]);
    } catch (err) {
      setProductActionMessage(err.message || 'Unable to delete product.');
    } finally {
      setDeletingProductId(null);
    }
  };

  return {
    products,
    filteredProducts: filterProducts(products, productSearch),
    productsLoading,
    productsError,
    productSearch,
    setProductSearch,
    editingProduct,
    savingProduct,
    deletingProductId,
    productActionMessage,
    fetchProducts,
    startEditing,
    updateEditingField,
    cancelEditing,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
