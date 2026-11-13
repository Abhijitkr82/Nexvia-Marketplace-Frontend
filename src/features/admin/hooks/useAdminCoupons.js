
import { useState } from 'react';
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deactivateCoupon,
} from '../../../services/couponService';
import { getToken } from '../../../utils/authStorage';

export default function useAdminCoupons(checkAdmin) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchCoupons = async () => {
    if (!checkAdmin()) return;

    setLoading(true);
    setError('');

    try {
      const data = await getCoupons(getToken());
      setCoupons(Array.isArray(data.coupons) ? data.coupons : []);
    } catch (err) {
      console.error('Fetch coupons error:', err);
      setError(err.message || 'Unable to fetch coupons.');
    } finally {
      setLoading(false);
    }
  };

  const addCoupon = async (couponData) => {
    if (!checkAdmin()) return false;

    setSaving(true);
    setError('');
    setMessage('');

    try {
      await createCoupon(couponData, getToken());
      setMessage('Coupon created successfully.');
      await fetchCoupons();
      return true;
    } catch (err) {
      setError(err.message || 'Unable to create coupon.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const editCoupon = async (couponId, couponData) => {
    if (!checkAdmin()) return false;

    setSaving(true);
    setError('');
    setMessage('');

    try {
      await updateCoupon(couponId, couponData, getToken());
      setMessage('Coupon updated successfully.');
      await fetchCoupons();
      return true;
    } catch (err) {
      setError(err.message || 'Unable to update coupon.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const removeCoupon = async (couponId) => {
    if (!checkAdmin()) return false;

    setSaving(true);
    setError('');
    setMessage('');

    try {
      await deactivateCoupon(couponId, getToken());
      setMessage('Coupon deactivated successfully.');
      await fetchCoupons();
      return true;
    } catch (err) {
      setError(err.message || 'Unable to deactivate coupon.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    coupons,
    loading,
    error,
    message,
    saving,
    fetchCoupons,
    addCoupon,
    editCoupon,
    removeCoupon,
  };
}
