
import { useEffect, useMemo, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';

import useProductReviews from '../../hooks/useProductReviews';
import RatingSummary from './RatingSummary';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

// Extract browser-accessible product image URLs
const getProductImages = (product) => {
  const images = Array.isArray(product?.images)
    ? product.images
    : [];

  const imageUrls = Array.isArray(product?.imageUrls)
    ? product.imageUrls
    : [];

  const candidates = [
    ...imageUrls,
    ...images,
    product?.imageUrl,
  ];

  return candidates
    .map((item) => {
      const value =
        typeof item === 'string'
          ? item
          : item?.imageUrl || item?.url || item?.Location;

      if (typeof value !== 'string' || !value.trim()) {
        return '';
      }

      // Ignore raw S3 keys
      if (
        /^https?:\/\//i.test(value) ||
        /^data:image\//i.test(value) ||
        /^blob:/i.test(value) ||
        value.startsWith('/')
      ) {
        return value;
      }

      return '';
    })
    .filter(Boolean)
    .filter((url, index, array) => array.indexOf(url) === index);
};

export default function ProductReviews({
  product,
  productId,
  productTitle,
  onClose,
}) {
  const {
    reviews,
    averageRating,
    reviewCount,
    rating,
    setRating,
    comment,
    setComment,
    loading,
    submitting,
    error,
    message,
    hasReviewed,
    handleSubmit,
  } = useProductReviews(productId);

  const productImages = useMemo(
    () => getProductImages(product),
    [product]
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setSelectedImage(0);
    setImageError(false);
  }, [productId]);

  const showPreviousImage = () => {
    setSelectedImage((current) =>
      current === 0
        ? productImages.length - 1
        : current - 1
    );
    setImageError(false);
  };

  const showNextImage = () => {
    setSelectedImage((current) =>
      current === productImages.length - 1
        ? 0
        : current + 1
    );
    setImageError(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#a17a3d]">
              Product Details
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#101b35]">
              {productTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            aria-label="Close product details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Image Gallery */}
        <div className="mb-7">
          <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-[#f5f6f8] sm:h-80">
            {productImages.length > 0 && !imageError ? (
              <>
                <img
                  src={productImages[selectedImage]}
                  alt={productTitle || 'Product image'}
                  className="h-full w-full object-contain p-3"
                  onError={() => setImageError(true)}
                />

                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={showPreviousImage}
                      className="absolute left-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      onClick={showNextImage}
                      className="absolute right-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>

                    <span className="absolute bottom-3 right-3 rounded-full bg-[#101b35]/80 px-3 py-1 text-xs font-bold text-white">
                      {selectedImage + 1} / {productImages.length}
                    </span>
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <ImageIcon size={42} />
                <span className="text-sm">
                  Image unavailable
                </span>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {productImages.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageError(false);
                  }}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-[#f5f6f8] transition ${
                    selectedImage === index
                      ? 'border-[#a17a3d] shadow-md'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${productTitle} ${index + 1}`}
                    className="h-full w-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Summary */}
        <RatingSummary
          averageRating={averageRating}
          reviewCount={reviewCount}
        />

        {/* Review Form */}
        {!hasReviewed && (
          <ReviewForm
            rating={rating}
            onRatingChange={setRating}
            comment={comment}
            onCommentChange={setComment}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        )}

        {/* Success Message */}
        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Customer Reviews */}
        <div>
          <h3 className="mb-4 text-lg font-extrabold text-slate-900">
            Customer Reviews
          </h3>

          {loading ? (
            <p className="py-6 text-center text-sm text-slate-500">
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
