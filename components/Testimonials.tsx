'use client';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Lakshmi',
    role: 'Owner, Priya Boutique',
    industry: '👗 Fashion',
    quote: 'Our Instagram reached 200K in just 3 months with Vibecut. The reels they create for our boutique are absolutely stunning — our walk-in traffic doubled!',
    rating: 5,
    initials: 'PL',
    color: '#7c3aed',
  },
  {
    name: 'Rahul Mehta',
    role: 'CEO, Mehta Realty',
    industry: '🏢 Real Estate',
    quote: "Property enquiries went through the roof after we started with Vibecut. One reel went viral with 1.2M views. Best investment we've made for marketing.",
    rating: 5,
    initials: 'RM',
    color: '#06b6d4',
  },
  {
    name: 'Dr. Sunitha Raj',
    role: 'Director, Sunitha Wellness Clinic',
    industry: '🏥 Healthcare',
    quote: 'Professional, consistent, and incredibly creative. Our clinic page grew from 2K to 28K followers in 4 months. Patient inquiries increased by 180%.',
    rating: 5,
    initials: 'SR',
    color: '#10b981',
  },
  {
    name: 'Kavya Krishnan',
    role: 'Founder, Kavya Bridal Studio',
    industry: '💍 Bridal',
    quote: "The way they capture the emotion in bridal content is unmatched. We're fully booked for the next year, and Vibecut reels are a huge reason why.",
    rating: 5,
    initials: 'KK',
    color: '#ec4899',
  },
  {
    name: 'Arjun Naidu',
    role: 'MD, Naidu Interiors',
    industry: '🏡 Interior Design',
    quote: 'Our brand presence went from zero to hero. The interior reels Vibecut creates showcase our work better than any photoshoot ever could.',
    rating: 5,
    initials: 'AN',
    color: '#f59e0b',
  },
  {
    name: 'Maya Sharma',
    role: 'Director, Sharma Academy',
    industry: '📚 Education',
    quote: 'Student enrollment increased by 65% after our Vibecut campaign. The educational reels position us as industry experts and the results speak for themselves.',
    rating: 5,
    initials: 'MS',
    color: '#8b5cf6',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="orb orb-purple w-[500px] h-[500px] top-0 left-[-150px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-divider mb-6" />
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            From boutiques to hospitals — brands that trusted Vibecut and grew beyond expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="testimonial-card group" style={{ animationDelay: `${i * 0.1}s` }}>
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                    <p className="text-[#94a3b8] text-xs">{t.role}</p>
                  </div>
                </div>
                <Quote size={20} style={{ color: t.color, opacity: 0.5 }} />
              </div>

              {/* Industry badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  background: `${t.color}15`,
                  border: `1px solid ${t.color}30`,
                  color: t.color,
                }}
              >
                {t.industry}
              </div>

              {/* Quote */}
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">{`"${t.quote}"`}</p>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" className="text-amber-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
