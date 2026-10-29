import React from 'react';
import { motion } from 'motion/react';
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
    <div className="w-full">
      {/* Target & Channel Header Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="p-5 sm:p-6 rounded-[var(--radius-card-sm)] bg-white border border-[var(--line)] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--line)]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[0.6875rem] font-bold tracking-wider text-[var(--accent)] uppercase block mb-1">
                Target Audience
              </span>
              <p className="text-xs sm:text-sm text-[var(--fg)] font-medium leading-relaxed">
                {CONTENT.productMvp.targetText}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-[var(--radius-card-sm)] bg-white border border-[var(--line)] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--line)]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[0.6875rem] font-bold tracking-wider text-[var(--accent)] uppercase block mb-1">
                First Distribution Channels
              </span>
              <p className="text-xs sm:text-sm text-[var(--fg)] font-medium leading-relaxed">
                {CONTENT.productMvp.firstChannelText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 MVP Cards Grid: 1 col mobile, 2 col md, 4 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {CONTENT.productMvp.cards.map((card, idx) => {
          const IconComponent = iconMap[card.iconName] || ShieldAlert;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hover-spring-card"
            >
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-[var(--radius-card)] bg-white border border-[var(--line)] shadow-[0_0.25rem_1rem_rgba(31,41,42,0.03)]">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[var(--muted)]">
                      {card.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block text-[0.625rem] font-bold tracking-wider text-[var(--accent)] uppercase px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--line)] mb-2.5">
                    {card.tag}
                  </span>

                  <h3 className="font-semibold text-lg text-[var(--fg)] mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[var(--line)] flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)]" />
                  <span>In MVP Scope</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scope Discipline Note */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-card-sm)] bg-white/70 border border-[var(--line)] shadow-2xs flex items-center gap-3 text-xs sm:text-sm text-[var(--muted)]">
        <Info className="w-5 h-5 text-[var(--accent)] shrink-0" />
        <p className="font-normal italic">
          <strong className="font-semibold not-italic text-[var(--fg)]">Scope Discipline:</strong>{' '}
          {CONTENT.productMvp.notInMvpNote}
        </p>
      </div>
    </div>
  );
};
