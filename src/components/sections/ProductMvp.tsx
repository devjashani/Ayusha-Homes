import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { ShieldAlert, Zap, KeyRound, Navigation, Info, Users, Briefcase } from 'lucide-react';

export const ProductMvp: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    ShieldAlert,
    Zap,
    KeyRound,
    Navigation,
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
              {CONTENT.productMvp.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.productMvp.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#5B6B76] font-normal"
          >
            {CONTENT.productMvp.subhead}
          </motion.p>
        </div>

        {/* Target & Channel Header Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <GlassPanel variant="card" className="p-5 md:p-6 bg-white/50 border-white/70">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#1E6FA8] uppercase block mb-1">
                  Target Audience
                </span>
                <p className="text-xs md:text-sm text-[#15202B] font-medium leading-relaxed">
                  {CONTENT.productMvp.targetText}
                </p>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel variant="card" className="p-5 md:p-6 bg-white/50 border-white/70">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4FA8E0]/15 text-[#1E6FA8] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#1E6FA8] uppercase block mb-1">
                  First Distribution Channels
                </span>
                <p className="text-xs md:text-sm text-[#15202B] font-medium leading-relaxed">
                  {CONTENT.productMvp.firstChannelText}
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* 4 MVP Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CONTENT.productMvp.cards.map((card, idx) => {
            const IconComponent = iconMap[card.iconName] || ShieldAlert;
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
                  className="h-full flex flex-col justify-between p-6 md:p-7 bg-white/45 border-white/70 hover:border-[#1E6FA8]/50 hover:shadow-[0_16px_40px_rgba(30,111,168,0.12)] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E6FA8]/15 to-[#4FA8E0]/15 text-[#1E6FA8] flex items-center justify-center border border-[#1E6FA8]/20">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#5B6B76]/50">
                        {card.number}
                      </span>
                    </div>

                    <span className="inline-block text-[10px] font-bold tracking-wider text-[#1E6FA8] uppercase px-2.5 py-0.5 rounded-full bg-[#1E6FA8]/10 mb-2">
                      {card.tag}
                    </span>

                    <h3 className="font-semibold text-lg text-[#15202B] mb-2.5">
                      {card.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#5B6B76] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-black/5 flex items-center gap-1.5 text-xs text-[#1E6FA8] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>In MVP Scope</span>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Not in MVP Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassPanel
            variant="card"
            className="p-4 md:p-5 bg-white/30 border-white/60 shadow-xs flex items-center gap-3 text-xs md:text-sm text-[#5B6B76]"
          >
            <Info className="w-5 h-5 text-[#1E6FA8] shrink-0" />
            <p className="font-normal italic">
              <strong className="font-semibold not-italic text-[#15202B]">Scope Discipline:</strong>{' '}
              {CONTENT.productMvp.notInMvpNote}
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
};
