'use client';
import { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Eye, ChevronRight, Volume2, VolumeX } from 'lucide-react';
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


interface InteractiveVideoCardProps {
  video: Partial<Video>;
  accentColor: string;
  index: number;
}

function InteractiveVideoCard({ video, accentColor, index }: InteractiveVideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [views, setViews] = useState<string>('');

  useEffect(() => {
    setViews(`${(Math.random() * 900 + 100).toFixed(0)}K`);
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle play interruption (e.g. fast mouse move)
      });
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMuted(!muted);
  };

  return (
    <div
      className="video-card neon-border group relative flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="reel-aspect relative overflow-hidden rounded-2xl bg-[#0a0a0f] border border-white/5 shadow-2xl">
        {/* Video Element */}
        {video.video_url ? (
          <video
            ref={videoRef}
            src={video.video_url}
            loop
            muted={muted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            poster={video.thumbnail_url || undefined}
          />
        ) : (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accentColor}20 0%, #0a0a0f 100%)` }}
          >
             <Play size={40} className="text-white/10" />
          </div>
        )}

        {/* Post-overlay info */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
           {/* Top Info */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg"
                style={{ background: accentColor }}
              >
                V
              </div>
              <span className="text-white text-xs font-semibold tracking-wide drop-shadow-md">vibecut</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10">
              <Eye size={12} className="text-white/80" />
              <span className="text-white/90 text-[10px] font-bold">{views}</span>
            </div>
          </div>

          {/* Center Play Indicator (only if not playing) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transform transition-all duration-500 scale-90 group-hover:scale-100 group-hover:bg-white/20">
                <Play size={24} fill="white" className="text-white ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Title */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <div className="inline-block px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10 mb-2">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Reel #{index + 1}</span>
            </div>
            <h4 className="text-white font-bold text-sm leading-tight drop-shadow-lg line-clamp-2">
              {video.title || `Featured ${video.category?.name || 'Reel'}`}
            </h4>
          </div>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleMute}
          className={`absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${
            muted 
              ? 'bg-black/40 border-white/10 text-white/60 hover:text-white' 
              : 'bg-white/20 border-white/20 text-white scale-110 shadow-lg'
          } ${isPlaying || hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Corner Badge */}
        <div 
          className="absolute top-4 right-4 hidden group-hover:block"
          style={{ pointerEvents: 'none' }}
        >
           <div className="bg-[#7c3aed] text-white text-[9px] font-black px-2 py-0.5 rounded-sm transform rotate-3 shadow-xl uppercase">
             Live
           </div>
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
          // Set initial active category purely based on which first 
          // one actually has videos OR just the first one.
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
  const accentColor = [
    '#7c3aed', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e',
  ][categoryIndex % 7];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-[#050508]">
      {/* Dynamic Glow background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
            <span className="text-[#94a3b8] text-[10px] uppercase font-bold tracking-widest">Our Work</span>
          </div>
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight"
          >
             Reels <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto leading-relaxed">
            Scroll-stopping content across 7+ industries. Every reel is crafted to turn scrollers into clients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`category-tab flex-shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all duration-300 border ${
                activeCategory.id === cat.id 
                  ? 'bg-white/5 border-white/20 text-white shadow-xl translate-y-[-2px]' 
                  : 'bg-transparent border-transparent text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-bold text-sm tracking-wide">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
             <div 
               className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
               style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
             >
               {activeCategory.icon}
             </div>
             <div>
               <h3 className="text-white font-bold text-xl">{activeCategory.name}</h3>
               <p className="text-[#94a3b8] text-sm">Top industry-standard reels</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[#94a3b8] text-[11px] font-bold uppercase">{loading ? 'Updating...' : 'Live Data'}</span>
             </div>
             {activeCategory.drive_link && activeCategory.drive_link !== '#' && (
               <a
                 href={activeCategory.drive_link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                 style={{
                   background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                   boxShadow: `0 8px 25px ${accentColor}35`,
                 }}
               >
                 <ExternalLink size={16} />
                 Full Drive
               </a>
             )}
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-12">
            {[...Array(5)].map((_, i) => (
               <div key={i} className="reel-aspect rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {videos.length > 0 ? (
                videos.map((video, i) => (
                  <InteractiveVideoCard 
                    key={video.id} 
                    video={video} 
                    accentColor={accentColor} 
                    index={i} 
                  />
                ))
              ) : (
                // Fallback to demo objects but passed to the interactive component
                [...Array(5)].map((_, i) => (
                  <InteractiveVideoCard 
                    key={i} 
                    index={i}
                    accentColor={accentColor} 
                    video={{
                      title: `Demo ${activeCategory.name} #${i + 1}`,
                      category: activeCategory,
                      video_url: '' // Force placeholder state in component
                    }}
                  />
                ))
              )}
            </div>
            {videos.length === 0 && (
              <div className="mt-8 p-6 text-center border border-white/5 bg-white/[0.02] rounded-3xl">
                <p className="text-[#94a3b8] text-sm">
                  💡 <span className="text-white font-medium">No uploaded videos yet</span> for this category. Showing demo placeholders.
                </p>
              </div>
            )}
          </>
        )}

        {/* Global CTA */}
        <div className="mt-20 text-center">
            <h4 className="text-white text-xl font-bold mb-8">Ready to create something viral?</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="btn-primary px-10 py-4 w-full sm:w-auto text-lg">
                Start Your Project
              </a>
              <a 
                href={activeCategory.drive_link && activeCategory.drive_link !== '#' ? activeCategory.drive_link : '#'}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 border-white/10 hover:bg-white/5"
              >
                Explore All Files <ChevronRight size={18} />
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}
