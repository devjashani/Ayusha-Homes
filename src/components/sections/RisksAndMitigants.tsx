import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';

export const RisksAndMitigants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Record<number, 'risk' | 'mitigant'>>({
    0: 'risk',
    1: 'risk',
    2: 'risk',
  });

  const toggleTab = (index: number) => {
    setActiveTab((prev) => ({
      ...prev,
      [index]: prev[index] === 'risk' ? 'mitigant' : 'risk',
    }));
  };

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
              {CONTENT.risks.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] max-w-2xl leading-[1.15]"
          >
            {CONTENT.risks.headline}
          </motion.h3>

          <p className="text-xs md:text-sm text-[var(--muted)] mt-2">
            Click any card to flip between identified stress point and pre-architected mitigant.
          </p>
        </div>

        {/* 3 Flip/Expand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTENT.risks.items.map((item, idx) => {
            const currentSide = activeTab[idx] || 'risk';
            const isRisk = currentSide === 'risk';

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggleTab(idx)}
                className="cursor-pointer"
              >
                <div
                  className={`h-full min-h-[19rem] rounded-[var(--radius-card)] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 border hover:-translate-y-1.5 hover:shadow-lg ${
                    isRisk
                      ? 'bg-white border-[var(--line)]'
                      : 'bg-[var(--surface)] border-[var(--good)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        {isRisk ? (
                          <div className="w-9 h-9 rounded-xl bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-[var(--good)]/15 text-[var(--good)] flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                        )}
                        <h4 className="font-semibold text-base md:text-lg text-[var(--ink)] leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <span className="p-1.5 rounded-full bg-black/5 text-[var(--muted)] hover:bg-black/10 shrink-0">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="mb-4">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md font-mono ${
                          isRisk
                            ? 'bg-[var(--surface-2)] text-[var(--muted)]'
                            : 'bg-[var(--good)]/20 text-[var(--fg)]'
                        }`}
                      >
                        {isRisk ? 'Stress Point / Risk' : 'Engineered Mitigant'}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--ink)] leading-relaxed font-normal">
                      {isRisk ? item.risk : item.mitigant}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>Toggle view: {isRisk ? 'Show Mitigant' : 'Show Risk'}</span>
                    <span className="font-semibold text-xs uppercase tracking-wider text-[var(--accent)] font-mono">
                      {isRisk ? 'Flip →' : '← Back'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
