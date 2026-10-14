import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Download,
  Filter,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EmptyState } from './EmptyState';

export const DataTable = ({
  columns = [],
  data = [],
  searchKey = 'name',
  searchPlaceholder = 'Search records...',
  filterComponent,
  bulkActions = [], // [{ label, onClick, variant: 'primary'|'danger' }]
  onRowClick,
  emptyTitle = "No records found",
  emptyDescription = "There are no entries matching your current view or filter criteria.",
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 25,
  initialSortKey,
  initialSortDir = 'desc',
}) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(initialSortKey || (columns[0]?.key || ''));
  const [sortDir, setSortDir] = useState(initialSortDir);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item) => {
      // Check primary searchKey
      const val = item[searchKey];
      if (val && String(val).toLowerCase().includes(q)) return true;
      // Search all string properties
      return Object.values(item).some((v) =>
        typeof v === 'string' && v.toLowerCase().includes(q)
      );
    });
  }, [data, search, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.includes(row.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const exportCsv = () => {
    if (!data.length) return;
    const headers = columns.map((col) => col.header).join(',');
    const rows = sortedData.map((item) =>
      columns
        .map((col) => {
          let val = item[col.key];
          if (typeof val === 'object') val = JSON.stringify(val);
          return `"${String(val || '').replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-sand-border/80 rounded-[4px] shadow-subtle flex flex-col">
      {/* Table Toolbar */}
      <div className="p-3 sm:p-4 border-b border-sand-border/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-ivory/20">
        <div className="flex flex-1 items-center gap-2 w-full md:max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-sand-border rounded-[2px] text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-champagne"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {filterComponent}
          <button
            type="button"
            onClick={exportCsv}
            title="Export CSV"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-medium rounded-[2px] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Banner */}
      {selectedIds.length > 0 && (
        <div className="bg-sand/40 border-b border-sand-border px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-fade-in">
          <span className="font-semibold text-espresso">
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {bulkActions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  action.onClick(selectedIds);
                  setSelectedIds([]);
                }}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors shadow-sm ${
                  action.variant === 'danger'
                    ? 'bg-rose-700 hover:bg-rose-800 text-white'
                    : 'bg-champagne hover:bg-champagne-hover text-espresso'
                }`}
              >
                {action.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-2 py-1 text-espresso/60 hover:text-espresso underline text-xs"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      {paginatedData.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} className="border-0 shadow-none py-16" />
      ) : (
        <div className="overflow-x-auto -mx-px scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#FAF7F0] border-b border-sand-border text-espresso/70 sticky top-0 z-10">
              <tr>
                {bulkActions.length > 0 && (
                  <th className="w-10 px-3 sm:px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-espresso/60 hover:text-espresso"
                      aria-label="Select all"
                    >
                      {isAllSelected ? (
                        <CheckSquare className="w-4 h-4 text-champagne-dark" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key, col.sortable !== false)}
                    className={`px-3 sm:px-4 py-3 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap select-none ${
                      col.sortable !== false ? 'cursor-pointer hover:text-espresso' : ''
                    } ${col.className || ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable !== false && (
                        <span className="text-espresso/40">
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-champagne-dark" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-champagne-dark" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-border/40 text-espresso font-sans">
              {paginatedData.map((row, index) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id || index}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      onRowClick ? 'cursor-pointer hover:bg-ivory/50' : 'hover:bg-ivory/30'
                    } ${isSelected ? 'bg-sand/30' : ''}`}
                  >
                    {bulkActions.length > 0 && (
                      <td className="w-10 px-3 sm:px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => toggleSelectRow(row.id, e)}
                          className="text-espresso/60 hover:text-espresso"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-champagne-dark" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={`px-3 sm:px-4 py-3 sm:py-3.5 align-middle ${col.className || ''}`}>
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="p-3 sm:p-4 border-t border-sand-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-espresso/70 bg-ivory/10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
          <span>
            Showing <strong className="text-espresso font-semibold">{(currentPage - 1) * pageSize + (paginatedData.length > 0 ? 1 : 0)}</strong> to{' '}
            <strong className="text-espresso font-semibold">{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
            <strong className="text-espresso font-semibold">{sortedData.length}</strong> entries
          </span>
          <div className="flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-sand-border">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-sand-border rounded-[2px] text-xs text-espresso focus:ring-1 focus:ring-champagne outline-none"
            >
              {pageSizeOptions.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1 justify-center">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center border border-sand-border rounded-[2px] hover:bg-sand/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-semibold text-espresso">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center border border-sand-border rounded-[2px] hover:bg-sand/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
