
import { useEffect, useState } from 'react';
import { X, TicketPercent } from 'lucide-react';

const EMPTY_FORM = {
  code: '',
  discountType: 'percentage',
  discountValue: '',
  maxDiscount: '',
  minOrderAmount: '0',
  usageLimit: '',
  startsAt: '',
  expiresAt: '',
};

function toDateTimeLocal(value) {
  if (!value) return '';

  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function CouponForm({
  coupon,
  saving,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (coupon) {
      setForm({
        code: coupon.code || '',
        discountType: coupon.discountType || 'percentage',
        discountValue: coupon.discountValue ?? '',
        maxDiscount: coupon.maxDiscount ?? '',
        minOrderAmount: coupon.minOrderAmount ?? '0',
        usageLimit: coupon.usageLimit ?? '',
        startsAt: toDateTimeLocal(coupon.startsAt),
        expiresAt: toDateTimeLocal(coupon.expiresAt),
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setFormError('');
  }, [coupon]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    const value = Number(form.discountValue);
    const minimum = Number(form.minOrderAmount);

    if (!coupon && !form.code.trim()) {
      setFormError('Please enter a coupon code.');
      return;
    }

    if (!Number.isFinite(value) || value <= 0) {
      setFormError('Discount value must be greater than zero.');
      return;
    }

    if (!Number.isFinite(minimum) || minimum < 0) {
      setFormError('Minimum order amount cannot be negative.');
      return;
    }

    if (!form.startsAt || !form.expiresAt) {
      setFormError('Please select start and expiry dates.');
      return;
    }

    if (new Date(form.expiresAt) <= new Date(form.startsAt)) {
      setFormError('Expiry date must be after the start date.');
      return;
    }

    if (
      form.discountType === 'percentage' &&
      value > 100
    ) {
      setFormError('Percentage discount cannot exceed 100%.');
      return;
    }

    if (
      form.maxDiscount !== '' &&
      (!Number.isFinite(Number(form.maxDiscount)) ||
        Number(form.maxDiscount) < 0)
    ) {
      setFormError('Maximum discount must be zero or greater.');
      return;
    }

    if (
      form.usageLimit !== '' &&
      (!Number.isInteger(Number(form.usageLimit)) ||
        Number(form.usageLimit) < 1)
    ) {
      setFormError('Usage limit must be a positive whole number.');
      return;
    }

    const payload = {
      discountType: form.discountType,
      discountValue: value,
      maxDiscount: form.maxDiscount === '' ? null : Number(form.maxDiscount),
      minOrderAmount: minimum,
      usageLimit: form.usageLimit === '' ? null : Number(form.usageLimit),
      startsAt: new Date(form.startsAt).toISOString(),
      expiresAt: new Date(form.expiresAt).toISOString(),
    };

    if (!coupon) {
      payload.code = form.code.trim().toUpperCase();
    }

    const success = await onSubmit(payload);

    if (success && !coupon) {
      setForm(EMPTY_FORM);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#a17a3d] focus:ring-2 focus:ring-[#a17a3d]/10';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#f8f3e8] p-3 text-[#a17a3d]">
            <TicketPercent size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-[#101b35]">
              {coupon ? 'Edit Coupon' : 'Create New Coupon'}
            </h3>
            <p className="text-sm text-slate-500">
              Configure your marketplace discount.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Close coupon form"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {!coupon && (
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Coupon Code
            </span>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. NEXVIA20"
              className={inputClass}
              maxLength={30}
              required
            />
          </label>
        )}

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Discount Type
          </span>
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Discount Value
          </span>
          <input
            type="number"
            name="discountValue"
            value={form.discountValue}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            className={inputClass}
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Maximum Discount (₹)
          </span>
          <input
            type="number"
            name="maxDiscount"
            value={form.maxDiscount}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="Optional"
            className={inputClass}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Minimum Order Amount (₹)
          </span>
          <input
            type="number"
            name="minOrderAmount"
            value={form.minOrderAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={inputClass}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Usage Limit
          </span>
          <input
            type="number"
            name="usageLimit"
            value={form.usageLimit}
            onChange={handleChange}
            min="1"
            step="1"
            placeholder="Unlimited"
            className={inputClass}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Starts At
          </span>
          <input
            type="datetime-local"
            name="startsAt"
            value={form.startsAt}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Expires At
          </span>
          <input
            type="datetime-local"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </label>
      </div>

      {coupon && (
        <p className="mt-4 text-xs text-slate-500">
          Coupon code: <strong>{coupon.code}</strong> (cannot be changed)
        </p>
      )}

      {formError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#a17a3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#89652f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? 'Saving...'
            : coupon
              ? 'Update Coupon'
              : 'Create Coupon'}
        </button>
      </div>
    </form>
  );
}
