import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
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
    <section id="solution" className="py-24 md:py-32 px-4 md:px-8 relative">
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
              {CONTENT.solution.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.solution.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#5B6B76] font-normal"
          >
            {CONTENT.solution.subhead}
          </motion.p>
        </div>

        {/* Layered Architectural Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 relative"
        >
          {/* Top Layer: AYUSHA Continuity Layer (Floating Glass) */}
          <GlassPanel
            variant="card"
            liquidRefraction={true}
            className="p-8 md:p-10 mb-6 bg-white/70 border-white/90 shadow-[0_20px_50px_rgba(30,111,168,0.12)] relative z-20"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D8E2E7]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E6FA8] to-[#4FA8E0] text-white flex items-center justify-center shadow-md">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl text-[#15202B]">
                    AYUSHA — The Continuity Layer
                  </h3>
                  <p className="text-xs md:text-sm text-[#5B6B76]">
                    A unified patient experience built on top of the systems that already exist, not a replacement.
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1E6FA8]/10 text-[#1E6FA8] border border-[#1E6FA8]/20">
                Active Orchestration
              </span>
            </div>

            {/* 3 Interactive Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {CONTENT.solution.pillars.map((pillar) => {
                const Icon = icons[pillar.id] || Layers;
                const isSelected = selectedPillar === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`cursor-pointer p-5 md:p-6 rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? 'bg-white/90 border-[#1E6FA8] shadow-[0_10px_30px_rgba(30,111,168,0.15)] ring-2 ring-[#1E6FA8]/20'
                        : 'bg-white/40 border-white/60 hover:bg-white/60 hover:border-[#1E6FA8]/30 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#1E6FA8] text-white'
                            : 'bg-[#1E6FA8]/10 text-[#1E6FA8]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#5B6B76]/60">
                        Pillar {pillar.number}
                      </span>
                    </div>

                    <h4 className="font-semibold text-lg text-[#15202B] mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-medium text-[#1E6FA8] mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-[#5B6B76] leading-relaxed mb-4">
                      {pillar.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-black/5">
                      {pillar.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-[#15202B]/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6FA8] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>

          {/* Connector pulses */}
          <div className="flex justify-center my-1">
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/70 border border-white/80 text-[11px] font-medium text-[#5B6B76] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#4FA8E0] animate-ping" />
              <span>Bi-directional interoperability bridges</span>
            </div>
          </div>

          {/* Base Layer: Disparate Global Health Systems & Hospitals */}
          <div className="p-6 md:p-7 rounded-[24px] bg-[#15202B]/90 text-white shadow-xl relative z-10 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="text-xs md:text-sm font-semibold tracking-wide text-gray-200">
                  {CONTENT.solution.baseLayerText}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-300">
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">Epic / Cerner EHR</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">India ABDM (ABHA)</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">NHS Spine / EU HIE</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono">Local Clinic Silos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
