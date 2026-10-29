import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/data/content';
import { Target } from 'lucide-react';

export const Team: React.FC = () => {
  const founder = CONTENT.team.founder;

  return (
    <div className="relative pt-12 md:pt-16">
      <div className="w-full">
        {/* Section Sub-header */}
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
              {CONTENT.team.tag}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)] max-w-2xl leading-[1.15]"
          >
            {CONTENT.team.headline}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[var(--muted)] font-normal mt-3 max-w-2xl"
          >
            {CONTENT.team.subhead}
          </motion.p>
        </div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="rounded-[var(--radius-card)] p-6 md:p-10 bg-white border border-[var(--line)] shadow-sm">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Initials Avatar */}
              <div className="flex flex-col items-center sm:items-start shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--ink)] text-white flex items-center justify-center font-bold text-2xl md:text-3xl shadow-md">
                  {founder.initials}
                </div>
                <div className="mt-3 text-center sm:text-left">
                  <h4 className="font-semibold text-xl md:text-2xl text-[var(--ink)]">
                    {founder.name}
                  </h4>
                  <span className="text-xs md:text-sm font-semibold text-[var(--accent)] font-mono">
                    {founder.role}
                  </span>
                </div>
              </div>

              {/* Bio & Triangle Context */}
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-[var(--ink)] font-normal leading-relaxed mb-6">
                  {founder.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {founder.experiencePoints.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded-[var(--radius-card-sm)] bg-[var(--surface)] border border-[var(--line)] text-xs md:text-sm text-[var(--muted)] leading-relaxed"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Roles Being Built Row */}
        <div className="mb-12">
          <div className="mb-6">
            <h4 className="text-base md:text-lg font-semibold text-[var(--ink)]">
              Specialist Advisory & Architecture Roles Being Assembled
            </h4>
            <p className="text-xs text-[var(--muted)] mt-1">
              Curated capabilities for corridor launch and privacy governance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CONTENT.team.rolesBeingBuilt.map((role) => (
              <div
                key={role.code}
                className="rounded-[var(--radius-card-sm)] p-5 flex flex-col justify-between bg-white border border-[var(--line)] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    {role.code}
                  </div>
                  <h5 className="font-semibold text-sm text-[var(--ink)] mb-1.5 leading-snug">
                    {role.title}
                  </h5>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {role.focus}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[var(--line)] text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider font-mono">
                  Active Recruitment
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-[var(--radius-card-sm)] p-5 md:p-6 bg-white border border-[var(--line)] text-center shadow-xs">
            <div className="flex items-center justify-center gap-2.5 text-xs md:text-sm text-[var(--ink)] font-semibold">
              <Target className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>{CONTENT.brand.milestoneNotice}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
