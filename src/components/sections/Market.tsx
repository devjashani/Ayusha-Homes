import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { NumberCounter } from '@/components/ui/NumberCounter';
import { Target, Users, Compass } from 'lucide-react';

export const Market: React.FC = () => {
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
              {CONTENT.market.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.market.headline}
          </motion.h2>
        </div>

        {/* 3 Sourced Stats Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CONTENT.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
            >
              <GlassPanel
                variant="card"
                className="h-full p-6 md:p-8 flex flex-col justify-between border-white/75 bg-white/45"
              >
                <div>
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)] tracking-tight mb-2">
                    <NumberCounter
                      target={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.numericValue % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="text-sm md:text-base font-medium text-[var(--ink)] mb-4">
                    {stat.label}
                  </p>
                </div>
                <div className="text-xs text-[var(--muted)] border-t border-black/5 pt-3">
                  Source: <span className="font-medium text-[var(--ink)]/80">{stat.source}</span>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Nested Funnel: From Mobile Population to AYUSHA's Wedge */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-10 bg-white/60 border-white/80 shadow-xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--ink)]">
                From a Large Mobile Population to AYUSHA's Focused Entry Point
              </h3>
              <p className="text-xs md:text-sm text-[var(--muted)] mt-1">
                Precision go-to-market funnel prioritizing high-urgency willingness to pay
              </p>
            </div>

            {/* Nested Visual Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Outer Layer 1 */}
              <div className="p-5 md:p-6 rounded-2xl bg-white/70 border border-[var(--line)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--line)] text-[var(--muted)] flex items-center justify-center font-bold text-xs shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-[var(--ink)]">
                      {CONTENT.market.funnel[0].layer}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--muted)]">
                      {CONTENT.market.funnel[0].description}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--line)] text-[var(--ink)] shrink-0">
                  {CONTENT.market.funnel[0].metric}
                </span>
              </div>

              {/* Middle Layer 2 */}
              <div className="p-5 md:p-6 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/35 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ml-0 sm:ml-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 text-[var(--accent-text)] flex items-center justify-center font-bold text-xs shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-[var(--accent-text)]">
                      {CONTENT.market.funnel[1].layer}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--muted)]">
                      {CONTENT.market.funnel[1].description}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/15 text-[var(--accent-text)] shrink-0">
                  {CONTENT.market.funnel[1].metric}
                </span>
              </div>

              {/* Core Wedge Layer 3 */}
              <div className="p-6 md:p-7 rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--ink)] text-[var(--on-dark)] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ml-0 sm:ml-8 border border-white/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-base md:text-lg text-white">
                        {CONTENT.market.funnel[2].layer}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--status-success)]/20 text-[var(--on-dark)] border border-[var(--status-success)]/40">
                        Inaugural Pilot Wedge
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--on-dark-muted)] max-w-xl leading-relaxed">
                      {CONTENT.market.funnel[2].description}
                    </p>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[var(--brand)] shadow-md shrink-0">
                  {CONTENT.market.funnel[2].metric}
                </span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
};
