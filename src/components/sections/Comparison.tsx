import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { Check, Minus, Sparkles } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 relative">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wider text-[#1E6FA8] uppercase bg-[#1E6FA8]/10 px-3.5 py-1.5 rounded-full border border-[#1E6FA8]/20">
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
            className="p-4 md:p-8 bg-white/60 border-white/80 shadow-[0_20px_50px_rgba(21,32,43,0.06)] overflow-x-auto no-scrollbar"
          >
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D8E2E7]">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76]">
                    Model
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76]">
                    Gap AYUSHA closes
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76] text-center">
                    Verified Identity
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76] text-center">
                    Longitudinal Context
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76] text-center">
                    Emergency Workflow
                  </th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#5B6B76] text-center">
                    Cross-Border Routing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8E2E7]/60">
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
                          ? 'bg-gradient-to-r from-[#1E6FA8]/15 via-[#4FA8E0]/15 to-[#6FC7C9]/15 shadow-sm rounded-2xl font-semibold'
                          : 'hover:bg-white/40'
                      }`}
                    >
                      {/* Name */}
                      <td className="py-4 px-4 text-sm text-[#15202B]">
                        <div className="flex items-center gap-2">
                          {isAyusha && (
                            <span className="w-2 h-2 rounded-full bg-[#1E6FA8] animate-ping" />
                          )}
                          <span className={isAyusha ? 'font-bold text-[#1E6FA8] text-base' : 'font-medium'}>
                            {row.name}
                          </span>
                        </div>
                      </td>

                      {/* Gap */}
                      <td className="py-4 px-4 text-xs md:text-sm text-[#5B6B76]">
                        <span className={isAyusha ? 'text-[#1E6FA8] font-bold' : ''}>
                          {row.gap}
                        </span>
                      </td>

                      {/* Verified Identity */}
                      <td className="py-4 px-4 text-center">
                        {row.verifiedIdentity ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-gray-400">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Longitudinal Context */}
                      <td className="py-4 px-4 text-center">
                        {row.longitudinalContext ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-gray-400">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Emergency Workflow */}
                      <td className="py-4 px-4 text-center">
                        {row.emergencyWorkflow ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-gray-400">
                            <Minus className="w-4 h-4" />
                          </span>
                        )}
                      </td>

                      {/* Cross-Border Routing */}
                      <td className="py-4 px-4 text-center">
                        {row.crossBorderRouting ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 text-gray-400">
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
            className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-[#1E6FA8] to-[#15202B] text-white shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#6FC7C9]" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              {CONTENT.comparison.closingStatement}
            </span>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
};
