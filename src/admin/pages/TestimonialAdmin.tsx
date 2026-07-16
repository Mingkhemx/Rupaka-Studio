import { useEffect, useState } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ToastContainer } from '../components/Toast';
import { AdminTestimonial, ColumnConfig, FormFieldConfig } from '../types';
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../services';
import { useToast, usePagination, useSearch, useSort } from '../hooks/useAdmin';

const COLUMNS: ColumnConfig[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'rating',
    label: 'Rating',
    width: '100px',
    render: (value) => (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
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
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter full name',
    required: true
  },
  {
    name: 'role',
    label: 'Role/Position',
    type: 'text',
    placeholder: 'e.g. Business Owner, Manager',
    required: true
  },
  {
    name: 'content',
    label: 'Testimonial',
    type: 'textarea',
    placeholder: 'Enter the testimonial text',
    required: true
  },
  {
    name: 'rating',
    label: 'Rating',
    type: 'rating',
    required: true
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' }
    ]
  }
];

export function TestimonialAdmin() {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminTestimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('');

  const { toasts, showToast, removeToast } = useToast();
  const pagination = usePagination(10);
  const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
  const { results: searchResults } = useSearch(sorted, ['name', 'role', 'content']);

  const filtered = ratingFilter
    ? searchResults.filter(item => item.rating === parseInt(ratingFilter))
    : searchResults;

  useEffect(() => {
    pagination.setTotalItems(filtered.length);
  }, [filtered.length, pagination]);

  useEffect(() => {
    const testimonials = getTestimonials();
    setItems(testimonials);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: AdminTestimonial) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: AdminTestimonial) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      if (selectedItem) {
        updateTestimonial(selectedItem.id, values);
        showToast('Testimonial updated successfully', 'success');
      } else {
        addTestimonial(values);
        showToast('Testimonial added successfully', 'success');
      }

      setIsFormOpen(false);
      const updated = getTestimonials();
      setItems(updated);
    } catch (error) {
      showToast('Error saving testimonial', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteTestimonial(selectedItem.id);
      showToast('Testimonial deleted successfully', 'success');
      setIsDeleteOpen(false);
      const updated = getTestimonials();
      setItems(updated);
    }
  };

  const displayData = filtered.slice(pagination.startIndex, pagination.endIndex);

  return (
    <AdminLayout title="Testimonials Management" subtitle="Manage customer testimonials and reviews">
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
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial">
              <label className="block text-sm font-medium text-text-dark mb-2">Rating</label>
              <select
                value={ratingFilter}
                onChange={e => {
                  setRatingFilter(e.target.value);
                  pagination.goToPage(1);
                }}
                className="w-full px-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="self-end bg-accent-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
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
            delete: handleDelete
          }}
          emptyState={{
            title: 'No testimonials found',
            description: 'Add your first testimonial to get started',
            actionLabel: 'Add Testimonial',
            onAction: handleAdd
          }}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        title={selectedItem ? 'Edit Testimonial' : 'Add Testimonial'}
        fields={FORM_FIELDS}
        initialValues={selectedItem || { rating: 5 }}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
        submitLabel={selectedItem ? 'Update' : 'Add'}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${selectedItem?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AdminLayout>
  );
}
