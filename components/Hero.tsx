'use client';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Eye, Users, Volume2, VolumeX } from 'lucide-react';
import { Video } from '@/types';

const heroWords = ['Captivating', 'Trending', 'Viral', 'Premium'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(heroWords[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(heroWords[0].length);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fetch featured video
    fetch('/api/videos?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedVideo(data[0]);
        }
      })
      .catch((err) => console.error('Error fetching featured video:', err));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
          setDisplayWord(heroWords[wordIndex].substring(0, charIndex - 1));
          setIsDeleting(true);
        }
      } else {
        const nextWord = heroWords[(wordIndex + 1) % heroWords.length];
        if (charIndex < nextWord.length) {
          setCharIndex((prev) => prev + 1);
          setDisplayWord(nextWord.substring(0, charIndex + 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % heroWords.length);
        }
      }
    }, isDeleting ? 80 : 150);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted(!muted);
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingReels = [
    { category: 'Fashion', views: '2.3M', color: '#7c3aed' },
    { category: 'Bridal', views: '1.8M', color: '#ec4899' },
    { category: 'Real Estate', views: '980K', color: '#06b6d4' },
  ];

  return (
    <section className="relative min-h-fit lg:min-h-screen flex items-center justify-center pt-32 pb-20 lg:pt-24 lg:pb-16">
      {/* Background Orbs */}
      <div className="orb orb-purple w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-40" />
      <div
        className="orb orb-pink w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-30"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="orb orb-cyan w-[400px] h-[400px] top-[40%] left-[40%] opacity-20"
        style={{ animationDelay: '6s' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left – Text */}
        <div className="text-center lg:text-left">
          <h1
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6"
          >
            We Create{' '}
            <span className="gradient-text block">
              {displayWord}
              <span className="inline-block w-[3px] h-[0.9em] bg-[#7c3aed] ml-1 align-middle animate-pulse" />
            </span>
            Instagram Reels
          </h1>

          <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            From boutique fashion to luxury real estate — we produce high-impact Instagram Reels
            that stop the scroll, build brand authority, and drive real business growth.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <button onClick={() => scrollTo('#portfolio')} className="btn-primary flex items-center gap-2">
              <Play size={16} fill="white" />
              View Our Work
            </button>
            <button onClick={() => scrollTo('#how-we-work')} className="btn-secondary flex items-center gap-2">
              Our Process <ArrowRight size={15} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            {[
              { icon: Eye, label: '5M+ Views', color: '#7c3aed' },
              { icon: Users, label: '25+ Clients', color: '#ec4899' },
              { icon: TrendingUp, label: '15 Industries', color: '#06b6d4' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} style={{ color }} />
                <span className="text-sm font-semibold text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Interactive Featured Reel */}
        <div className="relative h-[480px] sm:h-[580px] flex items-center justify-center mt-12 lg:mt-0">
          <div
            className="video-card neon-border group relative w-56 h-[380px] sm:w-64 sm:h-[430px] overflow-hidden shadow-2xl animate-pulse-glow"
            style={{ borderRadius: '28px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {featuredVideo?.video_url ? (
              <>
                <video
                  ref={videoRef}
                  src={featuredVideo.video_url}
                  loop
                  autoPlay
                  muted={muted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  poster={featuredVideo.thumbnail_url || undefined}
                />
                
                {/* Overlay while not playing or on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-80'}`}>
                  {/* Top Film Marks */}
                  <div className="absolute top-4 left-0 right-0 flex justify-between px-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3.5 h-4 bg-white/10 rounded-sm" />
                    ))}
                  </div>
                  
                  {/* Bottom Film Marks */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-between px-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3.5 h-4 bg-white/10 rounded-sm" />
                    ))}
                  </div>

                  {/* Audio Toggle */}
                  <button
                    onClick={toggleMute}
                    className={`absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${
                      muted 
                        ? 'bg-black/40 border-white/10 text-white/60 hover:text-white' 
                        : 'bg-white/20 border-white/20 text-white scale-110 shadow-lg'
                    } ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  {/* Play Indicator (Centered) */}
                  {!hovered && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Play size={24} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Featured Label */}
                  <div className={`absolute bottom-8 left-0 right-0 text-center transition-transform duration-300 ${hovered ? 'translate-y-[-10px]' : 'translate-y-0'}`}>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Featured Reel</p>
                    <p className="text-white font-bold text-sm mt-1 px-4 line-clamp-1">{featuredVideo.title}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 to-[#ec4899]/20 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 animate-pulse">
                   <Play size={20} className="text-white/20" />
                </div>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Awaiting Media</p>
              </div>
            )}
          </div>

          {/* Floating category cards */}
          {floatingReels.map((reel, i) => (
            <div
              key={reel.category}
              className="glass-card absolute px-4 py-3 text-sm font-medium z-10"
              style={{
                top: i === 0 ? '5%' : i === 1 ? '18%' : 'auto',
                bottom: i === 2 ? '15%' : 'auto',
                left: i === 0 ? '-10%' : i === 2 ? '0%' : 'auto',
                right: i === 1 ? '-5%' : 'auto',
                animation: `orb-float ${6 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
                borderRadius: '16px',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: reel.color, boxShadow: `0 0 10px ${reel.color}` }} />
                <span className="text-white text-xs font-semibold">{reel.category}</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Eye size={11} className="text-[#94a3b8]" />
                <span className="text-[#94a3b8] text-[10px] uppercase font-bold tracking-wider">{reel.views} views</span>
              </div>
            </div>
          ))}

          {/* Decorative rings */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-[orb-float_12s_ease-in-out_infinite]" />
          <div className="absolute w-[550px] h-[550px] rounded-full border border-white/[0.02] animate-[orb-float_18s_ease-in-out_infinite_reverse]" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
