'use client';
import { useEffect, useState } from 'react';
import { Video, Tag, TrendingUp, Upload, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalVideos: number;
  totalCategories: number;
  featuredVideos: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalVideos: 0, totalCategories: 7, featuredVideos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/videos').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ]).then(([videos, cats]) => {
      setStats({
        totalVideos: Array.isArray(videos) ? videos.length : 0,
        totalCategories: Array.isArray(cats) ? cats.length : 7,
        featuredVideos: Array.isArray(videos) ? videos.filter((v: any) => v.is_featured).length : 0,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { icon: Video, label: 'Total Videos', value: stats.totalVideos, color: '#7c3aed', href: '/admin/videos' },
    { icon: Tag, label: 'Categories', value: stats.totalCategories, color: '#06b6d4', href: '/admin/categories' },
    { icon: Sparkles, label: 'Featured Videos', value: stats.featuredVideos, color: '#ec4899', href: '/admin/videos' },
    { icon: TrendingUp, label: 'Max Per Category', value: 10, color: '#10b981', href: '/admin/videos' },
  ];

  const quickActions = [
    { icon: Upload, label: 'Upload New Video', desc: 'Add a new reel to any category', href: '/admin/videos', color: '#7c3aed' },
    { icon: Tag, label: 'Manage Categories', desc: 'Edit drive links and names', href: '/admin/categories', color: '#06b6d4' },
    { icon: Play, label: 'View Public Site', desc: 'See how the website looks', href: '/', color: '#10b981' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl font-bold text-white mb-2">
          Welcome back 👋
        </h1>
        <p className="text-[#94a3b8]">Manage your Vibecut Studios video portfolio from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="glass-card p-5 group hover:border-white/15 transition-all duration-200 block"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${card.color}20`, border: `1px solid ${card.color}30` }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <ArrowUpRight size={14} className="text-[#94a3b8] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div
                style={{ fontFamily: 'Syne, sans-serif', color: card.color }}
                className="text-3xl font-bold mb-1"
              >
                {loading ? '...' : card.value}
              </div>
              <p className="text-[#94a3b8] text-sm">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 className="text-white font-semibold text-lg mb-4">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              target={action.href === '/' ? '_blank' : undefined}
              className="glass-card p-5 flex items-center gap-4 group hover:border-white/15 hover:bg-white/[0.05] transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${action.color}20`, border: `1px solid ${action.color}30` }}
              >
                <Icon size={20} style={{ color: action.color }} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{action.label}</p>
                <p className="text-[#94a3b8] text-xs mt-0.5">{action.desc}</p>
              </div>
              <ArrowUpRight size={15} className="text-[#94a3b8] opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
            </Link>
          );
        })}
      </div>

      {/* Info Box */}
      <div
        className="glass-card p-5"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(15,15,26,0.5))' }}
      >
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Sparkles size={15} className="text-[#7c3aed]" />
          How Video Ordering Works
        </h3>
        <ul className="text-[#94a3b8] text-sm space-y-1.5">
          <li>• Each category shows <strong className="text-white">maximum 10 videos</strong> on the website</li>
          <li>• Videos are ordered by their <strong className="text-white">Position number</strong> (1 = top, 10 = bottom)</li>
          <li>• Set <strong className="text-white">Position 1</strong> for the most viral/trendy reel to show it first</li>
          <li>• Videos beyond 10 are accessible via the <strong className="text-white">Google Drive link</strong> for each category</li>
        </ul>
      </div>
    </div>
  );
}
