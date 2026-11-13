
export const isHttpUrl = (image) =>
  typeof image === 'string' &&
  (image.startsWith('http://') || image.startsWith('https://'));

// Get displayable product image URLs.
// Prefer signed URLs returned by the API.
export const getProductImages = (product) => {
  const imageUrls = Array.isArray(product?.imageUrls)
    ? product.imageUrls
    : [];

  if (imageUrls.length > 0) {
    return imageUrls;
  }

  const images = Array.isArray(product?.images)
    ? product.images
    : [];

  return images.filter(isHttpUrl);
};

// Build image preview entries for the edit form.
export const getImagePreviews = (product) => {
  const existingImages = Array.isArray(product?.images)
    ? product.images
    : [];

  const imageUrls = Array.isArray(product?.imageUrls)
    ? product.imageUrls
    : [];

  return existingImages.map((image, index) => ({
    key: image,
    url: isHttpUrl(image) ? image : imageUrls[index] || '',
  }));
};
