'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Why Vibecut', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08080f]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300">
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
          <span
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-white font-bold text-xl tracking-tight"
          >
            Vibecut<span className="gradient-text">Studios</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('#contact')}
            className="hidden md:flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
          >
            <Sparkles size={14} />
            Book a Call
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0f0f1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary text-sm py-3 mt-2 text-center"
          >
            Book a Strategy Call
          </button>
        </div>
      </div>
    </nav>
  );
}
