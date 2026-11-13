
import { formatPrice } from '../../../../utils/formatters';
import { Package } from 'lucide-react';

export default function OrderItemRow({ item }) {
  const product = item.product || item;

  const image =
    product.imageUrls?.[0] ||
    product.images?.[0] ||
    product.imageUrl ||
    null;

  const isValidImage =
    typeof image === 'string' &&
    /^(https?:\/\/|data:image\/|blob:)/i.test(image);

  const quantity = Number(item.quantity) || 1;

  const unitPrice =
    Number(item.unitPrice ?? item.price ?? product.price) || 0;

  const itemTotal =
    item.lineTotal !== undefined && item.lineTotal !== null
      ? Number(item.lineTotal) || 0
      : unitPrice * quantity;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-3 transition-colors duration-200 hover:border-[#d9b879]/60">

      {/* Product Image */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-20 sm:w-20">
        <Package
          size={25}
          className="text-slate-300"
        />

        {isValidImage && (
          <img
            src={image}
            alt={product.title || 'Product'}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-bold leading-5 text-[#101b35]">
          {product.title || 'Product'}
        </p>

        <p className="mt-1 text-xs font-medium text-slate-500">
          Quantity: {quantity}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {formatPrice(unitPrice)} per item
        </p>
      </div>

      {/* Item Total */}
      <div className="shrink-0 text-right">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Total
        </p>

        <p className="mt-1 text-sm font-black text-[#101b35] sm:text-base">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </div>
  );
}
