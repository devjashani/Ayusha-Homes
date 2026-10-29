import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { NumberCounter } from '@/components/ui/NumberCounter';
import { Target, Users, Compass } from 'lucide-react';

export const Market: React.FC = () => {
  return (
    <div className="w-full mb-12">
      {/* Big --ink Rounded Panel for Sourced Stats */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="p-6 sm:p-12 md:p-16 rounded-[var(--radius-card)] bg-[var(--ink)] text-[var(--on-dark)] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {CONTENT.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between ${
                  idx !== 0 ? 'pt-6 md:pt-0 md:pl-10' : ''
                }`}
              >
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--accent-soft)] mb-3 tabular-nums">
                    <NumberCounter
                      target={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.numericValue % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[var(--on-dark)] font-medium leading-snug mb-6">
                    {stat.label}
                  </p>
                </div>
                <div className="text-xs text-[var(--on-dark-muted)] border-t border-white/10 pt-3">
                  Source: <span className="text-white/80">{stat.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Nested Funnel: From Mobile Population to AYUSHA's Wedge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-10 rounded-[var(--radius-card)] bg-white border border-[var(--line)] shadow-[0_0.5rem_2rem_rgba(31,41,42,0.04)]">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg)]">
              From a Large Mobile Population to AYUSHA's Focused Entry Point
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
              Precision go-to-market funnel prioritizing high-urgency willingness to pay
            </p>
          </div>

          {/* Nested Cards */}
          <div className="space-y-4 max-w-4xl">
            {/* Outer Layer 1 */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-card-sm)] bg-[var(--surface)] border border-[var(--line)] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white text-[var(--fg)] flex items-center justify-center shrink-0 border border-[var(--line)]">
                  <Compass className="w-5 h-5 text-[var(--muted)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[var(--fg)]">
                    {CONTENT.market.funnel[0].layer}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    {CONTENT.market.funnel[0].description}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[var(--fg)] border border-[var(--line)] shrink-0 font-mono">
                {CONTENT.market.funnel[0].metric}
              </span>
            </div>

            {/* Middle Layer 2 */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-card-sm)] bg-[var(--surface-2)] border border-[var(--line)] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:ml-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--line)]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[var(--accent)]">
                    {CONTENT.market.funnel[1].layer}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    {CONTENT.market.funnel[1].description}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] shrink-0 font-mono">
                {CONTENT.market.funnel[1].metric}
              </span>
            </div>

            {/* Core Wedge Layer 3 */}
            <div className="p-6 sm:p-7 rounded-[var(--radius-card-sm)] bg-[var(--ink)] text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:ml-8 border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[var(--accent-soft)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-base sm:text-lg text-white">
                      {CONTENT.market.funnel[2].layer}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-[var(--good)] text-[var(--ink)]">
                      Inaugural Pilot Wedge
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--on-dark-muted)] max-w-xl leading-relaxed">
                    {CONTENT.market.funnel[2].description}
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[var(--ink)] shadow-xs shrink-0 font-mono">
                {CONTENT.market.funnel[2].metric}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
