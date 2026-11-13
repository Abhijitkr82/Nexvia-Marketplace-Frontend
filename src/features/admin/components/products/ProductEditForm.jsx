import { X } from 'lucide-react';

export default function ProductEditForm({
  editingProduct,
  savingProduct,
  onFieldChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 space-y-4 rounded-xl border border-indigo-200 bg-indigo-50/40 p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-lg font-semibold text-gray-800">Edit Product</h4>

        <button
          type="button"
          onClick={() => onCancel()}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close edit form"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          Product title
          <input
            required
            value={editingProduct.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Category
          <input
            required
            value={editingProduct.category}
            onChange={(e) => onFieldChange('category', e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Price (₹)
          <input
            required
            type="number"
            min="0"
            step="any"
            value={editingProduct.price}
            onChange={(e) => onFieldChange('price', e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Stock
          <input
            required
            type="number"
            min="0"
            step="1"
            value={editingProduct.stock}
            onChange={(e) => onFieldChange('stock', e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-gray-700">
        Description
        <textarea
          required
          rows={3}
          value={editingProduct.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={savingProduct}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {savingProduct ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          type="button"
          onClick={() => onCancel()}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
