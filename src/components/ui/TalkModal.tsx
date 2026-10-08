import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { X, ArrowUpRight, ShieldCheck, Building2 } from 'lucide-react';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalkModal: React.FC<TalkModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15202B]/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-modal-title"
          >
            <GlassPanel
              variant="modal"
              className="p-6 md:p-8 border-white/90 bg-white/95 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#D8E2E7]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="talk-modal-title" className="font-bold text-lg text-[#15202B]">
                      {CONTENT.waitlist.modalContactTitle}
                    </h3>
                    <span className="text-xs text-[#5B6B76]">Confidential Corridor Discussion</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#5B6B76] hover:bg-black/5 hover:text-[#15202B] transition-colors cursor-pointer"
                  aria-label="Close Dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-sm text-[#5B6B76] leading-relaxed">
                  {CONTENT.waitlist.modalContactDescription}
                </p>

                <div className="p-4 rounded-2xl bg-[#E7F3FB]/60 border border-[#1E6FA8]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E6FA8] block">
                      Direct Founder Contact
                    </span>
                    <span className="text-sm font-semibold text-[#15202B]">
                      {CONTENT.waitlist.modalContactEmail}
                    </span>
                  </div>
                  <a
                    href={`mailto:${CONTENT.waitlist.modalContactEmail}?subject=AYUSHA%20Investor%20%2F%20Partner%20Inquiry`}
                    className="px-4 py-2 rounded-full font-semibold text-xs bg-[#1E6FA8] text-white hover:bg-[#185986] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Mail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-xs text-[#5B6B76] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NDAs and institutional deployment whitepapers available upon accredited request.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8E2E7] flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-[#5B6B76] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
