import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { PortfolioItem } from '../types';
import { getFirebaseDb } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function PortfolioManager() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'poster',
    image: '',
    description: '',
    price: '',
    features: []
  });

  useEffect(() => {
    const db = getFirebaseDb();
    const portfolioCollection = collection(db, 'portfolios');
    
    const unsubscribe = onSnapshot(portfolioCollection, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PortfolioItem));
      setPortfolio(items);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching portfolio:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'poster',
      image: '',
      description: '',
      price: '',
      features: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) {
      alert('Judul tidak boleh kosong');
      return;
    }

    try {
      const db = getFirebaseDb();
      
      if (editingId) {
        // Update existing document
        const docRef = doc(db, 'portfolios', editingId);
        await updateDoc(docRef, formData as any);
      } else {
        // Add new document
        await addDoc(collection(db, 'portfolios'), formData);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus item ini?')) {
      try {
        const db = getFirebaseDb();
        await deleteDoc(doc(db, 'portfolios', id));
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-grey">Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-display text-xl font-bold text-text-dark">Manajemen Portfolio</h3>
              <p className="font-body text-sm text-muted-grey mt-1">Total: {portfolio.length} items</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-accent-coral text-white hover:bg-accent-coral/90 font-display px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={20} />
              Tambah Item
            </button>
          </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map(item => (
          <div key={item.id} className="bg-white border border-line-grey/20 rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-display font-bold text-text-dark">{item.title}</h4>
                  <p className="font-body text-xs text-muted-grey capitalize">{item.category}</p>
                </div>
                <span className="bg-primary-dark/10 text-primary-dark text-xs font-bold px-2 py-1 rounded">
                  {item.price}
                </span>
              </div>
              <p className="font-body text-sm text-muted-grey mb-3 line-clamp-2">{item.description}</p>
              {item.features && item.features.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {item.features.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{item.features.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-primary-dark text-white hover:bg-primary-blue font-body text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 font-body text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-display text-2xl font-bold text-text-dark mb-6">
              {editingId ? 'Edit Item' : 'Tambah Item Baru'}
            </h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Judul</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                  placeholder="Judul portfolio item"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Kategori</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                >
                  <option value="poster">Poster</option>
                  <option value="logo">Logo</option>
                  <option value="website">Website</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Image URL</label>
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                  placeholder="https://..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Deskripsi</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark resize-none"
                  rows={3}
                  placeholder="Deskripsi singkat"
                />
              </div>

              {/* Price */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Harga</label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                  placeholder="Rp 50.000"
                />
              </div>

              {/* Features */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Fitur (pisahkan dengan koma)</label>
                <textarea
                  value={formData.features?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()).filter(f => f) })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark resize-none"
                  rows={3}
                  placeholder="Format file siap cetak, Revisi maksimal 2 kali"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-line-grey/20 text-text-dark hover:bg-line-grey/30 font-body py-2 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-dark text-white hover:bg-primary-blue font-body py-2 rounded-lg transition-colors cursor-pointer"
              >
                {editingId ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
