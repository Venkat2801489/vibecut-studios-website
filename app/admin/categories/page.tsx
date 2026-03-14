'use client';
import { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Link, RefreshCw, X, Tag } from 'lucide-react';
import { Category } from '@/types';

const emptyForm = { name: '', slug: '', description: '', icon: '🎬', drive_link: '' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Category>>({});
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const showMsg = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000); };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const autoSlug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = { ...form, slug: autoSlug, display_order: categories.length + 1 };
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showMsg('Category added!');
        setForm(emptyForm);
        setShowForm(false);
        fetchCategories();
      } else {
        const d = await res.json();
        showMsg(`Error: ${d.error}`);
      }
    } catch { showMsg('Network error'); }
    setSaving(false);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      showMsg('Category updated!');
      setEditId(null);
      fetchCategories();
    } catch { showMsg('Error saving'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? All its videos will lose their category.')) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white">
            Category Management
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">Edit category names, icons, and Drive links</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchCategories} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white transition-all">
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}
            {showForm ? 'Cancel' : 'Add Category'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.startsWith('Error') ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
          {message}
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="glass-card p-6 mb-6 border border-[#7c3aed]/30">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <Tag size={16} className="text-[#7c3aed]" />
            New Category
          </h2>
          <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">Category Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jewellery Stores" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] transition-all" />
            </div>
            <div>
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">Icon (Emoji) *</label>
              <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="💎" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">Short Description</label>
              <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Luxury jewellery brand content" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">
                Google Drive Link (for "View More" button)
              </label>
              <input type="url" value={form.drive_link} onChange={(e) => setForm({ ...form, drive_link: e.target.value })} placeholder="https://drive.google.com/drive/folders/..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] transition-all" />
            </div>
            <div>
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-6">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="glass-card p-5">
              {editId === cat.id ? (
                /* Edit Mode */
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94a3b8] text-xs mb-1.5">Name</label>
                    <input type="text" value={editData.name || cat.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7c3aed]" />
                  </div>
                  <div>
                    <label className="block text-[#94a3b8] text-xs mb-1.5">Icon</label>
                    <input type="text" value={editData.icon ?? cat.icon} onChange={(e) => setEditData({ ...editData, icon: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7c3aed]" />
                  </div>
                  <div>
                    <label className="block text-[#94a3b8] text-xs mb-1.5">Description</label>
                    <input type="text" value={editData.description ?? cat.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7c3aed]" />
                  </div>
                  <div>
                    <label className="block text-[#94a3b8] text-xs mb-1.5">Drive Link</label>
                    <input type="url" value={editData.drive_link ?? cat.drive_link} onChange={(e) => setEditData({ ...editData, drive_link: e.target.value })} placeholder="https://drive.google.com/..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7c3aed]" />
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button onClick={() => handleSaveEdit(cat.id)} className="btn-primary flex items-center gap-2 text-sm py-2 px-5">
                      <Save size={14} /> Save Changes
                    </button>
                    <button onClick={() => { setEditId(null); setEditData({}); }} className="btn-secondary text-sm py-2 px-5">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{cat.name}</p>
                    <p className="text-[#94a3b8] text-sm">{cat.description}</p>
                    {cat.drive_link && cat.drive_link !== '#' ? (
                      <a href={cat.drive_link} target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] text-xs flex items-center gap-1 mt-1 hover:underline">
                        <Link size={10} /> Drive link set
                      </a>
                    ) : (
                      <p className="text-amber-500/70 text-xs mt-1">⚠ No drive link set</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditId(cat.id); setEditData({ name: cat.name, icon: cat.icon, description: cat.description, drive_link: cat.drive_link }); }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white text-sm transition-all"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
