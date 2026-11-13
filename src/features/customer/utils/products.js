// Unique product categories (with a leading "All") for the filter chips.
export const getCategories = (products) => [
  'All',
  ...new Set(products.map((product) => product.category).filter(Boolean)),
];

// The search API may return `id` instead of `_id`.
export const normalizeProducts = (data) =>
  Array.isArray(data?.products)
    ? data.products.map((product) => ({
        ...product,
        _id: product._id || product.id,
      }))
    : [];
