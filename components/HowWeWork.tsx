'use client';
import { useRef, useEffect, useState } from 'react';
import {
  Lightbulb, Camera, Film, Scissors, Share2, BarChart3,
} from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Content Strategy & Planning',
    color: '#7c3aed',
  },
  {
    icon: Camera,
    title: 'Professional Shoot',
    color: '#9333ea',
  },
  {
    icon: Scissors,
    title: 'High-Quality Editing',
    color: '#c026d3',
  },
  {
    icon: Film,
    title: 'Storyboarding & Scripting',
    color: '#db2777',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    color: '#ec4899',
  },
  {
    icon: BarChart3,
    title: 'Performance Analysis',
    color: '#f43f5e',
  },
];

export default function HowWeWork() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-we-work" ref={ref} className="py-24 relative">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 right-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-divider mb-6" />
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            A proven 6-step framework that turns your brand into a scroll-stopping Reels machine.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="glass-card p-6 group cursor-default transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                }}
              >
                {/* Number badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: step.color }} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      color: step.color,
                      opacity: 0.3,
                    }}
                    className="text-4xl font-bold"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-lg mb-1 group-hover:gradient-text transition-all">
                  {step.title}
                </h3>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
