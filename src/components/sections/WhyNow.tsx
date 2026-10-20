import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { TrendingUp, Cpu, Scale, Building2 } from 'lucide-react';

export const WhyNow: React.FC = () => {
  const icons = [TrendingUp, Cpu, Scale, Building2];

  return (
    <div className="relative pt-6 md:pt-10">
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
              {CONTENT.whyNow.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.whyNow.headline}
          </motion.h2>
        </div>

        {/* 4 Glass Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.whyNow.cards.map((card, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className="h-full flex flex-col justify-between p-6 md:p-7 bg-white/40 border-white/70 hover:border-[var(--accent)]/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/12 text-[var(--accent-text)] flex items-center justify-center border border-[var(--accent)]/35">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm font-semibold text-[var(--muted)]/50">
                        {card.number}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base md:text-lg text-[var(--ink)] mb-2.5">
                      {card.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent-text)]">
                    <span>Converging Factor</span>
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
