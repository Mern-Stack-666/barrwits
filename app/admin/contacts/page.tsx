'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiSearch, HiMail } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi2';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      const data = await res.json();
      if (data.success) {
        // Populate service data
        const contactsWithServices = await Promise.all(
          data.data.map(async (contact: any) => {
            if (contact.serviceId) {
              try {
                const serviceRes = await fetch(`/api/admin/services/${contact.serviceId}`);
                const serviceData = await serviceRes.json();
                return { ...contact, serviceData: serviceData.data };
              } catch {
                return contact;
              }
            }
            return contact;
          })
        );
        setContacts(contactsWithServices);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);

    try {
      await fetch(`/api/admin/contacts?id=${deleteDialog.id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c._id !== deleteDialog.id));
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

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.message && contact.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="flex justify-center py-20"><div className="w-12 h-12 border-2 border-[#C0C0C0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contacts</h1>
        <p className="text-gray-400">Manage contact submissions</p>
      </div>

      <div className="relative">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search contacts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C0C0C0]/50" />
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden md:table-cell">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden lg:table-cell">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden xl:table-cell">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredContacts.length > 0 ? filteredContacts.map((contact: any) => (
                <tr key={contact._id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{contact.firstName} {contact.lastName}</p>
                    {contact.company && <p className="text-gray-400 text-sm">{contact.company}</p>}
                  </td>
                  <td className="px-6 py-4 text-gray-400 hidden md:table-cell">{contact.email}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {contact.serviceData ? (
                      <Link
                        href={`/admin/services/${contact.serviceData._id}/edit`}
                        className="text-[#C0C0C0] hover:underline"
                      >
                        {contact.serviceData.title}
                      </Link>
                    ) : (
                      <span className="text-gray-400">{contact.service || '-'}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm hidden xl:table-cell">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteClick(contact._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 ml-auto block"><HiTrash className="text-lg" /></button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-6 py-12 text-center"><HiMail className="text-4xl text-gray-600 mx-auto mb-3" /><p className="text-gray-400">No contacts</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Contact"
        message="Are you sure you want to delete this contact submission? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </div>
  );
}
