import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT } from '@/data/content';
import { stopScroll, startScroll } from '@/hooks/useLenis';
import { submitTalk } from '@/lib/submitWaitlist';
import { X, ArrowUpRight, ShieldCheck, Building2, Send, AlertCircle, Loader2 } from 'lucide-react';

const talkSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Please enter your full name (at least 2 characters)' })
    .max(100, { message: 'Full name must be 100 characters or less' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address' })
    .max(254, { message: 'Email must be 254 characters or less' }),
  message: z.string().max(1000, { message: 'Message must be 1000 characters or less' }).optional(),
  consent: z.literal(true).optional(),
  botField: z.string().optional(),
});

type TalkFormData = z.infer<typeof talkSchema>;

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export const TalkModal: React.FC<TalkModalProps> = ({ isOpen, onClose, initialData }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mountedAtRef = useRef<number>(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TalkFormData>({
    resolver: zodResolver(talkSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      consent: true,
      botField: '',
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      mountedAtRef.current = Date.now();
      setIsSubmitted(false);
      setSubmitError(null);
      reset({
        name: initialData?.name || '',
        email: initialData?.email || '',
        message: initialData?.message || '',
        consent: true,
        botField: '',
      });
      stopScroll();
      window.addEventListener('keydown', handleKeyDown);
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
  }, [isOpen, onClose, reset]);

  const onSubmit = async (data: TalkFormData) => {
    // Spam protection: silently show success if honeypot is filled
    if (data.botField) {
      setIsSubmitted(true);
      return;
    }

    // Spam protection: ignore submissions made less than 2 seconds after modal opened
    if (Date.now() - mountedAtRef.current < 2000) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitTalk({
        name: data.name,
        email: data.email,
        message: data.message,
        consent: true,
      });
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[rgba(17,17,17,0.4)] backdrop-blur-[16px]"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="w-full max-w-[34rem] max-h-[90vh] overflow-y-auto rounded-[var(--radius-card)] bg-white p-6 md:p-8 shadow-2xl relative outline-none border border-[var(--line)]"
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

            <div className="py-5 space-y-4">
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {CONTENT.waitlist.modalContactDescription}
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-6 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 mb-4 relative text-[var(--accent)]">
                      <svg className="w-full h-full" viewBox="0 0 52 52" fill="none">
                        <motion.circle
                          cx="26"
                          cy="26"
                          r="24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                        <motion.path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 27l8 8 16-16"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>

                    <h4 className="text-xl font-semibold text-[var(--ink)] mb-1">
                      Inquiry Received
                    </h4>
                    <p className="text-sm text-[var(--muted)] max-w-sm mb-6 leading-relaxed">
                      Thank you for contacting us. Our clinical corridor and partnership team will get back to you shortly.
                    </p>

                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[var(--ink)] text-white hover:bg-[var(--ink-2)] transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Invisible honeypot field for spam protection */}
                    <div
                      aria-hidden="true"
                      tabIndex={-1}
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        top: '-9999px',
                        opacity: 0,
                        pointerEvents: 'none',
                        width: 0,
                        height: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <label htmlFor="talk-bot-field">Do not fill this field</label>
                      <input
                        id="talk-bot-field"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        {...register('botField')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)] mb-1.5 font-mono">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register('name')}
                          placeholder="e.g. Alex Rivera"
                          className={`w-full px-3.5 py-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] border text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
                            errors.name ? 'border-red-400' : 'border-[var(--line)]'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)] mb-1.5 font-mono">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          placeholder="alex@institution.org"
                          className={`w-full px-3.5 py-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] border text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
                            errors.email ? 'border-red-400' : 'border-[var(--line)]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)] mb-1.5 font-mono">
                        Inquiry / Context (optional)
                      </label>
                      <textarea
                        rows={3}
                        {...register('message')}
                        placeholder="Tell us about your organization or inquiry..."
                        className={`w-full px-3.5 py-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] border text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none ${
                          errors.message ? 'border-red-400' : 'border-[var(--line)]'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button & Inline Error */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs bg-[var(--ink)] text-white hover:bg-[var(--ink-2)] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Inquiry</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {submitError && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          {submitError}
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Direct Founder Contact box */}
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
