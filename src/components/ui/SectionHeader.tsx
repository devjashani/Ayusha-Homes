import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  pageNumber?: string;
  kicker: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  pageNumber,
  kicker,
  title,
  subtitle,
  dark = false,
  className = '',
}) => {
  // Split title into natural phrase lines if long, or single line
  const words = title.split(' ');
  const lines: string[] = [];
  if (words.length <= 4) {
    lines.push(title);
  } else {
    const mid = Math.ceil(words.length / 2);
    lines.push(words.slice(0, mid).join(' '));
    lines.push(words.slice(mid).join(' '));
  }

  return (
    <div className={`relative mb-14 md:mb-16 max-w-4xl ${className}`}>
      {/* Huge outlined ghost page number (01-06) behind header, clipped by parent */}
      {pageNumber && (
        <span className="ghost-number" aria-hidden="true">
          {pageNumber}
        </span>
      )}

      {/* Eyebrow: 6px accent dot + label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 mb-3.5"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
          aria-hidden="true"
        />
        <span
          className={`text-xs font-semibold tracking-wider uppercase font-mono ${
            dark ? 'text-[var(--on-dark-muted)]' : 'text-[var(--muted)]'
          }`}
        >
          {kicker}
        </span>
      </motion.div>

      {/* Line Reveal H2 (2.25rem / sm 3rem / md 3.75rem, max-width ~18ch) */}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08] max-w-[20ch] ${
          dark ? 'text-[var(--on-dark)]' : 'text-[var(--fg)]'
        }`}
      >
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.9,
                delay: idx * 0.11,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Subtitle / Subhead if present */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed font-normal ${
            dark ? 'text-[var(--on-dark-muted)]' : 'text-[var(--muted)]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
