import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Pencil, Trash2, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useAdmin';
import { getFaqs, addFaq, updateFaq, deleteFaq, reorderFaqs } from '../services';
import type { AdminFaqItem } from '../types';

const PER_PAGE = 10;

// ─── Form modal ───────────────────────────────────────────────────────────────

interface FaqForm { question: string; answer: string; }

const emptyForm: FaqForm = { question: '', answer: '' };

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 7,
  fontSize: 14, color: '#111827', background: '#fff', outline: 'none', boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6
};

function FormModal({ open, editing, onClose, onSave }: {
  open: boolean; editing: AdminFaqItem | null; onClose: () => void; onSave: (d: FaqForm) => void;
}) {
  const [form, setForm] = useState<FaqForm>(emptyForm);
  useEffect(() => {
    setForm(editing ? { question: editing.question, answer: editing.answer } : emptyForm);
  }, [editing, open]);
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>{editing ? 'Edit FAQ' : 'Tambah FAQ'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}><X style={{ width: 20, height: 20 }} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Pertanyaan *</label>
            <input style={inputStyle} value={form.question} onChange={e => setForm(prev => ({ ...prev, question: e.target.value }))} placeholder="Tulis pertanyaan..." required />
          </div>
          <div>
            <label style={labelStyle}>Jawaban *</label>
            <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={form.answer} onChange={e => setForm(prev => ({ ...prev, answer: e.target.value }))} placeholder="Tulis jawaban..." required />
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

function DeleteModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 14, padding: 24, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Hapus FAQ</h3>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Hapus FAQ ini? Tindakan tidak bisa dibatalkan.</p>
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

export function FAQAdmin() {
  const [items, setItems] = useState<AdminFaqItem[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminFaqItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminFaqItem | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const refresh = async () => {
    const data = await getFaqs();
    setItems(data.sort((a, b) => a.order - b.order));
  };
  useEffect(() => {
    refresh().catch(() => showToast('Gagal memuat FAQ', 'error'));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(i => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q));
  }, [items, search]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = async (data: FaqForm) => {
    try {
      if (editing) {
        await updateFaq(editing.id, data);
        showToast('FAQ diperbarui', 'success');
      } else {
        await addFaq({ ...data, order: items.length });
        showToast('FAQ ditambahkan', 'success');
      }
      setFormOpen(false);
      await refresh();
    } catch {
      showToast('Gagal menyimpan FAQ', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteFaq(deleteTarget.id);
      showToast('FAQ dihapus', 'success');
      setDeleteTarget(null);
      await refresh();
    } catch {
      showToast('Gagal menghapus FAQ', 'error');
    }
  };

  const moveItem = async (idx: number, dir: 'up' | 'down') => {
    const all = [...items];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= all.length) return;
    [all[idx], all[target]] = [all[target], all[idx]];
    const reordered = all.map((item, i) => ({ ...item, order: i }));
    try {
      await reorderFaqs(reordered);
      setItems(reordered);
      showToast('Urutan diperbarui', 'success');
    } catch {
      showToast('Gagal mengubah urutan FAQ', 'error');
    }
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>FAQ</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Kelola pertanyaan yang sering ditanya</p>
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#f97316', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah FAQ
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 16, maxWidth: 360 }}>
        <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
        <input type="text" placeholder="Cari FAQ..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                <th style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', width: 60 }}>#</th>
                <th style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Pertanyaan</th>
                <th style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Preview Jawaban</th>
                <th style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>Urutan</th>
                <th style={{ padding: '11px 16px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>Tidak ada data</td></tr>
              ) : paginated.map((item, i) => {
                const globalIdx = items.indexOf(item);
                return (
                  <tr key={item.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '11px 16px', color: '#6b7280' }}>{item.order + 1}</td>
                    <td style={{ padding: '11px 16px', fontWeight: 500, color: '#111827', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.question}</td>
                    <td style={{ padding: '11px 16px', color: '#6b7280', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.answer}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => moveItem(globalIdx, 'up')} disabled={globalIdx === 0} style={{ padding: '4px 6px', background: '#f3f4f6', border: 'none', borderRadius: 5, cursor: globalIdx === 0 ? 'not-allowed' : 'pointer', opacity: globalIdx === 0 ? 0.4 : 1, display: 'flex' }}>
                          <ChevronUp style={{ width: 14, height: 14 }} />
                        </button>
                        <button onClick={() => moveItem(globalIdx, 'down')} disabled={globalIdx === items.length - 1} style={{ padding: '4px 6px', background: '#f3f4f6', border: 'none', borderRadius: 5, cursor: globalIdx === items.length - 1 ? 'not-allowed' : 'pointer', opacity: globalIdx === items.length - 1 ? 0.4 : 1, display: 'flex' }}>
                          <ChevronDown style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
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
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '8px 16px 12px', borderTop: '1px solid #f3f4f6' }}>
          <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
        </div>
      </div>

      <FormModal open={formOpen} editing={editing} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <DeleteModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </AdminLayout>
  );
}
