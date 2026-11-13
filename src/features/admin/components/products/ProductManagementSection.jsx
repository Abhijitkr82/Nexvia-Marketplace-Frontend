
import { Package } from 'lucide-react';
import SectionHeader from '../../../../components/common/SectionHeader';
import SearchInput from '../../../../components/common/SearchInput';
import RetryAlert from '../../../../components/common/RetryAlert';
import DataTable from '../../../../components/common/DataTable';
import ProductEditForm from './ProductEditForm';
import ProductRow from './ProductRow';

const COLUMNS = [
  'Product',
  'Category',
  'Price',
  'Stock',
  'Vendor',
  'Added On',
  'Actions',
];

export default function ProductManagementSection({ productsState }) {
  const {
    products,
    filteredProducts,
    productsLoading,
    productsError,
    productSearch,
    setProductSearch,
    editingProduct,
    savingProduct,
    deletingProductId,
    productActionMessage,
    fetchProducts,
    startEditing,
    updateEditingField,
    cancelEditing,
    handleUpdateProduct,
    handleDeleteProduct,
  } = productsState;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={Package}
        iconClassName="text-[#a17a3d]"
        title="Product Management"
        description="View and search marketplace products."
        badge={`${products.length} products`}
        badgeClassName="bg-[#f8f3e8] text-[#8a682f]"
      />

      <div className="mt-6">
        <SearchInput
          value={productSearch}
          onChange={setProductSearch}
          placeholder="Search product, category or vendor..."
          focusClassName="focus:border-[#a17a3d] focus:ring-[#d9b879]/20"
        />
      </div>

      {productActionMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-[#d9b879]/30 bg-[#fbf8f0] p-3 text-sm text-[#765a2d]"
        >
          {productActionMessage}
        </div>
      )}

      {editingProduct && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <ProductEditForm
            editingProduct={editingProduct}
            savingProduct={savingProduct}
            onFieldChange={updateEditingField}
            onSubmit={handleUpdateProduct}
            onCancel={cancelEditing}
          />
        </div>
      )}

      <div className="mt-5">
        <RetryAlert
          message={productsError}
          onRetry={fetchProducts}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <DataTable
          columns={COLUMNS}
          tableClassName="min-w-[850px]"
          loading={productsLoading}
          loadingMessage="Loading products..."
          isEmpty={filteredProducts.length === 0}
          emptyMessage="No products found."
        >
          {filteredProducts.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              deletingProductId={deletingProductId}
              onEdit={startEditing}
              onDelete={handleDeleteProduct}
            />
          ))}
        </DataTable>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing{' '}
        <span className="font-semibold text-[#101b35]">
          {filteredProducts.length}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#101b35]">
          {products.length}
        </span>{' '}
        products.
      </p>
    </section>
  );
}
