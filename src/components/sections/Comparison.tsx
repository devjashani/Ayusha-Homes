import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { Check, Minus, Sparkles } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <div className="w-full mb-12">
      <div className="mb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)]">
          {CONTENT.comparison.tag}
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--fg)] mt-1">
          {CONTENT.comparison.headline}
        </h3>
      </div>

      {/* Comparison Table: rounded 2rem container, 1px --line, sticky first column, overflow-x:auto */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="rounded-[var(--radius-card)] bg-white border border-[var(--line)] shadow-[0_0.5rem_2rem_rgba(31,41,42,0.04)] overflow-hidden mb-6"
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface)]/50">
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)] sticky left-0 bg-[var(--surface)] z-10">
                  Model
                </th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Gap AYUSHA Closes
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
              {CONTENT.comparison.rows.map((row) => {
                const isAyusha = row.isAyusha;

                return (
                  <tr
                    key={row.name}
                    className={`transition-colors ${
                      isAyusha
                        ? 'bg-[var(--accent)]/10 border-y-2 border-[var(--accent)] font-semibold'
                        : 'hover:bg-[var(--surface)]/50'
                    }`}
                  >
                    {/* Name (Sticky first column) */}
                    <td
                      className={`py-4 px-5 text-sm sticky left-0 z-10 transition-colors ${
                        isAyusha
                          ? 'bg-[var(--surface-2)] text-[var(--accent)] font-bold'
                          : 'bg-white text-[var(--fg)] font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isAyusha && (
                          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                        )}
                        <span>{row.name}</span>
                      </div>
                    </td>

                    {/* Gap */}
                    <td className="py-4 px-5 text-xs sm:text-sm text-[var(--muted)]">
                      <span className={isAyusha ? 'text-[var(--accent)] font-semibold' : ''}>
                        {row.gap}
                      </span>
                    </td>

                    {/* Verified Identity */}
                    <td className="py-4 px-4 text-center">
                      {row.verifiedIdentity ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--good)]/20 text-emerald-800">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 text-gray-300">
                          <Minus className="w-4 h-4" />
                        </span>
                      )}
                    </td>

                    {/* Longitudinal Context */}
                    <td className="py-4 px-4 text-center">
                      {row.longitudinalContext ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--good)]/20 text-emerald-800">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 text-gray-300">
                          <Minus className="w-4 h-4" />
                        </span>
                      )}
                    </td>

                    {/* Emergency Workflow */}
                    <td className="py-4 px-4 text-center">
                      {row.emergencyWorkflow ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--good)]/20 text-emerald-800">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 text-gray-300">
                          <Minus className="w-4 h-4" />
                        </span>
                      )}
                    </td>

                    {/* Cross-Border Routing */}
                    <td className="py-4 px-4 text-center">
                      {row.crossBorderRouting ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--good)]/20 text-emerald-800">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 text-gray-300">
                          <Minus className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Highlight Pill Callout */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[var(--ink)] text-white shadow-md text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-[var(--accent-soft)]" />
          <span>{CONTENT.comparison.closingStatement}</span>
        </div>
      </div>
    </div>
  );
};
