'use client';
import { useRef, useEffect, useState } from 'react';
import { Zap, Target, TrendingUp, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Viral Hook Strategy',
    desc: 'The first 3 seconds decide everything. We craft hooks that stop thumbs and demand attention, scientifically optimized for each industry.',
    color: '#7c3aed',
  },
  {
    icon: Target,
    title: 'Industry-Specific Content',
    desc: 'Cookie-cutter content doesn\'t work. We tailor every reel to your niche — from bridal aesthetics to real estate walk-throughs.',
    color: '#ec4899',
  },
  {
    icon: TrendingUp,
    title: 'Algorithm-First Approach',
    desc: 'We study the Instagram algorithm daily. Our posting cadence, hashtag strategy, and format choices are always optimized to maximize reach.',
    color: '#06b6d4',
  },
  {
    icon: Award,
    title: 'Full-Service Production',
    desc: 'From scratch script to shoot and then post — we handle the entire creative pipeline so you can focus on running your business.',
    color: '#f59e0b',
  },
  {
    icon: Clock,
    title: 'Consistent & Timely Delivery',
    desc: 'We work on a strict content calendar. Your reels are scripted, shot, edited, and delivered on schedule — every single time.',
    color: '#10b981',
  },
];

export default function WhyUs() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" ref={ref} className="py-24 relative overflow-hidden">
      <div className="orb orb-cyan w-[500px] h-[500px] top-0 right-[-200px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-divider mb-6" />
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Why <span className="gradient-text">Vibecut Studios?</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            We&apos;re not just a video agency. We&apos;re your brand&apos;s growth engine — built for the short-form video era.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass-card p-7 group hover:border-white/15 hover:bg-white/[0.06] cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                  transition: `all 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${f.color}25, ${f.color}10)`,
                    border: `1px solid ${f.color}30`,
                    boxShadow: `0 0 20px ${f.color}20`,
                  }}
                >
                  <Icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 leading-tight">{f.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
