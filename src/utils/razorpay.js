import { RAZORPAY_CHECKOUT_SCRIPT } from '../config/api';

// Loads Razorpay Checkout only when it is needed (online payments).
export const loadRazorpayScript = async () => {
  if (window.Razorpay) return;

  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error('Razorpay Checkout could not be loaded.'));
    document.body.appendChild(script);
  });
};
