import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
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
    } catch (err) {
      setSubmitError('Failed to record submission. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-24 md:py-32 px-4 md:px-8 relative">
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wider text-[#1E6FA8] uppercase bg-[#1E6FA8]/10 px-3.5 py-1.5 rounded-full border border-[#1E6FA8]/20">
              {CONTENT.waitlist.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.waitlist.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#5B6B76] font-normal"
          >
            {CONTENT.waitlist.subhead}
          </motion.p>
        </div>

        {/* Main Waitlist Card */}
        <GlassPanel
          variant="card"
          liquidRefraction={true}
          className="p-6 md:p-12 bg-white/70 border-white/90 shadow-[0_24px_64px_rgba(21,32,43,0.08)]"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="py-12 flex flex-col items-center text-center"
              >
                {/* Self-drawing SVG checkmark */}
                <div className="w-20 h-20 mb-6 relative">
                  <svg
                    className="w-full h-full text-emerald-600"
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

                <h3 className="text-2xl font-bold text-[#15202B] mb-2 font-display">
                  Welcome to the AYUSHA Pilot Waitlist
                </h3>
                <p className="text-sm md:text-base text-[#5B6B76] max-w-lg mb-8 leading-relaxed">
                  Your registration has been logged for the inaugural single-city corridor. We will notify you as soon as provider onboarding commences.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-black/5 hover:bg-black/10 text-[#15202B] transition-colors"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Alex Rivera"
                      className={`w-full px-4 py-3 rounded-xl bg-white/80 border text-sm text-[#15202B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all ${
                        errors.name ? 'border-rose-500' : 'border-[#D8E2E7]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/80 border text-sm text-[#15202B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all ${
                        errors.email ? 'border-rose-500' : 'border-[#D8E2E7]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Persona */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                    I Am A *
                  </label>
                  <select
                    {...register('persona')}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D8E2E7] text-sm text-[#15202B] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all"
                  >
                    {CONTENT.quickActionDefault.personaOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* From Country */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                      Primary Departure / Origin *
                    </label>
                    <select
                      {...register('fromCountry')}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D8E2E7] text-sm text-[#15202B] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all"
                    >
                      {CONTENT.quickActionDefault.fromCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* To Country */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                      Primary Frequent Corridor / Destination *
                    </label>
                    <select
                      {...register('toCountry')}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D8E2E7] text-sm text-[#15202B] focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all"
                    >
                      {CONTENT.quickActionDefault.toCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#15202B] mb-2">
                    Optional Context or Health Record Needs
                  </label>
                  <textarea
                    rows={3}
                    {...register('note')}
                    placeholder="Tell us about your medical context needs (e.g. chronic condition management while traveling abroad)..."
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D8E2E7] text-sm text-[#15202B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E6FA8] transition-all resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('consent')}
                      className="mt-1 w-4 h-4 rounded text-[#1E6FA8] focus:ring-[#1E6FA8] cursor-pointer"
                    />
                    <span className="text-xs text-[#5B6B76] leading-relaxed select-none">
                      {CONTENT.waitlist.consentText}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {submitError}
                  </p>
                )}

                {/* Form Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm bg-[#1E6FA8] hover:bg-[#185986] text-white shadow-[0_8px_24px_rgba(30,111,168,0.25)] transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
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
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm text-[#15202B] bg-white/70 hover:bg-white border border-[#D8E2E7] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#1E6FA8]" />
                    <span>Talk to us (Investor & Partner)</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassPanel>
      </div>
    </section>
  );
};
