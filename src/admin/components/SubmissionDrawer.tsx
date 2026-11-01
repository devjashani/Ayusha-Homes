import React, { useState, useEffect, useRef } from 'react';
import type { Submission, SubmissionStatus } from '../types';
import { formatDate, getStatusStyle, getTypeBadgeStyle } from '../utils/formatters';
import { X, Mail, Copy, Check, Trash2, Save, AlertTriangle, Loader2 } from 'lucide-react';

interface SubmissionDrawerProps {
  submission: Submission | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: SubmissionStatus) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onDeleteSubmission: (id: string) => Promise<void>;
}

export const SubmissionDrawer: React.FC<SubmissionDrawerProps> = ({
  submission,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteSubmission,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState(submission?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedFeedback, setNotesSavedFeedback] = useState(false);

  // Confirm delete dialog state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (submission) {
      setNotes(submission.notes || '');
      setNotesSavedFeedback(false);
      setShowDeleteConfirm(false);
    }
  }, [submission]);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!submission) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else {
          onClose();
        }
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submission, showDeleteConfirm, onClose]);

  if (!submission) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(submission.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleSaveNotes = async () => {
    if (isSavingNotes) return;
    setIsSavingNotes(true);
    try {
      await onUpdateNotes(submission.id, notes);
      setNotesSavedFeedback(true);
      setTimeout(() => setNotesSavedFeedback(false), 2500);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDeleteSubmission(submission.id);
      setShowDeleteConfirm(false);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  const subject = encodeURIComponent(
    submission.type === 'pilot'
      ? `Re: AYUSHA pilot – ${submission.full_name}`
      : `Re: AYUSHA inquiry – ${submission.full_name}`
  );
  const mailtoLink = `mailto:${encodeURIComponent(submission.email)}?subject=${subject}`;

  const statusStyle = getStatusStyle(submission.status);
  const typeStyle = getTypeBadgeStyle(submission.type);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F292A]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-xl bg-white shadow-xl flex flex-col border-l border-[#DDE3E2]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#DDE3E2] flex items-center justify-between gap-3 bg-[#F1F4F4]/50">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${typeStyle.badge}`}
              >
                {typeStyle.label}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${statusStyle.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#5A6D6C] hover:text-[#1F292A] hover:bg-[#E5ECEC] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87]"
              aria-label="Close detail drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Person & Submission Header */}
            <div>
              <h2 id="drawer-title" className="text-xl font-bold text-[#1F292A] tracking-tight">
                {submission.full_name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-[#5A6D6C]">
                <span>{submission.email}</span>
                <span>•</span>
                <span className="text-xs">{formatDate(submission.created_at)}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#336E87] hover:bg-[#2D6177] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1F292A] bg-[#F1F4F4] hover:bg-[#E5ECEC] border border-[#DDE3E2] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#5A6D6C]" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>

            {/* Status Selector */}
            <div className="bg-[#F1F4F4]/50 border border-[#DDE3E2] rounded-xl p-3.5">
              <label
                htmlFor="drawer-status-select"
                className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D6C] mb-1.5"
              >
                Workflow Status
              </label>
              <select
                id="drawer-status-select"
                value={submission.status}
                onChange={(e) => onUpdateStatus(submission.id, e.target.value as SubmissionStatus)}
                className="w-full sm:w-auto px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-white border border-[#DDE3E2] rounded-[0.875rem] focus:outline-none focus:ring-2 focus:ring-[#336E87] cursor-pointer"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Submission Metadata Details */}
            <div className="space-y-3 border-t border-[#DDE3E2] pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A6D6C]">
                Submission Details
              </h3>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F1F4F4]/40 p-2.5 rounded-lg">
                  <dt className="text-[#5A6D6C]">Persona / Role</dt>
                  <dd className="font-medium text-[#1F292A] mt-0.5">
                    {submission.persona || '—'}
                  </dd>
                </div>

                <div className="bg-[#F1F4F4]/40 p-2.5 rounded-lg">
                  <dt className="text-[#5A6D6C]">Travel Route</dt>
                  <dd className="font-medium text-[#1F292A] mt-0.5">
                    {submission.origin && submission.destination
                      ? `${submission.origin} → ${submission.destination}`
                      : submission.origin || submission.destination || '—'}
                  </dd>
                </div>

                <div className="bg-[#F1F4F4]/40 p-2.5 rounded-lg">
                  <dt className="text-[#5A6D6C]">Consent Acknowledged</dt>
                  <dd className="font-medium text-[#1F292A] mt-0.5">
                    {submission.consent ? 'Yes (Confirmed)' : 'No'}
                  </dd>
                </div>

                <div className="bg-[#F1F4F4]/40 p-2.5 rounded-lg">
                  <dt className="text-[#5A6D6C]">Submission ID</dt>
                  <dd className="font-mono text-[11px] text-[#5A6D6C] truncate mt-0.5" title={submission.id}>
                    {submission.id}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Full Message Section */}
            <div className="border-t border-[#DDE3E2] pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A6D6C] mb-2">
                Message Content
              </h3>
              <div className="p-3.5 bg-[#F1F4F4]/60 border border-[#DDE3E2] rounded-xl text-xs text-[#1F292A] whitespace-pre-wrap leading-relaxed font-sans min-h-[5rem]">
                {submission.message?.trim() ? submission.message : (
                  <span className="text-[#8D9B9A] italic">No additional message provided.</span>
                )}
              </div>
            </div>

            {/* Notes Section (max 2000 chars) */}
            <div className="border-t border-[#DDE3E2] pt-4">
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="submission-notes"
                  className="text-xs font-semibold uppercase tracking-wider text-[#5A6D6C]"
                >
                  Admin Internal Notes
                </label>
                <span className="text-[11px] font-mono text-[#8D9B9A]">
                  {notes.length}/2000
                </span>
              </div>
              <textarea
                id="submission-notes"
                rows={4}
                maxLength={2000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add private internal follow-up notes, conversation logs, or qualifications here..."
                className="w-full p-3 text-xs bg-white border border-[#DDE3E2] rounded-xl text-[#1F292A] placeholder:text-[#8D9B9A] focus:outline-none focus:ring-2 focus:ring-[#336E87]"
              />
              <div className="flex items-center justify-between mt-2">
                {notesSavedFeedback ? (
                  <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Notes saved
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes || notes === (submission.notes || '')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-[#F1F4F4] hover:bg-[#E5ECEC] border border-[#DDE3E2] rounded-[0.875rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#336E87] disabled:opacity-50"
                >
                  {isSavingNotes ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer - Delete Action */}
          <div className="p-4 sm:p-6 border-t border-[#DDE3E2] bg-[#F1F4F4]/30">
            {showDeleteConfirm ? (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-red-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>Delete this submission permanently? This action cannot be undone.</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-3 py-1.5 text-xs font-medium text-[#1F292A] bg-white border border-[#DDE3E2] rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Confirm Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete submission</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

