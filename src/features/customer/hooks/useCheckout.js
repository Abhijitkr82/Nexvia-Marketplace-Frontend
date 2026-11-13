import { useState } from 'react';
import {
  createCodOrder,
  createRazorpayOrder,
  verifyPayment,
} from '../../../services/paymentService';
import { saveCart } from '../../../services/cartService';
import { getToken } from '../../../utils/authStorage';
import { loadRazorpayScript } from '../../../utils/razorpay';
import { toOrderProducts, toServerCartItems } from '../utils/cart';
import {
  toShippingAddressPayload,
  validateShippingAddress,
} from '../utils/validation';

const SUCCESS_MESSAGE_DURATION = 2500;

// Checkout orchestration for both Cash on Delivery and Razorpay payments.
//
// cart / shippingAddress / appliedCoupon – current checkout inputs
// onOrderPlaced      – clears cart + coupon after a successful order
// clearServerCart    – async (token, label) helper that clears the server cart
// fetchMyOrders      – refreshes the order history
// drawer             – cart drawer state (setOrderMessage / setIsCartOpen)
export default function useCheckout({
  cart,
  shippingAddress,
  appliedCoupon,
  navigate,
  onOrderPlaced,
  clearServerCart,
  fetchMyOrders,
  drawer,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const { setOrderMessage, setIsCartOpen } = drawer;

  const finishSuccessfully = async (message) => {
    onOrderPlaced();
    setOrderMessage(message);

    await fetchMyOrders();

    setTimeout(() => {
      setIsCartOpen(false);
      setOrderMessage('');
    }, SUCCESS_MESSAGE_DURATION);
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || isCheckingOut) return;

    const addressError = validateShippingAddress(shippingAddress);

    if (addressError) {
      setOrderMessage(addressError);
      setIsCartOpen(true);
      return;
    }

    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);
    setOrderMessage('');

    try {
      await saveCart(toServerCartItems(cart), token);

      const orderProducts = toOrderProducts(cart);
      const shippingAddressData = toShippingAddressPayload(shippingAddress);
      const orderPayload = {
        products: orderProducts,
        shippingAddress: shippingAddressData,
        couponCode: appliedCoupon?.couponCode || '',
      };

      // COD checkout
      if (paymentMethod === 'COD') {
        await createCodOrder(orderPayload, token);

        await clearServerCart(token, '');

        await finishSuccessfully('COD order placed successfully!');

        return;
      }

      // Load Razorpay only for online payment
      await loadRazorpayScript();

      const { keyId, razorpayOrderId, amount, currency } =
        await createRazorpayOrder(orderPayload, token);

      if (!keyId || !razorpayOrderId || !amount) {
        throw new Error('Invalid payment order response from server.');
      }

      const paymentOptions = {
        key: keyId,
        amount,
        currency,
        name: 'Nexvia Marketplace',
        description: 'Secure order payment',
        order_id: razorpayOrderId,

        handler: async (paymentResponse) => {
          setIsCheckingOut(true);
          setOrderMessage('Verifying payment...');

          try {
            await verifyPayment(
              {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              token,
            );

            await clearServerCart(token, ' after payment');

            // Message is shown before the order list refresh, as before.
            setOrderMessage('Payment successful! Order placed.');
            onOrderPlaced();

            await fetchMyOrders();

            setTimeout(() => {
              setIsCartOpen(false);
              setOrderMessage('');
            }, SUCCESS_MESSAGE_DURATION);
          } catch (err) {
            setOrderMessage(
              err.response?.data?.message ||
                'Payment verification failed. Please contact support before retrying.',
            );
          } finally {
            setIsCheckingOut(false);
          }
        },

        modal: {
          ondismiss: () => setIsCheckingOut(false),
        },

        theme: { color: '#101b35' },
      };

      const razorpay = new window.Razorpay(paymentOptions);

      razorpay.on('payment.failed', (response) => {
        setOrderMessage(
          response.error?.description || 'Payment failed. Please try again.',
        );
        setIsCheckingOut(false);
      });

      razorpay.open();
    } catch (err) {
      setOrderMessage(
        err.response?.data?.message ||
          err.message ||
          'Could not start payment. Please try again.',
      );
      setIsCheckingOut(false);
    }
  };

  return {
    isCheckingOut,
    paymentMethod,
    setPaymentMethod,
    handleCheckout,
  };
}
