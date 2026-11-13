import { useEffect, useState } from 'react';
import {
  getProductReviews,
  submitReview,
} from '../../../services/reviewService';
import { getToken } from '../../../utils/authStorage';
import { decodeJwtPayload } from '../../../utils/jwt';

// Loads a product's reviews and handles submitting a new one.
export default function useProductReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getProductReviews(productId);

      const fetchedReviews = data?.reviews || [];

      setReviews(fetchedReviews);
      setAverageRating(data?.product?.averageRating || 0);
      setReviewCount(data?.product?.reviewCount || 0);

      const token = getToken();

      if (token) {
        const payload = decodeJwtPayload(token);

        const alreadyReviewed = fetchedReviews.some((review) => {
          const reviewCustomerId = review.customer?._id || review.customer;

          return String(reviewCustomerId) === String(payload.id);
        });

        setHasReviewed(alreadyReviewed);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not load product reviews.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (comment.trim().length < 3) {
      setError('Please write at least 3 characters.');
      return;
    }

    const token = getToken();

    if (!token) {
      setError('Please log in to submit a review.');
      return;
    }

    setSubmitting(true);

    try {
      const data = await submitReview(
        {
          productId,
          rating,
          comment: comment.trim(),
        },
        token,
      );

      setMessage(data?.message || 'Review submitted successfully!');
      setHasReviewed(true);
      setComment('');
      setRating(5);

      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit your review.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}
