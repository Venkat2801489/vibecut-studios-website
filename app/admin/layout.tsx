'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Video, Tag, Settings, LogOut, Play, Menu, X, ExternalLink,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Video, label: 'Videos', href: '/admin/videos' },
  { icon: Tag, label: 'Categories', href: '/admin/categories' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className={`p-5 border-b border-white/5 flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex-shrink-0 flex items-center justify-center">
            <Play size={14} fill="white" className="text-white ml-0.5" />
          </div>
          {!collapsed && (
            <div>
              <span
                style={{ fontFamily: 'Syne, sans-serif' }}
                className="text-white font-bold text-base leading-none whitespace-nowrap"
              >
                Vibecut
              </span>
              <p className="text-[#94a3b8] text-[10px] mt-0.5">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3'} ${active ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className={`admin-nav-item flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3'}`}
          title={collapsed ? 'View Website' : ''}
        >
          <ExternalLink size={15} className="flex-shrink-0" />
          {!collapsed && <span>View Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`admin-nav-item w-full text-left hover:text-red-400 flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3'}`}
          title={collapsed ? 'Sign Out' : ''}
        >
          <LogOut size={15} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="min-h-screen flex" style={{ background: '#08080f' }}>
      {/* Desktop Sidebar */}
      {!isLoginPage && (
        <aside
          className={`admin-sidebar hidden md:flex flex-col transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-20' : 'w-[260px]'
          }`}
          style={{ width: isCollapsed ? '80px' : '260px' }}
        >
          <SidebarContent collapsed={isCollapsed} />
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      {!isLoginPage && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {!isLoginPage && (
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex flex-col md:hidden transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: 260, background: '#0f0f1a', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          <SidebarContent />
        </aside>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          !isLoginPage ? (isCollapsed ? 'md:ml-20' : 'md:ml-[260px]') : ''
        }`}
      >
        {/* Top bar (Both Desktop and Mobile) */}
        {!isLoginPage && (
          <header className="flex items-center justify-between px-5 py-4 border-b border-white/5 sticky top-0 bg-[#08080f]/80 backdrop-blur-md z-30">
            <div className="flex items-center gap-4">
              {/* Desktop Toggle */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-2 rounded-lg bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white transition-all"
              >
                <Menu size={18} />
              </button>
              {/* Mobile Toggle */}
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white/70 hover:text-white">
                <Menu size={22} />
              </button>
              <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold">
                {isCollapsed ? '' : 'Vibecut Admin'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Optional: Add user profile or quick actions here */}
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[#94a3b8]">Logged in as</p>
                <p className="text-xs font-bold text-white">Owner</p>
              </div>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className={`flex-1 ${!isLoginPage ? 'p-6 md:p-10' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
