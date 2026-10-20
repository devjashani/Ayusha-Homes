import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { Milestone, Gauge } from 'lucide-react';

export const Roadmap: React.FC = () => {
  return (
    <div className="relative pb-8 md:pb-12">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wider text-[var(--accent-text)] uppercase bg-[var(--accent)]/12 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/35">
              {CONTENT.roadmap.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.roadmap.headline}
          </motion.h2>
        </div>

        {/* 4 Roadmap Phases Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {CONTENT.roadmap.phases.map((phase, idx) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassPanel
                variant="card"
                className={`h-full flex flex-col justify-between p-6 md:p-7 transition-all duration-300 ${
                  phase.isCurrent
                    ? 'border-[var(--accent)] bg-white/75 shadow-lg ring-2 ring-[var(--accent)]/20'
                    : 'border-white/70 bg-white/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        phase.isCurrent
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-black/5 text-[var(--muted)]'
                      }`}
                    >
                      {phase.timeframe}
                    </span>
                    {phase.isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--accent-text)] uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                        Inaugural Target
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-xl text-[var(--ink)] mb-3">
                    {phase.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Milestone 0{idx + 1}</span>
                  <Milestone className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* How We'll Know It's Working (4 Success Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[var(--ink)]">
              How we'll know it's working:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.roadmap.metrics.map((metric, idx) => (
              <GlassPanel
                key={idx}
                variant="card"
                className="p-5 bg-white/45 border-white/70"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/12 text-[var(--accent-text)] flex items-center justify-center font-bold text-xs">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">{metric.title}</h4>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {metric.target}
                </p>
              </GlassPanel>
            ))}
          </div>
        </motion.div>

        {/* Closing Axiom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-8 bg-[var(--ink)] text-[var(--on-dark)] text-center border-white/10 shadow-xl"
          >
            <p className="font-display text-base md:text-xl text-[var(--on-dark)] italic font-medium max-w-3xl mx-auto">
              "{CONTENT.roadmap.closingStatement}"
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
};
