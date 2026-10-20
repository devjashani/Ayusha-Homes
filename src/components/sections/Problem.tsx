import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { NumberCounter } from '@/components/ui/NumberCounter';
import { Globe2, FileSpreadsheet, AlertCircle } from 'lucide-react';

export const Problem: React.FC = () => {
  const icons = [Globe2, FileSpreadsheet, AlertCircle];

  return (
    <div className="relative pb-10 md:pb-16">
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
              {CONTENT.problem.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.problem.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--muted)] font-normal"
          >
            {CONTENT.problem.subhead}
          </motion.p>
        </div>

        {/* 3 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
          {CONTENT.problem.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className="h-full flex flex-col justify-between hover:border-[var(--accent)]/40 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent)]/5 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/35 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-[var(--muted)]/40 group-hover:text-[var(--accent)]/50 transition-colors">
                        {card.stepNumber}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg md:text-xl text-[var(--ink)] mb-3">
                      {card.title}
                    </h3>

                    <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-2 text-xs font-medium text-[var(--accent-text)]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Siloed border vulnerability</span>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Result Callout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-14"
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-8 bg-[var(--ink)] text-[var(--on-dark)] border-white/10 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="px-3 py-1 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold uppercase tracking-wider shrink-0">
                Core Bottleneck
              </div>
              <p className="text-sm md:text-base text-[var(--on-dark-muted)] leading-relaxed font-normal">
                {CONTENT.problem.callout}
              </p>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Sourced Stats Row (1.4B and 304M) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENT.stats.slice(0, 2).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 + idx * 0.15 }}
            >
              <GlassPanel
                variant="card"
                className="p-6 md:p-8 flex flex-col justify-between border-white/70 bg-white/40"
              >
                <div>
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)] tracking-tight mb-2">
                    <NumberCounter
                      target={stat.numericValue}
                      suffix={stat.suffix}
                      decimals={stat.numericValue % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="text-sm md:text-base font-medium text-[var(--ink)] mb-4">
                    {stat.label}
                  </p>
                </div>
                <p className="text-xs text-[var(--muted)] border-t border-black/5 pt-3">
                  Source: <span className="font-medium text-[var(--ink)]/80">{stat.source}</span>
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
