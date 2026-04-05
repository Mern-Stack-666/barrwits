'use client';

import { useSession, signOut } from 'next-auth/react';
import { HiMenu, HiLogout, HiUser } from 'react-icons/hi';

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <HiMenu className="text-xl text-white" />
        </button>

        {/* Page Title */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage your content</p>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C0C0C0] to-gray-500 flex items-center justify-center">
              <HiUser className="text-white text-sm" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{session?.user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
          >
            <HiLogout className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
