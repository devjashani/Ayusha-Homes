import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { Target } from 'lucide-react';

export const Team: React.FC = () => {
  const founder = CONTENT.team.founder;

  return (
    <div className="relative pt-8 md:pt-12">
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
              {CONTENT.team.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.team.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--muted)] font-normal"
          >
            {CONTENT.team.subhead}
          </motion.p>
        </div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-10 bg-white/60 border-white/80 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Initials Avatar */}
              <div className="flex flex-col items-center sm:items-start shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-[var(--ink)] to-[var(--brand)] text-white flex items-center justify-center font-bold text-3xl md:text-4xl shadow-xl border-2 border-white/50">
                  {founder.initials}
                </div>
                <div className="mt-3 text-center sm:text-left">
                  <h3 className="font-bold text-xl md:text-2xl text-[var(--ink)]">
                    {founder.name}
                  </h3>
                  <span className="text-xs md:text-sm font-semibold text-[var(--accent-text)]">
                    {founder.role}
                  </span>
                </div>
              </div>

              {/* Bio & Triangle Context */}
              <div className="flex-1">
                <p className="text-sm md:text-base text-[var(--ink)] font-medium leading-relaxed mb-6">
                  {founder.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {founder.experiencePoints.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded-2xl bg-white/60 border border-white/80 text-xs md:text-sm text-[var(--muted)] leading-relaxed shadow-xs"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Roles Being Built Row */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-base md:text-lg font-bold text-[var(--ink)]">
              Specialist Advisory & Architecture Roles Being Assembled
            </h3>
            <p className="text-xs text-[var(--muted)] mt-1">
              Curated capabilities for corridor launch and privacy governance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CONTENT.team.rolesBeingBuilt.map((role) => (
              <GlassPanel
                key={role.code}
                variant="card"
                className="p-5 flex flex-col justify-between bg-white/45 border-white/70 hover:border-[var(--accent)]/40 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/12 text-[var(--accent-text)] flex items-center justify-center font-bold text-sm mb-3 font-mono">
                    {role.code}
                  </div>
                  <h4 className="font-bold text-sm text-[var(--ink)] mb-1.5">
                    {role.title}
                  </h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {role.focus}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-black/5 text-[10px] font-bold text-[var(--accent-text)] uppercase tracking-wider">
                  Active Recruitment
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Milestone Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassPanel
            variant="card"
            className="p-5 md:p-6 bg-white/50 border-[var(--accent)]/35 shadow-md text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-[var(--ink)] font-semibold">
              <Target className="w-4 h-4 text-[var(--accent)]" />
              <span>{CONTENT.brand.milestoneNotice}</span>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
};
