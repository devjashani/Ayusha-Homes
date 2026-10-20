import React from 'react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  pageNumber: string;
  kicker: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageNumber,
  kicker,
  title,
  subtitle,
  tone = 'light',
  className = '',
}) => {
  const isDark = tone === 'dark';

  return (
    <div className={`relative mb-10 md:mb-14 select-none ${className}`}>
      {/* 1. Big outlined number ("01"..."06", ~160px, 8% opacity light / 14% dark, parallax/float) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: isDark ? 0.14 : 0.08, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-12 md:-top-16 left-0 font-serif font-bold text-[110px] sm:text-[140px] md:text-[170px] leading-none pointer-events-none tracking-tighter text-[var(--accent)]"
        aria-hidden="true"
      >
        {pageNumber}
      </motion.div>

      {/* 2. Header Content Container with relative z-10 */}
      <div className="relative z-10 pt-6 md:pt-10">
        {/* Kicker label in mono caps */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-[var(--accent-text)]">
            {kicker}
          </span>
        </motion.div>

        {/* Section title (fade + 24px rise + blur-to-sharp, once) */}
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] mb-3 max-w-3xl ${
            isDark ? 'text-[var(--on-dark)]' : 'text-[var(--ink)]'
          }`}
        >
          {title}
        </motion.h2>

        {/* 2px accent line that draws left-to-right when section enters */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-24 md:w-36 bg-[var(--accent)] origin-left my-4 rounded-full"
        />

        {/* Subtitle if provided */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base md:text-lg max-w-2xl font-normal leading-relaxed ${
              isDark ? 'text-[var(--on-dark-muted)]' : 'text-[var(--muted)]'
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
