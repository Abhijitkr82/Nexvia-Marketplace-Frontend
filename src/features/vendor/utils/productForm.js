
export const EMPTY_PRODUCT_FORM = {
  title: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  images: [],
};

export const MAX_PRODUCT_IMAGES = 5;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

// Validate an uploaded image.
export const assertValidImageFile = (file) => {
  if (!file || !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only JPG, PNG and WEBP images are allowed.');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Each image must be smaller than 5 MB.');
  }
};

// Validate form data and build API payload.
export const buildProductPayload = (form) => {
  const title = form.title.trim();
  const description = form.description.trim();
  const category = form.category.trim();

  const price = Number(form.price);
  const stock = Number(form.stock);

  if (!title) {
    return { error: 'Product title is required.' };
  }

  if (!description) {
    return { error: 'Product description is required.' };
  }

  if (!category) {
    return { error: 'Product category is required.' };
  }

  if (
    form.price === '' ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return { error: 'Enter a valid non-negative price.' };
  }

  if (
    form.stock === '' ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    return {
      error: 'Stock must be a whole number greater than or equal to zero.',
    };
  }

  if (!Array.isArray(form.images)) {
    return { error: 'Invalid product images.' };
  }

  if (form.images.length > MAX_PRODUCT_IMAGES) {
    return {
      error: `You can upload a maximum of ${MAX_PRODUCT_IMAGES} images.`,
    };
  }

  return {
    payload: {
      title,
      description,
      price,
      category,
      stock,
      images: form.images,
    },
  };
};

// Convert stored product data into editable form state.
export const productToForm = (product) => ({
  title: product.title || '',
  description: product.description || '',
  price: String(product.price ?? ''),
  category: product.category || '',
  stock: String(product.stock ?? ''),
  images: Array.isArray(product.images) ? product.images : [],
});
