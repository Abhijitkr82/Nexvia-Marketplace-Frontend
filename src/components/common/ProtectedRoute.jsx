import { Navigate } from 'react-router-dom';
import { getRole, getToken } from '../../utils/authStorage';

// Blocks a route unless the user is logged in (JWT present) and, when
// `allowedRole` is given, has that role.
export default function ProtectedRoute({ children, allowedRole }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
