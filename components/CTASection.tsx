'use client';
import { ArrowRight, Calendar, Play, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="relative rounded-[32px] overflow-hidden p-12 sm:p-16 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(15,15,26,0.8) 40%, rgba(236,72,153,0.2) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Orbs inside CTA */}
          <div
            className="absolute top-[-100px] left-[-100px] w-72 h-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div
            className="absolute bottom-[-100px] right-[-100px] w-72 h-72 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', filter: 'blur(60px)' }}
          />

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              boxShadow: '0 20px 40px rgba(124,58,237,0.4)',
            }}
          >
            <Sparkles size={28} className="text-white" />
          </div>

          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="relative text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Ready to Edit <span className="gradient-text">Stunning Reels?</span>
          </h2>
          <p className="relative text-[#94a3b8] text-base sm:text-lg max-w-xl mx-auto mb-10">
            Book a call to take your brand from zero to max views with our expert editing and content strategy.
          </p>

          <div className="relative flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hello@vibecutstudios.com"
              className="btn-primary flex items-center gap-2"
            >
              <Calendar size={16} />
              Book a Strategy Call
              <ArrowRight size={15} />
            </a>
            <a
              href="#portfolio"
              className="btn-secondary flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play size={15} />
              View Case Studies
            </a>
          </div>

          {/* Trust badges */}
          <div className="relative mt-10 flex flex-wrap gap-6 justify-center">
            {['✓ No long-term contracts', '✓ Results in 30 days', '✓ 100% original content'].map((badge) => (
              <span key={badge} className="text-[#94a3b8] text-sm font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
