import { useEffect, useState } from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ToastContainer } from '../components/Toast';
import { AdminOrder, ColumnConfig, FormFieldConfig } from '../types';
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder
} from '../services';
import { useToast, usePagination, useSearch, useSort } from '../hooks/useAdmin';
import { format } from 'date-fns';

const COLUMNS: ColumnConfig[] = [
  { key: 'id', label: 'Order ID', sortable: true, width: '110px' },
  { key: 'clientName', label: 'Client', sortable: true },
  { key: 'clientEmail', label: 'Email', sortable: true },
  { key: 'projectType', label: 'Type', sortable: true, width: '100px' },
  {
    key: 'status',
    label: 'Status',
    width: '140px',
    render: (value) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      const labels = {
        pending: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled'
      };
      return (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors[value]}`}>
          {labels[value]}
        </span>
      );
    }
  },
  {
    key: 'amount',
    label: 'Amount',
    width: '120px'
  }
];

const FORM_FIELDS: FormFieldConfig[] = [
  {
    name: 'clientName',
    label: 'Client Name',
    type: 'text',
    placeholder: 'Enter client name',
    required: true
  },
  {
    name: 'clientEmail',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email address',
    required: true
  },
  {
    name: 'projectType',
    label: 'Project Type',
    type: 'select',
    required: true,
    options: [
      { value: 'poster', label: 'Poster' },
      { value: 'logo', label: 'Logo' },
      { value: 'website', label: 'Website' },
      { value: 'custom', label: 'Custom' }
    ]
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'text',
    placeholder: 'e.g. Rp 150.000',
    required: true
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ]
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    placeholder: 'Optional notes about the order'
  }
];

export function OrdersAdmin() {
  const [items, setItems] = useState<AdminOrder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { toasts, showToast, removeToast } = useToast();
  const pagination = usePagination(10);
  const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
  const { results: searchResults } = useSearch(sorted, ['id', 'clientName', 'clientEmail']);

  const filtered = statusFilter
    ? searchResults.filter(item => item.status === statusFilter)
    : searchResults;

  useEffect(() => {
    pagination.setTotalItems(filtered.length);
  }, [filtered.length, pagination]);

  useEffect(() => {
    const orders = getOrders();
    setItems(orders);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: AdminOrder) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: AdminOrder) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleViewDetails = (item: AdminOrder) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      if (selectedItem) {
        updateOrder(selectedItem.id, values);
        showToast('Order updated successfully', 'success');
      } else {
        addOrder(values);
        showToast('Order added successfully', 'success');
      }

      setIsFormOpen(false);
      const updated = getOrders();
      setItems(updated);
    } catch (error) {
      showToast('Error saving order', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteOrder(selectedItem.id);
      showToast('Order deleted successfully', 'success');
      setIsDeleteOpen(false);
      const updated = getOrders();
      setItems(updated);
    }
  };

  const displayData = filtered.slice(pagination.startIndex, pagination.endIndex);

  return (
    <AdminLayout title="Orders Management" subtitle="Manage customer orders and projects">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-text-dark mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-grey" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial">
              <label className="block text-sm font-medium text-text-dark mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  pagination.goToPage(1);
                }}
                className="w-full px-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="self-end bg-accent-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Order
            </button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          data={displayData}
          columns={COLUMNS}
          sortKey={sortKey as string}
          sortOrder={sortOrder}
          onSort={(key) => toggleSort(key as any)}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          actions={{
            edit: handleEdit,
            delete: handleDelete,
            custom: [
              {
                label: 'Details',
                icon: <Eye className="w-3 h-3" />,
                onClick: handleViewDetails
              }
            ]
          }}
          emptyState={{
            title: 'No orders found',
            description: 'Add your first order to get started',
            actionLabel: 'Add Order',
            onAction: handleAdd
          }}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        title={selectedItem ? 'Edit Order' : 'Add Order'}
        fields={FORM_FIELDS}
        initialValues={selectedItem || { status: 'pending' }}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
        submitLabel={selectedItem ? 'Update' : 'Add'}
      />

      {/* Details Modal */}
      {selectedItem && (
        <div className={`fixed inset-0 ${isDetailsOpen ? 'bg-black/50' : 'hidden'} z-40`} onClick={() => setIsDetailsOpen(false)} />
      )}
      {selectedItem && isDetailsOpen && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 max-w-md w-full mx-4 p-6">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Order Details</h3>
          <div className="space-y-3 text-sm mb-6">
            <div>
              <p className="text-muted-grey">Order ID</p>
              <p className="font-medium text-text-dark">{selectedItem.id}</p>
            </div>
            <div>
              <p className="text-muted-grey">Client</p>
              <p className="font-medium text-text-dark">{selectedItem.clientName}</p>
            </div>
            <div>
              <p className="text-muted-grey">Email</p>
              <p className="font-medium text-text-dark">{selectedItem.clientEmail}</p>
            </div>
            <div>
              <p className="text-muted-grey">Project Type</p>
              <p className="font-medium text-text-dark capitalize">{selectedItem.projectType}</p>
            </div>
            <div>
              <p className="text-muted-grey">Amount</p>
              <p className="font-medium text-text-dark">{selectedItem.amount}</p>
            </div>
            <div>
              <p className="text-muted-grey">Created</p>
              <p className="font-medium text-text-dark">
                {format(new Date(selectedItem.createdAt), 'dd MMM yyyy HH:mm')}
              </p>
            </div>
            {selectedItem.notes && (
              <div>
                <p className="text-muted-grey">Notes</p>
                <p className="font-medium text-text-dark">{selectedItem.notes}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsDetailsOpen(false)}
            className="w-full px-4 py-2.5 bg-accent-orange hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        title="Delete Order"
        message={`Are you sure you want to delete order "${selectedItem?.id}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AdminLayout>
  );
}
