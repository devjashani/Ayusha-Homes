import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { imageTuning } from '@/data/imageTuning';
import { submitWaitlist } from '@/lib/submitWaitlist';
import { Send, Mail, AlertCircle, Loader2 } from 'lucide-react';

const waitlistSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name (at least 2 characters)' }),
  email: z.string().email({ message: 'Please provide a valid email address' }),
  persona: z.string().min(1, { message: 'Please select your role category' }),
  fromCountry: z.string().min(1, { message: 'Please select departure location' }),
  toCountry: z.string().min(1, { message: 'Please select destination location' }),
  note: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the pilot communication & liability terms' }),
  }),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistProps {
  initialFromCountry?: string;
  initialToCountry?: string;
  initialPersona?: string;
  onOpenTalkModal: () => void;
}

export const Waitlist: React.FC<WaitlistProps> = ({
  initialFromCountry = 'IND',
  initialToCountry = 'UAE',
  initialPersona = 'traveler',
  onOpenTalkModal,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      email: '',
      persona: initialPersona,
      fromCountry: initialFromCountry,
      toCountry: initialToCountry,
      note: '',
      consent: true,
    },
  });

  useEffect(() => {
    if (initialFromCountry) setValue('fromCountry', initialFromCountry);
    if (initialToCountry) setValue('toCountry', initialToCountry);
    if (initialPersona) setValue('persona', initialPersona);
  }, [initialFromCountry, initialToCountry, initialPersona, setValue]);

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitWaitlist(data);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Failed to record submission. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      data-theme="waitlist"
      className="relative z-70 rounded-t-[2rem] -mt-8 pt-20 pb-20 md:pb-24 overflow-hidden text-white"
    >
      {/* Background Aurora Image (Cover) with slow background drift (+-2% over 30s) */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: ['-2%', '2%', '-2%'] }}
        transition={prefersReducedMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 w-[108%] -left-[4%] h-full pointer-events-none z-0"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <img
          src="/images/waitlist-bg.webp"
          alt=""
          width={2000}
          height={1124}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: imageTuning.waitlistBg.opacity, filter: 'saturate(0.9) contrast(0.96)' }}
        />
      </motion.div>

      {/* Accent Gradient Overlay (so aurora shows as soft texture with contrast >= 4.5:1) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(45,97,119,.78), rgba(51,110,135,.62), rgba(62,135,147,.6))',
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="w-full max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-3.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-white/90 uppercase font-mono">
                {CONTENT.waitlist.tag}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-[1.08]"
            >
              {CONTENT.waitlist.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/90 font-normal leading-relaxed"
            >
              {CONTENT.waitlist.subhead}
            </motion.p>
          </div>

          {/* Frosted Rounded Panel */}
          <div className="rounded-[var(--radius-card)] p-6 sm:p-10 md:p-12 bg-white/[0.14] backdrop-blur-[16px] border border-white/20 shadow-2xl text-white">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  {/* Self-drawing SVG checkmark */}
                  <div className="w-20 h-20 mb-6 relative">
                    <svg
                      className="w-full h-full text-white"
                      viewBox="0 0 52 52"
                      fill="none"
                    >
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
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
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Welcome to the AYUSHA Pilot Waitlist
                  </h3>
                  <p className="text-sm md:text-base text-white/85 max-w-lg mb-8 leading-relaxed">
                    Your registration has been logged for the inaugural single-city corridor. We will notify you as soon as provider onboarding commences.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors cursor-pointer"
                  >
                    Submit another registration
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        placeholder="e.g. Alex Rivera"
                        className={`w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                          errors.name ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-white mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="alex@example.com"
                        className={`w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                          errors.email ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-white mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Persona */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                      I Am A *
                    </label>
                    <select
                      {...register('persona')}
                      className="w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border border-white/30 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    >
                      {CONTENT.quickActionDefault.personaOptions.map((p) => (
                        <option key={p.id} value={p.id} className="text-[var(--ink)] bg-white">
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* From Country */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                        Primary Departure / Origin *
                      </label>
                      <select
                        {...register('fromCountry')}
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border border-white/30 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      >
                        {CONTENT.quickActionDefault.fromCountries.map((c) => (
                          <option key={c.code} value={c.code} className="text-[var(--ink)] bg-white">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* To Country */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                        Primary Frequent Corridor / Destination *
                      </label>
                      <select
                        {...register('toCountry')}
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border border-white/30 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      >
                        {CONTENT.quickActionDefault.toCountries.map((c) => (
                          <option key={c.code} value={c.code} className="text-[var(--ink)] bg-white">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Note */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2 font-mono">
                      Optional Context or Health Record Needs
                    </label>
                    <textarea
                      rows={3}
                      {...register('note')}
                      placeholder="Tell us about your medical context needs (e.g. chronic condition management while traveling abroad)..."
                      className="w-full px-4 py-3 rounded-[var(--radius-control)] bg-white/90 border border-white/30 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('consent')}
                        className="mt-1 w-4 h-4 rounded text-[var(--accent)] focus:ring-white cursor-pointer accent-[var(--accent)]"
                      />
                      <span className="text-xs text-white/90 leading-relaxed select-none">
                        {CONTENT.waitlist.consentText}
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-white mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-xs text-white flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />
                      {submitError}
                    </p>
                  )}

                  {/* Form Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm bg-white text-[var(--accent)] hover:bg-white/95 shadow-lg transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Securing Slot...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Pilot Registration</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onOpenTalkModal}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>Talk to us (Investor & Partner)</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
