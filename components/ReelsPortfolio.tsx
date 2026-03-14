'use client';
import { useState, useEffect } from 'react';
import { Play, ExternalLink, Eye, ChevronRight } from 'lucide-react';
import { Video, Category } from '@/types';

// Demo categories with placeholder data
const demoCategories: Category[] = [
  { id: '1', name: 'Boutique & Fashion', slug: 'boutique-fashion', description: 'Trendy lifestyle & apparel content', icon: '👗', drive_link: '#', display_order: 1, created_at: '' },
  { id: '2', name: 'Bridal Showrooms', slug: 'bridal', description: 'Dreamy wedding & bridal content', icon: '💍', drive_link: '#', display_order: 2, created_at: '' },
  { id: '3', name: 'Textiles & Sarees', slug: 'textiles', description: 'Heritage & modern textile brands', icon: '🧵', drive_link: '#', display_order: 3, created_at: '' },
  { id: '4', name: 'Interior Design', slug: 'interior', description: 'Spaces that inspire and sell', icon: '🏡', drive_link: '#', display_order: 4, created_at: '' },
  { id: '5', name: 'Healthcare Clinics', slug: 'healthcare', description: 'Trust-building medical content', icon: '🏥', drive_link: '#', display_order: 5, created_at: '' },
  { id: '6', name: 'Real Estate', slug: 'real-estate', description: 'Property tours that convert', icon: '🏢', drive_link: '#', display_order: 6, created_at: '' },
  { id: '7', name: 'Education', slug: 'education', description: 'Learning & coaching brands', icon: '📚', drive_link: '#', display_order: 7, created_at: '' },
];

const gradients = [
  'from-purple-900/40 to-pink-900/40',
  'from-pink-900/40 to-rose-900/40',
  'from-violet-900/40 to-purple-900/40',
  'from-blue-900/40 to-cyan-900/40',
  'from-emerald-900/40 to-cyan-900/40',
  'from-orange-900/40 to-pink-900/40',
  'from-amber-900/40 to-orange-900/40',
];

interface VideoCardProps {
  index: number;
  video?: Video;
  categoryColor: string;
  categoryName: string;
}

function VideoCard({ index, categoryColor, categoryName }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [views, setViews] = useState<string>('');

  useEffect(() => {
    // Generate random-looking views only on the client
    const randomViews = (Math.random() * 900 + 100).toFixed(0);
    setViews(`${randomViews}K`);
  }, []);

  return (
    <div
      className="video-card neon-border group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Reel placeholder */}
      <div
        className="reel-aspect flex items-center justify-center relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${categoryColor}30 0%, rgba(15,15,26,0.8) 100%)`,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Film grain texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
 
        {/* Top bar (reel metadata simulation) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: categoryColor }}
            >
              V
            </div>
            <span className="text-white/60 text-xs">vibecutstudios</span>
          </div>
          {views && (
            <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-0.5">
              <Eye size={10} className="text-white/60" />
              <span className="text-white/60 text-xs">{views}</span>
            </div>
          )}
        </div>

        {/* Center Play Button */}
        <div
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? categoryColor : 'rgba(255,255,255,0.1)',
            boxShadow: hovered ? `0 0 30px ${categoryColor}60` : 'none',
          }}
        >
          <Play
            size={20}
            fill="white"
            className="text-white ml-1 transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.2)' : 'scale(1)' }}
          />
        </div>

        {/* Bottom label */}
        <div className="video-overlay">
          <div>
            <p className="text-white font-semibold text-sm">{categoryName} Reel #{index + 1}</p>
            <p className="text-white/60 text-xs mt-0.5">Vibecut Studios</p>
          </div>
        </div>

        {/* Corner badge */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[10px] font-medium"
          style={{ background: `${categoryColor}90` }}
        >
          REEL
        </div>
      </div>
    </div>
  );
}

export default function ReelsPortfolio() {
  const [activeCategory, setActiveCategory] = useState(demoCategories[0]);
  const [categories, setCategories] = useState(demoCategories);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  // Try to load from API, fall back to demo
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCategories(data);
          setActiveCategory(data[0]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/videos?category=${activeCategory.slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setVideos(data);
        else setVideos([]);
        setLoading(false);
      })
      .catch(() => { setVideos([]); setLoading(false); });
  }, [activeCategory]);

  const categoryIndex = categories.findIndex((c) => c.id === activeCategory.id);
  const gradientClass = gradients[categoryIndex % gradients.length];
  const accentColor = [
    '#7c3aed', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e',
  ][categoryIndex % 7];

  // Show demo placeholders if no real videos
  const showCount = Math.min(videos.length || 10, 10);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="orb orb-pink w-[600px] h-[600px] bottom-0 left-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-divider mb-6" />
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Our <span className="gradient-text">Reels Portfolio</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Scroll-stopping content across 7+ industries. Every reel is crafted to convert viewers into customers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`category-tab flex-shrink-0 flex items-center gap-2 ${
                activeCategory.id === cat.id ? 'active' : ''
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category hero banner */}
        <div
          className={`glass-card p-6 mb-8 flex items-center justify-between flex-wrap gap-4`}
          style={{ background: `linear-gradient(135deg, ${accentColor}15, rgba(15,15,26,0.5))` }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${accentColor}25`, border: `1px solid ${accentColor}40` }}
            >
              {activeCategory.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{activeCategory.name}</h3>
              <p className="text-[#94a3b8] text-sm">{activeCategory.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] text-sm">
              Showing top {showCount} reels
            </span>
            {activeCategory.drive_link && activeCategory.drive_link !== '#' && (
              <a
                href={activeCategory.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #ec4899)`,
                  boxShadow: `0 4px 20px ${accentColor}40`,
                }}
              >
                <ExternalLink size={14} />
                View All
              </a>
            )}
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-2 border-[#7c3aed] border-t-transparent animate-spin"
            />
          </div>
        ) : (
          <div
            className="reel-grid grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}
          >
            {/* Real videos if available */}
            {videos.map((video, i) => (
              <div key={video.id} className="video-card neon-border group">
                <div className="reel-aspect relative overflow-hidden rounded-2xl bg-black/40">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}30 0%, rgba(15,15,26,0.8) 100%)`,
                      }}
                    />
                  )}
                  {video.video_url && (
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        <Play size={18} fill="white" className="text-white ml-1" />
                      </div>
                    </a>
                  )}
                  <div className="video-overlay">
                    <p className="text-white font-semibold text-xs">{video.title}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Demo placeholders when no real videos */}
            {videos.length === 0 &&
              [...Array(10)].map((_, i) => (
                <VideoCard
                  key={i}
                  index={i}
                  categoryColor={accentColor}
                  categoryName={activeCategory.name}
                />
              ))}
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-10">
          <a
            href={activeCategory.drive_link && activeCategory.drive_link !== '#' ? activeCategory.drive_link : '#'}
            target={activeCategory.drive_link !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-primary"
          >
            View All {activeCategory.name} Reels
            <ChevronRight size={16} />
          </a>
          <p className="text-[#94a3b8] text-xs mt-3">
            More videos available → Google Drive
          </p>
        </div>
      </div>
    </section>
  );
}
