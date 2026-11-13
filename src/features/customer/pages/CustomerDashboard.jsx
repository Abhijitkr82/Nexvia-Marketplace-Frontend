
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLogout from '../../../hooks/useLogout';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import useCartDrawer from '../hooks/useCartDrawer';
import useShippingAddress from '../hooks/useShippingAddress';
import useCoupon from '../hooks/useCoupon';
import useOrders from '../hooks/useOrders';
import useCheckout from '../hooks/useCheckout';

import { calculateFinalTotal } from '../utils/cart';
import { getCategories } from '../utils/products';

import CustomerHeader from '../components/layout/CustomerHeader';
import HeroSection from '../components/layout/HeroSection';
import CategoryFilters from '../components/products/CategoryFilters';
import ProductGridHeader from '../components/products/ProductGridHeader';
import ProductGrid from '../components/products/ProductGrid';
import OrderHistory from '../components/orders/OrderHistory';
import CartDrawer from '../components/cart/CartDrawer';
import ProductReviews from '../components/reviews/ProductReviews';

const scrollToProducts = () => {
  document
    .getElementById('product-grid')
    ?.scrollIntoView({ behavior: 'smooth' });
};

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const handleLogout = useLogout({ keepRole: true });

  // Storefront filters
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Data + business logic
  const { products, loading, error } = useProducts(
    searchQuery,
    selectedCategory,
  );

  const drawer = useCartDrawer();

  const {
    cart,
    cartCount,
    totalPrice,
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    getStockLimit,
    emptyCart,
    clearServerCartSafely,
  } = useCart({ products, onSyncError: drawer.setOrderMessage });

  const { shippingAddress, updateAddress } = useShippingAddress();
  const coupon = useCoupon({ cart, navigate });
  const orders = useOrders({ navigate });

  const checkout = useCheckout({
    cart,
    shippingAddress,
    appliedCoupon: coupon.appliedCoupon,
    navigate,
    onOrderPlaced: () => {
      emptyCart();
      coupon.resetCoupon();
    },
    clearServerCart: clearServerCartSafely,
    fetchMyOrders: orders.fetchMyOrders,
    drawer,
  });

  const finalTotal = calculateFinalTotal(totalPrice, coupon.appliedCoupon);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans text-slate-800">
      <CustomerHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showOrders={orders.showOrders}
        onToggleOrders={orders.toggleOrders}
        onOpenCart={drawer.openCart}
        cartCount={cartCount}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        {!orders.showOrders && (
          <>
            <HeroSection onExplore={scrollToProducts} />

            <CategoryFilters
              categories={getCategories(products)}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <ProductGridHeader productCount={products.length} />

            <ProductGrid
              products={products}
              cart={cart}
              loading={loading}
              error={error}
              onAddToCart={addToCart}
              onViewDetails={setSelectedProduct}
              onClearFilters={clearFilters}
            />
          </>
        )}

        {orders.showOrders && (
          <OrderHistory
            orders={orders.orders}
            ordersLoading={orders.ordersLoading}
            ordersError={orders.ordersError}
            ordersActionMessage={orders.ordersActionMessage}
            cancellingOrderId={orders.cancellingOrderId}
            onRefresh={orders.fetchMyOrders}
            onCancel={orders.handleCancelOrder}
            onStartShopping={() => {
              orders.setShowOrders(false);
              scrollToProducts();
            }}
          />
        )}

        {/* Product Details and Reviews */}
        {selectedProduct && (
          <ProductReviews
            product={selectedProduct}
            productId={selectedProduct._id}
            productTitle={selectedProduct.title}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>

      {drawer.isCartOpen && (
        <CartDrawer
          onClose={drawer.closeCart}
          orderMessage={drawer.orderMessage}
          cart={cart}
          cartCount={cartCount}
          getStockLimit={getStockLimit}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          onRemove={removeItem}
          shippingAddress={shippingAddress}
          onAddressChange={updateAddress}
          coupon={coupon}
          checkout={checkout}
          totalPrice={totalPrice}
          finalTotal={finalTotal}
        />
      )}
    </div>
  );
}
