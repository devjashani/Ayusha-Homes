import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { LiquidReveal } from '@/components/ui/LiquidReveal';
import { PillButton } from '@/components/ui/PillButton';
import { SoftImage } from '@/components/ui/SoftImage';
import { imageTuning } from '@/data/imageTuning';
import { scrollToTarget } from '@/hooks/useLenis';
import {
  ShieldAlert,
  Lock,
  ChevronDown,
  Activity,
  User,
  HeartPulse,
  PlaneTakeoff,
  Compass,
  Sparkles,
  Clock,
} from 'lucide-react';

interface HeroProps {
  introReady?: boolean;
  onCheckReadiness: (from: string, to: string, persona: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ introReady = true, onCheckReadiness }) => {
  const [fromCountry, setFromCountry] = useState('IND');
  const [toCountry, setToCountry] = useState('UAE');
  const [persona, setPersona] = useState('traveler');

  // Split H1 into natural lines for line reveal
  const h1Lines = ["Your health record", "shouldn't stop at the border."];

  const handleReadinessClick = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckReadiness(fromCountry, toCountry, persona);
    scrollToTarget('#waitlist');
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  return (
    <section className="hero-stacked min-h-[100lvh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 relative">
      {/* Liquid Canvas Reveal Layer */}
      <LiquidReveal />

      {/* Legibility Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent 40%, rgba(255,255,255,0.35))',
        }}
        aria-hidden="true"
      />

      {/* Giant Decorative AYUSHA Watermark */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={introReady ? { opacity: 0.35, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="watermark-text absolute bottom-28 left-0 right-0 text-center text-white pointer-events-none z-[2] leading-none"
        aria-hidden="true"
      >
        AYUSHA
      </motion.div>

      {/* Main Shell Content */}
      <div className="shell relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Existing Badge styled as Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[var(--line)] shadow-xs mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-[var(--accent)]">
                {CONTENT.brand.heroBadge}
              </span>
              <span className="text-black/20">•</span>
              <span className="text-xs text-[var(--muted)] font-medium">
                Pre-launch Concept
              </span>
            </motion.div>

            {/* H1 Split into lines with Line Reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--fg)] leading-[1.04] max-w-[18ch] mb-6">
              {h1Lines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={introReady ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + idx * 0.12,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="inline-block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Existing Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={introReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[var(--muted)] max-w-xl font-normal leading-relaxed mb-8"
            >
              {CONTENT.brand.heroSubcopy}
            </motion.p>

            {/* Existing Two CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <PillButton
                variant="dark"
                withArrow={true}
                href="#waitlist"
                onClick={(e) => scrollToSection(e, '#waitlist')}
              >
                Join the pilot
              </PillButton>

              <PillButton
                variant="outline"
                href="#how"
                onClick={(e) => scrollToSection(e, '#how')}
              >
                See how it works
              </PillButton>
            </motion.div>
          </div>

          {/* Right Column (Span 5, aligned end on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Subtle decorative glow image behind passport card */}
            <SoftImage
              src="/images/hero-passport.webp"
              width={1400}
              height={933}
              opacity={imageTuning.heroPassport.opacity}
              blend={imageTuning.heroPassport.blend}
              mask={imageTuning.heroPassport.mask}
              parallax={imageTuning.heroPassport.parallax}
              float={imageTuning.heroPassport.float}
              hideBelow={imageTuning.heroPassport.hideBelow}
              className="absolute -top-4 -right-8 w-[min(34rem,100%)] h-auto pointer-events-none z-0"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={introReady ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[24rem] relative z-10"
            >
              {/* Frosted Health Passport Card Mock */}
              <div className="rounded-[var(--radius-card-sm)] p-5 sm:p-6 bg-white/70 backdrop-blur-md ring-1 ring-[var(--line)] shadow-[0_1rem_2.5rem_rgba(31,41,42,0.08)]">
                {/* Header */}
                <div className="flex items-center justify-between gap-2.5 pb-4 border-b border-[var(--line)]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)] shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-sm text-[var(--fg)] whitespace-nowrap">
                          {CONTENT.heroPassportMock.holderName}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[0.5625rem] font-bold bg-[var(--accent)]/15 text-[var(--accent)] whitespace-nowrap">
                          ABHA / PASSPORT LINKED
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] font-medium flex items-center gap-1 mt-0.5 whitespace-nowrap">
                        <Activity className="w-3 h-3 text-[var(--good)] shrink-0" />
                        Blood: <strong className="text-[var(--fg)]">{CONTENT.heroPassportMock.bloodGroup}</strong>
                        <span className="text-black/20">•</span>
                        <span>AYU-8492-X</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--good)]/15 text-[var(--ink)] text-[0.6875rem] font-semibold border border-[var(--good)]/30 shrink-0 whitespace-nowrap">
                    <Lock className="w-3 h-3 text-[var(--accent)] shrink-0" />
                    <span className="whitespace-nowrap">Federated</span>
                  </div>
                </div>

                {/* Inner Rows as Rounded Tiles */}
                <div className="space-y-2.5 my-4 text-xs">
                  {/* Allergies Tile */}
                  <div className="p-3 rounded-xl bg-white/80 border border-[var(--line)] shadow-2xs">
                    <span className="text-[0.6875rem] font-bold tracking-wider text-[var(--ink)] uppercase flex items-center gap-1 mb-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> High-Risk Allergies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {CONTENT.heroPassportMock.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-medium text-[0.6875rem] border border-rose-200/60"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Medications Tile */}
                  <div className="p-3 rounded-xl bg-white/80 border border-[var(--line)] shadow-2xs">
                    <span className="text-[0.6875rem] font-bold tracking-wider text-[var(--accent)] uppercase flex items-center gap-1 mb-1">
                      <HeartPulse className="w-3.5 h-3.5" /> Active Medications
                    </span>
                    <p className="text-[var(--fg)] font-medium leading-snug">
                      {CONTENT.heroPassportMock.medications.join(' • ')}
                    </p>
                  </div>

                  {/* Conditions & Contact Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/80 border border-[var(--line)] shadow-2xs">
                      <span className="text-[0.625rem] font-semibold tracking-wider text-[var(--muted)] uppercase block mb-0.5">
                        Conditions
                      </span>
                      <p className="text-[var(--fg)] font-medium text-[0.6875rem] leading-tight">
                        {CONTENT.heroPassportMock.conditions[0]}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/80 border border-[var(--line)] shadow-2xs">
                      <span className="text-[0.625rem] font-semibold tracking-wider text-[var(--muted)] uppercase block mb-0.5">
                        Next of Kin
                      </span>
                      <p className="text-[var(--fg)] font-medium text-[0.6875rem] leading-tight truncate">
                        {CONTENT.heroPassportMock.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Token Footer */}
                <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-[0.6875rem] text-[var(--muted)]">
                  <div className="flex items-center gap-1.5 font-medium text-[var(--accent)]">
                    <Clock className="w-3 h-3" />
                    <span>{CONTENT.heroPassportMock.shareStatus}</span>
                  </div>
                  <span className="font-mono text-[0.625rem]">Ed25519 Ephemeral</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Existing Booking-Style Route Bar (Full-width below grid as a frosted panel) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={introReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="rounded-[var(--radius-card-sm)] p-4 sm:p-5 bg-white/75 backdrop-blur-md border border-[var(--line)] shadow-[0_0.75rem_2rem_rgba(31,41,42,0.06)]">
            <form
              onSubmit={handleReadinessClick}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
            >
              {/* Departure */}
              <div className="flex flex-col px-3 py-1">
                <label className="text-[0.6875rem] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1.5 mb-1">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Travelling from
                </label>
                <select
                  value={fromCountry}
                  onChange={(e) => setFromCountry(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--fg)] outline-none cursor-pointer"
                  aria-label="Departure Country"
                >
                  {CONTENT.quickActionDefault.fromCountries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-[var(--fg)]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div className="flex flex-col px-3 py-1 border-t sm:border-t-0 sm:border-l border-[var(--line)]">
                <label className="text-[0.6875rem] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5 text-[var(--accent-to)]" />
                  Destination
                </label>
                <select
                  value={toCountry}
                  onChange={(e) => setToCountry(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--fg)] outline-none cursor-pointer"
                  aria-label="Destination Country"
                >
                  {CONTENT.quickActionDefault.toCountries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-[var(--fg)]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Persona */}
              <div className="flex flex-col px-3 py-1 border-t lg:border-t-0 lg:border-l border-[var(--line)]">
                <label className="text-[0.6875rem] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                  I am a
                </label>
                <select
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--fg)] outline-none cursor-pointer"
                  aria-label="User Profile Persona"
                >
                  {CONTENT.quickActionDefault.personaOptions.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white text-[var(--fg)]">
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <div className="pt-2 sm:pt-0">
                <PillButton
                  type="submit"
                  variant="accent"
                  withArrow={true}
                  className="w-full justify-between"
                >
                  Check readiness
                </PillButton>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Existing Scroll Cue */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={(e) => scrollToSection(e, '#why')}
            className="flex flex-col items-center gap-1 text-[0.6875rem] font-mono tracking-widest text-[var(--muted)] uppercase cursor-pointer hover:text-[var(--fg)] transition-colors"
            aria-label="Scroll to Why It Matters"
          >
            <span>EXPLORE</span>
            <ChevronDown className="w-4 h-4 text-[var(--accent)] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
