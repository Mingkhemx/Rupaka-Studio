import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useAdmin';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '../services';
import type { AdminTestimonial } from '../types';

const PER_PAGE = 10;

// ─── Star selector ────────────────────────────────────────────────────────────

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <Star
            style={{
              width: 24,
              height: 24,
              color: n <= (hovered || value) ? '#f59e0b' : '#d1d5db',
              fill: n <= (hovered || value) ? '#f59e0b' : 'none',
              transition: 'color 0.1s, fill 0.1s'
            }}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Form modal ───────────────────────────────────────────────────────────────

interface TestimonialForm {
  name: string;
  role: string;
  content: string;
  rating: number;
  status: 'published' | 'draft';
}

const emptyForm: TestimonialForm = { name: '', role: '', content: '', rating: 5, status: 'published' };

function itemToForm(item: AdminTestimonial): TestimonialForm {
  return { name: item.name, role: item.role, content: item.content, rating: item.rating, status: item.status };
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 7,
  fontSize: 14, color: '#111827', background: '#fff', outline: 'none', boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6
};

function FormModal({ open, editing, onClose, onSave }: {
  open: boolean; editing: AdminTestimonial | null; onClose: () => void; onSave: (d: TestimonialForm) => void;
}) {
  const [form, setForm] = useState<TestimonialForm>(emptyForm);
  useEffect(() => { setForm(editing ? itemToForm(editing) : emptyForm); }, [editing, open]);
  if (!open) return null;

  const set = (k: keyof TestimonialForm, v: string | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>{editing ? 'Edit Testimonial' : 'Tambah Testimonial'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}><X style={{ width: 20, height: 20 }} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Nama *</label>
            <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nama lengkap" required />
          </div>
          <div>
            <label style={labelStyle}>Jabatan / Peran *</label>
            <input style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Pemilik Bisnis" required />
          </div>
          <div>
            <label style={labelStyle}>Testimonial *</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Isi testimonial..." required />
          </div>
          <div>
            <label style={labelStyle}>Rating *</label>
            <StarSelector value={form.rating} onChange={v => set('rating', v)} />
          </div>
          <div>
            <label style={labelStyle}>Status *</label>
            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value as 'published' | 'draft')}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
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

function DeleteModal({ open, name, onClose, onConfirm }: { open: boolean; name: string; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, padding: 24, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Hapus Testimonial</h3>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Hapus testimonial dari <strong>"{name}"</strong>? Tidak bisa dibatalkan.</p>
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

export function TestimonialAdmin() {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminTestimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminTestimonial | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const refresh = () => setItems(getTestimonials());
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.role.toLowerCase().includes(q));
    }
    if (ratingFilter) list = list.filter(i => i.rating === parseInt(ratingFilter));
    return list;
  }, [items, search, ratingFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (data: TestimonialForm) => {
    if (editing) {
      updateTestimonial(editing.id, data);
      showToast('Testimonial diperbarui', 'success');
    } else {
      addTestimonial(data);
      showToast('Testimonial ditambahkan', 'success');
    }
    setFormOpen(false);
    refresh();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteTestimonial(deleteTarget.id);
    showToast('Testimonial dihapus', 'success');
    setDeleteTarget(null);
    refresh();
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Testimonials</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Kelola ulasan pelanggan</p>
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah Testimonial
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
          <input type="text" placeholder="Cari testimonial..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <select value={ratingFilter} onChange={e => { setRatingFilter(e.target.value); setPage(1); }} style={{ padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', background: '#fff', outline: 'none' }}>
          <option value="">Semua Rating</option>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Bintang</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                {['Nama', 'Jabatan', 'Rating', 'Status', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>Tidak ada data</td></tr>
              ) : paginated.map((item, i) => (
                <tr key={item.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 500, color: '#111827' }}>{item.name}</td>
                  <td style={{ padding: '11px 16px', color: '#374151' }}>{item.role}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} style={{ width: 14, height: 14, color: n <= item.rating ? '#f59e0b' : '#d1d5db', fill: n <= item.rating ? '#f59e0b' : 'none' }} />
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: item.status === 'published' ? '#dcfce7' : '#f3f4f6', color: item.status === 'published' ? '#166534' : '#6b7280' }}>
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setEditing(item); setFormOpen(true); }} style={{ padding: '5px 10px', background: '#eff6ff', border: 'none', borderRadius: 6, color: '#1d4ed8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500 }}>
                        <Pencil style={{ width: 12, height: 12 }} /> Edit
                      </button>
                      <button onClick={() => setDeleteTarget(item)} style={{ padding: '5px 10px', background: '#fef2f2', border: 'none', borderRadius: 6, color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500 }}>
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
      <DeleteModal open={!!deleteTarget} name={deleteTarget?.name ?? ''} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </AdminLayout>
  );
}
