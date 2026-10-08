import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { ShieldCheck, Coins, Users, Building, Stethoscope } from 'lucide-react';

export const BusinessModel: React.FC = () => {
  const stakeholderIcons: Record<string, React.ElementType> = {
    Patients: Users,
    Payers: Building,
    Providers: Stethoscope,
  };

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
              {CONTENT.businessModel.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.businessModel.headline}
          </motion.h2>
        </div>

        {/* 6 Business Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CONTENT.businessModel.cards.map((card, idx) => {
            const StakeholderIcon = stakeholderIcons[card.stakeholder] || Coins;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className="h-full flex flex-col justify-between p-6 md:p-7 bg-white/45 border-white/70 hover:border-[#1E6FA8]/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center">
                          <StakeholderIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#15202B]">
                          {card.stakeholder}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#5B6B76]">
                        {card.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg text-[#15202B] mb-2">
                      {card.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#5B6B76] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 flex items-center gap-1.5 text-xs text-[#1E6FA8] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E6FA8]" />
                    <span>Workflow Infrastructure</span>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Golden Rule Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-8 bg-gradient-to-r from-[#15202B] via-[#1E2E3D] to-[#15202B] text-white border-white/10 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                    Foundational Ethos
                  </span>
                  <p className="text-sm md:text-base font-semibold text-white">
                    {CONTENT.brand.goldenRule}
                  </p>
                </div>
              </div>
              <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-medium text-gray-200 border border-white/15">
                Zero Data Monetization
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
};
