import React, { useState, useMemo } from 'react';
import { History, Eye, Filter, ShieldCheck, Download, Code } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { useCmsStore } from '../../lib/cmsStore';

export const AuditLog = () => {
  const auditLogs = useCmsStore((s) => s.auditLogs);

  const [entityFilter, setEntityFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (entityFilter !== 'all' && log.entity !== entityFilter) return false;
      if (actionFilter !== 'all' && log.action !== actionFilter) return false;
      return true;
    });
  }, [auditLogs, entityFilter, actionFilter]);

  const uniqueEntities = Array.from(new Set(auditLogs.map((l) => l.entity)));
  const uniqueActions = Array.from(new Set(auditLogs.map((l) => l.action)));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Audit & Mutation Log"
        description="Immutable administrative record of every database modification, price update, refund, and state change."
        badge={`${auditLogs.length} Events`}
      />

      <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-sand-border/80 rounded-[4px] shadow-subtle text-xs">
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="px-3 py-1.5 border border-sand-border rounded bg-white outline-none"
        >
          <option value="all">All Entities</option>
          {uniqueEntities.map((ent) => (
            <option key={ent} value={ent}>
              {ent}
            </option>
          ))}
        </select>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-1.5 border border-sand-border rounded bg-white outline-none"
        >
          <option value="all">All Action Types</option>
          {uniqueActions.map((act) => (
            <option key={act} value={act}>
              {act}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity Type</th>
                <th className="px-4 py-3">Entity ID</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3 text-right">JSON Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-espresso/70 text-[11px]">
                    {new Date(log.timestamp).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-espresso">
                    {log.userName}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sand/50 text-espresso border border-sand-border">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-espresso">
                    {log.entity}
                  </td>
                  <td className="px-4 py-3 font-mono text-espresso/60 text-[11px]">
                    {log.entityId || '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-espresso/50 text-[11px]">
                    {log.ip}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(log)}
                      className="px-2.5 py-1 bg-ivory border border-sand-border hover:bg-sand/40 text-espresso text-[11px] font-semibold rounded flex items-center gap-1 ml-auto"
                    >
                      <Code className="w-3 h-3 text-champagne-dark" />
                      <span>Inspect Diff</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Diff Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sand-border rounded-[4px] shadow-2xl w-full max-w-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-border">
              <div>
                <h3 className="font-serif text-base font-medium text-espresso">
                  Audit Entry: {selectedEntry.id}
                </h3>
                <p className="text-xs text-espresso/60">
                  {selectedEntry.action} on {selectedEntry.entity} ({selectedEntry.entityId}) by{' '}
                  {selectedEntry.userName}
                </p>
              </div>
              <span className="text-xs font-mono text-espresso/40">
                {selectedEntry.timestamp}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">
                  State Before:
                </span>
                <pre className="p-3 bg-ivory/60 border border-sand-border rounded overflow-x-auto max-h-64 text-[11px] text-espresso leading-relaxed">
                  {selectedEntry.before
                    ? JSON.stringify(selectedEntry.before, null, 2)
                    : '// No prior state (Create)'}
                </pre>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                  State After:
                </span>
                <pre className="p-3 bg-ivory/60 border border-sand-border rounded overflow-x-auto max-h-64 text-[11px] text-espresso leading-relaxed">
                  {selectedEntry.after
                    ? JSON.stringify(selectedEntry.after, null, 2)
                    : '// Record removed (Delete)'}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-sand-border">
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-1.5 bg-espresso text-ivory text-xs font-semibold rounded hover:bg-espresso-light"
              >
                Close Diff Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
