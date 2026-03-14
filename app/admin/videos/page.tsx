'use client';
import { useState, useEffect } from 'react';
import { Upload, Trash2, ChevronUp, ChevronDown, Star, StarOff, Link, Play, RefreshCw, Plus, X } from 'lucide-react';
import { Category, Video } from '@/types';

interface UploadForm {
  title: string;
  category_id: string;
  video_url: string;
  thumbnail_url: string;
  position: number;
  is_featured: boolean;
}

const emptyForm: UploadForm = {
  title: '',
  category_id: '',
  video_url: '',
  thumbnail_url: '',
  position: 1,
  is_featured: false,
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<UploadForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const [vRes, cRes] = await Promise.all([
      fetch('/api/videos' + (selectedCategory ? `?category=${selectedCategory}` : '')),
      fetch('/api/categories'),
    ]);
    const [v, c] = await Promise.all([vRes.json(), cRes.json()]);
    setVideos(Array.isArray(v) ? v : []);
    setCategories(Array.isArray(c) ? c : []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingVideoId ? `/api/videos/${editingVideoId}` : '/api/videos';
      const method = editingVideoId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage(editingVideoId ? 'Video updated successfully!' : 'Video uploaded successfully!');
        setForm(emptyForm);
        setShowForm(false);
        setEditingVideoId(null);
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const d = await res.json();
        setMessage(`Error: ${d.error || 'Operation failed'}`);
      }
    } catch {
      setMessage('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (video: Video) => {
    setForm({
      title: video.title,
      category_id: video.category_id,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || '',
      position: video.position,
      is_featured: video.is_featured,
    });
    setEditingVideoId(video.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (id: string, changes: Partial<Video>) => {
    await fetch(`/api/videos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video? This cannot be undone.')) return;
    await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const shiftPosition = async (video: Video, direction: 'up' | 'down') => {
    const newPos = direction === 'up' ? Math.max(1, video.position - 1) : Math.min(10, video.position + 1);
    await handleUpdate(video.id, { position: newPos });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl font-bold text-white">
            Video Management
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">Upload and organize your reels portfolio</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchData()}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white transition-all"
            title="Refresh data"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => { 
                if (showForm) {
                    setShowForm(false);
                    setEditingVideoId(null);
                    setForm(emptyForm);
                } else {
                    setShowForm(true);
                }
                setMessage(''); 
            }}
            className="btn-primary flex items-center gap-2 py-3 px-6 shadow-lg shadow-[#7c3aed]/20"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Cancel' : 'Upload Video'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm border flex items-center justify-between ${
            message.startsWith('Error')
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-green-500/10 border-green-500/20 text-green-400'
          }`}
        >
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="opacity-50 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Categories Selection */}
      <div className="mb-8">
        <label className="block text-[#94a3b8] text-[10px] font-bold uppercase tracking-[0.1em] mb-4">
          Select Category to Manage
        </label>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
              !selectedCategory
                ? 'bg-[#7c3aed] border-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/20'
                : 'bg-white/5 border-white/10 text-[#94a3b8] hover:bg-white/10 hover:border-white/20'
            }`}
          >
            All Videos
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                selectedCategory === c.slug
                  ? 'bg-[#7c3aed] border-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/20'
                  : 'bg-white/5 border-white/10 text-[#94a3b8] hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-base">{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Upload/Edit Form */}
      {showForm && (
        <div className="glass-card p-8 mb-10 border border-[#7c3aed]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Upload size={120} className="text-[#7c3aed]" />
          </div>
          <h2 className="text-xl text-white font-bold mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center">
              {editingVideoId ? <RefreshCw size={18} className="text-[#7c3aed]" /> : <Upload size={18} className="text-[#7c3aed]" />}
            </div>
            {editingVideoId ? 'Edit Video Details' : 'New Reel Upload'}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 relative z-10">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wider">
                Reel Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Luxury Real Estate Tour - Mumbai"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/50 transition-all font-medium"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wider">
                Target Category *
              </label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#7c3aed] transition-all appearance-none cursor-pointer"
                style={{ background: '#13131f' }}
              >
                <option value="">Select industry category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wider">
                Position (1-10)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.position}
                onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) || 1 })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#7c3aed] transition-all"
              />
            </div>

            {/* Video URL */}
            <div className="md:col-span-2">
              <label className="block text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wider">
                Video Direct URL *
              </label>
              <input
                type="url"
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                placeholder="https://rifmbypaukllkcidetfo.supabase.co/storage/v1/object/public/videos/reel.mp4"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#7c3aed] transition-all"
              />
            </div>

            {/* Thumbnail URL */}
            <div className="md:col-span-2">
              <label className="block text-[#94a3b8] text-xs font-bold mb-2 uppercase tracking-wider">
                Preview Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                value={form.thumbnail_url}
                onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#7c3aed] transition-all"
              />
            </div>

            {/* Featured toggle */}
            <div className="md:col-span-2 flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Star size={18} fill={form.is_featured ? 'currentColor' : 'none'} />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Feature this video</p>
                  <p className="text-[#94a3b8] text-xs">Featured videos appear highlighted in the portfolio</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  form.is_featured ? 'bg-[#7c3aed]' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                    form.is_featured ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingVideoId(null); setForm(emptyForm); }}
                className="px-6 py-3 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary min-w-[140px] flex items-center justify-center gap-2 px-8 py-3"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {editingVideoId ? <RefreshCw size={16} /> : <Upload size={16} />}
                    {editingVideoId ? 'Save Changes' : 'Upload Reel'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Stats bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search videos by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
          />
          <Play size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] opacity-50" />
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#94a3b8] text-xs font-medium uppercase tracking-wider">
          <span>{filteredVideos.length} Total Videos</span>
        </div>
      </div>

      {/* Video List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-[#7c3aed]/20 border-t-[#7c3aed] rounded-full animate-spin" />
          <p className="text-[#94a3b8] text-sm font-medium animate-pulse">Loading portfolio...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] glass-card p-12 text-center border-dashed border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Play size={32} className="text-[#94a3b8] opacity-30" />
          </div>
          <h3 className="text-xl text-white font-bold">No videos found</h3>
          <p className="text-[#94a3b8] text-sm mt-2 max-w-xs mx-auto">
            {searchQuery
              ? `No videos match your search "${searchQuery}" in this category.`
              : 'This category is currently empty. Start by uploading your first reel!'}
          </p>
          <button
            onClick={() => { setShowForm(true); setSearchQuery(''); }}
            className="btn-primary mt-8 flex items-center gap-2 px-8 py-3"
          >
            <Plus size={16} />
            Upload Your First Reel
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="glass-card p-4 flex items-center gap-4 flex-wrap"
            >
              {/* Thumbnail */}
              <div
                className="w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.2)' }}
              >
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <Play size={20} className="text-[#7c3aed]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate">{video.title}</p>
                <p className="text-[#94a3b8] text-xs mt-1 font-medium">
                  {video.category?.name || 'Unknown category'}
                </p>
                {video.video_url && (
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7c3aed] text-xs flex items-center gap-1 mt-1.5 hover:underline font-bold"
                  >
                    <Link size={10} />
                    View video
                  </a>
                )}
              </div>

              {/* Position badge */}
              <div className="text-center px-2">
                <p className="text-[#94a3b8] text-[9px] uppercase font-black tracking-tighter mb-1">Position</p>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'rgba(124,58,237,0.2)', color: '#7c3aed' }}
                >
                  {video.position}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Position up/down */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => shiftPosition(video, 'up')}
                    disabled={video.position <= 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all text-[#94a3b8] hover:text-white"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => shiftPosition(video, 'down')}
                    disabled={video.position >= 10}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all text-[#94a3b8] hover:text-white"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => startEdit(video)}
                  className="p-2 rounded-xl bg-white/5 text-[#94a3b8] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition-all border border-white/5"
                  title="Edit video info"
                >
                  <Plus size={15} className="rotate-45" style={{ transform: 'none' }} />
                  {/* Using Plus rotated or just a pen icon, let's look for a better icon if possible, but Lucide has 'Edit' */}
                  <span className="sr-only">Edit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </button>

                {/* Featured toggle */}
                <button
                  onClick={() => handleUpdate(video.id, { is_featured: !video.is_featured })}
                  className={`p-2 rounded-xl transition-all ${
                    video.is_featured
                      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                      : 'bg-white/5 text-[#94a3b8] hover:text-white'
                  }`}
                  title={video.is_featured ? 'Remove featured' : 'Mark as featured'}
                >
                  {video.is_featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(video.id)}
                  className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                  title="Delete video"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
