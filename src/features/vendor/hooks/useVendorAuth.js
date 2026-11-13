
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import { clearSession, getToken } from '../../../utils/authStorage';

// Handles vendor authentication and authorization errors.
export default function useVendorAuth(showMessage) {
  const navigate = useNavigate();
  const logout = useLogout();
  const token = getToken();

  // Returns true when an authentication error has been handled.
  const handleAuthError = useCallback(
    (error) => {
      if (error.response?.status === 401) {
        clearSession();
        navigate('/login');
        return true;
      }

      if (error.response?.status === 403) {
        showMessage(
          'Vendor permission required. Please log in with a vendor account.',
          'error'
        );
        return true;
      }

      return false;
    },
    [navigate, showMessage]
  );

  return {
    token,
    navigate,
    handleAuthError,
    logout,
  };
}
