
import ImageCarousel from './ImageCarousel';
import { formatCurrencyINR } from '../../../../utils/formatters';
import { getProductImages } from '../../utils/productImages';
import {
  Tag,
  Boxes,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function VendorProductCard({
  product,
  currentIndex,
  onStepImage,
  onSelectImage,
  onEdit,
  onDelete,
}) {
  const productImages = getProductImages(product);
  const stock = Number(product?.stock) || 0;
  const isInStock = stock > 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b879]/60 hover:shadow-lg">
      <ImageCarousel
        product={product}
        productImages={productImages}
        currentIndex={currentIndex}
        onStep={(direction) =>
          onStepImage?.(product._id, direction, productImages.length)
        }
        onSelect={(index) =>
          onSelectImage?.(product._id, index)
        }
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="break-words text-lg font-bold leading-snug text-[#101b35]">
              {product?.title || 'Untitled product'}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <Tag size={13} className="text-[#a17a3d]" />
              <span>{product?.category || 'Uncategorized'}</span>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
              isInStock
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {isInStock ? 'Available' : 'Out of stock'}
          </span>
        </div>

        <p className="mt-4 line-clamp-2 min-h-10 break-words text-sm leading-relaxed text-slate-500">
          {product?.description || 'No description available.'}
        </p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Selling Price
            </p>

            <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#101b35]">
              {formatCurrencyINR(product?.price)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-2 text-slate-500">
              <Boxes size={15} className="text-[#a17a3d]" />
              <span className="text-xs font-medium">Stock</span>
            </div>

            <p
              className={`mt-1 text-sm font-bold ${
                isInStock ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {stock} units
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit?.(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#d9b879]/50 bg-[#fbf8f0] py-2.5 text-sm font-semibold text-[#765a2d] transition-all duration-200 hover:border-[#c49a52] hover:bg-[#f5eddc] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 focus:ring-offset-2"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
