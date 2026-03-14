'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Eye, EyeOff, Lock, User, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#08080f' }}
    >
      {/* Background */}
      <div className="orb orb-purple w-[500px] h-[500px] top-[-200px] left-[-200px] opacity-30" />
      <div className="orb orb-pink w-[400px] h-[400px] bottom-[-150px] right-[-150px] opacity-20" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center shadow-lg">
              <Play size={18} fill="white" className="text-white ml-0.5" />
            </div>
            <span
              style={{ fontFamily: 'Syne, sans-serif' }}
              className="text-white font-bold text-2xl"
            >
              Vibecut<span className="gradient-text">Studios</span>
            </span>
          </div>
          <p className="text-[#94a3b8] text-sm">Owner Dashboard — Restricted Access</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/20 flex items-center justify-center">
              <Lock size={15} className="text-[#7c3aed]" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Admin Login</h1>
              <p className="text-[#94a3b8] text-xs">Only authorized owners can access</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#94a3b8] text-xs font-medium mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={15} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#94a3b8] text-xs mt-4">
          This dashboard is for authorized use only.{' '}
          <a href="/" className="text-[#7c3aed] hover:underline">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
