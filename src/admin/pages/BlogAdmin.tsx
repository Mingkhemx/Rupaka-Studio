import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ToastContainer } from '../components/Toast';
import { AdminBlogPost, ColumnConfig, FormFieldConfig } from '../types';
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog
} from '../services';
import { useToast, usePagination, useSearch, useSort } from '../hooks/useAdmin';
import { format } from 'date-fns';

const COLUMNS: ColumnConfig[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'author', label: 'Author', sortable: true, width: '120px' },
  { key: 'category', label: 'Category', sortable: true, width: '120px' },
  {
    key: 'date',
    label: 'Date',
    width: '120px',
    sortable: true
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
    placeholder: 'Enter blog title',
    required: true
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    placeholder: 'Enter author name',
    required: true
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    placeholder: 'e.g. Insights, Branding, Technology',
    required: true
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    placeholder: 'Enter blog content (supports markdown)',
    required: true
  },
  {
    name: 'image',
    label: 'Cover Image',
    type: 'file'
  },
  {
    name: 'readTime',
    label: 'Read Time',
    type: 'text',
    placeholder: 'e.g. 5 Menit Baca'
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

export function BlogAdmin() {
  const [items, setItems] = useState<AdminBlogPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminBlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { toasts, showToast, removeToast } = useToast();
  const pagination = usePagination(10);
  const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
  const { results: searchResults } = useSearch(sorted, ['title', 'content', 'author']);

  const filtered = categoryFilter
    ? searchResults.filter(item => item.category === categoryFilter)
    : searchResults;

  useEffect(() => {
    pagination.setTotalItems(filtered.length);
  }, [filtered.length, pagination]);

  useEffect(() => {
    const blogs = getBlogs();
    setItems(blogs);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: AdminBlogPost) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: AdminBlogPost) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      if (selectedItem) {
        updateBlog(selectedItem.id, values);
        showToast('Blog updated successfully', 'success');
      } else {
        addBlog({
          ...values,
          date: format(new Date(), 'dd MMM yyyy')
        });
        showToast('Blog added successfully', 'success');
      }

      setIsFormOpen(false);
      const updated = getBlogs();
      setItems(updated);
    } catch (error) {
      showToast('Error saving blog', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteBlog(selectedItem.id);
      showToast('Blog deleted successfully', 'success');
      setIsDeleteOpen(false);
      const updated = getBlogs();
      setItems(updated);
    }
  };

  const categories = [...new Set(items.map(item => item.category))];
  const displayData = filtered.slice(pagination.startIndex, pagination.endIndex);

  return (
    <AdminLayout title="Blog Management" subtitle="Manage your blog posts">
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
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  // Filter logic integrated in filtered variable
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial">
              <label className="block text-sm font-medium text-text-dark mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={e => {
                  setCategoryFilter(e.target.value);
                  pagination.goToPage(1);
                }}
                className="w-full px-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="self-end bg-accent-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Blog
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
            title: 'No blogs found',
            description: 'Create your first blog post to get started',
            actionLabel: 'Add Blog',
            onAction: handleAdd
          }}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        title={selectedItem ? 'Edit Blog' : 'Add Blog'}
        fields={FORM_FIELDS}
        initialValues={selectedItem || {}}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
        submitLabel={selectedItem ? 'Update' : 'Add'}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        title="Delete Blog"
        message={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AdminLayout>
  );
}
