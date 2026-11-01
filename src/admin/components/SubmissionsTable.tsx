import React from 'react';
import type { Submission, SubmissionStatus } from '../types';
import { formatDate, getStatusStyle, getTypeBadgeStyle } from '../utils/formatters';
import { ChevronLeft, ChevronRight, Inbox, Mail, ArrowRight } from 'lucide-react';

interface SubmissionsTableProps {
  submissions: Submission[];
  totalCount: number;
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onSelectRow: (submission: Submission) => void;
  onUpdateStatus: (id: string, newStatus: SubmissionStatus) => Promise<void>;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  totalCount,
  loading,
  page,
  pageSize,
  onPageChange,
  onSelectRow,
  onUpdateStatus,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startRow = totalCount === 0 ? 0 : page * pageSize + 1;
  const endRow = Math.min((page + 1) * pageSize, totalCount);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    e.stopPropagation();
    const newStatus = e.target.value as SubmissionStatus;
    await onUpdateStatus(id, newStatus);
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#DDE3E2] rounded-[1.25rem] p-6 shadow-xs">
        <div className="space-y-4">
          <div className="h-6 w-48 bg-[#F1F4F4] animate-pulse rounded-md" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-[#F1F4F4]/70 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white border border-[#DDE3E2] rounded-[1.25rem] p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#F1F4F4] text-[#5A6D6C] mx-auto flex items-center justify-center mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-[#1F292A]">No submissions found</h3>
        <p className="text-xs text-[#5A6D6C] mt-1 max-w-sm mx-auto">
          No records match your current filter and search criteria. Try resetting filters or searching for another term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* DESKTOP TABLE VIEW (hidden on < md / 768px)                                */}
      {/* ========================================================================= */}
      <div className="hidden md:block bg-white border border-[#DDE3E2] rounded-[1.25rem] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DDE3E2] bg-[#F1F4F4]/60 text-[11px] font-semibold text-[#5A6D6C] uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Persona</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Message Preview</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE3E2] text-xs">
              {submissions.map((sub) => {
                const isNew = sub.status === 'new';
                const typeStyle = getTypeBadgeStyle(sub.type);
                const statusStyle = getStatusStyle(sub.status);

                return (
                  <tr
                    key={sub.id}
                    onClick={() => onSelectRow(sub)}
                    className="hover:bg-[#F1F4F4]/40 cursor-pointer transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-3 px-4 text-[#5A6D6C] whitespace-nowrap">
                      {formatDate(sub.created_at)}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border ${typeStyle.badge}`}
                      >
                        {typeStyle.label}
                      </span>
                    </td>

                    {/* Name with New dot */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isNew && (
                          <span
                            className="w-2 h-2 rounded-full bg-[#336E87] shrink-0"
                            title="New submission"
                          />
                        )}
                        <span
                          className={`truncate max-w-[140px] text-[#1F292A] ${
                            isNew ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {sub.full_name}
                        </span>
                      </div>
                    </td>

                    {/* Email link */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <a
                        href={`mailto:${encodeURIComponent(sub.email)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#336E87] hover:underline truncate max-w-[160px] inline-block"
                        title={sub.email}
                      >
                        {sub.email}
                      </a>
                    </td>

                    {/* Persona */}
                    <td className="py-3 px-4 text-[#5A6D6C] truncate max-w-[120px]">
                      {sub.persona || '—'}
                    </td>

                    {/* Route */}
                    <td className="py-3 px-4 text-[#5A6D6C] whitespace-nowrap">
                      {sub.origin && sub.destination ? (
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <span>{sub.origin}</span>
                          <ArrowRight className="w-3 h-3 text-[#8D9B9A]" />
                          <span>{sub.destination}</span>
                        </span>
                      ) : (
                        sub.origin || sub.destination || '—'
                      )}
                    </td>

                    {/* Message Preview */}
                    <td className="py-3 px-4 text-[#5A6D6C] max-w-[200px]">
                      <p className="truncate" title={sub.message || ''}>
                        {sub.message || '—'}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={sub.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(e, sub.id)}
                        className={`text-xs py-1 px-2.5 rounded-lg border font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87] ${statusStyle.badge}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE STACKED CARDS VIEW (hidden on >= md / 768px)                       */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-3">
        {submissions.map((sub) => {
          const isNew = sub.status === 'new';
          const typeStyle = getTypeBadgeStyle(sub.type);
          const statusStyle = getStatusStyle(sub.status);

          return (
            <div
              key={sub.id}
              onClick={() => onSelectRow(sub)}
              className="bg-white border border-[#DDE3E2] rounded-[1.25rem] p-4 shadow-xs space-y-3 cursor-pointer active:bg-[#F1F4F4]/50"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isNew && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#336E87] shrink-0"
                      title="New"
                    />
                  )}
                  <h4 className={`text-sm text-[#1F292A] ${isNew ? 'font-semibold' : 'font-medium'}`}>
                    {sub.full_name}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] border ${typeStyle.badge}`}
                >
                  {typeStyle.label}
                </span>
              </div>

              <div className="text-xs text-[#5A6D6C] space-y-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8D9B9A]" />
                  <a
                    href={`mailto:${encodeURIComponent(sub.email)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#336E87] hover:underline truncate"
                  >
                    {sub.email}
                  </a>
                </div>

                {(sub.origin || sub.destination) && (
                  <div className="font-mono text-[11px] text-[#5A6D6C]">
                    Route: {sub.origin || '?'} → {sub.destination || '?'}
                  </div>
                )}

                {sub.persona && <div>Role: {sub.persona}</div>}

                {sub.message && (
                  <p className="line-clamp-2 text-[#5A6D6C] italic pt-1">
                    "{sub.message}"
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#DDE3E2] flex items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-[#8D9B9A]">
                  {formatDate(sub.created_at)}
                </span>

                <select
                  value={sub.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleStatusChange(e, sub.id)}
                  className={`text-xs py-1 px-2.5 rounded-lg border font-medium cursor-pointer ${statusStyle.badge}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* PAGINATION BAR                                                            */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#DDE3E2] rounded-[1.25rem] px-4 py-3 flex items-center justify-between text-xs text-[#5A6D6C] shadow-xs">
        <div>
          Showing <span className="font-medium text-[#1F292A]">{startRow}</span> to{' '}
          <span className="font-medium text-[#1F292A]">{endRow}</span> of{' '}
          <span className="font-medium text-[#1F292A]">{totalCount}</span> submissions
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            className="p-1.5 rounded-lg border border-[#DDE3E2] text-[#1F292A] hover:bg-[#F1F4F4] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2 font-medium text-[#1F292A]">
            Page {page + 1} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="p-1.5 rounded-lg border border-[#DDE3E2] text-[#1F292A] hover:bg-[#F1F4F4] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

