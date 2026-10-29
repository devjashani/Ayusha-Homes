import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { Fingerprint, FileText, Share2, Layers, CheckCircle2 } from 'lucide-react';

export const Solution: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('identity');

  const icons: Record<string, React.ElementType> = {
    identity: Fingerprint,
    information: FileText,
    access: Share2,
  };

  return (
    <div className="w-full mb-12">
      {/* Layered Architectural Container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Top Floating Continuity Layer */}
        <div className="p-6 sm:p-10 mb-6 rounded-[var(--radius-card)] bg-white border border-[var(--line)] shadow-[0_0.75rem_2.5rem_rgba(31,41,42,0.06)] relative z-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-white flex items-center justify-center shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl text-[var(--fg)]">
                  AYUSHA — The Continuity Layer
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)]">
                  A unified patient experience built on top of the systems that already exist, not a replacement.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--accent)] border border-[var(--line)]">
              Active Orchestration
            </span>
          </div>

          {/* 3 Solution Pillars: Numbered Hover-Fill Rows */}
          <div className="mt-6 divide-y divide-[var(--line)]">
            {CONTENT.solution.pillars.map((pillar) => {
              const Icon = icons[pillar.id] || Layers;
              const isSelected = selectedPillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`cursor-pointer transition-all duration-300 rounded-[var(--radius-card-sm)] my-1.5 p-4 sm:p-6 ${
                    isSelected
                      ? 'bg-[var(--surface)] border border-[var(--line)] shadow-xs'
                      : 'hover:bg-[var(--surface)]/60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[var(--muted)] shrink-0">
                        {pillar.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--surface-2)] text-[var(--accent)]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-[var(--fg)]">
                          {pillar.title}
                        </h4>
                        <span className="text-xs font-medium text-[var(--accent)]">
                          {pillar.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed lg:text-right">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bullet details */}
                  <div className="mt-4 pt-3 border-t border-[var(--line)]/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {pillar.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[var(--fg)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bi-directional interoperability pulse indicator */}
        <div className="flex justify-center my-1.5">
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[var(--line)] text-xs font-medium text-[var(--muted)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span>Bi-directional interoperability bridges</span>
          </div>
        </div>

        {/* Base Layer: Disparate Global Health Systems & Hospitals */}
        <div className="p-6 sm:p-7 rounded-[var(--radius-card-sm)] bg-[var(--ink)] text-[var(--on-dark)] shadow-xl relative z-10 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-soft)] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--on-dark)]">
                {CONTENT.solution.baseLayerText}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[0.6875rem] text-[var(--on-dark-muted)]">
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">Epic / Cerner EHR</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">India ABDM (ABHA)</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">NHS Spine / EU HIE</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">Local Clinic Silos</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
