import React, { useState } from 'react';
import { Mail, Send, Trash2, Download, CheckCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';

export const NewsletterList = () => {
  const newsletters = useCmsStore((s) => s.newsletters);
  const deleteNewsletter = useCmsStore((s) => s.deleteNewsletter);

  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState('Festive Heirloom Drops — Early Salon Access');
  const [campaignBody, setCampaignBody] = useState('Discover handcrafted Kundan and meenakari designs created for your special festivities...');
  const [testSent, setTestSent] = useState(false);

  const columns = [
    {
      key: 'email',
      header: 'Subscriber Email',
      render: (email) => <span className="font-semibold text-espresso">{email}</span>,
    },
    {
      key: 'source',
      header: 'Source Origin',
      render: (src) => (
        <span className="capitalize px-2 py-0.5 rounded bg-sand/40 border border-sand-border text-espresso/80 text-[11px]">
          {src.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'subscribedDate',
      header: 'Subscription Date',
      render: (date) => (
        <span className="text-espresso/70">
          {new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (st) => <StatusBadge status={st} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      className: 'text-right',
      render: (_, row) => (
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remove subscriber ${row.email}?`)) deleteNewsletter(row.id);
          }}
          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  const handleSendCampaign = (e) => {
    e.preventDefault();
    alert(`Campaign "${campaignSubject}" dispatched to ${newsletters.length} subscribers.`);
    setCampaignModalOpen(false);
  };

  const handleTestSend = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Newsletter Subscribers"
        description="Audience members who subscribed via popups, footer signup, or checkout opt-in."
        badge={`${newsletters.length} Subscribers`}
      >
        <button
          type="button"
          onClick={() => setCampaignModalOpen(true)}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Campaign</span>
        </button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={newsletters}
        searchKey="email"
        searchPlaceholder="Search subscriber email..."
      />

      {/* Campaign Broadcast Modal */}
      {campaignModalOpen && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border">
              <h3 className="font-serif text-lg font-medium text-espresso">
                Broadcast VIP Newsletter Campaign
              </h3>
              <span className="text-xs text-espresso/60">
                Audience: {newsletters.length} recipients
              </span>
            </div>

            <form onSubmit={handleSendCampaign} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                  Campaign Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-espresso/70 block mb-1">
                  Email Copy & Announcements
                </label>
                <textarea
                  rows={4}
                  required
                  value={campaignBody}
                  onChange={(e) => setCampaignBody(e.target.value)}
                  className="w-full p-3 border border-sand-border rounded text-xs outline-none focus:ring-1 focus:ring-champagne leading-relaxed"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sand-border">
                <button
                  type="button"
                  onClick={handleTestSend}
                  className="w-full sm:w-auto px-3 py-1.5 border border-sand-border hover:bg-sand/30 text-xs font-semibold rounded text-espresso text-center"
                >
                  {testSent ? '✓ Test Sent to Owner' : 'Send Test Preview'}
                </button>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setCampaignModalOpen(false)}
                    className="flex-1 sm:flex-none px-3 py-1.5 border border-sand-border text-xs rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm text-center"
                  >
                    Dispatch Campaign
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
