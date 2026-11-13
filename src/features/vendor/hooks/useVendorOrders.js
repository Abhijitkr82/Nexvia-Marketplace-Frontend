import { useCallback, useState } from 'react';
import {
  getVendorOrders,
  updateVendorOrderStatus,
} from '../../../services/orderService';
import { VENDOR_ORDER_STATUSES } from '../../../constants/orderStatuses';

// Manages vendor orders and individual product fulfillment updates.
export default function useVendorOrders({
  token,
  navigate,
  handleAuthError,
  showMessage,
  clearMessage,
}) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setLoadingOrders(true);

    try {
      const data = await getVendorOrders(token);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(
          error.response?.data?.message || 'Unable to load vendor orders.',
          'error',
        );
      }
    } finally {
      setLoadingOrders(false);
    }
  }, [token, navigate, handleAuthError, showMessage]);

  const handleOrderStatus = useCallback(
    async (orderId, productId, status) => {
      if (!token) {
        navigate('/login');
        return;
      }

      if (updatingOrderId !== null) return;

      if (!orderId || !productId || !status) {
        showMessage('Invalid product status update request.', 'error');
        return;
      }

      const selectedOrder = orders.find((order) => order._id === orderId);

      if (!selectedOrder) {
        showMessage('Order not found. Refresh and try again.', 'error');
        return;
      }

      if (selectedOrder.status === 'Cancelled') {
        showMessage('Cancelled orders cannot be updated.', 'error');
        return;
      }

      const selectedItem = (selectedOrder.products || []).find((item) => {
        const id = item.product?._id || item.product;
        return String(id) === String(productId);
      });

      if (!selectedItem) {
        showMessage('This product is not part of the selected order.', 'error');
        return;
      }

      const currentStatus = selectedItem.fulfillmentStatus || 'Pending';
      const allowedTransitions = {
        Pending: ['Processing'],
        Processing: ['Shipped'],
        Shipped: ['Delivered'],
        Delivered: [],
        Cancelled: [],
      };

      if (
        !VENDOR_ORDER_STATUSES.includes(status) ||
        !(allowedTransitions[currentStatus] || []).includes(status)
      ) {
        showMessage('This product status transition is not allowed.', 'error');
        return;
      }

      setUpdatingOrderId(orderId);
      clearMessage();

      try {
        await updateVendorOrderStatus(orderId, status, token, productId);
        await fetchOrders();
        showMessage('Product fulfillment status updated successfully!');
      } catch (error) {
        if (!handleAuthError(error)) {
          showMessage(
            error.response?.data?.message ||
              'Unable to update product fulfillment status.',
            'error',
          );
        }
      } finally {
        setUpdatingOrderId(null);
      }
    },
    [
      token,
      navigate,
      updatingOrderId,
      orders,
      clearMessage,
      handleAuthError,
      showMessage,
      fetchOrders,
    ],
  );

  return {
    orders,
    loadingOrders,
    updatingOrderId,
    fetchOrders,
    handleOrderStatus,
  };
}
