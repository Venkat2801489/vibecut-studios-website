'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: 5, suffix: 'M+', label: 'Total Views Generated' },
  { number: 50, suffix: '+', label: 'Active Clients' },
  { number: 7, suffix: '+', label: 'Industries Served' },
  { number: 500, suffix: '+', label: 'Reels Produced' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-number">
      {count}
      {suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ec4899]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-card ${
                i < stats.length - 1 ? 'border-r border-white/5' : ''
              } ${i < 2 ? 'border-b border-white/5 lg:border-b-0' : ''}`}
            >
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <p className="text-[#94a3b8] text-sm mt-3 font-medium leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
