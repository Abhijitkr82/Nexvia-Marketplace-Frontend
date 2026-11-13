// Shared display formatters.

// "₹ 1,299" – used by the customer storefront.
export const formatPrice = (price) =>
  `₹ ${(Number(price) || 0).toLocaleString('en-IN')}`;

// "₹1,299.00" – Intl currency format used by the vendor portal.
export const formatCurrencyINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

// "₹1,299" – compact rupee format used by the admin tables.
export const formatRupees = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN')}`;

// "3 Nov 2026, 12:45 am" with a customer-friendly fallback.
export const formatDateTime = (date) => {
  if (!date) return 'Date unavailable';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date unavailable';
  }

  return parsedDate.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

// "03 Nov 2026" with an em-dash fallback (admin tables).
export const formatShortDate = (date) => {
  if (!date) return '—';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '—';

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Plain locale date-time / date (no validation, as in the original vendor and review UIs).
export const formatLocaleDateTime = (date) =>
  new Date(date).toLocaleString('en-IN');

export const formatLocaleDate = (date) =>
  new Date(date).toLocaleDateString('en-IN');

// "street, city, state, zip, country" or a fallback text.
export const formatAddress = (address) =>
  [
    address?.street,
    address?.city,
    address?.state,
    address?.zipCode,
    address?.country,
  ]
    .filter(Boolean)
    .join(', ') || 'Address unavailable';
