
import { useCallback, useState } from 'react';

import useFlashMessage from '../hooks/useFlashMessage';
import useVendorAuth from '../hooks/useVendorAuth';
import useVendorProducts from '../hooks/useVendorProducts';
import useVendorOrders from '../hooks/useVendorOrders';
import useProductForm from '../hooks/useProductForm';
import useImageCarousel from '../hooks/useImageCarousel';
import { calculateVendorStats } from '../utils/stats';

import VendorHeader from '../components/layout/VendorHeader';
import VendorSidebar from '../components/layout/VendorSidebar';
import FlashMessage from '../components/layout/FlashMessage';
import OverviewTab from '../components/overview/OverviewTab';
import ProductsTab from '../components/products/ProductsTab';
import OrdersTab from '../components/orders/OrdersTab';
import ProductFormTab from '../components/product-form/ProductFormTab';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const {
    message,
    messageType,
    showMessage,
    clearMessage,
  } = useFlashMessage();

  const {
    token,
    navigate,
    handleAuthError,
    logout,
  } = useVendorAuth(showMessage);

  const shared = {
    token,
    navigate,
    handleAuthError,
    showMessage,
    clearMessage,
  };

  // Add / edit product form
  const productForm = useProductForm({
    ...shared,
    onSaved: async () => {
      await products.fetchProducts();
      setActiveTab('products');
    },
  });

  // Product deletion callback
  const handleProductDeleted = useCallback(
    (product) => {
      if (productForm.editingId === product._id) {
        productForm.resetForm();
      }
    },
    [productForm.editingId, productForm.resetForm]
  );

  // Product management
  const products = useVendorProducts({
    ...shared,
    onProductDeleted: handleProductDeleted,
  });

  // Order management
  const orders = useVendorOrders(shared);

  // Product image carousel
  const {
    imageIndexes,
    changeProductImage,
    selectProductImage,
  } = useImageCarousel();

  // Dashboard statistics
  const stats = calculateVendorStats(
    products.products,
    orders.orders
  );

  // Tab navigation
  const selectTab = (tab) => {
    setActiveTab(tab);
    clearMessage();

    if (tab === 'orders') {
      orders.fetchOrders();
    }
  };

  // Open orders
  const openOrders = () => {
    selectTab('orders');
  };

  // Open a fresh product form
  const openAddProduct = () => {
    productForm.resetForm();
    clearMessage();
    setActiveTab('add-product');
  };

  // Edit existing product
  const editProduct = (product) => {
    if (!product?._id) {
      showMessage('Invalid product. Please try again.', 'error');
      return;
    }

    productForm.startEditing(product);
    clearMessage();
    setActiveTab('add-product');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f9] font-sans">
      {/* Vendor Header */}
      <VendorHeader onLogout={logout} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <VendorSidebar
          activeTab={activeTab}
          onSelectTab={selectTab}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-5 md:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-7xl">

            {/* Flash Message */}
            {message && (
              <div className="mb-6">
                <FlashMessage
                  message={message}
                  type={messageType}
                />
              </div>
            )}

            {/* Overview */}
            {activeTab === 'overview' && (
              <OverviewTab
                products={products.products}
                loadingProducts={products.loadingProducts}
                stats={stats}
                onViewOrders={openOrders}
                onViewProducts={() => selectTab('products')}
              />
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <ProductsTab
                products={products.products}
                loadingProducts={products.loadingProducts}
                imageIndexes={imageIndexes}
                onRefresh={products.fetchProducts}
                onAddProduct={openAddProduct}
                onAddFirstProduct={openAddProduct}
                onEdit={editProduct}
                onDelete={products.handleDelete}
                onStepImage={changeProductImage}
                onSelectImage={selectProductImage}
              />
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <OrdersTab
                orders={orders.orders}
                loadingOrders={orders.loadingOrders}
                updatingOrderId={orders.updatingOrderId}
                onRefresh={orders.fetchOrders}
                onStatusChange={orders.handleOrderStatus}
              />
            )}

            {/* Add / Edit Product */}
            {activeTab === 'add-product' && (
              <ProductFormTab
                form={productForm.form}
                editingId={productForm.editingId}
                imagePreview={productForm.imagePreview}
                submitting={productForm.submitting}
                uploadingImage={productForm.uploadingImage}
                onFieldChange={productForm.updateField}
                onImageUpload={productForm.handleImageUpload}
                onRemoveImage={productForm.removeImage}
                onSubmit={productForm.handleSubmit}
                onCancelEdit={productForm.resetForm}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
