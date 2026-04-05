'use client';

import { useState } from 'react';
import { HiGlobe, HiMail, HiShare, HiCheck } from 'react-icons/hi';

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    siteTitle: 'Barrwit International',
    siteDescription: 'International Consulting & Investment',
    contactEmail: 'info@barrwit.com',
    contactPhone: '+1 (555) 000-0000',
    contactAddress: '123 Business Ave, Suite 100, New York, NY 10001',
    socialLinks: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      setMessage({ type: 'success', text: 'Site settings saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
        <p className="text-gray-400">Manage your website configuration</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          <HiCheck /> {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2"><HiGlobe className="text-[#C0C0C0]" /> General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Site Title</label>
              <input type="text" value={formData.siteTitle} onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Site Description</label>
              <textarea value={formData.siteDescription} onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })} rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2"><HiMail className="text-[#C0C0C0]" /> Contact Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Phone</label>
              <input type="tel" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Address</label>
              <textarea value={formData.contactAddress} onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })} rows={2}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2"><HiShare className="text-[#C0C0C0]" /> Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['twitter', 'linkedin', 'facebook', 'instagram'].map(platform => (
              <div key={platform}>
                <label className="block text-gray-300 text-sm mb-2 capitalize">{platform}</label>
                <input type="url" value={formData.socialLinks[platform as keyof typeof formData.socialLinks]} 
                  onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [platform]: e.target.value } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder={`https://${platform}.com/yourprofile`} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-[#C0C0C0] to-gray-400 text-black font-semibold rounded-lg disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
