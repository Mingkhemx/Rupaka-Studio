import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useAdmin';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services';
import type { AdminOrder } from '../types';
import { format } from 'date-fns';

const PER_PAGE = 10;

const STATUS_CONFIG: Record<AdminOrder['status'], { bg: string; color: string; label: string }> = {
  pending:     { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
  in_progress: { bg: '#dbeafe', color: '#1e40af', label: 'In Progress' },
  completed:   { bg: '#dcfce7', color: '#166534', label: 'Completed' },
  cancelled:   { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' }
};

function StatusBadge({ status }: { status: AdminOrder['status'] }) {
  const s = STATUS_CONFIG[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ─── Form modal ───────────────────────────────────────────────────────────────

interface OrderForm {
  clientName: string;
  clientEmail: string;
  projectType: 'poster' | 'logo' | 'website' | 'custom';
  amount: string;
  status: AdminOrder['status'];
  notes: string;
}

const emptyForm: OrderForm = {
  clientName: '', clientEmail: '', projectType: 'poster',
  amount: '', status: 'pending', notes: ''
};

function itemToForm(item: AdminOrder): OrderForm {
  return {
    clientName: item.clientName, clientEmail: item.clientEmail,
    projectType: item.projectType, amount: item.amount,
    status: item.status, notes: item.notes ?? ''
  };
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 7,
  fontSize: 14, color: '#111827', background: '#fff', outline: 'none', boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6
};

function FormModal({ open, editing, onClose, onSave }: {
  open: boolean; editing: AdminOrder | null; onClose: () => void; onSave: (d: OrderForm) => void;
}) {
  const [form, setForm] = useState<OrderForm>(emptyForm);
  useEffect(() => { setForm(editing ? itemToForm(editing) : emptyForm); }, [editing, open]);
  if (!open) return null;

  const set = (k: keyof OrderForm, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>{editing ? 'Edit Order' : 'Tambah Order'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}><X style={{ width: 20, height: 20 }} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Nama Klien *</label>
              <input style={inputStyle} value={form.clientName} onChange={e => set('clientName', e.target.value)} placeholder="Nama klien" required />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" style={inputStyle} value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} placeholder="email@contoh.com" required />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Jenis Proyek *</label>
              <select style={inputStyle} value={form.projectType} onChange={e => set('projectType', e.target.value)}>
                <option value="poster">Poster</option>
                <option value="logo">Logo</option>
                <option value="website">Website</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Jumlah *</label>
              <input style={inputStyle} value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="e.g. Rp 150.000" required />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Status *</label>
            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Catatan</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Catatan opsional..." />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button type="button" onClick={onClose} style={{ padding: '9px 18px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Batal</button>
            <button type="submit" style={{ padding: '9px 20px', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{editing ? 'Update' : 'Tambah'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Detail modal ─────────────────────────────────────────────────────────────

function DetailModal({ order, onClose }: { order: AdminOrder | null; onClose: () => void }) {
  if (!order) return null;
  const s = STATUS_CONFIG[order.status];

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', gap: 12, paddingBottom: 10, borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ width: 120, fontSize: 13, color: '#6b7280', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value}</span>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>Detail Order</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}><X style={{ width: 20, height: 20 }} /></button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Row label="Order ID" value={order.id} />
          <Row label="Nama Klien" value={order.clientName} />
          <Row label="Email" value={order.clientEmail} />
          <Row label="Jenis Proyek" value={order.projectType.charAt(0).toUpperCase() + order.projectType.slice(1)} />
          <Row label="Jumlah" value={order.amount} />
          <div style={{ display: 'flex', gap: 12, paddingBottom: 10, borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ width: 120, fontSize: 13, color: '#6b7280', flexShrink: 0 }}>Status</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color }}>{s.label}</span>
          </div>
          <Row label="Dibuat" value={format(new Date(order.createdAt), 'dd MMM yyyy HH:mm')} />
          {order.notes && <Row label="Catatan" value={order.notes} />}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '10px 0', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ open, id, onClose, onConfirm }: { open: boolean; id: string; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, padding: 24, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Hapus Order</h3>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Hapus order <strong>"{id}"</strong>? Tidak bisa dibatalkan.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Batal</button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', background: '#ef4444', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Hapus</button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, total, perPage, onChange }: { page: number; total: number; perPage: number; onChange: (p: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', paddingTop: 12 }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} dari {total}</span>
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.4 : 1, display: 'flex' }}><ChevronLeft style={{ width: 16, height: 16 }} /></button>
      <span style={{ fontSize: 13, color: '#374151' }}>{page} / {totalPages}</span>
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, display: 'flex' }}><ChevronRight style={{ width: 16, height: 16 }} /></button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function OrdersAdmin() {
  const [items, setItems] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminOrder | null>(null);
  const [detailOrder, setDetailOrder] = useState<AdminOrder | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminOrder | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const refresh = () => setItems(getOrders());
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.id.toLowerCase().includes(q) ||
        i.clientName.toLowerCase().includes(q) ||
        i.clientEmail.toLowerCase().includes(q)
      );
    }
    if (statusFilter) list = list.filter(i => i.status === statusFilter);
    return list;
  }, [items, search, statusFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (data: OrderForm) => {
    if (editing) {
      updateOrder(editing.id, data);
      showToast('Order diperbarui', 'success');
    } else {
      addOrder(data);
      showToast('Order ditambahkan', 'success');
    }
    setFormOpen(false);
    refresh();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteOrder(deleteTarget.id);
    showToast('Order dihapus', 'success');
    setDeleteTarget(null);
    refresh();
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Orders</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Kelola pesanan pelanggan</p>
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah Order
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
          <input type="text" placeholder="Cari order..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} style={{ padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', background: '#fff', outline: 'none' }}>
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                {['Order ID', 'Klien', 'Email', 'Jenis', 'Status', 'Jumlah', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>Tidak ada data</td></tr>
              ) : paginated.map((item, i) => (
                <tr key={item.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#111827' }}>{item.id}</td>
                  <td style={{ padding: '11px 16px', color: '#374151' }}>{item.clientName}</td>
                  <td style={{ padding: '11px 16px', color: '#6b7280' }}>{item.clientEmail}</td>
                  <td style={{ padding: '11px 16px', color: '#374151', textTransform: 'capitalize' }}>{item.projectType}</td>
                  <td style={{ padding: '11px 16px' }}><StatusBadge status={item.status} /></td>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#111827' }}>{item.amount}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button onClick={() => setDetailOrder(item)} style={{ padding: '5px 8px', background: '#f0fdf4', border: 'none', borderRadius: 6, color: '#16a34a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 500 }}>
                        <Eye style={{ width: 12, height: 12 }} /> Detail
                      </button>
                      <button onClick={() => { setEditing(item); setFormOpen(true); }} style={{ padding: '5px 8px', background: '#eff6ff', border: 'none', borderRadius: 6, color: '#1d4ed8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 500 }}>
                        <Pencil style={{ width: 12, height: 12 }} /> Edit
                      </button>
                      <button onClick={() => setDeleteTarget(item)} style={{ padding: '5px 8px', background: '#fef2f2', border: 'none', borderRadius: 6, color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 500 }}>
                        <Trash2 style={{ width: 12, height: 12 }} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '8px 16px 12px', borderTop: '1px solid #f3f4f6' }}>
          <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
        </div>
      </div>

      <FormModal open={formOpen} editing={editing} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <DetailModal order={detailOrder} onClose={() => setDetailOrder(null)} />
      <DeleteModal open={!!deleteTarget} id={deleteTarget?.id ?? ''} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </AdminLayout>
  );
}
