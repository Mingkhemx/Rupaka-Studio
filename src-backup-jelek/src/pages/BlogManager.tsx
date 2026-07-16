import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  date: string;
}

const DUMMY_BLOG: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Tips Membuat Kemasan UMKM yang Menarik',
    category: 'Tips',
    image: 'umkm.jpg',
    content: 'Kemasan yang menarik adalah kunci untuk menarik perhatian konsumen. Berikut adalah beberapa tips...',
    date: '2024-01-15'
  },
  {
    id: 'blog-2',
    title: 'Pentingnya Branding untuk Bisnis Anda',
    category: 'Branding',
    image: 'branding.jpg',
    content: 'Brand yang kuat dapat membedakan bisnis Anda dari kompetitor. Mari kita pelajari cara membangun brand...',
    date: '2024-01-10'
  },
  {
    id: 'blog-3',
    title: 'Tren AI dalam Desain Grafis 2024',
    category: 'Teknologi',
    image: 'ai.jpg',
    content: 'Artificial Intelligence semakin berkembang dalam industri desain. Bagaimana AI mengubah cara desainer bekerja...',
    date: '2024-01-05'
  }
];

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>(DUMMY_BLOG);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Tips',
    image: 'umkm.jpg',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Tips',
      image: 'umkm.jpg',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData(blog);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Judul dan konten tidak boleh kosong');
      return;
    }

    if (editingId) {
      // Update
      setBlogs(blogs.map(blog => 
        blog.id === editingId ? { ...blog, ...formData } as BlogPost : blog
      ));
    } else {
      // Add new
      const newBlog: BlogPost = {
        ...formData as BlogPost,
        id: 'blog-' + Date.now(),
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      setBlogs([...blogs, newBlog]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus blog ini?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-display text-xl font-bold text-text-dark">Manajemen Blog</h3>
          <p className="font-body text-sm text-muted-grey mt-1">Total: {blogs.length} artikel</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-accent-coral text-white hover:bg-accent-coral/90 font-display px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus size={20} />
          Tambah Artikel
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white border border-line-grey/20 rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex gap-4 p-4">
              {/* Image */}
              <div className="w-32 h-24 bg-line-grey/20 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={`/src/assets/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-text-dark">{blog.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-primary-dark/10 text-primary-dark text-xs font-bold px-2 py-1 rounded">
                        {blog.category}
                      </span>
                      <p className="font-body text-xs text-muted-grey">{formatDate(blog.date)}</p>
                    </div>
                  </div>
                </div>
                <p className="font-body text-sm text-muted-grey line-clamp-2">{blog.content}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-primary-dark text-white hover:bg-primary-blue p-2 rounded-lg transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-display text-2xl font-bold text-text-dark mb-6">
              {editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}
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
                  placeholder="Judul artikel"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-display text-sm font-bold text-text-dark mb-2 block">Kategori</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                  >
                    <option value="Tips">Tips</option>
                    <option value="Branding">Branding</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>

                {/* Image */}
                <div>
                  <label className="font-display text-sm font-bold text-text-dark mb-2 block">Gambar</label>
                  <select
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                  >
                    <option value="umkm.jpg">umkm.jpg</option>
                    <option value="branding.jpg">branding.jpg</option>
                    <option value="ai.jpg">ai.jpg</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Tanggal</label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark"
                />
              </div>

              {/* Content */}
              <div>
                <label className="font-display text-sm font-bold text-text-dark mb-2 block">Konten</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border border-line-grey/40 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:border-primary-dark resize-none"
                  rows={6}
                  placeholder="Tuliskan konten artikel..."
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
    </div>
  );
}
