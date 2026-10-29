import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT } from '@/data/content';
import { stopScroll, startScroll } from '@/hooks/useLenis';
import { X, ArrowUpRight, ShieldCheck, Building2 } from 'lucide-react';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalkModal: React.FC<TalkModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      stopScroll();
      window.addEventListener('keydown', handleKeyDown);
      // Focus modal container
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      startScroll();
    }

    return () => {
      if (isOpen) {
        startScroll();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(17,17,17,0.3)] backdrop-blur-[16px]"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="w-full max-w-[32rem] rounded-[var(--radius-card)] bg-white p-6 md:p-8 shadow-2xl relative outline-none border border-[var(--line)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-modal-title"
          >
            {/* Close Button top-right as a 2.25rem circle */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--fg)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[var(--line)] pr-10">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 id="talk-modal-title" className="font-semibold text-lg text-[var(--ink)]">
                  {CONTENT.waitlist.modalContactTitle}
                </h3>
                <span className="text-xs text-[var(--muted)] font-mono">Confidential Corridor Discussion</span>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {CONTENT.waitlist.modalContactDescription}
              </p>

              <div className="p-4 rounded-[var(--radius-card-sm)] bg-[var(--surface)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] block font-mono">
                    Direct Founder Contact
                  </span>
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    {CONTENT.waitlist.modalContactEmail}
                  </span>
                </div>
                <a
                  href={`mailto:${CONTENT.waitlist.modalContactEmail}?subject=AYUSHA%20Investor%20%2F%20Partner%20Inquiry`}
                  className="px-4 py-2 rounded-full font-semibold text-xs bg-[var(--ink)] text-white hover:bg-[var(--ink-2)] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-xs text-[var(--muted)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--good)] shrink-0" />
                <span>NDAs and institutional deployment whitepapers available upon accredited request.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-semibold text-[var(--muted)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
