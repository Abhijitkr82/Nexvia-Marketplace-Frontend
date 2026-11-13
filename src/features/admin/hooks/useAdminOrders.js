import { useState } from 'react';
import { getOrders, updateOrderStatus } from '../../../services/adminService';
import { getToken } from '../../../utils/authStorage';
import { filterOrders } from '../utils/filters';

// Marketplace orders: list, search and status updates.
export default function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusChanges, setOrderStatusChanges] = useState({});
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [orderStatusMessage, setOrderStatusMessage] = useState('');

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');

    try {
      const data = await getOrders(getToken());

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setOrdersError(err.message || 'Unable to fetch orders.');
    } finally {
      setOrdersLoading(false);
    }
  };

  // Remembers the status chosen in an order's dropdown (not yet saved).
  const selectOrderStatus = (orderId, status) => {
    setOrderStatusChanges((previous) => ({
      ...previous,
      [orderId]: status,
    }));
  };

  const updateStatus = async (order) => {
    const newStatus =
      orderStatusChanges[order._id] || order.status || 'Pending';

    if (newStatus === order.status) {
      setOrderStatusMessage('Please select a different status.');
      return;
    }

    setUpdatingOrderId(order._id);
    setOrderStatusMessage('');

    try {
      const data = await updateOrderStatus(order._id, newStatus, getToken());

      setOrders((previousOrders) =>
        previousOrders.map((item) =>
          item._id === order._id
            ? { ...item, status: data.order.status }
            : item,
        ),
      );

      setOrderStatusChanges((previous) => {
        const updated = { ...previous };
        delete updated[order._id];
        return updated;
      });

      setOrderStatusMessage(`Order status updated to ${data.order.status}.`);
    } catch (error) {
      console.error('Update order status error:', error);
      setOrderStatusMessage(error.message || 'Unable to update order status.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return {
    orders,
    filteredOrders: filterOrders(orders, orderSearch),
    ordersLoading,
    ordersError,
    orderSearch,
    setOrderSearch,
    orderStatusChanges,
    updatingOrderId,
    orderStatusMessage,
    fetchOrders,
    selectOrderStatus,
    updateStatus,
  };
}
