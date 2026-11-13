import { useState } from 'react';
import {
  addProduct,
  updateProduct,
  uploadProductImage,
} from '../../../services/productService';
import {
  EMPTY_PRODUCT_FORM,
  MAX_PRODUCT_IMAGES,
  assertValidImageFile,
  buildProductPayload,
  productToForm,
} from '../utils/productForm';
import { getImagePreviews } from '../utils/productImages';

// Add / edit product form, including S3 image uploads.
//
// onSaved – async callback run after a product was created or updated
export default function useProductForm({
  token,
  navigate,
  handleAuthError,
  showMessage,
  clearMessage,
  onSaved,
}) {
  const [form, setForm] = useState(EMPTY_PRODUCT_FORM);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({ ...EMPTY_PRODUCT_FORM, images: [] });
    setImagePreview([]);
    setEditingId(null);
  };

  // Loads an existing product into the form.
  const startEditing = (product) => {
    setEditingId(product._id);
    setForm(productToForm(product));
    setImagePreview(getImagePreviews(product));
    clearMessage();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Uploads the selected images to the private AWS S3 bucket via the API.
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    if (!token) {
      navigate('/login');
      return;
    }

    if (form.images.length + files.length > MAX_PRODUCT_IMAGES) {
      showMessage('You can upload a maximum of 5 images.', 'error');
      event.target.value = '';
      return;
    }

    setUploadingImage(true);
    clearMessage();

    try {
      const uploadedImages = [];

      for (const file of files) {
        assertValidImageFile(file);

        const data = await uploadProductImage(file, token);

        uploadedImages.push({
          key: data.imageKey,
          url: data.imageUrl,
        });
      }

      setForm((previous) => ({
        ...previous,
        images: [
          ...previous.images,
          ...uploadedImages.map((image) => image.key),
        ],
      }));

      setImagePreview((previous) => [...previous, ...uploadedImages]);

      showMessage('Product images uploaded successfully!');
    } catch (error) {
      if (!handleAuthError(error)) {
        showMessage(
          error.response?.data?.message ||
            error.message ||
            'Image upload failed.',
          'error',
        );
      }
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const removeImage = (index) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.filter((_, i) => i !== index),
    }));

    setImagePreview((previous) => previous.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearMessage();

    if (uploadingImage) {
      showMessage('Please wait until image upload finishes.', 'error');
      return;
    }

    const { error, payload } = buildProductPayload(form);

    if (error) {
      showMessage(error, 'error');
      return;
    }

    setSubmitting(true);

    try {
      if (editingId) {
        await updateProduct(editingId, payload, token);

        showMessage('Product updated successfully!');
      } else {
        await addProduct(payload, token);

        showMessage('Product added successfully!');
      }

      resetForm();
      await onSaved();
    } catch (err) {
      if (!handleAuthError(err)) {
        showMessage(
          err.response?.data?.message ||
            (editingId
              ? 'Failed to update product.'
              : 'Failed to add product.'),
          'error',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    editingId,
    imagePreview,
    submitting,
    uploadingImage,
    updateField,
    resetForm,
    startEditing,
    handleImageUpload,
    removeImage,
    handleSubmit,
  };
}
