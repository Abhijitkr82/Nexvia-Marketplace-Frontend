
import { useEffect, useState } from 'react';
import CartDrawerHeader from './CartDrawerHeader';
import EmptyCart from './EmptyCart';
import CartItemsSection from './CartItemsSection';
import ShippingAddressSection from './ShippingAddressSection';
import CouponSection from './CouponSection';
import PaymentMethodSection from './PaymentMethodSection';
import CartSummary from './CartSummary';
import { API_BASE_URL } from '../../../../config/api';
import { getToken } from '../../../../utils/authStorage';

// Slide-in cart and checkout drawer.
export default function CartDrawer({
  onClose,
  orderMessage,
  cart,
  cartCount,
  getStockLimit,
  onDecrease,
  onIncrease,
  onRemove,
  shippingAddress,
  onAddressChange,
  coupon,
  checkout,
  totalPrice,
  finalTotal,
}) {
  const {
    isCheckingOut,
    paymentMethod,
    setPaymentMethod,
    handleCheckout,
  } = checkout;

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchAvailableOffers = async () => {
      const token = getToken();

      if (!token) return;

      setIsLoadingOffers(true);

      try {
        const response = await fetch(`${API_BASE_URL}/coupons/available`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch offers');
        }

        const data = await response.json();

        if (!cancelled) {
          setAvailableCoupons(data.coupons || []);
        }
      } catch (error) {
        if (!cancelled) {
          setAvailableCoupons([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingOffers(false);
        }
      }
    };

    fetchAvailableOffers();

    return () => {
      cancelled = true;
    };
  }, []);

  const isErrorMessage =
    orderMessage &&
    ['failed', 'please', 'could not'].some((word) =>
      orderMessage.toLowerCase().includes(word)
    );

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-[#101b35]/60 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart and checkout"
        className="flex h-full w-full max-w-xl flex-col overflow-hidden border-l border-slate-200 bg-[#f8f9fc] shadow-2xl shadow-slate-950/20"
      >
        <CartDrawerHeader
          cartCount={cartCount}
          onClose={onClose}
        />

        {/* Order status message */}
        {orderMessage && (
          <div
            role="status"
            aria-live="polite"
            className={`mx-5 mt-4 rounded-xl border px-4 py-3 text-sm font-semibold sm:mx-7 ${
              isErrorMessage
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {orderMessage}
          </div>
        )}

        {/* Scrollable cart content */}
        <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-5 sm:space-y-6 sm:p-7">
          {cart.length === 0 ? (
            <EmptyCart onContinueShopping={onClose} />
          ) : (
            <>
              <CartItemsSection
                cart={cart}
                cartCount={cartCount}
                getStockLimit={getStockLimit}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                onRemove={onRemove}
              />

              <ShippingAddressSection
                shippingAddress={shippingAddress}
                onFieldChange={onAddressChange}
              />

              <CouponSection
                couponCode={coupon.couponCode}
                appliedCoupon={coupon.appliedCoupon}
                couponMessage={coupon.couponMessage}
                isApplyingCoupon={coupon.isApplyingCoupon}
                isCheckingOut={isCheckingOut}
                availableCoupons={availableCoupons}
                isLoadingOffers={isLoadingOffers}
                onCodeChange={coupon.changeCouponCode}
                onApply={coupon.applyCoupon}
                onApplyOffer={coupon.applyCoupon}
                onRemove={coupon.removeCoupon}
              />

              <PaymentMethodSection
                paymentMethod={paymentMethod}
                isCheckingOut={isCheckingOut}
                onChange={setPaymentMethod}
              />
            </>
          )}
        </div>

        {/* Fixed checkout summary */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-slate-200 bg-white shadow-[0_-8px_25px_rgba(15,23,42,0.04)]">
            <CartSummary
              totalPrice={totalPrice}
              appliedCoupon={coupon.appliedCoupon}
              finalTotal={finalTotal}
              isCheckingOut={isCheckingOut}
              paymentMethod={paymentMethod}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </aside>
    </div>
  );
}
