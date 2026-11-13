
import ProductCard from './ProductCard';
import ProductGridSkeleton from './ProductGridSkeleton';
import ProductsError from './ProductsError';
import NoProductsFound from './NoProductsFound';

// Product listing with loading, error and empty states.
export default function ProductGrid({
  products,
  cart,
  loading,
  error,
  onAddToCart,
  onViewDetails,
  onClearFilters,
}) {
  if (loading) return <ProductGridSkeleton />;

  if (error) return <ProductsError message={error} />;

  if (products.length === 0) {
    return <NoProductsFound onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => {
        const cartItem = cart.find(
          (item) => item._id === product._id
        );

        return (
          <div key={product._id} className="min-w-0">
            <ProductCard
              product={product}
              quantityInCart={cartItem?.quantity || 0}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          </div>
        );
      })}
    </div>
  );
}
