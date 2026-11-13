
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, clearToken } from '../utils/authStorage';

// Returns a reusable logout handler.
// keepRole: removes only the JWT.
// replace: replaces the current history entry after redirecting.
export default function useLogout({
  keepRole = false,
  replace = false,
} = {}) {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    if (keepRole) {
      clearToken();
    } else {
      clearSession();
    }

    navigate('/login', replace ? { replace: true } : undefined);
  }, [keepRole, replace, navigate]);

  return logout;
}
