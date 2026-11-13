
import { ImagePlus, Upload, X, LoaderCircle, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({
  images,
  imagePreview,
  uploadingImage,
  onImageUpload,
  onRemoveImage,
}) {
  const maxImages = 5;
  const remainingImages = maxImages - images.length;
  const isLimitReached = images.length >= maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative rounded-2xl border-2 border-dashed p-5 transition-all duration-200 sm:p-6 ${
          isLimitReached
            ? 'border-slate-200 bg-slate-50'
            : 'border-[#d9b879]/60 bg-white hover:border-[#c49a52] hover:bg-[#fbfaf7]'
        }`}
      >
        <input
          id="product-image-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onImageUpload}
          disabled={uploadingImage || isLimitReached}
          className="sr-only"
        />

        <label
          htmlFor="product-image-upload"
          className={`flex flex-col items-center justify-center text-center ${
            uploadingImage || isLimitReached
              ? 'cursor-not-allowed opacity-60'
              : 'cursor-pointer'
          }`}
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f1e5] text-[#a17a3d]">
            {uploadingImage ? (
              <LoaderCircle size={27} className="animate-spin" />
            ) : (
              <ImagePlus size={27} />
            )}
          </div>

          <h4 className="text-sm font-bold text-[#101b35]">
            {uploadingImage
              ? 'Uploading your images...'
              : isLimitReached
                ? 'Image limit reached'
                : 'Upload product images'}
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            {isLimitReached
              ? 'You can upload a maximum of 5 images.'
              : 'Click here to browse images from your device.'}
          </p>

          {!isLimitReached && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#101b35] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1b2c50]">
              <Upload size={15} />
              Choose Images
            </span>
          )}
        </label>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
          JPG, PNG or WEBP · Maximum 5 MB per image · Up to 5 images
        </p>

        {uploadingImage && (
          <div
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#f7f1e5] px-3 py-2 text-xs font-semibold text-[#a17a3d]"
            role="status"
          >
            <LoaderCircle size={14} className="animate-spin" />
            Uploading image to AWS S3...
          </div>
        )}
      </div>

      {/* Image Previews */}
      {imagePreview.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#101b35]">
              Selected Images
            </h4>

            <span className="rounded-full bg-[#f7f1e5] px-3 py-1 text-xs font-semibold text-[#a17a3d]">
              {imagePreview.length} / 5
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imagePreview.map((image, index) => (
              <div
                key={`${image.key}-${index}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-[#fbfaf7] p-2 transition-all duration-200 hover:border-[#d9b879] hover:shadow-md"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-32">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={`Product preview ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-2 text-center text-slate-400">
                      <ImageIcon size={25} />
                      <span className="text-[10px]">
                        Existing image stored in S3
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-medium text-slate-600">
                    Image {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    disabled={uploadingImage}
                    aria-label={`Remove image ${index + 1}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Count */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">
          {images.length} of 5 images selected
        </span>

        <span className="text-xs font-medium text-[#a17a3d]">
          {remainingImages > 0
            ? `${remainingImages} more ${remainingImages === 1 ? 'image' : 'images'} allowed`
            : 'Maximum reached'}
        </span>
      </div>
    </div>
  );
}
