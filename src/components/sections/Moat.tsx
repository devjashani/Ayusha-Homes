import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { ArrowRight, Layers, ShieldCheck, Cpu, Globe, Users, Database } from 'lucide-react';

export const Moat: React.FC = () => {
  const icons = [ShieldCheck, Users, Globe, Layers, Database, Cpu];

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
              {CONTENT.moat.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.moat.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--muted)] font-normal"
          >
            {CONTENT.moat.subhead}
          </motion.p>
        </div>

        {/* 6-Stage Expanding Progression Path */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
          {CONTENT.moat.stages.map((stage, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className="h-full flex flex-col justify-between p-5 bg-white/45 border-white/70"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/12 text-[var(--accent-text)] flex items-center justify-center font-bold text-xs">
                        {stage.step}
                      </div>
                      <Icon className="w-4 h-4 text-[var(--muted)]" />
                    </div>

                    <h3 className="font-semibold text-sm text-[var(--ink)] mb-2 leading-snug">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {idx < 5 && (
                    <div className="mt-4 pt-2 border-t border-black/5 flex justify-end text-[var(--accent)]">
                      <ArrowRight className="w-3.5 h-3.5 hidden lg:block opacity-60" />
                    </div>
                  )}
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm font-semibold tracking-wide text-[var(--accent-text)] uppercase bg-white/60 inline-block px-6 py-2.5 rounded-full border border-white/80 shadow-xs">
            {CONTENT.moat.summary}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
