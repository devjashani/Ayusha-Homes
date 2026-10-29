import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export type PillVariant = 'dark' | 'light' | 'outline' | 'accent';

export interface PillButtonProps {
  children: React.ReactNode;
  variant?: PillVariant;
  withArrow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'dark',
  withArrow = false,
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  const variantClasses: Record<PillVariant, string> = {
    dark: 'bg-[var(--ink)] text-white hover:bg-[var(--ink-2)] shadow-[0_0.25rem_1rem_rgba(31,41,42,0.18)]',
    light: 'bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--surface-2)] border border-[var(--line)]',
    outline: 'bg-transparent text-[var(--fg)] border border-[var(--line)] hover:bg-[var(--surface)]',
    accent: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-to)] shadow-[0_0.25rem_1rem_rgba(51,110,135,0.22)]',
  };

  const basePadding = withArrow
    ? 'pl-5 pr-1.5 py-1.5'
    : 'px-6 py-3';

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold text-sm leading-none transition-all duration-200 select-none cursor-pointer hover-spring-btn active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${basePadding} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span
          className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`group ${baseClasses}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group ${baseClasses}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
