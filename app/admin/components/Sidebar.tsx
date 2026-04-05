'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiHome,
  HiBriefcase,
  HiFolder,
  HiMail,
  HiCog,
  HiGlobe 
} from 'react-icons/hi';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: HiHome },
  { name: 'Services', href: '/admin/services', icon: HiBriefcase },
  { name: 'Projects', href: '/admin/projects', icon: HiFolder },
  { name: 'Contacts', href: '/admin/contacts', icon: HiMail },
  { name: 'Settings', href: '/admin/settings', icon: HiCog },
  { name: 'Site Settings', href: '/admin/site-settings', icon: HiGlobe },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              BARRWIT
            </h1>
            <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C0C0C0]/20 to-transparent border-l-2 border-[#C0C0C0] text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="px-4 py-3 rounded-lg bg-white/5">
              <p className="text-xs text-gray-400">Need Help?</p>
              <p className="text-sm text-white mt-1">admin@barrwit.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
