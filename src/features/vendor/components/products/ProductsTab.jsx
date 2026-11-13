
import { Package } from 'lucide-react';
import ProductsHeader from './ProductsHeader';
import NoProducts from './NoProducts';
import VendorProductCard from './VendorProductCard';

export default function ProductsTab({
  products,
  loadingProducts,
  imageIndexes,
  onRefresh,
  onAddProduct,
  onAddFirstProduct,
  onEdit,
  onDelete,
  onStepImage,
  onSelectImage,
}) {
  return (
    <section className="space-y-6">
      <ProductsHeader
        onRefresh={onRefresh}
        onAddProduct={onAddProduct}
      />

      {loadingProducts ? (
        <div
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3"
          aria-label="Loading products"
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-100" />

              <div className="mt-5 space-y-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                <div className="flex items-center justify-between pt-3">
                  <div className="h-6 w-24 animate-pulse rounded bg-slate-100" />
                  <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <NoProducts onAddProduct={onAddFirstProduct} />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Package size={17} className="text-[#a17a3d]" />
            <span>
              Showing{' '}
              <span className="font-semibold text-[#101b35]">
                {products.length}
              </span>{' '}
              {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {products.map((product) => (
              <VendorProductCard
                key={product._id}
                product={product}
                currentIndex={imageIndexes[product._id] || 0}
                onStepImage={onStepImage}
                onSelectImage={onSelectImage}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
