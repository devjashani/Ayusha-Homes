import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CONTENT } from '@/data/content';
import {
  BellRing,
  Fingerprint,
  FileSearch,
  MapPin,
  Send,
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  Play,
  Pause,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-80px' });

  const stepIcons = [BellRing, Fingerprint, FileSearch, MapPin, Send, Stethoscope];

  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 3600);

    return () => clearInterval(timer);
  }, [isInView, isPlaying]);

  return (
    <div ref={sectionRef} className="w-full">
      {/* Stepper Header Bar with Play/Pause toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--on-dark-muted)] font-mono">
          Interactive Emergency Protocol
        </span>
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[var(--accent-soft)]" />
              <span>Pause Walkthrough</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[var(--accent-soft)]" />
              <span>Auto-Play Sequence</span>
            </>
          )}
        </button>
      </div>

      {/* Stepper Tiles on a 1px accent line that draws on view */}
      <div className="relative mb-10">
        {/* Background 1px connecting line (Desktop) */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[1px] bg-white/15 z-0 hidden lg:block" />

        {/* 1px Accent line drawing on view */}
        <motion.div
          className="absolute top-1/2 left-6 -translate-y-1/2 h-[1px] bg-[var(--accent-soft)] z-0 hidden lg:block shadow-[0_0_8px_var(--accent-soft)] origin-left"
          animate={{
            width: `${((activeStep - 1) / 5) * 94}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Steps Grid: Vertical on mobile, horizontal on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {CONTENT.howItWorks.steps.map((stepItem, index) => {
            const Icon = stepIcons[index];
            const isActive = activeStep === stepItem.step;
            const isStep6 = stepItem.step === 6;

            return (
              <button
                key={stepItem.step}
                type="button"
                onClick={() => {
                  setActiveStep(stepItem.step);
                  setIsPlaying(false);
                }}
                className={`flex flex-col items-center p-3.5 rounded-[var(--radius-card-sm)] transition-all duration-300 text-center cursor-pointer border ${
                  isStep6
                    ? 'border-rose-400/30 bg-rose-500/10'
                    : 'border-white/10 bg-white/5'
                } ${
                  isActive
                    ? '!bg-[var(--accent-soft)] !text-[var(--ink)] !border-white shadow-[0_0_1.5rem_rgba(99,164,206,0.35)] scale-[1.03]'
                    : 'hover:bg-white/10 text-[var(--on-dark-muted)]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--accent-soft)]'
                      : isStep6
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`font-semibold text-xs sm:text-sm ${
                    isActive ? 'text-[var(--ink)] font-bold' : 'text-[var(--on-dark)]'
                  }`}
                >
                  {stepItem.title}
                </span>

                <span
                  className={`text-[0.625rem] font-bold mt-1 px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-[var(--ink)]/15 text-[var(--ink)]'
                      : isStep6
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-white/10 text-[var(--on-dark-muted)]'
                  }`}
                >
                  {isStep6 ? 'CLINICAL BOUNDARY' : `STEP 0${stepItem.step}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Panel */}
      <div className="mb-8">
        {(() => {
          const current = CONTENT.howItWorks.steps.find((s) => s.step === activeStep) || CONTENT.howItWorks.steps[0];
          const isClinical = current.domain === 'CLINICAL';
          const Icon = stepIcons[current.step - 1];

          return (
            <div
              className={`p-6 sm:p-8 rounded-[var(--radius-card)] border transition-colors duration-300 ${
                isClinical
                  ? 'bg-rose-950/30 border-rose-500/30 shadow-lg'
                  : 'bg-white/5 border-white/10 shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isClinical
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-[var(--accent-soft)] text-[var(--ink)] shadow-md'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[0.6875rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isClinical
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-white/10 text-[var(--accent-soft)]'
                        }`}
                      >
                        {current.badge}
                      </span>
                      <span className="text-xs text-[var(--on-dark-muted)]">Phase {current.step} of 6</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--on-dark)]">
                      {current.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--on-dark-muted)] mt-2 max-w-2xl leading-relaxed">
                      {current.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 p-4 rounded-xl bg-white/5 border border-white/10 text-xs max-w-xs">
                  {isClinical ? (
                    <div className="flex items-start gap-2 text-rose-300">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Physicians and triage officers maintain 100% diagnostic autonomy.</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-[var(--accent-soft)]">
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Automated digital continuity protocol under patient & institutional consent.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Prominent Liability Boundary Notice */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card-sm)] bg-black/40 border border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
              Liability Boundary
            </span>
            <p className="text-xs sm:text-sm text-[var(--on-dark-muted)] leading-relaxed font-normal">
              {CONTENT.brand.legalBoundary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
