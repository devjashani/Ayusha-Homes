import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { TrendingUp, Cpu, Scale, Building2 } from 'lucide-react';

export const WhyNow: React.FC = () => {
  const icons = [TrendingUp, Cpu, Scale, Building2];

  return (
    <div className="w-full">
      {/* 4 Cards Grid: 1 col mobile, 2 col md, 4 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONTENT.whyNow.cards.map((card, idx) => {
          const Icon = icons[idx];
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
                    <div className="w-9 h-9 rounded-xl bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-base sm:text-lg text-[var(--fg)] mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line)] flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>Converging Factor</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
