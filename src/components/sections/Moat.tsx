import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { ArrowRight, Layers, ShieldCheck, Cpu, Globe, Users, Database } from 'lucide-react';

export const Moat: React.FC = () => {
  const icons = [ShieldCheck, Users, Globe, Layers, Database, Cpu];

  return (
    <div className="relative py-12 md:py-16">
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
              {CONTENT.moat.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] max-w-2xl leading-[1.15]"
          >
            {CONTENT.moat.headline}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[var(--muted)] font-normal mt-3 max-w-2xl"
          >
            {CONTENT.moat.subhead}
          </motion.p>
        </div>

        {/* 6-Stage Expanding Progression Path */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
          {CONTENT.moat.stages.map((stage, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-[var(--radius-card-sm)] bg-white border border-[var(--line)] p-5 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center font-bold text-xs font-mono">
                      {stage.step}
                    </div>
                    <Icon className="w-4 h-4 text-[var(--muted)]" />
                  </div>

                  <h4 className="font-semibold text-sm text-[var(--ink)] mb-2 leading-snug">
                    {stage.title}
                  </h4>

                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {idx < 5 && (
                  <div className="mt-4 pt-2 border-t border-[var(--line)] flex justify-end text-[var(--accent)]">
                    <ArrowRight className="w-3.5 h-3.5 hidden lg:block opacity-60" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Summary Pill Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs md:text-sm font-semibold tracking-wide text-[var(--accent)] uppercase bg-white inline-block px-6 py-2.5 rounded-full border border-[var(--line)] shadow-xs">
            {CONTENT.moat.summary}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
