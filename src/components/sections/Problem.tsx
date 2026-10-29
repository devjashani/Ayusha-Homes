import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { Globe2, FileSpreadsheet, AlertCircle } from 'lucide-react';

export const Problem: React.FC = () => {
  const icons = [Globe2, FileSpreadsheet, AlertCircle];

  return (
    <div className="w-full">
      {/* 3 Problem Cards Grid: 1 col mobile, 3 col lg, gap 1.5rem */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {CONTENT.problem.cards.map((card, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hover-spring-card"
            >
              <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-[var(--radius-card)] bg-white border border-[var(--line)] shadow-[0_0.25rem_1rem_rgba(31,41,42,0.03)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[var(--muted)]">
                      {card.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg sm:text-xl text-[var(--fg)] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--line)] flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>Siloed border vulnerability</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Result Callout Box */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mb-8"
      >
        <div className="p-6 sm:p-8 rounded-[var(--radius-card-sm)] bg-[var(--ink)] text-[var(--on-dark)] shadow-[0_0.75rem_2rem_rgba(31,41,42,0.12)] border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span className="px-3 py-1 rounded-md bg-[var(--accent-soft)]/20 text-[var(--accent-soft)] text-xs font-bold uppercase tracking-wider shrink-0">
              Core Bottleneck
            </span>
            <p className="text-sm sm:text-base text-[var(--on-dark-muted)] leading-relaxed font-normal">
              {CONTENT.problem.callout}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
