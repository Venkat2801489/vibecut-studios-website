'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Play, TrendingUp, Eye, Users } from 'lucide-react';

const heroWords = ['Captivating', 'Trending', 'Viral', 'Premium'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(heroWords[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(heroWords[0].length);

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

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingReels = [
    { category: 'Fashion', views: '2.3M', color: '#7c3aed' },
    { category: 'Bridal', views: '1.8M', color: '#ec4899' },
    { category: 'Real Estate', views: '980K', color: '#06b6d4' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
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

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <button
              onClick={() => scrollTo('#portfolio')}
              className="btn-primary flex items-center gap-2"
            >
              <Play size={16} fill="white" />
              View Our Work
            </button>
            <button
              onClick={() => scrollTo('#how-we-work')}
              className="btn-secondary flex items-center gap-2"
            >
              Our Process <ArrowRight size={15} />
            </button>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            {[
              { icon: Eye, label: '5M+ Views', color: '#7c3aed' },
              { icon: Users, label: '50+ Clients', color: '#ec4899' },
              { icon: TrendingUp, label: '7 Industries', color: '#06b6d4' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} style={{ color }} />
                <span className="text-sm font-semibold text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Floating Reel Cards */}
        <div className="relative h-[380px] sm:h-[480px] lg:h-[520px] mt-12 lg:mt-0">
          {/* Central large reel mockup */}
          <div
            className="glass-card absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-48 h-80 sm:w-56 sm:h-96 flex items-center justify-center overflow-hidden animate-pulse-glow"
            style={{ borderRadius: '24px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/30 to-[#ec4899]/30" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
                <Play size={24} fill="white" className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-xs font-medium">Vibecut Studios</p>
              <p className="text-white text-sm font-semibold mt-1">Featured Reel</p>
            </div>
            {/* Reel film frame marks */}
            <div className="absolute top-3 left-0 right-0 flex justify-between px-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-4 bg-white/10 rounded-sm" />
              ))}
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-between px-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-4 bg-white/10 rounded-sm" />
              ))}
            </div>
          </div>

          {/* Floating category cards */}
          {floatingReels.map((reel, i) => {
            return (
              <div
                key={reel.category}
                className="glass-card absolute px-4 py-3 text-sm font-medium"
                style={{
                  top: i === 0 ? '8%' : i === 1 ? '15%' : 'auto',
                  bottom: i === 2 ? '10%' : 'auto',
                  left: i === 0 ? '0' : i === 2 ? '5%' : 'auto',
                  right: i === 1 ? '0' : 'auto',
                  animation: `orb-float ${5 + i * 1.5}s ease-in-out infinite`,
                  animationDelay: `${i * 1.2}s`,
                  borderRadius: '14px',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: reel.color, boxShadow: `0 0 10px ${reel.color}` }}
                  />
                  <span className="text-white text-xs font-semibold">{reel.category}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Eye size={11} className="text-[#94a3b8]" />
                  <span className="text-[#94a3b8] text-xs">{reel.views} views</span>
                </div>
              </div>
            );
          })}

          {/* Decorative rings */}
          <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-64 h-64 rounded-full border border-white/5"
            style={{ animation: 'orb-float 10s ease-in-out infinite' }}
          />
          <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-80 h-80 rounded-full border border-white/[0.03]"
            style={{ animation: 'orb-float 14s ease-in-out infinite reverse' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
