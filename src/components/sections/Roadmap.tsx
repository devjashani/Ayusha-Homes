import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { Milestone, Gauge } from 'lucide-react';

export const Roadmap: React.FC = () => {
  return (
    <div className="relative pb-8 md:pb-12">
      <div className="w-full">
        {/* Section Sub-header */}
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase font-mono">
              {CONTENT.roadmap.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] max-w-2xl leading-[1.15]"
          >
            {CONTENT.roadmap.headline}
          </motion.h3>
        </div>

        {/* 4 Roadmap Phases Timeline */}
        <div className="relative mb-16">
          {/* Scroll-drawing vertical 1px accent line (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-[var(--line)] -translate-x-1/2" aria-hidden="true">
            <motion.div
              className="w-full bg-[var(--accent)] origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {CONTENT.roadmap.phases.map((phase, idx) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`rounded-[var(--radius-card)] p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
                  phase.isCurrent
                    ? 'border-2 border-[var(--accent)] bg-white shadow-md'
                    : 'border border-[var(--line)] bg-white/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md font-mono ${
                        phase.isCurrent
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--surface)] text-[var(--muted)]'
                      }`}
                    >
                      {phase.timeframe}
                    </span>
                    {phase.isCurrent && (
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                        Inaugural Target
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-xl text-[var(--ink)] mb-3 leading-snug">
                    {phase.title}
                  </h4>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span className="font-mono">Milestone 0{idx + 1}</span>
                  <Milestone className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How We'll Know It's Working (4 Success Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="mb-6">
            <h4 className="text-lg md:text-xl font-semibold text-[var(--ink)]">
              How we'll know it's working:
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.roadmap.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-[var(--radius-card-sm)] p-5 bg-white border border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h5 className="font-semibold text-sm text-[var(--ink)]">{metric.title}</h5>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {metric.target}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing Axiom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[var(--radius-card)] p-6 md:p-8 bg-[var(--ink)] text-[var(--on-dark)] text-center border border-white/10 shadow-xl"
        >
          <p className="text-base md:text-xl text-[var(--on-dark)] italic font-medium max-w-3xl mx-auto leading-relaxed">
            "{CONTENT.roadmap.closingStatement}"
          </p>
        </motion.div>
      </div>
    </div>
  );
};
