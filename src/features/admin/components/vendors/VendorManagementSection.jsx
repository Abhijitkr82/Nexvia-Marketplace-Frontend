
import { Store } from 'lucide-react';
import SectionHeader from '../../../../components/common/SectionHeader';
import SearchInput from '../../../../components/common/SearchInput';
import RetryAlert from '../../../../components/common/RetryAlert';
import DataTable from '../../../../components/common/DataTable';
import VendorRow from './VendorRow';

const COLUMNS = [
  'Vendor',
  'Email',
  'Phone',
  'Registered On',
  'Status',
  'Actions',
];

export default function VendorManagementSection({ vendorsState }) {
  const {
    vendors,
    filteredVendors,
    vendorsLoading,
    vendorsError,
    vendorSearch,
    setVendorSearch,
    updatingVendorId,
    vendorActionMessage,
    fetchVendors,
    handleVendorStatusUpdate,
  } = vendorsState;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={Store}
        iconClassName="text-[#a17a3d]"
        title="Vendor Management"
        description="View and search registered marketplace vendors."
        badge={`${vendors.length} vendors`}
        badgeClassName="bg-[#f8f3e8] text-[#8a682f]"
      />

      <div className="mt-6">
        <SearchInput
          value={vendorSearch}
          onChange={setVendorSearch}
          placeholder="Search vendors by name, email or phone..."
          focusClassName="focus:border-[#a17a3d] focus:ring-[#d9b879]/20"
        />
      </div>

      {vendorActionMessage && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-[#d9b879]/30 bg-[#fbf8f0] p-3 text-sm text-[#765a2d]"
        >
          {vendorActionMessage}
        </p>
      )}

      <div className="mt-5">
        <RetryAlert
          message={vendorsError}
          onRetry={fetchVendors}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <DataTable
          columns={COLUMNS}
          tableClassName="min-w-[950px]"
          loading={vendorsLoading}
          loadingMessage="Loading vendors..."
          isEmpty={filteredVendors.length === 0}
          emptyMessage="No vendors match your search."
        >
          {filteredVendors.map((vendor) => (
            <VendorRow
              key={vendor._id}
              vendor={vendor}
              updatingVendorId={updatingVendorId}
              onStatusUpdate={handleVendorStatusUpdate}
            />
          ))}
        </DataTable>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing{' '}
        <span className="font-semibold text-[#101b35]">
          {filteredVendors.length}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#101b35]">
          {vendors.length}
        </span>{' '}
        vendors.
      </p>
    </section>
  );
}
