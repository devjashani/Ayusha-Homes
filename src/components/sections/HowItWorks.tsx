import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
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
    }, 3800);

    return () => clearInterval(timer);
  }, [isInView, isPlaying]);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 md:py-32 px-4 md:px-8 relative">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wider text-[#1E6FA8] uppercase bg-[#1E6FA8]/10 px-3.5 py-1.5 rounded-full border border-[#1E6FA8]/20">
              {CONTENT.howItWorks.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.howItWorks.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#5B6B76] font-normal"
          >
            {CONTENT.howItWorks.subhead}
          </motion.p>
        </div>

        {/* Horizontal Stepper Bar */}
        <div className="mb-12">
          {/* Controls toggle */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6B76]">
              6-Step Emergency Response Lifecycle
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/60 border border-white/80 hover:bg-white text-[#15202B] shadow-xs cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#1E6FA8]" />
                  <span>Pause Walkthrough</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#1E6FA8]" />
                  <span>Auto-Play Sequence</span>
                </>
              )}
            </button>
          </div>

          {/* Stepper nodes and connecting glowing line */}
          <div className="relative">
            {/* Background connecting track */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#D8E2E7] rounded-full z-0 hidden md:block" />

            {/* Glowing progress line */}
            <motion.div
              className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-gradient-to-r from-[#1E6FA8] to-[#4FA8E0] rounded-full z-0 hidden md:block shadow-[0_0_12px_rgba(79,168,224,0.8)]"
              animate={{
                width: `${((activeStep - 1) / 5) * 96}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
              {CONTENT.howItWorks.steps.map((stepItem, index) => {
                const Icon = stepIcons[index];
                const isActive = activeStep === stepItem.step;
                const isAyusha = stepItem.domain === 'AYUSHA';

                return (
                  <button
                    key={stepItem.step}
                    type="button"
                    onClick={() => {
                      setActiveStep(stepItem.step);
                      setIsPlaying(false);
                    }}
                    className={`flex flex-col items-center p-3.5 rounded-2xl transition-all duration-300 text-center cursor-pointer border ${
                      isActive
                        ? isAyusha
                          ? 'bg-white border-[#1E6FA8] shadow-[0_8px_24px_rgba(30,111,168,0.22)] scale-105'
                          : 'bg-white border-rose-500 shadow-[0_8px_24px_rgba(244,63,94,0.2)] scale-105'
                        : 'bg-white/50 border-white/70 hover:bg-white/80'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                        isActive
                          ? isAyusha
                            ? 'bg-[#1E6FA8] text-white shadow-md'
                            : 'bg-rose-500 text-white shadow-md'
                          : isAyusha
                          ? 'bg-[#1E6FA8]/10 text-[#1E6FA8]'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="font-semibold text-xs text-[#15202B]">
                      {stepItem.title}
                    </span>

                    <span
                      className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded ${
                        isAyusha
                          ? 'bg-[#1E6FA8]/10 text-[#1E6FA8]'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {isAyusha ? 'AYUSHA' : 'CLINICAL'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Step Details Glass Panel */}
        <div className="mb-12">
          {(() => {
            const current = CONTENT.howItWorks.steps.find((s) => s.step === activeStep) || CONTENT.howItWorks.steps[0];
            const isAyusha = current.domain === 'AYUSHA';
            const Icon = stepIcons[current.step - 1];

            return (
              <GlassPanel
                variant="card"
                className={`p-6 md:p-10 transition-colors duration-300 ${
                  isAyusha
                    ? 'border-[#1E6FA8]/30 bg-white/70 shadow-[0_16px_40px_rgba(30,111,168,0.1)]'
                    : 'border-rose-400/40 bg-white/80 shadow-[0_16px_40px_rgba(244,63,94,0.12)]'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        isAyusha
                          ? 'bg-[#1E6FA8] text-white shadow-lg'
                          : 'bg-rose-500 text-white shadow-lg'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isAyusha
                              ? 'bg-[#1E6FA8]/15 text-[#1E6FA8]'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {current.badge}
                        </span>
                        <span className="text-xs text-[#5B6B76]">Phase {current.step} of 6</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#15202B]">
                        {current.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#5B6B76] mt-2 max-w-2xl leading-relaxed">
                        {current.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-4 rounded-xl bg-black/5 text-xs max-w-xs">
                    {isAyusha ? (
                      <div className="flex items-start gap-2 text-[#1E6FA8]">
                        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Automated digital continuity protocol under patient & institutional consent.</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-rose-700">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Physicians and triage officers maintain 100% diagnostic autonomy.</span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassPanel>
            );
          })()}
        </div>

        {/* Visibly prominent Liability Boundary Box */}
        <GlassPanel
          variant="card"
          className="p-5 md:p-6 bg-gradient-to-r from-[#15202B] to-[#1E2E3D] text-white border-white/10 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
                Clinical Safety Boundary
              </span>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-normal">
                {CONTENT.brand.legalBoundary}
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};
