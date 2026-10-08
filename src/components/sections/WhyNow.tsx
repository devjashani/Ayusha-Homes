import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { TrendingUp, Cpu, Scale, Building2 } from 'lucide-react';

export const WhyNow: React.FC = () => {
  const icons = [TrendingUp, Cpu, Scale, Building2];

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
                  className="h-full flex flex-col justify-between p-6 md:p-7 bg-white/40 border-white/70 hover:border-[#1E6FA8]/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center border border-[#1E6FA8]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm font-semibold text-[#5B6B76]/50">
                        {card.number}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base md:text-lg text-[#15202B] mb-2.5">
                      {card.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#5B6B76] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] font-medium text-[#1E6FA8]">
                    <span>Converging Factor</span>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
