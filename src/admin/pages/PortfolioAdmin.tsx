import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useAdmin';
import {
  getPortfolios,
  addPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../services';
import { uploadImage } from '../../lib/uploadImage';
import type { AdminPortfolioItem } from '../types';

const CATEGORIES = ['poster', 'banner', 'kemasan'] as const;
const PER_PAGE = 10;

// ─── Inline Modal ─────────────────────────────────────────────────────────────

interface PortfolioFormData {
  title: string;
  category: string;
  description: string;
  image: string;
  features: string;
  status: 'published' | 'draft';
}

const emptyForm: PortfolioFormData = {
  title: '',
  category: 'poster',
  description: '',
  image: '',
  features: '',
  status: 'published'
};

function itemToForm(item: AdminPortfolioItem): PortfolioFormData {
  return {
    title: item.title,
    category: item.category,
    description: item.description,
    image: item.image,
    features: item.features.join(', '),
    status: item.status
  };
}

interface FormModalProps {
  open: boolean;
  editing: AdminPortfolioItem | null;
  onClose: () => void;
  onSave: (data: PortfolioFormData) => void;
}

function FormModal({ open, editing, onClose, onSave }: FormModalProps) {
  const [form, setForm] = useState<PortfolioFormData>(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(editing ? itemToForm(editing) : emptyForm);
  }, [editing, open]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file, 'portfolios');
      setForm((prev) => ({ ...prev, image: url }));
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  const set = (k: keyof PortfolioFormData, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, form data:', form);
    onSave(form);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 7,
    fontSize: 14,
    color: '#111827',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
      />
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 14,
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>
            {editing ? 'Edit Portfolio' : 'Tambah Portfolio'}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Judul *</label>
            <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Judul portfolio" required />
          </div>

          <div>
            <label style={labelStyle}>Kategori *</label>
            <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)} required>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Deskripsi *</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Deskripsi lengkap portfolio"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>URL Gambar</label>
            <input style={inputStyle} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              style={{ marginTop: 8, fontSize: 13 }}
            />
            {uploading && <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Mengupload gambar...</p>}
          </div>

          <div>
            <label style={labelStyle}>Fitur (pisahkan dengan koma)</label>
            <input style={inputStyle} value={form.features} onChange={e => set('features', e.target.value)} placeholder="Fitur 1, Fitur 2, Fitur 3" />
          </div>

          <div>
            <label style={labelStyle}>Status *</label>
            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value as 'published' | 'draft')}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                background: '#fff',
                color: '#374151',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                background: '#f97316',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {editing ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete confirm ───────────────────────────────────────────────────────────

function DeleteModal({
  open,
  title,
  onClose,
  onConfirm
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, padding: 24, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Hapus Portfolio</h3>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
          Hapus <strong>"{title}"</strong>? Tindakan ini tidak bisa dibatalkan.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Batal
          </button>
          <button onClick={onConfirm} style={{ padding: '9px 18px', background: '#ef4444', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ page, total, perPage, onChange }: { page: number; total: number; perPage: number; onChange: (p: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', paddingTop: 12 }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>
        {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} dari {total}
      </span>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.4 : 1, display: 'flex' }}
      >
        <ChevronLeft style={{ width: 16, height: 16 }} />
      </button>
      <span style={{ fontSize: 13, color: '#374151' }}>{page} / {totalPages}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, display: 'flex' }}
      >
        <ChevronRight style={{ width: 16, height: 16 }} />
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function PortfolioAdmin() {
  const [items, setItems] = useState<AdminPortfolioItem[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPortfolioItem | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const refresh = async () => {
    const data = await getPortfolios();
    setItems(data);
  };

  useEffect(() => {
    refresh().catch(() => showToast('Gagal memuat portfolio', 'error'));
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    if (categoryFilter) list = list.filter(i => i.category === categoryFilter);
    return list;
  }, [items, search, categoryFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = async (data: PortfolioFormData) => {
    console.log('Form data:', data);
    
    const payload = {
      ...data,
      features: data.features.split(',').map(f => f.trim()).filter(Boolean)
    } as Omit<AdminPortfolioItem, 'id' | 'createdAt' | 'updatedAt'>;

    console.log('Payload to save:', payload);

    try {
      if (editing) {
        console.log('Updating portfolio with id:', editing.id);
        await updatePortfolio(editing.id, payload);
        showToast('Portfolio diperbarui', 'success');
      } else {
        console.log('Adding new portfolio');
        await addPortfolio(payload);
        showToast('Portfolio ditambahkan', 'success');
      }
      setFormOpen(false);
      await refresh();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      showToast('Gagal menyimpan portfolio: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deletePortfolio(deleteTarget.id);
      showToast('Portfolio dihapus', 'success');
      setDeleteTarget(null);
      await refresh();
    } catch {
      showToast('Gagal menghapus portfolio', 'error');
    }
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Portfolio</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Kelola item portfolio</p>
        </div>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus style={{ width: 16, height: 16 }} />
          Tambah Portfolio
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Cari portfolio..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', background: '#fff', outline: 'none' }}
        >
          <option value="">Semua Kategori</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                {['Preview', 'Judul', 'Kategori', 'Status', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>
                    Tidak ada data
                  </td>
                </tr>
              ) : paginated.map((item, i) => (
                <tr key={item.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', background: '#e5e7eb', flexShrink: 0 }}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                          <span style={{ fontSize: 10, fontWeight: 600 }}>IMG</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '11px 16px', fontWeight: 500, color: '#111827' }}>{item.title}</td>
                  <td style={{ padding: '11px 16px', color: '#374151', textTransform: 'capitalize' }}>{item.category}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                      background: item.status === 'published' ? '#dcfce7' : '#f3f4f6',
                      color: item.status === 'published' ? '#166534' : '#6b7280'
                    }}>
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => { setEditing(item); setFormOpen(true); }}
                        style={{ padding: '5px 10px', background: '#eff6ff', border: 'none', borderRadius: 6, color: '#1d4ed8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500 }}
                      >
                        <Pencil style={{ width: 12, height: 12 }} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        style={{ padding: '5px 10px', background: '#fef2f2', border: 'none', borderRadius: 6, color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500 }}
                      >
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
      <DeleteModal open={!!deleteTarget} title={deleteTarget?.title ?? ''} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </AdminLayout>
  );
}
