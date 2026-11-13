
import { formatRupees, formatShortDate } from '../../../../utils/formatters';
import { Pencil, Trash2, Package } from 'lucide-react';

export default function ProductRow({
  product,
  deletingProductId,
  onEdit,
  onDelete,
}) {
  const isDeleting = deletingProductId === product._id;
  const stock = Number(product.stock) || 0;

  return (
    <tr className="border-b border-slate-100 transition-colors duration-200 hover:bg-[#fbf8f0]/60">
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#8a682f]">
            <Package size={19} />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-[#101b35]">
              {product.title || '—'}
            </p>
            <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
              {product.description || 'No description'}
            </p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
        {product.category || '—'}
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-[#101b35]">
        {formatRupees(product.price)}
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
            stock > 0
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-red-50 text-red-700 ring-1 ring-red-200'
          }`}
        >
          <span
            className={`mr-2 h-1.5 w-1.5 rounded-full ${
              stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          />
          {stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        {typeof product.vendor === 'object' && product.vendor ? (
          <div>
            <p className="text-sm font-medium text-[#101b35]">
              {product.vendor.name || 'Unknown vendor'}
            </p>
            {product.vendor.email && (
              <p className="mt-1 text-xs text-slate-500">
                {product.vendor.email}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            Vendor unavailable
          </span>
        )}
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
        {formatShortDate(product.createdAt)}
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9b879]/40 bg-[#fbf8f0] px-3 py-2 text-xs font-semibold text-[#765a2d] transition hover:bg-[#f4ecd9] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 focus:ring-offset-2"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  );
}
