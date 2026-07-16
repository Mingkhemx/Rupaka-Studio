import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { ColumnConfig } from '../types';
import { EmptyState } from './EmptyState';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig[];
  onSort?: (key: string) => void;
  sortKey?: string | null;
  sortOrder?: 'asc' | 'desc';
  currentPage?: number;
  itemsPerPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  actions?: {
    edit?: (item: T) => void;
    delete?: (item: T) => void;
    custom?: Array<{
      label: string;
      onClick: (item: T) => void;
      icon?: React.ReactNode;
    }>;
  };
  emptyState?: {
    title: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
  };
  loading?: boolean;
  rowClassName?: (item: T) => string;
}

export function DataTable<T extends { id?: string }>({
  data,
  columns,
  onSort,
  sortKey,
  sortOrder,
  currentPage = 1,
  itemsPerPage = 10,
  totalPages = 1,
  onPageChange,
  actions,
  emptyState,
  loading = false,
  rowClassName
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-soft-card rounded" />
        ))}
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <EmptyState
        title={emptyState.title}
        description={emptyState.description}
        action={{ label: emptyState.actionLabel, onClick: emptyState.onAction }}
      />
    );
  }

  if (data.length === 0) {
    return <EmptyState title="No data" description="No items to display" />;
  }

  const getSortIcon = (columnKey: string) => {
    if (sortKey !== columnKey) {
      return <div className="w-4 h-4 opacity-20" />;
    }
    return sortOrder === 'asc'
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-line-grey bg-white">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-soft-card border-b border-line-grey">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left font-semibold text-text-dark ${column.width || ''}`}
                  onClick={() => {
                    if (column.sortable && onSort) {
                      onSort(column.key);
                    }
                  }}
                  style={{
                    cursor: column.sortable ? 'pointer' : 'default',
                    width: column.width
                  }}
                >
                  <div className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right font-semibold text-text-dark">Actions</th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, idx) => (
              <motion.tr
                key={row.id || idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border-b border-line-grey hover:bg-soft-card-2 transition-colors ${rowClassName?.(row) || ''}`}
              >
                {columns.map(column => (
                  <td key={`${row.id || idx}-${column.key}`} className="px-4 py-3 text-text-dark">
                    {column.render
                      ? column.render((row as any)[column.key], row)
                      : (row as any)[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {actions.edit && (
                        <button
                          onClick={() => actions.edit?.(row)}
                          className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                        >
                          Edit
                        </button>
                      )}
                      {actions.delete && (
                        <button
                          onClick={() => actions.delete?.(row)}
                          className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      )}
                      {actions.custom?.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(row)}
                          className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-medium flex items-center gap-1"
                        >
                          {action.icon}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between p-4 bg-soft-card rounded-lg">
          <span className="text-sm text-muted-grey">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="p-2 hover:bg-soft-card-2 rounded disabled:opacity-50 transition-colors"
              title="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 hover:bg-soft-card-2 rounded disabled:opacity-50 transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-soft-card-2 rounded disabled:opacity-50 transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-soft-card-2 rounded disabled:opacity-50 transition-colors"
              title="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
