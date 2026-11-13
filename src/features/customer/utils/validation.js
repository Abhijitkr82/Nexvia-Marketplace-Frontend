// Returns an error message, or '' when the shipping address is valid.
export const validateShippingAddress = (address) => {
  const { street, city, state, zipCode, country } = address;

  if (!street.trim() || !city.trim() || !state.trim() || !country.trim()) {
    return 'Please fill in all shipping address fields.';
  }

  if (!/^\d{6}$/.test(zipCode)) {
    return 'Please enter a valid 6-digit PIN code.';
  }

  return '';
};

// Trimmed address object sent to the payment endpoints.
export const toShippingAddressPayload = (address) => ({
  street: address.street.trim(),
  city: address.city.trim(),
  state: address.state.trim(),
  zipCode: address.zipCode,
  country: address.country.trim(),
});
