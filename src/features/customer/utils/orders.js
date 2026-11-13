// Tailwind classes for an order status pill.
export const getOrderStatusClass = (status) => {
  switch ((status || 'Pending').toLowerCase()) {
    case 'delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'shipped':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'processing':
      return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    case 'cancelled':
      return 'bg-red-50 text-red-700 border-red-100';
    default:
      return 'bg-amber-50 text-amber-700 border-amber-100';
  }
};

// Line price of one order item.
export const getOrderItemTotal = (item, product) =>
  (Number(item.price ?? product.price) || 0) * (Number(item.quantity) || 1);

// Order total, falling back to summing line items when the API gives none.
export const getOrderAmount = (order) => {
  const orderProducts = Array.isArray(order.products) ? order.products : [];

  return (
    order.totalAmount ??
    order.totalPrice ??
    order.total ??
    orderProducts.reduce((sum, item) => {
      const product = item.product || item;
      return sum + getOrderItemTotal(item, product);
    }, 0)
  );
};
