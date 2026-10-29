import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { ShieldCheck, Coins, Users, Building, Stethoscope } from 'lucide-react';

export const BusinessModel: React.FC = () => {
  const stakeholderIcons: Record<string, React.ElementType> = {
    Patients: Users,
    Payers: Building,
    Providers: Stethoscope,
  };

  return (
    <div className="relative pt-12 md:pt-16">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase font-mono">
              {CONTENT.businessModel.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] max-w-2xl leading-[1.15]"
          >
            {CONTENT.businessModel.headline}
          </motion.h3>
        </div>

        {/* 6 Business Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CONTENT.businessModel.cards.map((card, idx) => {
            const StakeholderIcon = stakeholderIcons[card.stakeholder] || Coins;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-[var(--radius-card)] bg-white border border-[var(--line)] p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center shrink-0">
                        <StakeholderIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[var(--ink)]">
                        {card.stakeholder}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted)]">
                      {card.category}
                    </span>
                  </div>

                  <h4 className="font-semibold text-lg text-[var(--ink)] mb-2.5 leading-snug">
                    {card.title}
                  </h4>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line)] flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>Workflow Infrastructure</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Golden Rule Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[var(--radius-card)] p-6 md:p-8 bg-[var(--ink)] text-[var(--on-dark)] border border-white/10 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[var(--accent-soft)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--on-dark-muted)] block mb-0.5 font-mono">
                  Foundational Ethos
                </span>
                <p className="text-sm md:text-base font-semibold text-white">
                  {CONTENT.brand.goldenRule}
                </p>
              </div>
            </div>
            <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-medium text-[var(--on-dark-muted)] border border-white/15">
              Zero Data Monetization
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
