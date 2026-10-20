import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { Check, Minus, Sparkles } from 'lucide-react';

export const Comparison: React.FC = () => {
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
              {CONTENT.comparison.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.comparison.headline}
          </motion.h2>
        </div>

        {/* Glass Comparison Table with horizontal scroll container for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <GlassPanel
            variant="card"
            className="p-4 md:p-8 bg-white/60 border-white/80 shadow-xl overflow-x-auto no-scrollbar"
          >
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Model
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Gap AYUSHA closes
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                    Verified Identity
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                    Longitudinal Context
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                    Emergency Workflow
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                    Cross-Border Routing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {CONTENT.comparison.rows.map((row, index) => {
                  const isAyusha = row.isAyusha;

                  return (
                    <motion.tr
                      key={row.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`transition-colors ${
                        isAyusha
                          ? 'bg-[var(--accent)]/12 shadow-sm rounded-2xl font-semibold border-y border-[var(--accent)]/30'
                          : 'hover:bg-white/40'
                      }`}
                    >
                      {/* Name */}
                      <td className="py-4 px-4 text-sm text-[var(--ink)]">
                        <div className="flex items-center gap-2">
                          {isAyusha && (
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                          )}
                          <span className={isAyusha ? 'font-bold text-[var(--accent-text)] text-base' : 'font-medium'}>
                            {row.name}
                          </span>
                        </div>
                      </td>

                      {/* Gap */}
                      <td className="py-4 px-4 text-xs md:text-sm text-[var(--muted)]">
                        <span className={isAyusha ? 'text-[var(--accent-text)] font-bold' : ''}>
                          {row.gap}
                        </span>
                      </td>

                      {/* Verified Identity */}
                      <td className="py-4 px-4 text-center">
                        {row.verifiedIdentity ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--status-success)]/15 text-[var(--ink)]">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-[var(--muted)]/50">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Longitudinal Context */}
                      <td className="py-4 px-4 text-center">
                        {row.longitudinalContext ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--status-success)]/15 text-[var(--ink)]">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-[var(--muted)]/50">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Emergency Workflow */}
                      <td className="py-4 px-4 text-center">
                        {row.emergencyWorkflow ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--status-success)]/15 text-[var(--ink)]">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-[var(--muted)]/50">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Cross-Border Routing */}
                      <td className="py-4 px-4 text-center">
                        {row.crossBorderRouting ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--status-success)]/15 text-[var(--ink)]">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-[var(--muted)]/50">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </GlassPanel>
        </motion.div>

        {/* Highlight Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <GlassPanel
            variant="chip"
            className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-[var(--brand)] to-[var(--ink)] text-[var(--on-dark)] shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              {CONTENT.comparison.closingStatement}
            </span>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
};
