// Responsive bordered table shell with loading / error / empty rows.
// Rows are passed as children and are rendered when none of the states apply.
export default function DataTable({
  columns,
  tableClassName = '',
  loading = false,
  loadingMessage,
  errorMessage = '',
  isEmpty = false,
  emptyMessage,
  children,
}) {
  const stateRow = (message) => (
    <tr>
      <td
        colSpan={columns.length}
        className="px-5 py-10 text-center text-gray-500"
      >
        {message}
      </td>
    </tr>
  );

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
      <table className={`w-full ${tableClassName} text-left text-sm`}>
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-4">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {loading
            ? stateRow(loadingMessage)
            : errorMessage
              ? stateRow(errorMessage)
              : isEmpty
                ? stateRow(emptyMessage)
                : children}
        </tbody>
      </table>
    </div>
  );
}
