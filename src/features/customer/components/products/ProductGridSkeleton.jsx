
export default function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm"
        >
          {/* Image skeleton */}
          <div className="h-48 animate-pulse rounded-xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 sm:h-52" />

          <div className="px-1 pb-2 pt-4">
            {/* Vendor */}
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />

            {/* Product title */}
            <div className="mt-4 h-4 w-4/5 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-2 h-4 w-3/5 animate-pulse rounded-full bg-slate-100" />

            {/* Rating */}
            <div className="mt-4 h-5 w-2/5 animate-pulse rounded-md bg-amber-50" />

            {/* Details */}
            <div className="mt-4 h-3 w-1/2 animate-pulse rounded-full bg-slate-100" />

            {/* Price */}
            <div className="mt-6 h-6 w-1/3 animate-pulse rounded-md bg-slate-200" />

            {/* Cart button */}
            <div className="mt-4 h-11 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
