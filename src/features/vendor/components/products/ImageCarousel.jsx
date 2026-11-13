
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

export default function ImageCarousel({
  product = {},
  productImages = [],
  currentIndex = 0,
  onStep,
  onSelect,
}) {
  const safeImages = Array.isArray(productImages) ? productImages : [];

  const safeIndex =
    Number.isInteger(currentIndex) &&
    currentIndex >= 0 &&
    currentIndex < safeImages.length
      ? currentIndex
      : 0;

  const currentImage = safeImages[safeIndex];

  return (
    <div className="group relative flex h-56 w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#fbfaf7] to-[#f3f4f6] p-3">
      {currentImage ? (
        <>
          <img
            src={currentImage}
            alt={product.title || 'Product'}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onStep?.(-1)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#101b35]/75 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#101b35] focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2"
                aria-label="Previous image"
              >
                <ChevronLeft size={21} />
              </button>

              <button
                type="button"
                onClick={() => onStep?.(1)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#101b35]/75 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#101b35] focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2"
                aria-label="Next image"
              >
                <ChevronRight size={21} />
              </button>

              <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#101b35]/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                {safeIndex + 1} / {safeImages.length}
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
                {safeImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onSelect?.(index)}
                    className={`h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a17a3d] focus:ring-offset-2 ${
                      safeIndex === index
                        ? 'w-5 bg-[#a17a3d]'
                        : 'w-2 bg-slate-300 hover:bg-slate-500'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={safeIndex === index}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white/60 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fbf8f0] text-[#a17a3d]">
            <ImageOff size={25} />
          </div>

          <p className="text-sm font-medium text-slate-500">
            {product.images?.length
              ? 'Image URL unavailable'
              : 'No product image'}
          </p>
        </div>
      )}
    </div>
  );
}
