import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
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
    <div className="relative py-8 md:py-12">
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
              {CONTENT.risks.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.risks.headline}
          </motion.h2>

          <p className="text-xs md:text-sm text-[var(--muted)]">
            Click any card to flip between identified stress point and pre-architected mitigant.
          </p>
        </div>

        {/* 3 Flip/Expand Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTENT.risks.items.map((item, idx) => {
            const currentSide = activeTab[idx] || 'risk';
            const isRisk = currentSide === 'risk';

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                onClick={() => toggleTab(idx)}
                className="cursor-pointer"
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className={`h-full min-h-[300px] flex flex-col justify-between p-6 md:p-8 transition-all duration-300 ${
                    isRisk
                      ? 'bg-white/50 border-white/70 hover:border-[var(--status-risk)]/40'
                      : 'bg-[var(--status-success)]/10 border-[var(--status-success)]/30 shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        {isRisk ? (
                          <div className="w-9 h-9 rounded-xl bg-[var(--status-risk)]/10 text-[var(--status-risk)] flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-[var(--status-success)]/15 text-[var(--status-success)] flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                        )}
                        <h3 className="font-semibold text-base md:text-lg text-[var(--ink)]">
                          {item.title}
                        </h3>
                      </div>
                      <span className="p-1.5 rounded-full bg-black/5 text-[var(--muted)] hover:bg-black/10">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="mb-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isRisk
                            ? 'bg-[var(--status-risk)]/15 text-[var(--status-risk)]'
                            : 'bg-[var(--status-success)]/15 text-[var(--status-success)]'
                        }`}
                      >
                        {isRisk ? 'Stress Point / Risk' : 'Engineered Mitigant'}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--ink)]/90 leading-relaxed font-normal">
                      {isRisk ? item.risk : item.mitigant}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>Toggle view: {isRisk ? 'Show Mitigant' : 'Show Risk'}</span>
                    <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--accent-text)]">
                      {isRisk ? 'Flip →' : '← Back'}
                    </span>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
