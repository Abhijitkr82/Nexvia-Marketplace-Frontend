
import { ShoppingCart } from 'lucide-react';
import SectionHeader from '../../../../components/common/SectionHeader';
import SearchInput from '../../../../components/common/SearchInput';
import RetryAlert from '../../../../components/common/RetryAlert';
import DataTable from '../../../../components/common/DataTable';
import OrderRow from './OrderRow';

const COLUMNS = ['Customer', 'Products', 'Total', 'Status', 'Order Date'];

export default function OrderManagementSection({ ordersState }) {
  const {
    orders,
    filteredOrders,
    ordersLoading,
    ordersError,
    orderSearch,
    setOrderSearch,
    orderStatusChanges,
    updatingOrderId,
    orderStatusMessage,
    fetchOrders,
    selectOrderStatus,
    updateStatus,
  } = ordersState;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={ShoppingCart}
        iconClassName="text-[#a17a3d]"
        title="Orders Management"
        description="View customer orders and their current status."
        badge={`${orders.length} orders`}
        badgeClassName="bg-[#f8f3e8] text-[#8a682f]"
      />

      <div className="mt-6">
        <SearchInput
          value={orderSearch}
          onChange={setOrderSearch}
          placeholder="Search customer, email or order status..."
          focusClassName="focus:border-[#a17a3d] focus:ring-[#d9b879]/20"
        />
      </div>

      {orderStatusMessage && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-[#d9b879]/30 bg-[#fbf8f0] p-3 text-sm text-[#765a2d]"
        >
          {orderStatusMessage}
        </p>
      )}

      <div className="mt-5">
        <RetryAlert
          message={ordersError}
          onRetry={fetchOrders}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <DataTable
          columns={COLUMNS}
          tableClassName="min-w-[950px]"
          loading={ordersLoading}
          loadingMessage="Loading orders..."
          errorMessage={ordersError ? 'Unable to load orders.' : ''}
          isEmpty={filteredOrders.length === 0}
          emptyMessage="No orders found."
        >
          {filteredOrders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              orderStatusChanges={orderStatusChanges}
              updatingOrderId={updatingOrderId}
              onSelectStatus={selectOrderStatus}
              onUpdateStatus={updateStatus}
            />
          ))}
        </DataTable>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing{' '}
        <span className="font-semibold text-[#101b35]">
          {filteredOrders.length}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#101b35]">
          {orders.length}
        </span>{' '}
        orders.
      </p>
    </section>
  );
}
