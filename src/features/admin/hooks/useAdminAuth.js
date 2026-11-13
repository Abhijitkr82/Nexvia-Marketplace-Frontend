import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import { clearSession, getRole, getToken } from '../../../utils/authStorage';
import { ROLES } from '../../../constants/roles';

// Admin-only guard used before protected admin API calls, plus logout.
export default function useAdminAuth() {
  const navigate = useNavigate();
  const logout = useLogout({ replace: true });

  // Returns true when an admin session exists; otherwise clears the session,
  // redirects to the login page and returns false.
  const checkAdmin = () => {
    const token = getToken();
    const role = getRole();

    if (!token || role !== ROLES.ADMIN) {
      clearSession();
      navigate('/login', { replace: true });
      return false;
    }

    return true;
  };

  return { checkAdmin, logout };
}
