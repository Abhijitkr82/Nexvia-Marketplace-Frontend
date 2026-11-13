
import { useState } from 'react';
import { formatPrice } from '../../../../utils/formatters';
import {
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';

function CartProductImage({ item }) {
  const [imageError, setImageError] = useState(false);

  const imageUrl =
    item.imageUrls?.[0] ||
    item.images?.[0] ||
    item.imageUrl;

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white">
      {imageUrl &&
      !imageError &&
      /^(https?:\/\/|data:image\/|blob:)/i.test(imageUrl) ? (
        <img
          src={imageUrl}
          alt={item.title || 'Product'}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      ) : (
        <Package size={25} className="text-slate-300" />
      )}
    </div>
  );
}

export default function CartItemsSection({
  cart,
  cartCount,
  getStockLimit,
  onDecrease,
  onIncrease,
  onRemove,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Section heading */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-black text-[#101b35]">
          <ShoppingCart size={18} className="text-[#a17a3d]" />
          Cart Items
        </h3>

        <span className="rounded-full border border-[#d9b879]/30 bg-[#f8f3e9] px-3 py-1 text-xs font-bold text-[#8e6933]">
          {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Cart products */}
      <div className="space-y-3">
        {cart.map((item) => {
          const stockLimit = Number(getStockLimit(item));
          const quantity = Number(item.quantity);
          const isMaxQuantity = quantity >= stockLimit;

          return (
            <div
              key={item._id}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition duration-200 hover:border-[#d9b879]/40 hover:bg-white"
            >
              <CartProductImage item={item} />

              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-bold leading-5 text-[#101b35]">
                  {item.title}
                </h4>

                <p className="mt-1.5 text-sm font-black text-[#a17a3d]">
                  {formatPrice(item.price)}
                </p>

                {/* Quantity controls */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => onDecrease(item._id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition hover:bg-[#f4f1e9] hover:text-[#8e6933] focus:outline-none focus:ring-2 focus:ring-[#d9b879]"
                    >
                      <Minus size={13} />
                    </button>

                    <span
                      aria-label={`Quantity ${quantity}`}
                      className="min-w-8 text-center text-xs font-black text-[#101b35]"
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onIncrease(item)}
                      aria-label={`Increase quantity of ${item.title}`}
                      disabled={isMaxQuantity}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition hover:bg-[#f4f1e9] hover:text-[#8e6933] disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus:ring-2 focus:ring-[#d9b879]"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {isMaxQuantity && (
                    <span className="text-[10px] font-semibold text-amber-700">
                      Stock limit reached
                    </span>
                  )}
                </div>
              </div>

              {/* Remove product */}
              <button
                type="button"
                onClick={() => onRemove(item._id)}
                aria-label={`Remove ${item.title} from cart`}
                title="Remove item"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition duration-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
