import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ToastContainer } from '../components/Toast';
import { AdminPortfolioItem, ColumnConfig, FormFieldConfig } from '../types';
import {
  getPortfolios,
  addPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../services';
import { useToast, usePagination, useSearch, useSort } from '../hooks/useAdmin';
import { format } from 'date-fns';

const COLUMNS: ColumnConfig[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'category', label: 'Category', sortable: true, width: '120px' },
  {
    key: 'price',
    label: 'Price',
    width: '120px'
  },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (value) => (
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
        value === 'published'
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {value === 'published' ? 'Published' : 'Draft'}
      </span>
    )
  }
];

const FORM_FIELDS: FormFieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter portfolio title',
    required: true
  },
  {
    name: 'category',
    label: 'Category',
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
    name: 'price',
    label: 'Price',
    type: 'text',
    placeholder: 'e.g. Rp 150.000',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter detailed description',
    required: true
  },
  {
    name: 'image',
    label: 'Image',
    type: 'file'
  },
  {
    name: 'features',
    label: 'Features',
    type: 'array'
  }
];

export function PortfolioAdmin() {
  const [items, setItems] = useState<AdminPortfolioItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminPortfolioItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { toasts, showToast, removeToast } = useToast();
  const pagination = usePagination(10);
  const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
  const { results: searchResults } = useSearch(sorted, ['title', 'description'], searchTerm);

  const filtered = categoryFilter
    ? searchResults.filter(item => item.category === categoryFilter)
    : searchResults;

  useEffect(() => {
    pagination.setTotalItems(filtered.length);
  }, [filtered.length, pagination]);

  useEffect(() => {
    const portfolios = getPortfolios();
    setItems(portfolios);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: AdminPortfolioItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: AdminPortfolioItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      if (selectedItem) {
        updatePortfolio(selectedItem.id, values);
        showToast('Portfolio updated successfully', 'success');
      } else {
        addPortfolio(values);
        showToast('Portfolio added successfully', 'success');
      }

      setIsFormOpen(false);
      const updated = getPortfolios();
      setItems(updated);
    } catch (error) {
      showToast('Error saving portfolio', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deletePortfolio(selectedItem.id);
      showToast('Portfolio deleted successfully', 'success');
      setIsDeleteOpen(false);
      const updated = getPortfolios();
      setItems(updated);
    }
  };

  const handleToggleStatus = (item: AdminPortfolioItem) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    updatePortfolio(item.id, { status: newStatus });
    showToast(`Portfolio ${newStatus}`, 'success');
    const updated = getPortfolios();
    setItems(updated);
  };

  const displayData = filtered.slice(pagination.startIndex, pagination.endIndex);

  return (
    <AdminLayout title="Portfolio Management" subtitle="Manage your portfolio items">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-line-grey">
          <div>
            <h2 className="text-2xl font-bold text-text-dark">Portfolio Management</h2>
            <p className="text-muted-grey text-sm mt-1">Manage your portfolio items</p>
          </div>
          
          <button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Portfolio
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-dark mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-grey" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  pagination.goToPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-text-dark"
              />
            </div>
          </div>

          <div className="w-full lg:w-48">
            <label className="block text-sm font-medium text-text-dark mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={e => {
                setCategoryFilter(e.target.value);
                pagination.goToPage(1);
              }}
              className="w-full px-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-text-dark"
            >
              <option value="">All Categories</option>
              <option value="poster">Poster</option>
              <option value="logo">Logo</option>
              <option value="website">Website</option>
              <option value="custom">Custom</option>
            </select>
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
                label: 'Toggle',
                onClick: handleToggleStatus
              }
            ]
          }}
          emptyState={{
            title: 'No portfolios found',
            description: 'Create your first portfolio item to get started',
            actionLabel: 'Add Portfolio',
            onAction: handleAdd
          }}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        title={selectedItem ? 'Edit Portfolio' : 'Add Portfolio'}
        fields={FORM_FIELDS}
        initialValues={selectedItem || {}}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
        submitLabel={selectedItem ? 'Update' : 'Add'}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        title="Delete Portfolio"
        message={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AdminLayout>
  );
}
