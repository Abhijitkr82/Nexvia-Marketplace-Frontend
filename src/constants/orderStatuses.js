// Statuses a vendor may set on an order.
export const VENDOR_ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
];

// Statuses an admin may set on an order.
export const ADMIN_ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
];

// Statuses in which a customer is still allowed to cancel an order.
export const CUSTOMER_CANCELLABLE_STATUSES = ['Pending', 'Processing'];
