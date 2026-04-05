'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    image: '',
    tags: [] as string[],
    results: [] as { metric: string; label: string }[],
    featured: false,
    isActive: true,
  });
  const [newTag, setNewTag] = useState('');
  const [newResult, setNewResult] = useState({ metric: '', label: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const addResult = () => {
    if (newResult.metric && newResult.label) {
      setFormData({ ...formData, results: [...formData.results, newResult] });
      setNewResult({ metric: '', label: '' });
    }
  };

  const removeTag = (index: number) => {
    const updated = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updated });
  };

  const removeResult = (index: number) => {
    const updated = formData.results.filter((_, i) => i !== index);
    setFormData({ ...formData, results: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <HiArrowLeft className="text-xl text-white" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">New Project</h1>
          <p className="text-gray-400">Add a new project to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required placeholder="enterprise-erp-system" />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required>
              <option value="">Select category</option>
              <option value="Software Development">Software Development</option>
              <option value="Investment Management">Investment Management</option>
              <option value="Business Development">Business Development</option>
              <option value="Digital Transformation">Digital Transformation</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" required />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Image URL</label>
            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="/projects/erp.jpg" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Add tag..." />
            <button type="button" onClick={addTag} className="px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 rounded-full bg-[#C0C0C0]/20 text-white text-sm flex items-center gap-2">
                {tag}
                <button type="button" onClick={() => removeTag(index)} className="text-red-400 hover:text-red-300">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Results</h2>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input type="text" value={newResult.metric} onChange={(e) => setNewResult({ ...newResult, metric: e.target.value })}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Metric (e.g., 50%)" />
            <input type="text" value={newResult.label} onChange={(e) => setNewResult({ ...newResult, label: e.target.value })}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C0C0C0]/50" placeholder="Label (e.g., Efficiency)" />
          </div>
          <button type="button" onClick={addResult} className="w-full px-6 py-3 bg-[#C0C0C0]/20 text-white rounded-lg hover:bg-[#C0C0C0]/30">Add Result</button>
          <div className="mt-3 space-y-2">
            {formData.results.map((result, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5">
                <span className="text-[#C0C0C0] font-bold">{result.metric}</span>
                <span className="text-gray-400">-</span>
                <span className="text-white flex-1">{result.label}</span>
                <button type="button" onClick={() => removeResult(index)} className="text-red-400 hover:text-red-300">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border-white/10 text-[#C0C0C0]" />
              <span className="text-white">Featured Project</span>
            </label>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border-white/10 text-[#C0C0C0]" />
              <span className="text-white">Active</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => router.back()} className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-[#C0C0C0] to-gray-400 text-black font-semibold rounded-lg disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
