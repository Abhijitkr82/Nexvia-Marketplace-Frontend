
import { useState } from 'react';
import { TicketPercent, Plus, RefreshCw } from 'lucide-react';
import SectionHeader from '../../../../components/common/SectionHeader';
import CouponForm from './CouponForm';
import CouponTable from './CouponTable';

export default function CouponManagementSection({ couponsState }) {
  const {
    coupons,
    loading,
    error,
    message,
    saving,
    fetchCoupons,
    addCoupon,
    editCoupon,
    removeCoupon,
  } = couponsState;

  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const openCreateForm = () => {
    setEditingCoupon(null);
    setShowForm(true);
  };

  const openEditForm = (coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCoupon(null);
  };

  const handleSubmit = async (couponData) => {
    const success = editingCoupon
      ? await editCoupon(editingCoupon._id, couponData)
      : await addCoupon(couponData);

    if (success) closeForm();
    return success;
  };

  const handleDeactivate = async (couponId) => {
    await removeCoupon(couponId);
  };

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeader
            icon={TicketPercent}
            iconClassName="text-[#a17a3d]"
            title="Coupon Management"
            description="Create, manage and monitor marketplace discount coupons."
            badge={`${coupons.length} coupons`}
            badgeClassName="bg-[#f8f3e8] text-[#8a682f]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchCoupons}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a17a3d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#89652f]"
            >
              <Plus size={17} />
              Create Coupon
            </button>
          </div>
        </div>

        {message && (
          <p className="mt-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}
      </div>

      {showForm && (
        <CouponForm
          coupon={editingCoupon}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <CouponTable
        coupons={coupons}
        loading={loading}
        error={error}
        onRetry={fetchCoupons}
        onEdit={openEditForm}
        onDeactivate={handleDeactivate}
        saving={saving}
      />
    </section>
  );
}
