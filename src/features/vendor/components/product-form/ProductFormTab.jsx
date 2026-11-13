
import { PackagePlus } from 'lucide-react';
import ProductFormHeader from './ProductFormHeader';
import ProductForm from './ProductForm';

export default function ProductFormTab({
  form,
  editingId,
  imagePreview,
  submitting,
  uploadingImage,
  onFieldChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <section className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[#fbfaf7] px-5 py-5 sm:px-8">
        <div className="mb-2 flex items-center gap-2">
          <PackagePlus size={17} className="text-[#a17a3d]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17a3d]">
            Product Management
          </span>
        </div>

        <ProductFormHeader
          editingId={editingId}
          onCancelEdit={onCancelEdit}
        />
      </div>

      <div className="p-5 sm:p-8">
        <ProductForm
          form={form}
          editingId={editingId}
          imagePreview={imagePreview}
          submitting={submitting}
          uploadingImage={uploadingImage}
          onFieldChange={onFieldChange}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
