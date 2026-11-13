import { useState } from 'react';
import { cancelOrder, getMyOrders } from '../../../services/orderService';
import { getToken } from '../../../utils/authStorage';

// Customer order history: loading, refreshing and cancelling orders.
export default function useOrders({ navigate }) {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [showOrders, setShowOrders] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [ordersActionMessage, setOrdersActionMessage] = useState('');

  const fetchMyOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    setShowOrders(true);

    try {
      const token = getToken();

      if (!token) {
        navigate('/login');
        return;
      }

      const data = await getMyOrders(token);

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setOrdersError(
        err.response?.data?.message ||
          'Failed to load your orders. Please try again.',
      );
    } finally {
      setOrdersLoading(false);
    }
  };

  const toggleOrders = () => {
    if (showOrders) setShowOrders(false);
    else fetchMyOrders();
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this order?',
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    setCancellingOrderId(orderId);
    setOrdersActionMessage('');
    setOrdersError('');

    try {
      const data = await cancelOrder(orderId, 'Cancelled by customer', token);

      setOrdersActionMessage(data?.message || 'Order cancelled successfully.');

      const updatedOrders = await getMyOrders(token);

      setOrders(Array.isArray(updatedOrders) ? updatedOrders : []);
    } catch (err) {
      setOrdersActionMessage(
        err.response?.data?.message ||
          'Unable to cancel order. Please try again.',
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  return {
    orders,
    ordersLoading,
    ordersError,
    showOrders,
    setShowOrders,
    cancellingOrderId,
    ordersActionMessage,
    fetchMyOrders,
    toggleOrders,
    handleCancelOrder,
  };
}
