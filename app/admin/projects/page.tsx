'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);

    try {
      await fetch(`/api/admin/projects/${deleteDialog.id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== deleteDialog.id));
      setDeleteDialog({ isOpen: false, id: null });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null });
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-20"><div className="w-12 h-12 border-2 border-[#C0C0C0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your project portfolio</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C0C0C0] to-gray-400 text-black font-semibold rounded-lg">
          <HiPlus className="text-xl" /> Add Project
        </Link>
      </div>

      <div className="relative">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C0C0C0]/50" />
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden lg:table-cell">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length > 0 ? filtered.map((project) => (
                <tr key={project._id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-gray-400 text-sm truncate max-w-md">{project.description}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-400 hidden md:table-cell">{project.category}</td>
                  <td className="px-6 py-4 hidden lg:table-cell"><StatusBadge status={project.isActive ? 'active' : 'inactive'} /></td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/projects/${project._id}/edit`} className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><HiPencil className="text-lg" /></Link>
                      <button onClick={() => handleDeleteClick(project._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><HiTrash className="text-lg" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No projects found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </div>
  );
}
