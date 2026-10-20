import React, { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { THEMES } from '@/styles/themes';

export interface SectionTopFadeProps {
  from: string;
  to: string;
  desktopHeight: number;
  mobileHeight: number;
}

export const SectionTopFade: React.FC<SectionTopFadeProps> = ({
  from,
  to,
  desktopHeight,
  mobileHeight,
}) => {
  const fadeRef = useRef<HTMLDivElement>(null);

  const resolvedFrom = from === 'hero' ? 'home' : from;
  const resolvedTo = to === 'hero' ? 'home' : to;
  const fromTheme = THEMES[resolvedFrom] || THEMES.home;
  const toTheme = THEMES[resolvedTo] || THEMES.why;

  const fromBg = fromTheme.bgTo || fromTheme.bgColor;
  const toBg = toTheme.bgFrom || toTheme.bgColor;
  const fromAccent = fromTheme.accent;
  const toAccent = toTheme.accent;

  // 6 smoothstep stops:
  // S(x) = 3x^2 - 2x^3
  // S(0) = 0%, S(0.2) = 10.4%, S(0.4) = 35.2%, S(0.6) = 64.8%, S(0.8) = 89.6%, S(1) = 100%
  const oklabGradient = `linear-gradient(in oklab to bottom, 
    ${fromBg} 0%, 
    color-mix(in oklab, ${toBg} 10.4%, ${fromBg}) 20%, 
    color-mix(in oklab, ${toBg} 35.2%, ${fromBg}) 40%, 
    color-mix(in oklab, ${toBg} 64.8%, ${fromBg}) 60%, 
    color-mix(in oklab, ${toBg} 89.6%, ${fromBg}) 80%, 
    ${toBg} 100%)`;

  const fallbackGradient = `linear-gradient(to bottom, ${fromBg}, ${toBg})`;

  const { scrollYProgress } = useScroll({
    target: fadeRef,
    offset: ['start end', 'start center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0 && latest <= 1) {
      const t = Math.max(0, Math.min(1, latest));
      const toPct = Math.round(t * 100);
      const fromPct = 100 - toPct;
      document.documentElement.style.setProperty(
        '--accent',
        `color-mix(in oklab, ${fromAccent} ${fromPct}%, ${toAccent} ${toPct}%)`
      );
    }
  });

  return (
    <div
      ref={fadeRef}
      aria-hidden="true"
      className="section-top-fade absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden z-0"
      style={
        {
          '--fade-h-desktop': `${desktopHeight}px`,
          '--fade-h-mobile': `${mobileHeight}px`,
          background: fallbackGradient,
          backgroundImage: oklabGradient,
        } as React.CSSProperties
      }
    >
      {/* 3% noise overlay to prevent color banding */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
