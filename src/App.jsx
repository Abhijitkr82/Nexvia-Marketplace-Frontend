import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';
import { ROLES } from './constants/roles';

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import CustomerDashboard from './features/customer/pages/CustomerDashboard';
import VendorDashboard from './features/vendor/pages/VendorDashboard';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import CustomerProfile from './features/profile/pages/CustomerProfile';
import VendorProfile from './features/profile/pages/VendorProfile';

// Route table: public auth pages + role-protected dashboards/profiles.
const protectedRoutes = [
  {
    path: '/customer-dashboard',
    role: ROLES.CUSTOMER,
    Page: CustomerDashboard,
  },
  { path: '/vendor-dashboard', role: ROLES.VENDOR, Page: VendorDashboard },
  { path: '/customer-profile', role: ROLES.CUSTOMER, Page: CustomerProfile },
  { path: '/vendor-profile', role: ROLES.VENDOR, Page: VendorProfile },
  { path: '/admin-dashboard', role: ROLES.ADMIN, Page: AdminDashboard },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {protectedRoutes.map(({ path, role, Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRole={role}>
                <Page />
              </ProtectedRoute>
            }
          />
        ))}

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
