import React, { useState } from 'react';
import { Shield, Plus, Trash2, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';
import { useAuth } from '../../hooks/useAuth';

export const UsersList = () => {
  const users = useCmsStore((s) => s.users);
  const addUser = useCmsStore((s) => s.addUser);
  const updateUserRole = useCmsStore((s) => s.updateUserRole);
  const toggleUserStatus = useCmsStore((s) => s.toggleUserStatus);
  const deleteUser = useCmsStore((s) => s.deleteUser);
  const { user: currentAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'STAFF',
  });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.email.trim()) return;

    addUser({
      name: inviteForm.name || inviteForm.email.split('@')[0],
      email: inviteForm.email.trim(),
      role: inviteForm.role,
    });
    setModalOpen(false);
    setInviteForm({ name: '', email: '', role: 'STAFF' });
  };

  const handleDelete = (u) => {
    if (u.id === currentAdmin?.id) {
      alert('Security policy violation: You cannot delete your own active administrator account.');
      return;
    }
    try {
      if (confirm(`Revoke all access and remove ${u.name} (${u.email})?`)) {
        deleteUser(u.id);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const permissionMatrix = [
    { capability: 'View Products & Stock', superAdmin: true, admin: true, staff: true },
    { capability: 'Create & Edit Products', superAdmin: true, admin: true, staff: false },
    { capability: 'Delete Products & Categories', superAdmin: true, admin: true, staff: false },
    { capability: 'View & Update Orders', superAdmin: true, admin: true, staff: true },
    { capability: 'Cancel & Issue Refunds', superAdmin: true, admin: true, staff: false },
    { capability: 'Moderate Customer Reviews', superAdmin: true, admin: true, staff: true },
    { capability: 'Marketing & Homepage CMS', superAdmin: true, admin: true, staff: false },
    { capability: 'Payment & API Gateway Keys', superAdmin: true, admin: false, staff: false },
    { capability: 'Manage Admin Users & Roles', superAdmin: true, admin: false, staff: false },
    { capability: 'Inspect System Audit Logs', superAdmin: true, admin: true, staff: false },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <PageHeader
        title="Admin Users & Role Matrix"
        description="Grant portal access to studio karigars, store managers, and co-founders with strict role separation."
        badge={`${users.length} Admins`}
      >
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Admin</span>
        </button>
      </PageHeader>

      {/* Users Table */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Role Tier</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Account Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {users.map((u) => {
                const isSelf = u.id === currentAdmin?.id;
                return (
                  <tr key={u.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-espresso text-champagne flex items-center justify-center font-serif text-xs font-bold">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-espresso">{u.name}</span>
                            {isSelf && (
                              <span className="text-[10px] bg-sand/60 text-espresso/70 px-1.5 py-0.2 rounded border border-sand-border">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-espresso/50 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        disabled={isSelf}
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded border outline-none ${
                          u.role === 'SUPER_ADMIN'
                            ? 'bg-champagne/15 border-champagne/40 text-espresso'
                            : 'bg-white border-sand-border text-espresso/80'
                        } disabled:opacity-70`}
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="STAFF">STAFF</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-espresso/60 text-[11px]">
                      {u.lastLogin || 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        disabled={isSelf}
                        onClick={() => toggleUserStatus(u.id)}
                        className="cursor-pointer disabled:cursor-not-allowed"
                      >
                        <StatusBadge status={u.status} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isSelf && (
                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-colors"
                          title="Revoke access"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Capabilities Matrix */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-4">
        <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70 flex items-center gap-2">
          <Shield className="w-4 h-4 text-champagne-dark" />
          <span>Role Capability Permissions Matrix</span>
        </h3>
        <p className="text-xs text-espresso/60">
          Enforced server-side across all mutation endpoints and back-of-house UI views.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-sand-border/60">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Feature Capability</th>
                <th className="p-3 text-center">Super Admin</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {permissionMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-ivory/20">
                  <td className="p-3 font-medium text-espresso">{item.capability}</td>
                  <td className="p-3 text-center">
                    {item.superAdmin ? (
                      <span className="text-emerald-700 font-bold">✓ Full Access</span>
                    ) : (
                      <span className="text-espresso/30">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {item.admin ? (
                      <span className="text-emerald-700 font-bold">✓ Allowed</span>
                    ) : (
                      <span className="text-espresso/30">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {item.staff ? (
                      <span className="text-emerald-700 font-bold">✓ Allowed</span>
                    ) : (
                      <span className="text-rose-700 font-bold">✕ Restricted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-espresso">
              Invite Team Member
            </h3>
            <p className="text-xs text-espresso/60">
              Dispatches an invitation with a secure one-time activation link.
            </p>

            <form onSubmit={handleInvite} className="space-y-3 text-xs">
              <FormField label="Full Name" required>
                <input
                  type="text"
                  required
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Radhika Sethi"
                  className="w-full px-3 py-2 border border-sand-border rounded outline-none"
                />
              </FormField>

              <FormField label="Email Address" required>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="radhika@zewar.com"
                  className="w-full px-3 py-2 border border-sand-border rounded outline-none font-mono"
                />
              </FormField>

              <FormField label="Assign Role Tier" required>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-sand-border rounded bg-white outline-none"
                >
                  <option value="STAFF">STAFF (Orders fulfillment, stock updates only)</option>
                  <option value="ADMIN">ADMIN (Catalog, orders, marketing, content)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full control + user management)</option>
                </select>
              </FormField>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 border border-sand-border text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm"
                >
                  Send Admin Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
