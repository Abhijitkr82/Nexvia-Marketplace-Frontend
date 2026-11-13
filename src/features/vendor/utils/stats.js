
// Calculates overview statistics for the vendor dashboard.
export const calculateVendorStats = (products = [], orders = []) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeOrders = Array.isArray(orders) ? orders : [];

  return {
    totalStock: safeProducts.reduce(
      (total, product) =>
        total + (Number(product?.stock) || 0),
      0
    ),

    totalInventoryValue: safeProducts.reduce(
      (total, product) =>
        total +
        (Number(product?.price) || 0) *
          (Number(product?.stock) || 0),
      0
    ),

    pendingOrders: safeOrders.filter(
      (order) => order?.status === 'Pending'
    ).length,
  };
};
