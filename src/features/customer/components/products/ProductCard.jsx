
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../../utils/formatters';
import {
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
} from 'lucide-react';

// Supports URLs returned by the backend and vendor image uploads.
const getProductImage = (product) => {
  const candidates = [
    ...(Array.isArray(product?.imageUrls) ? product.imageUrls : []),
    ...(Array.isArray(product?.images) ? product.images : []),
    product?.imageUrl,
  ];

  const image = candidates.find((item) => {
    const value =
      typeof item === 'string'
        ? item
        : item?.imageUrl || item?.url || item?.Location;

    if (typeof value !== 'string' || !value.trim()) return false;

    // Ignore raw S3 storage keys.
    return (
      /^(https?:\/\/|data:image\/|blob:)/i.test(value) ||
      value.startsWith('/')
    );
  });

  if (!image) return '';

  return typeof image === 'string'
    ? image
    : image.imageUrl || image.url || image.Location;
};

export default function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
  onViewDetails,
}) {
  const [imageError, setImageError] = useState(false);

  const stock = Number(product.stock) || 0;
  const stockLimitReached = quantityInCart >= stock;
  const imageUrl = getProductImage(product);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b879] hover:shadow-xl hover:shadow-[#101b35]/10">

      {/* Product Image */}
      <div className="relative m-3 mb-0 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-[#f5f6f8] sm:h-52">

        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={product.title || 'Product image'}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-300">
            <ShoppingBag size={42} strokeWidth={1.4} />
            <span className="text-xs font-medium text-slate-400">
              Image unavailable
            </span>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-[#101b35] shadow-sm backdrop-blur">
          {product.category || 'Collection'}
        </span>

        {/* Stock Badge */}
        {stock <= 0 ? (
          <span className="absolute inset-0 flex items-center justify-center bg-[#101b35]/60 text-sm font-black tracking-wider text-white">
            OUT OF STOCK
          </span>
        ) : stock <= 5 ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-[#101b35]/90 px-3 py-1.5 text-[10px] font-bold text-[#e6c995] shadow-md">
            Only {stock} left
          </span>
        ) : null}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">

        {/* Vendor */}
        <p className="mb-2 flex items-center gap-1.5 truncate text-[10px] font-extrabold uppercase tracking-wider text-[#a17a3d]">
          <Store size={13} className="shrink-0" />
          <span className="truncate">
            {product.vendor?.name || 'Nexvia Store'}
          </span>
        </p>

        {/* Title */}
        <h3 className="line-clamp-2 min-h-10 text-sm font-extrabold leading-5 text-[#101b35] transition-colors group-hover:text-[#a17a3d]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-amber-600">
            <Star size={12} fill="currentColor" />
            <span className="font-extrabold">
              {Number(product.averageRating || 0).toFixed(1)}
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            ({product.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Details Button */}
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="mt-3 flex w-fit items-center gap-1 text-left text-xs font-bold text-[#3157a4] transition-colors hover:text-[#a17a3d]"
        >
          View Details & Reviews
          <ChevronRight size={14} />
        </button>

        {/* Price and Cart */}
        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="text-xl font-black tracking-tight text-[#101b35]">
            {formatPrice(product.price)}
          </p>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={stock <= 0 || stockLimitReached}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] px-3 py-3.5 text-xs font-extrabold text-white shadow-sm transition-all duration-300 hover:bg-[#203456] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <ShoppingCart size={15} />

            {stock <= 0
              ? 'Out of Stock'
              : stockLimitReached
                ? 'Stock Limit Reached'
                : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
