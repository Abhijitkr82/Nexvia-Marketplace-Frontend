import { useState } from 'react';
import { getVendors, updateVendorStatus } from '../../../services/adminService';
import { getToken } from '../../../utils/authStorage';
import { filterVendors } from '../utils/filters';

// Vendor list plus approve / reject actions.
export default function useAdminVendors(checkAdmin) {
  const [vendors, setVendors] = useState([]);
  const [vendorsLoading, setVendorsLoading] = useState(true);
  const [vendorsError, setVendorsError] = useState('');
  const [vendorSearch, setVendorSearch] = useState('');
  const [updatingVendorId, setUpdatingVendorId] = useState(null);
  const [vendorActionMessage, setVendorActionMessage] = useState('');

  const fetchVendors = async () => {
    if (!checkAdmin()) return;

    setVendorsLoading(true);
    setVendorsError('');

    try {
      const data = await getVendors(getToken());

      setVendors(Array.isArray(data.vendors) ? data.vendors : []);
    } catch (err) {
      setVendorsError(err.message || 'Unable to fetch vendors.');
    } finally {
      setVendorsLoading(false);
    }
  };

  // status: 'approved' | 'rejected'
  const handleVendorStatusUpdate = async (vendor, status) => {
    if (!checkAdmin()) return;

    const action = status === 'approved' ? 'approve' : 'reject';

    if (
      status === 'rejected' &&
      !window.confirm(
        `Are you sure you want to reject ${vendor.name || 'this vendor'}?`,
      )
    ) {
      return;
    }

    setUpdatingVendorId(vendor._id);
    setVendorActionMessage('');

    try {
      await updateVendorStatus(vendor._id, status, getToken());

      setVendorActionMessage(
        `${vendor.name || 'Vendor'} ${status} successfully.`,
      );

      await fetchVendors();
    } catch (err) {
      setVendorActionMessage(err.message || `Unable to ${action} vendor.`);
    } finally {
      setUpdatingVendorId(null);
    }
  };

  return {
    vendors,
    filteredVendors: filterVendors(vendors, vendorSearch),
    vendorsLoading,
    vendorsError,
    vendorSearch,
    setVendorSearch,
    updatingVendorId,
    vendorActionMessage,
    fetchVendors,
    handleVendorStatusUpdate,
  };
}
