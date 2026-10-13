import React, { useState, useMemo } from 'react';
import { Star, Check, X, MessageSquare, Trash2, ShieldCheck, Eye } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useCmsStore } from '../../lib/cmsStore';

export const ReviewModeration = () => {
  const reviews = useCmsStore((s) => s.reviews);
  const products = useCmsStore((s) => s.products);
  const updateReviewStatus = useCmsStore((s) => s.updateReviewStatus);
  const deleteReview = useCmsStore((s) => s.deleteReview);

  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (ratingFilter !== 'all' && r.rating !== Number(ratingFilter)) return false;
      return true;
    });
  }, [reviews, statusFilter, ratingFilter]);

  const handleOpenDetail = (r) => {
    setSelectedReview(r);
    setReplyText(r.reply || '');
  };

  const handleUpdateStatus = (id, newStatus) => {
    updateReviewStatus(id, newStatus, selectedReview?.id === id ? replyText : undefined);
    if (selectedReview?.id === id) {
      setSelectedReview(null);
    }
  };

  const handleBulkApprove = () => {
    reviews
      .filter((r) => r.status === 'pending')
      .forEach((r) => updateReviewStatus(r.id, 'approved'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Review Moderation"
        description="Verify patron reviews before publication to product detail pages. Respond publicly as the brand."
        badge={`${reviews.length} Total`}
      >
        <button
          type="button"
          onClick={handleBulkApprove}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Approve All Pending</span>
        </button>
      </PageHeader>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-sand-border/80 rounded-[4px] shadow-subtle text-xs">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 border border-sand-border rounded bg-white outline-none"
        >
          <option value="all">All Moderation Statuses</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved & Published</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-3 py-1.5 border border-sand-border rounded bg-white outline-none"
        >
          <option value="all">All Star Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
          <option value="4">⭐⭐⭐⭐ 4 Stars</option>
          <option value="3">⭐⭐⭐ 3 Stars</option>
          <option value="2">⭐⭐ 2 Stars</option>
          <option value="1">⭐ 1 Star</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Patron & Rating</th>
                <th className="px-4 py-3">Review Headline & Excerpt</th>
                <th className="px-4 py-3">Public Reply</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {filteredReviews.map((r) => (
                <tr key={r.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-espresso block">{r.productName}</span>
                    <span className="text-[10px] font-mono text-espresso/40">ID: {r.productId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                      {Array.from({ length: r.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-espresso font-medium">{r.customerName}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-semibold text-espresso truncate">{r.title}</p>
                    <p className="text-espresso/60 text-[11px] truncate">{r.excerpt}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs text-espresso/70 text-[11px] italic">
                    {r.reply ? `“${r.reply}”` : <span className="text-espresso/30 not-italic">No reply yet</span>}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(r)}
                        className="px-2.5 py-1 bg-ivory border border-sand-border hover:bg-sand/40 text-espresso text-[11px] font-semibold rounded"
                      >
                        Inspect & Reply
                      </button>
                      {r.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(r.id, 'approved')}
                            className="p-1 hover:bg-emerald-50 text-emerald-700 rounded"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(r.id, 'rejected')}
                            className="p-1 hover:bg-rose-50 text-rose-700 rounded"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Delete review permanently?')) deleteReview(r.id);
                        }}
                        className="p-1 hover:bg-rose-50 text-rose-600 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Reply Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border">
              <h3 className="font-serif text-lg font-medium text-espresso">
                Review for {selectedReview.productName}
              </h3>
              <StatusBadge status={selectedReview.status} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-ivory/50 rounded border border-sand-border">
                <div>
                  <span className="font-semibold text-espresso block">{selectedReview.customerName}</span>
                  <span className="text-espresso/60">{selectedReview.customerEmail}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: selectedReview.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-espresso text-sm mb-1">{selectedReview.title}</p>
                <p className="text-espresso/80 leading-relaxed bg-sand/20 p-3 rounded">
                  &ldquo;{selectedReview.excerpt}&rdquo;
                </p>
              </div>

              <div>
                <label className="font-semibold text-espresso block mb-1">
                  Public Storefront Reply from Khushboo / Team:
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank you for your gracious words..."
                  className="w-full p-2.5 border border-sand-border rounded outline-none focus:ring-1 focus:ring-champagne leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-3 py-1.5 border border-sand-border text-xs rounded hover:bg-sand/30"
              >
                Close
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedReview.id, 'rejected')}
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded hover:bg-rose-100"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedReview.id, 'approved')}
                  className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs rounded shadow-sm"
                >
                  Approve & Publish Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
