'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiBriefcase, HiFolder, HiMail, HiPlus, HiArrowRight } from 'react-icons/hi';

interface DashboardStats {
  services: { total: number; active: number };
  contacts: { total: number; new: number; recent: any[] };
  projects: { total: number; featured: number };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: 'Total Services',
      value: stats?.services.total || 0,
      subtitle: `${stats?.services.active || 0} active`,
      icon: HiBriefcase,
      color: 'from-[#C0C0C0]/20 to-[#C0C0C0]/5',
      link: '/admin/services',
    },
    {
      title: 'Total Contacts',
      value: stats?.contacts.total || 0,
      subtitle: `${stats?.contacts.new || 0} new`,
      icon: HiMail,
      color: 'from-blue-500/20 to-blue-500/5',
      link: '/admin/contacts',
    },
    {
      title: 'Total Projects',
      value: stats?.projects.total || 0,
      subtitle: `${stats?.projects.featured || 0} featured`,
      icon: HiFolder,
      color: 'from-green-500/20 to-green-500/5',
      link: '/admin/projects',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#C0C0C0] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.link}
              className="block p-6 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl hover:border-[#C0C0C0]/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <HiArrowRight className="text-gray-500 group-hover:text-[#C0C0C0] transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/services/new"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#C0C0C0]/20">
                  <HiPlus className="text-[#C0C0C0]" />
                </div>
                <span className="text-white font-medium">Add New Service</span>
              </div>
              <HiArrowRight className="text-gray-500 group-hover:text-[#C0C0C0] transition-colors" />
            </Link>

            <Link
              href="/admin/projects/new"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <HiPlus className="text-green-400" />
                </div>
                <span className="text-white font-medium">Add New Project</span>
              </div>
              <HiArrowRight className="text-gray-500 group-hover:text-green-400 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="p-6 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Contacts</h3>
            <Link href="/admin/contacts" className="text-sm text-[#C0C0C0] hover:text-white transition-colors">
              View All
            </Link>
          </div>

          {stats?.contacts.recent && stats.contacts.recent.length > 0 ? (
            <div className="space-y-3">
              {stats.contacts.recent.map((contact: any) => (
                <div key={contact._id} className="p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium text-sm">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      contact.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      contact.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{contact.email}</p>
                  {contact.service && (
                    <p className="text-gray-500 text-xs mt-1">Service: {contact.service}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HiMail className="text-4xl text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No contact submissions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
