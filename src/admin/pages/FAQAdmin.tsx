import { useEffect, useState } from 'react';
import { Plus, Search, GripVertical } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ToastContainer } from '../components/Toast';
import { AdminFaqItem, ColumnConfig, FormFieldConfig } from '../types';
import {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs
} from '../services';
import { useToast, usePagination, useSearch, useSort } from '../hooks/useAdmin';

const COLUMNS: ColumnConfig[] = [
  {
    key: 'order',
    label: 'Order',
    width: '60px',
    render: () => <GripVertical className="w-4 h-4 text-muted-grey" />
  },
  { key: 'question', label: 'Question', sortable: true },
  {
    key: 'answer',
    label: 'Preview',
    render: (value) => (
      <p className="text-sm text-muted-grey truncate max-w-xs">{value}</p>
    )
  }
];

const FORM_FIELDS: FormFieldConfig[] = [
  {
    name: 'question',
    label: 'Question',
    type: 'text',
    placeholder: 'Enter your question',
    required: true
  },
  {
    name: 'answer',
    label: 'Answer',
    type: 'textarea',
    placeholder: 'Enter the answer',
    required: true
  }
];

export function FAQAdmin() {
  const [items, setItems] = useState<AdminFaqItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminFaqItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { toasts, showToast, removeToast } = useToast();
  const pagination = usePagination(10);
  const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
  const { results: searchResults } = useSearch(sorted, ['question', 'answer']);

  useEffect(() => {
    pagination.setTotalItems(searchResults.length);
  }, [searchResults.length, pagination]);

  useEffect(() => {
    const faqs = getFaqs().sort((a, b) => a.order - b.order);
    setItems(faqs);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: AdminFaqItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: AdminFaqItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (values: Record<string, any>) => {
    try {
      if (selectedItem) {
        updateFaq(selectedItem.id, values);
        showToast('FAQ updated successfully', 'success');
      } else {
        addFaq({
          ...values,
          order: items.length
        });
        showToast('FAQ added successfully', 'success');
      }

      setIsFormOpen(false);
      const updated = getFaqs().sort((a, b) => a.order - b.order);
      setItems(updated);
    } catch (error) {
      showToast('Error saving FAQ', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteFaq(selectedItem.id);
      showToast('FAQ deleted successfully', 'success');
      setIsDeleteOpen(false);
      const updated = getFaqs().sort((a, b) => a.order - b.order);
      setItems(updated);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }

    // Update order values
    const reordered = newItems.map((item, idx) => ({ ...item, order: idx }));
    reorderFaqs(reordered);
    setItems(reordered);
    showToast('Order updated', 'success');
  };

  const displayData = searchResults.slice(pagination.startIndex, pagination.endIndex);

  return (
    <AdminLayout title="FAQ Management" subtitle="Manage frequently asked questions">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-text-dark mb-2">Search FAQs</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-grey" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="self-end bg-accent-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>

        {/* Table */}
        <DataTable
          data={displayData.map((item, idx) => ({
            ...item,
            _displayIndex: pagination.startIndex + idx
          }))}
          columns={COLUMNS}
          sortKey={sortKey as string}
          sortOrder={sortOrder}
          onSort={(key) => toggleSort(key as any)}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          actions={{
            edit: (item: any) => handleEdit({ ...item, _displayIndex: undefined } as AdminFaqItem),
            delete: (item: any) => handleDelete({ ...item, _displayIndex: undefined } as AdminFaqItem),
            custom: [
              {
                label: '↑',
                onClick: (item: any) => moveItem(items.indexOf(item), 'up')
              },
              {
                label: '↓',
                onClick: (item: any) => moveItem(items.indexOf(item), 'down')
              }
            ]
          }}
          emptyState={{
            title: 'No FAQs found',
            description: 'Add your first FAQ to get started',
            actionLabel: 'Add FAQ',
            onAction: handleAdd
          }}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        title={selectedItem ? 'Edit FAQ' : 'Add FAQ'}
        fields={FORM_FIELDS}
        initialValues={selectedItem || {}}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
        submitLabel={selectedItem ? 'Update' : 'Add'}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        title="Delete FAQ"
        message={`Are you sure you want to delete this FAQ? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </AdminLayout>
  );
}
