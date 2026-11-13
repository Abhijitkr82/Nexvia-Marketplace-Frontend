import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/authService';
import { setSession } from '../../../utils/authStorage';
import { DASHBOARD_ROUTES, VALID_ROLES } from '../../../constants/roles';

// Login form state + submit (stores the JWT and role, then redirects by role).
export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({ email, password });

      const token = data.token;
      const role = data.role || data.user?.role;

      if (!token || !role) {
        setError('Invalid server response. Please try again.');
        return;
      }

      if (!VALID_ROLES.includes(role)) {
        setError('Invalid user role. Please contact support.');
        return;
      }

      setSession(token, role);
      navigate(DASHBOARD_ROUTES[role]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please check your credentials.',
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    showPassword,
    setShowPassword,
    loading,
    handleLogin,
  };
}
