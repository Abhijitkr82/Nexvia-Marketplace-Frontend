const getObjectField = (value, field) =>
  typeof value === 'object' ? value?.[field] || '' : '';

export const filterUsers = (users, searchTerm, roleFilter) => {
  const query = searchTerm.trim().toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      (user.name || '').toLowerCase().includes(query) ||
      (user.email || '').toLowerCase().includes(query);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });
};

export const filterVendors = (vendors, vendorSearch) => {
  const query = vendorSearch.trim().toLowerCase();

  return vendors.filter(
    (vendor) =>
      (vendor.name || '').toLowerCase().includes(query) ||
      (vendor.email || '').toLowerCase().includes(query) ||
      (vendor.phone || '').toLowerCase().includes(query),
  );
};

export const filterProducts = (products, productSearch) => {
  const query = productSearch.trim().toLowerCase();

  return products.filter((product) => {
    const vendorName = getObjectField(product.vendor, 'name');

    return (
      (product.title || '').toLowerCase().includes(query) ||
      (product.category || '').toLowerCase().includes(query) ||
      vendorName.toLowerCase().includes(query)
    );
  });
};

export const filterOrders = (orders, orderSearch) => {
  const query = orderSearch.trim().toLowerCase();

  return orders.filter((order) => {
    const customerName = getObjectField(order.customer, 'name');
    const customerEmail = getObjectField(order.customer, 'email');

    return [customerName, customerEmail, order.status]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });
};
