export const ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer',
};

export const VALID_ROLES = [ROLES.ADMIN, ROLES.VENDOR, ROLES.CUSTOMER];

export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: '/admin-dashboard',
  [ROLES.VENDOR]: '/vendor-dashboard',
  [ROLES.CUSTOMER]: '/customer-dashboard',
};
