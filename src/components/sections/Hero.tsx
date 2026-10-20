import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  ShieldAlert,
  Lock,
  ChevronDown,
  ArrowRight,
  Activity,
  User,
  HeartPulse,
  Sparkles,
  PlaneTakeoff,
  Clock,
  Compass,
} from 'lucide-react';

interface HeroProps {
  onCheckReadiness: (from: string, to: string, persona: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckReadiness }) => {
  const [fromCountry, setFromCountry] = React.useState('IND');
  const [toCountry, setToCountry] = React.useState('UAE');
  const [persona, setPersona] = React.useState('traveler');

  const headlineWords = CONTENT.brand.heroHeadline.split(' ');

  const handleReadinessClick = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckReadiness(fromCountry, toCountry, persona);
    const target = document.querySelector('#waitlist');
    if (target) {
      const top = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#how');
    if (target) {
      const top = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" data-theme="hero" className="relative min-h-[100svh] pt-32 md:pt-40 pb-10 md:pb-14 flex flex-col justify-center items-center overflow-hidden">
      <div className="page-container relative z-10 flex flex-col items-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <GlassPanel
            variant="chip"
            className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/60 border-[var(--accent)]/35 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wide text-[var(--accent-text)]">
              {CONTENT.brand.heroBadge}
            </span>
            <span className="text-black/20">•</span>
            <span className="text-xs text-[var(--muted)] font-medium hidden sm:inline">
              Pre-launch Concept
            </span>
          </GlassPanel>
        </motion.div>

        {/* Main Headline with word-by-word reveal */}
        <div className="text-center max-w-4xl mx-auto mb-6 overflow-hidden">
          <h1 className="hero-headline flex flex-wrap justify-center gap-x-3 gap-y-1">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 35, rotateZ: 1.5 }}
                animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-base md:text-lg lg:text-xl text-[var(--muted)] max-w-2xl mx-auto font-normal leading-relaxed mb-9"
        >
          {CONTENT.brand.heroSubcopy}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-14"
        >
          <MagneticButton href="#waitlist">
            <span className="px-8 py-3.5 rounded-full font-semibold text-sm md:text-base bg-[var(--brand)] text-white shadow-lg hover:bg-[var(--brand-hover)] transition-all flex items-center gap-2 group">
              <span>Join the pilot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>

          <a
            href="#how"
            onClick={scrollToHowItWorks}
            className="px-7 py-3.5 rounded-full font-medium text-sm md:text-base text-[var(--ink)] bg-white/60 hover:bg-white/85 border border-white/70 shadow-sm transition-all backdrop-blur-md"
          >
            See how it works
          </a>
        </motion.div>

        {/* Interactive Glass "Health Passport" Card Mock with Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto mb-12"
        >
          <GlassPanel
            variant="card"
            tiltOnHover={true}
            className="p-6 md:p-8 border-white/80 bg-white/45 shadow-xl relative cursor-default"
          >
            {/* Header of Passport */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[var(--accent)]/12 text-[var(--accent-text)] flex items-center justify-center border border-[var(--accent)]/35">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base md:text-lg text-[var(--ink)]">
                      {CONTENT.heroPassportMock.holderName}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[var(--accent)]/15 text-[var(--accent-text)]">
                      ABHA / PASSPORT LINKED
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] font-medium flex items-center gap-1.5 mt-0.5">
                    <Activity className="w-3.5 h-3.5 text-[var(--status-success)]" />
                    Blood Group: <strong className="text-[var(--ink)]">{CONTENT.heroPassportMock.bloodGroup}</strong>
                    <span className="text-black/20">•</span>
                    Verified Health ID: <span className="font-mono text-[11px]">AYU-8492-X</span>
                  </p>
                </div>
              </div>

              {/* Security Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--status-success)]/15 text-[var(--ink)] text-xs font-semibold border border-[var(--status-success)]/30">
                <Lock className="w-3 h-3 text-[var(--status-success)]" />
                <span>Zero-Warehouse Federated</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 text-xs md:text-sm">
              <div className="p-3.5 rounded-2xl bg-white/50 border border-white/70 shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider text-[var(--status-risk)] uppercase flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> High-Risk Allergies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CONTENT.heroPassportMock.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-2.5 py-1 rounded-md bg-[var(--status-risk)]/10 text-[var(--ink)] font-medium text-xs border border-[var(--status-risk)]/25"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/50 border border-white/70 shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider text-[var(--accent-text)] uppercase flex items-center gap-1.5 mb-1.5">
                  <HeartPulse className="w-3.5 h-3.5" /> Active Medications
                </span>
                <div className="flex flex-col gap-1">
                  {CONTENT.heroPassportMock.medications.map((med) => (
                    <span key={med} className="text-[var(--ink)] font-medium text-xs">
                      • {med}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/50 border border-white/70 shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase mb-1 block">
                  Chronic / Monitored Conditions
                </span>
                <p className="text-[var(--ink)] font-medium text-xs">
                  {CONTENT.heroPassportMock.conditions.join(', ')}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/50 border border-white/70 shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase mb-1 block">
                  Emergency Next of Kin
                </span>
                <p className="text-[var(--ink)] font-medium text-xs">
                  {CONTENT.heroPassportMock.emergencyContact}
                </p>
              </div>
            </div>

            {/* Time-limited Token Footer */}
            <div className="pt-3.5 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-1.5 font-medium text-[var(--accent-text)]">
                <Clock className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" style={{ animationDuration: '6s' }} />
                <span>{CONTENT.heroPassportMock.shareStatus}</span>
              </div>
              <span className="text-[11px] text-[var(--muted)]/80 font-mono">
                Decryption Key: Ephemeral Ed25519
              </span>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Glass Quick-Action Bar (In the style of reference booking bar) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto"
        >
          <GlassPanel
            variant="card"
            liquidRefraction={true}
            className="p-4 md:p-5 rounded-[28px] md:rounded-full bg-white/60 border-white/80 shadow-lg"
          >
            <form onSubmit={handleReadinessClick} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
              {/* Travelling from */}
              <div className="flex flex-col px-3 py-1.5">
                <label className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1 mb-1">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Travelling from
                </label>
                <select
                  value={fromCountry}
                  onChange={(e) => setFromCountry(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--ink)] outline-none cursor-pointer"
                  aria-label="Departure Country"
                >
                  {CONTENT.quickActionDefault.fromCountries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-[var(--ink)]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travelling to */}
              <div className="flex flex-col px-3 py-1.5 border-t sm:border-t-0 sm:border-l border-[var(--line)]">
                <label className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1 mb-1">
                  <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Destination
                </label>
                <select
                  value={toCountry}
                  onChange={(e) => setToCountry(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--ink)] outline-none cursor-pointer"
                  aria-label="Destination Country"
                >
                  {CONTENT.quickActionDefault.toCountries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-[var(--ink)]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Persona */}
              <div className="flex flex-col px-3 py-1.5 border-t md:border-t-0 md:border-l border-[var(--line)]">
                <label className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                  I am a
                </label>
                <select
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[var(--ink)] outline-none cursor-pointer"
                  aria-label="User Profile Persona"
                >
                  {CONTENT.quickActionDefault.personaOptions.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white text-[var(--ink)]">
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <div className="pt-2 sm:pt-0">
                <button
                  type="submit"
                  className="w-full h-12 rounded-full font-semibold text-xs md:text-sm bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Check readiness</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </GlassPanel>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="mt-14 flex flex-col items-center gap-1.5 text-xs text-[var(--muted)]/70 cursor-pointer select-none"
          onClick={scrollToHowItWorks}
        >
          <span className="font-medium tracking-wide uppercase text-[10px]">Explore Architecture</span>
          <ChevronDown className="w-4 h-4 text-[var(--accent)]" />
        </motion.div>
      </div>
    </section>
  );
};
