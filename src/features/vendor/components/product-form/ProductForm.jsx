
import { Save, LoaderCircle, PackagePlus } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function ProductForm({
  form,
  editingId,
  imagePreview,
  submitting,
  uploadingImage,
  onFieldChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
}) {
  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-[#fbfaf7] px-4 py-3 text-sm text-[#101b35] outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#c49a52] focus:bg-white focus:ring-4 focus:ring-[#d9b879]/15';

  const labelClass =
    'mb-2 block text-sm font-semibold text-[#101b35]';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Product Title */}
      <div>
        <label htmlFor="product-title" className={labelClass}>
          Product Title <span className="text-red-500">*</span>
        </label>

        <input
          id="product-title"
          name="title"
          type="text"
          value={form.title}
          onChange={onFieldChange}
          className={inputClass}
          placeholder="Enter product title"
          required
          maxLength={150}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="product-description" className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>

        <textarea
          id="product-description"
          name="description"
          value={form.description}
          onChange={onFieldChange}
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="Describe your product, its features and details..."
          rows={4}
          required
        />
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="product-price" className={labelClass}>
            Price (₹) <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#a17a3d]">
              ₹
            </span>

            <input
              id="product-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onFieldChange}
              className={`${inputClass} pl-9`}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="product-stock" className={labelClass}>
            Stock Quantity <span className="text-red-500">*</span>
          </label>

          <input
            id="product-stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={onFieldChange}
            className={inputClass}
            placeholder="Enter available quantity"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="product-category" className={labelClass}>
          Category <span className="text-red-500">*</span>
        </label>

        <input
          id="product-category"
          name="category"
          type="text"
          value={form.category}
          onChange={onFieldChange}
          className={inputClass}
          placeholder="e.g. Electronics, Fashion, Home"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="rounded-2xl border border-dashed border-[#d9b879]/60 bg-[#fbfaf7] p-4 sm:p-5">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#101b35]">
            Product Images
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Upload images to showcase your product.
          </p>
        </div>

        <ImageUploader
          images={form.images}
          imagePreview={imagePreview}
          uploadingImage={uploadingImage}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || uploadingImage}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#101b35]/10 transition-all duration-200 hover:bg-[#1b2c50] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#d9b879]/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploadingImage ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Uploading Images...
          </>
        ) : submitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Saving...
          </>
        ) : editingId ? (
          <>
            <Save size={18} />
            Save Changes
          </>
        ) : (
          <>
            <PackagePlus size={18} />
            Publish Product
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Fields marked with * are required.
      </p>
    </form>
  );
}
