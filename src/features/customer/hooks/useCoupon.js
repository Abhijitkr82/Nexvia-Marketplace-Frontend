
import { useState } from 'react';
import { validateCoupon } from '../../../services/paymentService';
import { getToken } from '../../../utils/authStorage';
import { toOrderProducts } from '../utils/cart';

// Coupon entry, validation (server side) and removal.
export default function useCoupon({ cart, navigate }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Typing a new code invalidates any applied coupon.
  const changeCouponCode = (value) => {
    setCouponCode(value.toUpperCase());
    setAppliedCoupon(null);
    setCouponMessage('');
  };

  // Optional code argument supports direct application from Available Offers.
  const applyCoupon = async (selectedCode) => {
    const codeToApply = (selectedCode ?? couponCode).trim().toUpperCase();

    if (!codeToApply) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }

    if (cart.length === 0 || isApplyingCoupon) return;

    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    setCouponCode(codeToApply);
    setIsApplyingCoupon(true);
    setCouponMessage('');

    try {
      const data = await validateCoupon(
        {
          products: toOrderProducts(cart, { coerceQuantity: true }),
          couponCode: codeToApply,
        },
        token,
      );

      setAppliedCoupon(data);
      setCouponCode(data.couponCode);
      setCouponMessage(data.message);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponMessage(
        err.response?.data?.message || 'Unable to apply coupon.',
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('Coupon removed.');
  };

  // Used after a successful order.
  const resetCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return {
    couponCode,
    appliedCoupon,
    couponMessage,
    isApplyingCoupon,
    changeCouponCode,
    applyCoupon,
    removeCoupon,
    resetCoupon,
  };
}
