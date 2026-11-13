
import { Pencil, Plus, X } from 'lucide-react';

export default function ProductFormHeader({ editingId, onCancelEdit }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#101b35] sm:text-3xl">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {editingId
            ? 'Update your product details and save the changes.'
            : 'Add a new product to your store and make it available to customers.'}
        </p>
      </div>

      {editingId && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
        >
          <X size={16} />
          Cancel edit
        </button>
      )}
    </div>
  );
}
