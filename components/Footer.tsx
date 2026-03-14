'use client';
import { Play, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Why Vibecut', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Book a Call', href: '#contact' },
];


export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #ec4899, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center">
                <Play size={16} fill="white" className="text-white ml-0.5" />
              </div>
              <span
                style={{ fontFamily: 'Syne, sans-serif' }}
                className="text-white font-bold text-xl"
              >
                Vibecut<span className="gradient-text">Studios</span>
              </span>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
              India&apos;s premium Instagram Reels production agency. We turn brands into content powerhouses.
            </p>
            <div className="flex gap-3">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[#94a3b8] text-sm hover:text-white flex items-center gap-1.5 group transition-colors duration-200"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:vibecutstudios254@gmail.com"
                  className="flex items-center gap-2.5 text-[#94a3b8] text-sm hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#7c3aed]" />
                  vibecutstudios254@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:8678971472"
                  className="flex items-center gap-2.5 text-[#94a3b8] text-sm hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#ec4899]" />
                  8678971472
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-[#94a3b8] text-sm">
                  <MapPin size={14} className="text-[#06b6d4] mt-0.5 flex-shrink-0" />
                  Chennai, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#94a3b8] text-xs">&copy; {new Date().getFullYear()} Vibecut Studios. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-[#94a3b8] text-xs cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-[#94a3b8] text-xs cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
