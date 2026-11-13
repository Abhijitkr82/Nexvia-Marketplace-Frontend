
import { Package, ArrowRight, Boxes } from 'lucide-react';
import { formatCurrencyINR } from '../../../../utils/formatters';

export default function RecentProducts({
  products = [],
  loadingProducts = false,
  onViewAll,
}) {
  const safeProducts = Array.isArray(products) ? products : [];
  const recentProducts = safeProducts.slice(0, 3);

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Package size={18} className="text-[#a17a3d]" />
            <h3 className="text-lg font-bold text-[#101b35]">
              Recent Products
            </h3>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Your latest product listings
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          disabled={!onViewAll}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#a17a3d] transition hover:bg-[#fbf8f0] hover:text-[#765a2d] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Product List */}
      <div className="px-5 sm:px-6">
        {loadingProducts ? (
          <div
            className="divide-y divide-slate-100"
            aria-label="Loading products"
            aria-busy="true"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : recentProducts.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentProducts.map((product, index) => {
              const stock = Number(product.stock) || 0;
              const price = Number(product.price) || 0;

              return (
                <div
                  key={product._id || index}
                  className="flex flex-col gap-3 py-5 transition-colors hover:bg-[#fbf8f0]/40 sm:flex-row sm:items-center sm:justify-between sm:px-2"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#8a682f]">
                      <Package size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#101b35]">
                        {product.title || 'Untitled product'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {product.category || 'Uncategorized'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pl-[52px] sm:pl-0">
                    <span className="text-sm font-bold text-[#101b35]">
                      {formatCurrencyINR(price)}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        stock > 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <Boxes size={13} />
                      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8f3e8] text-[#a17a3d]">
              <Package size={26} />
            </div>

            <h4 className="mt-4 font-semibold text-[#101b35]">
              No products yet
            </h4>

            <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-500">
              Add your first product to start building your store inventory.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
